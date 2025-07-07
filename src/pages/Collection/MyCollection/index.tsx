import { getAdminV1BLCollectionOrders as index } from '@/services/ant-design-pro/BLCollectionOrder';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';
import { RequestOptionsType } from '@ant-design/pro-components';
import { getAdminV1GMCollectionAdminsEnum as getUsersEnum } from '@/services/ant-design-pro/GMCollectionAdmin';
import { getAdminV1UsersEnum as getUsersEnum2 } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';
import DrawerFC from './components/DrawerFC';

import CreateForm from './components/CreateForm';
import LogDrawerFC from './components/LogDrawerFC';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  const [admins2, setAdmins2] = useState<RequestOptionsType[]>([]);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showLogDetail, setShowLogDetail] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [id, setId] = useState<number>(0);
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const intl = useIntl();
  const _getUsersEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length === 0) {
      const res = await getUsersEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setAdmins(data);
      return data;
    } else {
      return admins;
    }
  };

    /**
   * 查询管理员enum
   */
  const _getUsersEnum2 = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length === 0) {
      const res = await getUsersEnum2({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.name,
          value: item.id,
        });
      }
      setAdmins2(data);
      return data;
    } else {
      return admins;
    }
  };

  /** table */
  const _index = async (
    // 第一个参数 params 查询表单和 params 参数的结合
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: TableListPagination & {
      pageSize: number;
      current: number;
    },
    // sort,
    // filter,
  ) => {
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    // @ts-ignore
    const res = await index({ page: params.current, ...params });
    if (admins.length === 0) {
      // @ts-ignore
      await _getUsersEnum();
    }
    if (admins2.length === 0) {
      // @ts-ignore
      await _getUsersEnum2();
    }

    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: res.success,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.total,
    };
  };
  const formatValue = (value: number) => (
    <span style={{ 
      fontSize: value !== 0 ? '16px' : 'inherit', 
      fontWeight: value !== 0 ? 'bold' : 'normal',
      margin: '0 4px'
    }}>
      {value}
    </span>
  );
  function calculateDaysFromMidnight(targetDateStr: string): number {
    // 解析目标日期
    const targetDate = new Date(targetDateStr);
    if (isNaN(targetDate.getTime())) {
        throw new Error("无效的日期格式");
    }
    
    // 获取目标日期的开始时间（午夜00:00:00）
    const targetMidnight = new Date(targetDate);
    targetMidnight.setHours(0, 0, 0, 0);
    
    // 获取当前日期的开始时间（午夜00:00:00）
    const currentDate = new Date();
    const currentMidnight = new Date(currentDate);
    currentMidnight.setHours(0, 0, 0, 0);
    
    // 计算时间差（毫秒）
    const timeDifference = currentMidnight.getTime() - targetMidnight.getTime();
    
    // 将毫秒转换为天数（1天 = 24 * 60 * 60 * 1000毫秒）
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    
    // 返回整数天数
    return Math.floor(daysDifference);
}

  /**
   * 授信额度drawer
   * @param record
   * @param _type
   */
  const _showDrawer = (record: TableListItem, _type: string) => {
    setCurrentRow(record);
    setType(_type);
    setShowDetail(true);
  };
    const _showLogDrawer = (record: TableListItem, _type: string) => {
    setCurrentRow(record);
    setType(_type);
    setShowLogDetail(true);
  };

    /**
   * 新建催收组model
   * @param _id
   */
  const onEditClick = async (_id: number) => {
    setId(_id);
    handleCreateModalVisible(true);
  };
  //
  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.e_collection_admin_id', defaultMessage: '' }),
      dataIndex: 'e_collection_admin_id',
      key: 'e_collection_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.t_borrow_sn', defaultMessage: '' }),
      dataIndex: 't_borrow_sn',
      key: 't_borrow_sn',
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.n_borrow_amount', defaultMessage: '' }),
      dataIndex: 'n_borrow_amount',
      key: 'n_borrow_amount',
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.g_collection_order_flow_history_count', defaultMessage: '' }),
      dataIndex: 'g_collection_order_flow_history_count',
      key: 'g_collection_order_flow_history_count',
       render: (_, record) => {
        return (
          <a
            onClick={() => {
              _showDrawer(record, 'flow');
            }}
          >
            {record.g_collection_order_flow_history_count}
          </a>
        );
      },
    },
    ,
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.h_collection_admin_log_count', defaultMessage: '' }),
      dataIndex: 'h_collection_admin_log_count',
      key: 'h_collection_admin_log_count',
       render: (_, record) => {
        return (
          <a
            onClick={() => {
              _showLogDrawer(record, 'log');
            }}
          >
            {record.h_collection_admin_log_count}
          </a>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status', defaultMessage: '' }),
      dataIndex: 'k_status',
      key: 'k_status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.new', defaultMessage: '新案件' }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.negotiating', defaultMessage: '协商中' }),
          status: 'Processing',
        },
        2: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.promised', defaultMessage: '承诺还款' }),
          status: 'Processing',
        },
        3: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.unfulfilled', defaultMessage: '承诺未还' }),
          status: 'Warning',
        },
        4: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.rejected', defaultMessage: '拒绝还款' }),
          status: 'Error',
        },
        7: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.repay', defaultMessage: '已还款' }),
          status: 'Success',
        },
      },
    },
    
    // {
    //   title: intl.formatMessage({ id: 'pages.BLCollectionOrder.p_expect_repay_time', defaultMessage: '' }),
    //   dataIndex: 'p_expect_repay_time',
    //   key: 'p_expect_repay_time',
    //   render: (text) => {
    //     if (text) {
    //       const validText = typeof text === 'string' || typeof text === 'number' ? text : Date.now();
    //       const date = new Date(validText);
    //       const month = String(date.getMonth() + 1).padStart(2, '0');
    //       const day = String(date.getDate()).padStart(2, '0');
    //       return `${month}-${day}`;
    //     }
    //     return text;
    //   },
    // },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.p_expect_repay_time', defaultMessage: '' }),
      dataIndex: 'p_expect_repay_time',
      key: 'p_expect_repay_time',
      render: (text) => {
        if (text) {
          return typeof text === 'string' ? calculateDaysFromMidnight(text) : text;
        }
        return text;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.morning', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.h_12_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_b_12_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.m_12_wa_count', defaultMessage: '' }),
      render: (_, record) => (
        <>
          {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.h_12_call_count!)}
          -
          {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.b_b_12_sms_count!)}
          -
          {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.m_12_wa_count!)}
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'pages.common.morning', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.r_12_contact_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_l_12_contact_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_g_12_contact_wa_count', defaultMessage: '' }),
      render: (_, record) => (
        <>
          {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.r_12_contact_call_count!)}
          -
          {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.b_l_12_contact_sms_count!)}
          -
          {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.b_g_12_contact_wa_count!)}
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'pages.common.afternoon', defaultMessage: '' }),
      dataIndex: 'b_e_18_log_count',
      key: 'b_e_18_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.i_18_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_c_18_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.n_18_wa_count', defaultMessage: '' }),
      render: (_, record) => {
        return (
          <>
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.i_18_call_count!)}
            -
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.b_c_18_sms_count!)}
            -
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.n_18_wa_count!)}
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.afternoon', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.s_18_contact_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_m_18_contact_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_h_18_contact_wa_count', defaultMessage: '' }),
      render: (_, record) => {
        return (
          <>
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.s_18_contact_call_count!)}
            -
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.b_m_18_contact_sms_count!)}
            -
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.b_h_18_contact_wa_count!)}
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.night', defaultMessage: '' }),
      dataIndex: 'b_i_24_log_count',
      key: 'b_i_24_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.j_24_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_d_24_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.o_24_wa_count', defaultMessage: '' }),
      render: (_, record) => {
        return (
          <>
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.j_24_call_count!)}
            -
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.b_d_24_sms_count!)}
            -
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.o_24_wa_count!)}
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.night', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.t_24_contact_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_n_24_contact_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_i_24_contact_wa_count', defaultMessage: '' }),
      render: (_, record) => {

        return (
          <>
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.t_24_contact_call_count!)}
            -
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.b_n_24_contact_sms_count!)}
            -
            {formatValue(record!.a_a_a_a_a_n_j_collection_order_sub!.b_i_24_contact_wa_count!)}
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.w_view_times', defaultMessage: '' }),
      dataIndex: 'w_view_times',
      key: 'w_view_times',
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.a_m_current_day_view_time', defaultMessage: '' }),
      dataIndex: 'a_m_current_day_view_time',
      key: 'a_m_current_day_view_time',
    },
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => onEditClick(record.id!)}>
            {intl.formatMessage({ id: 'pages.common.transfer', defaultMessage: '' })}
          </a>
        );
        return [edit];
      },
    },
    
  ];

  const columns2: ProColumns<API.QHCollectionOrderSubDetail>[] = [
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.a_date', defaultMessage: '' }),
      dataIndex: 'd_b_date',
      key: 'd_b_date',
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.e_collection_admin_id', defaultMessage: '' }),
      dataIndex: 'd_a_collection_admin_id',
      key: 'd_a_collection_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.morning', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.h_12_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_b_12_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.m_12_wa_count', defaultMessage: '' }),
      render: (_, record) => (
        <>
          {formatValue(record!.h_12_call_count!)}
          -
          {formatValue(record!.b_b_12_sms_count!)}
          -
          {formatValue(record!.m_12_wa_count!)}
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'pages.common.morning', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.r_12_contact_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_l_12_contact_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_g_12_contact_wa_count', defaultMessage: '' }),
      render: (_, record) => (
        <>
          {formatValue(record!.r_12_contact_call_count!)}
          -
          {formatValue(record!.b_l_12_contact_sms_count!)}
          -
          {formatValue(record!.b_g_12_contact_wa_count!)}
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'pages.common.afternoon', defaultMessage: '' }),
      dataIndex: 'b_e_18_log_count',
      key: 'b_e_18_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.i_18_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_c_18_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.n_18_wa_count', defaultMessage: '' }),
      render: (_, record) => {
        return (
          <>
            {formatValue(record!.i_18_call_count!)}
            -
            {formatValue(record!.b_c_18_sms_count!)}
            -
            {formatValue(record!.n_18_wa_count!)}
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.afternoon', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.s_18_contact_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_m_18_contact_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_h_18_contact_wa_count', defaultMessage: '' }),
      render: (_, record) => {
        return (
          <>
            {formatValue(record!.s_18_contact_call_count!)}
            -
            {formatValue(record!.b_m_18_contact_sms_count!)}
            -
            {formatValue(record!.b_h_18_contact_wa_count!)}
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.night', defaultMessage: '' }),
      dataIndex: 'b_i_24_log_count',
      key: 'b_i_24_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.j_24_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_d_24_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.o_24_wa_count', defaultMessage: '' }),
      render: (_, record) => {
        return (
          <>
            {formatValue(record!.j_24_call_count!)}
            -
            {formatValue(record!.b_d_24_sms_count!)}
            -
            {formatValue(record!.o_24_wa_count!)}
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.night', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.NJCollectionOrderSub.t_24_contact_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_n_24_contact_sms_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.NJCollectionOrderSub.b_i_24_contact_wa_count', defaultMessage: '' }),
      render: (_, record) => {

        return (
          <>
            {formatValue(record!.t_24_contact_call_count!)}
            -
            {formatValue(record!.b_n_24_contact_sms_count!)}
            -
            {formatValue(record!.b_i_24_contact_wa_count!)}
          </>
        );
      },
    },
    
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '我的催收',
        ghost: true,
      }}
    >
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 50,
        }}
        expandable={{
          rowExpandable: (record) => record.a_a_a_a_a_q_h_collection_order_sub_details && record.a_a_a_a_a_q_h_collection_order_sub_details.length > 0,
          expandedRowRender: (record) => (
            <ProTable
              rowKey="id"
              columns={columns2}
              dataSource={record.a_a_a_a_a_q_h_collection_order_sub_details || []}
              pagination={false}
              headerTitle={false}
              search={false}
              options={false}
            />
          ),
        }}
      />
      <DrawerFC
        showDetail={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        admins={admins}
        admins2={admins2}
        data={currentRow?.a_a_a_a_a_n_c_collection_order_flow_histories!}
        type={type}
      />
      <LogDrawerFC
        showDetail={showLogDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowLogDetail(false);
        }}
        admins={admins}
        data={currentRow?.a_a_a_a_a_q_c_collection_news!}
        type={type}
      />

      <CreateForm
        onSubmit={async (success) => {
          if (success) {
            handleCreateModalVisible(false);
            setId(0);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCreateModalVisible(false);
          setId(0);
        }}
        id={id}
        modalVisible={createModalVisible}
        admins={admins}
      />
    </PageContainer>
  );
};

export default TableList;

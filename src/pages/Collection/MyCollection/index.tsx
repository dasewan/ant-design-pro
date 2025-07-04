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
import { useIntl } from '@@/exports';
import {
  EditOutlined,
  PhoneOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
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
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.r_flow_in_time', defaultMessage: '' }),
      dataIndex: 'r_flow_in_time',
      key: 'r_flow_in_time',
      render: (text) => {
        if (text) {
          const validText = typeof text === 'string' || typeof text === 'number' ? text : Date.now();
          const date = new Date(validText);
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${month}-${day}`;
        }
        return text;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.p_expect_repay_time', defaultMessage: '' }),
      dataIndex: 'p_expect_repay_time',
      key: 'p_expect_repay_time',
      render: (text) => {
        if (text) {
          const validText = typeof text === 'string' || typeof text === 'number' ? text : Date.now();
          const date = new Date(validText);
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${month}-${day}`;
        }
        return text;
      },
    },

    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.s_flow_out_time', defaultMessage: '' }),
      dataIndex: 's_flow_out_time',
      key: 's_flow_out_time',
      render: (text) => {
        if (text) {
          const validText = typeof text === 'string' || typeof text === 'number' ? text : Date.now();
          const date = new Date(validText);
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${month}-${day}`;
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
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_m_yesterday_count', defaultMessage: '' }),
      dataIndex: 'b_m_yesterday_log_count',
      key: 'b_m_yesterday_log_count',
      tooltip: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_m_yesterday_log_count', defaultMessage: '' }) + ' - ' + 
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_n_yesterday_call_count', defaultMessage: '' }) + ' - ' +
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_o_yesterday_contact_call_count', defaultMessage: '' }),
      render: (_, record) => {
        return record!.a_a_a_a_a_n_j_collection_order_sub!.f_yesterday_log_count! + '-' + (record!.a_a_a_a_a_n_j_collection_order_sub!.b_12_log_count! + record!.a_a_a_a_a_n_j_collection_order_sub!.d_18_log_count!+ record!.a_a_a_a_a_n_j_collection_order_sub!.e_24_log_count!);
      },
    },
  ];

  const columns2: ProColumns<API.QCCollectionNews>[] = [
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.e_collection_admin_id', defaultMessage: '' }),
      dataIndex: 'e_collection_admin_id',
      key: 'e_collection_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.f_cat', defaultMessage: '' }),
      dataIndex: 'f_cat',
      key: 'f_cat',
      render: (text) => {
        switch(text) {
          case 0: return <EditOutlined style={{ color: 'black', fontSize: '18px' }} />;
          case 1: return <PhoneOutlined style={{ color: 'blue' , fontSize: '18px' }} />;
          case 6: return <ContactsOutlined style={{ color: 'green', fontSize: '18px'  }} />;
          default: return text;
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.g_type', defaultMessage: '' }),
      dataIndex: 'g_type',
      key: 'g_type',
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
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.j_content', defaultMessage: '' }),
      dataIndex: 'j_content',
      key: 'j_content',
      render: (text, record) => {
        if (!text) return null;
        if (record.f_cat === 1 || record.f_cat === 6) {
          return (
            <audio
              controls
              src={`https://api.dasewan.cn/storage/${text}`}
            />
          );
        }
        return text;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.k_promise_time', defaultMessage: '' }),
      dataIndex: 'k_promise_time',
      key: 'k_promise_time',
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.m_overdue_days', defaultMessage: '' }),
      dataIndex: 'm_overdue_days',
      key: 'm_overdue_days',
    },
    {
      title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'date',
    }
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
    rowExpandable: (record) => record.a_a_a_a_a_q_c_collection_news && record.a_a_a_a_a_q_c_collection_news.length > 0,
          expandedRowRender: (record) => (
            <ProTable
              rowKey="id"
              columns={columns2}
              dataSource={record.a_a_a_a_a_q_c_collection_news || []}
              pagination={false}
              headerTitle={false}
              search={false}
              options={false}
            />
          ),
        }}
      />
    </PageContainer>
  );
};

export default TableList;

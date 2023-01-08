import { CALLBACK_CODE, LOAN_LOG_STATUS, LOAN_LOG_TYPE, SYNC_CODE } from '@/pages/enums';
import DetailModel from '@/pages/Loan/LoanLog/components/DetailModel';
import { getChannelsEnum } from '@/pages/UserManager/AUser/service';
import { getUsersEnum } from '@/pages/UserManager/RBlack/service';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import styles from './index.less';
import { FieldIndex, FieldLabels, index } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 当前编辑数据 */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 当前数据 */
  const [newRecord, setNewRecord] = useState<TableListItem>();
  /** 明细model */
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);

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
    // @ts-ignore

    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: res.success,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.total,
    };
  };

  /**
   * 查询管理员enum
   */
  const _getUsersEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length == 0) {
      const res = await getUsersEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.name,
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
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length == 0) {
      const res = await getChannelsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_title,
          value: item.id,
        });
      }
      setChannels(data);
      return data;
    } else {
      return channels;
    }
  };

  /**
   * 展示明细model
   * @param record
   */
  const onDetailClick = (record: TableListItem) => {
    setNewRecord(record);
    setDetailModalVisible(true);
  };

  /**
   * 关闭明细model
   */
  const onDetailModelOk = () => {
    setDetailModalVisible(false);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_a_a_a_a_d_borrow.h_sn,
      dataIndex: ['a_a_a_a_a_d_borrow', 'h_sn'],
      copyable: true,
      width: 160,
      fixed: 'left',
    },
    {
      title: '订单信息',
      search: false,
      children: [
        {
          title: FieldLabels.a_a_a_a_a_d_borrow.b_channel_id,
          dataIndex: ['a_a_a_a_a_d_borrow', 'b_channel_id'],
          valueType: 'select',
          request: _getChannelsEnum,
          params: { timestamp: Math.random() },
          width: 140,
        },
        {
          title: FieldLabels.a_a_a_a_a_d_borrow.a_l_name1,
          dataIndex: ['a_a_a_a_a_d_borrow', 'a_l_name1'],
          width: 140,
        },
        {
          title: FieldLabels.a_a_a_a_a_d_borrow.a_k_phone,
          dataIndex: ['a_a_a_a_a_d_borrow', 'a_k_phone'],
          copyable: true,
          width: 140,
        },
        {
          title: FieldLabels.a_a_a_a_a_d_borrow.created_at,
          dataIndex: ['a_a_a_a_a_d_borrow', 'created_at'],
          valueType: 'dateRange',
          render: (_, value) => {
            return moment(value.a_a_a_a_a_d_borrow!.created_at).format('YYYY-MM-DD HH:mm');
          },
          search: {
            transform: (value: any) => ({
              'a_a_a_a_a_d_borrow-created_at[0]': value[0],
              'a_a_a_a_a_d_borrow-created_at[1]': value[1],
            }),
          },
          width: 140,
        },
        {
          title: FieldLabels.a_a_a_a_a_d_borrow.l_borrow_count,
          dataIndex: ['a_a_a_a_a_d_borrow', 'l_borrow_count'],
          width: 80,
        },
        {
          title: FieldLabels.a_a_a_a_a_d_borrow.m_borrow_amount,
          dataIndex: ['a_a_a_a_a_d_borrow', 'm_borrow_amount'],
          width: 80,
        },
      ],
    },
    {
      title: '流水信息',
      search: false,
      className: styles.blue,
      children: [
        {
          title: FieldLabels.c_admin_id,
          dataIndex: FieldIndex.c_admin_id,
          valueType: 'select',
          request: _getUsersEnum,
          className: styles.blue,
          params: { timestamp: Math.random() },
          render: (_, record) => {
            //todo 如果管理员状态被禁用，删除线
            return admins.find((item) => {
              return item.role_id == 1 && item.id == record.c_admin_id;
            }) ? (
              <del>{_}</del>
            ) : (
              _
            );
          },
          width: 80,
        },
        {
          title: FieldLabels.e_payment_channel,
          dataIndex: FieldIndex.e_payment_channel,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.g_type,
          dataIndex: FieldIndex.g_type,
          initialValue: [],
          valueType: 'select',
          valueEnum: LOAN_LOG_TYPE,
          className: styles.blue,
          width: 90,
        },

        {
          title: FieldLabels.i_receiver_name,
          dataIndex: FieldIndex.i_receiver_name,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.j_receiver_bankcard_number,
          dataIndex: FieldIndex.j_receiver_bankcard_number,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.k_receiver_bankcard_name,
          dataIndex: FieldIndex.k_receiver_bankcard_name,
          className: styles.blue,
          width: 140,
        },

        {
          title: FieldLabels.q_outer_sn,
          dataIndex: FieldIndex.q_outer_sn,
          className: styles.blue,
          width: 140,
          copyable: true,
        },
      ],
    },
    {
      title: FieldLabels.a_b_index,
      dataIndex: FieldIndex.a_b_index,
      width: 80,
      fixed: 'right',
    },
    {
      title: FieldLabels.o_loan_time,
      dataIndex: FieldIndex.o_loan_time,
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.o_loan_time).format('YYYY-MM-DD HH:mm:ss');
      },
      search: {
        transform: (value: any) => ({ 'd_loan_time[0]': value[0], 'd_loan_time[1]': value[1] }),
      },
      fixed: 'right',
      width: 150,
    },
    {
      title: FieldLabels.r_amount,
      dataIndex: FieldIndex.r_amount,
      width: 100,
      fixed: 'right',
    },
    {
      title: FieldLabels.t_sync_code,
      dataIndex: FieldIndex.t_sync_code,
      initialValue: [],
      valueType: 'select',
      valueEnum: SYNC_CODE,
      width: 100,
      fixed: 'right',
    },
    {
      title: FieldLabels.w_callback_code,
      dataIndex: FieldIndex.w_callback_code,
      initialValue: [],
      valueType: 'select',
      valueEnum: CALLBACK_CODE,
      width: 120,
      fixed: 'right',
    },
    {
      title: FieldLabels.h_status,
      dataIndex: FieldIndex.h_status,
      initialValue: [],
      valueType: 'select',
      valueEnum: LOAN_LOG_STATUS,
      width: 90,
      fixed: 'right',
    },
    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record) => {
        const edit = (
          <a key="overdue" onClick={() => onDetailClick(record)}>
            明细
          </a>
        );

        return [edit];
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '放款流水',
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
        bordered={true}
        scroll={{ x: '50%' }}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 50,
        }}
      />
      {/*明细model*/}
      <DetailModel
        onOk={onDetailModelOk}
        admins={admins}
        channels={channels}
        modalVisible={detailModalVisible}
        id={newRecord?.id}
      />
    </PageContainer>
  );
};

export default TableList;

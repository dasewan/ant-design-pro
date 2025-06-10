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
      valueType: 'date',
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.p_expect_repay_time', defaultMessage: '' }),
      dataIndex: 'p_expect_repay_time',
      key: 'p_expect_repay_time',
      valueType: 'date',
    },

    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.s_flow_out_time', defaultMessage: '' }),
      dataIndex: 's_flow_out_time',
      key: 's_flow_out_time',
      valueType: 'date',
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_m_yesterday_count', defaultMessage: '' }),
      dataIndex: 'b_m_yesterday_log_count',
      key: 'b_m_yesterday_log_count',
      tooltip: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_m_yesterday_log_count', defaultMessage: '' }) + ' - ' + 
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_n_yesterday_call_count', defaultMessage: '' }) + ' - ' +
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_o_yesterday_contact_call_count', defaultMessage: '' }),
      render: (_, record) => {
        return record!.b_m_yesterday_log_count + '-' + record!.b_n_yesterday_call_count + '-' + record!.b_o_yesterday_contact_call_count;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_a_12_count', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_a_12_log_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_b_12_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_c_12_contact_call_count', defaultMessage: '' }),
      render: (_, record) => {
        return record!.b_a_12_log_count + '-' + record!.b_b_12_call_count + '-' + record!.b_c_12_contact_call_count;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_e_18_count', defaultMessage: '' }),
      dataIndex: 'b_e_18_log_count',
      key: 'b_e_18_log_count',
      tooltip: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_e_18_log_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_f_18_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_g_18_contact_call_count', defaultMessage: '' }),
      render: (_, record) => {
        return record!.b_e_18_log_count + '-' + record!.b_f_18_call_count + '-' + record!.b_g_18_contact_call_count;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_i_24_count', defaultMessage: '' }),
      dataIndex: 'b_i_24_log_count',
      key: 'b_i_24_log_count',
      tooltip: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_i_24_log_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_j_24_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_k_24_contact_call_count', defaultMessage: '' }),
      render: (_, record) => {
        return record!.b_i_24_log_count + '-' + record!.b_j_24_call_count + '-' + record!.b_k_24_contact_call_count;
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
      />
    </PageContainer>
  );
};

export default TableList;

import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1MBLoans as index } from '@/services/ant-design-pro/MBLoan';
import { useIntl } from '@@/exports';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  /** 风控字段展示 */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);

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
    const res = await index({ page: params.current, f_status: 20, ...params });
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
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length === 0) {
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.h_sn', defaultMessage: '' }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'h_sn'],
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-h_sn': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.b_channel_id',
        defaultMessage: '',
      }),
      dataIndex: 'b_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.a_k_phone', defaultMessage: '' }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'a_k_phone'],
      copyable: true,
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-a_k_phone': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.m_borrow_amount',
        defaultMessage: '',
      }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'm_borrow_amount'],
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-m_borrow_amount': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.p_loan_amount',
        defaultMessage: '',
      }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'p_loan_amount'],
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-p_loan_amount': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.l_borrow_count',
        defaultMessage: '',
      }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'l_borrow_count'],
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-l_borrow_count': value }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Loan.g_receiver_name', defaultMessage: '' }),
      dataIndex: 'g_receiver_name',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Loan.h_receiver_bankcard_number',
        defaultMessage: '',
      }),
      dataIndex: 'h_receiver_bankcard_number',
    },
    {
      title: intl.formatMessage({ id: 'pages.Loan.l_call_times', defaultMessage: '' }),
      dataIndex: 'l_call_times',
    },
    {
      title: intl.formatMessage({ id: 'pages.Loan.c_payment_channel', defaultMessage: '' }),
      dataIndex: 'c_payment_channel',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.created_at', defaultMessage: '' }),
      dataIndex: 'a_a_a_a_a_d_borrow.created_at',
      render: (_, record) => {
        return moment(record.created_at).format('YYYY-MM-DD HH:mm:ss');
      },
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'a_a_a_a_a_d_borrow-created_at[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'a_a_a_a_a_d_borrow-created_at[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Loan.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.d_loan_time).format('YYYY-MM-DD HH:mm:ss');
      },
      search: {
        transform: (value: any) => {
          return {
            'created_at[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'created_at[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
  ];

  // @ts-ignore
  return (
    <>
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
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
    </>
  );
};

export default TableList;

import { BORROW_STATUS_ENUM, BORROW_SUB_STATUS_ENUM } from '@/pages/enums';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1ProductsEnum as getProductsEnum } from '@/services/ant-design-pro/BProduct';
import { getAdminV1DBorrows as index } from '@/services/ant-design-pro/DBorrow';
import { getAdminV1GGRiskStrateiesEnums as getStrateiesEnums } from '@/services/ant-design-pro/GGRiskStratey';
import { history } from '@@/core/history';
import { useIntl } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from '../BorrowList/data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  const [products, setProducts] = useState<RequestOptionsType[]>([]);
  const [strateies, setStrateies] = useState<RequestOptionsType[]>([]);

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
  /**
   * 查询产品enum
   */
  const _getProductsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (products.length === 0) {
      const res = await getProductsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.b_name,
          value: item.id!.toString(),
        });
      }
      setProducts(data);
      return data;
    } else {
      return products;
    }
  };
  /**
   * 查询策略enum
   */
  const _getStrateiesEnums = async () => {
    const data: RequestOptionsType[] = [];
    if (strateies.length === 0) {
      const res = await getStrateiesEnums({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name + '(' + item.f_version + ')',
          value: item.id,
        });
      }
      setStrateies(data);
      return data;
    } else {
      return strateies;
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.h_sn',
        defaultMessage: '',
      }),
      dataIndex: 'h_sn',
      copyable: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.a_k_phone',
        defaultMessage: '',
      }),
      dataIndex: 'a_k_phone',
      copyable: true,
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
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.l_borrow_count',
        defaultMessage: '',
      }),
      dataIndex: 'l_borrow_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.d_product_id',
        defaultMessage: '',
      }),
      dataIndex: 'd_product_id',
      valueType: 'select',
      request: _getProductsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.a_p_period_count',
        defaultMessage: '',
      }),
      dataIndex: 'a_p_period_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.m_borrow_amount',
        defaultMessage: '',
      }),
      dataIndex: 'm_borrow_amount',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.p_loan_amount',
        defaultMessage: '',
      }),
      dataIndex: 'p_loan_amount',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.o_loan_time',
        defaultMessage: '',
      }),
      dataIndex: 'o_loan_time',
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.o_loan_time).format('YYYY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => {
          return {
            'o_loan_time[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'o_loan_time[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.s_amount_paid',
        defaultMessage: '',
      }),
      dataIndex: 's_amount_paid',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.q_expect_repay_time',
        defaultMessage: '',
      }),
      dataIndex: 'q_expect_repay_time',
      valueType: 'dateRange',
      render: (_, value) => {
        if (value.q_expect_repay_time !== null) {
          return moment(value.q_expect_repay_time).format('YYYY-MM-DD');
        } else {
          return '-';
        }
      },
      search: {
        transform: (value: any) => {
          return {
            'q_expect_repay_time[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'q_expect_repay_time[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.t_settled_time',
        defaultMessage: '',
      }),
      dataIndex: 't_settled_time',
      valueType: 'dateRange',
      render: (_, value) => {
        if (value.t_settled_time !== null) {
          return moment(value.t_settled_time).format('YYYY-MM-DD HH:mm');
        } else {
          return '-';
        }
      },
      search: {
        transform: (value: any) => {
          return {
            't_settled_time[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            't_settled_time[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.a_h_total_overdue_days',
        defaultMessage: '',
      }),
      dataIndex: 'a_h_total_overdue_days',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.g_risk_strategy_id',
        defaultMessage: '',
      }),
      dataIndex: 'g_risk_strategy_id',
      valueType: 'select',
      request: _getStrateiesEnums,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.a_a_risk_score',
        defaultMessage: '',
      }),
      dataIndex: 'a_a_risk_score',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.a_f_operate_times',
        defaultMessage: '',
      }),
      dataIndex: 'a_f_operate_times',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.j_status',
        defaultMessage: '',
      }),
      dataIndex: 'j_status',
      valueEnum: BORROW_STATUS_ENUM,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.k_sub_status',
        defaultMessage: '',
      }),
      dataIndex: 'k_sub_status',
      valueEnum: BORROW_SUB_STATUS_ENUM,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.common.created_at',
        defaultMessage: '',
      }),
      dataIndex: 'created_at',
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.created_at).format('YYYY-MM-DD HH:mm');
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
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'id',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => history.push(`/borrow/detail/${record.id}`)}>
            {intl.formatMessage({ id: 'pages.common.option.detail', defaultMessage: '' })}
          </a>
        );
        return [edit];
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer>
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

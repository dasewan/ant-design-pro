import { REPAY_LOG_STATUS } from '@/pages/enums';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1MCExtends as index } from '@/services/ant-design-pro/MCExtend';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 管理员enum */
  /** 当前编辑数据 */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 当前数据 */
  /** 明细model */

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
      title: '展期信息',
      search: false,
      className: styles.blue,
      children: [
        {
          title: FieldLabels.c_period_count,
          dataIndex: FieldIndex.c_period_count,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.x_period_index,
          dataIndex: FieldIndex.x_period_index,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.d_index,
          dataIndex: FieldIndex.d_index,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.m_days,
          dataIndex: FieldIndex.m_days,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.l_overdue_days,
          dataIndex: FieldIndex.l_overdue_days,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.n_before_expect_repay_time,
          dataIndex: FieldIndex.n_before_expect_repay_time,
          valueType: 'dateRange',
          render: (_, value) => {
            return moment(value.n_before_expect_repay_time).format('YYYY-MM-DD HH:mm:ss');
          },
          search: {
            transform: (value: any) => ({
              'n_before_expect_repay_time[0]': value[0],
              'n_before_expect_repay_time[1]': value[1],
            }),
          },
          width: 140,
        },
        {
          title: FieldLabels.o_after_expect_repay_time,
          dataIndex: FieldIndex.o_after_expect_repay_time,
          valueType: 'dateRange',
          render: (_, value) => {
            return moment(value.o_after_expect_repay_time).format('YYYY-MM-DD HH:mm:ss');
          },
          search: {
            transform: (value: any) => ({
              'o_after_expect_repay_time[0]': value[0],
              'o_after_expect_repay_time[1]': value[1],
            }),
          },
          width: 140,
        },

        {
          title: FieldLabels.q_extend_fee,
          dataIndex: FieldIndex.q_extend_fee,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.r_extend_violate_fee,
          dataIndex: FieldIndex.r_extend_violate_fee,
          className: styles.blue,
          width: 140,
        },
        {
          title: FieldLabels.s_extend_overdue_fee,
          dataIndex: FieldIndex.s_extend_overdue_fee,
          className: styles.blue,
          width: 140,
        },
      ],
    },
    {
      title: FieldLabels.updated_at,
      dataIndex: FieldIndex.updated_at,
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.updated_at).format('YYYY-MM-DD HH:mm:ss');
      },
      search: {
        transform: (value: any) => ({ 'd_loan_time[0]': value[0], 'd_loan_time[1]': value[1] }),
      },
      fixed: 'right',
      width: 150,
    },
    {
      title: FieldLabels.p_extend_amount,
      dataIndex: FieldIndex.p_extend_amount,
      width: 100,
      fixed: 'right',
    },
    {
      title: FieldLabels.e_status,
      dataIndex: FieldIndex.e_status,
      initialValue: [],
      valueType: 'select',
      valueEnum: REPAY_LOG_STATUS,
      className: styles.blue,
      width: 90,
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '展期列表',
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
    </PageContainer>
  );
};

export default TableList;

import { getAdminV1BLCollectionOrders as index } from '@/services/ant-design-pro/BLCollectionOrder';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import React, { useRef } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */

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

  //
  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.t_borrow_sn,
      dataIndex: FieldIndex.t_borrow_sn,
    },
    {
      title: FieldLabels.a_e_borrow_count,
      dataIndex: FieldIndex.a_e_borrow_count,
    },
    {
      title: FieldLabels.u_phone,
      dataIndex: FieldIndex.u_phone,
    },
    {
      title: FieldLabels.v_name,
      dataIndex: FieldIndex.v_name,
    },
    {
      title: FieldLabels.n_borrow_amount,
      dataIndex: FieldIndex.n_borrow_amount,
    },
    {
      title: FieldLabels.x_current_view_times,
      dataIndex: FieldIndex.x_current_view_times,
    },
    {
      title: FieldLabels.y_current_log_count,
      dataIndex: FieldIndex.y_current_log_count,
    },
    {
      title: FieldLabels.a_b_current_commission,
      dataIndex: FieldIndex.a_b_current_commission,
    },
    {
      title: FieldLabels.a_c_expect_current_commission,
      dataIndex: FieldIndex.a_c_expect_current_commission,
    },
    {
      title: FieldLabels.r_flow_in_time,
      dataIndex: FieldIndex.r_flow_in_time,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.r_flow_in_time).format('YY-MM-DD HH:mm');
      },
    },
    {
      title: FieldLabels.s_flow_out_time,
      dataIndex: FieldIndex.s_flow_out_time,
      valueType: 'dateRange',
      render: (_, record) => {
        const now = moment();
        const diff = moment(record!.r_flow_in_time).diff(now);
        return moment.duration(diff).days() + 'Days,' + moment.duration(diff).hours() + 'Hours';
      },
    },
    {
      title: FieldLabels.k_status,
      dataIndex: FieldIndex.k_status,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => {
        const edit = <a key="edit">编辑</a>;
        return [edit];
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
      />
    </PageContainer>
  );
};

export default TableList;

import { history } from '@@/core/history';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Tag } from 'antd';
import moment from 'moment';
import React, { useRef } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { EXECUTE_LOGIC, FINNAL_DECISION } from './enums';
import { FieldIndex, FieldLabels, index } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

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
    const res = await index({ k_is_current: 1, page: params.current, ...params });

    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: res.success,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.total,
    };
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: FieldIndex.a_name,
    },
    {
      title: FieldLabels.m_version_count,
      dataIndex: FieldIndex.m_version_count,
    },
    {
      title: FieldLabels.j_version,
      dataIndex: FieldIndex.j_version,
    },
    {
      title: FieldLabels.b_related_role_group_count,
      dataIndex: FieldIndex.b_related_role_group_count,
    },
    {
      title: FieldLabels.d_score_upper_limit,
      dataIndex: FieldIndex.d_score_upper_limit,
    },

    {
      title: FieldLabels.e_execute_logic,
      dataIndex: FieldIndex.e_execute_logic,
      valueType: 'select',
      initialValue: [],
      valueEnum: EXECUTE_LOGIC,
      render: (_, record) => (
        <Tag color={EXECUTE_LOGIC[record.e_execute_logic!].color}>
          {EXECUTE_LOGIC[record.e_execute_logic!].text}
        </Tag>
      ),
    },
    {
      title: FieldLabels.f_finnal_decision,
      dataIndex: FieldIndex.f_finnal_decision,
      valueType: 'select',
      initialValue: [],
      valueEnum: FINNAL_DECISION,
      render: (_, record) => (
        <Tag color={FINNAL_DECISION[record.f_finnal_decision!].color}>
          {FINNAL_DECISION[record.f_finnal_decision!].text}
        </Tag>
      ),
    },
    {
      title: FieldLabels.g_description,
      dataIndex: FieldIndex.g_description,
      ellipsis: true,
    },
    {
      title: FieldLabels.created_at,
      dataIndex: FieldIndex.created_at,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.created_at).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({
          'created_at[0]': value[0],
          'created_at[1]': value[1],
        }),
      },
    },
    {
      title: FieldLabels.updated_at,
      dataIndex: FieldIndex.updated_at,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.updated_at).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({
          'updated_at[0]': value[0],
          'updated_at[1]': value[1],
        }),
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => history.push(`/risk/risk-role-bundle/detail/${record.id}`)}>
            编辑
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
        title: '规则管理',
        ghost: true,
        extra: [
          <Button
            key="3"
            type="primary"
            onClick={() => history.push(`/risk/risk-role-bundle/detail/0`)}
          >
            新建规则
          </Button>,
        ],
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

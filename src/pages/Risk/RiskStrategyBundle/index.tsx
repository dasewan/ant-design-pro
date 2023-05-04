import { history } from '@@/core/history';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

import { getAdminV1GGRiskStrateies as index } from '@/services/ant-design-pro/GGRiskStratey';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);

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
    const res = await index({ g_is_current: 1, page: params.current, ...params });

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
    if (admins.length === 0) {
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: FieldIndex.a_name,
    },
    {
      title: FieldLabels.j_fuse,
      dataIndex: FieldIndex.j_fuse,
    },
    {
      title: FieldLabels.b_related_role_group_count,
      dataIndex: FieldIndex.b_related_role_group_count,
    },
    {
      title: FieldLabels.c_related_role_count,
      dataIndex: FieldIndex.c_related_role_count,
    },
    {
      title: FieldLabels.f_version,
      dataIndex: FieldIndex.f_version,
    },
    {
      title: FieldLabels.i_version_count,
      dataIndex: FieldIndex.i_version_count,
    },
    {
      title: '电销人员',
      dataIndex: 'k_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.k_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
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
          <a
            key="edit"
            onClick={() => history.push(`/risk/risk-strategy-bundle/detail/${record.id}`)}
          >
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
        title: '策略管理',
        ghost: true,
        extra: [
          <Button
            key="3"
            type="primary"
            onClick={() => history.push(`/risk/risk-role-bundle/detail/0`)}
          >
            新建策略
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

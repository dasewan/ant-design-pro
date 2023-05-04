import { FLOW_TYPE } from '@/pages/Review/ReviewBorrowFlow/enums';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

import { getAdminV1APReviewGroupsEnum as getAPReviewGroupsEnum } from '@/services/ant-design-pro/APReviewGroup';
import { getAdminV1BHReviewBorrowFlows as index } from '@/services/ant-design-pro/BHReviewBorrowFlow';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 审核组enum */
  const [groups, setGroups] = useState<RequestOptionsType[]>([]);

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
          value: item.id!.toString(),
        });
      }
      setAdmins(data);
      return data;
    } else {
      return admins;
    }
  };
  /**
   * 查询审核组enum
   */
  const _getAPReviewGroupsEnum = async () => {
    const data: RequestOptionsType[] = [];
    console.log(123);
    if (groups.length === 0) {
      const res = await getAPReviewGroupsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id!.toString(),
        });
      }
      setGroups(data);
      return data;
    } else {
      return groups;
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
    const res = await index({ page: params.current, ...params, c_result: 10 });

    /*    if(admins.length === 0){
          // @ts-ignore
          await _getUsersEnum();
        }*/
    if (groups.length === 0) {
      // @ts-ignore
      await _getAPReviewGroupsEnum();
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单号',
      dataIndex: ['a_a_a_a_a_d_borrow', 'h_sn'],
      copyable: true,
      search: {
        transform: (value: any) => ({ 'd_borrow-h_sn': value }),
      },
    },
    {
      title: '手机号',
      dataIndex: ['a_a_a_a_a_d_borrow', 'ak_phone'],
      copyable: true,
      search: {
        transform: (value: any) => ({ 'd_borrow-ak_phone': value }),
      },
    },
    {
      title: '借款金额',
      dataIndex: ['a_a_a_a_a_d_borrow', 'm_borrow_amount'],
      search: {
        transform: (value: any) => ({ 'd_borrow-m_borrow_amount': value }),
      },
    },
    {
      title: '借款次数',
      dataIndex: ['a_a_a_a_a_d_borrow', 'l_borrow_count'],
      search: {
        transform: (value: any) => ({ 'd_borrow-l_borrow_count': value }),
      },
    },
    {
      title: FieldLabels.c_before_review_group_id,
      dataIndex: FieldIndex.c_before_review_group_id,
      valueType: 'select',
      request: _getAPReviewGroupsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.g_type,
      dataIndex: FieldIndex.g_type,
      valueType: 'select',
      valueEnum: FLOW_TYPE,
    },
    {
      title: FieldLabels.b_before_admin_id,
      dataIndex: FieldIndex.b_before_admin_id,
      valueType: 'select',
      request: _getUsersEnum,
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.b_before_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: FieldLabels.e_after_review_group_id,
      dataIndex: FieldIndex.e_after_review_group_id,
      valueType: 'select',
      request: _getAPReviewGroupsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.d_after_admin_id,
      dataIndex: FieldIndex.d_after_admin_id,
      valueType: 'select',
      request: _getUsersEnum,
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.d_after_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: '流转时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => {
        return moment(record.created_at).format('YYYY-MM-DD HH:mm');
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '审核订单流转记录',
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

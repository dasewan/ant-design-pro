import { getChannelsEnum } from '@/pages/UserManager/AUser/service';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels, index } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 渠道enum */
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.h_sn,
      dataIndex: FieldIndex.h_sn,
    },
    {
      title: FieldLabels.l_borrow_count,
      dataIndex: FieldIndex.l_borrow_count,
    },
    {
      title: FieldLabels.m_borrow_amount,
      dataIndex: FieldIndex.m_borrow_amount,
    },
    {
      title: FieldLabels.p_loan_amount,
      dataIndex: FieldIndex.p_loan_amount,
    },
    {
      title: FieldLabels.b_channel_id,
      dataIndex: FieldIndex.b_channel_id,
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.a_k_phone,
      dataIndex: FieldIndex.a_k_phone,
    },
    {
      title: FieldLabels.a_l_name1,
      dataIndex: FieldIndex.a_l_name1,
    },
    {
      title: FieldLabels.created_at,
      dataIndex: FieldIndex.created_at,
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.created_at).format('YYYY-MM-DD');
      },
      search: {
        transform: (value: any) => ({ 'created_at[0]': value[0], 'created_at[1]': value[1] }),
      },
    },
    {
      title: FieldLabels.updated_at,
      dataIndex: FieldIndex.updated_at,
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.updated_at).format('YYYY-MM-DD');
      },
      search: {
        transform: (value: any) => ({ 'updated_at[0]': value[0], 'updated_at[1]': value[1] }),
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '放款队列',
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

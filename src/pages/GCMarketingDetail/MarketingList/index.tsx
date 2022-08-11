import { getChannelsEnum } from '@/pages/AUser/service';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { getGCMarketingHistories, index } from './service';

const TableList: React.FC = () => {
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 批次enum */
  const [batchSns, setBatchSns] = useState<RequestOptionsType[]>([]);
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
    const res = await index({ type: 3, page: params.current, ...params });
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

  /**
   * 查询渠道enum
   */
  const _getGCMarketingHistories: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (batchSns.length == 0) {
      const res = await getGCMarketingHistories({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.e_batch_sn,
          value: item.id,
        });
      }
      setBatchSns(data);
      return data;
    } else {
      return batchSns;
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '电话',
      dataIndex: 'a_phone',
      tooltip: '规则名称是唯一的',
      copyable: true,
    },
    {
      title: '渠道',
      dataIndex: 'i_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: '录入时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.created_at).format('YY-MM-DD');
      },
      search: {
        transform: (value: any) => ({
          'created_at[0]': value[0],
          'created_at[1]': value[1],
        }),
      },
    },
    {
      title: '上次成功时间',
      dataIndex: 'l_last_marketing_time',
      valueType: 'dateRange',
      render: (_, record) => {
        return record.l_last_marketing_time
          ? moment(record.l_last_marketing_time).format('YY-MM-DD HH:mm')
          : '-';
      },
      search: {
        transform: (value: any) => ({
          'l_last_marketing_time[0]': value[0],
          'l_last_marketing_time[1]': value[1],
        }),
      },
    },
    {
      title: '最近查看时间',
      dataIndex: 'm_last_viewed_time',
      valueType: 'dateRange',
      render: (_, record) => {
        return record.m_last_viewed_time
          ? moment(record.m_last_viewed_time).format('YY-MM-DD HH:mm')
          : '-';
      },
      search: {
        transform: (value: any) => ({
          'm_last_viewed_time[0]': value[0],
          'm_last_viewed_time[1]': value[1],
        }),
      },
    },
    {
      title: '批次',
      dataIndex: 'f_marketing_history_id',
      valueType: 'select',
      request: _getGCMarketingHistories,
      params: { timestamp: Math.random() },
    },
    {
      title: '短信次数',
      dataIndex: 'g_sms_times',
    },
    {
      title: '邮件次数',
      dataIndex: 'h_email_times',
    },
    {
      title: '查看次数',
      dataIndex: 'k_view_count',
    },
  ];

  return (
    <div>
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
    </div>
  );
};

export default TableList;

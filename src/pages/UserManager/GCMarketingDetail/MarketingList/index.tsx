import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1GAMarketingDetails as index } from '@/services/ant-design-pro/GAMarketingDetail';
import { getAdminV1GCMarketingHistories as getGCMarketingHistories } from '@/services/ant-design-pro/GCMarketingHistory';
import { useIntl } from '@@/exports';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
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
    const res = await index({ type: 1, page: params.current, ...params });
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
   * 查询渠道enum
   */
  const _getGCMarketingHistories: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (batchSns.length === 0) {
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
    //todo 动态draw和复制分离
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingDetail.a_phone',
        defaultMessage: '',
      }),
      dataIndex: 'a_phone',
      tooltip: '规则名称是唯一的',
      copyable: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingDetail.i_channel_id',
        defaultMessage: '',
      }),
      dataIndex: 'i_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingDetail.n_admin_file_id',
        defaultMessage: '',
      }),
      dataIndex: 'n_admin_file_id',
    },
    {
      title: intl.formatMessage({
        id: 'pages.common.created_at',
        defaultMessage: '',
      }),
      dataIndex: 'created_at',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.created_at).format('YY-MM-DD');
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
      title: intl.formatMessage({
        id: 'pages.userManager.marketingDetail.f_marketing_history_id',
        defaultMessage: '',
      }),
      dataIndex: 'f_marketing_history_id',
      valueType: 'select',
      request: _getGCMarketingHistories,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingDetail.g_sms_times',
        defaultMessage: '',
      }),
      dataIndex: 'g_sms_times',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingDetail.h_email_times',
        defaultMessage: '',
      }),
      dataIndex: 'h_email_times',
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

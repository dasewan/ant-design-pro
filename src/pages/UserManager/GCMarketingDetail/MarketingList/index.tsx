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
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.a_phone', defaultMessage: '' }),
      dataIndex: 'a_phone',
      key: 'a_phone',
      width: 120,
      copyable: true,
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
        id: 'pages.GAMarketingDetailFactory.i_channel_id',
        defaultMessage: '',
      }),
      dataIndex: 'i_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.c_email', defaultMessage: '' }),
      dataIndex: 'c_email',
      key: 'c_email',
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.e_marketing_id', defaultMessage: '' }),
      dataIndex: 'e_marketing_id',
      key: 'e_marketing_id',
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.f_marketing_history_id', defaultMessage: '' }),
      dataIndex: 'f_marketing_history_id',
      key: 'f_marketing_history_id',
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.g_sms_times', defaultMessage: '' }),
      dataIndex: 'g_sms_times',
      key: 'g_sms_times',
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.h_email_times', defaultMessage: '' }),
      dataIndex: 'h_email_times',
      key: 'h_email_times',
      width: 120,
    },

    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.k_view_count', defaultMessage: '' }),
      dataIndex: 'k_view_count',
      key: 'k_view_count',
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.t_download_times', defaultMessage: '' }),
      dataIndex: 't_download_times',
      key: 't_download_times',
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.l_last_marketing_time', defaultMessage: '' }),
      dataIndex: 'l_last_marketing_time',
      key: 'l_last_marketing_time',
      width: 120,
      render: (_, record) => {
        if (!record!.l_last_marketing_time) {
          return '-';
        }
        return moment(record!.l_last_marketing_time).format('YY-MM-DD HH:mm');
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.p_first_viewed_time', defaultMessage: '首次查看与最后营销时间差' }),
      key: 'time_diff',
      render: (_, record) => {
        const lastMarketingTime = moment(record.l_last_marketing_time);
        const firstViewedTime = record.p_first_viewed_time ? moment(record.p_first_viewed_time) : null;

        if (!firstViewedTime) {
          return '-';
        }

        const diff = firstViewedTime.diff(lastMarketingTime);
        if (diff < 60000) {
          return `${Math.round(diff / 1000)}秒`;
        } else if (diff < 3600000) {
          return `${Math.round(diff / 60000)}分钟`;
        } else if (diff < 86400000) {
          return `${Math.round(diff / 3600000)}小时`;
        } else {
          return `${Math.round(diff / 86400000)}天`;
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.q_first_download_time', defaultMessage: '首次查看与最后营销时间差' }),
      key: 'time_diff',
      render: (_, record) => {
        const q_first_download_time = moment(record.q_first_download_time);
        const firstViewedTime = record.p_first_viewed_time ? moment(record.p_first_viewed_time) : null;

        if (!firstViewedTime) {
          return '-';
        }

        const diff = firstViewedTime.diff(q_first_download_time);
        if (diff < 60000) {
          return `${Math.round(diff / 1000)}秒`;
        } else if (diff < 3600000) {
          return `${Math.round(diff / 60000)}分钟`;
        } else if (diff < 86400000) {
          return `${Math.round(diff / 3600000)}小时`;
        } else {
          return `${Math.round(diff / 86400000)}天`;
        }
      },
    },
    // 短信记录
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.sms', defaultMessage: '记录' }),
      dataIndex: 'k_view_count',
      key: 'k_view_count',
      width: 120,
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

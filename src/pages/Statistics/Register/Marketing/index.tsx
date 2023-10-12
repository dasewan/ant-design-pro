import Chart from '@/pages/Statistics/Register/Marketing/components/Chart';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1WAMarketings as index } from '@/services/ant-design-pro/WAMarketing';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import styles from './index.less';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  const [records, setRecords] = useState<TableListItem[]>([]);

  /** 导入营销名单excel */
  const [chartVisible, handleChartVisible] = useState<string>('none');
  /** 导入营销名单excel */
  const [chartButtonEnable, setChartButtonEnable] = useState<boolean>(false);
  /** 导入营销名单excel */
  const [chartChartType, setChartChartType] = useState<string>('time');
  /** 导入营销名单excel */
  const [columnMode, setColumnMode] = useState<string>('all');

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
    setRecords(res.data);
    // @ts-ignore
    if (
      params.b_channel_id !== undefined &&
      params.a_first_date === undefined &&
      res.data.length > 0
    ) {
      setChartButtonEnable(true);
      setChartChartType('time');
    } else {
      // @ts-ignore
      if (
        params.b_channel_id === undefined &&
        params['a_first_date[0]'] !== undefined &&
        params['a_first_date[0]'] === params['a_first_date[1]'] &&
        res.data.length > 0
      ) {
        setChartButtonEnable(true);
        setChartChartType('channel');
      } else {
        setChartButtonEnable(false);
        handleChartVisible('none');
      }
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
      title: FieldLabels.a_first_date,
      dataIndex: FieldIndex.a_first_date,
      width: 110,
      fixed: 'left',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'a_first_date[0]': moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            'a_first_date[1]': moment(value[1].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          };
        },
      },
      render: (_, value) => {
        return moment(value.a_first_date).format('YYYY-MM-DD');
      },
    },
    {
      title: FieldLabels.b_channel_id,
      dataIndex: FieldIndex.b_channel_id,
      width: 110,
      fixed: 'left',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.c_title,
      dataIndex: FieldIndex.c_title,
      search: false,
      width: 110,
      fixed: 'left',
    },
    {
      title: FieldLabels.e_marketing_times,
      dataIndex: FieldIndex.e_marketing_times,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.h_import_count,
      dataIndex: FieldIndex.h_import_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.i_valid_count,
      dataIndex: FieldIndex.i_valid_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.k_register_rate,
      dataIndex: FieldIndex.k_register_rate,
      search: false,
      hideInTable: columnMode === 'count',
      width: 80,
      render: (_, value) => {
        return `${value.k_register_rate!.toFixed(0)}%`;
      },
    },
    {
      title: FieldLabels.n_0_7_day_rate,
      dataIndex: FieldIndex.n_0_7_day_rate,
      hideInTable: columnMode === 'count',
      search: false,
      width: 90,
      render: (_, value) => {
        return `${value.n_0_7_day_rate!.toFixed(0)}%`;
      },
    },
    {
      title: FieldLabels.r_8_30_day_rate,
      dataIndex: FieldIndex.r_8_30_day_rate,
      hideInTable: columnMode === 'count',
      search: false,
      width: 104,
      render: (_, value) => {
        return `${value.r_8_30_day_rate!.toFixed(0)}%`;
      },
    },
    {
      title: FieldLabels.x_31_more_day_rate,
      dataIndex: FieldIndex.x_31_more_day_rate,
      hideInTable: columnMode === 'count',
      search: false,
      width: 104,
      render: (_, value) => {
        return `${value.x_31_more_day_rate!.toFixed(0)}%`;
      },
    },
    {
      title: FieldLabels.j_register_count,
      dataIndex: FieldIndex.j_register_count,
      hideInTable: columnMode === 'rate',
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.m_0_7_day_count,
      dataIndex: FieldIndex.m_0_7_day_count,
      hideInTable: columnMode === 'rate',
      search: false,
      width: 90,
    },
    {
      title: FieldLabels.q_8_30_day_count,
      dataIndex: FieldIndex.q_8_30_day_count,
      hideInTable: columnMode === 'rate',
      search: false,
      width: 104,
    },
    {
      title: FieldLabels.w_31_more_day_count,
      dataIndex: FieldIndex.w_31_more_day_count,
      hideInTable: columnMode === 'rate',
      search: false,
      width: 104,
    },
    {
      title: FieldLabels.a_a_refuse_count,
      dataIndex: FieldIndex.a_a_refuse_count,
      hideInTable: columnMode === 'rate',
      search: false,
      width: 90,
    },
    {
      title: FieldLabels.a_b_refuse_rate,
      dataIndex: FieldIndex.a_b_refuse_rate,
      hideInTable: columnMode === 'count',
      search: false,
      width: 90,
      render: (_, value) => {
        return `${value.a_b_refuse_rate!.toFixed(0)}%`;
      },
    },
    {
      title: FieldLabels.a_c_loan_count,
      dataIndex: FieldIndex.a_c_loan_count,
      hideInTable: columnMode === 'rate',
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_d_overdue_count,
      dataIndex: FieldIndex.a_d_overdue_count,
      hideInTable: columnMode === 'rate',
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_e_overdue_rate,
      dataIndex: FieldIndex.a_e_overdue_rate,
      hideInTable: columnMode === 'count',
      search: false,
      width: 80,
      render: (_, value) => {
        return `${value.a_e_overdue_rate!.toFixed(0)}%`;
      },
    },
    {
      title: '营销效果',
      search: false,
      className: styles.blue,
      hideInTable: columnMode !== 'all',
      children: [
        {
          title: FieldLabels.o_6_day_rate,
          dataIndex: FieldIndex.o_6_day_rate,
          width: 110,
          render: (_, value) => {
            return `${value.o_6_day_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.p_7_day_rate,
          dataIndex: FieldIndex.p_7_day_rate,
          width: 110,
          render: (_, value) => {
            return `${value.p_7_day_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.s_8_day_rate,
          dataIndex: FieldIndex.s_8_day_rate,
          width: 110,
          render: (_, value) => {
            return `${value.s_8_day_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.t_9_day_rate,
          dataIndex: FieldIndex.t_9_day_rate,
          width: 110,
          render: (_, value) => {
            return `${value.t_9_day_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.u_29_day_rate,
          dataIndex: FieldIndex.u_29_day_rate,
          width: 110,
          render: (_, value) => {
            return `${value.u_29_day_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.v_30_day_rate,
          dataIndex: FieldIndex.v_30_day_rate,
          width: 110,
          render: (_, value) => {
            return `${value.v_30_day_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.y_31_day_rate,
          dataIndex: FieldIndex.y_31_day_rate,
          width: 110,
          render: (_, value) => {
            return `${value.y_31_day_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.z_32_day_rate,
          dataIndex: FieldIndex.z_32_day_rate,
          width: 110,
          render: (_, value) => {
            return `${value.z_32_day_rate!.toFixed(0)}%`;
          },
        },
      ],
    },
  ];
  const items: MenuProps['items'] = [
    // { label: '操作说明', key: 'item-1', icon: <FileTextOutlined /> },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'/admin/v1/aLAdminFiles_templete/white_info_list.xlsx'}
        >
          报表说明
        </a>
      ),
      key: 'item-2',
      icon: <DownloadOutlined />,
    },
  ];
  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '营销统计',
        ghost: true,
        extra: [
          <Tooltip key="1" title="单独搜索一天或者单独搜索渠道" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={!chartButtonEnable}
              onClick={() => handleChartVisible(chartVisible === 'none' ? 'block' : 'none')}
            >
              {chartVisible === 'none' ? '显示图表' : '隐藏图表'}
            </Button>
          </Tooltip>,
          <Button key="4" type="primary" onClick={() => setColumnMode('rate')}>
            占比
          </Button>,
          <Button key="5" type="primary" onClick={() => setColumnMode('count')}>
            数量
          </Button>,
          <Button key="6" type="primary" onClick={() => setColumnMode('all')}>
            全部
          </Button>,
          <Dropdown key="dropdown" trigger={['click']} menu={{ items }}>
            <Button key="7" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
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
        options={false}
        toolBarRender={() => [
          <div key="1" style={{ height: 600, width: 1780, display: chartVisible }}>
            <Chart rawData={records} type={chartChartType} channels={channels}></Chart>
          </div>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;

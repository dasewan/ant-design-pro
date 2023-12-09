import Chart from '@/pages/Statistics/Collection/Flow/components/Chart';
import { getAdminV1WNCollectionFlows as index } from '@/services/ant-design-pro/WNCollectionFlow';
import { useIntl } from '@@/exports';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Dropdown, MenuProps } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [records, setRecords] = useState<TableListItem[]>([]);

  /** 图表显隐 */
  const [chartVisible, handleChartVisible] = useState<boolean>(false);

  /** 管理员enum */

  /** table */
  const _index = async (
    // 第一个参数 params 查询表单和 params 参数的结合
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: TableListPagination & {
      pageSize: number;
      current: number;
      [propName: string]: any;
    },
    // sort,
    // filter,
  ) => {
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    let res;
    res = await index({ page: params.current, ...params });
    setRecords(res.data);

    if (res.data!.length > 0) {
      handleChartVisible(true);
    } else {
      handleChartVisible(false);
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
      title: intl.formatMessage({
        id: 'pages.statistics.collection.flow.a_date',
        defaultMessage: '',
      }),
      dataIndex: 'a_date',
      width: 100,
      fixed: 'left',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'a_date[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'a_date[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
      render: (_, record) => {
        return moment(record.a_date).format('YYYY-MM-DD');
      },
    },

    {
      title: intl.formatMessage({
        id: 'pages.statistics.collection.flow.source',
        defaultMessage: '',
      }),
      dataIndex: 'source',
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: intl.formatMessage({
        id: 'pages.statistics.collection.flow.target',
        defaultMessage: '',
      }),
      dataIndex: 'target',
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: intl.formatMessage({
        id: 'pages.statistics.collection.flow.value',
        defaultMessage: '',
      }),
      dataIndex: 'value',
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: intl.formatMessage({
        id: 'pages.statistics.collection.flow.value2',
        defaultMessage: '',
      }),
      dataIndex: 'value2',
      search: false,
      width: 80,
      fixed: 'left',
    },
  ];
  const items: MenuProps['items'] = [
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
        // title: '营销统计',
        ghost: true,
        extra: [
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
          span: 4,
        }}
        bordered={true}
        scroll={{ x: '50%' }}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 300,
        }}
        options={false}
        toolBarRender={() => [
          <div
            key="1"
            style={{ height: 600, width: 1780, display: chartVisible ? 'block' : 'none' }}
          >
            <Chart rawData={records}></Chart>
          </div>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;

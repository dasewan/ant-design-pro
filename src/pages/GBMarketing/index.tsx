import { STATUS_ENUM } from '@/pages/enums';
import MarketingForm from '@/pages/GBMarketing/components/MarketingForm';
import { DownloadOutlined, EllipsisOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Dropdown, Menu, Progress, Space, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import ImportForm from './components/ImportForm';
import type { TableListItem, TableListPagination } from './data';
import { getChannelsEnum, getUserEnum, index } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 导入营销名单excel */
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  /** 操作营销 */
  const [marketingModalVisible, handleMarketingModalVisible] = useState<boolean>(false);
  /** 操作营销的id */
  const [marketingIds, handleMarketingIds] = useState<string>('');
  /** 短信模版enum */
  const [smss, setSmss] = useState<RequestOptionsType[]>([]);

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
   * 查询管理员enum
   */
  const _getUserEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length == 0) {
      const res = await getUserEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.name,
          value: item.id,
        });
      }
      console.log(data);
      setAdmins(data);
      return data;
    } else {
      return admins;
    }
  };

  /**
   * 查询短信enum
   */
  const _getSMSsEnum: ProFieldRequestData = async () => {
    if (smss.length == 0) {
      // const res = await getChannelsEnum({ foo: 1 });
      const data = [
        { label: '营销短信1', value: 1 },
        { label: '营销短信2', value: 2 },
        { label: '营销短信3', value: 3 },
        { label: '营销短信4', value: 4 },
      ];
      console.log(data);
      setSmss(data);
      return data;
    } else {
      return smss;
    }
  };
  /**
   * 开始营销
   * @param ids
   */
  const handleMarketing = (ids: string) => {
    handleMarketingIds(ids);
    handleMarketingModalVisible(true);
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

  const expendColumns: ProColumns<API.GCMarketingHistory>[] = [
    {
      title: '批号',
      dataIndex: 'e_batch_sn',
    },
    {
      title: '管理员',
      dataIndex: 'b_admin_id',
      valueType: 'select',
      request: _getUserEnum,
      params: { timestamp: Math.random() },
    },
    //todo 短信开发完改成request
    {
      title: '短信模版',
      dataIndex: 'c_sms_templete_id',
      valueType: 'select',
      request: _getSMSsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: '主题',
      dataIndex: 'd_theme_id',
    },
    {
      title: '查看数量',
      dataIndex: 'i_viewed_count',
      search: false,
    },
    {
      title: '查看数量（去重）',
      dataIndex: 'j_viewed_deduplication_count',
      search: false,
    },
    {
      title: '营销数量',
      dataIndex: 'k_marketing_count',
      search: false,
    },
    {
      title: '注册数量',
      dataIndex: 'f_register_count',
    },
    {
      title: '备注',
      dataIndex: 'g_comment',
    },
    {
      title: '目标用户',
      dataIndex: 'l_type',
      render: (_, record) => {
        if (record.l_type == 1) {
          return <Tag color="cyan">未注册</Tag>;
        } else if (record.l_type == 2) {
          return <Tag color="blue">未查看</Tag>;
        } else {
          return <Tag color="purple">已查看</Tag>;
        }
      },
    },
    {
      title: '营销状态',
      dataIndex: 'm_status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      hideInSearch: true,
    },
    {
      title: '开始时间',
      dataIndex: 'h_begin_at',
      valueType: 'dateRange',
      width: 140,
      render: (_, record) => {
        return moment(record.created_at).format('YY-MM-DD HH:mm');
      },
    },
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '营销名称',
      dataIndex: 'm_title',
      ellipsis: true,
      search: false,
    },
    {
      title: '渠道',
      dataIndex: 'b_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: '管理员',
      dataIndex: 'c_admin_id',
      valueType: 'select',
      request: _getUserEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: '导入数量',
      dataIndex: 'd_import_count',
    },
    {
      title: '有效数量',
      dataIndex: 'e_valid_count',
    },
    {
      title: '查看数量',
      dataIndex: 'n_viewed_count',
      search: false,
    },
    {
      title: '查看数量（去重）',
      dataIndex: 'o_viewed_deduplication_count',
      search: false,
    },
    {
      title: '注册数量',
      dataIndex: 'f_register_count',
    },
    {
      title: '营销次数',
      dataIndex: 'g_marketing_times',
    },
    {
      title: '短信总数',
      dataIndex: 'h_sms_times',
    },
    {
      title: '邮件总数',
      dataIndex: 'i_email_times',
    },
    {
      title: '导入时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      width: 140,
      render: (_, record) => {
        return moment(record.created_at).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({ 'created_at[0]': value[0], 'created_at[1]': value[1] }),
      },
    },
    {
      title: '最近营销时间',
      dataIndex: 'p_last_marketing_time',
      valueType: 'dateRange',
      width: 140,
      render: (_, record) => {
        return record.p_last_marketing_time
          ? moment(record.p_last_marketing_time).format('YY-MM-DD HH:mm')
          : '-';
      },
      search: {
        transform: (value: any) => ({
          'p_last_marketing_time[0]': value[0],
          'p_last_marketing_time[1]': value[1],
        }),
      },
    },
    {
      title: '备注',
      dataIndex: 'j_comment',
      ellipsis: true,
      search: false,
    },
    {
      title: '注册进度',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      width: 200,
      hideInSearch: true,
      render: (_, record) => {
        const percent = Math.floor((record.f_register_count! * 100) / record.e_valid_count!);
        return <Progress percent={percent} size="small" />;
      },
    },
    {
      title: 'excel状态',
      dataIndex: 'm_status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        // @ts-ignore
        const cantMarketing = record.g_c_marketing_histories.some(
          (item: API.GCMarketingHistory) => item.m_status == 1 || item.m_status == 2,
        );
        return record.m_status == 3 && !cantMarketing
          ? [
              <a key="credit_amount" onClick={() => handleMarketing(record.id!.toString())}>
                营销
              </a>,
            ]
          : [];
      },
    },
  ];

  const expandedRowRender = (record: TableListItem) => {
    // @ts-ignore
    const dataSourse: API.GCMarketingHistory[] = record.g_c_marketing_histories!;
    return (
      <ProTable<API.GCMarketingHistory, TableListPagination>
        columns={expendColumns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={dataSourse}
        pagination={false}
        rowKey="id"
      />
    );
  };

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '营销管理',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => handleImportModalVisible(true)}>
            导入营销名单
          </Button>,
          <Dropdown
            key="dropdown"
            trigger={['click']}
            overlay={
              <Menu
                items={[
                  { label: '操作说明', key: 'item-1', icon: <FileTextOutlined /> },
                  {
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={'/admin/v1/aLAdminFiles_templete/white_info_list.xlsx'}
                      >
                        模版下载
                      </a>
                    ),
                    key: 'item-2',
                    icon: <DownloadOutlined />,
                  },
                ]}
              />
            }
          >
            <Button key="4" style={{ padding: '0 8px' }}>
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
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 50,
        }}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
          getCheckboxProps: (record: TableListItem) => ({
            // @ts-ignore
            disabled: !(
              record.m_status == 3 &&
              // @ts-ignore
              !record.g_c_marketing_histories.some(
                (item: API.GCMarketingHistory) => item.m_status == 1 || item.m_status == 2,
              ) &&
              (isNaN(moment().diff(moment(record.p_last_marketing_time), 'days')) ||
                moment().diff(moment(record.p_last_marketing_time), 'days') > 2)
            ),
          }),
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>

            <span>{`营销用户: ${selectedRows.reduce(
              (pre, item) => pre + (item.e_valid_count! - item.f_register_count!),
              0,
            )} 个`}</span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <Space size={16}>
              <a
                onClick={() =>
                  handleMarketing(selectedRows.map((item: TableListItem) => item.id).join(','))
                }
              >
                批量营销
              </a>
              <a>导出数据</a>
            </Space>
          );
        }}
        headerTitle="批量操作"
        // @ts-ignore
        expandable={{
          expandedRowRender,
          // @ts-ignore
          rowExpandable: (record) => record.g_c_marketing_histories.length! > 0,
        }}
      />
      <ImportForm
        onSubmit={async (success) => {
          if (success) {
            handleImportModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleImportModalVisible(false);
        }}
        modalVisible={importModalVisible}
      />
      <MarketingForm
        onSubmit={async (success) => {
          if (success) {
            handleMarketingModalVisible(false);
            handleMarketingIds('');
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleMarketingModalVisible(false);
          handleMarketingIds('');
        }}
        marketingIds={marketingIds}
        modalVisible={marketingModalVisible}
      />
    </PageContainer>
  );
};

export default TableList;

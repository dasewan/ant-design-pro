import {STATUS_ENUM} from '@/pages/enums';
import MarketingForm from '@/pages/UserManager/GBMarketing/components/MarketingForm';
import {useIntl} from '@@/exports';
import {DownloadOutlined, EllipsisOutlined, FileTextOutlined} from '@ant-design/icons';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProFieldRequestData, RequestOptionsType} from '@ant-design/pro-utils';
import {Button, ConfigProvider, Dropdown, MenuProps, Progress, Space, Table, Tag} from 'antd';
import moment from 'moment';
import React, {useContext, useRef, useState} from 'react';
import ImportForm from './components/ImportForm';
import type {TableListItem, TableListPagination} from './data';

import {US_STATUS_ENUM} from '@/pages/enumsUs';
import {getAdminV1ChannelsEnum as getChannelsEnum} from '@/services/ant-design-pro/AFChannel';
import {getAdminV1GBMarketings as index} from '@/services/ant-design-pro/GBMarketing';
import {getAdminV1UsersEnum as getUserEnum} from '@/services/ant-design-pro/User';

const TableList: React.FC = () => {
  const intl = useIntl();
  const {locale} = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
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
    if (admins.length === 0) {
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
    if (smss.length === 0) {
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

  // @ts-ignore
  // @ts-ignore
  const expendColumns: ProColumns<API.GCMarketingHistory>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.e_batch_sn',
        defaultMessage: '',
      }),
      dataIndex: 'e_batch_sn',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.b_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'b_admin_id',
      valueType: 'select',
      request: _getUserEnum,
      params: { timestamp: Math.random() },
    },
    //todo 短信开发完改成request
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.c_sms_templete_id',
        defaultMessage: '',
      }),
      dataIndex: 'c_sms_templete_id',
      valueType: 'select',
      request: _getSMSsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.d_theme_id',
        defaultMessage: '',
      }),
      dataIndex: 'd_theme_id',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.i_viewed_count',
        defaultMessage: '',
      }),
      dataIndex: 'i_viewed_count',
      search: false,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.j_viewed_deduplication_count',
        defaultMessage: '',
      }),
      dataIndex: 'j_viewed_deduplication_count',
      search: false,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.k_marketing_count',
        defaultMessage: '',
      }),
      dataIndex: 'k_marketing_count',
      search: false,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.f_register_count',
        defaultMessage: '',
      }),
      dataIndex: 'f_register_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.g_comment',
        defaultMessage: '',
      }),
      dataIndex: 'g_comment',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.l_type',
        defaultMessage: '',
      }),
      dataIndex: 'l_type',
      render: (_, record) => {
        if (record.l_type === 1) {
          return (
            <Tag color="cyan">
              {intl.formatMessage({
                id: 'pages.userManager.marketingHistory.un_register',
                defaultMessage: '未注册',
              })}
            </Tag>
          );
        } else if (record.l_type === 2) {
          return (
            <Tag color="blue">
              {intl.formatMessage({
                id: 'pages.userManager.marketingHistory.un_view',
                defaultMessage: '未查看',
              })}
            </Tag>
          );
        } else {
          return (
            <Tag color="purple">
              {intl.formatMessage({
                id: 'pages.userManager.marketingHistory.viewed',
                defaultMessage: '已查看',
              })}
            </Tag>
          );
        }
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.m_status',
        defaultMessage: '',
      }),
      dataIndex: 'm_status',
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? STATUS_ENUM : US_STATUS_ENUM,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.marketingHistory.h_begin_at',
        defaultMessage: '',
      }),
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
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.q_title',
        defaultMessage: '',
      }),
      dataIndex: 'q_title',
      ellipsis: true,
      search: false,
      fixed: 'left',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.b_channel_id',
        defaultMessage: '',
      }),
      dataIndex: 'b_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.c_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'c_admin_id',
      valueType: 'select',
      request: _getUserEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.d_import_count',
        defaultMessage: '',
      }),
      dataIndex: 'd_import_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.e_valid_count',
        defaultMessage: '',
      }),
      dataIndex: 'e_valid_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.t_black_count',
        defaultMessage: '',
      }),
      dataIndex: 't_black_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.r_register_count',
        defaultMessage: '',
      }),
      dataIndex: 'r_register_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.s_repeat_count',
        defaultMessage: '',
      }),
      dataIndex: 's_repeat_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.n_viewed_count',
        defaultMessage: '',
      }),
      dataIndex: 'n_viewed_count',
      search: false,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.o_viewed_deduplication_count',
        defaultMessage: '',
      }),
      dataIndex: 'o_viewed_deduplication_count',
      search: false,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.f_register_count',
        defaultMessage: '',
      }),
      dataIndex: 'f_register_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.g_marketing_times',
        defaultMessage: '',
      }),
      dataIndex: 'g_marketing_times',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.h_sms_times',
        defaultMessage: '',
      }),
      dataIndex: 'h_sms_times',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.i_email_times',
        defaultMessage: '',
      }),
      dataIndex: 'i_email_times',
    },
    {
      title: intl.formatMessage({
        id: 'pages.common.created_at',
        defaultMessage: '',
      }),
      dataIndex: 'created_at',
      valueType: 'dateRange',
      width: 140,
      render: (_, record) => {
        return moment(record.created_at).format('YY-MM-DD HH:mm');
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
        id: 'pages.userManager.gBMarketing.u_first_marketing_time',
        defaultMessage: '',
      }),
      dataIndex: 'u_first_marketing_time',
      valueType: 'dateRange',
      width: 140,
      render: (_, record) => {
        return record.u_first_marketing_time
          ? moment(record.u_first_marketing_time).format('YY-MM-DD HH:mm')
          : '-';
      },
      search: {
        transform: (value: any) => {
          return {
            'u_first_marketing_time[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'u_first_marketing_time[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.p_last_marketing_time',
        defaultMessage: '',
      }),
      dataIndex: 'p_last_marketing_time',
      valueType: 'dateRange',
      width: 140,
      render: (_, record) => {
        return record.p_last_marketing_time
          ? moment(record.p_last_marketing_time).format('YY-MM-DD HH:mm')
          : '-';
      },
      search: {
        transform: (value: any) => {
          return {
            'p_last_marketing_time[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'p_last_marketing_time[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.j_comment',
        defaultMessage: '',
      }),
      dataIndex: 'j_comment',
      ellipsis: true,
      search: false,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.m_status',
        defaultMessage: '',
      }),
      dataIndex: 'm_status',
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? STATUS_ENUM : US_STATUS_ENUM,
      // hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.gBMarketing.process',
        defaultMessage: '注册进度',
      }),
      dataIndex: 'created_at',
      valueType: 'dateRange',
      width: 200,
      hideInSearch: true,
      render: (_, record) => {
        const percent = Math.floor((record.f_register_count! * 100) / record.e_valid_count!);
        return <Progress percent={percent} size="small" />;
      },
      fixed: 'right',
    },

    {
      title: intl.formatMessage({
        id: 'pages.common.option',
        defaultMessage: '操作',
      }),
      dataIndex: 'option',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record) => {
        return (
          <a key="credit_amount" onClick={() => handleMarketing(record.id!.toString())}>
            {intl.formatMessage({
              id: 'pages.userManager.gBMarketing.marketing',
              defaultMessage: '营销',
            })}
          </a>
        );
        // todo use this
        /*        return record.m_status === 50 &&
                  // @ts-ignore
                  !record.g_c_marketing_histories.some(
                    (item: API.GCMarketingHistory) => item.m_status === 10 || item.m_status === 20,
                  ) &&
                  (isNaN(moment().diff(moment(record.p_last_marketing_time), 'days')) ||
                    moment().diff(moment(record.p_last_marketing_time), 'days') > 2)
                  ? [
                      <a key="credit_amount" onClick={() => handleMarketing(record.id!.toString())}>
                        营销
                      </a>,
                    ]
                  : [];*/
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
  const items: MenuProps['items'] = [
    {
      label: intl.formatMessage({
        id: 'pages.common.explain',
        defaultMessage: '操作说明',
      }),
      key: 'item-1',
      icon: <FileTextOutlined />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'/admin/v1/aLAdminFiles_templete/marketing_list.xlsx'}
        >
          {intl.formatMessage({
            id: 'pages.common.download',
            defaultMessage: '模版下载',
          })}
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
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => handleImportModalVisible(true)}>
            {intl.formatMessage({
              id: 'pages.userManager.gBMarketing.import',
              defaultMessage: '导入营销名单',
            })}
          </Button>,
          <Dropdown key="dropdown" trigger={['click']} menu={{ items }}>
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
        scroll={{ x: '230%' }}
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
              record.m_status === 50 &&
              record.g_marketing_times !== 0 &&
              // @ts-ignore
              !record.g_c_marketing_histories.some(
                (item: API.GCMarketingHistory) => item.m_status === 10 || item.m_status === 20,
              ) &&
              (isNaN(moment().diff(moment(record.p_last_marketing_time), 'days')) ||
                moment().diff(moment(record.p_last_marketing_time), 'days') > 2)
            ),
          }),
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              {intl.formatMessage({
                id: 'pages.searchTable.chosen',
                defaultMessage: '',
              })}{' '}
              {selectedRowKeys.length}{' '}
              {intl.formatMessage({
                id: 'pages.searchTable.item',
                defaultMessage: '',
              })}
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                {intl.formatMessage({
                  id: 'pages.searchTable.cancelSelected',
                  defaultMessage: '',
                })}
              </a>
            </span>

            <span>{`${intl.formatMessage({
              id: 'pages.userManager.gBMarketing.user',
              defaultMessage: '',
            })}: ${selectedRows.reduce(
              (pre, item) => pre + (item.e_valid_count! - item.f_register_count!),
              0,
            )} ${intl.formatMessage({
              id: 'pages.searchTable.item',
              defaultMessage: '',
            })}`}</span>
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
                {intl.formatMessage({
                  id: 'pages.userManager.gBMarketing.batch_marketing',
                  defaultMessage: '',
                })}
              </a>
              <a>
                {intl.formatMessage({
                  id: 'pages.common.export',
                  defaultMessage: '',
                })}
              </a>
            </Space>
          );
        }}
        headerTitle={intl.formatMessage({
          id: 'pages.userManager.gBMarketing.batch_marketing',
          defaultMessage: '',
        })}
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

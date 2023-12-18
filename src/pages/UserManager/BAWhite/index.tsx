import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Dropdown, MenuProps, message, Popconfirm } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import {
  getAdminV1BAWhites as index,
  putAdminV1BAWhitesId as update,
} from '@/services/ant-design-pro/BAWhite';
import { getAdminV1UsersEnum as getUserEnum } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';

import { StatusEnum } from '@/pages/enums';
import ImportForm from '@/pages/UserManager/BAWhite/components/ImportForm';
import { DownloadOutlined, EllipsisOutlined, FileTextOutlined } from '@ant-design/icons';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';

const TableList: React.FC = () => {
  const intl = useIntl();
  const STATUS_ENUM: StatusEnum = {
    1: {
      text: intl.formatMessage({
        id: 'pages.userManager.bAWhite.j_status.normal',
        defaultMessage: '正常',
      }),
      status: 'Success',
    },
    2: {
      text: intl.formatMessage({
        id: 'pages.userManager.bAWhite.j_status.overdue',
        defaultMessage: '有过逾期',
      }),
      status: 'Error',
    },
    3: {
      text: intl.formatMessage({
        id: 'pages.userManager.bAWhite.j_status.seriousOverdue',
        defaultMessage: '有过严重逾期',
      }),
      status: 'Error',
    },
    4: {
      text: intl.formatMessage({
        id: 'pages.userManager.bAWhite.j_status.overdueIng',
        defaultMessage: '在逾',
      }),
      status: 'Error',
    },
    5: {
      text: intl.formatMessage({
        id: 'pages.userManager.bAWhite.j_status.expired',
        defaultMessage: '过期',
      }),
      status: 'Default',
    },
    6: {
      text: intl.formatMessage({
        id: 'pages.userManager.bAWhite.j_status.forbidden',
        defaultMessage: '禁止',
      }),
      status: 'Default',
    },
  };
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 导入白名单excel */
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const formRef = useRef();

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
    const res = await index({ foo: null, page: params.current, ...params });
    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: res.success,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.total,
    };
  };

  /** 导出excel */
  const _export = async () => {
    // @ts-ignore
    let params = formRef.current?.getFieldsValue();
    // @ts-ignore
    const response = await index(
      { export: 1, ...params },
      {
        responseType: 'blob', // 设置响应类型为二进制流
      },
    );
    // @ts-ignore
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'white.xlsx');
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
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
      setAdmins(data);
      return data;
    } else {
      return admins;
    }
  };
  const _update = async (id: number, status: number) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    try {
      // @ts-ignore
      const res = await update({ id: id, j_status: status });
      if (!res.success) {
        message.error(res.message);
        return false;
      }
      if (actionRef.current) {
        actionRef.current.reload();
      }
      hide();
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
      return true;
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      return false;
    }
  };

  /**
   * 查询管理员enum
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
    //todo 动态draw和复制分离
    {
      title: intl.formatMessage({ id: 'pages.userManager.aUser.a_phone', defaultMessage: '' }),
      dataIndex: 'a_phone',
      copyable: true,
      render: (_, record) => {
        return record.b_user_id ? (
          <a target="_blank" rel="noopener noreferrer" href={`/user/detail/${record.b_user_id}`}>
            {record.a_phone}
          </a>
        ) : (
          record.a_phone
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.bAWhite.e_channel_id',
        defaultMessage: '',
      }),
      dataIndex: 'e_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.bAWhite.l_credit_amount',
        defaultMessage: '',
      }),
      dataIndex: 'l_credit_amount',
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.bAWhite.d_market_times',
        defaultMessage: '',
      }),
      dataIndex: 'd_market_times',
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
    },
    /*    {
          title: intl.formatMessage({ id: 'pages.userManager.bAWhite.b_user_id', defaultMessage: '' }),
          dataIndex: 'b_user_id',
          render: (_, record) => {
            return record.b_user_id ? <Badge status="success" /> : <Badge status="default" />;
          },
        },*/
    {
      title: intl.formatMessage({ id: 'pages.userManager.bAWhite.k_admin_id', defaultMessage: '' }),
      dataIndex: 'k_admin_id',
      valueType: 'select',
      request: _getUserEnum,
    },
    {
      title: intl.formatMessage({ id: 'pages.userManager.bAWhite.j_status', defaultMessage: '' }),
      dataIndex: 'j_status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
    },
    {
      title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      render: (_, record) => {
        return moment(record.created_at).format('YYYY-MM-DD');
      },
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'i_valid_date[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'i_valid_date[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.bAWhite.n_last_hit_time',
        defaultMessage: '',
      }),
      dataIndex: 'n_last_hit_time',
      render: (_, record) => {
        if (record.n_last_hit_time !== null) {
          // @ts-ignore
          return moment(new Date(record.n_last_hit_time)).format('YYYY-MM-DD');
        } else {
          return '-';
        }
      },
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'n_last_hit_time[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'n_last_hit_time[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.bAWhite.i_valid_date',
        defaultMessage: '',
      }),
      dataIndex: 'i_valid_date',
      render: (_, record) => {
        if (record.i_valid_date !== null) {
          // @ts-ignore
          return moment(new Date(record.i_valid_date)).format('YYYY-MM-DD');
        } else {
          return '-';
        }
      },
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'i_valid_date[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'i_valid_date[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        let action = <></>;
        if (record.j_status === 1) {
          action = (
            <Popconfirm
              title={`${intl.formatMessage({
                id: 'pages.userManager.bAWhite.confirm1',
                defaultMessage: '',
              })} ${record.a_phone}?`}
              key={record.id}
              onConfirm={() => _update(record.id!, 6)}
              okText="Yes"
              cancelText="No"
            >
              <a>
                {intl.formatMessage({
                  id: 'pages.userManager.bAWhite.action.delete',
                  defaultMessage: '',
                })}
              </a>
            </Popconfirm>
          );
        } else if (record.j_status === 6) {
          action = (
            <Popconfirm
              title={`${intl.formatMessage({
                id: 'pages.userManager.bAWhite.confirm2',
                defaultMessage: '',
              })} ${record.a_phone}?`}
              key={record.id}
              onConfirm={() => _update(record.id!, 1)}
              okText="Yes"
              cancelText="No"
            >
              <a>
                {intl.formatMessage({
                  id: 'pages.userManager.bAWhite.action.recovery',
                  defaultMessage: '',
                })}
              </a>
            </Popconfirm>
          );
        }

        return action;
      },
    },
  ];
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
          href={'/admin/v1/aLAdminFiles_templete/white_info_list.xlsx'}
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
  return (
    <PageContainer
      header={{
        ghost: true,
        extra: [
          <Button key="import" type="primary" onClick={() => handleImportModalVisible(true)}>
            {intl.formatMessage({
              id: 'pages.userManager.bAWhite.import',
              defaultMessage: '导入白名单',
            })}
          </Button>,
          <Button key="export" type="primary" onClick={() => _export()}>
            {intl.formatMessage({
              id: 'pages.userManager.bAWhite.export',
              defaultMessage: '导出白名单',
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
        // headerTitle="客户列表"
        revalidateOnFocus={false}
        actionRef={actionRef}
        formRef={formRef}
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
    </PageContainer>
  );
};

export default TableList;

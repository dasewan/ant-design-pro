import { STATUS_ENUM } from '@/pages/enums';
import { US_STATUS_ENUM } from '@/pages/enumsUs';
import { IMPORT_TYPE } from '@/pages/UserManager/BEImportResult/enums';
import { US_IMPORT_TYPE } from '@/pages/UserManager/BEImportResult/enumsUs';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1BEImportResults as index } from '@/services/ant-design-pro/BEImportResult';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { ConfigProvider, Tag } from 'antd';
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const actionRef = useRef<ActionType>();
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);

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
   * 查询管理员enum
   */
  const _getUsersEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length === 0) {
      const res = await getUsersEnum({ foo: 1 });
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.a_admin_file_id',
        defaultMessage: '',
      }),
      dataIndex: 'a_admin_file_id',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.b_type',
        defaultMessage: '',
      }),
      dataIndex: 'b_type',
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? IMPORT_TYPE : US_IMPORT_TYPE,
      render: (_, record) => {
        let tmp = currentLanguage === 'zh-cn' ? IMPORT_TYPE : US_IMPORT_TYPE;
        return <Tag color={tmp[record.b_type!].color}>{tmp[record.b_type!].text}</Tag>;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.c_channel_id',
        defaultMessage: '',
      }),
      dataIndex: 'c_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.d_valid_date',
        defaultMessage: '',
      }),
      dataIndex: 'd_valid_date',
      ellipsis: true,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.d_valid_date).format('YY-MM-DD');
      },
      search: {
        transform: (value: any) => {
          return {
            'd_valid_date[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'd_valid_date[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.e_import_count',
        defaultMessage: '',
      }),
      dataIndex: 'e_import_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.f_valid_count',
        defaultMessage: '',
      }),
      dataIndex: 'f_valid_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.g_register_count',
        defaultMessage: '',
      }),
      dataIndex: 'g_register_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.h_repeat_count',
        defaultMessage: '',
      }),
      dataIndex: 'h_repeat_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.i_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'i_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.i_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.l_expect_execute_at',
        defaultMessage: '',
      }),
      dataIndex: 'l_expect_execute_at',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.l_expect_execute_at).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => {
          return {
            'l_expect_execute_at[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'l_expect_execute_at[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.common.updated_at',
        defaultMessage: '',
      }),
      dataIndex: 'updated_at',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.updated_at).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => {
          return {
            'updated_at[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'updated_at[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BEImportResult.k_status',
        defaultMessage: '',
      }),
      dataIndex: 'k_status',
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? STATUS_ENUM : US_STATUS_ENUM,
      hideInSearch: true,
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '导入结果',
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

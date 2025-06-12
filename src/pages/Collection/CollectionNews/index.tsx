import Chart from '@/pages/Statistics/Collection/Admin/components/Chart';
import Chart2 from '@/pages/Statistics/Collection/Admin/components/Chart2';
import { FieldOptions, FieldOptions2 } from '@/pages/Statistics/enums';
import { getAdminV1GMCollectionAdminsEnum as getCollectionAdminsEnum } from '@/services/ant-design-pro/GMCollectionAdmin';
import { getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum } from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { getAdminV1QCCollectionNewsAdmin as index } from '@/services/ant-design-pro/QCCollectionNews';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { isEqual } from 'lodash';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';
import { useIntl } from '@@/exports';
import {
  EditOutlined,
  PhoneOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [records, setRecords] = useState<TableListItem[]>([]);
  const [total, setTotal] = useState<number | undefined>(0);

  const [preParams, setPreParams] = useState<any>();
  const [collectionAdmins, setCollectionAdmins] = useState<RequestOptionsType[]>([]);
  const [collectionAgencies, setCollectionAgencies] = useState<RequestOptionsType[]>([]);
  const [collectionGroups, setCollectionGroups] = useState<RequestOptionsType[]>([]);
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);

  /**
   * 查询组enum
   */
  const _getCollectionGroupsEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionGroups.length === 0) {
      const res = await getCollectionGroupsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
          c_collection_agency_id: item.c_collection_agency_id,
          f_status: item.f_status,
        });
      }
      setCollectionGroups(data);
      return data;
    } else {
      return collectionGroups;
    }
  };
  /**
   * 查询机构enum
   */
  const _getCollectionAgenciesEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionAgencies.length === 0) {
      const res = await getCollectionAgenciesEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setCollectionAgencies(data);
      return data;
    } else {
      return collectionAgencies;
    }
  };
  /**
   * 查询管理员enum
   */
  const _getCollectionAdminsEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionAdmins.length === 0) {
      const res = await getCollectionAdminsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
          d_collection_group_id: item.d_collection_group_id,
          f_status: item.f_status,
        });
      }
      setCollectionAdmins(data);
      return data;
    } else {
      return collectionAdmins;
    }
  };


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
    let flag = 0;
    let params2 = { ...params };
    delete params2.dimension;
    if (!isEqual(params2, preParams)) {
      setPreParams(params2);
      // @ts-ignore
      res = await index({ page: params.current, ...params });
      setRecords(res.data);
      setTotal(res.total);
    } else {
      res = {
        data: records,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: true,
        // 不传会使用 data 的长度，如果是分页一定要传
        total: total,
      };
    }

    if (collectionAgencies.length === 0) {
      await _getCollectionAgenciesEnum();
    }
    if (collectionGroups.length === 0) {
      await _getCollectionGroupsEnum();
    }
    if (collectionAdmins.length === 0) {
      await _getCollectionAdminsEnum();
    }

    if (res.data!.length > 0) {
      flag++;
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
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.d_collection_group_id', defaultMessage: '' }),
      dataIndex: 'd_collection_group_id',
      key: 'd_collection_group_id',
      valueType: 'select',
      request: _getCollectionGroupsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.e_collection_admin_id', defaultMessage: '' }),
      dataIndex: 'e_collection_admin_id',
      key: 'e_collection_admin_id',
      valueType: 'select',
      request: _getCollectionAdminsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.s_borrow_sn', defaultMessage: 'SN' }),
      dataIndex: 's_borrow_sn',
      key: 's_borrow_sn',
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.f_cat', defaultMessage: '' }),
      dataIndex: 'f_cat',
      key: 'f_cat',
      render: (text) => {
        switch(text) {
          case 0: return <EditOutlined style={{ color: 'black', fontSize: '18px' }} />;
          case 1: return <PhoneOutlined style={{ color: 'blue' , fontSize: '18px' }} />;
          case 6: return <ContactsOutlined style={{ color: 'green', fontSize: '18px'  }} />;
          default: return text;
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.g_type', defaultMessage: '' }),
      dataIndex: 'g_type',
      key: 'g_type',
      valueType: 'select',
      valueEnum: {
        0: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.new', defaultMessage: '新案件' }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.negotiating', defaultMessage: '协商中' }),
          status: 'Processing',
        },
        2: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.promised', defaultMessage: '承诺还款' }),
          status: 'Processing',
        },
        3: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.unfulfilled', defaultMessage: '承诺未还' }),
          status: 'Warning',
        },
        4: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.rejected', defaultMessage: '拒绝还款' }),
          status: 'Error',
        },
        7: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.repay', defaultMessage: '已还款' }),
          status: 'Success',
        },
      },
    },
    // {
    //   title: intl.formatMessage({ id: 'pages.QCCollectionNews.h_phone', defaultMessage: '' }),
    //   dataIndex: 'h_phone',
    //   key: 'h_phone',
    // },
    // {
    //   title: intl.formatMessage({ id: 'pages.QCCollectionNews.i_target', defaultMessage: '' }),
    //   dataIndex: 'i_target',
    //   key: 'i_target',
    // },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.j_content', defaultMessage: '' }),
      dataIndex: 'j_content',
      key: 'j_content',
      render: (text, record) => {
        if (!text) return null;
        if (record.f_cat === 1 || record.f_cat === 6) {
          return (
            <audio
              controls
              src={`https://api.dasewan.cn/storage/${text}`}
            />
          );
        }
        return text;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.k_promise_time', defaultMessage: '' }),
      dataIndex: 'k_promise_time',
      key: 'k_promise_time',
      valueType: 'dateTime',
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.m_overdue_days', defaultMessage: '' }),
      dataIndex: 'm_overdue_days',
      key: 'm_overdue_days',
    },
    {
      title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateTime',
    }
   
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
        
      />
    </PageContainer>
  );
};

export default TableList;

import Chart from '@/pages/Statistics/Collection/Admin/components/Chart';
import Chart2 from '@/pages/Statistics/Collection/Admin/components/Chart2';
import { FieldOptions, FieldOptions2 } from '@/pages/Statistics/enums';
import { getAdminV1GMCollectionAdminsEnum as getCollectionAdminsEnum } from '@/services/ant-design-pro/GMCollectionAdmin';
import { getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum } from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { getAdminV1WSCollectionAdminHeatmaps as index } from '@/services/ant-design-pro/WSCollectionAdminHeatmap';
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
    if (admins.length === 0) {
      // @ts-ignore
      await _getUsersEnum();
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
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_date', defaultMessage: '' }),
      dataIndex: 'a_date',
      key: 'a_date',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.e_collection_admin_id', defaultMessage: '' }),
      dataIndex: 'e_collection_admin_id',
      key: 'e_collection_admin_id',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.b_init_count', defaultMessage: '' }),
      dataIndex: 'b_init_count',
      key: 'b_init_count',
      render: (_, record) => {
        return record!.b_init_count + '+' + record!.a_b_12_new_count ;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.c_success_count', defaultMessage: '' }),
      dataIndex: 'c_success_count',
      key: 'c_success_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.success_rate', defaultMessage: '' }),
      dataIndex: 'success_rate',
      key: 'success_rate',
      render: (_, record) => {
        return `${Math.round((record!.c_success_count! / record!.b_init_count!) * 100)}%`;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.i_log_count', defaultMessage: '' }),
      dataIndex: 'i_log_count',
      key: 'i_log_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.g_call_count', defaultMessage: '' }),
      dataIndex: 'g_call_count',
      key: 'g_call_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_u_call_contact_count', defaultMessage: '' }),
      dataIndex: 'a_u_call_contact_count',
      key: 'a_u_call_contact_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.n_no_log_count', defaultMessage: '' }),
      dataIndex: 'n_no_log_count',
      key: 'n_no_log_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.o_no_call_count', defaultMessage: '' }),
      dataIndex: 'o_no_call_count',
      key: 'o_no_call_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.p_kpi', defaultMessage: '' }),
      dataIndex: 'p_kpi',
      key: 'p_kpi',
      render: (_, record) => {
        switch(record.p_kpi) {
          case 1: return 'BB';
          case 2: return 'B';
          case 3: return 'A';
          case 4: return 'AA';
          default: return '-';
        }
      },
    },

    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.r_bonus', defaultMessage: '' }),
      dataIndex: 'r_bonus',
      key: 'r_bonus',
    },

    
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_i_lv1_bonus', defaultMessage: '' }),
      dataIndex: 'a_i_lv1_bonus',
      key: 'a_i_lv1_bonus',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_j_lv2_bonus', defaultMessage: '' }),
      dataIndex: 'a_j_lv2_bonus',
      key: 'a_j_lv2_bonus',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_k_lv3_bonus', defaultMessage: '' }),
      dataIndex: 'a_k_lv3_bonus',
      key: 'a_k_lv3_bonus',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_l_lv4_bonus', defaultMessage: '' }),
      dataIndex: 'a_l_lv4_bonus',
      key: 'a_l_lv4_bonus',
    },
    
    
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_a_12_count', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_a_12_log_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_b_12_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_c_12_contact_call_count', defaultMessage: '' }),
      render: (_, record) => {
        return record!.b_a_12_log_count + '-' + record!.b_b_12_call_count + '-' + record!.b_c_12_contact_call_count;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_e_18_count', defaultMessage: '' }),
      dataIndex: 'b_e_18_log_count',
      key: 'b_e_18_log_count',
      tooltip: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_e_18_log_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_f_18_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_g_18_contact_call_count', defaultMessage: '' }),
      render: (_, record) => {
        return record!.b_e_18_log_count + '-' + record!.b_f_18_call_count + '-' + record!.b_g_18_contact_call_count;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_i_24_count', defaultMessage: '' }),
      dataIndex: 'b_i_24_log_count',
      key: 'b_i_24_log_count',
      tooltip: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_i_24_log_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_j_24_call_count', defaultMessage: '' }) +'-'+
      intl.formatMessage({ id: 'pages.BLCollectionOrder.b_k_24_contact_call_count', defaultMessage: '' }),
      render: (_, record) => {
        return record!.b_i_24_log_count + '-' + record!.b_j_24_call_count + '-' + record!.b_k_24_contact_call_count;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_q_neo_count', defaultMessage: '' }),
      dataIndex: 'a_q_neo_count',
      key: 'a_q_neo_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_r_promise_count', defaultMessage: '' }),
      dataIndex: 'a_r_promise_count',
      key: 'a_r_promise_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_s_broken_count', defaultMessage: '' }),
      dataIndex: 'a_s_broken_count',
      key: 'a_s_broken_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_t_refuse_count', defaultMessage: '' }),
      dataIndex: 'a_t_refuse_count',
      key: 'a_t_refuse_count',
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

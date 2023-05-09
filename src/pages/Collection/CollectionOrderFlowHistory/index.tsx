import { COLLECTION_FLOW_TYPE } from '@/pages/enums';
import styles from '@/pages/Operation/BProduct/index.less';
import { getAdminV1GMCollectionAdminsEnum as getCollectionAdminsEnum } from '@/services/ant-design-pro/GMCollectionAdmin';
import { getAdminV1GNCollectionStagesEnum as getCollectionStagesEnum } from '@/services/ant-design-pro/GNCollectionStage';
import { getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum } from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1NCCollectionOrderFlows as index } from '@/services/ant-design-pro/NCCollectionOrderFlowHistory';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  const [collectionStages, setCollectionStages] = useState<RequestOptionsType[]>([]);
  const [collectionAgencies, setCollectionAgencies] = useState<RequestOptionsType[]>([]);
  const [collectionGroups, setCollectionGroups] = useState<RequestOptionsType[]>([]);
  const [collectionAdmins, setCollectionAdmins] = useState<RequestOptionsType[]>([]);

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
   * 查询阶段enum
   */
  const _getCollectionStagesEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionStages.length === 0) {
      const res = await getCollectionStagesEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setCollectionStages(data);
      return data;
    } else {
      return collectionStages;
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
   * 查询催收小组enum
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

  //
  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.v_borrow_sn,
      dataIndex: FieldIndex.v_borrow_sn,
      fixed: 'left',
      width: 120,
    },
    {
      title: FieldLabels.a_b_borrow_count,
      dataIndex: FieldIndex.a_b_borrow_count,
      fixed: 'left',
      width: 60,
    },
    {
      title: FieldLabels.w_phone,
      dataIndex: FieldIndex.w_phone,
      fixed: 'left',
      width: 120,
    },
    {
      title: FieldLabels.x_name,
      dataIndex: FieldIndex.x_name,
      fixed: 'left',
      width: 120,
    },
    {
      title: '流转前',
      search: false,
      className: styles.blue2,
      children: [
        {
          title: FieldLabels.e_before_collection_stage_id,
          dataIndex: FieldIndex.e_before_collection_stage_id,
          width: 50,
          className: styles.blue2,
          valueType: 'select',
          request: _getCollectionStagesEnum,
          params: { timestamp: Math.random() },
        },
        {
          title: FieldLabels.f_before_collection_agency_id,
          dataIndex: FieldIndex.f_before_collection_agency_id,
          width: 140,
          className: styles.blue2,
          valueType: 'select',
          request: _getCollectionAgenciesEnum,
          params: { timestamp: Math.random() },
        },
        {
          title: FieldLabels.g_before_collection_group_id,
          dataIndex: FieldIndex.g_before_collection_group_id,
          width: 140,
          className: styles.blue2,
          valueType: 'select',
          request: _getCollectionGroupsEnum,
          params: { timestamp: Math.random() },
        },
        {
          title: FieldLabels.h_before_collection_admin_id,
          dataIndex: FieldIndex.h_before_collection_admin_id,
          width: 100,
          className: styles.blue2,
          valueType: 'select',
          request: _getCollectionAdminsEnum,
          params: { timestamp: Math.random() },
        },
      ],
    },
    {
      title: '流转后',
      search: false,
      className: styles.blue,
      children: [
        {
          title: FieldLabels.i_after_collection_stage_id,
          dataIndex: FieldIndex.i_after_collection_stage_id,
          width: 50,
          valueType: 'select',
          className: styles.blue,
          request: _getCollectionStagesEnum,
          params: { timestamp: Math.random() },
        },
        {
          title: FieldLabels.j_after_collection_agency_id,
          dataIndex: FieldIndex.j_after_collection_agency_id,
          width: 140,
          valueType: 'select',
          className: styles.blue,
          request: _getCollectionAgenciesEnum,
          params: { timestamp: Math.random() },
        },
        {
          title: FieldLabels.k_after_collection_group_id,
          dataIndex: FieldIndex.k_after_collection_group_id,
          width: 140,
          valueType: 'select',
          className: styles.blue,
          request: _getCollectionGroupsEnum,
          params: { timestamp: Math.random() },
        },
        {
          title: FieldLabels.l_after_collection_admin_id,
          dataIndex: FieldIndex.l_after_collection_admin_id,
          width: 100,
          valueType: 'select',
          className: styles.blue,
          request: _getCollectionAdminsEnum,
          params: { timestamp: Math.random() },
        },
      ],
    },
    {
      title: FieldLabels.c_type,
      dataIndex: FieldIndex.c_type,
      valueType: 'select',
      valueEnum: COLLECTION_FLOW_TYPE,
      width: 100,
    },
    {
      title: FieldLabels.m_collection_admin_log_count,
      dataIndex: FieldIndex.m_collection_admin_log_count,
      width: 100,
    },
    {
      title: FieldLabels.n_collection_admin_call_count,
      dataIndex: FieldIndex.n_collection_admin_call_count,
      width: 100,
    },
    {
      title: FieldLabels.o_system_sms_count,
      dataIndex: FieldIndex.o_system_sms_count,
      width: 100,
    },

    {
      title: FieldLabels.r_repay_log_ids,
      dataIndex: FieldIndex.r_repay_log_ids,
      width: 100,
    },
    {
      title: FieldLabels.u_view_times,
      dataIndex: FieldIndex.u_view_times,
      width: 100,
    },
    {
      title: FieldLabels.z_last_log_time,
      dataIndex: FieldIndex.z_last_log_time,
      width: 100,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.a_a_flow_out_time).format('YY-MM-DD HH:mm');
      },
    },
    {
      title: FieldLabels.a_a_flow_out_time,
      dataIndex: FieldIndex.a_a_flow_out_time,
      width: 100,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.a_a_flow_out_time).format('YY-MM-DD HH:mm');
      },
    },
    {
      title: FieldLabels.t_borrow_amount,
      dataIndex: FieldIndex.t_borrow_amount,
      fixed: 'right',
      width: 120,
    },
    {
      title: FieldLabels.p_collection_amount,
      dataIndex: FieldIndex.p_collection_amount,
      fixed: 'right',
      width: 120,
    },
    {
      title: FieldLabels.y_commission,
      dataIndex: FieldIndex.y_commission,
      fixed: 'right',
      width: 120,
    },
    {
      title: FieldLabels.p_collection_amount,
      dataIndex: FieldIndex.p_collection_amount,
      fixed: 'right',
      width: 120,
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '催收流转记录',
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
        scroll={{ x: '50%' }}
        bordered={true}
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

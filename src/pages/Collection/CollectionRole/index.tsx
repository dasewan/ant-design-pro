import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

import EditForm from '@/pages/Collection/CollectionRole/components/EditForm';
import styles from '@/pages/Collection/CollectionRole/index.less';
import {
  AgencyRoleFieldIndex,
  AgencyRoleFieldLabels,
  FieldIndex,
  FieldLabels,
  GroupRoleFieldIndex,
  GroupRoleFieldLabels,
} from '@/pages/Collection/CollectionRole/service';
import { ASSIGN_TYPE, COMMON_STATUS_INT, FLOW_TYPE } from '@/pages/enums';
import { getAdminV1GNCollectionStages as index } from '@/services/ant-design-pro/GNCollectionStage';
import { getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum } from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import type { RequestOptionsType } from '@ant-design/pro-utils';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [collectionStages, setCollectionStages] = useState<RequestOptionsType[]>([]);
  const [collectionAgencies, setCollectionAgencies] = useState<RequestOptionsType[]>([]);
  const [collectionGroups, setCollectionGroups] = useState<RequestOptionsType[]>([]);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);

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
  /**
   * 查询催收机构enum
   */
  const _getCollectionAgenciesEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionAgencies.length === 0) {
      const res = await getCollectionAgenciesEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
          c_begin_collection_stage: item.c_begin_collection_stage,
        });
      }
      setCollectionAgencies(data);
      return data;
    } else {
      return collectionAgencies;
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
    const data: RequestOptionsType[] = [];
    if (collectionStages.length === 0) {
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setCollectionStages(data);
    }
    if (collectionAgencies.length === 0) {
      await _getCollectionAgenciesEnum();
    }
    if (collectionGroups.length === 0) {
      await _getCollectionGroupsEnum();
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
   * 新建催收组model
   * @param _id
   */
  const onEditClick = async (_id: number) => {
    setId(_id);
    handleCreateModalVisible(true);
  };

  const expendColumns: ProColumns<API.HFCollectionAgencyRole>[] = [
    {
      title: AgencyRoleFieldLabels.b_collection_agency_id,
      dataIndex: AgencyRoleFieldIndex.b_collection_agency_id,
      valueType: 'select',
      request: async () => {
        return collectionAgencies;
      },
    },
    {
      title: AgencyRoleFieldLabels.c_collection_agency_proportion,
      dataIndex: AgencyRoleFieldIndex.c_collection_agency_proportion,
      valueType: 'percent',
    },
    {
      title: AgencyRoleFieldLabels.d_assign_type,
      dataIndex: AgencyRoleFieldIndex.d_assign_type,
      valueEnum: ASSIGN_TYPE,
    },
  ];
  const expendColumns2: ProColumns<API.HFCollectionAgencyRole>[] = [
    {
      title: GroupRoleFieldLabels.d_collection_group_id,
      dataIndex: GroupRoleFieldIndex.d_collection_group_id,
      valueType: 'select',
      request: async () => {
        return collectionGroups;
      },
      params: { timestamp: Math.random() },

      className: styles.blue2,
    },
    {
      title: GroupRoleFieldLabels.e_collection_group_proportion,
      dataIndex: GroupRoleFieldIndex.e_collection_group_proportion,
      valueType: 'percent',

      className: styles.blue2,
    },
    {
      title: GroupRoleFieldLabels.f_assign_type,
      dataIndex: GroupRoleFieldIndex.f_assign_type,
      valueEnum: ASSIGN_TYPE,
      className: styles.blue2,
    },
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: FieldIndex.a_name,
    },
    {
      title: FieldLabels.c_start_day,
      dataIndex: FieldIndex.c_start_day,
    },
    {
      title: FieldLabels.d_end_day,
      dataIndex: FieldIndex.d_end_day,
    },
    {
      title: FieldLabels.b_flow_type,
      dataIndex: FieldIndex.b_flow_type,
      valueEnum: FLOW_TYPE,
    },
    {
      title: FieldLabels.g_assign_type,
      dataIndex: FieldIndex.g_assign_type,
      valueEnum: ASSIGN_TYPE,
    },
    {
      title: FieldLabels.e_status,
      dataIndex: FieldIndex.e_status,
      valueEnum: COMMON_STATUS_INT,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => onEditClick(record.id!)}>
            编辑
          </a>
        );

        return [edit];
      },
    },
  ];
  const expandedRowRender2 = (record: API.HFCollectionAgencyRole) => {
    const dataSourse: API.NBCollectionGroupRole[] = record.a_a_a_a_a_n_b_collection_group_roles!;
    return (
      <ProTable<API.NBCollectionGroupRole, TableListPagination>
        columns={expendColumns2}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={dataSourse}
        pagination={false}
        rowKey="id"
      />
    );
  };
  const expandedRowRender = (record: TableListItem) => {
    const dataSourse: API.HFCollectionAgencyRole[] = record.a_a_a_a_a_h_f_collection_agency_roles!;
    return (
      <ProTable<API.HFCollectionAgencyRole, TableListPagination>
        columns={expendColumns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={dataSourse}
        pagination={false}
        rowKey="id"
        // @ts-ignore
        expandable={{
          expandedRowRender: expandedRowRender2,
          // @ts-ignore
          rowExpandable: (_record) => _record.a_a_a_a_a_n_b_collection_group_roles.length! > 0,
        }}
      />
    );
  };

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '123123',
        ghost: true,
        extra: [
          <Button key="3" type="primary">
            验证123123
          </Button>,
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
        // @ts-ignore
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: true,
          // @ts-ignore
          rowExpandable: (record) => record.a_a_a_a_a_h_f_collection_agency_roles.length! > 0,
        }}
      />
      {/*表单model*/}
      <EditForm
        onSubmit={async (success) => {
          if (success) {
            handleCreateModalVisible(false);
            setId(0);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCreateModalVisible(false);
          setId(0);
        }}
        id={id}
        modalVisible={createModalVisible}
        collectionAgencies={collectionAgencies}
        collectionGroups={collectionGroups}
        // admins={admins}
      />
    </PageContainer>
  );
};

export default TableList;

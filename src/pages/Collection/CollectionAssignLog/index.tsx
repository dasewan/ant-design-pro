import {
  ASSIGN_TYPE,
  COLLECTION_ASSIGN_LOG_CAT_TYPE,
  COLLECTION_ASSIGN_LOG_TYPE,
  FLOW_TYPE,
} from '@/pages/enums';
import { getAdminV1GMCollectionAdminsEnum as getCollectionAdminsEnum } from '@/services/ant-design-pro/GMCollectionAdmin';
import { getAdminV1GNCollectionStagesEnum as getCollectionStagesEnum } from '@/services/ant-design-pro/GNCollectionStage';
import { getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum } from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import { getAdminV1VCollectionAssignLogs as index } from '@/services/ant-design-pro/VCollectionAssignLog';
import { ProCard } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { RequestOptionsType } from '@ant-design/pro-utils';
import { Divider } from 'antd';
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
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  const [title, setTitle] = useState<string>('');

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
    await _getCollectionAdminsEnum();
    await _getCollectionStagesEnum();
    await _getCollectionAgenciesEnum();
    await _getCollectionGroupsEnum();

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
      title: FieldLabels.a_batch_sn,
      dataIndex: FieldIndex.a_batch_sn,
      width: 100,
    },
    {
      title: FieldLabels.b_admin_id,
      dataIndex: FieldIndex.b_admin_id,
      width: 100,
    },
    {
      title: FieldLabels.e_cat,
      dataIndex: FieldIndex.e_cat,
      valueEnum: COLLECTION_ASSIGN_LOG_CAT_TYPE,
      width: 100,
    },
    {
      title: FieldLabels.d_target_type,
      dataIndex: FieldIndex.d_target_type,
      valueEnum: COLLECTION_ASSIGN_LOG_TYPE,
      width: 100,
    },
    {
      title: FieldLabels.c_target_id,
      dataIndex: FieldIndex.c_target_id,
      width: 180,
      render: (_, record) => {
        if (record.d_target_type === 1) {
          return collectionAgencies.find((item) => {
            return item.value === record.c_target_id;
          })?.label;
        }
        if (record.d_target_type === 2) {
          return collectionGroups.find((item) => {
            return item.value === record.c_target_id;
          })?.label;
        }
        if (record.d_target_type === 3) {
          return collectionAdmins.find((item) => {
            return item.value === record.c_target_id;
          })?.label;
        }
      },
    },
    {
      title: FieldLabels.h_rate,
      dataIndex: FieldIndex.h_rate,
    },
    {
      title: FieldLabels.i_assign_type,
      dataIndex: FieldIndex.i_assign_type,
      valueEnum: ASSIGN_TYPE,
      width: 100,
    },
    {
      title: FieldLabels.j_flow_type,
      dataIndex: FieldIndex.j_flow_type,
      valueEnum: FLOW_TYPE,
      width: 100,
    },
    {
      title: FieldLabels.f_should_assign_count,
      dataIndex: FieldIndex.f_should_assign_count,
    },
    {
      title: FieldLabels.g_old_assign_count,
      dataIndex: FieldIndex.g_old_assign_count,
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
      <ProCard split="vertical">
        <ProCard colSpan={14} ghost>
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
            onRow={(record) => {
              return {
                onClick: () => {
                  setOldRecord(record);
                  if (record.d_target_type === 1) {
                    let _title = collectionAgencies.find((item) => {
                      return item.value === record.c_target_id;
                    })?.label;
                    // @ts-ignore
                    setTitle(_title);
                  }
                  if (record.d_target_type === 2) {
                    let _title = collectionGroups.find((item) => {
                      return item.value === record.c_target_id;
                    })?.label;
                    // @ts-ignore
                    setTitle(_title);
                  }
                  if (record.d_target_type === 3) {
                    let _title = collectionAdmins.find((item) => {
                      return item.value === record.c_target_id;
                    })?.label;
                    // @ts-ignore
                    setTitle(_title);
                  }
                },
              };
            }}
          />
        </ProCard>
        <ProCard
          colSpan={10}
          title={title}
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          <Divider plain>新案件</Divider>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {oldRecord?.l_new_detail}
          </div>
          <Divider plain>旧案件</Divider>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {oldRecord?.k_old_detail}
          </div>
          <Divider plain>差集或交集</Divider>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {oldRecord?.m_diff_or_intersect_detail}
          </div>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default TableList;

import CreateForm from '@/pages/Collection/CollectionGroup/components/CreateForm';
import ReleaseForm from '@/pages/Collection/CollectionGroup/components/ReleaseForm';

import { getAdminV1GNCollectionStagesEnum as getCollectionStagesEnum } from '@/services/ant-design-pro/GNCollectionStage';
import {
  getAdminV1HECollectionGroups as index,
  getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum,
  putAdminV1HECollectionGroupsId as update,
} from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import {Button, message, Popconfirm, Spin, Switch} from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';
import { useIntl } from '@@/exports';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 新建催收组 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 释放 */
  const [releaseModalVisible, handleReleaseModalVisible] = useState<boolean>(false);
  const [collectionStages, setCollectionStages] = useState<RequestOptionsType[]>([]);
  const [collectionAgencies, setCollectionAgencies] = useState<RequestOptionsType[]>([]);
  const [collectionGroups, setCollectionGroups] = useState<RequestOptionsType[]>([]);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 渠道enum */
  const [currentRecord, setCurrentRecord] = useState<TableListItem>();
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

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
  /**
   * 查询产品enum
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
  /**
   * 释放model
   * @param _record
   */
  const onReleaseClick = async (_record: TableListItem) => {
    setCurrentRecord(_record);
    handleReleaseModalVisible(true);
  };
  const confirmSwitch = async (_item: TableListItem, field: string) => {
    let _success = true;
    _item[field] = _item[field] === 1 ? 0 : 1;
    setLoading(true);
    try {
      // @ts-ignore
      const res = await update({ ..._item });
      if (!res.success) {
        //恢复原值
        _item[field] = _item[field] === 1 ? 0 : 1;
        _success = false;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      //恢复原值
      _item[field] = _item[field] === 1 ? 0 : 1;
      _success = false;
    }
    setLoading(false);
    if (_success) {
      message.success('修改成功');
    } else {
      message.warning('修改失败');
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: FieldIndex.a_name,
    },
    {
      title: FieldLabels.b_admin_id,
      dataIndex: FieldIndex.b_admin_id,
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.c_collection_agency_id,
      dataIndex: FieldIndex.c_collection_agency_id,
      valueType: 'select',
      request: _getCollectionAgenciesEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.e_collection_admin_count,
      dataIndex: FieldIndex.e_collection_admin_count,
    },
    {
      title: FieldLabels.d_collection_stage_id,
      dataIndex: FieldIndex.d_collection_stage_id,
      valueType: 'select',
      request: _getCollectionStagesEnum,
      params: { timestamp: Math.random() },
      // render: (_, record) => {
      //   let r = '';
      //   if (record.d_collection_stage_id !== null && record.d_collection_stage_id !== '') {
      //     const collectionStageIdsArr = record.d_collection_stage_id!.split(',');
      //     const collectionStagesArr = collectionStages.filter((value) =>
      //       collectionStageIdsArr.find((_id) => _id === value.value),
      //     );
      //
      //     for (const c of collectionStagesArr) {
      //       r += '[' + c.label + '] ';
      //     }
      //     return r;
      //   }
      //   return r;
      // },
    },
    {
      title: FieldLabels.h_collection_ing_order_count,
      dataIndex: FieldIndex.h_collection_ing_order_count,
    },
    {
      title: FieldLabels.f_status,
      dataIndex: FieldIndex.f_status,
    },
    {
      title: FieldLabels.g_comment,
      dataIndex: FieldIndex.g_comment,
    },
    {
      title: FieldLabels.created_at,
      dataIndex: FieldIndex.created_at,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.created_at).format('YY-MM-DD HH:mm');
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewAdmin.j_status', defaultMessage: '' }),
      dataIndex: 'f_status',
      key: 'f_status',
      render: (_, record) => {
        return (
          <Popconfirm
            title={`${intl.formatMessage({
              id: 'pages.common.switch_tip',
              defaultMessage: '',
            })} ${intl.formatMessage({
              id: 'pages.Borrow.ReviewAdmin.f_status',
              defaultMessage: '',
            })}`}
            onConfirm={confirmSwitch.bind(this, record, 'f_status')}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren={intl.formatMessage({ id: 'pages.common.enable', defaultMessage: '' })}
              unCheckedChildren={intl.formatMessage({
                id: 'pages.common.disable',
                defaultMessage: '',
              })}
              checked={record.f_status === 1}
            />
          </Popconfirm>
        );
      },
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
        let move;
        if (record.h_collection_ing_order_count! > 0) {
          move = (
            <a key="move" onClick={() => onReleaseClick(record)}>
              释放
            </a>
          );
        }

        return [edit, move];
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '催收组管理',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => onEditClick(0)}>
            新建催收组
          </Button>,
        ],
      }}
    >
      <Spin spinning={loading}>
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
      </Spin>
      {/*表单model*/}
      <CreateForm
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
        collectionStages={collectionStages}
        admins={admins}
      />
      {/*释放model*/}
      <ReleaseForm
        onSubmit={async (success) => {
          if (success) {
            handleReleaseModalVisible(false);
            setId(0);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleReleaseModalVisible(false);
          setId(0);
        }}
        modalVisible={releaseModalVisible}
        record={currentRecord!}
        collectionGroups={collectionGroups}
        collectionStages={collectionStages}
      />
    </PageContainer>
  );
};

export default TableList;

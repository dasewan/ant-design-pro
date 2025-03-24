import CreateForm from '@/pages/Collection/CollectionAdmin/components/CreateForm';
import ReleaseForm from '@/pages/Collection/CollectionAdmin/components/ReleaseForm';

import {
  getAdminV1GMCollectionAdmins as index,
  getAdminV1GMCollectionAdminsEnum as getCollectionAdminsEnum,
  putAdminV1GMCollectionAdminsId as update,
} from '@/services/ant-design-pro/GMCollectionAdmin';
import { getAdminV1GNCollectionStagesEnum as getCollectionStagesEnum } from '@/services/ant-design-pro/GNCollectionStage';
import { getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum } from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import {Button, message, Popconfirm, Switch, Spin} from 'antd';
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
  const [collectionAdmins, setCollectionAdmins] = useState<RequestOptionsType[]>([]);
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
          value: item.id!.toString(),
        });
      }
      setCollectionStages(data);
      return data;
    } else {
      return collectionStages;
    }
  };
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
    if (collectionAdmins.length === 0) {
      await _getCollectionAdminsEnum();
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
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.a_name', defaultMessage: '' }),
      dataIndex: 'a_name',
      key: 'a_name',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.b_admin_id', defaultMessage: '' }),
      dataIndex: 'b_admin_id',
      key: 'b_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.c_collection_agency_id', defaultMessage: '' }),
      dataIndex: 'c_collection_agency_id',
      key: 'c_collection_agency_id',
      valueType: 'select',
      request: _getCollectionAgenciesEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.d_collection_group_id', defaultMessage: '' }),
      dataIndex: 'd_collection_group_id',
      key: 'd_collection_group_id',
      valueType: 'select',
      request: _getCollectionGroupsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.e_collection_stages', defaultMessage: '' }),
      dataIndex: 'e_collection_stages',
      key: 'e_collection_stages',
      valueType: 'select',
      request: _getCollectionStagesEnum,
      params: { timestamp: Math.random() },
      // render: (_, record) => {
      //   let r = '';
      //   if (record.e_collection_stages !== null && record.e_collection_stages !== '') {
      //     const collectionStageIdsArr = record.e_collection_stages!.split(',');
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
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.f_status', defaultMessage: '' }),
      dataIndex: 'f_status',
      key: 'f_status',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.g_comment', defaultMessage: '' }),
      dataIndex: 'g_comment',
      key: 'g_comment',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.h_collection_ing_order_count', defaultMessage: '' }),
      dataIndex: 'h_collection_ing_order_count',
      key: 'h_collection_ing_order_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.i_today_current_kpi_level', defaultMessage: '' }),
      dataIndex: 'i_today_current_kpi_level',
      key: 'i_today_current_kpi_level',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.j_today_init_amount', defaultMessage: '' }),
      dataIndex: 'j_today_init_amount',
      key: 'j_today_init_amount',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.k_current_new_count', defaultMessage: '' }),
      dataIndex: 'k_current_new_count',
      key: 'k_current_new_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.l_current_negotiating_count', defaultMessage: '' }),
      dataIndex: 'l_current_negotiating_count',
      key: 'l_current_negotiating_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.m_currrent_promised_count', defaultMessage: '' }),
      dataIndex: 'm_currrent_promised_count',
      key: 'm_currrent_promised_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.n_current_broken_count', defaultMessage: '' }),
      dataIndex: 'n_current_broken_count',
      key: 'n_current_broken_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.o_current_refused_count', defaultMessage: '' }),
      dataIndex: 'o_current_refused_count',
      key: 'o_current_refused_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.p_today_current_repay_count', defaultMessage: '' }),
      dataIndex: 'p_today_current_repay_count',
      key: 'p_today_current_repay_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.r_today_current_repay_amount', defaultMessage: '' }),
      dataIndex: 'r_today_current_repay_amount',
      key: 'r_today_current_repay_amount',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.t_today_lv1_commission', defaultMessage: '' }),
      dataIndex: 't_today_lv1_commission',
      key: 't_today_lv1_commission',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.u_today_lv2_commission', defaultMessage: '' }),
      dataIndex: 'u_today_lv2_commission',
      key: 'u_today_lv2_commission',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.v_today_lv3_commission', defaultMessage: '' }),
      dataIndex: 'v_today_lv3_commission',
      key: 'v_today_lv3_commission',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.w_today_lv4_commission', defaultMessage: '' }),
      dataIndex: 'w_today_lv4_commission',
      key: 'w_today_lv4_commission',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.x_today_init_count', defaultMessage: '' }),
      dataIndex: 'x_today_init_count',
      key: 'x_today_init_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.y_first_log_at', defaultMessage: '' }),
      dataIndex: 'y_first_log_at',
      key: 'y_first_log_at',
      render: (_, record) => {
        return moment(record!.y_first_log_at).format('DD HH:mm');
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.z_last_log_at', defaultMessage: '' }),
      dataIndex: 'z_last_log_at',
      key: 'z_last_log_at',
      render: (_, record) => {
        return moment(record!.z_last_log_at).format('DD HH:mm');
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.a_a_month_lv1_commission', defaultMessage: '' }),
      dataIndex: 'a_a_month_lv1_commission',
      key: 'a_a_month_lv1_commission',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.a_b_month_lv2_commission', defaultMessage: '' }),
      dataIndex: 'a_b_month_lv2_commission',
      key: 'a_b_month_lv2_commission',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.a_c_month_lv1_commission', defaultMessage: '' }),
      dataIndex: 'a_c_month_lv1_commission',
      key: 'a_c_month_lv1_commission',
    },
    {
      title: intl.formatMessage({ id: 'pages.GMCollectionAdmin.a_d_month_lv1_commission', defaultMessage: '' }),
      dataIndex: 'a_d_month_lv1_commission',
      key: 'a_d_month_lv1_commission',
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

        return [ move];
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
        scroll={{
          x: '50%'
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
        collectionGroups={collectionGroups}
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
        collectionAdmins={collectionAdmins}
      />
    </PageContainer>
  );
};

export default TableList;

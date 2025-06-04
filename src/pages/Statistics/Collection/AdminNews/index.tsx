import CreateForm from '@/pages/Collection/CollectionGroup/components/CreateForm';
import ReleaseForm from '@/pages/Collection/CollectionGroup/components/ReleaseForm';
import { PhoneOutlined ,HighlightOutlined,NumberOutlined} from '@ant-design/icons';

import { getAdminV1GNCollectionStagesEnum as getCollectionStagesEnum } from '@/services/ant-design-pro/GNCollectionStage';
import {
  getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum,
  putAdminV1HECollectionGroupsId as update,
} from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import { getAdminV1WTHeatmapDetails as index } from '@/services/ant-design-pro/WTCollectionAdminHeatmapDetail';
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
import HeatmapChart from '@/pages/Statistics/Collection/AdminNews/components/HeatmapChart';

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

  // 添加一个状态来记录当前被点击的按钮的 key
  const [activeButtonKey, setActiveButtonKey] = useState<string>('all');

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.a_date', defaultMessage: '' }),
      dataIndex: 'a_date',
      key: 'a_date',
      render: (text) => {
        const date = moment(text);
        if (date.isValid()) {
          return date.format('MM-DD');
        }
        return text;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.e_collection_admin_id', defaultMessage: '' }),
      dataIndex: 'e_collection_admin_id',
      key: 'e_collection_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.b_init_count', defaultMessage: '' }),
      dataIndex: 'b_init_count',
      key: 'b_init_count',
      render: (__, value) => {
        return (value.c_success_count ?? 0) + ' / ' + (value.b_init_count?? 0) ;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.n_no_log_count', defaultMessage: '' }),
      dataIndex: 'n_no_log_count',
      key: 'n_no_log_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.o_no_call_count', defaultMessage: '' }),
      dataIndex: 'o_no_call_count',
      key: 'o_no_call_count',
    },
    
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.a_q_neo_count', defaultMessage: '' }),
      dataIndex: 'a_q_neo_count',
      key: 'a_q_neo_count',
      render: (__, value) => {
        return (value.a_q_neo_count ?? 0) + '-' + (value.a_r_promise_count?? 0) + '-' + (value.a_s_broken_count?? 0) + '-' + (value.a_t_refuse_count?? 0);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return <HeatmapChart data={record.a_a_a_a_a_w_t_collection_admin_heatmap_details!} activeButtonKey={activeButtonKey} />
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.i_log_count', defaultMessage: '' }),
      dataIndex: 'i_log_count',
      key: 'i_log_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.GAMarketingDetailFactory.g_call_count', defaultMessage: '' }),
      dataIndex: 'g_call_count',
      key: 'g_call_count',
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
        // toolBarRender={() => [
        //   <Button
        //     key="all"
        //     type={activeButtonKey === 'all' ? 'primary' : 'default'}
        //     onClick={() => {
        //       setActiveButtonKey('all');
        //       // 这里可以添加点击 'All' 按钮后的逻辑
        //     }}
        //   >
        //     All
        //     <NumberOutlined />
        //   </Button>,
        //   <Button
        //     key="log"
        //     type={activeButtonKey === 'log' ? 'primary' : 'default'}
        //     onClick={() => {
        //       setActiveButtonKey('log');
        //       // 这里可以添加点击 'Log' 按钮后的逻辑
        //     }}
        //   >
        //     Log
        //     <HighlightOutlined />
        //   </Button>,
        //   <Button
        //     key="call"
        //     type={activeButtonKey === 'call' ? 'primary' : 'default'}
        //     onClick={() => {
        //       setActiveButtonKey('call');
        //       // 这里可以添加点击 'Call' 按钮后的逻辑
        //     }}
        //   >
        //     Call
        //     <PhoneOutlined />
        //   </Button>,
        // ]}
      />
      </Spin>
      
    </PageContainer>
  );
};

export default TableList;

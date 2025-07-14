import CreateForm from '@/pages/Collection/CollectionGroup/components/CreateForm';
import ReleaseForm from '@/pages/Collection/CollectionGroup/components/ReleaseForm';
import { PhoneOutlined, HighlightFilled, NumberOutlined, WhatsAppOutlined, MessageOutlined, PhoneFilled, MessageFilled } from '@ant-design/icons';

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
import { Button, message, Popconfirm, Spin, Progress } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';
import { useIntl } from '@@/exports';
import HeatmapChart from '@/pages/Statistics/Collection/AdminNews/components/HeatmapChart';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [records, setRecords] = useState<TableListItem[]>([]);
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
    setRecords(res.data!);
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

  const formatValue = (value: number) => (
    <span style={{
      fontSize: value !== 0 ? '16px' : 'inherit',
      fontWeight: value !== 0 ? 'bold' : 'normal',
      margin: '0 3px'
    }}>
      {value}
    </span>
  );

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.a_date', defaultMessage: '' }),
      dataIndex: 'a_date',
      key: 'a_date',
      fixed: 'left',
      width: 100,
      render: (text, record, index) => {
        const prevRecord = records[index - 1];
        if (prevRecord && prevRecord.a_date === text) {
          return {
            children: text,
            props: {
              rowSpan: 0
            }
          };
        }
        let rowSpan = 1;
        for (let i = index + 1; i < records.length; i++) {
          if (records[i].a_date === text) {
            rowSpan++;
          } else {
            break;
          }
        }
        return {
          children: text,
          props: {
            rowSpan: rowSpan
          }
        };
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.e_collection_admin_id', defaultMessage: '' }),
      dataIndex: 'e_collection_admin_id',
      key: 'e_collection_admin_id',
      valueType: 'select',
      fixed: 'left',
      width: 100,
      request: _getUsersEnum,
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.b_init_count', defaultMessage: '' }),
      dataIndex: 'b_init_count',
            tooltip: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.b_init_count', defaultMessage: '' }) + '+' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.d_e_admin_new_count', defaultMessage: '' }) + '+' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.a_b_12_new_count', defaultMessage: '' }) + '+' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.d_c_admin_delete_count', defaultMessage: '' }) + '-' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.d_b_today_delete_count', defaultMessage: '' }),
      key: 'b_init_count',
      render: (_, record) => {
        return record!.b_init_count + '+' + record!.d_e_admin_new_count + '+' + record!.a_b_12_new_count + '-' + record!.d_c_admin_delete_count + '-' + record!.d_b_today_delete_count;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.c_success_count', defaultMessage: '' }),
      dataIndex: 'c_success_count',
      tooltip: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.c_success_count', defaultMessage: '' }) + "(" + intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.d_a_resign_repay_count', defaultMessage: '' })+ ")",
      key: 'c_success_count',
      render: (_, record) => {
        return record!.c_success_count + (record!.d_a_resign_repay_count! > 0 ? "("  + record!.d_a_resign_repay_count! + ")": "");
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.success_rate', defaultMessage: '' }),
      dataIndex: 'success_rate',
      key: 'success_rate',
      width:80,
      render: (_, record) => {
        const percent = Math.round((record!.c_success_count! / record!.b_init_count!) * 100);
        let strokeColor = '#1890ff'; // 默认蓝色

        switch (record.p_kpi) {
          case 1: strokeColor = '#ff4d4f'; break; // BB: 红色
          case 2: strokeColor = '#faad14'; break; // B: 橙色
          case 3: strokeColor = '#1890ff'; break; // A: 绿色
          case 4: strokeColor = '#52c41a'; break; // AA: 青色
          default: strokeColor = '#1890ff';
        }

        return <Progress
          percent={percent}
          size="small"
          strokeColor={strokeColor}
          trailColor="#f5f5f5"
        />;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.p_kpi', defaultMessage: '' }),
      dataIndex: 'p_kpi',
      key: 'p_kpi',
      render: (_, record) => {
        switch (record.p_kpi) {
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
      title: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.detail', defaultMessage: '' }),
      dataIndex: 'option',
      valueType: 'option',
      tooltip: <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 50, height: 26, backgroundColor: '#b7eb8f', marginRight: 8 }}>0-3</div>
            <div style={{ width: 50, height: 26, backgroundColor: '#237804', marginRight: 8 }}>4-6</div>
            <div style={{ width: 50, height: 26, backgroundColor: '#FB7CC8', marginRight: 8 }}>7-10</div> 
            <div style={{ width: 50, height: 26, backgroundColor: '#FF0033', marginRight: 8 }}>11-15</div>
            <div style={{ width: 50, height: 26, backgroundColor: '#660000', marginRight: 8 }}>16-50</div>
          </div>,
      width: 600,
      render: (_, record) => {
        return <HeatmapChart data={record.a_a_a_a_a_w_t_collection_admin_heatmap_details!} activeButtonKey={activeButtonKey} />
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.BLCollectionOrder.b_a_12_count', defaultMessage: '' }),
      dataIndex: 'b_a_12_log_count',
      key: 'b_a_12_log_count',
      tooltip: intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.b_a_12_log_count', defaultMessage: '' }) + '-' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.b_b_12_call_count', defaultMessage: '' }) + '-' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.b_o_12_sms_count', defaultMessage: '' }) + '-' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.b_m_12_wa_count', defaultMessage: '' }) + '-' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.b_c_12_contact_call_count', defaultMessage: '' }) + '-' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.u_contact_sms_count', defaultMessage: '' }) + '-' +
        intl.formatMessage({ id: 'pages.WSCollectionAdminHeatmap.b_n_12_contact_wa_count', defaultMessage: '' }),
      render: (_, record) => {
        return <>
        <div>
          <HighlightFilled style={{ fontSize: 14 }}/>
          -
          <PhoneFilled style={{ fontSize: 14 }}/>
          -
          <MessageFilled style={{ fontSize: 14 }}/>
          -
          <WhatsAppOutlined style={{ fontSize: 14 }}/>
          -
          <PhoneOutlined style={{ fontSize: 14 }}/>
          -
          <MessageOutlined style={{ fontSize: 14 }}/>
          -
          <WhatsAppOutlined style={{ fontSize: 14 }}/>
        </div>
        <div>
          {formatValue(record!.b_a_12_log_count!)}
          -
          {formatValue(record!.b_b_12_call_count!)}
          -
          {formatValue(record!.b_o_12_sms_count!)}
          -
          {formatValue(record!.b_m_12_wa_count!)}
          -
          {formatValue(record!.b_c_12_contact_call_count!)}
          -
          {formatValue(record!.u_contact_sms_count!)}
          -
          {formatValue(record!.b_n_12_contact_wa_count!)}
        </div>
        <div>
          {formatValue(record!.b_e_18_log_count!)}
          -
          {formatValue(record!.b_f_18_call_count!)}
          -
          {formatValue(record!.b_s_18_sms_count!)}
          -
          {formatValue(record!.b_q_18_wa_count!)}
          -
          {formatValue(record!.b_g_18_contact_call_count!)}
          -
          {formatValue(record!.b_t_18_contact_sms_count!)}
          -
          {formatValue(record!.b_r_18_contact_wa_count!)}
        </div>
        <div>
          {formatValue(record!.b_i_24_log_count!)}
          -
          {formatValue(record!.b_j_24_call_count!)}
          -
          {formatValue(record!.b_w_24_sms_count!)}
          -
          {formatValue(record!.b_u_24_wa_count!)}
          -
          {formatValue(record!.b_k_24_contact_call_count!)}
          -
          {formatValue(record!.b_x_24_contact_sms_count!)}
          -
          {formatValue(record!.b_v_24_contact_wa_count!)}
        </div>
        </>
      },
    }
  ];


  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: intl.formatMessage({ id: 'menu.statistics.collection.admin-news', defaultMessage: '' }),
        ghost: true,
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
          bordered={true}
          request={_index}
          columns={columns}
          //@bookmark
          scroll={{ x: 'max-content' }}
          postData={(data: any[]) => {
            return data;
          }}
          pagination={{
            pageSize: 50,
          }}
          toolBarRender={() => [
            <Button
              key="all"
              type={activeButtonKey === 'all' ? 'primary' : 'default'}
              onClick={() => {
                setActiveButtonKey('all');
                // 这里可以添加点击 'All' 按钮后的逻辑
              }}
            >
              All
              <NumberOutlined />
            </Button>,
            <Button
              key="log"
              type={activeButtonKey === 'log' ? 'primary' : 'default'}
              onClick={() => {
                setActiveButtonKey('log');
                // 这里可以添加点击 'Log' 按钮后的逻辑
              }}
            >
              Log
              <HighlightFilled />
            </Button>,
            <Button
              key="call"
              type={activeButtonKey === 'call' ? 'primary' : 'default'}
              onClick={() => {
                setActiveButtonKey('call');
                // 这里可以添加点击 'Call' 按钮后的逻辑
              }}
            >
              Call

              <PhoneFilled />
            </Button>,
            <Button
              key="call"
              type={activeButtonKey === 'sms' ? 'primary' : 'default'}
              onClick={() => {
                setActiveButtonKey('sms');
                // 这里可以添加点击 'Call' 按钮后的逻辑
              }}
            >
              Sms
              <MessageFilled />

            </Button>,
            <Button
              key="wa"
              type={activeButtonKey === 'wa' ? 'primary' : 'default'}
              onClick={() => {
                setActiveButtonKey('wa');
                // 这里可以添加点击 'Call' 按钮后的逻辑
              }}
            >
              WA
              <WhatsAppOutlined />
            </Button>,
            <Button
              key="contact-call"
              type={activeButtonKey === 'contact-call' ? 'primary' : 'default'}
              onClick={() => {
                setActiveButtonKey('contact-call');
                // 这里可以添加点击 'Call' 按钮后的逻辑
              }}
            >
              Contact Call
              <PhoneOutlined />
            </Button>,

            <Button
              key="contact-sms"
              type={activeButtonKey === 'contact-sms' ? 'primary' : 'default'}
              onClick={() => {
                setActiveButtonKey('contact-sms');
                // 这里可以添加点击 'Call' 按钮后的逻辑
              }}
            >
              Contact Sms
              <MessageOutlined />

            </Button>,

            <Button
              key="contact-wa"
              type={activeButtonKey === 'contact-wa' ? 'primary' : 'default'}
              onClick={() => {
                setActiveButtonKey('contact-wa');
                // 这里可以添加点击 'Call' 按钮后的逻辑
              }}
            >
              Contact WA
              <WhatsAppOutlined />
            </Button>,

          ]}
        />
      </Spin>

    </PageContainer>
  );
};

export default TableList;

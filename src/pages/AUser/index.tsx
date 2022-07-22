import { DollarOutlined, LockOutlined, SubnodeOutlined } from '@ant-design/icons';
import { TableDropdown } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Rate, Spin, Tag } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { getACUserNews, getChannelsEnum, getReasonsEnum, getUserEnum, index } from './service';
//提降额
import CreditForm from './components/CreditForm';
// 加入黑名单
import BlackForm from './components/BlackForm';
//动态
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { INDEX_ACTION_ENUM } from '../enums';
import DrawerFC from './components/DrawerFC';

const TableList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  /** 授信model */
  const [creditModalVisible, handleCreditModalVisible] = useState<boolean>(false);
  /** 黑名单model */
  const [blackModalVisible, handleBlackModalVisible] = useState<boolean>(false);
  /** drawer是否显示 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  /** 已查询详情的用户id缓存 */
  const [id, setId] = useState<number>(0);
  /** DrawerFC 类型 */
  const [type, setType] = useState<string>('');
  /** 已查询详情的用户id缓存 */
  const [ids, setids] = useState<Set<number>>(new Set());
  /** 已查询详情的用户动态缓存 */
  const [aCUserNews, setACUserNews] = useState<Map<number, API.ACUserNew[]>>(new Map());
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 拉黑原因enum */
  const [reasons, setReasons] = useState<RequestOptionsType[]>([]);

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

  /**
   * 删除State缓存
   * @param _id
   */
  const _remove = async (_id: number) => {
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    if (ids.has(_id)) {
      ids.delete(_id);
      setids(ids);
    }
  };
  /**
   * 查询管理员enum
   */
  const _getUserEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length == 0) {
      const res = await getUserEnum({ foo: 1 });
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
   * 查询拉黑原因enum
   */
  const _getReasonEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (reasons.length == 0) {
      const res = await getReasonsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.c_title,
          value: item.id,
        });
      }
      setReasons(data);
      return data;
    } else {
      return reasons;
    }
  };

  /**
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length == 0) {
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
   * 获取用户动态
   * @param _id
   */
  const _getACUserNews = async (_id: number) => {
    setType('aCUserNews');
    setId(_id);
    if (!aCUserNews.get(_id) || aCUserNews.get(_id)?.length == 0) {
      setLoading(true);
      // @ts-ignore
      const res = await getACUserNews({ a_user_id: _id });
      const tmp = res.data as API.ACUserNew[];
      aCUserNews.set(_id, tmp);
      setACUserNews(aCUserNews);
      setShowDetail(true);
      setLoading(false);
      return tmp;
    } else {
      setShowDetail(true);
      setLoading(false);
      return aCUserNews.get(_id);
    }
  };
  /**
   * action操作
   * @param e
   */
  const _onActionClick = (e: string) => {
    if (e == 'black') {
      handleBlackModalVisible(true);
    } else if (e == 'credit') {
      handleCreditModalVisible(true);
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    //todo 动态draw和复制分离
    {
      title: '电话',
      dataIndex: 'a_phone',
      tooltip: '规则名称是唯一的',
      copyable: true,
    },
    {
      title: '身份证',
      dataIndex: 'd_id_number',
    },
    {
      title: '注册时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      render: (_, record) => {
        return (
          <a
            onClick={async () => {
              await _getACUserNews(record.id!);
              setCurrentRow(record);
            }}
          >
            {moment(record.created_at).format('YY-MM-DD HH:mm')}
          </a>
        );
      },
      search: {
        transform: (value: any) => ({ 'created_at[0]': value[0], 'created_at[1]': value[1] }),
      },
    },
    {
      title: '渠道',
      dataIndex: 'l_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        return record.m_channel_hide == 'n' ? <del>{_}</del> : _;
      },
    },
    //todo 跳转到此用户规则匹配记录
    {
      title: '信用分',
      dataIndex: 'g_credit_fraction',
      fieldProps: { placeholder: '支持区间' },
      render: (_, record) => {
        if (record.q_block_type == 'black') {
          return <Tag color="FF0000">{_}</Tag>;
        } else if (record.q_block_type == 'gray') {
          return <Tag color="#FFCC00">{_}</Tag>;
        } else if (record.q_block_type == 'white') {
          return <Tag color="#87d068">{_}</Tag>;
        } else {
          return _;
        }
      },
    },
    {
      title: '授信额度',
      dataIndex: 'f_credit_amount',
      fieldProps: { placeholder: '支持区间' },
      render: (_, record) => {
        return record.q_block_type == 'black' ? <del>{_}</del> : _;
      },
    },
    {
      title: '客户当前页面',
      dataIndex: 'i_index_action',
      initialValue: [],
      valueType: 'select',
      valueEnum: INDEX_ACTION_ENUM,
    },
    //todo 跳转
    {
      title: '当前订单',
      dataIndex: 'r_current_borrow_id',
    },
    //todo 跳转到此用户所有订单
    {
      title: '逾期/放款',
      dataIndex: 'af_loan_count',
      hideInSearch: true,
      tip: '2笔为一个图标',
      width: 120,
      render: (_, record) => {
        return (
          <div>
            <Rate
              character={<DollarOutlined style={{ fontSize: 12 }} />}
              disabled
              allowHalf={true}
              style={{ color: 'red', margin: 0 }}
              count={record.af_loan_count}
              value={record.ah_overdue_times! / 2}
            />
          </div>
        );
      },
    },
    {
      title: '放款笔数',
      dataIndex: 'af_loan_count',
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
    },
    {
      title: '逾期次数',
      dataIndex: 'ah_overdue_times',
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
    },
    {
      title: '逾期',
      dataIndex: 'ai_repay_max_overdue_days',
      tooltip: '历史最大逾期天数/累计逾期天数',
      hideInSearch: true,
      render(_, record) {
        return record.ai_repay_max_overdue_days || record.an_total_overdue_days
          ? record.ai_repay_max_overdue_days + '/' + record.an_total_overdue_days
          : '-';
      },
    },
    {
      title: '历史最大逾期天数',
      dataIndex: 'ai_repay_max_overdue_days',
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
    },
    {
      title: '累计逾期天数',
      dataIndex: 'an_total_overdue_days',
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
    },
    //todo 跳转到此用户所有费用
    {
      title: '损益',
      dataIndex: 'r_loss',
      fieldProps: { placeholder: '支持区间' },
      render(_, record) {
        let color = 'success';
        if (record.aj_loss) {
          if (record.aj_loss > 0) {
            color = 'green';
          } else if (record.aj_loss < 0) {
            color = 'red';
          } else {
            color = '#303030';
          }
        }
        return <span style={{ color: color }}>{record.aj_loss}</span>;
      },
    },
    {
      title: '电销人员',
      dataIndex: 'z_saler_admin_id',
      valueType: 'select',
      request: _getUserEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id == 1 && item.id == record.z_saler_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: '在催管理员',
      dataIndex: 'ab_collection_admin_id',
      valueType: 'select',
      request: _getUserEnum,
    },
    {
      title: '休眠时间',
      dataIndex: 'al_last_ettled_time',
      fieldProps: { placeholder: '支持区间' },
      render(_, record) {
        const a = moment().diff(moment(record.al_last_ettled_time), 'days');
        if (a >= 0) {
          return a;
        } else {
          return '-';
        }
      },
      request: _getReasonEnum,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const menuItems = [];
        if (record.q_block_type != 'black') {
          menuItems.push({ key: 'black', name: '拉黑', icon: <LockOutlined /> });
          menuItems.push({ key: 'credit', name: '授信', icon: <SubnodeOutlined /> });
        }
        const dropDown =
          menuItems.length > 0 ? (
            <TableDropdown
              key="actionGroup"
              // onSelect={onClick}
              onSelect={(e) => {
                setCurrentRow(record);
                _onActionClick(e);
              }}
              menus={menuItems}
            />
          ) : null;
        return [
          <a
            key="credit_amount"
            onClick={() => {
              // detail(record.id!, 'credit_amount');
              handleCreditModalVisible(true);
              setCurrentRow(record);
            }}
          >
            详情
          </a>,
          dropDown,
        ];
      },
    },
  ];

  return (
    <Spin tip="Loading..." spinning={loading}>
      <PageContainer>
        <ProTable<TableListItem, TableListPagination>
          // headerTitle="客户列表"
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
        <CreditForm
          onSubmit={async (success) => {
            if (success) {
              await _remove(currentRow?.id || 0);
              handleCreditModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleCreditModalVisible(false);
            setCurrentRow(undefined);
          }}
          modalVisible={creditModalVisible}
          values={currentRow || {}}
        />
        <BlackForm
          onSubmit={async (success) => {
            if (success) {
              await _remove(currentRow?.id || 0);
              setCurrentRow(undefined);
              handleBlackModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleBlackModalVisible(false);
            setCurrentRow(undefined);
          }}
          modalVisible={blackModalVisible}
          values={currentRow || {}}
          columns={columns}
          reasonEnum={reasons}
        />
        <DrawerFC
          showDetail={showDetail}
          onClose={() => {
            setCurrentRow(undefined);
            setShowDetail(false);
          }}
          currentRow={currentRow!}
          type={type}
          data={aCUserNews.get(id)!}
          id={id}
        />
      </PageContainer>
    </Spin>
  );
};

export default TableList;

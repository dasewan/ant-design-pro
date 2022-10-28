import DrawerFC from '@/pages/UserManager/AUser/components/DrawerFC';
import { getChannelsEnum } from '@/pages/UserManager/AUser/service';
import { DollarOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Rate } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { getGCMarketingHistories, index } from './service';

const TableList: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<API.AUser>();
  /** DrawerFC 类型 */
  const [type, setType] = useState<string>('');
  /** drawer是否显示 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 批次enum */
  const [batchSns, setBatchSns] = useState<RequestOptionsType[]>([]);
  const actionRef = useRef<ActionType>();

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
    const res = await index({ type: 2, page: params.current, ...params });
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
   * 授信额度drawer
   * @param record
   * @param _type
   */
  const _showDrawer = async (record: API.AUser, _type: string) => {
    setCurrentRow(record);
    setType(_type);
    setShowDetail(true);
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
   * 查询渠道enum
   */
  const _getGCMarketingHistories: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (batchSns.length == 0) {
      const res = await getGCMarketingHistories({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.e_batch_sn,
          value: item.id,
        });
      }
      setBatchSns(data);
      return data;
    } else {
      return batchSns;
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
      title: '渠道',
      dataIndex: 'i_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: '导入序号',
      dataIndex: 'n_admin_file_id',
    },
    {
      title: '录入时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.created_at).format('YY-MM-DD');
      },
      search: {
        transform: (value: any) => ({
          'created_at[0]': value[0],
          'created_at[1]': value[1],
        }),
      },
    },
    {
      title: '注册时间',
      dataIndex: ['a_a_a_a_user', 'created_at'],
      valueType: 'dateRange',
      render: (_, record) => {
        return (
          <a
            onClick={async () => {
              _showDrawer(record.a_a_a_a_user!, 'aCUserNews');
            }}
          >
            {moment(record.a_a_a_a_user!.created_at).format('YY-MM-DD HH:mm')}
          </a>
        );
      },
      search: {
        transform: (value: any) => ({
          'a_a_a_a_user-created_at[0]': value[0],
          'a_a_a_a_user-created_at[1]': value[1],
        }),
      },
    },
    {
      title: '时间间隔',
      dataIndex: 'j_span_days',
      // render: (_, record) => {
      //   return Math.ceil(moment(record.a_a_a_a_user!.created_at).diff(moment(record!.created_at))/(1000*60*69*24))
      // },
      // hideInSearch: true
    },
    {
      title: '批次',
      dataIndex: 'f_marketing_history_id',
      valueType: 'select',
      request: _getGCMarketingHistories,
      params: { timestamp: Math.random() },
    },
    {
      title: '短信次数',
      dataIndex: 'g_sms_times',
    },
    {
      title: '邮件次数',
      dataIndex: 'h_email_times',
    },
    //todo 跳转到此用户规则匹配记录
    {
      title: '信用分',
      dataIndex: ['a_a_a_a_user', 'g_credit_fraction'],
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_a_a_a_user-g_credit_fraction': value }),
      },
    },
    {
      title: '授信额度',
      dataIndex: ['a_a_a_a_user', 'f_credit_amount'],
      fieldProps: { placeholder: '支持区间' },
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              _showDrawer(record.a_a_a_a_user!, 'aBCreditHistory');
            }}
          >
            {record.a_a_a_a_user!.f_credit_amount}
          </a>
        );
      },
      search: {
        transform: (value: any) => ({ 'a_a_a_a_user-f_credit_amount': value }),
      },
    },
    //todo 跳转
    {
      title: '当前订单',
      dataIndex: ['a_a_a_a_user', 'r_current_borrow_id'],
      search: {
        transform: (value: any) => ({ 'a_a_a_a_user-r_current_borrow_id': value }),
      },
    },
    //todo 跳转到此用户所有订单
    {
      title: '逾期/放款',
      dataIndex: ['a_a_a_a_user', 'af_loan_count'],
      hideInSearch: true,
      tip: '2笔为一个图标',
      colSize: 16,
      render: (_, record) => {
        return (
          <div>
            <Rate
              character={<DollarOutlined style={{ fontSize: 12 }} />}
              disabled
              allowHalf={true}
              style={{ color: 'red', margin: 0 }}
              count={record.a_a_a_a_user!.af_loan_count}
              value={record.a_a_a_a_user!.ah_overdue_times! / 2}
            />
          </div>
        );
      },
    },
    {
      title: '放款笔数',
      dataIndex: ['a_a_a_a_user', 'af_loan_count'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_a_a_a_user-af_loan_count': value }),
      },
    },
    {
      title: '逾期次数',
      dataIndex: ['a_a_a_a_user', 'ah_overdue_times'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_a_a_a_user-ah_overdue_times': value }),
      },
    },
    {
      title: '逾期',
      dataIndex: ['a_a_a_a_user', 'ai_repay_max_overdue_days'],
      tooltip: '历史最大逾期天数/累计逾期天数',
      hideInSearch: true,
      render(_, record) {
        return record.a_a_a_a_user!.ai_repay_max_overdue_days ||
          record.a_a_a_a_user!.an_total_overdue_days
          ? record.a_a_a_a_user!.ai_repay_max_overdue_days +
              '/' +
              record.a_a_a_a_user!.an_total_overdue_days
          : '-';
      },
    },
    {
      title: '历史最大逾期天数',
      dataIndex: ['a_a_a_a_user', 'ai_repay_max_overdue_days'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_a_a_a_user-ai_repay_max_overdue_days': value }),
      },
    },
    {
      title: '累计逾期天数',
      dataIndex: ['a_a_a_a_user', 'an_total_overdue_days'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_a_a_a_user-an_total_overdue_days': value }),
      },
    },
    //todo 跳转到此用户所有费用
    {
      title: '损益',
      dataIndex: ['a_a_a_a_user', 'r_loss'],
      fieldProps: { placeholder: '支持区间' },
      render(_, record) {
        let color = 'success';
        if (record.a_a_a_a_user!.aj_loss) {
          if (record.a_a_a_a_user!.aj_loss > 0) {
            color = 'green';
          } else if (record.a_a_a_a_user!.aj_loss < 0) {
            color = 'red';
          } else {
            color = '#303030';
          }
        }
        return <span style={{ color: color }}>{record.a_a_a_a_user!.aj_loss}</span>;
      },
      search: {
        transform: (value: any) => ({ 'a_a_a_a_user-r_loss': value }),
      },
    },
  ];

  return (
    <div>
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
      <DrawerFC
        showDetail={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        aUser={currentRow!}
        type={type}
      />
    </div>
  );
};

export default TableList;

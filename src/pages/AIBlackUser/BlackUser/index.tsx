import DrawerFC from '@/pages/AUser/components/DrawerFC';
import { getACUserNews } from '@/pages/AUser/service';
import { DollarOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, Rate, Spin } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { index } from './service';

const hitEnum = {
  phone: { text: '手机号', status: 'Default' },
  idnumber: { text: '身份证', status: 'Processing' },
  idnumber2: { text: '证件号', status: 'Success' },
  bank: { text: '银行卡号', status: 'Error' },
  imei: { text: 'IMEI', status: 'Error' },
  mac: { text: 'MAC', status: 'Error' },
  device: { text: 'DEVICE', status: 'Error' },
};

const TableList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.AUser>();
  /** DrawerFC 类型 */
  const [type, setType] = useState<string>('');
  /** 已查询详情的用户id缓存 */
  const [id, setId] = useState<number>(0);
  /** 已查询详情的用户动态缓存 */
  const [aCUserNews, setACUserNews] = useState<Map<number, API.ACUserNew[]>>(new Map());
  /** drawer是否显示 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
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

  const columns: ProColumns<TableListItem>[] = [
    //todo 动态draw和复制分离
    {
      title: '电话',
      dataIndex: ['a_user', 'a_phone'],
      tooltip: '规则名称是唯一的',
      copyable: true,
      search: {
        transform: (value: any) => ({ 'a_user-a_phone': value }),
      },
    },
    {
      title: '注册时间',
      dataIndex: ['a_user', 'created_at'],
      valueType: 'dateRange',
      render: (_, record) => {
        return (
          <a
            onClick={async () => {
              await _getACUserNews(record.id!);
              setCurrentRow(record.a_user);
            }}
          >
            {moment(record.a_user!.created_at).format('YY-MM-DD HH:mm')}
          </a>
        );
      },
      search: {
        transform: (value: any) => ({
          'a_user-created_at[0]': value[0],
          'a_user-created_at[1]': value[1],
        }),
      },
    },

    //todo 跳转到此用户规则匹配记录
    {
      title: '信用分',
      dataIndex: ['a_user', 'g_credit_fraction'],
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-g_credit_fraction': value }),
      },
    },
    {
      title: '授信额度',
      dataIndex: ['a_user', 'f_credit_amount'],
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-f_credit_amount': value }),
      },
    },
    //todo 跳转
    {
      title: '当前订单',
      dataIndex: ['a_user', 'r_current_borrow_id'],
      search: {
        transform: (value: any) => ({ 'a_user-r_current_borrow_id': value }),
      },
    },
    //todo 跳转到此用户所有订单
    {
      title: '逾期/放款',
      dataIndex: ['a_user', 'af_loan_count'],
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
              count={record.a_user!.af_loan_count}
              value={record.a_user!.ah_overdue_times! / 2}
            />
          </div>
        );
      },
    },
    {
      title: '放款笔数',
      dataIndex: ['a_user', 'af_loan_count'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-af_loan_count': value }),
      },
    },
    {
      title: '逾期次数',
      dataIndex: ['a_user', 'ah_overdue_times'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-ah_overdue_times': value }),
      },
    },
    {
      title: '逾期',
      dataIndex: ['a_user', 'ai_repay_max_overdue_days'],
      tooltip: '历史最大逾期天数/累计逾期天数',
      hideInSearch: true,
      render(_, record) {
        return record.a_user!.ai_repay_max_overdue_days || record.a_user!.an_total_overdue_days
          ? record.a_user!.ai_repay_max_overdue_days + '/' + record.a_user!.an_total_overdue_days
          : '-';
      },
    },
    {
      title: '历史最大逾期天数',
      dataIndex: ['a_user', 'ai_repay_max_overdue_days'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-ai_repay_max_overdue_days': value }),
      },
    },
    {
      title: '累计逾期天数',
      dataIndex: ['a_user', 'an_total_overdue_days'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-an_total_overdue_days': value }),
      },
    },
    //todo 跳转到此用户所有费用
    {
      title: '损益',
      dataIndex: ['a_user', 'r_loss'],
      fieldProps: { placeholder: '支持区间' },
      render(_, record) {
        let color = 'success';
        if (record.a_user!.aj_loss) {
          if (record.a_user!.aj_loss > 0) {
            color = 'green';
          } else if (record.a_user!.aj_loss < 0) {
            color = 'red';
          } else {
            color = '#303030';
          }
        }
        return <span style={{ color: color }}>{record.a_user!.aj_loss}</span>;
      },
      search: {
        transform: (value: any) => ({ 'a_user-r_loss': value }),
      },
    },
    {
      title: '手机号',
      dataIndex: 'c_phone_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.c_phone_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: '身份证号',
      dataIndex: 'd_idnumber_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.d_idnumber_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: '证件号',
      dataIndex: 'e_idnumber2_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.e_idnumber2_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: '银行卡号',
      dataIndex: 'f_bankcard_no_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.f_bankcard_no_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: 'IMEI',
      dataIndex: 'g_imei_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.g_imei_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: 'MAC',
      dataIndex: 'h_mac_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.h_mac_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: 'DEVICE',
      dataIndex: 'i_device_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.i_device_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: '命中项',
      dataIndex: 'h_mac_hit_id[]',
      hideInTable: true,
      valueType: 'checkbox',
      valueEnum: hitEnum,
    },
  ];

  return (
    <Spin tip="Loading..." spinning={loading}>
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
    </Spin>
  );
};

export default TableList;

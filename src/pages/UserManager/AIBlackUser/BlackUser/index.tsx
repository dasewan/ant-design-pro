import { BLACK_USER_TYPE } from '@/pages/enums';
import { US_BLACK_USER_TYPE } from '@/pages/enumsUs';
import DrawerFC from '@/pages/UserManager/AUser/components/DrawerFC';
import { getAdminV1AIBlackUsers as index } from '@/services/ant-design-pro/AIBlackUser';
import { useIntl } from '@@/exports';
import { DollarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, ConfigProvider, Rate } from 'antd';
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const [currentRow, setCurrentRow] = useState<API.AUser>();
  /** DrawerFC 类型 */
  const [type, setType] = useState<string>('');
  /** drawer是否显示 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const hitEnum = {
    phone: {
      text: intl.formatMessage({
        id: 'pages.userManager.aUser.a_phone',
        defaultMessage: '',
      }),
      status: 'Default',
    },
    idnumber: {
      text: intl.formatMessage({
        id: 'pages.userManager.aUser.d_id_number',
        defaultMessage: '',
      }),
      status: 'Processing',
    },
    bank: {
      text: intl.formatMessage({
        id: 'pages.userManager.aUser.e_bankcard_no',
        defaultMessage: '',
      }),
      status: 'Error',
    },
    device: {
      text: intl.formatMessage({
        id: 'pages.userManager.BlackUser.device',
        defaultMessage: '',
      }),
      status: 'Error',
    },
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
  /**
   * 授信额度drawer
   * @param record
   * @param _type
   */
  const _showDrawer = (record: API.AUser, _type: string) => {
    setCurrentRow(record);
    setType(_type);
    setShowDetail(true);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.userManager.aUser.a_phone', defaultMessage: '' }),
      dataIndex: ['a_user', 'a_phone'],
      copyable: true,
      search: {
        transform: (value: any) => ({ 'a_user-a_phone': value }),
      },
      render: (_, record) => {
        return (
          <a target="_blank" rel="noopener noreferrer" href={`/user/detail/${record.a_user_id}`}>
            {record.a_user!.a_phone}
          </a>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
      dataIndex: ['a_user', 'created_at'],
      valueType: 'dateRange',
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              _showDrawer(record.a_user!, 'aCUserNews');
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
    {
      title: intl.formatMessage({ id: 'pages.userManager.BlackUser.source', defaultMessage: '' }),
      dataIndex: 'h_status',
      initialValue: [],
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? BLACK_USER_TYPE : US_BLACK_USER_TYPE,
    },
    //todo 跳转到此用户规则匹配记录
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.g_credit_fraction',
        defaultMessage: '',
      }),
      dataIndex: ['a_user', 'g_credit_fraction'],
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
      search: {
        transform: (value: any) => ({ 'a_user-g_credit_fraction': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.f_credit_amount',
        defaultMessage: '',
      }),
      dataIndex: ['a_user', 'f_credit_amount'],
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              _showDrawer(record.a_user!, 'aBCreditHistory');
            }}
          >
            {record.a_user!.f_credit_amount}
          </a>
        );
      },
      search: {
        transform: (value: any) => ({ 'a_user-f_credit_amount': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.r_current_borrow_id',
        defaultMessage: '',
      }),
      dataIndex: ['a_user', 'r_current_borrow_id'],
      search: {
        transform: (value: any) => ({ 'a_user-r_current_borrow_id': value }),
      },
      render: (_, record) => {
        if (
          record.a_user!.r_current_borrow_id !== undefined &&
          record.a_user!.r_current_borrow_id > 0
        ) {
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/borrow/detail/${record.a_user!.r_current_borrow_id}`}
            >
              {intl.formatMessage({
                id: 'pages.common.borrow_detail',
                defaultMessage: '',
              })}
            </a>
          );
        } else {
          return null;
        }
      },
    },
    {
      title:
        intl.formatMessage({
          id: 'pages.userManager.aUser.a_h_overdue_times',
          defaultMessage: '',
        }) +
        '/' +
        intl.formatMessage({
          id: 'pages.userManager.aUser.a_f_loan_count',
          defaultMessage: '',
        }),
      dataIndex: ['a_user', 'a_f_loan_count'],
      hideInSearch: true,
      colSize: 16,
      render: (_, record) => {
        return (
          <div>
            <Rate
              character={<DollarOutlined style={{ fontSize: 12 }} />}
              disabled
              style={{ color: 'red', margin: 0 }}
              count={record.a_user!.a_f_loan_count}
              value={record.a_user!.a_h_overdue_times!}
            />
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.a_f_loan_count',
        defaultMessage: '',
      }),
      dataIndex: ['a_user', 'a_f_loan_count'],
      hideInTable: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
      search: {
        transform: (value: any) => ({ 'a_user-af_loan_count': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.a_h_overdue_times',
        defaultMessage: '',
      }),
      dataIndex: ['a_user', 'a_h_overdue_times'],
      hideInTable: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
      search: {
        transform: (value: any) => ({ 'a_user-a_h_overdue_times': value }),
      },
    },
    {
      title:
        intl.formatMessage({
          id: 'pages.userManager.aUser.a_i_repay_max_overdue_days',
          defaultMessage: '',
        }) +
        '/' +
        intl.formatMessage({
          id: 'pages.userManager.aUser.a_n_total_overdue_days',
          defaultMessage: '',
        }),
      dataIndex: ['a_user', 'a_i_repay_max_overdue_days'],
      hideInSearch: true,
      render(_, record) {
        return record.a_user!.a_i_repay_max_overdue_days || record.a_user!.a_n_total_overdue_days
          ? record.a_user!.a_i_repay_max_overdue_days + '/' + record.a_user!.a_n_total_overdue_days
          : '-';
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.a_i_repay_max_overdue_days',
        defaultMessage: '',
      }),
      dataIndex: ['a_user', 'a_i_repay_max_overdue_days'],
      hideInTable: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
      search: {
        transform: (value: any) => ({ 'a_user-a_i_repay_max_overdue_days': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.a_n_total_overdue_days',
        defaultMessage: '',
      }),
      dataIndex: ['a_user', 'a_n_total_overdue_days'],
      hideInTable: true,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
      search: {
        transform: (value: any) => ({ 'a_user-a_n_total_overdue_days': value }),
      },
    },
    //todo 跳转到此用户所有费用
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.a_j_loss',
        defaultMessage: '',
      }),
      dataIndex: ['a_user', 'a_j_loss'],
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
      render(_, record) {
        let color = 'success';
        if (record.a_user!.a_j_loss) {
          if (record.a_user!.a_j_loss > 0) {
            color = 'green';
          } else if (record.a_user!.a_j_loss < 0) {
            color = 'red';
          } else {
            color = '#303030';
          }
        }
        return <span style={{ color: color }}>{record.a_user!.a_j_loss}</span>;
      },
      search: {
        transform: (value: any) => ({ 'a_user-r_loss': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.a_phone',
        defaultMessage: '',
      }),
      dataIndex: 'c_phone_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.c_phone_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.d_id_number',
        defaultMessage: '',
      }),
      dataIndex: 'd_idnumber_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.d_idnumber_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    /*{
      title: '证件号',
      dataIndex: 'e_idnumber2_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.e_idnumber2_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },*/
    {
      title: intl.formatMessage({
        id: 'pages.userManager.aUser.e_bankcard_no',
        defaultMessage: '',
      }),
      dataIndex: 'f_bankcard_no_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.f_bankcard_no_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    /*{
      title: 'IMEI',
      dataIndex: 'g_imei_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.g_imei_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },*/
    /*{
      title: 'MAC',
      dataIndex: 'h_mac_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.h_mac_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },*/
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BlackUser.device',
        defaultMessage: '',
      }),
      dataIndex: 'i_device_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.i_device_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.BlackUser.hit',
        defaultMessage: '',
      }),
      dataIndex: 'h_mac_hit_id[]',
      hideInTable: true,
      valueType: 'checkbox',
      valueEnum: hitEnum,
    },
  ];

  return (
    <PageContainer
      header={{
        ghost: true,
      }}
    >
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
        aUser={currentRow!}
        type={type}
      />
    </PageContainer>
  );
};

export default TableList;

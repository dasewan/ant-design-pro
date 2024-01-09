import { CALLBACK_CODE, LOAN_LOG_STATUS, LOAN_LOG_TYPE, SYNC_CODE } from '@/pages/enums';
import {
  US_CALLBACK_CODE,
  US_LOAN_LOG_STATUS,
  US_LOAN_LOG_TYPE,
  US_SYNC_CODE,
} from '@/pages/enumsUs';
import DetailModel from '@/pages/Loan/LoanLog/components/DetailModel';
import { getAdminV1MCLoanLogs as index } from '@/services/ant-design-pro/MCLoanLog';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import styles from './index.less';

const TableList: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 当前数据 */
  const [newRecord, setNewRecord] = useState<TableListItem>();
  /** 明细model */
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);

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
    // @ts-ignore

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
   * 展示明细model
   * @param record
   */
  const onDetailClick = (record: TableListItem) => {
    setNewRecord(record);
    setDetailModalVisible(true);
  };

  /**
   * 关闭明细model
   */
  const onDetailModelOk = () => {
    setDetailModalVisible(false);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.h_sn', defaultMessage: '' }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'h_sn'],
      copyable: true,
      width: 160,
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-h_sn': value }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.LoanLog.borrow_info', defaultMessage: '' }),
      search: false,
      children: [
        {
          title: intl.formatMessage({
            id: 'pages.Borrow.BorrowDetail.a_k_phone',
            defaultMessage: '',
          }),
          dataIndex: ['a_a_a_a_a_d_borrow', 'a_k_phone'],
          copyable: true,
          width: 140,
          search: {
            transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-a_k_phone': value }),
          },
        },
        {
          title: intl.formatMessage({
            id: 'pages.Borrow.BorrowDetail.m_borrow_amount',
            defaultMessage: '',
          }),
          dataIndex: ['a_a_a_a_a_d_borrow', 'm_borrow_amount'],
          width: 140,
          search: {
            transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-m_borrow_amount': value }),
          },
        },
        {
          title: intl.formatMessage({
            id: 'pages.Borrow.BorrowDetail.p_loan_amount',
            defaultMessage: '',
          }),
          dataIndex: ['a_a_a_a_a_d_borrow', 'p_loan_amount'],
          width: 140,
          search: {
            transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-p_loan_amount': value }),
          },
        },
        {
          title: intl.formatMessage({
            id: 'pages.Borrow.BorrowDetail.l_borrow_count',
            defaultMessage: '',
          }),
          dataIndex: ['a_a_a_a_a_d_borrow', 'l_borrow_count'],
          width: 100,
          search: {
            transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-l_borrow_count': value }),
          },
        },
        {
          title: intl.formatMessage({
            id: 'pages.Borrow.BorrowDetail.created_at',
            defaultMessage: '',
          }),
          dataIndex: 'created_at',
          width: 180,
          render: (_, record) => {
            return moment(record.created_at).format('YYYY-MM-DD HH:mm:ss');
          },
          valueType: 'dateRange',
          search: {
            transform: (value: any) => {
              return {
                'a_a_a_a_a_d_borrow-created_at[0]':
                  value[0].$d !== undefined
                    ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                    : value[0] + ' 00:00:00',
                'a_a_a_a_a_d_borrow-created_at[1]':
                  value[1].$d !== undefined
                    ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                    : value[1] + ' 00:00:00',
              };
            },
          },
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'pages.LoanLog.log_info', defaultMessage: '' }),
      search: false,
      className: styles.blue,
      children: [
        {
          title: intl.formatMessage({ id: 'pages.LoanLog.c_admin_id', defaultMessage: '' }),
          dataIndex: 'c_admin_id',
          valueType: 'select',
          request: _getUsersEnum,
          className: styles.blue,
          params: { timestamp: Math.random() },
          render: (_, record) => {
            //todo 如果管理员状态被禁用，删除线
            return admins.find((item) => {
              return item.role_id === 1 && item.id === record.c_admin_id;
            }) ? (
              <del>{_}</del>
            ) : (
              _
            );
          },
          width: 80,
        },
        {
          title: intl.formatMessage({ id: 'pages.LoanLog.e_payment_channel', defaultMessage: '' }),
          dataIndex: 'e_payment_channel',
          className: styles.blue,
          width: 140,
        },
        {
          title: intl.formatMessage({ id: 'pages.LoanLog.g_type', defaultMessage: '' }),
          dataIndex: 'g_type',
          initialValue: [],
          valueType: 'select',
          valueEnum: currentLanguage === 'zh-cn' ? LOAN_LOG_TYPE : US_LOAN_LOG_TYPE,
          className: styles.blue,
          width: 90,
        },

        {
          title: intl.formatMessage({ id: 'pages.LoanLog.i_receiver_name', defaultMessage: '' }),
          dataIndex: 'i_receiver_name',
          className: styles.blue,
          width: 250,
        },
        {
          title: intl.formatMessage({
            id: 'pages.LoanLog.j_receiver_bankcard_number',
            defaultMessage: '',
          }),
          dataIndex: 'j_receiver_bankcard_number',
          className: styles.blue,
          width: 140,
        },
        {
          title: intl.formatMessage({
            id: 'pages.LoanLog.k_receiver_bankcard_name',
            defaultMessage: '',
          }),
          dataIndex: 'k_receiver_bankcard_name',
          className: styles.blue,
          width: 140,
        },

        {
          title: intl.formatMessage({ id: 'pages.LoanLog.q_outer_sn', defaultMessage: '' }),
          dataIndex: 'q_outer_sn',
          className: styles.blue,
          width: 140,
          copyable: true,
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'pages.LoanLog.a_b_index', defaultMessage: '' }),
      dataIndex: 'a_b_index',
      width: 80,
      fixed: 'right',
    },
    {
      title: intl.formatMessage({ id: 'pages.LoanLog.o_loan_time', defaultMessage: '' }),
      dataIndex: 'o_loan_time',
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.o_loan_time).format('YYYY-MM-DD HH:mm:ss');
      },
      search: {
        transform: (value: any) => ({ 'd_loan_time[0]': value[0], 'd_loan_time[1]': value[1] }),
      },
      fixed: 'right',
      width: 150,
    },
    {
      title: intl.formatMessage({ id: 'pages.LoanLog.r_amount', defaultMessage: '' }),
      dataIndex: 'r_amount',
      width: 100,
      fixed: 'right',
    },
    {
      title: intl.formatMessage({ id: 'pages.LoanLog.t_sync_code', defaultMessage: '' }),
      dataIndex: 't_sync_code',
      initialValue: [],
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? SYNC_CODE : US_SYNC_CODE,
      width: 100,
      fixed: 'right',
    },
    {
      title: intl.formatMessage({ id: 'pages.LoanLog.w_callback_code', defaultMessage: '' }),
      dataIndex: 'w_callback_code',
      initialValue: [],
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? CALLBACK_CODE : US_CALLBACK_CODE,
      width: 140,
      fixed: 'right',
    },
    {
      title: intl.formatMessage({ id: 'pages.LoanLog.h_status', defaultMessage: '' }),
      dataIndex: 'h_status',
      initialValue: [],
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? LOAN_LOG_STATUS : US_LOAN_LOG_STATUS,
      width: 140,
      fixed: 'right',
    },
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'id',
      valueType: 'option',
      width: 90,
      fixed: 'right',
      render: (_, record) => {
        const edit = (
          <a key="overdue" onClick={() => onDetailClick(record)}>
            {intl.formatMessage({ id: 'pages.LoanLog.detail', defaultMessage: '' })}
          </a>
        );

        return [edit];
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        ghost: true,
      }}
    >
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        bordered={true}
        scroll={{ x: '50%' }}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 50,
        }}
      />
      {/*明细model*/}
      <DetailModel
        onOk={onDetailModelOk}
        admins={admins}
        modalVisible={detailModalVisible}
        id={newRecord?.id}
      />
    </PageContainer>
  );
};

export default TableList;

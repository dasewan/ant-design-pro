import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import {
  getAdminV1MBLoans as index,
  putAdminV1MBLoansId as update,
} from '@/services/ant-design-pro/MBLoan';
import { useIntl } from '@@/exports';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { message, Popconfirm } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  /** 风控字段展示 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 当前编辑数据 */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  const [currentRow, setCurrentRow] = useState<TableListItem>();

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
    const res = await index({ page: params.current, f_status: 40, ...params });
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
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length === 0) {
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
   * 放款
   * @param _id
   */
  const _confirmLoan = async (_id: number) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    try {
      // @ts-ignore
      await update({
        id: _id,
        foo: 1,
      });
      if (actionRef.current) {
        actionRef.current.reload();
      }
      hide();
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
      return true;
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      return false;
    }
  };

  /**
   * 展示预览model
   * @param _record
   */
  const onEditClick = async (_record: TableListItem) => {
    setCurrentRow(_record);
    handleCreateModalVisible(true);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.h_sn', defaultMessage: '' }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'h_sn'],
      width:136,
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-h_sn': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.b_channel_id',
        defaultMessage: '',
      }),
      dataIndex: 'b_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.a_k_phone', defaultMessage: '' }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'a_k_phone'],
      copyable: true,
      width:120,
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
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-l_borrow_count': value }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Loan.g_receiver_name', defaultMessage: '' }),
      dataIndex: 'g_receiver_name',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Loan.h_receiver_bankcard_number',
        defaultMessage: '',
      }),
      dataIndex: 'h_receiver_bankcard_number',
    },
    {
      title: intl.formatMessage({ id: 'pages.Loan.l_call_times', defaultMessage: '' }),
      dataIndex: 'l_call_times',
    },
    {
      title: intl.formatMessage({ id: 'pages.Loan.c_payment_channel', defaultMessage: '' }),
      dataIndex: 'c_payment_channel',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.created_at', defaultMessage: '' }),
      dataIndex: 'a_a_a_a_a_d_borrow.created_at',
      width:130,
      render: (_, record) => {
        return moment(record.created_at).format('YYYY-MM-DD HH:mm');
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
    {
      title: intl.formatMessage({ id: 'pages.Loan.d_loan_time', defaultMessage: '' }),
      dataIndex: 'd_loan_time',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.d_loan_time).format('MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => {
          return {
            'd_loan_time[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'd_loan_time[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Loan.updated_at1', defaultMessage: '' }),
      dataIndex: 'updated_at',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.d_loan_time).format('MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => {
          return {
            'updated_at[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'updated_at[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Loan.n_last_message', defaultMessage: '' }),
      dataIndex: 'n_last_message',
      ellipsis: true,
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => {
        const transfer = (
          <Popconfirm
            title={
              <>
                Are you sure to transfer
                <b style={{ color: 'red' }}>{record.a_a_a_a_a_d_borrow!.a_k_phone}</b>
                the total money{' '}
                <b style={{ color: 'red' }}>{record.a_a_a_a_a_d_borrow!.p_loan_amount}</b>
              </>
            }
            key={record.id}
            onConfirm={() => _confirmLoan(record.a_a_a_a_a_d_borrow!.id!)}
            okText="Yes"
            cancelText="No"
          >
            <a href="@/pages/UserManager/BAWhite/index#">reTransfer</a>
          </Popconfirm>
        );
        const bankTransfer = (
          <a key="edit" onClick={() => onEditClick(record)}>
            换卡放款
          </a>
        );
        return [transfer, bankTransfer];
      },
    },
  ];

  // @ts-ignore
  return (
    <>
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
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
      {/*表单model*/}
      <CreateForm
        onSubmit={async (success) => {
          if (success) {
            handleCreateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCreateModalVisible(false);
          setCurrentRow(undefined);
        }}
        row={currentRow!}
        modalVisible={createModalVisible}
      />
    </>
  );
};

export default TableList;

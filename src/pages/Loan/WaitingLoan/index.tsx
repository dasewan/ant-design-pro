import { BORROW_SUB_STATUS_ENUM } from '@/pages/enums';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1DBorrowsWaitingLoan as index } from '@/services/ant-design-pro/DBorrow';
import { putAdminV1MBLoansId as update } from '@/services/ant-design-pro/MBLoan';
import { useIntl } from '@@/exports';
import { QuestionOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { message, Popconfirm, Space, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  const [checkBoxDisable, setCheckBoxDisable] = useState<boolean>(true);

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
    if (params['created_at[0]'] !== undefined) {
      setCheckBoxDisable(false);
    } else {
      setCheckBoxDisable(true);
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

  const _confirmBatchLoan = async (_ids: string) => {
    console.log(_ids);
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    try {
      // @ts-ignore
      await update({
        id: 1,
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.h_sn', defaultMessage: '' }),
      dataIndex: 'h_sn',
      render: (_, record) => {
        return (
          <a key="edit" target="_blank" rel="noreferrer" href={`/borrow/detail/${record.id}`}>
            {record.h_sn}
          </a>
        );
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
      dataIndex: 'a_k_phone',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.a_l_name1', defaultMessage: '' }),
      dataIndex: 'a_l_name1',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.l_borrow_count',
        defaultMessage: '',
      }),
      dataIndex: 'l_borrow_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.m_borrow_amount',
        defaultMessage: '',
      }),
      dataIndex: 'm_borrow_amount',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.p_loan_amount',
        defaultMessage: '',
      }),
      dataIndex: 'p_loan_amount',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.k_sub_status',
        defaultMessage: '',
      }),
      dataIndex: 'k_sub_status',
      valueEnum: BORROW_SUB_STATUS_ENUM,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      render: (_, record) => {
        return moment(record.created_at).format('YYYY-MM-DD HH:mm:ss');
      },
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'created_at[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'created_at[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const transfer = (
          <Popconfirm
            title={
              <>
                {intl.formatMessage({ id: 'pages.Loan.option.transfer_tip1', defaultMessage: '' })}
                <b style={{ color: 'red' }}>{record.a_k_phone}</b>
                {intl.formatMessage({ id: 'pages.Loan.option.transfer_tip2', defaultMessage: '' })}
                <b style={{ color: 'red' }}>{record.p_loan_amount}</b>
              </>
            }
            key={record.id}
            onConfirm={() => _confirmLoan(record.id!)}
            okText="Yes"
            cancelText="No"
          >
            <a>{intl.formatMessage({ id: 'pages.Loan.option.transfer', defaultMessage: '' })}</a>
          </Popconfirm>
        );
        return [transfer];
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '待放款订单',
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
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 50,
        }}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
          getCheckboxProps: () => ({
            disabled: checkBoxDisable,
          }),
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>

            <span>{`总放款金额: ${selectedRows.reduce(
              (pre, item) => pre + item.p_loan_amount!,
              0,
            )} 元`}</span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <Space size={16}>
              <Popconfirm
                title={
                  <>
                    Are you sure to transfer<b style={{ color: 'red' }}>{selectedRows.length}</b>{' '}
                    the total money{' '}
                    <b style={{ color: 'red' }}>
                      {selectedRows.reduce((pre, item) => pre + item.p_loan_amount!, 0)}
                    </b>
                  </>
                }
                onConfirm={() =>
                  _confirmBatchLoan(selectedRows.map((item: TableListItem) => item.id).join(','))
                }
                okText="Yes"
                cancelText="No"
              >
                <a href="@/pages/UserManager/BAWhite/index#">批量放款</a>
              </Popconfirm>
            </Space>
          );
        }}
        headerTitle={
          <Tooltip placement="right" title={<>选择进件日期后可以批量操作</>}>
            批量操作
            <QuestionOutlined />
          </Tooltip>
        }
      />
    </PageContainer>
  );
};

export default TableList;

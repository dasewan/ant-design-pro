import { update } from '@/pages/Loan/WaitingLoan/service';
import { getChannelsEnum } from '@/pages/UserManager/AUser/service';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { message, Popconfirm } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels, index } from './service';

const TableList: React.FC = () => {
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
   * 放款
   * @param _id
   */
  const _confirmLoan = async (_id: number) => {
    const hide = message.loading('正在配置');
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
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
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
   * 展示预览model
   * @param _record
   */
  const onEditClick = async (_record: TableListItem) => {
    setCurrentRow(_record);
    handleCreateModalVisible(true);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_a_a_a_a_d_borrow.h_sn,
      dataIndex: ['a_a_a_a_a_d_borrow', 'h_sn'],
      copyable: true,
      width: 160,
      fixed: 'left',
    },
    {
      title: FieldLabels.a_a_a_a_a_d_borrow.b_channel_id,
      dataIndex: ['a_a_a_a_a_d_borrow', 'b_channel_id'],
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
      width: 140,
    },
    {
      title: FieldLabels.a_a_a_a_a_d_borrow.a_l_name1,
      dataIndex: ['a_a_a_a_a_d_borrow', 'a_l_name1'],
      width: 140,
    },
    {
      title: FieldLabels.a_a_a_a_a_d_borrow.a_k_phone,
      dataIndex: ['a_a_a_a_a_d_borrow', 'a_k_phone'],
      copyable: true,
      width: 140,
    },
    {
      title: FieldLabels.a_a_a_a_a_d_borrow.created_at,
      dataIndex: ['a_a_a_a_a_d_borrow', 'created_at'],
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.a_a_a_a_a_d_borrow!.created_at).format('YYYY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({
          'a_a_a_a_a_d_borrow-created_at[0]': value[0],
          'a_a_a_a_a_d_borrow-created_at[1]': value[1],
        }),
      },
      width: 140,
    },
    {
      title: FieldLabels.a_a_a_a_a_d_borrow.l_borrow_count,
      dataIndex: ['a_a_a_a_a_d_borrow', 'l_borrow_count'],
      width: 80,
    },
    {
      title: FieldLabels.a_a_a_a_a_d_borrow.m_borrow_amount,
      dataIndex: ['a_a_a_a_a_d_borrow', 'm_borrow_amount'],
      width: 80,
    },
    {
      title: FieldLabels.g_receiver_name,
      dataIndex: FieldIndex.g_receiver_name,
      width: 120,
    },
    {
      title: FieldLabels.h_receiver_bankcard_number,
      dataIndex: FieldIndex.h_receiver_bankcard_number,
      width: 100,
    },

    {
      title: FieldLabels.c_payment_channel,
      dataIndex: FieldIndex.c_payment_channel,
      width: 80,
    },
    {
      title: FieldLabels.a_a_a_a_a_d_borrow.p_loan_amount,
      dataIndex: ['a_a_a_a_a_d_borrow', 'p_loan_amount'],
      fixed: 'right',
      width: 90,
    },
    {
      title: FieldLabels.l_call_times,
      dataIndex: FieldIndex.l_call_times,
      width: 80,
      fixed: 'right',
    },
    {
      title: FieldLabels.d_loan_time,
      dataIndex: FieldIndex.d_loan_time,
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.d_loan_time).format('YYYY-MM-DD HH:mm:ss');
      },
      search: {
        transform: (value: any) => ({ 'd_loan_time[0]': value[0], 'd_loan_time[1]': value[1] }),
      },
      fixed: 'right',
      width: 150,
    },
    {
      title: FieldLabels.n_error_message,
      dataIndex: FieldIndex.n_error_message,
      ellipsis: true,
      fixed: 'right',
      width: 120,
    },
    {
      title: '操作',
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

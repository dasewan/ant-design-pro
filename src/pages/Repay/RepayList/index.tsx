import { BORROW_STATUS_ENUM, COMMON_STATUS } from '@/pages/enums';
import DetailModel from '@/pages/Repay/RepayList/components/DetailModel';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1OARepays as index } from '@/services/ant-design-pro/OARepay';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Space, Tag } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import styles from './index.less';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 管理员enum */
  /** 当前编辑数据 */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
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
      title: FieldLabels.a_a_a_a_a_d_borrow.h_sn,
      dataIndex: ['a_a_a_a_a_d_borrow', 'h_sn'],
      copyable: true,
      width: 160,
      fixed: 'left',
    },
    {
      title: '订单信息',
      search: false,
      children: [
        {
          title: FieldLabels.a_a_a_a_a_d_borrow.b_channel_id,
          dataIndex: ['a_a_a_a_a_d_borrow', 'b_channel_id'],
          valueType: 'select',
          request: _getChannelsEnum,
          params: { timestamp: Math.random() },
          width: 140,
        },
        {
          title: FieldLabels.a_a_a_a_a_d_borrow.a_k_phone,
          dataIndex: ['a_a_a_a_a_d_borrow', 'a_k_phone'],
          copyable: true,
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
          title: FieldLabels.a_a_a_a_a_d_borrow.j_status,
          dataIndex: ['a_a_a_a_a_d_borrow', 'j_status'],
          width: 80,
          render: (_, record) => {
            return (
              <Space size={0}>
                <Tag color={BORROW_STATUS_ENUM[record.a_a_a_a_a_d_borrow!.j_status!].color}>
                  {BORROW_STATUS_ENUM[record.a_a_a_a_a_d_borrow!.j_status!].text}
                </Tag>
              </Space>
            );
          },
        },
      ],
    },
    {
      title: '还款信息',
      search: false,
      className: styles.blue,
      children: [
        {
          title: FieldLabels.c_period_count,
          dataIndex: FieldIndex.c_period_count,
          className: styles.blue,
          width: 60,
          render: (_, record) => {
            if (record.d_completed_period_count === record.c_period_count) {
              return (
                <b style={{ color: 'green' }}>
                  {record.d_completed_period_count + '/' + record.c_period_count}
                </b>
              );
            } else {
              return (
                <b style={{ color: 'blue' }}>
                  {record.d_completed_period_count + '/' + record.c_period_count}
                </b>
              );
            }
          },
        },
        {
          title: FieldLabels.f_expect_repay_time,
          valueType: 'dateRange',
          className: styles.blue,
          width: 90,
          render: (_, value) => {
            return moment(value.f_expect_repay_time).format('YYYY-MM-DD');
          },
        },
        {
          title: FieldLabels.g_expect_borrow_amount,
          dataIndex: FieldIndex.g_expect_borrow_amount,
          className: styles.blue,
          width: 90,
          render: (_, record) => {
            // @ts-ignore
            return (
              record.g_expect_borrow_amount +
              record.h_expect_interest +
              record.i_expect_service_fee +
              record.j_expect_violate_fee +
              record.k_expect_overdue_fee
            );
          },
        },
        {
          title: FieldLabels.n_paid_amount,
          dataIndex: FieldIndex.n_paid_amount,
          className: styles.blue,
          width: 90,
        },
        {
          title: FieldLabels.l_overdue_days,
          dataIndex: FieldIndex.l_overdue_days,
          className: styles.blue,
        },
        {
          title: FieldLabels.m_history_overdue_days,
          dataIndex: FieldIndex.m_history_overdue_days,
          className: styles.blue,
        },
        {
          title: FieldLabels.t_deduction_times,
          dataIndex: FieldIndex.t_deduction_times,
          className: styles.blue,
        },
        {
          title: FieldLabels.a_a_write_off_amount,
          dataIndex: FieldIndex.a_a_write_off_amount,
          className: styles.blue,
        },
        {
          title: FieldLabels.a_b_extend_times,
          dataIndex: FieldIndex.a_b_extend_times,
          className: styles.blue,
        },
        {
          title: FieldLabels.a_h_part_times,
          dataIndex: FieldIndex.a_h_part_times,
          className: styles.blue,
        },
        {
          title: FieldLabels.a_i_view_times,
          dataIndex: FieldIndex.a_i_view_times,
          className: styles.blue,
        },
        {
          title: FieldLabels.a_j_withhold_times,
          dataIndex: FieldIndex.a_j_withhold_times,
          className: styles.blue,
        },
        {
          title: FieldLabels.a_k_success_withhold_times,
          dataIndex: FieldIndex.a_k_success_withhold_times,
          className: styles.blue,
        },
      ],
    },
    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record) => {
        const edit = (
          <a key="overdue" onClick={() => onDetailClick(record)}>
            明细
          </a>
        );

        return [edit];
      },
    },
  ];

  const expendColumns: ProColumns<API.QBPeriod>[] = [
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.d_index,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.d_index,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.e_status,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.e_status,
      valueType: 'select',
      valueEnum: COMMON_STATUS,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_p_expect_repay_time,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_p_expect_repay_time,
      render: (_, value) => {
        return moment(value.a_p_expect_repay_time).format('YYYY-MM-DD');
      },
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.f_expect_repay_total_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.f_expect_repay_total_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.n_paid_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.n_paid_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.l_overdue_days,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.l_overdue_days,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.m_history_overdue_days,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.m_history_overdue_days,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.t_deduction_times,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.t_deduction_times,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.u_deduction_total_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.u_deduction_total_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_a_write_off_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_a_write_off_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_b_extend_times,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_b_extend_times,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_c_extend_total_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_c_extend_total_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_d_extend_total_days,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_d_extend_total_days,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_h_part_times,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_h_part_times,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_i_view_times,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_i_view_times,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_j_withhold_times,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_j_withhold_times,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_k_success_withhold_times,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_k_success_withhold_times,
    },
  ];

  const expandedRowRender = (record: TableListItem) => {
    // @ts-ignore
    const dataSourse: API.QBPeriod[] = record.a_a_a_a_a_q_b_periods!;
    return (
      <ProTable<API.QBPeriod, TableListPagination>
        columns={expendColumns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={dataSourse}
        pagination={false}
        rowKey="id"
      />
    );
  };

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '还款列表',
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
        size="small"
        // @ts-ignore
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.c_period_count! > 1,
        }}
      />
      {/*明细model*/}
      <DetailModel
        onOk={onDetailModelOk}
        channels={channels}
        modalVisible={detailModalVisible}
        record={newRecord!}
      />
    </PageContainer>
  );
};

export default TableList;

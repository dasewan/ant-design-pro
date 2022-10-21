import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem2, TableListPagination } from '../data';
import { fieldLabels, getUserEnum, index2 } from '../service';

import {
  AMOUNT_TYPE,
  COMMON_STATUS_ALLOW,
  COMMON_STATUS_DISPLAY,
  PRODUCT_SETTLEMENT_TYPE,
  PRODUCT_TYPE,
} from '@/pages/Operation/BProduct/enums';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';

export type Props = {
  onOk: () => void;
  modalVisible: boolean;
  productId?: number;
};

const Snapshot: React.FC<Props> = (props) => {
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
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
    const res = await index2({
      foo: 0,
      // @ts-ignore
      a_product_id: props.productId,
      limit: 100,
      page: params.current,
      ...params,
    });
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

  const columns: ProColumns<TableListItem2>[] = [
    {
      title: fieldLabels.b_name,
      dataIndex: 'b_name',
      fixed: 'left',
      width: 160,
      render: (_, record) => {
        return record.a_a_a_a_b_b_product_snapshot_copy?.b_name == 1 ? (
          <span style={{ color: 'red' }}>{record.b_name}</span>
        ) : (
          record.b_name
        );
      },
    },
    {
      title: '基本信息',
      search: false,
      children: [
        {
          title: fieldLabels.o_type,
          dataIndex: 'o_type',
          width: 100,
          initialValue: [],
          valueType: 'select',
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.o_type == 1 ? (
              <span style={{ color: 'red' }}>{PRODUCT_TYPE[record.o_type!].text}</span>
            ) : (
              PRODUCT_TYPE[record.o_type!].text
            );
          },
        },
        {
          title: fieldLabels.a_a_amount_type,
          dataIndex: 'a_a_amount_type',
          initialValue: [],
          width: 120,
          valueType: 'select',
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.a_a_amount_type == 1 ? (
              <span style={{ color: 'red' }}>{AMOUNT_TYPE[record.a_a_amount_type!].text}</span>
            ) : (
              AMOUNT_TYPE[record.a_a_amount_type!].text
            );
          },
        },
        {
          title: fieldLabels.a_b_day_valid_count,
          dataIndex: 'a_b_day_valid_count',
          width: 120,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.a_b_day_valid_count == 1 ? (
              <span style={{ color: 'red' }}>{record.a_b_day_valid_count}</span>
            ) : (
              record.a_b_day_valid_count
            );
          },
        },
        {
          title: fieldLabels.m_can_part_pay,
          dataIndex: 'm_can_part_pay',
          initialValue: [],
          valueType: 'select',
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.m_can_part_pay == 1 ? (
              <span style={{ color: 'red' }}>
                {COMMON_STATUS_ALLOW[record.m_can_part_pay!].text}
              </span>
            ) : (
              COMMON_STATUS_ALLOW[record.m_can_part_pay!].text
            );
          },
          width: 130,
        },
        {
          title: fieldLabels.n_can_extend,
          dataIndex: 'n_can_extend',
          initialValue: [],
          valueType: 'select',
          valueEnum: COMMON_STATUS_ALLOW,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.n_can_extend == 1 ? (
              <span style={{ color: 'red' }}>{COMMON_STATUS_ALLOW[record.n_can_extend!].text}</span>
            ) : (
              COMMON_STATUS_ALLOW[record.n_can_extend!].text
            );
          },
          width: 120,
        },
        {
          title: fieldLabels.u_status,
          dataIndex: 'u_status',
          initialValue: [],
          valueType: 'select',
          valueEnum: COMMON_STATUS_DISPLAY,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.n_can_extend == 1 ? (
              <span style={{ color: 'red' }}>{COMMON_STATUS_DISPLAY[record.u_status!].text}</span>
            ) : (
              COMMON_STATUS_DISPLAY[record.u_status!].text
            );
          },
          width: 100,
        },
      ],
    },
    {
      title: '金额计算',
      search: false,
      children: [
        {
          title: fieldLabels.f_settlement_type,
          dataIndex: 'f_settlement_type',
          initialValue: [],
          valueType: 'select',
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.f_settlement_type == 1 ? (
              <span style={{ color: 'red' }}>
                {PRODUCT_SETTLEMENT_TYPE[record.f_settlement_type!].text}
              </span>
            ) : (
              PRODUCT_SETTLEMENT_TYPE[record.f_settlement_type!].text
            );
          },
          width: 120,
        },
        {
          title: fieldLabels.c_amount,
          dataIndex: 'c_amount',
          width: 100,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.c_amount == 1 ? (
              <span style={{ color: 'red' }}>{record.c_amount}</span>
            ) : (
              record.c_amount
            );
          },
        },
        {
          title: fieldLabels.z_period,
          dataIndex: 'z_period',
          width: 100,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.z_period == 1 ? (
              <span style={{ color: 'red' }}>{record.z_period}</span>
            ) : (
              record.z_period
            );
          },
        },
        {
          title: fieldLabels.e_life,
          dataIndex: 'e_life',
          width: 100,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.e_life == 1 ? (
              <span style={{ color: 'red' }}>{record.e_life}</span>
            ) : (
              record.e_life
            );
          },
        },
        {
          title: fieldLabels.g_interest,
          dataIndex: 'g_interest',
          width: 100,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.g_interest == 1 ? (
              <span style={{ color: 'red' }}>{record.g_interest}</span>
            ) : (
              record.g_interest
            );
          },
        },
        {
          title: fieldLabels.h_service_fee_rate,
          dataIndex: 'h_service_fee_rate',
          width: 100,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.h_service_fee_rate == 1 ? (
              <span style={{ color: 'red' }}>{record.h_service_fee_rate}</span>
            ) : (
              record.h_service_fee_rate
            );
          },
        },
        {
          title: fieldLabels.i_overdue_rate,
          dataIndex: 'i_overdue_rate',
          width: 100,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.i_overdue_rate == 1 ? (
              <span style={{ color: 'red' }}>{record.i_overdue_rate}</span>
            ) : (
              record.i_overdue_rate
            );
          },
        },
        {
          title: fieldLabels.i_overdue_rate,
          dataIndex: 'i_overdue_rate',
          width: 100,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.i_overdue_rate == 1 ? (
              <span style={{ color: 'red' }}>{record.i_overdue_rate}</span>
            ) : (
              record.i_overdue_rate
            );
          },
        },
        {
          title: fieldLabels.k_extend_rate,
          dataIndex: 'k_extend_rate',
          width: 100,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.k_extend_rate == 1 ? (
              <span style={{ color: 'red' }}>{record.k_extend_rate}</span>
            ) : (
              record.k_extend_rate
            );
          },
        },
        {
          title: fieldLabels.l_min_pay,
          dataIndex: 'l_min_pay',
          width: 120,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.l_min_pay == 1 ? (
              <span style={{ color: 'red' }}>{record.l_min_pay}</span>
            ) : (
              record.l_min_pay
            );
          },
        },
      ],
    },
    {
      title: '可借条件',
      search: false,
      children: [
        {
          title: fieldLabels.q_unlock_credit_fraction,
          dataIndex: 'q_unlock_credit_fraction',
          width: 100,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.q_unlock_credit_fraction == 1 ? (
              <span style={{ color: 'red' }}>{record.q_unlock_credit_fraction}</span>
            ) : (
              record.q_unlock_credit_fraction
            );
          },
        },
        {
          title: fieldLabels.r_settled_times,
          dataIndex: 'r_settled_times',
          width: 120,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.r_settled_times == 1 ? (
              <span style={{ color: 'red' }}>{record.r_settled_times}</span>
            ) : (
              record.r_settled_times
            );
          },
        },
        {
          title: fieldLabels.s_max_overdue_days,
          dataIndex: 's_max_overdue_days',
          width: 120,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.s_max_overdue_days == 1 ? (
              <span style={{ color: 'red' }}>{record.s_max_overdue_days}</span>
            ) : (
              record.s_max_overdue_days
            );
          },
        },
        {
          title: fieldLabels.t_max_overdue_times,
          dataIndex: 't_max_overdue_times',
          width: 120,
          render: (_, record) => {
            return record.a_a_a_a_b_b_product_snapshot_copy?.t_max_overdue_times == 1 ? (
              <span style={{ color: 'red' }}>{record.t_max_overdue_times}</span>
            ) : (
              record.t_max_overdue_times
            );
          },
        },
      ],
    },
    {
      title: '管理员',
      dataIndex: 'a_c_admin_id',
      valueType: 'select',
      request: _getUserEnum,
      width: 120,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id == 1 && item.id == record.a_c_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: '操作时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (_, value) => {
        return moment(value.created_at).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  return (
    <Modal
      title="快照"
      visible={props.modalVisible}
      onOk={props.onOk}
      onCancel={props.onOk}
      width="90%"
      destroyOnClose={true}
      footer={[
        <Button key="submit" type="default" onClick={props.onOk}>
          关闭
        </Button>,
      ]}
    >
      <ProTable<TableListItem2, TableListPagination>
        // headerTitle="客户列表"
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 100,
        }}
        scroll={{ x: '50%' }}
        bordered={true}
      />
    </Modal>
  );
};

export default Snapshot;

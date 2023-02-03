import { COMMON_STATUS } from '@/pages/enums';
import { PRODUCT_SETTLEMENT_TYPE } from '@/pages/Operation/BProduct/enums';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Descriptions, Divider, Modal, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import type { TableListItem, TableListPagination } from '../data';
import { FieldIndex, FieldLabels } from '../service';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onOk: () => void;
  modalVisible: boolean;
  record: TableListItem;
  channels: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const DetailModel: React.FC<FormProps> = (props) => {
  const column: ProColumns<API.QBPeriod>[] = [
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.d_index,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.d_index,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.e_status,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.e_status,
      valueType: 'select',
      valueEnum: COMMON_STATUS,
      width: 100,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_p_expect_repay_time,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_p_expect_repay_time,
      render: (_, value) => {
        return moment(value.a_p_expect_repay_time).format('YYYY-MM-DD');
      },
      width: 120,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.f_expect_repay_total_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.f_expect_repay_total_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.g_expect_borrow_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.g_expect_borrow_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.h_expect_interest,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.h_expect_interest,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.i_expect_service_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.i_expect_service_fee,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.j_expect_violate_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.j_expect_violate_fee,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.k_expect_overdue_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.k_expect_overdue_fee,
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
      title: FieldLabels.a_a_a_a_a_q_b_periods.n_paid_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.n_paid_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.o_paid_borrow_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.o_paid_borrow_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.p_paid_interest,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.p_paid_interest,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.q_paid_service_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.q_paid_service_fee,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.r_paid_violate_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.r_paid_violate_fee,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.s_paid_overdue_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.s_paid_overdue_fee,
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
      title: FieldLabels.a_a_a_a_a_q_b_periods.v_deduction_total_borrow_amount,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.v_deduction_total_borrow_amount,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.w_deduction_total_interest,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.w_deduction_total_interest,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.x_deduction_total_service_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.x_deduction_total_service_fee,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.y_deduction_total_violate_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.y_deduction_total_violate_fee,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.z_deduction_total_overdue_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.z_deduction_total_overdue_fee,
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
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_e_extend_total_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_e_extend_total_fee,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_f_extend_total_violate_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_f_extend_total_violate_fee,
    },
    {
      title: FieldLabels.a_a_a_a_a_q_b_periods.a_g_extend_total_overdue_fee,
      dataIndex: FieldIndex.a_a_a_a_a_q_b_periods.a_g_extend_total_overdue_fee,
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

  return (
    <Modal
      title="还款明细"
      visible={props.modalVisible}
      onOk={props.onOk}
      onCancel={props.onOk}
      width="90%"
      style={{ top: 20 }}
      destroyOnClose={true}
      footer={[
        <Button key="submit" type="primary" onClick={props.onOk}>
          知道了
        </Button>,
      ]}
    >
      <Divider orientation="left">订单信息</Divider>
      <Descriptions column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} bordered>
        <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.h_sn}>
          {props.record?.a_a_a_a_a_d_borrow?.h_sn}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.l_borrow_count}>
          {props.record?.a_a_a_a_a_d_borrow?.l_borrow_count}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.b_channel_id}>
          {
            props.channels.find(
              (item) => item.value == props.record?.a_a_a_a_a_d_borrow?.b_channel_id,
            )?.label
          }
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.a_k_phone}>
          {props.record?.a_a_a_a_a_d_borrow?.a_k_phone}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.a_l_name1}>
          {props.record?.a_a_a_a_a_d_borrow?.a_l_name1}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.created_at}>
          {moment(props.record?.a_a_a_a_a_d_borrow!.created_at).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.j_status}>
          {props.record?.a_a_a_a_a_d_borrow?.j_status}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.k_sub_status}>
          {props.record?.a_a_a_a_a_d_borrow?.k_sub_status}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">还款信息</Divider>
      <Descriptions column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} bordered>
        <Descriptions.Item label={FieldLabels.a_m_product_settlement_type}>
          <Tag
            color={
              props.record?.a_m_product_settlement_type
                ? PRODUCT_SETTLEMENT_TYPE[props.record!.a_m_product_settlement_type!].color
                : 'blue'
            }
          >
            {props.record?.a_m_product_settlement_type
              ? PRODUCT_SETTLEMENT_TYPE[props.record!.a_m_product_settlement_type!].text
              : ''}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.c_period_count}>
          {props.record?.c_period_count}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.d_completed_period_count}>
          {props.record?.d_completed_period_count}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_p_overdue_period_count}>
          {props.record?.a_p_overdue_period_count}
        </Descriptions.Item>

        <Descriptions.Item label={FieldLabels.f_expect_repay_time}>
          {moment(props.record?.f_expect_repay_time).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.l_overdue_days}>
          <b
            style={{
              color:
                props.record?.l_overdue_days && props.record.l_overdue_days > 0 ? 'red' : 'green',
            }}
          >
            {props.record?.l_overdue_days}
          </b>
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.m_history_overdue_days}>
          {props.record?.m_history_overdue_days}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_n_calculate_time}>
          {moment(props.record?.a_n_calculate_time).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_i_view_times}>
          {props.record?.a_i_view_times}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.a_h_part_times}>
          {props.record?.a_h_part_times}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.t_deduction_times}>
          {props.record?.t_deduction_times}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.n_paid_amount}>
          {props.record?.n_paid_amount}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.g_expect_borrow_amount}>
          {props.record?.g_expect_borrow_amount + '-' + props.record?.o_paid_borrow_amount + ': '}
          {props.record?.g_expect_borrow_amount && props.record!.g_expect_borrow_amount > 0 ? (
            <b
              style={{
                color:
                  props.record!.g_expect_borrow_amount - props.record!.o_paid_borrow_amount == 0
                    ? 'green'
                    : 'red',
              }}
            >
              {props.record!.g_expect_borrow_amount - props.record!.o_paid_borrow_amount!}
            </b>
          ) : (
            ''
          )}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.h_expect_interest}>
          {props.record?.h_expect_interest && props.record!.h_expect_interest > 0
            ? props.record?.h_expect_interest + '-' + props.record?.p_paid_interest + ': '
            : ''}
          {props.record?.h_expect_interest && props.record!.h_expect_interest > 0 ? (
            <b
              style={{
                color:
                  props.record!.h_expect_interest - props.record!.p_paid_interest == 0
                    ? 'green'
                    : 'red',
              }}
            >
              {props.record!.h_expect_interest - props.record!.p_paid_interest!}
            </b>
          ) : (
            ''
          )}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.i_expect_service_fee}>
          {props.record?.i_expect_service_fee && props.record!.i_expect_service_fee > 0
            ? props.record?.i_expect_service_fee + '-' + props.record?.q_paid_service_fee + ': '
            : ''}
          {props.record?.h_expect_interest && props.record!.h_expect_interest > 0 ? (
            <b
              style={{
                color:
                  props.record!.i_expect_service_fee - props.record!.q_paid_service_fee == 0
                    ? 'green'
                    : 'red',
              }}
            >
              {props.record!.i_expect_service_fee - props.record!.q_paid_service_fee!}
            </b>
          ) : (
            ''
          )}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.j_expect_violate_fee}>
          {props.record?.j_expect_violate_fee && props.record!.j_expect_violate_fee > 0
            ? props.record?.j_expect_violate_fee + '-' + props.record?.r_paid_violate_fee + ': '
            : ''}
          {props.record?.j_expect_violate_fee && props.record!.j_expect_violate_fee > 0 ? (
            <b
              style={{
                color:
                  props.record!.j_expect_violate_fee - props.record!.r_paid_violate_fee == 0
                    ? 'green'
                    : 'red',
              }}
            >
              {props.record!.j_expect_violate_fee - props.record!.r_paid_violate_fee!}
            </b>
          ) : (
            ''
          )}
        </Descriptions.Item>
        <Descriptions.Item label={FieldLabels.k_expect_overdue_fee}>
          {props.record?.k_expect_overdue_fee && props.record!.k_expect_overdue_fee > 0
            ? props.record?.k_expect_overdue_fee + '-' + props.record?.s_paid_overdue_fee + ': '
            : ''}
          {props.record?.k_expect_overdue_fee && props.record!.k_expect_overdue_fee > 0 ? (
            <b
              style={{
                color:
                  props.record!.k_expect_overdue_fee - props.record!.s_paid_overdue_fee == 0
                    ? 'green'
                    : 'red',
              }}
            >
              {props.record!.k_expect_overdue_fee - props.record!.s_paid_overdue_fee!}
            </b>
          ) : (
            ''
          )}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">减免信息</Divider>
      <div hidden={!(props.record?.t_deduction_times && props.record?.t_deduction_times > 0)}>
        <Descriptions column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} bordered>
          <Descriptions.Item label={FieldLabels.t_deduction_times}>
            {props.record?.t_deduction_times}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.u_deduction_total_amount}>
            {props.record?.u_deduction_total_amount}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.w_deduction_total_interest}>
            {props.record?.w_deduction_total_interest}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.x_deduction_total_service_fee}>
            {props.record?.x_deduction_total_service_fee}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.y_deduction_total_violate_fee}>
            {props.record?.y_deduction_total_violate_fee}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.z_deduction_total_overdue_fee}>
            {props.record?.z_deduction_total_overdue_fee}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <Divider orientation="left">展期信息</Divider>
      <div hidden={!(props.record?.a_b_extend_times && props.record?.a_b_extend_times > 0)}>
        <Descriptions column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} bordered>
          <Descriptions.Item label={FieldLabels.a_b_extend_times}>
            {props.record?.a_b_extend_times}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_c_extend_total_amount}>
            {props.record?.a_c_extend_total_amount}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_d_extend_total_days}>
            {props.record?.a_d_extend_total_days}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_e_extend_total_fee}>
            {props.record?.a_e_extend_total_fee}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_f_extend_total_violate_fee}>
            {props.record?.a_f_extend_total_violate_fee}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_g_extend_total_overdue_fee}>
            {props.record?.a_g_extend_total_overdue_fee}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Divider orientation="left">分期明细</Divider>
      <ProTable<API.QBPeriod, TableListPagination>
        columns={column}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={props.record?.a_a_a_a_a_q_b_periods}
        pagination={false}
        rowKey="id"
      />
    </Modal>
  );
};

export default DetailModel;

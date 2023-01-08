import { CALLBACK_CODE, LOAN_LOG_STATUS, LOAN_LOG_TYPE, SYNC_CODE } from '@/pages/enums';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Descriptions, Modal, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import type { TableListItem } from '../data';
import { FieldLabels, show } from '../service';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onOk: () => void;
  modalVisible: boolean;
  id?: number;
  admins: RequestOptionsType[];
  channels: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const DetailModel: React.FC<FormProps> = (props) => {
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function _show() {
      // @ts-ignore
      const res = await show({ id: props.id });
      setOldRecord(res.data);
    }

    setLoading(true);
    if (props.id && props.id > 0) {
      _show().then(() => setLoading(false));
    }
    // setLoading(false);
    return () => {};
  }, [props.id]);
  return (
    <Modal
      title="流水明细"
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
      <Spin spinning={loading}>
        <Descriptions column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} bordered>
          <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.h_sn}>
            {oldRecord?.a_a_a_a_a_d_borrow?.h_sn}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.b_channel_id}>
            {
              props.channels.find(
                (item) => item.value == oldRecord?.a_a_a_a_a_d_borrow?.b_channel_id,
              )?.label
            }
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.a_l_name1}>
            {oldRecord?.a_a_a_a_a_d_borrow?.a_l_name1}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.created_at}>
            {moment(oldRecord?.a_a_a_a_a_d_borrow!.created_at).format('YYYY-MM-DD HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.l_borrow_count}>
            {oldRecord?.a_a_a_a_a_d_borrow?.l_borrow_count}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.m_borrow_amount}>
            {oldRecord?.a_a_a_a_a_d_borrow?.m_borrow_amount}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.c_admin_id} span={2}>
            {props.admins.find((item) => item.value == oldRecord?.c_admin_id)?.label}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.e_payment_channel}>
            {oldRecord?.e_payment_channel}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.g_type}>
            {oldRecord?.g_type ? LOAN_LOG_TYPE[oldRecord?.g_type]?.text : ''}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.h_status} span={2}>
            {oldRecord?.h_status ? LOAN_LOG_STATUS[oldRecord?.h_status]?.text : ''}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.i_receiver_name}>
            {oldRecord?.i_receiver_name}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.j_receiver_bankcard_number}>
            {oldRecord?.j_receiver_bankcard_number}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.k_receiver_bankcard_name} span={2}>
            {oldRecord?.k_receiver_bankcard_name}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.q_outer_sn}>
            {oldRecord?.q_outer_sn}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_b_index}>
            {oldRecord?.a_b_index}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.o_loan_time}>
            {moment(oldRecord?.o_loan_time).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.r_amount}>{oldRecord?.r_amount}</Descriptions.Item>
          <Descriptions.Item label={FieldLabels.t_sync_code}>
            {oldRecord?.t_sync_code ? SYNC_CODE[oldRecord?.t_sync_code]?.text : ''}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.u_sync_message} span={3}>
            {oldRecord?.u_sync_message}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.v_sync_raw} span={4}>
            {oldRecord?.v_sync_raw}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.w_callback_code}>
            {oldRecord?.w_callback_code ? CALLBACK_CODE[oldRecord?.w_callback_code]?.text : ''}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.x_callback_message} span={3}>
            {oldRecord?.x_callback_message}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.y_callback_raw} span={4}>
            {oldRecord?.y_callback_raw}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default DetailModel;

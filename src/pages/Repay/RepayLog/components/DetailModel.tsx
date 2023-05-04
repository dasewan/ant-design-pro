import { REPAY_LOG_STATUS, REPAY_LOG_TYPE } from '@/pages/enums';
import { getAdminV1RARepayLogsId as show } from '@/services/ant-design-pro/RARepayLog';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Descriptions, Divider, Modal, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import type { TableListItem } from '../data';
import { FieldLabels } from '../service';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onOk: () => void;
  modalVisible: boolean;
  id?: number;
  record: TableListItem;
  admins: RequestOptionsType[];
  channels: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const DetailModel: React.FC<FormProps> = (props) => {
  const [oldRecord, setOldRecord] = useState<TableListItem>(props.record);
  const [loading, setLoading] = useState(false);

  async function _show() {
    setLoading(true);
    // @ts-ignore
    const res = await show({ id: props.id });
    setOldRecord(res.data!);
    setLoading(false);
  }

  useEffect(() => {
    setOldRecord(props.record);
    return () => {};
  }, [props.id]);

  return (
    <Modal
      title="流水明细"
      open={props.modalVisible}
      onOk={props.onOk}
      onCancel={props.onOk}
      width="90%"
      style={{ top: 20 }}
      destroyOnClose={true}
      footer={[
        <Button
          key="refresh"
          type="primary"
          disabled={oldRecord?.j_status === 40 || oldRecord?.j_status === 50}
          onClick={_show}
        >
          刷新
        </Button>,
        <Button key="submit" type="primary" onClick={props.onOk}>
          知道了
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Divider orientation="left">订单信息</Divider>
        <Descriptions column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} bordered>
          <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.h_sn}>
            {oldRecord?.a_a_a_a_a_d_borrow?.h_sn}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_a_a_a_a_d_borrow.b_channel_id}>
            {
              props.channels.find(
                (item) => item.value === oldRecord?.a_a_a_a_a_d_borrow?.b_channel_id,
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
        </Descriptions>
        <Divider orientation="left">还款信息</Divider>
        <Descriptions column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} bordered>
          <Descriptions.Item label={FieldLabels.u_amount}>{oldRecord?.u_amount}</Descriptions.Item>
          <Descriptions.Item label={FieldLabels.i_type}>
            {oldRecord?.i_type ? REPAY_LOG_TYPE[oldRecord?.i_type]?.text : ''}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.m_payment_channel}>
            {oldRecord?.m_payment_channel}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.j_status}>
            {oldRecord?.j_status ? REPAY_LOG_STATUS[oldRecord?.j_status]?.text : ''}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.k_way}>{oldRecord?.k_way}</Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_z_period_count}>
            {oldRecord?.a_z_period_count}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_y_period_index}>
            {oldRecord?.a_y_period_index}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.l_index}>{oldRecord?.l_index}</Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_w_overdue_days}>
            {oldRecord?.a_w_overdue_days}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.o_bankcard_number}>
            {oldRecord?.o_bankcard_number}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.p_bankcard_name}>
            {oldRecord?.p_bankcard_name}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.s_reference}>
            {oldRecord?.s_reference}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.t_outer_sn}>
            {oldRecord?.t_outer_sn}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.v_fee}>{oldRecord?.v_fee}</Descriptions.Item>
          <Descriptions.Item label={FieldLabels.created_at}>
            {moment(oldRecord?.created_at).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.updated_at}>
            {moment(oldRecord?.updated_at).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.w_sync_code}>
            {oldRecord?.w_sync_code}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.x_sync_message} span={3}>
            {oldRecord?.x_sync_message}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.y_sync_raw} span={4}>
            {oldRecord?.y_sync_raw}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.z_callback_code}>
            {oldRecord?.z_callback_code}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_a_callback_message} span={3}>
            {oldRecord?.a_a_callback_message}
          </Descriptions.Item>
          <Descriptions.Item label={FieldLabels.a_b_callback_raw} span={4}>
            {oldRecord?.a_b_callback_raw}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left">关联催收</Divider>
        <div hidden={!(oldRecord?.e_urge_id && oldRecord?.e_urge_id > 0)}>
          <Descriptions
            column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
            bordered
          ></Descriptions>
        </div>
      </Spin>
    </Modal>
  );
};

export default DetailModel;

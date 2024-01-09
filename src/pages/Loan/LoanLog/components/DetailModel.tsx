import { CALLBACK_CODE, LOAN_LOG_STATUS, LOAN_LOG_TYPE, SYNC_CODE } from '@/pages/enums';
import {
  US_CALLBACK_CODE,
  US_LOAN_LOG_STATUS,
  US_LOAN_LOG_TYPE,
  US_SYNC_CODE,
} from '@/pages/enumsUs';
import { getAdminV1MCLoanLogsId as show } from '@/services/ant-design-pro/MCLoanLog';
import { useIntl } from '@@/exports';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, ConfigProvider, Descriptions, Modal, Spin } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onOk: () => void;
  modalVisible: boolean;
  id?: number;
  admins: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const DetailModel: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
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
      title={intl.formatMessage({ id: 'pages.LoanLog.detail', defaultMessage: '' })}
      open={props.modalVisible}
      onOk={props.onOk}
      onCancel={props.onOk}
      width="90%"
      style={{ top: 20 }}
      destroyOnClose={true}
      footer={[
        <Button key="submit" type="primary" onClick={props.onOk}>
          {intl.formatMessage({ id: 'pages.common.known', defaultMessage: '' })}
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Descriptions column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} bordered>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.h_sn', defaultMessage: '' })}
          >
            {oldRecord?.a_a_a_a_a_d_borrow?.h_sn}
          </Descriptions.Item>

          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.Borrow.BorrowDetail.a_l_name1',
              defaultMessage: '',
            })}
          >
            {oldRecord?.a_a_a_a_a_d_borrow?.a_l_name1}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.Borrow.BorrowDetail.created_at',
              defaultMessage: '',
            })}
          >
            {moment(oldRecord?.a_a_a_a_a_d_borrow!.created_at).format('YYYY-MM-DD HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.Borrow.BorrowDetail.l_borrow_count',
              defaultMessage: '',
            })}
          >
            {oldRecord?.a_a_a_a_a_d_borrow?.l_borrow_count}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.Borrow.BorrowDetail.m_borrow_amount',
              defaultMessage: '',
            })}
          >
            {oldRecord?.a_a_a_a_a_d_borrow?.m_borrow_amount}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.c_admin_id', defaultMessage: '' })}
            span={2}
          >
            {props.admins.find((item) => item.value === oldRecord?.c_admin_id)?.label}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.LoanLog.e_payment_channel',
              defaultMessage: '',
            })}
          >
            {oldRecord?.e_payment_channel}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.g_type', defaultMessage: '' })}
          >
            {currentLanguage === 'zh-cn'
              ? oldRecord?.g_type
                ? LOAN_LOG_TYPE[oldRecord?.g_type]?.text
                : ''
              : oldRecord?.g_type
              ? US_LOAN_LOG_TYPE[oldRecord?.g_type]?.text
              : ''}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.h_status', defaultMessage: '' })}
            span={2}
          >
            {currentLanguage === 'zh-cn'
              ? oldRecord?.h_status
                ? LOAN_LOG_STATUS[oldRecord?.h_status]?.text
                : ''
              : oldRecord?.h_status
              ? US_LOAN_LOG_STATUS[oldRecord?.h_status]?.text
              : ''}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.i_receiver_name', defaultMessage: '' })}
          >
            {oldRecord?.i_receiver_name}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.LoanLog.j_receiver_bankcard_number',
              defaultMessage: '',
            })}
          >
            {oldRecord?.j_receiver_bankcard_number}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.LoanLog.k_receiver_bankcard_name',
              defaultMessage: '',
            })}
            span={2}
          >
            {oldRecord?.k_receiver_bankcard_name}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.q_outer_sn', defaultMessage: '' })}
          >
            {oldRecord?.q_outer_sn}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.a_b_index', defaultMessage: '' })}
          >
            {oldRecord?.a_b_index}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.o_loan_time', defaultMessage: '' })}
          >
            {moment(oldRecord?.o_loan_time).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.LoanLog.r_amount',
              defaultMessage: '',
            })}
          >
            {oldRecord?.r_amount}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.t_sync_code', defaultMessage: '' })}
          >
            {currentLanguage === 'zh-cn'
              ? oldRecord?.t_sync_code
                ? SYNC_CODE[oldRecord?.t_sync_code]?.text
                : ''
              : oldRecord?.t_sync_code
              ? US_SYNC_CODE[oldRecord?.t_sync_code]?.text
              : ''}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.u_sync_message', defaultMessage: '' })}
            span={3}
          >
            {oldRecord?.u_sync_message}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.v_sync_raw', defaultMessage: '' })}
            span={4}
          >
            {oldRecord?.v_sync_raw}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.w_callback_code', defaultMessage: '' })}
          >
            {currentLanguage === 'zh-cn'
              ? oldRecord?.w_callback_code
                ? CALLBACK_CODE[oldRecord?.w_callback_code]?.text
                : ''
              : oldRecord?.w_callback_code
              ? US_CALLBACK_CODE[oldRecord?.w_callback_code]?.text
              : ''}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.LoanLog.x_callback_message',
              defaultMessage: '',
            })}
            span={3}
          >
            {oldRecord?.x_callback_message}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({ id: 'pages.LoanLog.y_callback_raw', defaultMessage: '' })}
            span={4}
          >
            {oldRecord?.y_callback_raw}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default DetailModel;

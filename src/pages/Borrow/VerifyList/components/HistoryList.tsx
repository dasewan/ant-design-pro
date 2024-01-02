import { CONTACT_RELATION_ENUM, GENDER_ENUM } from '@/pages/Borrow/VerifyList/components/enums';
import { useIntl } from '@@/exports';
import { Badge, Modal, Table, TableColumnsType } from 'antd';
import moment from 'moment';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: () => void;
  modalVisible: boolean;
  data: any[];
  item: string;
  title: string;
};

/**
 *
 * @param props
 * @constructor
 */
const HistoryList: React.FC<FormProps> = (props) => {
  console.log(props.data);
  const intl = useIntl();
  let columns:
    | TableColumnsType<any>
    | (
        | {
            title: string;
            dataIndex: string;
            key: string;
            render: (text: string, record: API.MIdnumber) => string;
          }
        | { title: string; dataIndex: string; key: string; render?: undefined }
        | {
            title: string;
            dataIndex: string;
            key: string;
            render: (text: string, record: API.MIdnumber) => JSX.Element | '-';
          }
      )[]
    | (
        | { title: string; dataIndex: string; key: string; render?: undefined }
        | {
            title: string;
            dataIndex: string;
            key: string;
            render: (text: string, record: API.OContact) => string;
          }
        | {
            title: string;
            dataIndex: string;
            key: string;
            render: (text: string, record: API.MIdnumber) => string;
          }
      )[]
    | (
        | { title: string; dataIndex: string; key: string; render?: undefined }
        | {
            title: string;
            dataIndex: string;
            key: string;
            render: (text: string, record: API.AOLoanBank) => string;
          }
      )[]
    | undefined;
  if (props.item === 'idNumber') {
    columns = [
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Idnumber.q_name1', defaultMessage: '' }),
        dataIndex: 'q_name1',
        key: 'q_name1',
        render: (text: string, record: API.MIdnumber) => {
          let str = '';
          if (record.q_name1 !== undefined && record.q_name1 !== null) {
            str += record.q_name1;
          }
          if (record.r_name2 !== undefined && record.r_name2 !== null) {
            str += record.r_name2;
          }
          if (record.s_name3 !== undefined && record.s_name3 !== null) {
            str += record.s_name3;
          }
          if (record.t_name4 !== undefined && record.t_name4 !== null) {
            str += record.t_name4;
          }
          return str;
        },
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Idnumber.m_idnumber', defaultMessage: '' }),
        dataIndex: 'm_idnumber',
        key: 'm_idnumber',
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Idnumber.u_gender', defaultMessage: '' }),
        dataIndex: 'u_gender',
        key: 'u_gender',
        render: (text: string, record: API.MIdnumber) => {
          if (record.u_gender !== undefined && record.u_gender !== null) {
            return GENDER_ENUM[record.u_gender]?.text;
          } else {
            return '-';
          }
        },
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Idnumber.v_birthday', defaultMessage: '' }),
        dataIndex: 'v_birthday',
        key: 'v_birthday',
        render: (text: string, record: API.MIdnumber) => {
          if (record.v_birthday !== undefined && record.v_birthday !== null) {
            return moment(record?.v_birthday).format('YYYY-MM-DD');
          } else {
            return '-';
          }
        },
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Idnumber.x_idnumber_state_id',
          defaultMessage: '',
        }),
        dataIndex: 'x_idnumber_state_id',
        key: 'x_idnumber_state_id',
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Idnumber.a_b_idnumber_address',
          defaultMessage: '',
        }),
        dataIndex: 'a_b_idnumber_address',
        key: 'a_b_idnumber_address',
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Idnumber.a_y_email', defaultMessage: '' }),
        dataIndex: 'a_y_email',
        key: 'a_y_email',
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Idnumber.a_z_whatapp', defaultMessage: '' }),
        dataIndex: 'a_z_whatapp',
        key: 'a_z_whatapp',
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Idnumber.d_black_id', defaultMessage: '' }),
        dataIndex: 'd_black_id',
        key: 'd_black_id',
        render: (text: string, record: API.MIdnumber) => {
          if (
            record.d_black_id !== undefined &&
            record.d_black_id !== null &&
            record.d_black_id !== 0
          ) {
            return (
              <Badge
                status="error"
                text={intl.formatMessage({ id: 'pages.common.hit', defaultMessage: '' })}
              />
            );
          } else {
            return '-';
          }
        },
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Idnumber.e_grey_id', defaultMessage: '' }),
        dataIndex: 'e_grey_id',
        key: 'e_grey_id',
        render: (text: string, record: API.MIdnumber) => {
          if (
            record.e_grey_id !== undefined &&
            record.e_grey_id !== null &&
            record.e_grey_id !== 0
          ) {
            return (
              <Badge
                status="error"
                text={intl.formatMessage({ id: 'pages.common.hit', defaultMessage: '' })}
              />
            );
          } else {
            return '-';
          }
        },
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Idnumber.a_h_id_number_same',
          defaultMessage: '',
        }),
        dataIndex: 'a_h_id_number_same',
        key: 'a_h_id_number_same',
        render: (text: string, record: API.MIdnumber) => {
          if (
            record.a_h_id_number_same !== undefined &&
            record.a_h_id_number_same !== null &&
            record.a_h_id_number_same === 'n'
          ) {
            return (
              <Badge
                status="error"
                text={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.not_same',
                  defaultMessage: '',
                })}
              />
            );
          } else if (
            record.a_h_id_number_same !== undefined &&
            record.a_h_id_number_same !== null &&
            record.a_h_id_number_same === 'y'
          ) {
            return (
              <Badge
                status="success"
                text={intl.formatMessage({ id: 'pages.Borrow.Idnumber.same', defaultMessage: '' })}
              />
            );
          } else {
            return '-';
          }
        },
      },
      {
        title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string, record: API.MIdnumber) => {
          return moment(record.created_at!).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Idnumber.g_valid_date', defaultMessage: '' }),
        dataIndex: 'g_valid_date',
        key: 'g_valid_date',
        render: (text: string, record: API.MIdnumber) => {
          return moment(record.g_valid_date!).format('YYYY-MM-DD');
        },
      },
    ];
  } else if (props.item === 'contact') {
    columns = [
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Contact.contact1_name', defaultMessage: '' }),
        dataIndex: 'contact1_name',
        key: 'contact1_name',
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Contact.contact1_phone',
          defaultMessage: '',
        }),
        dataIndex: 'contact1_phone',
        key: 'contact1_phone',
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Contact.j_contact1_relation',
          defaultMessage: '',
        }),
        dataIndex: 'j_contact1_relation',
        key: 'j_contact1_relation',
        render: (text: string, record: API.OContact) => {
          return CONTACT_RELATION_ENUM[record.j_contact1_relation!]!.text;
        },
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Contact.a_o_contact1_sms_contact_id',
          defaultMessage: '',
        }),
        dataIndex: 'a_o_contact1_sms_contact_id',
        key: 'a_o_contact1_sms_contact_id',
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Contact.a_p_contact1_contact_record_id',
          defaultMessage: '',
        }),
        dataIndex: 'a_p_contact1_contact_record_id',
        key: 'a_p_contact1_contact_record_id',
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Contact.contact2_name', defaultMessage: '' }),
        dataIndex: 'contact2_name',
        key: 'contact2_name',
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Contact.contact2_phone',
          defaultMessage: '',
        }),
        dataIndex: 'contact2_phone',
        key: 'contact2_phone',
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Contact.m_contact2_relation',
          defaultMessage: '',
        }),
        dataIndex: 'm_contact2_relation',
        key: 'm_contact2_relation',
        render: (text: string, record: API.OContact) => {
          return CONTACT_RELATION_ENUM[record.m_contact2_relation!]!.text;
        },
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Contact.a_q_contact2_sms_contact_id',
          defaultMessage: '',
        }),
        dataIndex: 'a_q_contact2_sms_contact_id',
        key: 'a_q_contact2_sms_contact_id',
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.Contact.a_r_contact2_contact_record_id',
          defaultMessage: '',
        }),
        dataIndex: 'a_r_contact2_contact_record_id',
        key: 'a_r_contact2_contact_record_id',
      },
      {
        title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string, record: API.MIdnumber) => {
          return moment(record.created_at!).format('YYYY-MM-DD');
        },
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.Contact.b_valid_date', defaultMessage: '' }),
        dataIndex: 'b_valid_date',
        key: 'b_valid_date',
        render: (text: string, record: API.OContact) => {
          return moment(record.b_valid_date!).format('YYYY-MM-DD HH:mm:ss');
        },
      },
    ];
  } else if (props.item === 'job') {
    columns = [];
  } else {
    columns = [
      {
        title: intl.formatMessage({ id: 'pages.Borrow.BankCard.d_bank_name', defaultMessage: '' }),
        dataIndex: 'd_bank_name',
        key: 'd_bank_name',
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.BankCard.e_bank_code', defaultMessage: '' }),
        dataIndex: 'e_bank_code',
        key: 'e_bank_code',
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.BankCard.f_bank_card_no',
          defaultMessage: '',
        }),
        dataIndex: 'f_bank_card_no',
        key: 'f_bank_card_no',
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.BankCard.s_first_name', defaultMessage: '' }),
        dataIndex: 's_first_name',
        key: 's_first_name',
      },
      {
        title: intl.formatMessage({
          id: 'pages.Borrow.BankCard.t_middle_name',
          defaultMessage: '',
        }),
        dataIndex: 't_middle_name',
        key: 't_middle_name',
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.BankCard.u_last_name', defaultMessage: '' }),
        dataIndex: 'u_last_name',
        key: 'u_last_name',
      },
      {
        title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string, record: API.AOLoanBank) => {
          return moment(record.created_at!).format('YYYY-MM-DD');
        },
      },
      {
        title: intl.formatMessage({ id: 'pages.Borrow.BankCard.c_valid_date', defaultMessage: '' }),
        dataIndex: 'c_valid_date',
        key: 'c_valid_date',
        render: (text: string, record: API.AOLoanBank) => {
          return moment(record.c_valid_date!).format('YYYY-MM-DD HH:mm:ss');
        },
      },
    ];
  }
  return (
    <Modal
      title="Basic Modal"
      width={'100%'}
      open={props.modalVisible}
      onOk={props.onCancel}
      onCancel={props.onCancel}
    >
      <Table dataSource={props.data} columns={columns} />
    </Modal>
  );
};

export default HistoryList;

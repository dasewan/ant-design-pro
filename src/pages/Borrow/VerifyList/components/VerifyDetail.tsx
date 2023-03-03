import {
  BANK_NAME,
  CONTACT2_RELATION_ENUM,
  CONTACT_RELATION_ENUM,
  EDUCATION,
  EMPLOYMENT_PERIOD,
  EMPLOYMENT_STATUS,
  GENDER_ENUM,
  MARITAL_STATUS,
  PAYROLL_PERIOD,
  PAY_DAY,
  PERSONAL_LOAN_PURPOSE,
  PREFERRED_LANGUAGE,
  RELIGION,
  RESIDENTIAL_TYPE,
} from '@/pages/Borrow/VerifyList/components/enums';
import ReviewForm from '@/pages/Borrow/VerifyList/components/ReviewForm';
import type { TableListItem } from '@/pages/Borrow/VerifyList/data';
import { FieldLabels } from '@/pages/Borrow/VerifyList/Detail/service';
import { PhoneOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export type FormProps = {
  oldRecord?: TableListItem;
};
const VerifyDetail: React.FC<FormProps> = (props) => {
  const [reviewModalVisible, handleReviewModalVisible] = useState<boolean>(false);
  //当前审核原因
  const [reasonIds, handleReasonIds] = useState<string>('');
  const [reasonsDetail, handleReasonsDetail] = useState<string>('');
  const [modelTitle, handleModelTitle] = useState<string>('');
  const [currentStatus, handleCurrentStatus] = useState<number>(0);
  //当前审核项
  const [currentItem, handleCurrentItem] = useState<string>('');
  const [idNumberStatus, handleIdNumberStatus] = useState<number>(0);
  const [contactStatus, handleContactStatus] = useState<number>(0);
  const [jobStatus, handleJobStatus] = useState<number>(0);
  const [loanBankStatus, handleLoanBankStatus] = useState<number>(0);

  const [idNumberRawStatus, handleIdNumberRawStatus] = useState<number | undefined>(0);
  const [contactRawStatus, handleContactRawStatus] = useState<number>(0);
  const [jobRawStatus, handleJobRawStatus] = useState<number>(0);
  const [loanBankRawStatus, handleLoanBankRawStatus] = useState<number>(0);
  useEffect(() => {
    // @ts-ignore
    handleIdNumberStatus(props?.oldRecord?.j_idnumber_verify_status);
    // @ts-ignore
    handleContactStatus(props?.oldRecord?.n_contact_verify_status);
    // @ts-ignore
    handleJobStatus(props?.oldRecord?.p_job_verify_status);
    // @ts-ignore
    handleLoanBankStatus(props?.oldRecord?.r_loan_bank_verify_status);
    // @ts-ignore
    handleIdNumberRawStatus(props?.oldRecord?.a_a_a_a_a_m_idnumber?.c_status);
    // @ts-ignore
    handleContactRawStatus(props?.oldRecord?.a_a_a_a_a_o_contact?.c_status);
    // @ts-ignore
    handleJobRawStatus(props?.oldRecord?.a_a_a_a_a_m_a_job?.c_status);
    // @ts-ignore
    handleLoanBankRawStatus(props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.b_status);
  }, [props?.oldRecord]);
  /**
   * 展示审核model
   * @param _currentItem
   * @param _modelTitle
   * @param _reasonIds
   * @param _reasonsDetail
   * @param _currentStatus
   */
  const onReviewClick = async (
    _currentItem: string,
    _modelTitle: string,
    _reasonIds: string,
    _reasonsDetail: string,
    _currentStatus: number,
  ) => {
    handleReasonIds(_reasonIds);
    handleReasonsDetail(_reasonsDetail);
    handleCurrentItem(_currentItem);
    handleReviewModalVisible(true);
    handleModelTitle(_modelTitle);
    handleCurrentStatus(_currentStatus);
  };
  const idnumberReasons = props?.oldRecord?.a_a_a_a_a_m_idnumber?.b_d_reasons?.split(',');
  const nameRed = idnumberReasons?.find((item) => ['5'].includes(item));
  const idNumberRed = idnumberReasons?.find((item) => ['1', '2', '3', '4', '6'].includes(item));
  const contactReasons = props?.oldRecord?.a_a_a_a_a_o_contact?.a_l_reasons?.split(',');
  const contact1Red = contactReasons?.find((item) => ['3', '4', '9', '11'].includes(item));
  const contact1BorrowRed = contactReasons?.find((item) => ['3', '4'].includes(item));
  const contact2Red = contactReasons?.find((item) => ['7', '8', '10', '12'].includes(item));
  const contact2BorrowRed = contactReasons?.find((item) => ['7', '8'].includes(item));
  const loanBankReasons = props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.y_reasons?.split(',');
  const loanBankRed = loanBankReasons?.find((item) =>
    ['1', '2', '3', '4', '5', '6', '7'].includes(item),
  );
  const nameIsSame =
    (props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_l_name_same &&
      props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_l_name_same == 'n') ||
    (props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_m_name2_same &&
      props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_m_name2_same == 'n') ||
    (props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_n_name3_same &&
      props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_n_name3_same == 'n') ||
    (props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_o_name4_same &&
      props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_o_name4_same == 'n');
  const idNumberIsSame =
    (props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_h_id_number_same &&
      props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_h_id_number_same == 'n') ||
    (props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_i_id_number2_same &&
      props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_i_id_number2_same == 'n') ||
    (props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_j_id_number3_same &&
      props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_j_id_number3_same == 'n') ||
    (props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_k_id_number4_same &&
      props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_k_id_number4_same == 'n');
  const isBlack =
    props?.oldRecord?.a_a_a_a_a_m_idnumber?.d_black_id &&
    props?.oldRecord?.a_a_a_a_a_m_idnumber?.d_black_id > 0;
  const isGrey =
    props?.oldRecord?.a_a_a_a_a_m_idnumber?.e_grey_id &&
    props?.oldRecord?.a_a_a_a_a_m_idnumber?.e_grey_id > 0;
  const isWhite =
    props?.oldRecord?.a_a_a_a_a_m_idnumber?.f_white_id &&
    props?.oldRecord?.a_a_a_a_a_m_idnumber?.f_white_id > 0;

  const contact1IsBlack =
    props?.oldRecord?.a_a_a_a_a_o_contact?.y_contact1_black_id &&
    props?.oldRecord?.a_a_a_a_a_o_contact?.y_contact1_black_id > 0;
  const contact1IsGrey =
    props?.oldRecord?.a_a_a_a_a_o_contact?.z_contact1_grey_id &&
    props?.oldRecord?.a_a_a_a_a_o_contact?.z_contact1_grey_id > 0;
  const contact1IsWhite =
    props?.oldRecord?.a_a_a_a_a_o_contact?.x_contact1_white_id &&
    props?.oldRecord?.a_a_a_a_a_o_contact?.x_contact1_white_id > 0;

  const contact2IsBlack =
    props?.oldRecord?.a_a_a_a_a_o_contact?.a_b_contact2_black_id &&
    props?.oldRecord?.a_a_a_a_a_o_contact?.a_b_contact2_black_id > 0;
  const contact2IsGrey =
    props?.oldRecord?.a_a_a_a_a_o_contact?.a_c_contact2_grey_id &&
    props?.oldRecord?.a_a_a_a_a_o_contact?.a_c_contact2_grey_id > 0;
  const contact2IsWhite =
    props?.oldRecord?.a_a_a_a_a_o_contact?.a_a_contact2_white_id &&
    props?.oldRecord?.a_a_a_a_a_o_contact?.a_a_contact2_white_id > 0;

  const contact3IsBlack =
    props?.oldRecord?.a_a_a_a_a_o_contact?.a_e_contact3_black_id &&
    props?.oldRecord?.a_a_a_a_a_o_contact?.a_e_contact3_black_id > 0;

  const loanBankIsBlack =
    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.n_black_id &&
    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.n_black_id > 0;
  const loanBankIsGrey =
    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.o_grey_id &&
    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.o_grey_id > 0;

  return (
    <>
      <Row
        gutter={[
          { xs: 10, sm: 12, md: 12 },
          { xs: 10, sm: 12, md: 12 },
        ]}
      >
        <Col xs={24} sm={24} xl={12} xxl={8}>
          <Card
            title="身份信息"
            bodyStyle={{ padding: 0 }}
            extra={
              idNumberRawStatus == 30 ? (
                <Button
                  type="primary"
                  onClick={() =>
                    onReviewClick(
                      'idNumber',
                      '身份信息',
                      props!.oldRecord!.a_a_a_a_a_m_idnumber!.b_d_reasons!,
                      props!.oldRecord!.a_a_a_a_a_m_idnumber!.b_e_reasons_detail!,
                      idNumberStatus,
                    )
                  }
                >
                  {idNumberStatus == 30 ? '审核' : '复审原因'}
                </Button>
              ) : (
                ''
              )
            }
          >
            <Descriptions bordered column={{ xs: 1, sm: 1, md: 2, xl: 2, xxl: 2 }} size="small">
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_m_idnumber.q_name1}
                labelStyle={nameRed ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.q_name1}
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.r_name2}
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.s_name3}
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.t_name4}
                {!nameIsSame && props?.oldRecord?.a_a_a_a_a_q_a_ocr?.l_name1 ? (
                  <span style={{ color: 'red' }}>
                    {props!.oldRecord!.a_a_a_a_a_q_a_ocr!.l_name1}
                    {props!.oldRecord!.a_a_a_a_a_q_a_ocr!.m_name2}
                    {props!.oldRecord!.a_a_a_a_a_q_a_ocr!.n_name3}
                    {props!.oldRecord!.a_a_a_a_a_q_a_ocr!.o_name4}
                  </span>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item
                labelStyle={idNumberRed ? { color: 'red', fontWeight: 'bold' } : {}}
                label={FieldLabels.a_a_a_a_a_m_idnumber.m_idnumber}
              >
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.m_idnumber}
                {!idNumberIsSame && props?.oldRecord?.a_a_a_a_a_q_a_ocr?.h_idnumber ? (
                  <span style={{ color: 'red' }}>
                    {props!.oldRecord!.a_a_a_a_a_q_a_ocr!.h_idnumber}
                  </span>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.u_gender}>
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.u_gender
                  ? GENDER_ENUM[props?.oldRecord?.a_a_a_a_a_m_idnumber?.u_gender]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.v_birthday}>
                {moment(props?.oldRecord?.a_a_a_a_a_m_idnumber?.v_birthday).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item
                labelStyle={
                  props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_x_index &&
                  props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_x_index > 1
                    ? {
                        color: 'red',
                        fontWeight: 'bold',
                      }
                    : {}
                }
                label={FieldLabels.a_a_a_a_a_m_idnumber.a_x_index}
              >
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_x_index}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_m_idnumber.d_black_id}
                labelStyle={isBlack ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {isBlack ? '命中黑名单' : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_m_idnumber.e_grey_id}
                labelStyle={isGrey ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {isGrey ? '命中灰名单' : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_m_idnumber.f_white_id}
                labelStyle={isWhite ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {isWhite ? '命中白名单' : '-'}
              </Descriptions.Item>

              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.x_idnumber_state_id}>
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.x_idnumber_state_id}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.a_b_idnumber_address}>
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_b_idnumber_address}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.a_y_email}>
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_y_email}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.a_z_whatapp}>
                {props?.oldRecord?.a_a_a_a_a_m_idnumber?.a_z_whatapp}
              </Descriptions.Item>
              {/*            <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.b_a_facebook}>{props?.oldRecord?.a_a_a_a_a_m_idnumber?.b_a_facebook}</Descriptions.Item>
            <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.b_b_line}>{props?.oldRecord?.a_a_a_a_a_m_idnumber?.b_b_line}</Descriptions.Item>*/}
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.created_at}>
                {moment(props?.oldRecord?.a_a_a_a_a_m_idnumber?.created_at).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.g_valid_date}>
                {moment(props?.oldRecord?.a_a_a_a_a_m_idnumber?.g_valid_date).format('YYYY-MM-DD')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} sm={24} xl={12} xxl={8}>
          <Card
            title="联系人信息"
            bodyStyle={{ padding: 0 }}
            extra={
              contactRawStatus == 30 ? (
                <Button
                  type="primary"
                  onClick={() =>
                    onReviewClick(
                      'contact',
                      '联系人信息',
                      props!.oldRecord!.a_a_a_a_a_o_contact!.a_l_reasons!,
                      props!.oldRecord!.a_a_a_a_a_o_contact!.a_n_reasons_detail!,
                      contactStatus,
                    )
                  }
                >
                  {contactStatus == 30 ? '审核' : '复审原因'}
                </Button>
              ) : (
                ''
              )
            }
          >
            <Descriptions bordered column={{ xs: 1, sm: 1, md: 2, xl: 2, xxl: 2 }} size="small">
              {/*<Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.j_contact1_relation}>{props?.oldRecord?.a_a_a_a_a_o_contact?.j_contact1_relation}</Descriptions.Item>*/}
              <Descriptions.Item label={<>{FieldLabels.a_a_a_a_a_o_contact.contact1_name}</>}>
                {props?.oldRecord?.a_a_a_a_a_o_contact?.contact1_name} (
                {props?.oldRecord?.a_a_a_a_a_o_contact?.j_contact1_relation
                  ? CONTACT_RELATION_ENUM[
                      props?.oldRecord?.a_a_a_a_a_o_contact?.j_contact1_relation
                    ]?.text
                  : ''}
                )
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.contact1_phone}
                labelStyle={
                  contact1Red
                    ? {
                        color: 'red',
                        fontWeight: 'bold',
                      }
                    : {}
                }
              >
                {props?.oldRecord?.a_a_a_a_a_o_contact?.contact1_phone}
                <PhoneOutlined />
              </Descriptions.Item>
              {/*联系人1*/}
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.y_contact1_black_id}
                labelStyle={contact1IsBlack ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {contact1IsBlack ? '命中黑名单' : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.z_contact1_grey_id}
                labelStyle={contact1IsGrey ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {contact1IsBlack ? '命中灰名单' : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.x_contact1_white_id}
                labelStyle={contact1IsWhite ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {contact1IsBlack ? '命中白名单' : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.a_i_contact1_borrow_id}
                labelStyle={contact1BorrowRed ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {/*//todo 跳转所在订单*/}
                {props?.oldRecord?.a_a_a_a_a_o_contact?.a_i_contact1_borrow_id &&
                props?.oldRecord?.a_a_a_a_a_o_contact?.a_i_contact1_borrow_id > 0
                  ? '存在订单'
                  : '-'}
              </Descriptions.Item>

              {/*联系人2*/}
              {/*<Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.m_contact2_relation}>{props?.oldRecord?.a_a_a_a_a_o_contact?.m_contact2_relation}</Descriptions.Item>*/}
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.contact2_name}>
                {props?.oldRecord?.a_a_a_a_a_o_contact?.contact2_name} (
                {props?.oldRecord?.a_a_a_a_a_o_contact?.m_contact2_relation
                  ? CONTACT2_RELATION_ENUM[
                      props?.oldRecord?.a_a_a_a_a_o_contact?.m_contact2_relation
                    ]?.text
                  : ''}
                )
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.contact2_phone}
                labelStyle={
                  contact2Red
                    ? {
                        color: 'red',
                        fontWeight: 'bold',
                      }
                    : {}
                }
              >
                {props?.oldRecord?.a_a_a_a_a_o_contact?.contact2_phone}
                <PhoneOutlined />
              </Descriptions.Item>

              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.a_b_contact2_black_id}
                labelStyle={contact2IsBlack ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {contact2IsGrey ? '命中黑名单' : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.a_c_contact2_grey_id}
                labelStyle={contact2IsGrey ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {contact2IsGrey ? '命中灰名单' : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.a_a_contact2_white_id}
                labelStyle={contact2IsWhite ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {contact2IsGrey ? '命中白名单' : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_o_contact.a_j_contact2_borrow_id}
                labelStyle={contact2BorrowRed ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {/*//todo 跳转所在订单*/}
                {props?.oldRecord?.a_a_a_a_a_o_contact?.a_j_contact2_borrow_id &&
                props?.oldRecord?.a_a_a_a_a_o_contact?.a_j_contact2_borrow_id > 0
                  ? '存在订单'
                  : '-'}
              </Descriptions.Item>

              {/*联系人3*/}
              {props?.oldRecord?.a_a_a_a_a_o_contact?.contact3_name != undefined ? (
                <>
                  {contact3IsBlack ? (
                    <Descriptions.Item
                      label={FieldLabels.a_a_a_a_a_o_contact.a_e_contact3_black_id}
                      labelStyle={{ color: 'red' }}
                    >
                      命中黑名单
                    </Descriptions.Item>
                  ) : null}
                  {contact2IsGrey ? (
                    <Descriptions.Item
                      label={FieldLabels.a_a_a_a_a_o_contact.a_f_contact3_grey_id}
                      labelStyle={{ color: 'red' }}
                    >
                      命中灰名单
                    </Descriptions.Item>
                  ) : null}
                  {contact2IsWhite ? (
                    <Descriptions.Item
                      label={FieldLabels.a_a_a_a_a_o_contact.a_d_contact3_white_id}
                      labelStyle={{ color: 'red' }}
                    >
                      命中白名单
                    </Descriptions.Item>
                  ) : null}
                  <Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.p_contact3_relation}>
                    {props?.oldRecord?.a_a_a_a_a_o_contact?.p_contact3_relation}
                  </Descriptions.Item>
                  <Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.contact3_name}>
                    {props?.oldRecord?.a_a_a_a_a_o_contact?.contact3_name}
                  </Descriptions.Item>
                  <Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.contact3_phone}>
                    {props?.oldRecord?.a_a_a_a_a_o_contact?.contact3_phone}
                  </Descriptions.Item>
                  {props?.oldRecord?.a_a_a_a_a_o_contact?.a_k_contact3_borrow_id &&
                  props?.oldRecord?.a_a_a_a_a_o_contact?.a_k_contact3_borrow_id > 0 ? (
                    <Descriptions.Item
                      label={FieldLabels.a_a_a_a_a_o_contact.a_k_contact3_borrow_id}
                      labelStyle={{ color: 'red' }}
                    >
                      {/*//todo 跳转所在订单*/}
                      存在订单
                    </Descriptions.Item>
                  ) : null}
                </>
              ) : (
                ''
              )}
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.created_at}>
                {moment(props?.oldRecord?.a_a_a_a_a_o_contact?.created_at).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.b_valid_date}>
                {moment(props?.oldRecord?.a_a_a_a_a_o_contact?.b_valid_date).format('YYYY-MM-DD')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} sm={24} xl={12} xxl={8}>
          <Card
            title="银行卡信息"
            bodyStyle={{ padding: 0 }}
            extra={
              loanBankRawStatus == 30 ? (
                <Button
                  type="primary"
                  onClick={() =>
                    onReviewClick(
                      'loanBank',
                      '银行卡信息',
                      props!.oldRecord!.a_a_a_a_a_a_o_loan_bank!.y_reasons!,
                      '',
                      loanBankStatus,
                    )
                  }
                >
                  {loanBankStatus == 30 ? '审核' : '复审原因'}
                </Button>
              ) : (
                ''
              )
            }
          >
            <Descriptions bordered column={{ xs: 1, sm: 1, md: 1, xl: 1, xxl: 2 }} size="small">
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_a_o_loan_bank.d_bank_name}>
                {props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.d_bank_name
                  ? BANK_NAME[props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.d_bank_name]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_a_o_loan_bank.f_bank_card_no}
                labelStyle={
                  loanBankRed
                    ? {
                        color: 'red',
                        fontWeight: 'bold',
                      }
                    : {}
                }
              >
                {props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.f_bank_card_no}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_a_o_loan_bank.s_first_name} span={2}>
                {props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.s_first_name}
                {props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.t_middle_name}
                {props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.u_last_name}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_a_o_loan_bank.v_loan_success_times}
                span={2}
              >
                {props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.v_loan_success_times}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_a_o_loan_bank.w_loan_total_amount}
                span={2}
              >
                {props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.w_loan_total_amount}
              </Descriptions.Item>
              <Descriptions.Item
                labelStyle={{
                  color:
                    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.m_index &&
                    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.m_index > 1
                      ? 'red'
                      : '',
                  fontWeight:
                    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.m_index &&
                    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.m_index > 1
                      ? 'bold'
                      : 'normal',
                }}
                label={FieldLabels.a_a_a_a_a_a_o_loan_bank.m_index}
              >
                {props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.m_index}
              </Descriptions.Item>
              <Descriptions.Item
                labelStyle={{
                  color:
                    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.x_authenticity &&
                    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.x_authenticity != 50
                      ? 'red'
                      : '',
                  fontWeight:
                    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.x_authenticity &&
                    props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.x_authenticity != 50
                      ? 'bold'
                      : 'normal',
                }}
                label={FieldLabels.a_a_a_a_a_a_o_loan_bank.x_authenticity}
              >
                {props?.oldRecord?.a_a_a_a_a_a_o_loan_bank?.x_authenticity}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_a_o_loan_bank.n_black_id}
                labelStyle={loanBankIsBlack ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {loanBankIsBlack ? '命中黑名单' : '-'}
              </Descriptions.Item>
              <Descriptions.Item
                label={FieldLabels.a_a_a_a_a_a_o_loan_bank.o_grey_id}
                labelStyle={loanBankIsGrey ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {loanBankIsGrey ? '命中灰名单' : '-'}
              </Descriptions.Item>

              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.created_at}>
                {moment(props?.oldRecord?.a_a_a_a_a_m_idnumber?.created_at).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.g_valid_date}>
                {moment(props?.oldRecord?.a_a_a_a_a_m_idnumber?.g_valid_date).format('YYYY-MM-DD')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} sm={24} xl={12} xxl={24}>
          <Card
            title="工作及其他信息"
            bodyStyle={{ padding: 0 }}
            extra={
              jobRawStatus == 30 ? (
                <Button
                  type="primary"
                  onClick={() =>
                    onReviewClick(
                      'job',
                      '工作及其他信息',
                      props!.oldRecord!.a_a_a_a_a_m_a_job!.a_q_reasons!,
                      props!.oldRecord!.a_a_a_a_a_m_a_job!.a_r_reasons_detail!,
                      jobStatus,
                    )
                  }
                >
                  {jobStatus == 30 ? '审核' : '复审原因'}
                </Button>
              ) : (
                ''
              )
            }
          >
            <Descriptions bordered column={{ xs: 1, sm: 1, md: 2, xl: 2, xxl: 3 }} size="small">
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.v_employment_status}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.v_employment_status
                  ? EMPLOYMENT_STATUS[props?.oldRecord?.a_a_a_a_a_m_a_job?.v_employment_status]
                      ?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.w_employment_period}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.w_employment_period
                  ? EMPLOYMENT_PERIOD[props?.oldRecord?.a_a_a_a_a_m_a_job?.w_employment_period]
                      ?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.x_monthly_salary}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.x_monthly_salary}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.y_payroll_period}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.y_payroll_period
                  ? PAYROLL_PERIOD[props?.oldRecord?.a_a_a_a_a_m_a_job?.y_payroll_period]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.z_pay_day}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.z_pay_day
                  ? PAY_DAY[props?.oldRecord?.a_a_a_a_a_m_a_job?.z_pay_day]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.a_a_company_name}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.a_a_company_name}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.a_b_employer_name}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.a_b_employer_name}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.a_c_employer_phone}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.a_c_employer_phone}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.a_d_company_state_id}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.a_d_company_state_id}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.a_g_company_address}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.a_g_company_address}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.m_residential_type}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.m_residential_type
                  ? RESIDENTIAL_TYPE[props?.oldRecord?.a_a_a_a_a_m_a_job?.m_residential_type]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.n_current_state_id}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.n_current_state_id}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.q_current_address}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.q_current_address}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.r_living_length}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.r_living_length}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.l_education}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.l_education
                  ? EDUCATION[props?.oldRecord?.a_a_a_a_a_m_a_job?.l_education]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.k_preferred_language}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.k_preferred_language
                  ? PREFERRED_LANGUAGE[props?.oldRecord?.a_a_a_a_a_m_a_job?.k_preferred_language]
                      ?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.j_religion}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.j_religion
                  ? RELIGION[props?.oldRecord?.a_a_a_a_a_m_a_job?.j_religion]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.h_marital_status}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.h_marital_status
                  ? MARITAL_STATUS[props?.oldRecord?.a_a_a_a_a_m_a_job?.h_marital_status]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.i_children_count}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.i_children_count}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.e_personal_loan_purpose}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.e_personal_loan_purpose
                  ? PERSONAL_LOAN_PURPOSE[
                      props?.oldRecord?.a_a_a_a_a_m_a_job?.e_personal_loan_purpose
                    ]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.f_expect_loan_days}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.f_expect_loan_days}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.g_expect_loan_amount}>
                {props?.oldRecord?.a_a_a_a_a_m_a_job?.g_expect_loan_amount}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.created_at}>
                {moment(props?.oldRecord?.a_a_a_a_a_m_a_job?.created_at).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}
              </Descriptions.Item>
              <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_a_job.d_valid_date}>
                {moment(props?.oldRecord?.a_a_a_a_a_m_a_job?.d_valid_date).format('YYYY-MM-DD')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <ReviewForm
        onSubmit={async (afterStatus, item) => {
          handleReviewModalVisible(false);
          if (item == 'idNumber') {
            handleIdNumberStatus(afterStatus);
          }
          if (item == 'contact') {
            handleContactStatus(afterStatus);
          }
          if (item == 'job') {
            handleJobStatus(afterStatus);
          }
          if (item == 'loanBank') {
            handleLoanBankStatus(afterStatus);
          }
        }}
        onCancel={() => {
          handleReviewModalVisible(false);
        }}
        modalVisible={reviewModalVisible}
        reasonIds={reasonIds}
        reasonsDetail={reasonsDetail}
        item={currentItem}
        id={props?.oldRecord?.id}
        title={modelTitle}
        status={currentStatus}
      />
    </>
  );
};

export default VerifyDetail;

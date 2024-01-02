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
import { getAdminV1GVerifiesId as show } from '@/services/ant-design-pro/GVerify';
import { useIntl } from '@@/exports';
import { PhoneOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Image, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';

import HistoryList from '@/pages/Borrow/VerifyList/components/HistoryList';

const VerifyDetail: React.FC = () => {
  const intl = useIntl();
  const params = useParams<{ id: string; verifyId?: string }>();
  const [oldRecord, setOldRecord] = useState<TableListItem>();

  const [reviewModalVisible, handleReviewModalVisible] = useState<boolean>(false);
  const [historyListModalVisible, handleHistoryListModalVisible] = useState<boolean>(false);
  const [historyListModelTitle, handleHistoryListModelTitle] = useState<string>('');
  //当前审核原因
  const [reasonIds, handleReasonIds] = useState<string>('');
  const [reasonsDetail, handleReasonsDetail] = useState<string>('');
  const [historyList, handleHistoryList] = useState<any[]>([]);
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
    /** table */
    const _show = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await show({ id: params.verifyId ? params.verifyId : params.id });
      // res.data.a_a_a_a_a_m_idnumber =
      if (res.data && res.data.a_a_a_a_a_q_a_ocrs && res.data.a_a_a_a_a_q_a_ocrs.length > 0) {
        res.data.a_a_a_a_a_q_a_ocr =
          res.data.a_a_a_a_a_q_a_ocrs[res.data.a_a_a_a_a_q_a_ocrs.length - 1];
      }
      if (res.data && res.data.a_a_a_a_a_m_idnumbers && res.data.a_a_a_a_a_m_idnumbers.length > 0) {
        res.data.a_a_a_a_a_m_idnumber =
          res.data.a_a_a_a_a_m_idnumbers[res.data.a_a_a_a_a_m_idnumbers.length - 1];
      }
      if (res.data && res.data.a_a_a_a_a_o_contacts && res.data.a_a_a_a_a_o_contacts.length > 0) {
        res.data.a_a_a_a_a_o_contact =
          res.data.a_a_a_a_a_o_contacts[res.data.a_a_a_a_a_o_contacts.length - 1];
      }
      if (res.data && res.data.a_a_a_a_a_m_a_jobs && res.data.a_a_a_a_a_m_a_jobs.length > 0) {
        res.data.a_a_a_a_a_m_a_job =
          res.data.a_a_a_a_a_m_a_jobs[res.data.a_a_a_a_a_m_a_jobs.length - 1];
      }
      if (
        res.data &&
        res.data.a_a_a_a_a_a_o_loan_banks &&
        res.data.a_a_a_a_a_a_o_loan_banks.length > 0
      ) {
        res.data.a_a_a_a_a_a_o_loan_bank =
          res.data.a_a_a_a_a_a_o_loan_banks[res.data.a_a_a_a_a_a_o_loan_banks.length - 1];
      }
      setOldRecord(res.data);
      return {
        data: res.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: res.success,
      };
    };
    _show().then((_res) => {
      // @ts-ignore
      handleIdNumberStatus(_res.data?.j_idnumber_verify_status);
      // @ts-ignore
      handleContactStatus(_res.data?.n_contact_verify_status);
      // @ts-ignore
      handleJobStatus(_res.data?.p_job_verify_status);
      // @ts-ignore
      handleLoanBankStatus(_res.data?.r_loan_bank_verify_status);
      // @ts-ignore
      handleIdNumberRawStatus(_res.data?.a_a_a_a_a_m_idnumber?.c_status);
      // @ts-ignore
      handleContactRawStatus(_res.data?.a_a_a_a_a_o_contact?.c_status);
      // @ts-ignore
      handleJobRawStatus(_res.data?.a_a_a_a_a_m_a_job?.c_status);
      // @ts-ignore
      handleLoanBankRawStatus(_res.data?.a_a_a_a_a_a_o_loan_bank?.b_status);
    });
  }, [params.id]);
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
    console.log(contactRawStatus);
    handleReasonIds(_reasonIds);
    handleReasonsDetail(_reasonsDetail);
    handleReasonsDetail(_reasonsDetail);
    handleCurrentItem(_currentItem);
    handleReviewModalVisible(true);
    handleModelTitle(_modelTitle);
    handleCurrentStatus(_currentStatus);
  };

  const onHistoryClick = async (_currentItem: string, _modelTitle: string, _historyList: any[]) => {
    handleCurrentItem(_currentItem);
    handleHistoryListModalVisible(true);
    handleHistoryListModelTitle(_modelTitle);
    handleHistoryList(_historyList);
  };
  const idnumberReasons = oldRecord?.a_a_a_a_a_m_idnumber?.b_d_reasons?.split(',');
  const nameRed = idnumberReasons?.find((item) => ['5'].includes(item));
  const idNumberRed = idnumberReasons?.find((item) => ['1', '2', '3', '4', '6'].includes(item));
  const contactReasons = oldRecord?.a_a_a_a_a_o_contact?.a_l_reasons?.split(',');
  const contact1Red = contactReasons?.find((item) => ['3', '4', '9', '11'].includes(item));
  const contact1BorrowRed = contactReasons?.find((item) => ['3', '4'].includes(item));
  const contact2Red = contactReasons?.find((item) => ['7', '8', '10', '12'].includes(item));
  const contact2BorrowRed = contactReasons?.find((item) => ['7', '8'].includes(item));
  const loanBankReasons = oldRecord?.a_a_a_a_a_a_o_loan_bank?.y_reasons?.split(',');
  const loanBankRed = loanBankReasons?.find((item) =>
    ['1', '2', '3', '4', '5', '6', '7'].includes(item),
  );
  const nameIsSame =
    (oldRecord?.a_a_a_a_a_m_idnumber?.a_l_name_same &&
      oldRecord?.a_a_a_a_a_m_idnumber?.a_l_name_same === 'n') ||
    (oldRecord?.a_a_a_a_a_m_idnumber?.a_m_name2_same &&
      oldRecord?.a_a_a_a_a_m_idnumber?.a_m_name2_same === 'n') ||
    (oldRecord?.a_a_a_a_a_m_idnumber?.a_n_name3_same &&
      oldRecord?.a_a_a_a_a_m_idnumber?.a_n_name3_same === 'n') ||
    (oldRecord?.a_a_a_a_a_m_idnumber?.a_o_name4_same &&
      oldRecord?.a_a_a_a_a_m_idnumber?.a_o_name4_same === 'n');
  const idNumberIsSame =
    (oldRecord?.a_a_a_a_a_m_idnumber?.a_h_id_number_same &&
      oldRecord?.a_a_a_a_a_m_idnumber?.a_h_id_number_same === 'n') ||
    (oldRecord?.a_a_a_a_a_m_idnumber?.a_i_id_number2_same &&
      oldRecord?.a_a_a_a_a_m_idnumber?.a_i_id_number2_same === 'n') ||
    (oldRecord?.a_a_a_a_a_m_idnumber?.a_j_id_number3_same &&
      oldRecord?.a_a_a_a_a_m_idnumber?.a_j_id_number3_same === 'n') ||
    (oldRecord?.a_a_a_a_a_m_idnumber?.a_k_id_number4_same &&
      oldRecord?.a_a_a_a_a_m_idnumber?.a_k_id_number4_same === 'n');

  // @ts-ignore
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
            title={intl.formatMessage({ id: 'pages.Borrow.Idnumber', defaultMessage: '' })}
            bodyStyle={{ padding: 0 }}
            extra={
              <Row gutter={16}>
                <Col>
                  {oldRecord &&
                  oldRecord.a_a_a_a_a_m_idnumbers &&
                  oldRecord!.a_a_a_a_a_m_idnumbers?.length > 1 ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        onHistoryClick(
                          'idNumber',
                          intl.formatMessage({ id: 'pages.Borrow.Idnumber', defaultMessage: '' }),
                          oldRecord!.a_a_a_a_a_m_idnumbers!,
                        )
                      }
                    >
                      {`${intl.formatMessage({
                        id: 'pages.Borrow.VerifyDetail.VerifyHistory',
                        defaultMessage: '',
                      })}(${oldRecord!.a_a_a_a_a_m_idnumbers?.length})`}
                    </Button>
                  ) : (
                    ''
                  )}
                </Col>
                <Col>
                  {idNumberRawStatus === 30 ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        onReviewClick(
                          'idNumber',
                          intl.formatMessage({ id: 'pages.Borrow.Idnumber', defaultMessage: '' }),
                          oldRecord!.a_a_a_a_a_m_idnumber!.b_d_reasons!,
                          oldRecord!.a_a_a_a_a_m_idnumber!.b_e_reasons_detail!,
                          idNumberStatus,
                        )
                      }
                    >
                      {idNumberStatus === 30
                        ? intl.formatMessage({
                            id: 'pages.Borrow.VerifyDetail.review',
                            defaultMessage: '',
                          })
                        : intl.formatMessage({
                            id: 'pages.Borrow.VerifyDetail.review_reason',
                            defaultMessage: '',
                          })}
                    </Button>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            }
          >
            <Descriptions bordered column={{ xs: 1, sm: 1, md: 2, xl: 2, xxl: 2 }} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.q_name1',
                  defaultMessage: '',
                })}
                labelStyle={nameRed ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {oldRecord?.a_a_a_a_a_m_idnumber?.q_name1}
                {oldRecord?.a_a_a_a_a_m_idnumber?.r_name2}
                {oldRecord?.a_a_a_a_a_m_idnumber?.s_name3}
                {oldRecord?.a_a_a_a_a_m_idnumber?.t_name4}
                {!nameIsSame && oldRecord?.a_a_a_a_a_q_a_ocr?.l_name1 ? (
                  <span style={{ color: 'red' }}>
                    {oldRecord!.a_a_a_a_a_q_a_ocr!.l_name1}
                    {oldRecord!.a_a_a_a_a_q_a_ocr!.m_name2}
                    {oldRecord!.a_a_a_a_a_q_a_ocr!.n_name3}
                    {oldRecord!.a_a_a_a_a_q_a_ocr!.o_name4}
                  </span>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item
                labelStyle={idNumberRed ? { color: 'red', fontWeight: 'bold' } : {}}
                label={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.m_idnumber',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_idnumber?.m_idnumber}
                {!idNumberIsSame && oldRecord?.a_a_a_a_a_q_a_ocr?.h_idnumber ? (
                  <span style={{ color: 'red' }}>{oldRecord!.a_a_a_a_a_q_a_ocr!.h_idnumber}</span>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.u_gender',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_idnumber?.u_gender
                  ? GENDER_ENUM[oldRecord?.a_a_a_a_a_m_idnumber?.u_gender]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.v_birthday',
                  defaultMessage: '',
                })}
              >
                {moment(oldRecord?.a_a_a_a_a_m_idnumber?.v_birthday).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.x_idnumber_state_id',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_idnumber?.x_idnumber_state_id}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.a_b_idnumber_address',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_idnumber?.a_b_idnumber_address}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.a_y_email',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_idnumber?.a_y_email}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.a_z_whatapp',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_idnumber?.a_z_whatapp}
              </Descriptions.Item>
              {/*            <Descriptions.Item label={intl.formatMessage({ id: 'pages.Borrow.Idnumber.b_a_facebook}>{oldRecord?.a_a_a_a_a_m_idnumber?.b_a_facebook', defaultMessage: '' })}</Descriptions.Item>
            <Descriptions.Item label={FieldLabels.a_a_a_a_a_m_idnumber.b_b_line}>{oldRecord?.a_a_a_a_a_m_idnumber?.b_b_line}</Descriptions.Item>*/}
              <Descriptions.Item
                label={intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' })}
              >
                {moment(oldRecord?.a_a_a_a_a_m_idnumber?.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Idnumber.g_valid_date',
                  defaultMessage: '',
                })}
              >
                {moment(oldRecord?.a_a_a_a_a_m_idnumber?.g_valid_date).format('YYYY-MM-DD')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} sm={24} xl={12} xxl={8}>
          <Card
            title={intl.formatMessage({ id: 'pages.Borrow.Contact', defaultMessage: '' })}
            bodyStyle={{ padding: 0 }}
            extra={
              <Row gutter={16}>
                <Col>
                  {oldRecord &&
                  oldRecord.a_a_a_a_a_o_contacts &&
                  oldRecord!.a_a_a_a_a_o_contacts?.length > 1 ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        onHistoryClick(
                          'contact',
                          intl.formatMessage({ id: 'pages.Borrow.Contact', defaultMessage: '' }),
                          oldRecord!.a_a_a_a_a_o_contacts!,
                        )
                      }
                    >
                      {`${intl.formatMessage({
                        id: 'pages.Borrow.VerifyDetail.VerifyHistory',
                        defaultMessage: '',
                      })}(${oldRecord!.a_a_a_a_a_o_contacts?.length})`}
                    </Button>
                  ) : (
                    ''
                  )}
                </Col>
                <Col>
                  {contactStatus === 30 ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        onReviewClick(
                          'contact',
                          intl.formatMessage({ id: 'pages.Borrow.Contact', defaultMessage: '' }),
                          oldRecord!.a_a_a_a_a_o_contact!.a_l_reasons!,
                          oldRecord!.a_a_a_a_a_o_contact!.a_n_reasons_detail!,
                          contactStatus,
                        )
                      }
                    >
                      {contactStatus === 30
                        ? intl.formatMessage({
                            id: 'pages.Borrow.VerifyDetail.review',
                            defaultMessage: '',
                          })
                        : intl.formatMessage({
                            id: 'pages.Borrow.VerifyDetail.review_reason',
                            defaultMessage: '',
                          })}
                    </Button>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            }
          >
            <Descriptions bordered column={{ xs: 1, sm: 1, md: 2, xl: 2, xxl: 2 }} size="small">
              {/*<Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.j_contact1_relation}>{oldRecord?.a_a_a_a_a_o_contact?.j_contact1_relation}</Descriptions.Item>*/}
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Contact.contact1_name',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_o_contact?.contact1_name} (
                {oldRecord?.a_a_a_a_a_o_contact?.j_contact1_relation
                  ? CONTACT_RELATION_ENUM[oldRecord?.a_a_a_a_a_o_contact?.j_contact1_relation]?.text
                  : ''}
                )
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Contact.contact1_phone',
                  defaultMessage: '',
                })}
                labelStyle={
                  contact1Red
                    ? {
                        color: 'red',
                        fontWeight: 'bold',
                      }
                    : {}
                }
              >
                {oldRecord?.a_a_a_a_a_o_contact?.contact1_phone}
                <PhoneOutlined />
              </Descriptions.Item>
              {/*联系人1*/}
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Contact.a_o_contact1_sms_contact_id',
                  defaultMessage: '',
                })}
                labelStyle={contact1BorrowRed ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {oldRecord?.a_a_a_a_a_o_contact?.a_o_contact1_sms_contact_id}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Contact.a_p_contact1_contact_record_id',
                  defaultMessage: '',
                })}
                labelStyle={contact1BorrowRed ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {/*//todo 跳转所在订单*/}
                {oldRecord?.a_a_a_a_a_o_contact?.a_p_contact1_contact_record_id}
              </Descriptions.Item>
              {/*联系人2*/}
              {/*<Descriptions.Item label={FieldLabels.a_a_a_a_a_o_contact.m_contact2_relation}>{oldRecord?.a_a_a_a_a_o_contact?.m_contact2_relation}</Descriptions.Item>*/}
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Contact.contact2_name',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_o_contact?.contact2_name} (
                {oldRecord?.a_a_a_a_a_o_contact?.m_contact2_relation
                  ? CONTACT2_RELATION_ENUM[oldRecord?.a_a_a_a_a_o_contact?.m_contact2_relation]
                      ?.text
                  : ''}
                )
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Contact.contact2_phone',
                  defaultMessage: '',
                })}
                labelStyle={
                  contact2Red
                    ? {
                        color: 'red',
                        fontWeight: 'bold',
                      }
                    : {}
                }
              >
                {oldRecord?.a_a_a_a_a_o_contact?.contact2_phone}
                <PhoneOutlined />
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Contact.a_q_contact2_sms_contact_id',
                  defaultMessage: '',
                })}
                labelStyle={contact2BorrowRed ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {oldRecord?.a_a_a_a_a_o_contact?.a_q_contact2_sms_contact_id}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Contact.a_r_contact2_contact_record_id',
                  defaultMessage: '',
                })}
                labelStyle={contact2BorrowRed ? { color: 'red', fontWeight: 'bold' } : {}}
              >
                {oldRecord?.a_a_a_a_a_o_contact?.a_r_contact2_contact_record_id}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' })}
              >
                {moment(oldRecord?.a_a_a_a_a_o_contact?.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Contact.b_valid_date',
                  defaultMessage: '',
                })}
              >
                {moment(oldRecord?.a_a_a_a_a_o_contact?.b_valid_date).format('YYYY-MM-DD')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} sm={24} xl={12} xxl={8}>
          <Card
            title={intl.formatMessage({ id: 'pages.Borrow.BankCard', defaultMessage: '' })}
            bodyStyle={{ padding: 0 }}
            extra={
              <Row gutter={16}>
                <Col>
                  {oldRecord &&
                  oldRecord.a_a_a_a_a_a_o_loan_banks &&
                  oldRecord!.a_a_a_a_a_a_o_loan_banks?.length > 1 ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        onHistoryClick(
                          'loanBank',
                          intl.formatMessage({ id: 'pages.Borrow.BankCard', defaultMessage: '' }),
                          oldRecord!.a_a_a_a_a_a_o_loan_banks!,
                        )
                      }
                    >
                      {`${intl.formatMessage({
                        id: 'pages.Borrow.VerifyDetail.VerifyHistory',
                        defaultMessage: '',
                      })}(${oldRecord!.a_a_a_a_a_a_o_loan_banks?.length})`}
                    </Button>
                  ) : (
                    ''
                  )}
                </Col>
                <Col>
                  {loanBankRawStatus === 30 ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        onReviewClick(
                          'loanBank',
                          intl.formatMessage({ id: 'pages.Borrow.BankCard', defaultMessage: '' }),
                          oldRecord!.a_a_a_a_a_a_o_loan_bank!.y_reasons!,
                          oldRecord!.a_a_a_a_a_a_o_loan_bank!.a_b_reasons_detail!,
                          idNumberStatus,
                        )
                      }
                    >
                      {loanBankStatus === 30
                        ? intl.formatMessage({
                            id: 'pages.Borrow.VerifyDetail.review',
                            defaultMessage: '',
                          })
                        : intl.formatMessage({
                            id: 'pages.Borrow.VerifyDetail.review_reason',
                            defaultMessage: '',
                          })}
                    </Button>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            }
          >
            <Descriptions bordered column={{ xs: 1, sm: 1, md: 1, xl: 1, xxl: 2 }} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.BankCard.d_bank_name',
                  defaultMessage: '',
                })}
                span={2}
              >
                {oldRecord?.a_a_a_a_a_a_o_loan_bank?.d_bank_name
                  ? BANK_NAME[oldRecord?.a_a_a_a_a_a_o_loan_bank!.d_bank_name]!.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.BankCard.f_bank_card_no',
                  defaultMessage: '',
                })}
                labelStyle={
                  loanBankRed
                    ? {
                        color: 'red',
                        fontWeight: 'bold',
                      }
                    : {}
                }
                span={2}
              >
                {oldRecord?.a_a_a_a_a_a_o_loan_bank?.f_bank_card_no}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.BankCard.s_first_name',
                  defaultMessage: '',
                })}
                span={2}
              >
                {oldRecord?.a_a_a_a_a_a_o_loan_bank?.s_first_name}
                {oldRecord?.a_a_a_a_a_a_o_loan_bank?.t_middle_name}
                {oldRecord?.a_a_a_a_a_a_o_loan_bank?.u_last_name}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.BankCard.s_first_name',
                  defaultMessage: '',
                })}
                span={2}
              >
                {oldRecord?.a_a_a_a_a_a_o_loan_bank?.s_first_name}
                {oldRecord?.a_a_a_a_a_a_o_loan_bank?.t_middle_name}
                {oldRecord?.a_a_a_a_a_a_o_loan_bank?.u_last_name}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' })}
              >
                {moment(oldRecord?.a_a_a_a_a_a_o_loan_bank?.created_at).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.BankCard.c_valid_date',
                  defaultMessage: '',
                })}
              >
                {moment(oldRecord?.a_a_a_a_a_a_o_loan_bank?.c_valid_date).format('YYYY-MM-DD')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} sm={24} xl={12} xxl={24}>
          <Card
            title={intl.formatMessage({ id: 'pages.Borrow.Job', defaultMessage: '' })}
            bodyStyle={{ padding: 0 }}
            extra={
              jobRawStatus === 30 ? (
                <Button
                  type="primary"
                  onClick={() =>
                    onReviewClick(
                      'job',
                      intl.formatMessage({ id: 'pages.Borrow.Job', defaultMessage: '' }),
                      oldRecord!.a_a_a_a_a_m_a_job!.a_q_reasons!,
                      oldRecord!.a_a_a_a_a_m_a_job!.a_r_reasons_detail!,
                      jobStatus,
                    )
                  }
                >
                  {jobStatus === 30
                    ? intl.formatMessage({
                        id: 'pages.Borrow.VerifyDetail.review',
                        defaultMessage: '',
                      })
                    : intl.formatMessage({
                        id: 'pages.Borrow.VerifyDetail.review_reason',
                        defaultMessage: '',
                      })}
                </Button>
              ) : (
                ''
              )
            }
          >
            <Descriptions bordered column={{ xs: 1, sm: 1, md: 2, xl: 2, xxl: 3 }} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.v_employment_status',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.v_employment_status
                  ? EMPLOYMENT_STATUS[oldRecord?.a_a_a_a_a_m_a_job?.v_employment_status]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.w_employment_period',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.w_employment_period
                  ? EMPLOYMENT_PERIOD[oldRecord?.a_a_a_a_a_m_a_job?.w_employment_period]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.x_monthly_salary',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.x_monthly_salary}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.y_payroll_period',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.y_payroll_period
                  ? PAYROLL_PERIOD[oldRecord?.a_a_a_a_a_m_a_job?.y_payroll_period]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ id: 'pages.Borrow.Job.z_pay_day', defaultMessage: '' })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.z_pay_day
                  ? PAY_DAY[oldRecord?.a_a_a_a_a_m_a_job?.z_pay_day]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.a_a_company_name',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.a_a_company_name}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.a_b_employer_name',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.a_b_employer_name}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.a_c_employer_phone',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.a_c_employer_phone}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.a_d_company_state_id',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.a_d_company_state_id}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.a_g_company_address',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.a_g_company_address}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.m_residential_type',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.m_residential_type
                  ? RESIDENTIAL_TYPE[oldRecord?.a_a_a_a_a_m_a_job?.m_residential_type]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.n_current_state_id',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.n_current_state_id}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.q_current_address',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.q_current_address}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.r_living_length',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.r_living_length}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.l_education',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.l_education
                  ? EDUCATION[oldRecord?.a_a_a_a_a_m_a_job?.l_education]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.k_preferred_language',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.k_preferred_language
                  ? PREFERRED_LANGUAGE[oldRecord?.a_a_a_a_a_m_a_job?.k_preferred_language]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.j_religion',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.j_religion
                  ? RELIGION[oldRecord?.a_a_a_a_a_m_a_job?.j_religion]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.h_marital_status',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.h_marital_status
                  ? MARITAL_STATUS[oldRecord?.a_a_a_a_a_m_a_job?.h_marital_status]?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.i_children_count',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.i_children_count}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.e_personal_loan_purpose',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.e_personal_loan_purpose
                  ? PERSONAL_LOAN_PURPOSE[oldRecord?.a_a_a_a_a_m_a_job?.e_personal_loan_purpose]
                      ?.text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.f_expect_loan_days',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.f_expect_loan_days}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.g_expect_loan_amount',
                  defaultMessage: '',
                })}
              >
                {oldRecord?.a_a_a_a_a_m_a_job?.g_expect_loan_amount}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' })}
              >
                {moment(oldRecord?.a_a_a_a_a_m_a_job?.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: 'pages.Borrow.Job.d_valid_date',
                  defaultMessage: '',
                })}
              >
                {moment(oldRecord?.a_a_a_a_a_m_a_job?.d_valid_date).format('YYYY-MM-DD')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Row
        gutter={[
          { xs: 10, sm: 12, md: 12 },
          { xs: 10, sm: 12, md: 12 },
        ]}
        style={{ marginTop: 12 }}
      >
        <Col xs={24} sm={24} xl={24} xxl={24}>
          <Card
            title={intl.formatMessage({ id: 'pages.Borrow.Ocr', defaultMessage: '' })}
            bodyStyle={{ padding: 0 }}
          >
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              {oldRecord &&
              oldRecord.a_a_a_a_a_q_a_ocrs &&
              oldRecord!.a_a_a_a_a_q_a_ocrs!.length > 0
                ? oldRecord!.a_a_a_a_a_q_a_ocrs!.map((item: API.QAOcr, index) => {
                    return <Image key={index} width={200} src={item.x_picture_1} />;
                  })
                : ''}
            </Image.PreviewGroup>
          </Card>
        </Col>
      </Row>
      <ReviewForm
        onSubmit={async (afterStatus, item) => {
          handleReviewModalVisible(false);
          if (item === 'idNumber') {
            handleIdNumberStatus(afterStatus);
          }
          if (item === 'contact') {
            handleContactStatus(afterStatus);
          }
          if (item === 'job') {
            handleJobStatus(afterStatus);
          }
          if (item === 'loanBank') {
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
        id={oldRecord?.id}
        title={modelTitle}
        status={currentStatus}
      />
      <HistoryList
        onCancel={() => {
          handleHistoryListModalVisible(false);
        }}
        modalVisible={historyListModalVisible}
        item={currentItem}
        title={historyListModelTitle}
        data={historyList}
      />
    </>
  );
};

export default VerifyDetail;

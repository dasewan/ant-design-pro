import type {ProFormInstance} from '@ant-design/pro-form';
import {ModalForm, ProFormDateTimePicker, ProFormRadio, ProFormSelect, ProFormText,} from '@ant-design/pro-form';
import type {ProFieldRequestData} from '@ant-design/pro-utils';
import type {RequestOptionsType} from '@ant-design/pro-utils/lib/typing';
import {Col, Image, message, Row} from 'antd';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {useIntl} from '@@/exports';

import {
  postAdminV1GCMarketingHistories as storeGCMarketingHistories
} from '@/services/ant-design-pro/GCMarketingHistory';
import { VERIFY_STATUS_OPTION } from '@/pages/enums';

export type FormValueType = Partial<API.GBMarketing>;
export type FormRecord = API.GBMarketing;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  marketingIds: string;
  smss: RequestOptionsType[];
  smsViews: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const MarketingForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  /** 短信模版enum */
  // const [smss, setSmss] = useState<RequestOptionsType[]>([]);
  /** 短信模版预览enum */
  // const [smsViews, setSmsViews] = useState<RequestOptionsType[]>([]);
  /** 已选择的预览内容 */
  const [smsSelectedView, setSmsSelectedView] = useState<string>('');
  // const [useViewCountShow, setUseViewCountShow] = useState<boolean>(false);
  /**
   * 开始营销
   * @param fields
   */
  const _handle = async (fields: FormValueType) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    // props.values.id
    // @ts-ignore
    fields.h_begin_at = moment(fields.h_begin_at).format('YYYY-MM-DD HH:mm:ss');
    try {
      await storeGCMarketingHistories({
        // @ts-ignore
        ids: props.marketingIds,
        ...fields,
      });
      hide();
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
      return true;
    } catch (error) {
      hide();
      // @ts-ignore
      message.error(error.response.data.message);
      return false;
    }
  };

  /**
   * 查询短信enum
   */
  const _getSMSsEnum: ProFieldRequestData = async () => {
    return props.smss;
  };

  return (
    <ModalForm<FormRecord>
      open={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onOpenChange={(visible) => {
        formRef.current?.resetFields();
        if (!visible) {
          setSmsSelectedView('');
          // setUseViewCountShow(false);
          props.onCancel();
        }
      }}
      formRef={formRef}
      onFinish={async (formData) => {
        const success = await _handle(formData);
        return props.onSubmit(success);
      }}
      params={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      initialValues={{
        l_type: 1,
        o_send_email: 1,
      }}
    >
      <ProFormSelect
        name="c_sms_templete_id"
        label={intl.formatMessage({
          id: 'pages.userManager.marketingHistory.c_sms_templete_id',
          defaultMessage: '',
        })}
        // request={_getSMSsEnum}
        options={props.smss}
        fieldProps={{
          onChange: (value) => {
            // @ts-ignore
            setSmsSelectedView(
              props.smsViews!.find((item) => {
                return item.value === value;
              })?.label! as string
            );
          },
        }}
        rules={[{required: true}]}
      />
      {smsSelectedView !== '' ? (
        <div>
          <Row>
            <Col span={4} style={{textAlign: 'right'}}>
              {intl.formatMessage({
                id: 'pages.userManager.marketingHistory.preview',
                defaultMessage: '',
              })}：
            </Col>
            <Col span={14}>{smsSelectedView}</Col>
          </Row>
          <br/>
        </div>
      ) : (
        ''
      )}
      <ProFormText
        // width="md"
        name="p_url"
        label={intl.formatMessage({
          id: 'pages.userManager.marketingHistory.p_url',
          defaultMessage: '',
        })}
        fieldProps={{
          addonBefore: 'https://',
          addonAfter: '/',
        }}
      />
      <ProFormRadio.Group
        name="d_theme_id"
        label={intl.formatMessage({
          id: 'pages.userManager.marketingHistory.d_theme_id',
          defaultMessage: '',
        })}
        request={async () => [
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_1.jpg"
                alt={`${intl.formatMessage({
                  id: 'pages.userManager.marketingHistory.d_theme_id',
                  defaultMessage: '',
                })}a`}
              />
            ),
            value: '1',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_2.jpg"
                alt={`${intl.formatMessage({
                  id: 'pages.userManager.marketingHistory.d_theme_id',
                  defaultMessage: '',
                })}b`}
              />
            ),
            value: '2',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_3.jpg"
                alt={`${intl.formatMessage({
                  id: 'pages.userManager.marketingHistory.d_theme_id',
                  defaultMessage: '',
                })}c`}
              />
            ),
            value: '3',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_4.jpg"
                alt={`${intl.formatMessage({
                  id: 'pages.userManager.marketingHistory.d_theme_id',
                  defaultMessage: '',
                })}d`}
              />
            ),
            value: '4',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_5.jpg"
                alt={`${intl.formatMessage({
                  id: 'pages.userManager.marketingHistory.d_theme_id',
                  defaultMessage: '',
                })}e`}
              />
            ),
            value: '5',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_6.jpg"
                alt={`${intl.formatMessage({
                  id: 'pages.userManager.marketingHistory.d_theme_id',
                  defaultMessage: '',
                })}f`}
              />
            ),
            value: '6',
          },
        ]}
        rules={[{required: true}]}
      />
      <ProFormRadio.Group
        tooltip={<div>{intl.formatMessage({
          id: 'pages.userManager.marketingHistory.o_send_email_tip',
          defaultMessage: '',
        })}</div>}
        name="o_send_email"
        label={intl.formatMessage({
          id: 'pages.userManager.marketingHistory.o_send_email',
          defaultMessage: '',
        })}
        radioType="button"
        options={[
          {
            label: intl.formatMessage({
              id: 'pages.userManager.marketingHistory.o_send_email_yes',
              defaultMessage: '',
            }),
            value: 1,
          },
          {
            label: intl.formatMessage({
              id: 'pages.userManager.marketingHistory.o_send_email_no',
              defaultMessage: '',
            }),
            value: 2,
          },
        ]}
      />
      <ProFormRadio.Group

        name="l_type"
        label={intl.formatMessage({
          id: 'pages.userManager.marketingHistory.l_type',
          defaultMessage: '',
        })}
        rules={[{required: true}]}
        radioType="button"
        /*        fieldProps={{
                  onChange: (event) => {
                                if (event.target.value === 5) {
                                  setUseViewCountShow(true);
                                } else {
                                  setUseViewCountShow(false);
                                }
                  },
                }}*/
        options={[
          {
            label: intl.formatMessage({
              id: 'pages.userManager.marketingHistory.un_register',
              defaultMessage: '',
            }),
            value: 1,
          },
          {
            label: intl.formatMessage({
              id: 'pages.userManager.marketingHistory.un_view',
              defaultMessage: '',
            }),
            value: 2,
          },
          {
            label: intl.formatMessage({
              id: 'pages.userManager.marketingHistory.viewed',
              defaultMessage: '',
            }),
            value: 3,
          },
        ]}
      />
      {/*      {useViewCountShow ? (
        <ProFormDigit
          label="查看次数"
          name="n_user_view_count"
          min={1}
          max={10}
          fieldProps={{ precision: 0 }}
        />
      ) : (
        ''
      )}*/}
      <ProFormDateTimePicker
        name="h_begin_at"
        label={intl.formatMessage({
          id: 'pages.userManager.marketingHistory.h_begin_at',
          defaultMessage: '',
        })}
        rules={[{required: true}]}
      />
      <ProFormText
        // width="md"
        name="g_comment"
        label={intl.formatMessage({
          id: 'pages.userManager.marketingHistory.g_comment',
          defaultMessage: '',
        })}
      />
    </ModalForm>
  );
};

export default MarketingForm;

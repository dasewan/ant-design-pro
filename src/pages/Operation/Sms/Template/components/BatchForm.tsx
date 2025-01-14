import { postAdminV1HJSmsTemplates as store } from '@/services/ant-design-pro/HJSmsTemplate';
import { useIntl } from '@@/exports';
import {ProFormInstance, ProFormRadio} from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import type { RequestOptionsType } from '@ant-design/pro-utils/lib/typing';
import { message } from 'antd';
import React, { useRef, useState } from 'react';
import {VERIFY_STATUS_MAP} from "@/pages/enums";

export type FormValueType = Partial<API.HJSmsTemplate>;
export type FormRecord = API.HJSmsTemplate;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  batchIds: string;
  channels: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const BatchForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  /** 渠道enum */
  /**
   * 导入白名单
   * @param fields
   */
  const _handle = async (fields: FormValueType) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    // props.values.id
    try {
      // @ts-ignore
      await store({
        batch_ids: props.batchIds,
        ...fields,
      });
      hide();
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
      return true;
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      return false;
    }
  };

  return (
    <ModalForm<FormRecord>
      open={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onOpenChange={(visible) => {
        formRef.current?.resetFields();
        if (!visible) {
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

      submitter={{
        submitButtonProps: {
        },
      }}
    >
      <ProFormText
        // width="md"
        colProps={{ span: 10 }}
        name="before_sender_id"
        label={intl.formatMessage({
          id: 'pages.HJSmsTemplate.before_sender_id',
          defaultMessage: '',
        })}
      />
      <ProFormText
        // width="md"
        colProps={{ span: 10 }}
        name="after_sender_id"
        label={intl.formatMessage({
          id: 'pages.HJSmsTemplate.after_sender_id',
          defaultMessage: '',
        })}
      />
      <ProFormSelect
        name="before_sms_channel_id"
        label={intl.formatMessage({
          id: 'pages.HJSmsTemplate.before_sms_channel_id',
          defaultMessage: '',
        })}
        options={props.channels}
        placeholder="Please select a channel"
      />
      <ProFormSelect
        name="after_sms_channel_id"
        label={intl.formatMessage({
          id: 'pages.HJSmsTemplate.after_sms_channel_id',
          defaultMessage: '',
        })}
        options={props.channels}
        placeholder="Please select a channel"
      />
      <ProFormRadio.Group
        name="update_role"
        label="是否变更分流"
        radioType="button"
        options={[
          {
            label: intl.formatMessage({
                id: 'pages.common.yes',
                defaultMessage: '',
              }),
            value: 1,
          },
          {
            label: intl.formatMessage({
                id: 'pages.common.no',
                defaultMessage: '',
              }),
            value: 2,
          },
        ]}
      />


    </ModalForm>
  );
};

export default BatchForm;

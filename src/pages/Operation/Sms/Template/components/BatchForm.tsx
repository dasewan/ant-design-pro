import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { postAdminV1GBMarketings as store } from '@/services/ant-design-pro/GBMarketing';
import { useIntl } from '@@/exports';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { ProFieldRequestData } from '@ant-design/pro-utils';
import type { RequestOptionsType } from '@ant-design/pro-utils/lib/typing';
import { message } from 'antd';
import type { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import React, { useRef, useState } from 'react';
import { request } from 'umi';

export type FormValueType = Partial<API.GBMarketing>;
export type FormRecord = API.GBMarketing;
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
  /** 提交按钮是否可用 */
  const [_confirmLoading, setConfirmLoading] = useState<boolean>(true);
  /** 设置上传文件id */
  const [fileId, setFileId] = useState<number>(0);
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
        k_admin_file_id: fileId,
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
          setConfirmLoading(true);
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
        l_type: 'delay',
      }}

      submitter={{
        submitButtonProps: {
          disabled: _confirmLoading,
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
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormText
        // width="md"
        colProps={{ span: 10 }}
        name="after_sender_id"
        label={intl.formatMessage({
          id: 'pages.HJSmsTemplate.after_sender_id',
          defaultMessage: '',
        })}
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormSelect
        name="before_sms_channel_id"
        label={intl.formatMessage({
          id: 'pages.HJSmsTemplate.before_sms_channel_id',
          defaultMessage: '',
        })}
        request={_getChannelsEnum}
        placeholder="Please select a channel"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormSelect
        name="after_sms_channel_id"
        label={intl.formatMessage({
          id: 'pages.HJSmsTemplate.after_sms_channel_id',
          defaultMessage: '',
        })}
        request={_getChannelsEnum}
        placeholder="Please select a channel"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />


    </ModalForm>
  );
};

export default BatchForm;

import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { postAdminV1_openAPI_import as importWhite } from '@/services/ant-design-pro/BAWhite';
import { useIntl } from '@@/exports';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { ProFieldRequestData } from '@ant-design/pro-utils';
import type { RequestOptionsType } from '@ant-design/pro-utils/lib/typing';
import { message } from 'antd';
import type { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import React, { useRef, useState } from 'react';
import { request } from 'umi';

export type FormValueType = Partial<API.RBlackComplex>;
export type FormRecord = API.RBlackComplex;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
};

/**
 *
 * @param props
 * @constructor
 */
const ImportForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
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
      await importWhite({
        h_admin_file_id: fileId,
        ...fields,
        a_phone: '',
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

  /**
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length === 0) {
      const res = await getChannelsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_title,
          value: item.id,
        });
      }
      setChannels(data);
      return data;
    } else {
      return channels;
    }
  };

  const uploadFile = async (options: UploadRequestOption) => {
    const formData = new FormData();
    formData.append('file', options.file);
    formData.append('b_type', '4');
    const result = await request<{ success?: boolean; data?: number; message?: string }>(
      '/admin/v1/aLAdminFiles',
      {
        method: 'POST',
        data: formData,
      },
    );
    if (result.success && result.data! > 0) {
      setConfirmLoading(false);
      setFileId(result.data!);
      // @ts-ignore
      options.onSuccess(result.data!);
    } else {
    }
  };
  const _handleBeforeUpload = (file: RcFile) => {
    if (file.size <= 800 * 1024) return true;
    message.error('File must smaller than 2MB!');
    return false;
    /*    return new Promise<void>(() =>
          Modal.confirm({
            title: '文件大小错误',
            content: `文件大于800k,无法上传`,
            onOk() {
              // resolve();
            },
            onCancel() {
              // reject();
            },
          }),
        );*/
  };
  const _handleUploadChange = (info: UploadChangeParam) => info;

  return (
    <ModalForm<FormRecord>
      open={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false, confirmLoading: _confirmLoading }}
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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      initialValues={{
        update_exist: 0,
      }}
      submitter={{
        submitButtonProps: {
          disabled: _confirmLoading,
        },
      }}
    >
      <ProFormUploadButton
        label="Upload"
        accept=".xlsx"
        max={1}
        fieldProps={{
          name: 'file',
          customRequest: uploadFile,
          beforeUpload: _handleBeforeUpload,
          onChange: _handleUploadChange,
          maxCount: 1,
        }}
      />
      <ProFormSelect
        name="e_channel_id"
        label={intl.formatMessage({
          id: 'pages.userManager.bAWhite.e_channel_id',
          defaultMessage: '选择渠道',
        })}
        request={_getChannelsEnum}
        placeholder="Please select a channel"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormDatePicker
        name="i_valid_date"
        label={intl.formatMessage({
          id: 'pages.userManager.bAWhite.i_valid_date',
          defaultMessage: '',
        })}
        tooltip="默认为永久白名单"
      />
      <ProFormDigit
        label={intl.formatMessage({
          id: 'pages.userManager.bAWhite.l_credit_amount',
          defaultMessage: '',
        })}
        name="l_credit_amount"
        min={100}
        max={10000}
        fieldProps={{ precision: 0 }}
        tooltip={intl.formatMessage({
          id: 'pages.userManager.bAWhite.l_credit_amount_tip',
          defaultMessage: '',
        })}
      />
      <ProFormRadio.Group
        name="update_exist"
        label={intl.formatMessage({
          id: 'pages.userManager.bAWhite.update_exist',
          defaultMessage: '',
        })}
        radioType="button"
        options={[
          {
            label: intl.formatMessage({
              id: 'pages.userManager.bAWhite.update_exist_no',
              defaultMessage: '',
            }),
            value: 0,
          },
          {
            label: intl.formatMessage({
              id: 'pages.userManager.bAWhite.update_exist_yes',
              defaultMessage: '',
            }),
            value: 1,
          },
        ]}
      />
      {/*      <ProFormText
        // width="md"
        name="comment"
        label="备注"
        placeholder="请输入备注"
      />*/}
    </ModalForm>
  );
};

export default ImportForm;

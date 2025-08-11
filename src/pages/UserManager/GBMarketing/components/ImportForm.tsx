import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1NLPackagesEnum as getPackagesEnum } from '@/services/ant-design-pro/NLPackage';
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
  /** 包enum */
  const [packages, setPackages] = useState<RequestOptionsType[]>([]);
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
    console.log(fields);
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

  const _getPackagesEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (packages.length === 0) {
      const res = await getPackagesEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setPackages(data);
      return data;
    } else {
      return packages;
    }
  };

  const uploadFile = async (options: UploadRequestOption) => {
    const formData = new FormData();
    formData.append('file', options.file);
    // console.log(options)
    formData.append('b_type', '3');
    // console.log(122343333)
    // console.log(formData)
    // 打印 FormData 的内容
    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
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
        name="q_title"
        label={intl.formatMessage({
          id: 'pages.userManager.gBMarketing.q_title',
          defaultMessage: '',
        })}
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
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
        name="b_channel_id"
        label={intl.formatMessage({
          id: 'pages.userManager.gBMarketing.b_channel_id',
          defaultMessage: '',
        })}
        request={_getChannelsEnum}
        placeholder="Please select a channel"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormSelect
        name="y_package_id"
        label={intl.formatMessage({
          id: 'pages.userManager.gBMarketing.y_package_id',
          defaultMessage: '',
        })}
        request={_getPackagesEnum}
        placeholder="Please select a package"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormRadio.Group
        tooltip={
          <div>
            {intl.formatMessage({
              id: 'pages.userManager.gBMarketing.l_type.delay_tip',
              defaultMessage: '',
            })}
            <br />
            {intl.formatMessage({
              id: 'pages.userManager.gBMarketing.l_type.now_tip',
              defaultMessage: '',
            })}
          </div>
        }
        name="l_type"
        label={intl.formatMessage({
          id: 'pages.userManager.gBMarketing.l_type',
          defaultMessage: '',
        })}
        options={[
          {
            label: intl.formatMessage({
              id: 'pages.userManager.gBMarketing.l_type.delay',
              defaultMessage: '',
            }),
            value: 'delay',
          },
          {
            label: intl.formatMessage({
              id: 'pages.userManager.gBMarketing.l_type.now',
              defaultMessage: '',
            }),
            value: 'now',
          },
        ]}
      />
      <ProFormText
        // width="md"
        name="j_comment"
        label={intl.formatMessage({
          id: 'pages.userManager.gBMarketing.j_comment',
          defaultMessage: '',
        })}
      />
    </ModalForm>
  );
};

export default ImportForm;

import { getChannelsEnum } from '@/pages/UserManager/AUser/service';
import { store } from '@/pages/UserManager/GBMarketing/service';
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
import { message, Modal } from 'antd';
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
    const hide = message.loading('正在配置');
    // props.values.id
    try {
      // @ts-ignore
      await store({
        k_admin_file_id: fileId,
        ...fields,
      });
      hide();
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };

  /**
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length == 0) {
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
    formData.append('b_type', '3');
    const result = await request<{ success?: boolean; data?: number; message?: string }>(
      '/admin/v1/aLAdminFiles',
      {
        method: 'POST',
        body: formData,
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
    if (file.size <= 3 * 1024 * 1024) return Promise.resolve();
    return new Promise<void>((resolve, reject) =>
      Modal.confirm({
        title: '文件大小错误',
        content: `文件大于3M,无法上传`,
        onOk() {
          resolve();
        },
        onCancel() {
          reject();
        },
      }),
    );
  };
  const _handleUploadChange = (info: UploadChangeParam) => info;

  return (
    <ModalForm<FormRecord>
      visible={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false, confirmLoading: _confirmLoading }}
      onVisibleChange={(visible) => {
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
      initialValues={{
        l_type: 'delay',
      }}
    >
      <ProFormText
        // width="md"
        name="m_title"
        label="营销名称"
        placeholder="请输入备注"
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
        }}
      />
      <ProFormSelect
        name="b_channel_id"
        label="Select"
        request={_getChannelsEnum}
        placeholder="Please select a channel"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormRadio.Group
        tooltip={
          <div>
            延时执行：明日凌晨3：45执行
            <br />
            立即执行：执行期间可能会造成系统卡顿
          </div>
        }
        name="l_type"
        label="执行时间"
        options={[
          {
            label: '延时执行',
            value: 'delay',
          },
          {
            label: '立即执行',
            value: 'now',
          },
        ]}
      />
      <ProFormText
        // width="md"
        name="j_comment"
        label="备注"
        placeholder="请输入备注"
      />
    </ModalForm>
  );
};

export default ImportForm;

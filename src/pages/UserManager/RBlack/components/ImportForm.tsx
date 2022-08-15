import { getReasonsEnum } from '@/pages/UserManager/AUser/service';
import { postAdminV1ImportBlack as post } from '@/services/ant-design-pro/RBlack';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { RequestOptionsType } from '@ant-design/pro-utils/lib/typing';
import { message, Modal } from 'antd';
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
  const formRef = useRef<ProFormInstance>();
  /** 拉黑原因enum */
  const [reasons, setReasons] = useState<RequestOptionsType[]>([]);
  /** 提交按钮是否可用 */
  const [_confirmLoading, setConfirmLoading] = useState<boolean>(true);
  /** 设置上传文件id */
  const [fileId, setFileId] = useState<number>(0);
  /**
   * 导入黑名单
   * @param fields
   */
  const _handle = async (fields: FormValueType) => {
    const hide = message.loading('正在配置');
    // props.values.id
    try {
      await post({
        c_batch_sn: fileId,
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
   * 查询拉黑原因enum
   */
  const _getReasonEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (reasons.length == 0) {
      const res = await getReasonsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.c_title,
          value: item.id,
        });
      }
      setReasons(data);
      return data;
    } else {
      return reasons;
    }
  };

  const uploadFile = async (options: UploadRequestOption) => {
    const formData = new FormData();
    formData.append('file', options.file);
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
    >
      <ProFormUploadButton
        label="Upload"
        accept=".xlsx, .sql"
        max={1}
        fieldProps={{
          name: 'file',
          customRequest: uploadFile,
          beforeUpload: _handleBeforeUpload,
          onChange: _handleUploadChange,
        }}
      />

      <ProFormSelect
        name="a_reason_id"
        label="Select"
        request={_getReasonEnum}
        placeholder="Please select a reason"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormDatePicker name="d_overdate" label="结束日期" tooltip="默认为永久黑名单" />
      <ProFormText
        // width="md"
        name="b_comment"
        label="备注"
        placeholder="请输入备注"
      />
    </ModalForm>
  );
};

export default ImportForm;

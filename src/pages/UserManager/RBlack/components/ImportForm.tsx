import { getAdminV1AKReasons as getReasonsEnum } from '@/services/ant-design-pro/AKReason';
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
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    // props.values.id
    try {
      await post({
        c_batch_sn: fileId,
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
   * 查询拉黑原因enum
   */
  const _getReasonEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (reasons.length === 0) {
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
    formData.append('b_type', '1');
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
    message.error('Image must smaller than 2MB!');
    return false;
    /*    return new Promise<void>((resolve, reject) =>
          Modal.confirm({
            title: '文件大小错误',
            content: `文件大于800k,无法上传`,
            onOk() {
              resolve();
            },
            onCancel() {
              reject();
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
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      submitter={{
        submitButtonProps: {
          disabled: _confirmLoading,
        },
      }}
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
          maxCount: 1,
        }}
      />

      <ProFormSelect
        name="a_reason_id"
        label="拉黑原因"
        request={_getReasonEnum}
        placeholder="Please select a reason"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormDatePicker
        name="d_overdate"
        label="结束日期"
        tooltip="默认为90天，90天后自动变为灰名单"
      />
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

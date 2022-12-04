import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import type { ProFieldRequestData } from '@ant-design/pro-utils';
import type { RequestOptionsType } from '@ant-design/pro-utils/lib/typing';
import { message } from 'antd';
import React, { useRef } from 'react';
import { update } from '../service';

export type FormValueType = Partial<API.GBMarketing>;
export type FormRecord = API.GBMarketing;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  moveIds: string;
  admins: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const MoveForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();

  /**
   * 开始营销
   * @param fields
   */
  const _handle = async (fields: FormValueType) => {
    const hide = message.loading('正在配置');
    // props.values.id
    try {
      // @ts-ignore
      await update({
        id: 0,
        // @ts-ignore
        ids: props.moveIds,
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
   * 查询短信enum
   */
  const _getAdminsEnum: ProFieldRequestData = async () => {
    return props.admins;
  };

  return (
    <ModalForm<FormRecord>
      visible={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
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
        l_type: 1,
        o_send_email: 1,
      }}
    >
      <ProFormSelect
        name="b_admin_id"
        label="审核管理员"
        request={_getAdminsEnum}
        placeholder="Please select a admin"
        rules={[{ required: true, message: 'Please select your admin!' }]}
      />
    </ModalForm>
  );
};

export default MoveForm;

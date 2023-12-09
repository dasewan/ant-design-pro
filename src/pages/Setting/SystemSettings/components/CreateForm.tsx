import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';

import { putAdminV1GHSettingsId as update } from '@/services/ant-design-pro/GHSetting';
import { message } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';

export type FormValueType = Partial<API.GHSetting>;
export type FormRecord = API.GHSetting;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: API.GHSetting) => Promise<void>;
  modalVisible: boolean;
  data: API.GHSetting;
};

/**
 *
 * @param props
 * @constructor
 */
const CreateForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();
  const [oldRecord, setOldRecord] = useState<API.GHSetting>();
  /**
   * 提交风控字段
   * @param values
   */
  const onFinish = async (values: FormValueType) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    if (moment().diff(currentTableListItemMoment) > 3000000) {
      hide();
      message.error('配置超时！');
      return false;
    }
    try {
      // @ts-ignore
      const res = await update({ id: props.data.id, ...values });
      if (!res.success) {
        message.error(res.message);
        return false;
      }
      hide();
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
      props.data.e_value = values.e_value!.toString();
      await props.onSubmit({ ...props.data });
      return;
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
      // @ts-ignore
      request={async () => {
        setCurrentTableListItemMoment(moment());
        setOldRecord(props.data);
        return props.data;
      }}
      formRef={formRef}
      onFinish={async (formData) => {
        await onFinish(formData);
      }}
      params={{}}
      layout="inline"
      labelCol={{ span: 20 }}
      wrapperCol={{ offset: 0, span: 24 }}
      initialValues={{}}
    >
      {props.data?.h_field_type === 'ProFormText' ? (
        <ProFormText
          label={props.data.a_title}
          name="e_value"
          rules={[
            { required: true, message: `请输入${props.data.a_title}` },
            {
              validator: (_, value) => {
                return value === oldRecord?.e_value || !oldRecord?.e_value
                  ? Promise.resolve()
                  : Promise.reject(new Error(`旧值：   ${oldRecord?.e_value}`));
              },
              warningOnly: true,
            },
          ]}
          placeholder={`请输入${props.data.a_title}`}
        />
      ) : (
        ''
      )}
      {props.data?.h_field_type === 'ProFormDigit' ? (
        <ProFormDigit
          label={props.data.a_title}
          name="e_value"
          rules={[
            { required: true, message: `请输入${props.data.a_title}` },
            {
              validator: (_, value) => {
                return value === oldRecord?.e_value || !oldRecord?.e_value
                  ? Promise.resolve()
                  : Promise.reject(new Error(`旧值：   ${oldRecord?.e_value}`));
              },
              warningOnly: true,
            },
          ]}
          fieldProps={{ precision: 0 }}
          placeholder={`请输入${props.data.a_title}`}
        />
      ) : (
        ''
      )}
    </ModalForm>
  );
};

export default CreateForm;

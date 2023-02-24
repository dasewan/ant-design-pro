import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

import {
  getAdminV1ANRiskItemCatsId as show,
  postAdminV1ANRiskItemCats as store,
  putAdminV1ANRiskItemCatsId as update,
} from '@/services/ant-design-pro/ANRiskItemCat';
import { message } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem } from '../data';
import { FieldIndex, FieldLabels } from '../service';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  id: number;
};

/**
 *
 * @param props
 * @constructor
 */
const CreateForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();
  const [oldRecord, setOldRecord] = useState<TableListItem>();

  /**
   * 提交风控字段
   * @param values
   */
  const onFinish = async (values: FormValueType) => {
    const hide = message.loading('正在配置');
    if (moment().diff(currentTableListItemMoment) > 3000000) {
      console.log(moment().diff(currentTableListItemMoment));
      hide();
      message.error('配置超时！');
      return false;
    }
    try {
      if (props.id > 0) {
        delete values.b_name;
        // @ts-ignore
        const res = await update({ id: props.id, ...values });
        if (!res.success) {
          message.error(res.message);
          return false;
        }
      } else {
        const res = await store(values);
        if (!res.success) {
          message.error(res.message);
          return false;
        }
      }
      hide();
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
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
      // @ts-ignore
      request={async () => {
        if (props.id > 0) {
          const res = await show({ id: props.id });
          setCurrentTableListItemMoment(moment());
          setOldRecord(res.data);
          return res.data;
        } else {
          setOldRecord({});
          return {};
        }
      }}
      formRef={formRef}
      onFinish={async (formData) => {
        const success = await onFinish(formData);
        if (success) {
          return props.onSubmit(success);
        }
      }}
      params={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      initialValues={{}}
    >
      {/*风控字段名称*/}
      <ProFormText
        label={FieldLabels.b_name}
        name={FieldIndex.b_name}
        rules={[
          { required: true, message: `请输入${FieldLabels.b_name}` },
          {
            validator: (_, value) => {
              return value == oldRecord?.b_name || !oldRecord?.b_name
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.b_name}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.b_name}`}
      />
      {/*字段名称本地化*/}
      <ProFormText
        label={FieldLabels.c_local_name}
        name={FieldIndex.c_local_name}
        rules={[
          { required: true, message: `请输入${FieldLabels.c_local_name}` },
          {
            validator: (_, value) => {
              return value == oldRecord?.c_local_name || !oldRecord?.c_local_name
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.c_local_name}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.c_local_name}`}
      />
      {/*描述*/}
      <ProFormText
        label={FieldLabels.e_description}
        name={FieldIndex.e_description}
        rules={[
          { required: true, message: `请输入${FieldLabels.e_description}` },
          {
            validator: (_, value) => {
              return value == oldRecord?.e_description || !oldRecord?.e_description
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.e_description}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.e_description}`}
      />
      {/*描述本地化*/}
      <ProFormText
        label={FieldLabels.f_local_description}
        name={FieldIndex.f_local_description}
        rules={[
          { required: true, message: `请输入${FieldLabels.f_local_description}` },
          {
            validator: (_, value) => {
              return value == oldRecord?.f_local_description || !oldRecord?.f_local_description
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.f_local_description}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.f_local_description}`}
      />
      {/*联系备注*/}
      <ProFormText
        label={FieldLabels.g_comment}
        name={FieldIndex.g_comment}
        placeholder={`请输入${FieldLabels.g_comment}`}
      />
    </ModalForm>
  );
};

export default CreateForm;

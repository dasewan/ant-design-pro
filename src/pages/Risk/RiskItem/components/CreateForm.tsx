import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';

import {
  getAdminV1GDRiskItemsId as show,
  postAdminV1GDRiskItems as store,
  putAdminV1GDRiskItemsId as update,
} from '@/services/ant-design-pro/GDRiskItem';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { message } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem } from '../data';
import { RISK_ITEM_TYPE_OPTION } from '../enums';
import { FieldIndex, FieldLabels } from '../service';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  id: number;
  cats: RequestOptionsType[];
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
        label={FieldLabels.a_name}
        name={FieldIndex.a_name}
        rules={[
          { required: true, message: `请输入${FieldLabels.a_name}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.a_name || !oldRecord?.a_name
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.a_name}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.a_name}`}
      />
      {/*字段名称本地化*/}
      <ProFormText
        label={FieldLabels.b_local_name}
        name={FieldIndex.b_local_name}
        rules={[
          { required: true, message: `请输入${FieldLabels.b_local_name}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.b_local_name || !oldRecord?.b_local_name
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.b_local_name}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.b_local_name}`}
      />
      {/*分类id*/}
      <ProFormSelect
        label={FieldLabels.d_cat_id}
        name={FieldIndex.d_cat_id}
        rules={[
          { required: true, message: `请输入${FieldLabels.d_cat_id}` },
          {
            validator: (_, value) => {
              const oldValue = props.cats.find((item) => item.value === oldRecord?.d_cat_id)?.label;
              // @ts-ignore
              return value === oldRecord?.d_cat_id || !oldRecord?.d_cat_id
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        // @ts-ignore
        options={props.cats}
      />
      {/*字段类型*/}
      <ProFormSelect
        label={FieldLabels.e_type}
        name={FieldIndex.e_type}
        rules={[
          { required: true, message: `请输入${FieldLabels.e_type}` },
          {
            validator: (_, value) => {
              const oldValue = RISK_ITEM_TYPE_OPTION.find(
                (item) => item.value === oldRecord?.e_type,
              )?.label;
              // @ts-ignore
              return value === oldRecord?.e_type || !oldRecord?.e_type
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        // @ts-ignore
        options={RISK_ITEM_TYPE_OPTION}
      />
      {/*描述*/}
      <ProFormText
        label={FieldLabels.g_description}
        name={FieldIndex.g_description}
        rules={[
          { required: true, message: `请输入${FieldLabels.g_description}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.g_description || !oldRecord?.g_description
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.g_description}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.g_description}`}
      />
      {/*描述本地化*/}
      <ProFormText
        label={FieldLabels.h_local_description}
        name={FieldIndex.h_local_description}
        rules={[
          { required: true, message: `请输入${FieldLabels.h_local_description}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.h_local_description || !oldRecord?.h_local_description
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.h_local_description}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.h_local_description}`}
      />
      {/*备注*/}
      <ProFormText
        label={FieldLabels.i_comment}
        name={FieldIndex.i_comment}
        placeholder={`请输入${FieldLabels.i_comment}`}
      />
    </ModalForm>
  );
};

export default CreateForm;

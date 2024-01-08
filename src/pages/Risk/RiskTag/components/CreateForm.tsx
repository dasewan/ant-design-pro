import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormDigitRange, ProFormSelect, ProFormText } from '@ant-design/pro-form';

import {
  getAdminV1GJRiskTagsId as show,
  putAdminV1GJRiskTagsId as update,
} from '@/services/ant-design-pro/GJRiskTag';
import type { RequestOptionsType } from '@ant-design/pro-utils';
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
  channels: RequestOptionsType[];
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
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    if (moment().diff(currentTableListItemMoment) > 3000000) {
      console.log(moment().diff(currentTableListItemMoment));
      hide();
      message.error(intl.formatMessage({ id: 'pages.common.editExpired', defaultMessage: '' }));
      return false;
    }
    // @ts-ignore
    values.b_values = values.b_values?.join('-');
    try {
      if (props.id > 0) {
        delete values.a_name;
        // @ts-ignore
        const res = await update({ id: props.id, ...values });
        if (!res.success) {
          message.error(res.message);
          return false;
        }
      }
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
          props.onCancel();
        }
      }}
      // @ts-ignore
      request={async () => {
        if (props.id > 0) {
          const res = await show({ id: props.id });
          // @ts-ignore
          res.data.b_values = res.data!.b_values?.split('-');
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
      <ProFormText label={FieldLabels.a_name} name={FieldIndex.a_name} disabled={true} />
      {oldRecord?.c_group === 'channel' ? (
        <ProFormSelect
          label={FieldLabels.b_values}
          name={FieldIndex.b_values}
          fieldProps={{ mode: 'multiple' }}
          // @ts-ignore
          options={props.channels}
          rules={[
            {
              validator: (_, value) => {
                const tmpValue = value.join('-');
                let oldValue = '';
                // @ts-ignore
                oldRecord?.b_values?.map((productId: number) => {
                  if (props.channels.find((item) => item.value === productId)) {
                    oldValue +=
                      props.channels.find((item) => item.value === productId)!.label + '-';
                  }
                  return '';
                });
                // @ts-ignore
                return tmpValue === oldRecord?.b_values?.join('-') || !oldRecord?.b_values
                  ? Promise.resolve()
                  : Promise.reject(new Error(`旧值：  ${oldValue} `));
              },
              warningOnly: true,
            },
          ]}
          placeholder={`请输入${FieldLabels.b_values}`}
        />
      ) : (
        <ProFormDigitRange
          label={FieldLabels.b_values}
          name={FieldIndex.b_values}
          rules={[
            { required: true, message: `请输入${FieldLabels.b_values}` },
            {
              validator: (_, value) => {
                // @ts-ignore
                return value.join('-') === oldRecord?.b_values.join('-') || !oldRecord?.b_values
                  ? Promise.resolve()
                  : Promise.reject(new Error(`旧值：   ${oldRecord?.b_values}`));
              },
              warningOnly: true,
            },
          ]}
          separator="-"
          separatorWidth={60}
        />
      )}
    </ModalForm>
  );
};

export default CreateForm;

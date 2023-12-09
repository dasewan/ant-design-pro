import { postAdminV1RBlacks as post } from '@/services/ant-design-pro/RBlack';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils/lib/typing';
import { Divider, message } from 'antd';
import React, { useRef } from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<API.RBlackComplex>;
export type FormRecord = API.RBlackComplex;

export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  values: Partial<TableListItem>;
  columns: ProColumns<TableListItem>[];
  reasonEnum: RequestOptionsType[];
};

/**
 * 授信额度调整
 * @param fields
 * @param id
 */
const handle = async (fields: FormValueType, id: number | undefined) => {
  const hide = message.loading(
    intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
  );
  // props.values.id
  try {
    await post({
      ...fields,
      user_id: id,
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
 *
 * @param props
 * @constructor
 */
const BlackForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();

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
      formRef={formRef}
      onFinish={async (formData) => {
        const success = await handle(formData, props.values.id);
        return props.onSubmit(success);
      }}
      params={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <ProDescriptions<TableListItem>
        column={2}
        title={props.values?.a_phone}
        request={async () => ({
          data: props.values || {},
        })}
        params={{
          id: props.values?.a_phone,
        }}
        columns={
          props.columns.slice(0, -1).filter((item) => {
            return !(
              item.dataIndex === 'a_phone' ||
              item.dataIndex === 'f_credit_amount' ||
              item.dataIndex === 'af_loan_count' ||
              item.dataIndex === 'created_at' ||
              item.dataIndex === 'l_channel_id' ||
              item.dataIndex === 'z_saler_admin_id' ||
              item.dataIndex === 'ab_collection_admin_id'
            );
          }) as ProDescriptionsItemProps<TableListItem>[]
        }
      />

      <Divider />
      <ProFormSelect
        name="a_reason_id"
        label="Select"
        request={async () => props.reasonEnum}
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

export default BlackForm;

import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';

import { FieldIndex, FieldLabels } from '@/pages/Loan/LoanList/InterceptLoan/service';
import {
  getAdminV1BanksEnum as getBanksEnum,
  putAdminV1MBLoansId as update,
} from '@/services/ant-design-pro/MBLoan';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { message } from 'antd';
import React, { useRef } from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  row: TableListItem;
};

/**
 *
 * @param props
 * @constructor
 */
const CreateForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();

  /**
   * 提交风控字段
   * @param values
   */
  const onFinish = async (values: FormValueType) => {
    const hide = message.loading('正在配置');

    try {
      // @ts-ignore
      const res = await update({ id: props.row.a_a_a_a_a_d_borrow.id, ...values });
      if (!res.success) {
        message.error(res.message);
        return false;
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

  /**
   * 查询用户银行卡enum
   */
  const _getBanksEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    // @ts-ignore
    const res = await getBanksEnum({ a_user_id: props.row.a_a_a_a_a_d_borrow?.a_user_id });
    for (const item of res.data!) {
      data.push({
        label: '[' + item.d_bank_name + ']' + item.f_bank_card_no,
        value: item.id,
      });
    }
    return data;
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
      title={'换卡放款'}
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
      <ProFormText
        label={FieldLabels.a_a_a_a_a_d_borrow.a_k_phone}
        name={FieldIndex.a_a_a_a_a_d_borrow.a_k_phone}
        initialValue={props.row?.a_a_a_a_a_d_borrow?.a_k_phone}
        disabled={true}
      />
      <ProFormText
        label={FieldLabels.a_a_a_a_a_d_borrow.a_l_name1}
        name={FieldIndex.a_a_a_a_a_d_borrow.a_l_name1}
        initialValue={props.row?.a_a_a_a_a_d_borrow?.a_l_name1}
        disabled={true}
      />
      <ProFormText
        label={FieldLabels.a_a_a_a_a_d_borrow.p_loan_amount}
        name={FieldIndex.a_a_a_a_a_d_borrow.p_loan_amount}
        initialValue={props.row?.a_a_a_a_a_d_borrow?.p_loan_amount}
        disabled={true}
      />
      {/*结算类型*/}
      <ProFormSelect
        name="bank_id"
        label="银行卡"
        request={_getBanksEnum}
        placeholder="Please select a bank"
        rules={[{ required: true, message: 'Please select your bank!' }]}
      />
    </ModalForm>
  );
};

export default CreateForm;

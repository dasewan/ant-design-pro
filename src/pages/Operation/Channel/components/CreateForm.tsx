import { CHANNEL_TYPE, CHANNEL_TYPE_OPTION } from '@/pages/Operation/Channel/enums';
import {
  getAdminV1AFChannelsId as show,
  postAdminV1AFChannels as store,
  putAdminV1AFChannelsId as update,
} from '@/services/ant-design-pro/AFChannel';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { message } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem } from '../data';
import { FieldIndex, FieldLabels } from '../service';
import {useIntl} from "@@/exports";

export { getAdminV1ProductsEnum as getProductsEnum } from '@/services/ant-design-pro/BProduct';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  id: number;
  products: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const CreateForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();
  const [oldRecord, setOldRecord] = useState<TableListItem>();

  /**
   * 提交渠道
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
    try {
      console.log(values);
      // @ts-ignore
      values.r_products = values.r_products?.join(',');
      // @ts-ignore
      values.d_status = values.d_status ? 'y' : 'n';
      if (props.id > 0) {
        delete values.a_title;
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
          res.data.r_products = res.data.r_products?.split(',');
          // @ts-ignore
          res.data.d_status = res.data.d_status === 'y';
          setCurrentTableListItemMoment(moment());
          setOldRecord(res.data);
          return res.data;
        } else {
          setCurrentTableListItemMoment(moment());
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
      initialValues={{
        l_type: 1,
        o_send_email: 1,
      }}
    >
      {/*渠道名称*/}
      <ProFormText
        label={FieldLabels.a_title}
        name={FieldIndex.a_title}
        disabled={oldRecord?.a_title !== undefined}
        rules={[
          { required: true, message: `请输入${FieldLabels.a_title}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.a_title || !oldRecord?.a_title
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.a_title}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.a_title}`}
      />
      {/*结算类型*/}
      <ProFormSelect
        label={FieldLabels.f_divide_into_type}
        tooltip={<>CPA:balabala</>}
        name={FieldIndex.f_divide_into_type}
        rules={[
          { required: true, message: `请选择${FieldLabels.f_divide_into_type}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.f_divide_into_type || !oldRecord?.f_divide_into_type
                ? Promise.resolve()
                : Promise.reject(
                    new Error(`旧值：   ${CHANNEL_TYPE[oldRecord?.f_divide_into_type].text}`),
                  );
            },
            warningOnly: true,
          },
        ]}
        options={CHANNEL_TYPE_OPTION}
      />
      {/*结算金额*/}
      <ProFormDigit
        label={FieldLabels.g_divide_one_money}
        name={FieldIndex.g_divide_one_money}
        rules={[
          { required: true, message: `请输入${FieldLabels.g_divide_one_money}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.g_divide_one_money || !oldRecord?.g_divide_one_money
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.g_divide_one_money}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.g_divide_one_money}`}
        fieldProps={{ precision: 0 }}
      />
      {/*扣量起始*/}
      <ProFormDigit
        label={FieldLabels.h_reg_hide_basic}
        name={FieldIndex.h_reg_hide_basic}
        rules={[
          { required: true, message: `请输入${FieldLabels.h_reg_hide_basic}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.h_reg_hide_basic || !oldRecord?.h_reg_hide_basic
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.h_reg_hide_basic}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.h_reg_hide_basic}`}
        fieldProps={{ precision: 0 }}
      />
      {/*扣量率*/}
      <ProFormDigit
        label={FieldLabels.i_reg_hide_rate}
        name={FieldIndex.i_reg_hide_rate}
        rules={[
          { required: true, message: `请输入${FieldLabels.i_reg_hide_rate}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.i_reg_hide_rate || !oldRecord?.i_reg_hide_rate
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.i_reg_hide_rate}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.i_reg_hide_rate}`}
        fieldProps={{ precision: 0 }}
      />
      {/*每日最大注册人数*/}
      <ProFormDigit
        label={FieldLabels.j_max_register}
        name={FieldIndex.j_max_register}
        rules={[
          { required: true, message: `请输入${FieldLabels.j_max_register}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.j_max_register || !oldRecord?.j_max_register
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.j_max_register}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.i_reg_hide_rate}`}
        fieldProps={{ precision: 0 }}
      />
      {/*每日最大放款笔数*/}
      <ProFormDigit
        label={FieldLabels.u_max_loan}
        name={FieldIndex.u_max_loan}
        rules={[
          { required: true, message: `请输入${FieldLabels.u_max_loan}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.u_max_loan || !oldRecord?.u_max_loan
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.u_max_loan}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.i_reg_hide_rate}`}
        fieldProps={{ precision: 0 }}
      />
      {/*可借产品*/}
      <ProFormSelect
        label={FieldLabels.r_products}
        tooltip={<>不选择则可以借所有满足条件的产品</>}
        name={FieldIndex.r_products}
        rules={[
          {
            validator: (_, value) => {
              const tmpValue = value?.join(',');
              let oldValue = '';
              oldRecord?.r_products?.map((productId: number) => {
                if (props.products.find((item) => item.value === productId)) {
                  oldValue += props.products.find((item) => item.value === productId)!.label + ',';
                }
                return oldValue;
              });
              // @ts-ignore
              return tmpValue === oldRecord?.r_products?.join(',') || !oldRecord?.r_products
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        // @ts-ignore
        options={props.products}
        fieldProps={{ mode: 'multiple' }}
      />
      {/*状态*/}
      <ProFormSwitch
        name={FieldIndex.d_status}
        label={FieldLabels.d_status}
        checkedChildren="启用"
        unCheckedChildren="禁用"
      />
      {/*本司对接人*/}
      <ProFormText
        label={FieldLabels.m_self_user}
        name={FieldIndex.m_self_user}
        rules={[
          { required: true, message: `请输入${FieldLabels.m_self_user}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.m_self_user || !oldRecord?.m_self_user
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.m_self_user}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.m_self_user}`}
      />
      {/*联系人*/}
      <ProFormText
        label={FieldLabels.n_contact_user}
        name={FieldIndex.n_contact_user}
        rules={[
          { required: true, message: `请输入${FieldLabels.n_contact_user}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.n_contact_user || !oldRecord?.n_contact_user
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.n_contact_user}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.n_contact_user}`}
      />
      {/*联系电话*/}
      <ProFormText
        label={FieldLabels.o_contact_phone}
        name={FieldIndex.o_contact_phone}
        placeholder={`请输入${FieldLabels.o_contact_phone}`}
      />
      {/*联系地址*/}
      <ProFormText
        label={FieldLabels.p_contact_address}
        name={FieldIndex.p_contact_address}
        placeholder={`请输入${FieldLabels.p_contact_address}`}
      />
      {/*联系备注*/}
      <ProFormText
        label={FieldLabels.q_contact_comment}
        name={FieldIndex.q_contact_comment}
        placeholder={`请输入${FieldLabels.q_contact_comment}`}
      />
    </ModalForm>
  );
};

export default CreateForm;

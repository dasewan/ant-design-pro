import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormCascader,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';

import { COMMON_STATUS_INT_ARRAY, RISK_TAGS_ARRAY } from '@/pages/enums';
import {
  getAdminV1NERiskStrategyRoutesId as show,
  postAdminV1NERiskStrategyRoutes as store,
  putAdminV1NERiskStrategyRoutesId as update,
} from '@/services/ant-design-pro/NERiskStrategyRoute';
import { useIntl } from '@@/exports';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Divider, message } from 'antd';
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
  strategies: RequestOptionsType[];
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
    try {
      if (props.id > 0) {
        if (values.c_borrow !== undefined) {
          // @ts-ignore
          values.c_borrow = values.c_borrow.join(',');
        }
        if (values.d_channel !== undefined) {
          // @ts-ignore
          values.d_channel = values.d_channel.join(',');
        }
        if (values.e_sms !== undefined) {
          // @ts-ignore
          values.e_sms = values.e_sms.join(',');
        }
        if (values.f_contact !== undefined) {
          // @ts-ignore
          values.f_contact = values.f_contact.join(',');
        }
        if (values.g_app !== undefined) {
          // @ts-ignore
          values.g_app = values.g_app.join(',');
        }
        if (values.h_region !== undefined) {
          // @ts-ignore
          values.h_region = values.h_region.join(',');
        }
        if (values.i_age !== undefined) {
          // @ts-ignore
          values.i_age = values.i_age.join(',');
        }
        if (
          values.m_risk_strategy_2_rate !== undefined &&
          values.o_risk_strategy_3_rate !== undefined
        ) {
          if (
            values.k_risk_strategy_1_rate! +
              values.m_risk_strategy_2_rate +
              values.o_risk_strategy_3_rate !==
            100
          ) {
            message.error('占比总和不等于100%');
            return false;
          }
        } else if (values.m_risk_strategy_2_rate !== undefined) {
          if (values.k_risk_strategy_1_rate! + values.m_risk_strategy_2_rate !== 100) {
            message.error('占比总和不等于100%');
            return false;
          }
        } else if (values.o_risk_strategy_3_rate !== undefined) {
          if (values.k_risk_strategy_1_rate! + values.o_risk_strategy_3_rate !== 100) {
            message.error('占比总和不等于100%');
            return false;
          }
        }
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

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
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
          if (
            res.data!.c_borrow !== undefined &&
            res.data!.c_borrow !== null &&
            res.data!.c_borrow.length > 0
          ) {
            // @ts-ignore
            res.data!.c_borrow = res.data!.c_borrow.split(',');
          } else {
            res.data!.c_borrow = undefined;
          }
          if (
            res.data!.d_channel !== undefined &&
            res.data!.d_channel !== null &&
            res.data!.d_channel.length > 0
          ) {
            // @ts-ignore
            res.data!.d_channel = res.data!.d_channel.split(',');
          } else {
            res.data!.d_channel = undefined;
          }
          if (
            res.data!.e_sms !== undefined &&
            res.data!.e_sms !== null &&
            res.data!.e_sms.length > 0
          ) {
            // @ts-ignore
            res.data!.e_sms = res.data!.e_sms.split(',');
          } else {
            res.data!.e_sms = undefined;
          }
          if (
            res.data!.f_contact !== undefined &&
            res.data!.f_contact !== null &&
            res.data!.f_contact.length > 0
          ) {
            // @ts-ignore
            res.data!.f_contact = res.data!.f_contact.split(',');
          } else {
            res.data!.f_contact = undefined;
          }
          if (
            res.data!.g_app !== undefined &&
            res.data!.g_app !== null &&
            res.data!.g_app.length > 0
          ) {
            // @ts-ignore
            res.data!.g_app = res.data!.g_app.split(',');
          } else {
            res.data!.g_app = undefined;
          }
          if (
            res.data!.h_region !== undefined &&
            res.data!.h_region !== null &&
            res.data!.h_region.length > 0
          ) {
            // @ts-ignore
            res.data!.h_region = res.data!.h_region.split(',');
          } else {
            res.data!.h_region = undefined;
          }
          if (
            res.data!.i_age !== undefined &&
            res.data!.i_age !== null &&
            res.data!.i_age.length > 0
          ) {
            // @ts-ignore
            res.data!.i_age = res.data!.i_age.split(',');
          } else {
            res.data!.i_age = undefined;
          }

          if (
            res.data!.j_risk_strategy_id_1 !== undefined &&
            res.data!.j_risk_strategy_id_1 !== null
          ) {
            res.data!.j_risk_strategy_id_1 = [
              res.data!.r_risk_strategy_1_code,
              res.data!.j_risk_strategy_id_1,
            ];
          }
          if (
            res.data!.l_risk_strategy_id_2 !== undefined &&
            res.data!.l_risk_strategy_id_2 !== null
          ) {
            res.data!.l_risk_strategy_id_2 = [
              res.data!.t_risk_strategy_2_code,
              res.data!.l_risk_strategy_id_2,
            ];
          }
          if (
            res.data!.n_risk_strategy_id_3 !== undefined &&
            res.data!.n_risk_strategy_id_3 !== null
          ) {
            res.data!.n_risk_strategy_id_3 = [
              res.data!.v_risk_strategy_3_code,
              res.data!.n_risk_strategy_id_3,
            ];
          }
          setOldRecord(res.data!);
          return res.data!;
        } else {
          setOldRecord({});
          return {};
        }
      }}
      formRef={formRef}
      onFinish={async (formData) => {
        console.log(formData);
        const success = await onFinish(formData);
        if (success) {
          return props.onSubmit(success);
        }
      }}
      params={{}}
      layout="horizontal"
      // labelCol={{ span: 4 }}
      // wrapperCol={{ span: 14 }}
      initialValues={{}}
      grid={true}
      rowProps={{
        gutter: [16, 0],
      }}
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
      <ProFormRadio.Group
        label={<>{FieldLabels.q_status}</>}
        name={FieldIndex.q_status}
        radioType="button"
        options={COMMON_STATUS_INT_ARRAY}
      />
      <Divider>画像</Divider>
      {/*借款*/}
      <ProFormSelect
        label={FieldLabels.c_borrow}
        name={FieldIndex.c_borrow}
        fieldProps={{ mode: 'multiple' }}
        rules={[
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.c_borrow,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.c_borrow ||
                !oldRecord?.c_borrow ||
                oldRecord!.c_borrow === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        options={RISK_TAGS_ARRAY.slice(0, 4)}
      />
      {/*渠道*/}
      <ProFormSelect
        label={FieldLabels.d_channel}
        name={FieldIndex.d_channel}
        fieldProps={{ mode: 'multiple' }}
        rules={[
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.d_channel,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.d_channel ||
                !oldRecord?.d_channel ||
                oldRecord!.d_channel === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        options={RISK_TAGS_ARRAY.slice(4, 7)}
      />
      {/*短信*/}
      <ProFormSelect
        label={FieldLabels.e_sms}
        name={FieldIndex.e_sms}
        fieldProps={{ mode: 'multiple' }}
        rules={[
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.e_sms,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.e_sms ||
                !oldRecord?.e_sms ||
                oldRecord!.e_sms === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        options={RISK_TAGS_ARRAY.slice(7, 11)}
      />
      {/*通讯录*/}
      <ProFormSelect
        label={FieldLabels.f_contact}
        name={FieldIndex.f_contact}
        fieldProps={{ mode: 'multiple' }}
        rules={[
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.f_contact,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.f_contact ||
                !oldRecord?.f_contact ||
                oldRecord!.f_contact === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        options={RISK_TAGS_ARRAY.slice(11, 15)}
      />
      {/*一类金融*/}
      <ProFormSelect
        label={FieldLabels.g_app}
        name={FieldIndex.g_app}
        fieldProps={{ mode: 'multiple' }}
        rules={[
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.g_app,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.g_app ||
                !oldRecord?.g_app ||
                oldRecord!.g_app === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        options={RISK_TAGS_ARRAY.slice(15, 19)}
      />
      {/*风险地区*/}
      <ProFormSelect
        label={FieldLabels.h_region}
        name={FieldIndex.h_region}
        fieldProps={{ mode: 'multiple' }}
        rules={[
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.h_region,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.h_region ||
                !oldRecord?.h_region ||
                oldRecord!.h_region === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        options={RISK_TAGS_ARRAY.slice(19, 22)}
      />
      {/*年龄*/}
      <ProFormSelect
        label={FieldLabels.i_age}
        name={FieldIndex.i_age}
        fieldProps={{ mode: 'multiple' }}
        rules={[
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.i_age,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.i_age ||
                !oldRecord?.i_age ||
                oldRecord!.i_age === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        options={RISK_TAGS_ARRAY.slice(22, 25)}
      />
      <Divider>策略</Divider>
      {/*<ProFormSelect
        label={FieldLabels.j_risk_strategy_id_1}
        name={FieldIndex.j_risk_strategy_id_1}
        colProps={{ md: 12, xl: 12 }}
        rules={[
          { required: true, message: `请输入${FieldLabels.j_risk_strategy_id_1}` },
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.j_risk_strategy_id_1,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.j_risk_strategy_id_1 ||
                !oldRecord?.j_risk_strategy_id_1 ||
                oldRecord!.j_risk_strategy_id_1 === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        options={props.strategies}
      />*/}
      <ProFormCascader
        label={FieldLabels.j_risk_strategy_id_1}
        name={FieldIndex.j_risk_strategy_id_1}
        colProps={{ md: 12, xl: 12 }}
        rules={[{ required: true, message: `请输入${FieldLabels.j_risk_strategy_id_1}` }]}
        fieldProps={{
          options: props.strategies,
        }}
      />
      <ProFormDigit
        label={FieldLabels.k_risk_strategy_1_rate}
        name={FieldIndex.k_risk_strategy_1_rate}
        colProps={{ md: 12, xl: 12 }}
        min={1}
        max={100}
        fieldProps={{ precision: 0, addonAfter: '%' }}
        rules={[
          { required: true, message: `请输入${FieldLabels.k_risk_strategy_1_rate}` },
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.k_risk_strategy_1_rate,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.k_risk_strategy_1_rate ||
                !oldRecord?.k_risk_strategy_1_rate ||
                oldRecord!.k_risk_strategy_1_rate === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
      />

      <ProFormCascader
        label={FieldLabels.l_risk_strategy_id_2}
        name={FieldIndex.l_risk_strategy_id_2}
        colProps={{ md: 12, xl: 12 }}
        fieldProps={{
          options: props.strategies,
        }}
      />
      <ProFormDigit
        label={FieldLabels.m_risk_strategy_2_rate}
        name={FieldIndex.m_risk_strategy_2_rate}
        colProps={{ md: 12, xl: 12 }}
        min={1}
        max={100}
        fieldProps={{ precision: 0, addonAfter: '%' }}
        rules={[
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.m_risk_strategy_2_rate,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.m_risk_strategy_2_rate ||
                !oldRecord?.m_risk_strategy_2_rate ||
                oldRecord!.m_risk_strategy_2_rate === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
      />
      <ProFormCascader
        label={FieldLabels.n_risk_strategy_id_3}
        name={FieldIndex.n_risk_strategy_id_3}
        colProps={{ md: 12, xl: 12 }}
        fieldProps={{
          options: props.strategies,
        }}
      />

      <ProFormDigit
        label={FieldLabels.o_risk_strategy_3_rate}
        name={FieldIndex.o_risk_strategy_3_rate}
        colProps={{ md: 12, xl: 12 }}
        min={1}
        max={100}
        fieldProps={{ precision: 0, addonAfter: '%' }}
        rules={[
          {
            validator: (_, value) => {
              const oldValue = props.strategies.find(
                (item) => item.value === oldRecord?.o_risk_strategy_3_rate,
              )?.label;
              if (oldValue === undefined) {
                return Promise.resolve();
              }
              // @ts-ignore
              return value === oldRecord?.o_risk_strategy_3_rate ||
                !oldRecord?.o_risk_strategy_3_rate ||
                oldRecord!.o_risk_strategy_3_rate === undefined
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
      />

      {/*备注*/}
      <ProFormText
        label={FieldLabels.p_description}
        name={FieldIndex.p_description}
        placeholder={`请输入${FieldLabels.p_description}`}
      />
    </ModalForm>
  );
};

export default CreateForm;

import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormRadio } from '@ant-design/pro-form';
import { map } from 'lodash';

import { putAdminV1BIPaymentChannelsId as updateChannels } from '@/services/ant-design-pro/BIPaymentChannel';
import { message } from 'antd';
import type { CheckboxOptionType } from 'antd/lib/checkbox/Group';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem } from '../data';
import { useIntl } from '@@/exports';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  transactionDictionary?: Record<string, TableListItem[]>;
  transferDictionary?: Record<string, TableListItem[]>;
  type: string;
};

/**
 *
 * @param props
 * @constructor
 */
const SwitchChannel: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();
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
      message.error(intl.formatMessage({ id: 'pages.common.editExpired', defaultMessage: '' }));
      return false;
    }
    try {
      // @ts-ignore
      const res = await updateChannels({ id: 0, ...values });
      if (!res.success) {
        message.error(res.message);
        return false;
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
      title={props.type === 'transaction' ? '还款渠道' : '放款渠道'}
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
        const data = {};
        map(
          props.type === 'transaction' ? props.transactionDictionary : props.transferDictionary,
          function (value) {
            value.map((item) => {
              if (item.g_status === 'y') {
                data[item.d_method!] = item.id;
              }
              return '';
            });
          },
        );
        return data;
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
      {map(
        props.type === 'transaction' ? props.transactionDictionary : props.transferDictionary,
        function (value) {
          const optionsWithDisabled: CheckboxOptionType[] = [];
          value.map((item) => optionsWithDisabled.push({ label: item.a_name, value: item.id! }));
          return (
            <ProFormRadio.Group
              key={value[0].d_method}
              name={value[0].d_method}
              label={value[0].h_method_name}
              options={optionsWithDisabled}
            />
          );
        },
      )}
    </ModalForm>
  );
};

export default SwitchChannel;

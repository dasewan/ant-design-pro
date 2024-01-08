import { BORROW_TIMES_OPTION } from '@/pages/Review/ReviewGroup/enums';
import { US_BORROW_TIMES_OPTION } from '@/pages/Review/ReviewGroup/enumsUs';
import {
  getAdminV1APReviewGroupsId as show,
  postAdminV1APReviewGroups as store,
  putAdminV1APReviewGroupsId as update,
} from '@/services/ant-design-pro/APReviewGroup';
import { useIntl } from '@@/exports';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { ConfigProvider, message } from 'antd';
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  id: number;
  products: RequestOptionsType[];
  channels: RequestOptionsType[];
  admins: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const CreateForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const formRef = useRef<ProFormInstance>();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();
  const [oldRecord, setOldRecord] = useState<TableListItem>();

  /**
   * 提交渠道
   * @param values
   */
  const onFinish = async (values: FormValueType) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '' }),
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
      values.h_products = values.h_products?.join(',');
      // @ts-ignore
      values.f_admins = values.f_admins?.join(',');
      // @ts-ignore
      values.e_channels = values.e_channels?.join(',');
      // @ts-ignore
      values.d_status = values.d_status ? 'y' : 'n';
      if (props.id > 0) {
        delete values.a_name;
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
          res.data.h_products = res.data.h_products?.split(',');
          // @ts-ignore
          res.data.e_channels = res.data.e_channels?.split(',');
          // @ts-ignore
          res.data.f_admins = res.data.f_admins?.split(',');
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
      {/*审核小组名称*/}
      <ProFormText
        label={intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.a_name', defaultMessage: '' })}
        name="a_name"
        disabled={oldRecord?.a_name !== undefined}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.common.pleaseInput',
              defaultMessage: '',
            })}${intl.formatMessage({
              id: 'pages.Borrow.ReviewGroup.a_name',
              defaultMessage: '',
            })}`,
          },
          {
            validator: (_, value) => {
              return value === oldRecord?.a_name || !oldRecord?.a_name
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      `${intl.formatMessage({
                        id: 'pages.common.oldValue',
                        defaultMessage: '',
                      })}：   ${oldRecord?.a_name}`,
                    ),
                  );
            },
            warningOnly: true,
          },
        ]}
        placeholder={`${intl.formatMessage({
          id: 'pages.common.pleaseInput',
          defaultMessage: '',
        })}${intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.a_name', defaultMessage: '' })}`}
      />
      {/*借款次数*/}
      <ProFormSelect
        label={intl.formatMessage({
          id: 'pages.Borrow.ReviewGroup.b_borrow_times',
          defaultMessage: '',
        })}
        name="b_borrow_times"
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.common.pleaseSelect',
              defaultMessage: '',
            })}${intl.formatMessage({
              id: 'pages.Borrow.ReviewGroup.b_borrow_times',
              defaultMessage: '',
            })}`,
          },
          {
            validator: (_, value) => {
              return value === oldRecord?.b_borrow_times || !oldRecord?.b_borrow_times
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      `${intl.formatMessage({
                        id: 'pages.common.oldValue',
                        defaultMessage: '',
                      })}：   ${
                        currentLanguage === 'zh-cn'
                          ? BORROW_TIMES_OPTION[oldRecord?.b_borrow_times].text
                          : US_BORROW_TIMES_OPTION[oldRecord?.b_borrow_times].text
                      }}`,
                    ),
                  );
            },
            warningOnly: true,
          },
        ]}
        options={currentLanguage === 'zh-cn' ? BORROW_TIMES_OPTION : US_BORROW_TIMES_OPTION}
      />
      {/*权重*/}
      <ProFormDigit
        label={intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.c_weight', defaultMessage: '' })}
        name="c_weight"
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.common.pleaseInput',
              defaultMessage: '',
            })}${intl.formatMessage({
              id: 'pages.Borrow.ReviewGroup.c_weight',
              defaultMessage: '',
            })}`,
          },
          {
            validator: (_, value) => {
              return value === oldRecord?.c_weight || !oldRecord?.c_weight
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      `${intl.formatMessage({
                        id: 'pages.common.oldValue',
                        defaultMessage: '',
                      })}：   ${oldRecord?.c_weight}`,
                    ),
                  );
            },
            warningOnly: true,
          },
        ]}
        placeholder={`${intl.formatMessage({
          id: 'pages.common.pleaseInput',
          defaultMessage: '',
        })}${intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.c_weight', defaultMessage: '' })}`}
        fieldProps={{ precision: 0 }}
      />
      {/*分配模式*/}
      {/*<ProFormSelect
        label={intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.g_mode', defaultMessage: '' })}
        tooltip={<>CPA:balabala</>}
        name='g_mode'
        rules={[
          { required: true, message: `${intl.formatMessage({ id: 'pages.common.pleaseSelect', defaultMessage: '' })}${intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.g_mode', defaultMessage: '' })}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.g_mode || !oldRecord?.g_mode
                ? Promise.resolve()
                : Promise.reject(new Error(`${intl.formatMessage({ id: 'pages.common.oldValue', defaultMessage: '' })}：   ${CHANNEL_TYPE[oldRecord?.g_mode].text}`));
            },
            warningOnly: true,
          },
        ]}
        options={MODE_OPTION}
      />*/}
      {/*审核管理员*/}
      <ProFormSelect
        label={intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.f_admins', defaultMessage: '' })}
        tooltip={<></>}
        name="f_admins"
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.common.pleaseSelect',
              defaultMessage: '',
            })}${intl.formatMessage({
              id: 'pages.Borrow.ReviewGroup.g_mode',
              defaultMessage: '',
            })}`,
          },
          {
            validator: (_, value) => {
              const tmpValue = value?.join(',');
              let oldValue = '';
              // @ts-ignore
              oldRecord?.f_admins?.map((adminId: number) => {
                if (props.products.find((item) => item.value === adminId)) {
                  oldValue += props.admins.find((item) => item.value === adminId)!.label + ',';
                }
                return oldValue;
              });
              // @ts-ignore
              return tmpValue === oldRecord?.f_admins?.join(',') || !oldRecord?.f_admins
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      `${intl.formatMessage({
                        id: 'pages.common.oldValue',
                        defaultMessage: '',
                      })}：  ${oldValue} `,
                    ),
                  );
            },
            warningOnly: true,
          },
        ]}
        // @ts-ignore
        options={props.admins}
        fieldProps={{ mode: 'multiple' }}
      />

      {/*可借产品*/}
      <ProFormSelect
        label={intl.formatMessage({
          id: 'pages.Borrow.ReviewGroup.h_products',
          defaultMessage: '',
        })}
        tooltip={
          <>
            {intl.formatMessage({
              id: 'pages.Borrow.ReviewGroup.e_channels_tooltip',
              defaultMessage: '',
            })}
          </>
        }
        name="h_products"
        rules={[
          {
            validator: (_, value) => {
              const tmpValue = value?.join(',');
              let oldValue = '';
              // @ts-ignore
              oldRecord?.h_products?.map((productId: number) => {
                if (props.products.find((item) => item.value === productId)) {
                  oldValue += props.products.find((item) => item.value === productId)!.label + ',';
                }
                return oldValue;
              });
              // @ts-ignore
              return tmpValue === oldRecord?.h_products?.join(',') || !oldRecord?.h_products
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      `${intl.formatMessage({
                        id: 'pages.common.oldValue',
                        defaultMessage: '',
                      })}：  ${oldValue} `,
                    ),
                  );
            },
            warningOnly: true,
          },
        ]}
        // @ts-ignore
        options={props.products}
        fieldProps={{ mode: 'multiple' }}
      />
      {/*审核渠道*/}
      <ProFormSelect
        label={intl.formatMessage({
          id: 'pages.Borrow.ReviewGroup.e_channels',
          defaultMessage: '',
        })}
        tooltip={
          <>
            {intl.formatMessage({
              id: 'pages.Borrow.ReviewGroup.e_channels_tooltip',
              defaultMessage: '',
            })}
          </>
        }
        name="e_channels"
        rules={[
          {
            validator: (_, value) => {
              const tmpValue = value?.join(',');
              let oldValue = '';
              // @ts-ignore
              oldRecord?.e_channels?.map((channelId: number) => {
                if (props.channels.find((item) => item.value === channelId)) {
                  oldValue += props.channels.find((item) => item.value === channelId)!.label + ',';
                }
                return oldValue;
              });
              // @ts-ignore
              return tmpValue === oldRecord?.e_channels?.join(',') || !oldRecord?.e_channels
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      `${intl.formatMessage({
                        id: 'pages.common.oldValue',
                        defaultMessage: '',
                      })}：  ${oldValue} `,
                    ),
                  );
            },
            warningOnly: true,
          },
        ]}
        // @ts-ignore
        options={props.channels}
        fieldProps={{ mode: 'multiple' }}
      />

      {/*状态*/}
      <ProFormSwitch
        name="d_status"
        label={intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.d_status', defaultMessage: '' })}
        checkedChildren={intl.formatMessage({ id: 'pages.common.enable', defaultMessage: '' })}
        unCheckedChildren={intl.formatMessage({ id: 'pages.common.disable', defaultMessage: '' })}
      />
    </ModalForm>
  );
};

export default CreateForm;

import { putAdminV1APReviewGroupsRelease as release } from '@/services/ant-design-pro/APReviewGroup';
import { useIntl } from '@@/exports';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { message } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  groups: RequestOptionsType[];
  record: TableListItem;
};

/**
 *
 * @param props
 * @constructor
 */
const ReleaseForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();

  /**
   * 提交渠道
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
      const res = await release({
        foo: 1,
        id: props.record?.id,
        borrow_times: props.record?.b_borrow_times,
        ...values,
      });
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
        return props.record;
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
        disabled={true}
      />
      {/*待审核案件数*/}
      <ProFormDigit
        label={intl.formatMessage({
          id: 'pages.Borrow.ReviewGroup.i_review_wait_count',
          defaultMessage: '',
        })}
        name="i_review_wait_count"
        disabled={true}
      />
      {/*释放数量*/}
      <ProFormDigit
        label={intl.formatMessage({
          id: 'pages.Borrow.ReviewGroup.release_count',
          defaultMessage: '',
        })}
        name="release_count"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.Borrow.ReviewGroup.release_count_placeholder',
              defaultMessage: '',
            }),
          },
          // { max: props.record?.i_review_wait_count, message: `请输入释放数量` },
          // {min:1, message: '请输入释放数量'},
          {
            validator: (_, value) => {
              // @ts-ignore
              return value > props.record?.i_review_wait_count
                ? Promise.reject(
                    new Error(
                      `${intl.formatMessage({
                        id: 'pages.Borrow.ReviewGroup.release_count_rule',
                        defaultMessage: '',
                      })}${props.record?.i_review_wait_count}`,
                    ),
                  )
                : Promise.resolve();
            },
          },
        ]}
        placeholder={intl.formatMessage({
          id: 'pages.Borrow.ReviewGroup.release_count_placeholder',
          defaultMessage: '',
        })}
        fieldProps={{ precision: 0 }}
      />
      {/*释放顺序*/}
      <ProFormRadio.Group
        name="direction"
        label={intl.formatMessage({
          id: 'pages.Borrow.ReviewGroup.release_direction',
          defaultMessage: '',
        })}
        radioType="button"
        initialValue={'desc'}
        options={[
          {
            label: intl.formatMessage({
              id: 'pages.Borrow.ReviewGroup.release_newest',
              defaultMessage: '',
            }),
            value: 'desc',
          },
          {
            label: intl.formatMessage({
              id: 'pages.Borrow.ReviewGroup.release_oldest',
              defaultMessage: '',
            }),
            value: 'asc',
          },
        ]}
      />
      {/*接受审核组*/}
      <ProFormSelect
        label={intl.formatMessage({
          id: 'pages.Borrow.ReviewGroup.after_group_id',
          defaultMessage: '',
        })}
        tooltip={<></>}
        name="after_group_id"
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
        ]}
        // @ts-ignore
        options={props.groups.filter(
          (item) =>
            item.b_borrow_times === props.record?.b_borrow_times &&
            item.label !== props.record?.a_name,
        )}
        // fieldProps={{ mode: 'multiple' }}
      />
    </ModalForm>
  );
};

export default ReleaseForm;

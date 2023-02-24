import { BORROW_TIMES_OPTION } from '@/pages/Review/ReviewGroup/enums';
import { putAdminV1ARReviewAdminsRelease as release } from '@/services/ant-design-pro/ARReviewAdmin';
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
import { FieldIndex, FieldLabels } from '../service';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  admins: RequestOptionsType[];
  canMoveAdmins: Map<number, number[]>;
  record: TableListItem;
};

/**
 *
 * @param props
 * @constructor
 */
const ReleaseForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();
  const [borrowTimes, setBorrowTimes] = useState<number>(1);

  /**
   * 提交渠道
   * @param values
   */
  const onFinish = async (values: FormValueType) => {
    const hide = message.loading('正在配置');
    if (moment().diff(currentTableListItemMoment) > 3000000) {
      hide();
      message.error('配置超时！');
      return false;
    }
    try {
      // @ts-ignore
      values.after_admin_ids = values.after_admin_ids?.join(',');
      // @ts-ignore
      const res = await release({
        foo: 1,
        id: props.record?.id,
        before_admin_id: props.record?.b_admin_id,
        ...values,
      });
      if (!res.success) {
        message.error(res.message);
        return false;
      }
      hide();
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      console.log(error);
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
      <ProFormText label={FieldLabels.a_name} name={FieldIndex.a_name} disabled={true} />
      {/*待审核案件数*/}
      <ProFormText
        label={FieldLabels.n_review_wait_count}
        name={FieldIndex.n_review_wait_count}
        disabled={true}
        extra={
          (props.record?.q_review_wait_count1 != undefined && props.record.q_review_wait_count1 > 0
            ? `首借待审核订单:${props.record.q_review_wait_count1}`
            : '') +
          (props.record?.r_review_wait_count2 != undefined && props.record.r_review_wait_count2 > 0
            ? `复借2-4待审核案件数:${props.record.r_review_wait_count2}`
            : '') +
          (props.record?.s_review_wait_count3 != undefined && props.record.s_review_wait_count3 > 0
            ? `复借5+待审核案件数:${props.record.s_review_wait_count3}`
            : '')
        }
      />
      {/*借款次数*/}
      <ProFormSelect
        label={FieldLabels.m_borrow_times}
        tooltip={<>CPA:balabala</>}
        name="m_borrow_times2"
        rules={[{ required: true, message: `请选择${FieldLabels.m_borrow_times}` }]}
        options={BORROW_TIMES_OPTION.filter(
          (item) =>
            props.record?.m_borrow_times?.split(',').find((item2) => item2 == item.value) !=
            undefined,
        )}
        fieldProps={{
          onChange: (value) => {
            setBorrowTimes(value);
            formRef?.current?.resetFields(['after_group_id']);
            formRef?.current?.resetFields(['release_count']);
          },
        }}
      />
      {/*释放数量*/}
      <ProFormDigit
        label="释放数量"
        name="release_count"
        rules={[
          { required: true, message: `请输入释放数量` },
          // { max: props.record?.i_review_wait_count, message: `请输入释放数量` },
          {
            validator: (_, value) => {
              let compareValue = props.record?.n_review_wait_count;
              if (borrowTimes == 1) {
                compareValue = props.record?.q_review_wait_count1;
              }
              if (borrowTimes == 2) {
                compareValue = props.record?.r_review_wait_count2;
              }
              if (borrowTimes == 3) {
                compareValue = props.record?.s_review_wait_count3;
              }
              // @ts-ignore
              return value > compareValue
                ? Promise.reject(new Error(`释放数量不能大于${compareValue}`))
                : Promise.resolve();
            },
          },
        ]}
        placeholder={`请输入释放数量`}
        fieldProps={{ precision: 0 }}
      />
      {/*释放顺序*/}
      <ProFormRadio.Group
        name="direction"
        label="释放顺序"
        radioType="button"
        initialValue={'desc'}
        options={[
          {
            label: '最新',
            value: 'desc',
          },
          {
            label: '最早',
            value: 'asc',
          },
        ]}
      />
      {/*接受审核组*/}
      <ProFormSelect
        label="接收审核员"
        tooltip={<></>}
        name="after_admin_ids"
        rules={[{ required: true, message: `请选择接收审核组` }]}
        // @ts-ignore
        options={props.admins.filter((item) => {
          return (
            props?.canMoveAdmins
              .get(borrowTimes * 1)
              ?.find(
                (item2) =>
                  item2 == item.value && item.value != props.record?.b_admin_id?.toString(),
              ) != undefined
          );
        })}
        fieldProps={{ mode: 'multiple' }}
      />
    </ModalForm>
  );
};

export default ReleaseForm;

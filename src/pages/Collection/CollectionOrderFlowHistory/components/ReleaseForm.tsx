import { putAdminV1APReviewGroupsRelease as release } from '@/services/ant-design-pro/APReviewGroup';
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
  collectionAgencies: RequestOptionsType[];
  collectionStages: RequestOptionsType[];
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
      const res = await release({
        foo: 1,
        id: props.record?.id,
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
      {/*机构名称*/}
      <ProFormText label={FieldLabels.a_name} name={FieldIndex.a_name} disabled={true} />
      {/*在催案件数*/}
      <ProFormDigit
        label={FieldLabels.h_collection_ing_order_count}
        name={FieldIndex.h_collection_ing_order_count}
        disabled={true}
      />
      {/*释放阶段*/}
      <ProFormSelect
        label="释放阶段"
        tooltip={<></>}
        name="release_collection_stage"
        // @ts-ignore
        options={props.collectionStages}
        fieldProps={{ mode: 'multiple' }}
        placeholder={'不选择则释放所有阶段'}
      />
      {/*释放数量*/}
      <ProFormDigit
        label="释放数量"
        name="release_count"
        rules={[
          { required: true, message: `请输入释放数量` },
          // { max: props.record?.i_review_wait_count, message: `请输入释放数量` },
          // {min:1, message: '请输入释放数量'},
          {
            validator: (_, value) => {
              // @ts-ignore
              return value > props.record?.h_collection_ing_order_count
                ? Promise.reject(
                    new Error(`释放数量不能大于${props.record?.h_collection_ing_order_count}`),
                  )
                : Promise.resolve();
            },
          },
        ]}
        placeholder={`0代表释放全部`}
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
        label="接收机构"
        tooltip={<></>}
        name="after_collection_agency_id"
        rules={[{ required: true, message: `请选择接收机构` }]}
        // @ts-ignore
        options={props.collectionAgencies.filter(
          (item) =>
            // item.b_borrow_times == props.record?.b_borrow_times &&
            item.value !== props.record?.id,
        )}
        fieldProps={{ mode: 'multiple' }}
      />
    </ModalForm>
  );
};

export default ReleaseForm;

import {
  getAdminV1GMCollectionAdminsId as show,
  postAdminV1GMCollectionAdmins as store,
  putAdminV1GMCollectionAdminsId as update,
} from '@/services/ant-design-pro/GMCollectionAdmin';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
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
  id: number;
  collectionAgencies: RequestOptionsType[];
  collectionGroups: RequestOptionsType[];
  admins: RequestOptionsType[];
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
  const [collectionAgencyId, setCollectionAgencyId] = useState<number>(1);

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
      {/*催员名称*/}
      <ProFormText
        label={FieldLabels.a_name}
        name={FieldIndex.a_name}
        disabled={oldRecord?.a_name !== undefined}
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

      {/*绑定管理员*/}
      <ProFormSelect
        label={FieldLabels.b_admin_id}
        tooltip={<></>}
        name={FieldIndex.b_admin_id}
        rules={[
          { required: true, message: `请选择${FieldLabels.b_admin_id}` },
          {
            validator: (_, value) => {
              const oldValue = props.admins.find(
                (item) => item.value === oldRecord?.b_admin_id,
              )?.label;
              // @ts-ignore
              return value === oldRecord?.b_admin_id || !oldRecord?.b_admin_id
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        // @ts-ignore
        options={props.admins}
      />
      {/*所属机构*/}
      <ProFormSelect
        label={FieldLabels.c_collection_agency_id}
        tooltip={<></>}
        name={FieldIndex.c_collection_agency_id}
        rules={[
          { required: true, message: `请选择${FieldLabels.c_collection_agency_id}` },
          {
            validator: (_, value) => {
              const oldValue = props.collectionAgencies.find(
                (item) => item.value === oldRecord?.c_collection_agency_id,
              )?.label;
              // @ts-ignore
              return value === oldRecord?.c_collection_agency_id ||
                !oldRecord?.c_collection_agency_id
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        // @ts-ignore
        options={props.collectionAgencies}
        fieldProps={{
          onChange: (value) => {
            setCollectionAgencyId(value);
            formRef?.current?.resetFields(['d_collection_group_id']);
          },
        }}
      />
      {/*所属催收组*/}
      <ProFormSelect
        label={FieldLabels.d_collection_group_id}
        tooltip={<></>}
        name={FieldIndex.d_collection_group_id}
        rules={[
          { required: true, message: `请选择${FieldLabels.d_collection_group_id}` },
          {
            validator: (_, value) => {
              const oldValue = props.collectionGroups.find(
                (item) => item.value === oldRecord?.d_collection_group_id,
              )?.label;
              // @ts-ignore
              return value === oldRecord?.d_collection_group_id || !oldRecord?.d_collection_group_id
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：  ${oldValue} `));
            },
            warningOnly: true,
          },
        ]}
        // @ts-ignore
        options={props.collectionGroups.filter(
          (item) =>
            //todo 阶段有交集
            item.c_collection_agency_id === collectionAgencyId && item.f_status === 1,
        )}
      />

      {/*状态*/}
      <ProFormSwitch
        name={FieldIndex.f_status}
        label={FieldLabels.f_status}
        checkedChildren="启用"
        unCheckedChildren="禁用"
      />
      <ProFormText
        label={<>{FieldLabels.g_comment}</>}
        name={FieldIndex.g_comment}
        rules={[
          { required: true, message: `请输入${FieldLabels.g_comment}` },
          {
            validator: (_, value) => {
              return value === oldRecord?.g_comment || !oldRecord?.g_comment
                ? Promise.resolve()
                : Promise.reject(new Error(`旧值：   ${oldRecord?.g_comment}`));
            },
            warningOnly: true,
          },
        ]}
        placeholder={`请输入${FieldLabels.g_comment}`}
      />
    </ModalForm>
  );
};

export default CreateForm;
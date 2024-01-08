import { putAdminV1BFReviewBorrowsRelease as release } from '@/services/ant-design-pro/BFReviewBorrow';
import { useIntl } from '@@/exports';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import type { ProFieldRequestData } from '@ant-design/pro-utils';
import type { RequestOptionsType } from '@ant-design/pro-utils/lib/typing';
import { message } from 'antd';
import React, { useRef } from 'react';

export { getAdminV1BHReviewBorrowFlows as index2 } from '@/services/ant-design-pro/BHReviewBorrowFlow';

export type FormValueType = Partial<API.GBMarketing>;
export type FormRecord = API.GBMarketing;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  moveIds: string;
  admins: RequestOptionsType[];
  canMoveAdmins: number[];
  borrowTimesType?: number;
};

/**
 *
 * @param props
 * @constructor
 */
const MoveForm: React.FC<FormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();

  /**
   * 开始营销
   * @param fields
   */
  const _handle = async (fields: FormValueType) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    // props.values.id
    try {
      // @ts-ignore
      fields.after_admin_ids = fields.after_admin_ids?.join(',');
      // @ts-ignore
      await release({
        id: 0,
        // @ts-ignore
        ids: props.moveIds,
        borrow_times_type: props.borrowTimesType,
        ...fields,
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
   * 查询审核员enum
   */
  const _getAdminsEnum: ProFieldRequestData = async () => {
    // @ts-ignore
    return props.admins.filter(
      (item) => props.canMoveAdmins.find((id) => id === item.value * 1) !== undefined,
    );
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
      formRef={formRef}
      onFinish={async (formData) => {
        const success = await _handle(formData);
        return props.onSubmit(success);
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
      <ProFormSelect
        name="after_admin_ids"
        label={intl.formatMessage({
          id: 'pages.Borrow.ReviewBorrow.b_admin_id',
          defaultMessage: '',
        })}
        request={_getAdminsEnum}
        placeholder="Please select a admin"
        rules={[{ required: true, message: 'Please select your admin!' }]}
        fieldProps={{ mode: 'multiple' }}
      />
    </ModalForm>
  );
};

export default MoveForm;

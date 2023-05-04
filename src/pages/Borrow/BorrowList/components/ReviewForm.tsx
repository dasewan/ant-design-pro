import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import React, { useRef } from 'react';

import { VERIFY_STATUS_MAP } from '@/pages/enums';
import { putAdminV1GVerifiesId as update } from '@/services/ant-design-pro/GVerify';

export type FormValueType = Partial<API.GBMarketing>;
export type FormRecord = API.GBMarketing;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  showReviewRecord: boolean;
  verifyId?: number;
  borrowId?: number;
};

/**
 *
 * @param props
 * @constructor
 */
const ReviewForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  /**
   * 开始营销
   * @param status
   */
  const _handle = async (status: number) => {
    const fields = formRef?.current?.getFieldsValue();
    console.log(formRef?.current?.getFieldsValue);
    console.log(props.verifyId);
    const hide = message.loading('正在配置');
    // props.values.id
    try {
      // @ts-ignore
      const res = await update({ id: props.verifyId!, f_status: status, ...fields });
      if (!res.success) {
        message.error(res.message);
        return false;
      }
      hide();
      message.success('配置成功');
      props.onSubmit(true);
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
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
      title="审核"
      formRef={formRef}
      params={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      initialValues={{
        l_type: 1,
        o_send_email: 1,
      }}
      // request={() => getABCreditHistories({ a_user_id: props.values.id! })}
      submitter={{
        render: () => {
          const refuseButton = !props.showReviewRecord ? (
            <Button
              key="refuse"
              type="primary"
              danger
              onClick={() => _handle(VERIFY_STATUS_MAP.REFUSE)}
            >
              拒绝
            </Button>
          ) : null;
          const passButton = !props.showReviewRecord ? (
            <Button key="submit" type="primary" onClick={() => _handle(VERIFY_STATUS_MAP.SUCCESS)}>
              通过
            </Button>
          ) : null;
          return [
            <Button
              key="back"
              onClick={() => {
                props.onCancel();
              }}
            >
              取消
            </Button>,
            refuseButton,
            passButton,
          ];
        },
      }}
    >
      <ProFormRadio.Group
        name="j_idnumber_verify_status"
        label="身份认证"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />

      <ProFormRadio.Group
        name="n_contact_verify_status"
        label="联系人"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />
      <ProFormRadio.Group
        name="p_job_verify_status"
        label="工作信息"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />
      <ProFormRadio.Group
        name="r_loan_bank_verify_status"
        label="银行卡信息"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />
      <ProFormRadio.Group
        name="l_liveness_verify_status"
        label="活体"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />
      <ProFormRadio.Group
        name="sms_status"
        label="短信"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />
      <ProFormRadio.Group
        name="contact_status"
        label="通讯录"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />
      <ProFormRadio.Group
        name="app_status"
        label="APP"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />
      <ProFormRadio.Group
        name="device_status"
        label="设备"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />
      <ProFormRadio.Group
        name="borrow_history_status"
        label="历史贷款"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />
      <ProFormRadio.Group
        name="e_risk_result"
        label="风控记录"
        radioType="button"
        options={[
          {
            label: '正常',
            value: VERIFY_STATUS_MAP.SUCCESS,
          },
          {
            label: '异常',
            value: VERIFY_STATUS_MAP.REFUSE,
          },
        ]}
      />

      <ProFormText
        // width="md"
        name="g_comment"
        label="备注"
        placeholder="请输入备注"
      />
    </ModalForm>
  );
};

export default ReviewForm;

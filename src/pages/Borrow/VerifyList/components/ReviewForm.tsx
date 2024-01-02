import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';

import { REVIEW_REASON } from '@/pages/Borrow/VerifyList/components/enums';
import { REVIEW_REASON_US } from '@/pages/Borrow/VerifyList/components/enumsUs';
import { putAdminV1GVerifiesId as update } from '@/services/ant-design-pro/GVerify';
import { useIntl } from '@@/exports';
import { Alert, Button, ConfigProvider, message, Space } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (status: number, item: string) => Promise<void>;
  modalVisible: boolean;
  row?: TableListItem;
  reasonIds: string;
  reasonsDetail: string;
  item: string;
  id?: number;
  title: string;
  status: number;
};

/**
 *
 * @param props
 * @constructor
 */
const ReviewForm: React.FC<FormProps> = (props) => {
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  const [reasonsDetailArr, handleReasonsDetailArr] = useState<string[]>([]);

  useEffect(() => {
    handleReasonsDetailArr(props.reasonsDetail?.split(','));
  }, [props?.id, props.title]);
  /**
   * 提交表单
   * @param accept
   */
  const onFinish = async (accept: boolean) => {
    message.loading(intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }));
    let formValues;

    if (props.item === 'idNumber') {
      formValues = { j_idnumber_verify_status: accept ? 50 : 40 };
    } else if (props.item === 'contact') {
      formValues = { n_contact_verify_status: accept ? 50 : 40 };
    } else if (props.item === 'job') {
      formValues = { p_job_verify_status: accept ? 50 : 40 };
    } else if (props.item === 'loanBank') {
      formValues = { r_loan_bank_verify_status: accept ? 50 : 40 };
    }

    // @ts-ignore
    const res = await update({ id: props.id!, ...formValues });
    if (!res.success) {
      message.error(res.message);
      return false;
    }
    try {
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
    } catch {}
    return true;
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
      width={400}
      title={props.title}
      formRef={formRef}
      params={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      initialValues={{}}
      submitter={{
        render: () => {
          const refuseButton =
            props.status === 30 ? (
              <Button
                key="refuse"
                type="primary"
                danger
                onClick={async () => {
                  const success = await onFinish(false);
                  if (success) {
                    return props.onSubmit(40, props.item);
                  }
                }}
              >
                {intl.formatMessage({ id: 'pages.common.refuse', defaultMessage: '' })}
              </Button>
            ) : null;
          const passButton =
            props.status === 30 ? (
              <Button
                key="submit"
                type="primary"
                onClick={async () => {
                  const success = await onFinish(true);
                  if (success) {
                    return props.onSubmit(50, props.item);
                  }
                }}
              >
                {intl.formatMessage({ id: 'pages.common.pass', defaultMessage: '' })}
              </Button>
            ) : null;
          return [
            <Button
              key="back"
              onClick={() => {
                props.onCancel();
              }}
            >
              {intl.formatMessage({ id: 'pages.common.cancel', defaultMessage: '' })}
            </Button>,
            refuseButton,
            passButton,
          ];
        },
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {props.reasonIds.split(',')?.map((value, index) => {
          let _detail = <></>;
          if (reasonsDetailArr[index]) {
            const reasonDetailOne = reasonsDetailArr[index].split('|');

            if (reasonDetailOne[0] === 'blank') {
              _detail = <></>;
            } else if (reasonDetailOne[0] === 'text') {
              _detail = (
                <Button size="small" danger type="text">
                  {reasonDetailOne[1]}:{reasonDetailOne[2]}
                </Button>
              );
            } else if (reasonDetailOne[0] === 'link') {
              //todo 跳转
              let linkText = '';
              if (reasonDetailOne[1] === 'user') {
                linkText = '关联用户：';
              } else if (reasonDetailOne[1] === 'borrow') {
                linkText = '关联订单：';
              } else if (reasonDetailOne[1] === 'black') {
                linkText = '关联黑名单：';
              }
              _detail = (
                <Button size="small" danger>
                  {linkText}:{reasonDetailOne[2]}
                </Button>
              );
            } else {
              _detail = <></>;
            }
          }

          return (
            <Alert
              key={value}
              // @ts-ignore
              message={
                props.item !== '' ? (
                  <>
                    {currentLanguage === 'zh-cn'
                      ? REVIEW_REASON[props.item][value]
                      : REVIEW_REASON_US[props.item][value]}
                  </>
                ) : (
                  ''
                )
              }
              type="warning"
              showIcon
              action={_detail}
            />
          );
        })}
      </Space>
    </ModalForm>
  );
};

export default ReviewForm;

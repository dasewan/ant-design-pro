import {COMMON_STATUS_INT_ARRAY, COMMON_STATUS_QIYONG_ARRAY} from '@/pages/enums';
import {
  getAdminV1HJSmsTemplatesId as show,
  putAdminV1HJSmsTemplatesId as update,
} from '@/services/ant-design-pro/HJSmsTemplate';
import {request, useIntl} from '@@/exports';
import { BankOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import {ProFormInstance, ProFormSelect, ProFormUploadButton} from '@ant-design/pro-form';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import {
  ModalForm,
  ProForm,
  ProFormCascader,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Alert, message, Modal } from 'antd';
import * as crypto from 'crypto';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import type { TableListItem } from '../data';
import styles from '../index.less';
import { AgencyRoleFieldLabels, GroupRoleFieldLabels } from '../service';
import type {RcFile, UploadChangeParam} from "antd/lib/upload/interface";


export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  id: number;
  operators: RequestOptionsType[];
  channels: RequestOptionsType[];
  // admins: RequestOptionsType[];
};

interface NestedEditableTableProps {
  dataSource: API.KASmsTemplateOperatorRole[];
  onChange: (record: API.KASmsTemplateOperatorRole[]) => void;
  myKey: string;
  channels: RequestOptionsType[];
}

const NestedEditableTable: React.FC<NestedEditableTableProps> = ({
  dataSource,
  onChange,
  myKey,
  channels
}) => {
  useEffect(() => {}, []);
  const columns: ProColumns<API.KASmsTemplateOperatorRole>[] = [
    {
      title: '通道',
      dataIndex: 'c_sms_channel_id',
      valueType: 'select',
      request: async () => {
        return channels;
      },
      params: { timestamp: Math.random() },
      formItemProps: {
        rules: [
          { required: true, message: `${GroupRoleFieldLabels.d_collection_group_id}是必填项` },
        ],
      },
      className: styles.blue2,
    },
    {
      title: 'Sender ID',
      dataIndex: 'e_sender_id',
      valueType: 'text',
      className: styles.blue2,
    },
    {
      title: '分流比例',
      dataIndex: 'd_proportion',
      valueType: 'percent',
      formItemProps: {
        rules: [
          {
            required: true,
            message: `必填`,
          },
        ],
      },
      className: styles.blue2,
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      className: styles.blue2,
      render: (_, record: API.KASmsTemplateOperatorRole, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.id!);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  // @ts-ignore
  const BlueTableHeader = ({ children }) => (
    <th style={{ backgroundColor: '#CCFFFF' }}>{children}</th>
  );



  const onEditChange = () => {};

  return (
    <>
      <ProForm.Item
        name={'a_a_a_a_a_k_a_sms_template_operator_roles' + myKey}
        initialValue={dataSource}
      >
        <EditableProTable<API.KASmsTemplateOperatorRole>
          rowKey="id"
          columns={columns}
          components={{
            header: {
              cell: BlueTableHeader,
            },
          }}
          recordCreatorProps={{
            record: () => {
              return {
                id: parseInt((Math.random() * 1000000).toFixed(0)),
              };
            },
            creatorButtonText: '新增一个组',
            type: 'dashed',
            size: 'small',
            icon: <UsergroupAddOutlined />,
          }}
          // onChange={(nestedTableData) => handleNestedTableChange(nestedTableData, 1)}
          onChange={onChange}
          editable={{
            type: 'single',
            // @ts-ignore
            onChange: onEditChange,
            deletePopconfirmMessage: '确定要删除这个吗？',
          }}
          tableRender={(_, dom) => (
            <div
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <div style={{ width: 10 }} />
              <div
                style={{
                  flex: 1,
                }}
              >
                {dom}
              </div>
            </div>
          )}
        />
      </ProForm.Item>

    </>
  );
};

/**
 *
 * @param props
 * @constructor
 */
const EditForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  const [tableData, setTableData] = useState<API.KSmsTemplateOperator[]>([]);
  const [preview, setPreview] = useState<string>('');
  const [chargeCount, setChargeCount] = useState<number>(0);
  /** 提交按钮是否可用 */
  const [_confirmLoading, setConfirmLoading] = useState<boolean>(true);
  /** 设置上传文件id */
  const [fileId, setFileId] = useState<number>(0);

  const columns: ProColumns<API.KSmsTemplateOperator>[] = [
    {
      title: '运营商',
      dataIndex: 'c_operator',
      valueType: 'select',
      request: async () => {
        return props.operators;
      },
      formItemProps: {
        rules: [
          { required: true, message: `${AgencyRoleFieldLabels.b_collection_agency_id}是必填项` },
        ],
      },
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: API.KSmsTemplateOperator, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.id!);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

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
      let res;
      if (props.id > 0) {
        res = await update({ id: props.id,l_admin_file_id: fileId, ...values });
      }else{
        res = await update({ id: 0,l_admin_file_id: fileId, ...values });
      }
      console.log('values', values);
      // @ts-ignore
      if (!res.success) {
        message.error(res.message);
        return false;
      }
      console.log('values', values);
      hide();
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
      return true;
    } catch (error) {
      console.log(error);
      hide();
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      return false;
    }
  };

  const handleNestedTableChange = (
    nestedTableData: API.KASmsTemplateOperatorRole[],
    index: number,
  ) => {
    const newData = [...tableData];
    newData[index].a_a_a_a_a_k_a_sms_template_operator_roles = nestedTableData;
    console.log('newData');
    console.log(newData);
    setTableData(newData);
  };
  const expandedRowRender2 = (record: API.KSmsTemplateOperator, index: number) => {
    const nestedDataSource = record.a_a_a_a_a_k_a_sms_template_operator_roles;

    return (
      <NestedEditableTable
        dataSource={nestedDataSource!}
        onChange={(updatedRecord) => {
          handleNestedTableChange(updatedRecord, index);
        }}
        myKey={record.id ? record.id.toString() : crypto.randomBytes(10).toString('hex').slice(0, 10)}
        channels={props.channels}
      />
    );
  };
  // @ts-ignore
  const BlueTableHeader = ({ children }) => (
    <th style={{ backgroundColor: '#66CCCC' }}>{children}</th>
  );
  const calculateSmsCount = (message: string) => {
    const gsm7bitChars = /^[A-Za-z0-9 \r\n@£$¥èéùìòÇØøÅå\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!"#$%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\[~\]|\u20AC]*$/;

    let isGsm7bit = gsm7bitChars.test(message);
    let maxLengthPerSms = isGsm7bit ? 160 : 70;
    let maxLengthPerPart = isGsm7bit ? 153 : 67;

    if (message.length <= maxLengthPerSms) {
      return 1;
    } else {
      return Math.ceil(message.length / maxLengthPerPart);
    }
  }
  // 替换占位符的逻辑
  const replacePlaceholders = (input: string): string => {
    const replacements = {
      code: '4361',
      mobile: '521452354',
      name: 'Isioma Osamor',
      loan_amount: '2000',
      repay_amount: '2000',
      expect_repay_time: '2025-05-21',
      borrow_days: '7',
      overdue_days: '3',
      up_amount: '1500',
      bankcard_bank: 'Access Bank',
      bankcard_number: '6042209290',
      app_name: 'CashU',
      product_name: 'We Loan',
      recieve_bank: 'PALMPAY',
      recieve_bank_no: '6615155578',
    };

    return input.replace(/@(\w+)@/g, (match, p1) => replacements[p1] || match);
  };
  // 当模板输入变化时，更新预览
  const handleTemplateChange = (preview:string) => {
    let tmp = replacePlaceholders(preview);
    setPreview(tmp);
    setChargeCount(calculateSmsCount(tmp));
  };
  const uploadFile = async (options: UploadRequestOption) => {
    const formData = new FormData();
    formData.append('file', options.file);
    // console.log(options)
    formData.append('b_type', '3');
    // console.log(122343333)
    // console.log(formData)
    // 打印 FormData 的内容
    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
    const result = await request<{ success?: boolean; data?: number; message?: string }>(
      '/admin/v1/aLAdminFiles',
      {
        method: 'POST',
        data: formData,
      },
    );
    if (result.success && result.data! > 0) {
      setConfirmLoading(false);
      setFileId(result.data!);
      // @ts-ignore
      options.onSuccess(result.data!);
    } else {
    }
  };
  const _handleBeforeUpload = (file: RcFile) => {
    if (file.size <= 800 * 1024) return true;
    message.error('File must smaller than 2MB!');
    return false;
    /*    return new Promise<void>(() =>
          Modal.confirm({
            title: '文件大小错误',
            content: `文件大于800k,无法上传`,
            onOk() {
              // resolve();
            },
            onCancel() {
              // reject();
            },
          }),
        );*/
  };
  const _handleUploadChange = (info: UploadChangeParam) => info;



  return (
    <ModalForm<FormRecord>
      open={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onOpenChange={(visible) => {
        formRef.current?.resetFields();
        if (!visible) {
          setConfirmLoading(true);
          props.onCancel();
        }
      }}
      width={1400}
      // @ts-ignore
      request={async () => {
        if (props.id > 0) {
          const res = await show({ id: props.id });
          setCurrentTableListItemMoment(moment());
          setTableData(res.data!.a_a_a_a_a_k_sms_template_operators!);
          handleTemplateChange(res.data.d_template)
          res.data.b_node_type = [res.data!.b_node_type!, res.data!.c_type!];
          return res.data;
        } else {
          setCurrentTableListItemMoment(moment());
          setOldRecord({});
          return {};
        }
      }}
      formRef={formRef}
      onFinish={async (formData) => {
        console.log('Submitting data', tableData);
        console.log(formData);
        // @ts-ignore
        formData.a_a_a_a_a_k_sms_template_operators = JSON.stringify(tableData);
        const success = await onFinish(formData);
        if (success) {
          return props.onSubmit(success);
        }
      }}
      params={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      submitter={{
        submitButtonProps: {
          disabled: _confirmLoading,
        },
      }}
      initialValues={{
        l_type: 1,
        o_send_email: 1,
      }}
    >
      <ProFormText
        label={intl.formatMessage({ id: 'pages.HJSmsTemplate.e_sender_id', defaultMessage: '' })}
        name="a_sender_id"
      />
      <ProFormTextArea
        label={intl.formatMessage({ id: 'pages.HJSmsTemplate.d_template', defaultMessage: '' })}
        name="d_template"
        fieldProps={{
          onChange: (e) => {
            handleTemplateChange(e.target.value);
          },
        }}
        extra=" @code@验证码 @mobile@手机号 @name@姓名 @loan_amount@放款金额 @repay_amount@还款金额 @expect_repay_time@还款时间 @borrow_days@借款天数 @overdue_days@逾期天数 @up_amount@提额金额 @bankcard_bank@收款银行 @bankcard_number@收款银行卡号 @overdue_days@逾期天数 @app_name@APP名称 @product_name@产品名称  @recieve_bank@收款银行 @recieve_bank_no@收款账号"
      />
      <ProFormUploadButton
        label="Upload"
        accept=".xlsx"
        max={1}
        fieldProps={{
          name: 'file',
          customRequest: uploadFile,
          beforeUpload: _handleBeforeUpload,
          onChange: _handleUploadChange,
          maxCount: 1,
        }}
      />
      <ProFormDateTimePicker
        name="o_plan_time"
        label="发送时间"
      />

      <ProFormSelect
        label="默认通道"
        name="j_default_sms_channel_id"
        rules={[{ required: true, message: `请选择` }]}
        // @ts-ignore
        options={props.channels}
      />
      <ProFormRadio.Group
        label={intl.formatMessage({ id: 'pages.HJSmsTemplate.i_proportion', defaultMessage: '' })}
        name="i_proportion"
        radioType="button"
        options={COMMON_STATUS_INT_ARRAY}
      />

      <ProForm.Item name="a_a_a_a_a_k_sms_template_operators" label="分流">
        <EditableProTable<API.KSmsTemplateOperator>
          columns={columns}
          rowKey="id"
          expandable={{ expandedRowRender: expandedRowRender2 }}
          components={{
            header: {
              cell: BlueTableHeader,
            },
          }}
          onChange={(nestedTableData) => {
            console.log(123);
            console.log(nestedTableData);
            setTableData(nestedTableData);
          }}
          recordCreatorProps={{
            record: () => {
              return {
                id: parseInt((Math.random() * 1000000).toFixed(0)),
              };
            },
            creatorButtonText: '新增一个运营商',
            icon: <BankOutlined />,
          }}
          editable={{
            type: 'single',
            onlyAddOneLineAlertMessage: '111',
            actionRender: (row, config, defaultDom) => {
              return [defaultDom.save, defaultDom.delete || defaultDom.cancel];
            },
            deletePopconfirmMessage: '确定要删除这个运营商吗？',
          }}
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default EditForm;

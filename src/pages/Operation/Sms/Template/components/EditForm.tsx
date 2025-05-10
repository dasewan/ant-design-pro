import {COMMON_STATUS_INT_ARRAY, COMMON_STATUS_QIYONG_ARRAY} from '@/pages/enums';
import {
  getAdminV1HJSmsTemplatesId as show,
  putAdminV1HJSmsTemplatesId as update,
} from '@/services/ant-design-pro/HJSmsTemplate';
import { useIntl } from '@@/exports';
import { BankOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import {ProFormInstance, ProFormSelect} from '@ant-design/pro-form';
import {
  ModalForm,
  ProForm,
  ProFormCascader,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormTimePicker
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
        res = await update({ id: props.id, ...values });
      }else{
        res = await update({ id: 0, ...values });
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
      "code": "123456",
      "mobile": "13800138000",
      "name": "daniel osarumwens",
      "loan_amount": "5000",
      "expect_repay_amount": "5200",
      "expect_repay_time": "May 16, 2025",
      "borrow_days": "30",
      "overdue_days": "5",
      "up_amount": "1000.00",
      "app_name": "kaka loan market",
      "product_name": "weloan",
      "receive_bank": "Sterling Bank",
      "receive_bank_no": "5227281110",
      "account_name": "John Doe",
      "account_no": "5227281110",
      "account_bank": "HSBC",
      "url": "https://bit.ly/si3qdn"
    };

    return input.replace(/@(\w+)@/g, (match, p1) => replacements[p1] || match);
  };
  // 当模板输入变化时，更新预览
  const handleTemplateChange = (preview:string) => {
    let tmp = replacePlaceholders(preview);
    setPreview(tmp);
    setChargeCount(calculateSmsCount(tmp));
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
      initialValues={{
        l_type: 1,
        o_send_email: 1,
      }}
    >
        <ProFormText
            label={intl.formatMessage({ id: 'pages.HJSmsTemplate.e_sender_id', defaultMessage: '' })}
            name="s_name"
        />
      <ProFormCascader
        name="b_node_type"
        label="类型"
        fieldProps={{
          options: [
            {
              value: 100,
              label: '节点发送',
              children: [
                {
                  value: 1,
                  label: 'OTP',
                },
                {
                  value: 2,
                  label: '认证通过',
                },
                {
                  value: 3,
                  label: '认证拒绝',
                },
                {
                  value: 4,
                  label: '机审通过',
                },
                {
                  value: 5,
                  label: '机审拒绝',
                },
                {
                  value: 6,
                  label: '人审通过',
                },
                {
                  value: 7,
                  label: '人审拒绝',
                },
                {
                  value: 8,
                  label: '放款成功',
                },
                {
                  value: 9,
                  label: '放款失败',
                },
                {
                  value: 10,
                  label: '结清',
                },
                {
                  value: 11,
                  label: '还款失败',
                },
                {
                  value: 12,
                  label: '展期成功',
                },
                {
                  value: 13,
                  label: '部分还款成功',
                },
                {
                  value: 14,
                  label: '提额',
                },
                {
                  value: 15,
                  label: '减免',
                },
              ],
            },
            {
              value: 200,
              label: '计划任务',
              children: [
                {
                  value: 16,
                  label: '逾前提醒',
                },
                {
                  value: 17,
                  label: '还款日',
                },
                {
                  value: 18,
                  label: '轻度逾期',
                },
                {
                  value: 19,
                  label: '中度逾期',
                },
                {
                  value: 20,
                  label: '严重逾期',
                },
                {
                  value: 21,
                  label: '注册未认证',
                },
                {
                  value: 22,
                  label: '认证未签约',
                },
                {
                  value: 23,
                  label: '结清未复借',
                },
                {
                  value: 24,
                  label: '冷静期过期',
                },
              ],
            },
            {
              value: 300,
              label: '手动发送',
              children: [
                {
                  value: 25,
                  label: '营销短信',
                },
                {
                  value: 26,
                  label: '催收短信',
                }
              ],
            },
          ],
        }}
      />
      <ProFormDigit
        label={intl.formatMessage({ id: 'pages.HJSmsTemplate.e_days', defaultMessage: '' })}
        name="e_days"
        min={-7}
        fieldProps={{ precision: 0 }}
      />
      <ProFormTimePicker name="k_time" label={intl.formatMessage({ id: 'pages.HJSmsTemplate.k_time', defaultMessage: '' })} />
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
        extra="@code@验证码 @mobile@手机号 @name@姓名 @loan_amount@放款金额 @expect_repay_amount@还款金额 @expect_repay_time@还款时间 @borrow_days@借款天数 @overdue_days@逾期天数 @up_amount@提额金额@app_name@APP名称 @product_name@产品名称 @receive_bank@收款银行 @receive_bank_no@收款账号@account_name@AccountName @account_no@ AccountNo @account_bank@ AccountBank @url@ url"
      />
      <ProFormTextArea
        label={intl.formatMessage({ id: 'pages.HJSmsTemplate.template_preview', defaultMessage: '' })}
        name="template_preview"
        disabled={true}
        fieldProps={{
          value: preview,
        }}
        extra={`预计扣费：${chargeCount}条`}
      />
      <ProFormRadio.Group
        label={intl.formatMessage({ id: 'pages.HJSmsTemplate.f_status', defaultMessage: '' })}
        name="f_status"
        radioType="button"
        options={COMMON_STATUS_INT_ARRAY}
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

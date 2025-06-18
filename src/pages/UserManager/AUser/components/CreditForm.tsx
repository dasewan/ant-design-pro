import {
  getAdminV1ABCreditHistories as getABCreditHistories,
  postAdminV1ABCreditHistories as postABCreditHistories,
} from '@/services/ant-design-pro/ABCreditHistory';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormRadio, ProFormText,ProFormCheckbox } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, Col, Divider, message, Row, Typography } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from '../data';

const { Text } = Typography;

export type FormValueType = Partial<API.ABCreditHistory>;

export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  values: Partial<TableListItem>;
};

/**
 * 授信额度调整
 * @param fields
 * @param id
 */
const handle = async (fields: FormValueType, id: number | undefined) => {
  const hide = message.loading('正在配置');

  try {
    await postABCreditHistories({
      a_user_id: id,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *
 * @param props
 * @constructor
 */
const CreditForm: React.FC<FormProps> = (props) => {
  const [bType, setBType] = useState<number>(1);
  const [dAmount, setDAmount] = useState<number>(0);
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.ABCreditHistory>[] = [
    {
      title: '类型',
      dataIndex: 'b_type',
      key: 'b_type',
      render: (_, value) => {
        if (value.b_type === 1) {
          return '登陆';
        } else if (value.b_type === 2) {
          return '风控';
        } else if (value.b_type === 3) {
          return '还款';
        } else if (value.b_type === 4) {
          return '逾期';
        } else if (value.b_type === 5) {
          return '人工';
        }
      },
    },
    {
      title: '变更前额度',
      dataIndex: 'c_before_credit_amount',
      key: 'c_before_credit_amount',
    },
    {
      title: '变更额度',
      dataIndex: 'd_amount',
      key: 'd_amount',
      render: (_, value) => {
        if (value.d_amount! < 0) {
          return <Badge status="error" text={value.d_amount} />;
        } else if (value.d_amount! > 0) {
          return <Badge status="success" text={value.d_amount} />;
        }
        return 0;
      },
    },
    {
      title: '变更前信用分',
      dataIndex: 'i_before_credit_score',
      key: 'i_before_credit_score',
    },
    {
      title: '变更信用分',
      dataIndex: 'j_credit_score',
      key: 'j_credit_score',
      render: (_, value) => {
        if (value.j_credit_score! < 0) {
          return <Badge status="error" text={value.j_credit_score!} />;
        } else if (value.j_credit_score! > 0) {
          return <Badge status="success" text={value.j_credit_score!} />;
        }
        return 0;
      },
    },
    {
      title: '变更时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, value) => {
        return moment(value.created_at).format('YYYY-MM-DD');
      },
    },
    {
      title: '备注',
      dataIndex: 'h_comment',
      key: 'h_comment',
      ellipsis: true,
    },
  ];

  return (
    <ModalForm<API.ABCreditHistory>
      open={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onOpenChange={(visible) => {
        formRef.current?.resetFields();
        if (!visible) {
          setDAmount(0);
          props.onCancel();
        }
      }}
      formRef={formRef}
      onFinish={async (formData) => {
        setDAmount(0);
        const success = await handle(formData, props.values.id);
        return props.onSubmit(success);
      }}
      params={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <ProTable<API.ABCreditHistory, TableListPagination>
        headerTitle="授信历史"
        actionRef={actionRef}
        revalidateOnFocus={false}
        search={false}
        options={false}
        rowKey="id"
        // @ts-ignore
        request={() => getABCreditHistories({ a_user_id: props.values.id! })}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
      />
      <Divider />
      <ProFormRadio.Group
        style={{
          margin: 16,
        }}
        label="类型"
        radioType="button"
        name="b_type"
        rules={[{ required: true, message: '这是必填项' }]}
        fieldProps={{
          // defaultValue: 1,
          // value:bType,
          buttonStyle: 'solid',
          onChange: (e) => setBType(e.target.value),
        }}
        options={[
          {
            label: '提额',
            value: 1,
          },
          {
            label: '降额',
            value: '2',
          },
        ]}
      />

      <ProFormText
        tooltip="此字段为增量修改"
        label="修改额度"
        name="d_amount"
        width="sm"
        rules={[{ required: true, message: '这是必填项' }]}
        fieldProps={{
          addonBefore: bType === 1 ? '+' : '-',
          onChange: (e) => setDAmount(parseInt(e.target.value)),
        }}
      />
      {/* <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" /> */}
      <ProFormText
        // width="md"
        name="h_comment"
        label="备注"
        placeholder="请输入备注"
        rules={[{ required: true, message: '这是必填项' }]}
      />
      {/* todo */}
      <ProFormCheckbox
        name="send_notification"
        label="发送通知短信"
        initialValue={true}
      />
      <Row>
        <Col span={4} style={{ textAlign: 'right' }}>
          结果：
        </Col>
        <Col span={14}>
          <Text type="warning">
            修改后的额度为
            <Text type="success">
              {props.values.f_credit_amount}
              {bType === 1 ? '+' : '-'}
              {dAmount}=
              {bType === 1
                ? props.values.f_credit_amount! + dAmount
                : props.values.f_credit_amount! - dAmount}
            </Text>
          </Text>
        </Col>
      </Row>
    </ModalForm>
  );
};

export default CreditForm;

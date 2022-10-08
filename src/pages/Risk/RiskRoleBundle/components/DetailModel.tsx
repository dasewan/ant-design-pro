import type { FormValueType } from '@/pages/Risk/RiskRoleBundle/components/CreateForm';
import { getRiskItemEnum } from '@/pages/Risk/RiskRoleBundle/Detail/service';
import { EXECUTE_LOGIC_OPTION, FINNAL_DECISION_OPTION } from '@/pages/Risk/RiskRoleBundle/enums';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProFormDependency } from '@ant-design/pro-components';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { ProTable } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Card, Col, message, Row, Select, Tooltip } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { useParams } from 'umi';
import styles from '../Detail/style.less';
import { FieldIndex, FieldIndex2, FieldLabels, FieldLabels2 } from '../service';

export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (switchNewRiskRoleBundleId: number) => Promise<void>;
  modalVisible: boolean;
  id: number;
  data: API.BDRiskRoleBundle[];
  roleItems: RequestOptionsType[];
  version: number;
};

type versionOptionType = { label?: React.ReactNode; value?: number };
const { Option } = Select;
// 切换规则版本
const DetailModel: FC<FormProps> = (props) => {
  const params = useParams<{ id: string }>();
  /** 大表单ref **/
  const formRef = useRef<ProFormInstance<any>>();
  /** edittable action ref **/
  const actionRef = useRef<ActionType>();
  /** 当前规则集 */
  const [dataSource, setDataSource] = useState<API.GFRiskRole[]>([]);
  /** 所有版本 (切换版本使用)**/
  const [versions, setVersions] = useState<versionOptionType[]>([]);
  /** 所有版本 (切换版本使用)**/
  const [currentId, setCurrentId] = useState<number>(0);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  /** 风控字段enum */
  const [roleItems, setRoleItems] = useState<RequestOptionsType[]>(props.roleItems);

  /**
   * 查询风控字段enum
   */
  const _getRoleItemEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (roleItems.length == 0) {
      const res = await getRiskItemEnum({ foo: 1 });
      for (const cat of res.data!) {
        const children = [];
        for (const item of cat.a_a_a_a_g_d_risk_item!) {
          children.push({
            label: item.a_name,
            value: item.id,
            description: item.g_description,
          });
        }
        data.push({
          label: cat.b_name,
          value: cat.id,
          children,
        });
      }
      setRoleItems(data);
      return data;
    } else {
      return roleItems;
    }
  };

  /**
   * 初始请求或者切换版本
   * @param version
   */
  const _index = async (version = 0) => {
    // @ts-ignore
    if (params.id > 0) {
      if (version == 0) {
        await _getRoleItemEnum();
        const targetVersionData = props.data!.find((item) => item.j_version == props.version)!;
        // @ts-ignore
        setDataSource(targetVersionData.a_a_a_a_g_f_risk_role!);
        const tmpVersion: versionOptionType[] = [];
        props.data!.map((item: API.BDRiskRoleBundle) => {
          tmpVersion.push({
            label: (
              <>
                <span style={{ fontSize: 18, fontWeight: 500 }}>{item.j_version}</span>&nbsp;
                <span style={{ fontSize: 16 }}>({item.c_related_role_count})</span>&nbsp;
                <span style={{ fontSize: 6 }}>
                  {moment(item.created_at).format('YYYY-MM-DD HH:mm')}
                </span>
              </>
            ),
            value: item.j_version,
          });
        });
        setVersions(tmpVersion);
        setCurrentId(targetVersionData.id!);
        setButtonDisabled(targetVersionData.id == props.id);
        console.log(targetVersionData.id, props.id);
        return {
          ...targetVersionData,
        };
      } else {
        await _getRoleItemEnum();
        const targetVersionData = props.data!.find((item) => item.j_version == version)!;
        setDataSource(targetVersionData.a_a_a_a_g_f_risk_role!);
        const n_execute_logic_tmp = {};
        targetVersionData.a_a_a_a_g_f_risk_role!.map((item) => {
          n_execute_logic_tmp['n_execute_logic' + item.b_risk_role_group_id] = item.n_execute_logic;
        });
        setCurrentId(targetVersionData!.id!);
        setButtonDisabled(targetVersionData.id == props.id);
        console.log(targetVersionData.id, props.id);
        return {
          ...targetVersionData,
          ...n_execute_logic_tmp,
        };
      }
    } else {
      await _getRoleItemEnum();
      return {};
    }
  };

  // columns 属性前为editTable 相关方法，columns属性后位高级表单方法
  const columns: ProColumns<API.GFRiskRole>[] = [
    {
      title: FieldLabels2.n_execute_logic,
      dataIndex: FieldIndex2.a_risk_role_bundle_id,
      ellipsis: true,
      width: 60,
      onCell: (row) => {
        if (row.l_group_count! > 1) {
          if (row.m_group_index == 1) {
            return { rowSpan: row.l_group_count! };
          } else {
            return { rowSpan: 0 };
          }
        }
        return {};
      },
      render: (_, row) => {
        if (row.l_group_count! > 1) {
          if (row.m_group_index == 1) {
            return row.n_execute_logic;
          } else {
            return null;
          }
        }
        return null;
      },
    },
    // 字段id
    {
      title: FieldLabels2.c_risk_item_id,
      dataIndex: FieldIndex2.c_risk_item_id,
      valueType: 'cascader',
      ellipsis: true,
      width: '25%',
      request: async () => _getRoleItemEnum(),
    },
    // 算术运算公式
    {
      title: FieldLabels2.e_value_operator,
      key: FieldIndex2.e_value_operator,
    },
    // 关系运算符
    {
      title: FieldLabels2.f_relational_operator,
      dataIndex: FieldIndex2.f_relational_operator,
      valueType: 'select',
      width: 100,
      request: async () => [
        {
          value: 'gt',
          label: '大于',
        },
        {
          value: 'lt',
          label: '小于',
        },
      ],
    },
    // 对比类型
    {
      title: FieldLabels2.g_compare_type,
      dataIndex: FieldIndex2.g_compare_type,
      valueType: 'select',
      width: 80,
      request: async () => [
        {
          value: 'const',
          label: '常量',
        },
        {
          value: 'operator',
          label: '变量',
        },
      ],
    },
    // 对比字段
    {
      title: FieldLabels2.h_compare_risk_item_id,
      dataIndex: FieldIndex2.h_compare_risk_item_id,
      ellipsis: true,
      valueType: 'cascader',
      request: async () => _getRoleItemEnum(),
      width: 120,
    },
    // 算术运算公式
    {
      title: FieldLabels2.j_compare_value_operator,
      dataIndex: FieldIndex2.j_compare_value_operator,
      width: '20%',
      ellipsis: true,
    },
  ];

  /**
   * 提交表单
   * @param values
   */
  const onFinish = async (values: Record<string, any>) => {
    message.loading('正在提交');
    values.table = values.table?.map((item: API.GFRiskRole) => JSON.stringify(item)).join('##');
    try {
      message.success('提交成功');
    } catch {}
    return true;
  };

  return (
    <ModalForm
      layout="vertical"
      visible={props.modalVisible}
      modalProps={{ destroyOnClose: true }}
      width={1900}
      formRef={formRef}
      // initialValues={{...oldRecord}}
      /*onFinish={async (formData) => {
        const success = await onFinish(formData);
        if (success) {
          return props.onSubmit(currentId);
        }
      }}*/

      submitter={{
        render: () => {
          return [
            <Button
              key="back"
              onClick={() => {
                props.onCancel();
              }}
            >
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              disabled={buttonDisabled}
              onClick={async (formData) => {
                const success = await onFinish(formData);
                if (success) {
                  return props.onSubmit(currentId);
                }
              }}
            >
              切换
            </Button>,
          ];
        },
      }}
      onVisibleChange={(visible) => {
        formRef.current?.resetFields();
        if (!visible) {
          props.onCancel();
        }
      }}
      // initialValues={{
      //   table: dataSource,
      // }}
      // @ts-ignore
      request={_index}
    >
      <Card
        title="基础内容"
        className={styles.card}
        bordered={false}
        extra={
          <>
            <Tooltip title="版本号 (细则数量) 创建时间">
              版本数: {versions?.length} <QuestionCircleOutlined />
            </Tooltip>
            <Select
              defaultValue={props.version}
              placeholder={'查看历史版本'}
              style={{ width: 200 }}
              onChange={async (value) => {
                await _index(value);
                message.loading('正在切换', 1);
                // formRef.current?.setFieldsValue(versionData);
              }}
            >
              {versions?.map((value) => (
                <Option value={value.value} key={value.value}>
                  {value.label}
                </Option>
              ))}
            </Select>
          </>
        }
      >
        <ProFormDependency name={['table']}>
          {() => {
            return (
              <>
                <Row gutter={16}>
                  <Col xl={{ span: 4 }} lg={6} md={12} sm={24}>
                    <ProFormText
                      label={FieldLabels.a_name}
                      tooltip={<>CPA:balabala</>}
                      name={FieldIndex.a_name}
                      disabled={true}
                      placeholder={`请输入${FieldLabels.a_name}`}
                    />
                  </Col>
                  <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <ProFormDigit
                      label={FieldLabels.d_score_upper_limit}
                      tooltip={<>CPA:balabala</>}
                      name={FieldIndex.d_score_upper_limit}
                      disabled={true}
                      placeholder={`请输入${FieldLabels.d_score_upper_limit}`}
                    />
                  </Col>
                  <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <ProFormSelect
                      label={FieldLabels.e_execute_logic}
                      name={FieldIndex.e_execute_logic}
                      options={EXECUTE_LOGIC_OPTION}
                      disabled={true}
                    />
                  </Col>
                  <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <ProFormSelect
                      label={FieldLabels.f_finnal_decision}
                      name={FieldIndex.f_finnal_decision}
                      disabled={true}
                      options={FINNAL_DECISION_OPTION}
                    />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xl={{ span: 22 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <ProFormText
                      label={FieldLabels.g_description}
                      tooltip={<>CPA:balabala</>}
                      name={FieldIndex.g_description}
                      placeholder={`请输入${FieldLabels.g_description}`}
                      disabled={true}
                    />
                  </Col>
                </Row>
              </>
            );
          }}
        </ProFormDependency>
      </Card>
      <Card title="细则" className={styles.card} bordered={false}>
        <ProTable<API.GFRiskRole>
          rowKey="id"
          scroll={{
            x: true,
          }}
          search={false}
          toolBarRender={false}
          actionRef={actionRef}
          bordered={true}
          name="table"
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    </ModalForm>
  );
};

export default DetailModel;

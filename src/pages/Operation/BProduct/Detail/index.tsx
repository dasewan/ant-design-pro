import OverviewModel from '@/pages/Operation/BProduct/components/OverviewModel';
import Snapshot from '@/pages/Operation/BProduct/components/Snapshot';
import TryCalcuteModel from '@/pages/Operation/BProduct/components/TryCalcuteModel';
import {
  AMOUNT_TYPE_OPTION,
  COMMON_STATUS_ALLOW_OPTION,
  PRODUCT_SETTLEMENT_OPTION,
  PRODUCT_TYPE_OPTION,
} from '@/pages/Operation/BProduct/enums';
import {
  getAdminV1BProductsId as show,
  postAdminV1BProducts as store,
  putAdminV1BProductsId as update,
} from '@/services/ant-design-pro/BProduct';
import { history } from '@@/core/history';
import {
  CloseCircleOutlined,
  FireOutlined,
  QuestionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ProForm, {
  ProFormCheckbox,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { Button, Card, Col, message, Popover, Row, Tooltip } from 'antd';
import { toInteger } from 'lodash';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { useParams } from 'umi';
import { fieldLabels } from '../service';
import type { TableListItem } from './data';
import styles from './style.less';
import {useIntl} from '@@/exports';

interface TableFormDateType {
  id: React.Key;
  b_title?: string;
  c_content?: string;
  isNew?: boolean;
  editable?: boolean;
}

type InternalNamePath = (string | number)[];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

export type tryCalcuteType = {
  borrowAmount: number;
  repayAmount: number;
  loanAmount: number;
  serviceFee: number;
  intersetFee: number;
  violateFee: number;
  overdueAmount: number;
  settlementType: number;
};

const AdvancedForm: FC<Record<string, any>> = () => {
  const intl = useIntl();
  const [error, setError] = useState<ErrorField[]>([]);
  const formRef = useRef<FormInstance>();
  // const inputRef = useRef<InputRef>(null);
  /** 产品字段 */
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  /** 试算数据 */
  const [newRecord, setNewRecord] = useState<TableListItem>();
  /** 产品类型 */
  const [oType, setOType] = useState<number>(1);
  /** 产品额度类型 */
  const [aAAmountType, setAAAmountType] = useState<number>(1);
  /** 是否可以部分还款 */
  const [mCanPartPay, setMCanPartPay] = useState<string>('y');
  /** 是否可以展期 */
  const [nCanExtend, setNCanExtend] = useState<string>('y');
  /** 结算方式 */
  // const [fSettlementType, setFSettlementType] = useState<number>(1);
  /** 试算model */
  const [tryCalcuteModalVisible, setTryCalcuteModalVisible] = useState<boolean>(false);

  /** 预览model */
  const [overviewModalVisible, setOverviewModalVisible] = useState<boolean>(false);
  /** 快照model */
  const [snapshotModalVisible, setSnapshotModalVisible] = useState<boolean>(false);

  const params = useParams<{ id: string }>();

  // useEffect(async () => {
  //   // @ts-ignore
  //   const res = await show(params);
  //   setOldRecord(res.data);
  //   console.log(123);
  //   console.log(res.data);
  //
  //   return () => {
  //   };
  // }, []);

  /**
   * 展示错误信息
   * @param errors
   */
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  /**
   * 提交表单
   * @param values
   */
  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      console.log(values);
      values.a_d_tags = values.a_d_tags.join(',');
      values.a_a_a_a_b_c_product_features = values.a_a_a_a_b_c_product_features
        ?.map(
          (item: TableFormDateType) =>
            (item.id ? item.id : 0) + '#' + item.b_title + '#' + item.c_content,
        )
        .join('##');
      // @ts-ignore
      if (params.id > 0) {
        // @ts-ignore
        await update({ ...params, ...values });
      } else {
        // @ts-ignore
        await store(values);
      }
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
      history.push(`/operation/product`);
    } catch {
      // console.log
    }
  };

  /**
   * 表单校验失败
   * @param errorInfo
   */
  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };
  /**
   * 展示试算model
   */
  const onTryCalcuteClick = () => {
    console.log(formRef?.current?.getFieldsValue().a_a_amount_type);
    formRef?.current
      ?.validateFields([
        'a_a_amount_type',
        'c_amount',
        'h_service_fee_rate',
        'g_interest',
        'j_violate_fee_rate',
        'i_overdue_rate',
        'f_settlement_type',
      ])
      .then((values) => {
        if (values.a_a_amount_type === 1) {
          // formRef?.current?.setFieldsValue({c_amount:1000});
          values.c_amount = 1000;
        }
        setNewRecord(values);
        setTryCalcuteModalVisible(true);
        // Promise.resolve() : Promise.reject(new Error(`旧值：   ${oldRecord?.b_name}`))
        return Promise.resolve();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
        message.error({
          content: '请输入金额计算相关信息的填写',
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      });
  };

  /**
   * 关闭试算model
   */
  const onTryCalcuteModelOk = () => {
    setTryCalcuteModalVisible(false);
  };

  /**
   * 展示预览model
   */
  const onOverviewClick = () => {
    setNewRecord(formRef?.current?.getFieldsValue);
    setOverviewModalVisible(true);
  };

  /**
   * 关闭预览model
   */
  const onOverviewModelOk = () => {
    setOverviewModalVisible(false);
  };

  /**
   * 展示快照model
   */
  const onSnapshotClick = () => {
    setSnapshotModalVisible(true);
  };

  /**
   * 关闭快照model
   */
  const onSnapshotModelOk = () => {
    setSnapshotModalVisible(false);
  };

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: '标题',
      dataIndex: 'b_title',
      key: 'b_title',
      width: '40%',
    },
    {
      title: '内容',
      dataIndex: 'c_content',
      key: 'c_content',
      width: '40%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.id);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <ProForm
      layout="vertical"
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              <Button
                htmlType="button"
                style={{ margin: '0 8px' }}
                onClick={() => {
                  history.push(`/operation/product`);
                }}
              >
                返回列表
              </Button>
              <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onOverviewClick}>
                预览
              </Button>
              <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onTryCalcuteClick}>
                试算
              </Button>
              {/*@ts-ignore*/}
              <Button
                htmlType="button"
                style={{ margin: '0 8px' }}
                disabled={params.id <= 0}
                onClick={onSnapshotClick}
              >
                快照
              </Button>
              {dom}
            </FooterToolbar>
          );
        },
      }}
      formRef={formRef}
      // initialValues={{...oldRecord}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      // @ts-ignore
      request={async () => {
        // @ts-ignore
        if (params.id > 0) {
          // @ts-ignore
          const res = await show(params);
          // fieldProps={{defaultValue:oldRecord?.a_d_tags?.split(',')}}
          setOldRecord(res.data);
          setOType(res.data!.o_type!);
          setAAAmountType(res.data!.a_a_amount_type!);
          setMCanPartPay(res.data!.m_can_part_pay!);
          setNCanExtend(res.data!.n_can_extend!);
          // @ts-ignore
          res.data.a_d_tags = res.data.a_d_tags?.split(',');
          console.log(res.data);
          // a_d_tags
          return res.data;
        } else {
          return {};
        }
      }}
    >
      <PageContainer content="高级表单常见于一次性输入和提交大批量数据的场景。">
        <Card title="基本信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={{ span: 4 }} lg={6} md={12} sm={24}>
              <ProFormText
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.b_name}
                  </>
                }
                name="b_name"
                rules={[
                  { required: true, message: `请输入${fieldLabels.b_name}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.b_name || !oldRecord?.b_name
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.b_name}`));
                    },
                    warningOnly: true,
                  },
                ]}
                placeholder={`请输入${fieldLabels.b_name}`}
                // fieldRef={inputRef}
                // validateStatus={"warning"}
                // fieldProps={{status: formRef?.current?.getFieldsValue().b_name !== oldRecord?.b_name ? "warning": undefined}}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                label={fieldLabels.o_type}
                name="o_type"
                rules={[
                  { required: true, message: `请选择${fieldLabels.o_type}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.o_type || !oldRecord?.o_type
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              `旧值：   ${
                                oldRecord?.o_type === 1
                                  ? '真实产品'
                                  : oldRecord?.o_type === 3
                                  ? '贷超产品'
                                  : '虚拟产品'
                              }`,
                            ),
                          );
                    },
                    warningOnly: true,
                  },
                ]}
                options={PRODUCT_TYPE_OPTION}
                fieldProps={{
                  onChange: (value) => {
                    setOType(value);
                    formRef?.current?.resetFields(['p_url']);
                  },
                }}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<>{fieldLabels.p_url}</>}
                name="p_url"
                disabled={oType !== 3}
                rules={[
                  { required: oType === 3, message: `请输入${fieldLabels.p_url}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.p_url || !oldRecord?.p_url
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.p_url}`));
                    },
                    warningOnly: true,
                  },
                ]}
                placeholder={`请输入${fieldLabels.p_url}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={
                  <>
                    {fieldLabels.a_a_amount_type} &nbsp;&nbsp;
                    <Tooltip placement="right" title={<>灵活额度:用户可借最大额度为授信额度</>}>
                      <QuestionOutlined />
                    </Tooltip>
                  </>
                }
                name="a_a_amount_type"
                rules={[
                  { required: true, message: `请选择${fieldLabels.a_a_amount_type}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.a_a_amount_type || !oldRecord?.a_a_amount_type
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              `旧值：   ${
                                oldRecord?.a_a_amount_type === 1 ? '灵活额度' : '固定额度'
                              }`,
                            ),
                          );
                    },
                    warningOnly: true,
                  },
                ]}
                options={AMOUNT_TYPE_OPTION}
                fieldProps={{
                  onChange: (value) => {
                    setAAAmountType(value);
                    formRef?.current?.resetFields(['c_amount']);
                  },
                }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xl={{ span: 4 }} lg={6} md={12} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.a_b_day_valid_count} &nbsp;&nbsp;
                    <Tooltip placement="right" title="0表示不限制">
                      <QuestionOutlined />{' '}
                    </Tooltip>
                  </>
                }
                name="a_b_day_valid_count"
                rules={[
                  { required: true, message: `请输入${fieldLabels.a_b_day_valid_count}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.a_b_day_valid_count ||
                        !oldRecord?.a_b_day_valid_count
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.a_b_day_valid_count}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0 }}
                placeholder={`请输入${fieldLabels.a_b_day_valid_count}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                name="m_can_part_pay"
                label={<>{fieldLabels.m_can_part_pay}</>}
                rules={[
                  { required: true, message: `请选择${fieldLabels.m_can_part_pay}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.m_can_part_pay || !oldRecord?.m_can_part_pay
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              `旧值：   ${oldRecord?.m_can_part_pay === 'y' ? '允许' : '不允许'}`,
                            ),
                          );
                    },
                    warningOnly: true,
                  },
                ]}
                options={COMMON_STATUS_ALLOW_OPTION}
                fieldProps={{
                  onChange: (value) => {
                    setMCanPartPay(value);
                    formRef?.current?.resetFields(['l_min_pay']);
                  },
                }}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                name="n_can_extend"
                label={<>{fieldLabels.n_can_extend}</>}
                rules={[
                  { required: true, message: `请选择${fieldLabels.n_can_extend}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.n_can_extend || !oldRecord?.n_can_extend
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              `旧值：   ${oldRecord?.n_can_extend === 'y' ? '允许' : '不允许'}`,
                            ),
                          );
                    },
                    warningOnly: true,
                  },
                ]}
                options={COMMON_STATUS_ALLOW_OPTION}
                fieldProps={{
                  onChange: (value) => {
                    setNCanExtend(value);
                    formRef?.current?.resetFields(['k_extend_rate']);
                  },
                }}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                name="u_status"
                label={<>{fieldLabels.u_status}</>}
                rules={[
                  { required: true, message: `请选择${fieldLabels.u_status}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.u_status || !oldRecord?.u_status
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(`旧值：   ${oldRecord?.u_status === 'y' ? '显示' : '隐藏'}`),
                          );
                    },
                    warningOnly: true,
                  },
                ]}
                options={[
                  {
                    value: 'y',
                    label: '显示',
                  },
                  {
                    value: 'n',
                    label: '隐藏',
                  },
                ]}
              />
            </Col>
          </Row>
        </Card>
        <Card title="金额计算" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={{ span: 4 }} lg={6} md={12} sm={24}>
              <ProFormSelect
                name="f_settlement_type"
                label={<>{fieldLabels.f_settlement_type}</>}
                rules={[
                  { required: true, message: `请选择${fieldLabels.f_settlement_type}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.f_settlement_type || !oldRecord?.f_settlement_type
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              `旧值：   ${
                                oldRecord?.f_settlement_type === 1
                                  ? '头收'
                                  : oldRecord?.f_settlement_type === 2
                                  ? '只头收服务费'
                                  : '后收'
                              }`,
                            ),
                          );
                    },
                    warningOnly: true,
                  },
                ]}
                options={PRODUCT_SETTLEMENT_OPTION}
                placeholder={`请选择${fieldLabels.f_settlement_type}`}
                fieldProps={
                  {
                    // onChange: (value) => setFSettlementType(value),
                  }
                }
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.c_amount} &nbsp;&nbsp;
                    <Tooltip placement="right" title="产品额度类型为固定额度才可用">
                      <QuestionOutlined />
                    </Tooltip>
                  </>
                }
                name="c_amount"
                disabled={aAAmountType !== 2}
                rules={[
                  { required: aAAmountType === 2, message: `请输入${fieldLabels.c_amount}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.c_amount || !oldRecord?.c_amount
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.c_amount}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0 }}
                placeholder={`请输入${fieldLabels.c_amount}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.z_period} &nbsp;&nbsp;
                    <Tooltip placement="right" title="输入1则不分期">
                      <QuestionOutlined />
                    </Tooltip>
                  </>
                }
                name="z_period"
                rules={[
                  { required: true, message: `请输入${fieldLabels.z_period}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.z_period || !oldRecord?.z_period
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.z_period}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0 }}
                placeholder={`请输入${fieldLabels.z_period}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.e_life} &nbsp;&nbsp;
                  </>
                }
                name="e_life"
                rules={[
                  { required: true, message: `请输入${fieldLabels.e_life}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.e_life || !oldRecord?.e_life
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.e_life}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0, addonAfter: 'Day' }}
                placeholder={`请输入${fieldLabels.e_life}`}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xl={{ span: 4 }} lg={6} md={12} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.g_interest} &nbsp;&nbsp;
                  </>
                }
                name="g_interest"
                rules={[
                  { required: true, message: `请输入${fieldLabels.g_interest}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.g_interest || !oldRecord?.g_interest
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.g_interest}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0, addonAfter: '‱' }}
                placeholder={`请输入${fieldLabels.g_interest}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.h_service_fee_rate} &nbsp;&nbsp;
                  </>
                }
                name="h_service_fee_rate"
                rules={[
                  { required: true, message: `请输入${fieldLabels.h_service_fee_rate}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.h_service_fee_rate ||
                        !oldRecord?.h_service_fee_rate
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.h_service_fee_rate}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0, addonAfter: '%' }}
                placeholder={`请输入${fieldLabels.h_service_fee_rate}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.i_overdue_rate} &nbsp;&nbsp;
                  </>
                }
                name="i_overdue_rate"
                rules={[
                  { required: true, message: `请输入${fieldLabels.i_overdue_rate}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.i_overdue_rate || !oldRecord?.i_overdue_rate
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.i_overdue_rate}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0, addonAfter: '%' }}
                placeholder={`请输入${fieldLabels.i_overdue_rate}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.j_violate_fee_rate} &nbsp;&nbsp;
                  </>
                }
                name="j_violate_fee_rate"
                rules={[
                  { required: true, message: `请输入${fieldLabels.j_violate_fee_rate}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.j_violate_fee_rate ||
                        !oldRecord?.j_violate_fee_rate
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.j_violate_fee_rate}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0, addonAfter: '%' }}
                placeholder={`请输入${fieldLabels.j_violate_fee_rate}`}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xl={{ span: 4 }} lg={6} md={12} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.k_extend_rate} &nbsp;&nbsp;
                  </>
                }
                name="k_extend_rate"
                rules={[
                  { required: nCanExtend === 'y', message: `请输入${fieldLabels.k_extend_rate}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.k_extend_rate || !oldRecord?.k_extend_rate
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.k_extend_rate}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0, addonAfter: '%' }}
                placeholder={`请输入${fieldLabels.k_extend_rate}`}
                disabled={nCanExtend !== 'y'}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormDigit
                label={
                  <>
                    <UserOutlined />
                    &nbsp;&nbsp;{fieldLabels.l_min_pay} &nbsp;&nbsp;
                  </>
                }
                name="l_min_pay"
                rules={[
                  { required: mCanPartPay === 'y', message: `请输入${fieldLabels.l_min_pay}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.l_min_pay || !oldRecord?.l_min_pay
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.l_min_pay}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0, addonAfter: '$' }}
                placeholder={`请输入${fieldLabels.l_min_pay}`}
                disabled={mCanPartPay !== 'y'}
              />
            </Col>
          </Row>
        </Card>
        <Card title="可借条件" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={{ span: 4 }} lg={6} md={12} sm={24}>
              <ProFormDigit
                label={<>{fieldLabels.q_unlock_credit_fraction}</>}
                name="q_unlock_credit_fraction"
                rules={[
                  { required: true, message: `请输入${fieldLabels.q_unlock_credit_fraction}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.q_unlock_credit_fraction ||
                        !oldRecord?.q_unlock_credit_fraction
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(`旧值：   ${oldRecord?.q_unlock_credit_fraction}`),
                          );
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0 }}
                placeholder={`请输入${fieldLabels.q_unlock_credit_fraction}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormDigit
                label={<>{fieldLabels.r_settled_times}</>}
                name="r_settled_times"
                rules={[
                  { required: true, message: `请输入${fieldLabels.r_settled_times}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.r_settled_times || !oldRecord?.r_settled_times
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.r_settled_times}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0 }}
                placeholder={`请输入${fieldLabels.r_settled_times}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormDigit
                label={<>{fieldLabels.s_max_overdue_days}</>}
                name="s_max_overdue_days"
                rules={[
                  { required: true, message: `请输入${fieldLabels.s_max_overdue_days}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.s_max_overdue_days ||
                        !oldRecord?.s_max_overdue_days
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.s_max_overdue_days}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0 }}
                placeholder={`请输入${fieldLabels.s_max_overdue_days}`}
              />
            </Col>
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormDigit
                label={<>{fieldLabels.t_max_overdue_times}</>}
                name="t_max_overdue_times"
                rules={[
                  { required: true, message: `请输入${fieldLabels.t_max_overdue_times}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.t_max_overdue_times ||
                        !oldRecord?.t_max_overdue_times
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.t_max_overdue_times}`));
                    },
                    warningOnly: true,
                  },
                ]}
                fieldProps={{ precision: 0 }}
                placeholder={`请输入${fieldLabels.t_max_overdue_times}`}
              />
            </Col>
          </Row>
        </Card>
        <Card title="营销信息和其他" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={{ span: 4 }} lg={6} md={12} sm={24}>
              <ProFormCheckbox.Group
                name="a_d_tags"
                label={<>{fieldLabels.a_d_tags}</>}
                // fieldProps={{defaultValue:oldRecord?.a_d_tags?.split(',')}}
                request={async () => [
                  {
                    label: (
                      <Tooltip placement="top" title={<>火热产品</>}>
                        <FireOutlined />{' '}
                      </Tooltip>
                    ),
                    value: '1',
                  },
                  {
                    label: (
                      <Tooltip placement="top" title={<>火热产品</>}>
                        <FireOutlined />{' '}
                      </Tooltip>
                    ),
                    value: '2',
                  },
                  {
                    label: (
                      <Tooltip placement="top" title={<>火热产品</>}>
                        <FireOutlined />{' '}
                      </Tooltip>
                    ),
                    value: '3',
                  },
                  {
                    label: (
                      <Tooltip placement="top" title={<>火热产品</>}>
                        <FireOutlined />{' '}
                      </Tooltip>
                    ),
                    value: '4',
                  },
                  {
                    label: (
                      <Tooltip placement="top" title={<>火热产品</>}>
                        <FireOutlined />{' '}
                      </Tooltip>
                    ),
                    value: '5',
                  },
                  {
                    label: (
                      <Tooltip placement="top" title={<>火热产品</>}>
                        <FireOutlined />{' '}
                      </Tooltip>
                    ),
                    value: '6',
                  },
                ]}
                placeholder="Please select a tags"
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<>{fieldLabels.x_introduction}</>}
                name="x_introduction"
                rules={[
                  { required: true, message: `请输入${fieldLabels.x_introduction}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.x_introduction || !oldRecord?.x_introduction
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.x_introduction}`));
                    },
                    warningOnly: true,
                  },
                ]}
                placeholder={`请输入${fieldLabels.x_introduction}`}
              />
            </Col>
            <Col xl={{ span: 8, offset: 1 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<>{fieldLabels.y_comment}</>}
                name="y_comment"
                rules={[
                  { required: true, message: `请输入${fieldLabels.y_comment}` },
                  {
                    validator: (_, value) => {
                      return value === oldRecord?.y_comment || !oldRecord?.y_comment
                        ? Promise.resolve()
                        : Promise.reject(new Error(`旧值：   ${oldRecord?.y_comment}`));
                    },
                    warningOnly: true,
                  },
                ]}
                placeholder={`请输入${fieldLabels.y_comment}`}
              />
            </Col>
          </Row>
        </Card>
        <Card title="产品特点" bordered={false}>
          <ProForm.Item name="a_a_a_a_b_c_product_features">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }}
              columns={columns}
              rowKey="id"
            />
          </ProForm.Item>
        </Card>
        {/*试算*/}
        <TryCalcuteModel
          onOk={onTryCalcuteModelOk}
          modalVisible={tryCalcuteModalVisible}
          record={newRecord!}
        />
        {/*预览*/}
        <OverviewModel
          onOk={onOverviewModelOk}
          modalVisible={overviewModalVisible}
          oldRecord={oldRecord!}
          record={newRecord!}
        />
        {/*快照*/}
        <Snapshot
          onOk={onSnapshotModelOk}
          modalVisible={snapshotModalVisible}
          productId={toInteger(params.id)}
        />
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;

import DetailModel from '@/pages/Risk/RiskRoleBundle/components/DetailModel';
import { EXECUTE_LOGIC, FINNAL_DECISION } from '@/pages/Risk/RiskRoleBundle/enums';
import RiskRoleBundleTableModel from '@/pages/Risk/RiskStrategyBundle/Detail/components/RiskRoleBundleTableModel';
import { FUSE, FUSE_OPTION } from '@/pages/Risk/RiskStrategyBundle/enums';
import { getAdminV1BDRiskRoleBundles as riskRoleBundleIndex } from '@/services/ant-design-pro/BDRiskRoleBundle';
import { history } from '@@/core/history';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  MenuOutlined,
  MinusSquareOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProFormDependency } from '@ant-design/pro-components';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { ProTable } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Card, Col, message, Popconfirm, Popover, Row, Select, Tag, Tooltip } from 'antd';
import update from 'immutability-helper';
import moment from 'moment';
import type { FC } from 'react';
import React, { useCallback, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'umi';
import {
  FieldIndex as RiskRoleBundleFieldIndex,
  FieldLabels as RiskRoleBundleFieldLabels,
} from '../../RiskRoleBundle/service';
import { FieldIndex, FieldIndex2, FieldLabels, FieldLabels2 } from '../service';
import type { TableListItem } from './data';
import styles from './style.less';

import { getAdminV1GDRiskItemEnum as getRiskItemEnum } from '@/services/ant-design-pro/GDRiskItem';
import {
  deleteAdminV1GGRiskStrateiesId as destroy,
  getAdminV1GGRiskStrateiesId as show,
  postAdminV1GGRiskStrateies as store,
} from '@/services/ant-design-pro/GGRiskStratey';

type InternalNamePath = (string | number)[];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

// 拖拽排序模版start
interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};
// 拖拽排序模版end

type BDRiskRoleBundle = API.BDRiskRoleBundle;
type versionOptionType = { label?: React.ReactNode; value?: number };
const { Option } = Select;

const AdvancedForm: FC<Record<string, any>> = () => {
  const [error, setError] = useState<ErrorField[]>([]);
  const params = useParams<{ id: string }>();
  /** 大表单ref **/
  const formRef = useRef<ProFormInstance<any>>();
  /** 当前策略 */
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  /** 所有策略版本 (切换版本使用)**/
  const [versions, setVersions] = useState<versionOptionType[]>([]);
  /** 当前策略id (删除策略版本使用)**/
  const [currentId, setCurrentId] = useState<number>(0);
  /** 风控字段enum */
  const [roleItems, setRoleItems] = useState<RequestOptionsType[]>([]);
  /** 服务端原始返回 (切换版本使用)**/
  const [rawResultData, setRawResultData] = useState<TableListItem[]>();
  /** 所有的规则 */
  const [riskRoleBundleData, setRiskRoleBundleData] = useState<BDRiskRoleBundle[]>();
  /** 列表中的规则 */
  const [riskRoleBundleTableData, setRiskRoleBundleTableData] = useState<BDRiskRoleBundle[]>();
  /** 列表中的规则code */
  const [riskRoleBundleCodeTableData, setRiskRoleBundleCodeTableData] = useState<string[]>();
  /** 新增规则model */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 新增规则集model中的去重数据 */
  const [riskRoleBundleUniqueData, setRiskRoleBundleUniqueData] = useState<BDRiskRoleBundle[]>();
  /** 切换规则版本model */
  const [tableModalVisible, handleTableModalVisible] = useState<boolean>(false);
  /** 切换规则版本的当前版本 */
  const [modelVersion, setModelVersion] = useState<number>(0);
  /** 切换规则版本前的旧规则id */
  const [oldRiskRoleBundleId, setOldRiskRoleBundleId] = useState<number>(0);
  /** 切换规则版本model中指定code的规则数据 */
  const [riskRoleBundleModelData, setRiskRoleBundleModelData] = useState<BDRiskRoleBundle[]>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  // 拖拽排序模版start
  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };
  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = riskRoleBundleTableData![dragIndex];
      setRiskRoleBundleTableData(
        update(riskRoleBundleTableData, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [riskRoleBundleTableData],
  );
  // 拖拽排序模版end
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
   * 获取所有的规则
   */
  const _RiskRoleBundleIndex = async () => {
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    // @ts-ignore
    if (riskRoleBundleData?.length > 0) {
      return riskRoleBundleData;
    } else {
      // @ts-ignore
      const res = await riskRoleBundleIndex({ foo: 1, limit: 10000 });
      if (res.data!.length > 0) {
        setRiskRoleBundleUniqueData(
          res.data!.filter((item: API.BDRiskRoleBundle) => item.k_is_current == 1),
        );
        res.data!.map((item: API.BDRiskRoleBundle) => {
          item.a_a_a_a_g_f_risk_role!.forEach((_gFRiskRoles: API.GFRiskRole) => {
            // @ts-ignore
            _gFRiskRoles.c_risk_item_id = [
              _gFRiskRoles.o_risk_item_cat_id,
              _gFRiskRoles.c_risk_item_id,
            ];
            // @ts-ignore
            _gFRiskRoles.h_compare_risk_item_id = [
              _gFRiskRoles.p_compare_risk_item_cat_id,
              _gFRiskRoles.h_compare_risk_item_id,
            ];
          });
        });
      }
      setRiskRoleBundleData(res.data);
      return res.data;
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
        const riskRoleBundleDataTmp = await _RiskRoleBundleIndex();
        // @ts-ignore
        const res = await show(params);
        const tmpRiskRoleBundleTableData: API.BDRiskRoleBundle[] = [];
        const tmpRiskRoleBundleCodeTableData: string[] = [];
        res.data![0].a_a_a_a_g_i_risk_strategy_bundles?.map((item: API.GIRiskStrategyBundle) => {
          const tmpFind = riskRoleBundleDataTmp?.find((item2: API.BDRiskRoleBundle) => {
            return item2.id == item.b_risk_role_bundle_id;
          });
          if (tmpFind) {
            tmpRiskRoleBundleTableData.push(tmpFind);
            tmpRiskRoleBundleCodeTableData.push(tmpFind.i_code!);
          }
        });

        const tmpVersion: versionOptionType[] = [];
        res.data!.map((item: API.GGRiskStratey) => {
          tmpVersion.push({
            label: (
              <>
                <span style={{ fontSize: 18, fontWeight: 500 }}>{item.f_version}</span>&nbsp;
                <span style={{ fontSize: 16 }}>({item.c_related_role_count})</span>&nbsp;
                <span style={{ fontSize: 6 }}>
                  {moment(item.created_at).format('YYYY-MM-DD HH:mm')}
                </span>
              </>
            ),
            value: item.f_version,
          });
        });
        setVersions(tmpVersion);
        setRawResultData(res.data);
        setOldRecord(res.data![0]);
        setRiskRoleBundleTableData(tmpRiskRoleBundleTableData);
        setRiskRoleBundleCodeTableData(tmpRiskRoleBundleCodeTableData!);
        setCurrentId(res.data![0]!.id!);
        return res.data![0];
      } else {
        await _getRoleItemEnum();
        const targetVersionData = rawResultData!.find((item) => item.f_version == version)!;
        const tmpRiskRoleBundleTableData: API.BDRiskRoleBundle[] = [];
        const tmpRiskRoleBundleCodeTableData: string[] = [];
        targetVersionData.a_a_a_a_g_i_risk_strategy_bundles?.map(
          (item: API.GIRiskStrategyBundle) => {
            const tmpFind = riskRoleBundleData?.find((item2: API.BDRiskRoleBundle) => {
              return item2.id == item.b_risk_role_bundle_id;
            });
            if (tmpFind) {
              tmpRiskRoleBundleTableData.push(tmpFind);
              tmpRiskRoleBundleCodeTableData.push(tmpFind.i_code!);
            }
          },
        );
        setOldRecord(targetVersionData);
        setRiskRoleBundleTableData(tmpRiskRoleBundleTableData);
        setRiskRoleBundleCodeTableData(tmpRiskRoleBundleCodeTableData!);
        setCurrentId(targetVersionData!.id!);
        return {
          ...targetVersionData,
        };
      }
    } else {
      await _getRoleItemEnum();
      await _RiskRoleBundleIndex();
      return {};
    }
  };
  /**
   * 切换规则版本
   * @param code
   * @param currentVersion
   * @param _id
   */
  const _onSwitchRiskRoleBundleVersion = (code: string, currentVersion: number, _id: number) => {
    setRiskRoleBundleModelData(
      riskRoleBundleData?.filter((item) => {
        return item.i_code == code;
      }),
    );
    setModelVersion(currentVersion);
    setOldRiskRoleBundleId(_id);
    handleCreateModalVisible(true);
  };
  /**
   * 切换规则版本成功回调
   * @param switchNewRiskRoleBundleId
   */
  const _switchRiskRoleBundleVersion = (switchNewRiskRoleBundleId: number) => {
    const tmp: API.BDRiskRoleBundle[] = [];
    riskRoleBundleTableData?.map((item: API.BDRiskRoleBundle) => {
      if (item.id == oldRiskRoleBundleId) {
        tmp.push(
          riskRoleBundleData!.find(
            (item2: API.BDRiskRoleBundle) => item2.id == switchNewRiskRoleBundleId,
          )!,
        );
      } else {
        tmp.push(item);
      }
    });
    setRiskRoleBundleTableData(tmp);
    handleCreateModalVisible(false);
  };
  /**
   * 移除规则
   * @param _deleteRiskRoleBundleId
   */
  const _deleteRiskRoleBundle = (_deleteRiskRoleBundleId: number) => {
    const tmp: API.BDRiskRoleBundle[] = [];
    riskRoleBundleTableData?.map((item: API.BDRiskRoleBundle) => {
      if (item.id != _deleteRiskRoleBundleId) {
        tmp.push(item);
      }
    });
    setRiskRoleBundleTableData(tmp);
  };
  /**
   * 新增规则成功回调
   * @param _addIds
   */
  const _addRiskRoleBundles = (_addIds: number[]) => {
    const tmp: API.BDRiskRoleBundle[] = [...riskRoleBundleTableData!];
    riskRoleBundleData?.map((item: API.BDRiskRoleBundle) => {
      if (_addIds.includes(item.id!)) {
        tmp.push(item);
      }
    });
    setRiskRoleBundleTableData(tmp);
    handleTableModalVisible(false);
  };

  /**
   * 展开折叠所有
   * @param _expanded
   */
  const _expandFoldAll = (_expanded: boolean) => {
    if (_expanded) {
      setExpandedRowKeys([]);
    } else {
      const _tmpExpandedRowKeys: string[] = [];
      riskRoleBundleTableData?.map((_item) => {
        _tmpExpandedRowKeys.push(_item.id!.toString());
      });
      setExpandedRowKeys(_tmpExpandedRowKeys);
    }
    setExpanded(!_expanded);
  };
  const columns: ProColumns<BDRiskRoleBundle>[] = [
    {
      title: RiskRoleBundleFieldLabels.a_name,
      dataIndex: RiskRoleBundleFieldIndex.a_name,
      ellipsis: true,
    },
    {
      title: RiskRoleBundleFieldLabels.j_version,
      dataIndex: RiskRoleBundleFieldIndex.j_version,
    },
    {
      title: RiskRoleBundleFieldLabels.b_related_role_group_count,
      dataIndex: RiskRoleBundleFieldIndex.b_related_role_group_count,
      ellipsis: true,
    },
    {
      title: RiskRoleBundleFieldLabels.c_related_role_count,
      dataIndex: RiskRoleBundleFieldIndex.c_related_role_count,
      ellipsis: true,
    },
    {
      title: RiskRoleBundleFieldLabels.d_score_upper_limit,
      dataIndex: RiskRoleBundleFieldIndex.d_score_upper_limit,
      ellipsis: true,
    },
    {
      title: RiskRoleBundleFieldLabels.e_execute_logic,
      dataIndex: RiskRoleBundleFieldIndex.e_execute_logic,
      ellipsis: true,
      valueType: 'select',
      valueEnum: EXECUTE_LOGIC,
      render: (_, record) => (
        <Tag color={EXECUTE_LOGIC[record.e_execute_logic!].color}>
          {EXECUTE_LOGIC[record.e_execute_logic!].text}
        </Tag>
      ),
    },
    {
      title: RiskRoleBundleFieldLabels.f_finnal_decision,
      dataIndex: RiskRoleBundleFieldIndex.f_finnal_decision,
      ellipsis: true,
      valueType: 'select',
      initialValue: [],
      valueEnum: FINNAL_DECISION,
      render: (_, record) => (
        <Tag color={FINNAL_DECISION[record.f_finnal_decision!].color}>
          {FINNAL_DECISION[record.f_finnal_decision!].text}
        </Tag>
      ),
    },
    {
      title: '操作',
      width: 190,
      valueType: 'option',
      render: (_, row) => {
        const switchA =
          row.m_version_count! > 1 ? (
            <a
              key="edit"
              onClick={() => _onSwitchRiskRoleBundleVersion(row.i_code!, row.j_version!, row.id!)}
            >
              切换版本
            </a>
          ) : null;
        const deleteRiskRoleBundle = (
          <a key="delete" onClick={() => _deleteRiskRoleBundle(row.id!)}>
            移除规则
          </a>
        );
        return [
          switchA,
          deleteRiskRoleBundle,
          <MenuOutlined key={row.id} style={{ cursor: 'grab', color: '#999' }} />,
        ];
      },
    },
  ];

  // columns 属性前为editTable 相关方法，columns属性后位高级表单方法
  const columns2: ProColumns<API.GFRiskRole>[] = [
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

  const expandedRowRender = (record: BDRiskRoleBundle) => {
    return (
      <ProTable<API.GFRiskRole>
        toolBarRender={false}
        rowKey="id"
        columns={columns2}
        dataSource={record.a_a_a_a_g_f_risk_role}
        pagination={false}
        search={false}
        bordered={true}
      />
    );
  };

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
          <div className={styles.errorField}>{FieldLabels[key]}</div>
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
    message.loading('正在提交');
    try {
      const tmp: number[] = [];
      let riskRoleCount: number = 0;
      riskRoleBundleTableData?.map((item) => {
        tmp.push(item.id!);
        riskRoleCount = riskRoleCount + item.c_related_role_count!;
      });
      // @ts-ignore
      if (params.id > 0) {
        // @ts-ignore
        await store({
          // @ts-ignore
          risk_role_bundle_ids: tmp.join('#'),
          e_code: oldRecord!.e_code,
          f_version: oldRecord!.f_version,
          c_related_role_count: riskRoleCount,
          ...values,
        });
      } else {
        // @ts-ignore
        await store({ risk_role_bundle_ids: tmp.join('#'), ...values });
      }
      message.success('提交成功');
      history.push(`/risk/risk-strategy-bundle`);
    } catch {}
  };

  /**
   * 删除策略版本
   */
  const onDeleteRiskRoleBundle = async () => {
    try {
      message.loading('正在删除');
      // @ts-ignore
      await destroy({ id: currentId });
      message.success('删除成功');
      history.push(`/risk/risk-strategy-bundle`);
    } catch {}
  };

  /**
   * 表单校验失败
   * @param errorInfo
   */
  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

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
                  history.push(`/risk/risk-strategy-bundle`);
                }}
              >
                返回列表
              </Button>
              <Button
                htmlType="button"
                style={{ margin: '0 8px' }}
                onClick={() => {
                  _expandFoldAll(expanded);
                }}
                icon={expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
              >
                {expanded ? '折叠所有' : '展开所有'}
              </Button>
              <Popconfirm
                title={
                  <>
                    <span>确定删除此版本吗？</span>
                    <br />
                  </>
                }
                onConfirm={onDeleteRiskRoleBundle}
                disabled={versions.length < 2}
              >
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  disabled={versions.length < 2}
                >
                  删除当前版本
                </Button>
              </Popconfirm>
              ,
              <Button
                type="primary"
                onClick={() => handleTableModalVisible(true)}
                icon={<PlusOutlined />}
              >
                新增规则
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
      // initialValues={{
      //   table: dataSource,
      // }}
      // @ts-ignore
      request={_index}
    >
      <PageContainer
        content="您的每次有效修改，系统都会增加一次本规则的版本号。"
        extra={
          <>
            <Tooltip title="版本号 (细则数量) 创建时间">
              版本数: {versions?.length} <QuestionCircleOutlined />
            </Tooltip>
            <Select
              defaultValue={[...versions].shift()?.value}
              placeholder={'查看历史版本'}
              style={{ width: 200 }}
              onChange={async (value) => {
                const versionData = await _index(value);
                message.loading('正在切换', 1);
                formRef.current?.setFieldsValue(versionData);
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
        <Card title="基础内容" className={styles.card} bordered={false}>
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
                        rules={[
                          { required: true, message: `请输入${FieldLabels.a_name}` },
                          {
                            validator: (_, value) => {
                              return value == oldRecord?.a_name || !oldRecord?.a_name
                                ? Promise.resolve()
                                : Promise.reject(new Error(`旧值：   ${oldRecord?.a_name}`));
                            },
                            warningOnly: true,
                          },
                        ]}
                        placeholder={`请输入${FieldLabels.a_name}`}
                      />
                    </Col>
                    <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <ProFormSelect
                        label={FieldLabels.j_fuse}
                        name={FieldIndex.j_fuse}
                        rules={[
                          { required: true, message: `请选择${FieldLabels.j_fuse}` },
                          {
                            validator: (_, value) => {
                              return value == oldRecord?.j_fuse || !oldRecord?.j_fuse
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(`旧值：   ${FUSE[oldRecord.j_fuse].text}`),
                                  );
                            },
                            warningOnly: true,
                          },
                        ]}
                        options={FUSE_OPTION}
                      />
                    </Col>
                    <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <ProFormText
                        label={FieldLabels.d}
                        tooltip={<>CPA:balabala</>}
                        name={FieldIndex.d}
                        rules={[
                          { required: true, message: `请输入${FieldLabels.d}` },
                          {
                            validator: (_, value) => {
                              return value == oldRecord?.d || !oldRecord?.d
                                ? Promise.resolve()
                                : Promise.reject(new Error(`旧值：   ${oldRecord?.d}`));
                            },
                            warningOnly: true,
                          },
                        ]}
                        placeholder={`请输入${FieldLabels.d}`}
                      />
                    </Col>
                  </Row>
                </>
              );
            }}
          </ProFormDependency>
        </Card>
        <Card title="规则及细则" className={styles.card} bordered={false}>
          <DndProvider backend={HTML5Backend}>
            <ProTable<BDRiskRoleBundle>
              rowKey={(record) => record.id!.toString()}
              toolBarRender={false}
              columns={columns}
              expandable={{
                expandedRowRender,
                defaultExpandAllRows: true,
                expandedRowKeys: expandedRowKeys,
                onExpand: (bool, row) => {
                  if (bool) {
                    setExpandedRowKeys([...expandedRowKeys, row.id!.toString()]);
                  } else {
                    const index = expandedRowKeys.findIndex((e) => e === row.id!.toString());
                    const newArray = [...expandedRowKeys];
                    newArray.splice(index, 1);
                    setExpandedRowKeys(newArray);
                  }
                },
              }}
              dataSource={riskRoleBundleTableData}
              search={false}
              pagination={false}
              components={components}
              onRow={(_, __index) => {
                const attr = {
                  index: __index,
                  moveRow,
                };
                return attr as React.HTMLAttributes<any>;
              }}
            />
          </DndProvider>
        </Card>
        {/*切换规则版本*/}
        <DetailModel
          data={riskRoleBundleModelData!}
          id={oldRiskRoleBundleId}
          version={modelVersion!}
          roleItems={roleItems}
          modalVisible={createModalVisible}
          onSubmit={async (switchNewRiskRoleBundleId) => {
            if (switchNewRiskRoleBundleId) {
              _switchRiskRoleBundleVersion(switchNewRiskRoleBundleId);
            }
          }}
          onCancel={() => {
            handleCreateModalVisible(false);
          }}
        />
        {/*新增规则*/}
        <RiskRoleBundleTableModel
          data={riskRoleBundleUniqueData!}
          codes={riskRoleBundleCodeTableData!}
          modalVisible={tableModalVisible}
          onCancel={() => {
            handleTableModalVisible(false);
          }}
          onSubmit={async (addIds) => {
            _addRiskRoleBundles(addIds);
          }}
        />
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;

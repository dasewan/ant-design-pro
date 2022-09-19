import DrawerFC from '@/pages/Risk/RiskRoleBundle/Detail/components/DrawerFC';
import {
  EXECUTE_LOGIC,
  EXECUTE_LOGIC_OPTION,
  FINNAL_DECISION,
  FINNAL_DECISION_OPTION,
} from '@/pages/Risk/RiskRoleBundle/enums';
import { history } from '@@/core/history';
import {
  AppstoreAddOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { ProFormDependency } from '@ant-design/pro-components';
import ProForm, { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Card, Col, message, Popconfirm, Popover, Row, Select, Tooltip } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import moment from 'moment';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { useParams } from 'umi';
import { FieldIndex, FieldIndex2, FieldLabels, FieldLabels2 } from '../service';
import type { TableListItem } from './data';
import { destroy, getRiskItemEnum, show, store } from './service';
import styles from './style.less';

type InternalNamePath = (string | number)[];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

type DataSourceType = API.GFRiskRole;
type versionOptionType = { label?: React.ReactNode; value?: number };
const { Option } = Select;

const AdvancedForm: FC<Record<string, any>> = () => {
  const [error, setError] = useState<ErrorField[]>([]);
  const params = useParams<{ id: string }>();
  /** 大表单ref **/
  const formRef = useRef<ProFormInstance<any>>();
  /** edittable action ref **/
  const actionRef = useRef<ActionType>();
  /** edittable ref **/
  const editableFormRef = useRef<EditableFormInstance>();
  /** 当前规则集 */
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  /** editableKeys  **/
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  /** 每个组的数量  **/
  const [groupCont, setGroupCount] = useState<Map<number, number>>(new Map());
  /** 每个组内最大的index **/
  const [groupMaxIndex, setGroupMaxIndex] = useState<Map<number, number>>(new Map());
  /** 每个组内最小的index **/
  const [groupMinIndex, setGroupMinIndex] = useState<Map<number, number>>(new Map());
  /** 组内下个细则的id(服务端会重置组id) **/
  const [groupRoleNextId, setGroupRoleNextId] = useState<Map<number, number>>(new Map());
  /** 下个细则的id(服务端会重置组id) **/
  const [roleNextId, setRoleNextId] = useState<number>(0);
  // const [currentRecord, setCurrentRecord] = useState<DataSourceType>();
  /** 下个组id(服务端会重置组id) **/
  const [groupNextId, setGroupNextId] = useState<number>(0);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  /** 服务端原始返回 (切换版本使用)**/
  const [rawResultData, setRawResultData] = useState<API.BDRiskRoleBundle[]>();
  /** 所有版本 (切换版本使用)**/
  const [versions, setVersions] = useState<versionOptionType[]>([]);
  /** 所有版本 (切换版本使用)**/
  const [currentVersion, setCurrentVersion] = useState<number>(0);
  /** 所有版本 (切换版本使用)**/
  const [currentId, setCurrentId] = useState<number>(0);
  /** 风控字段enum */
  const [roleItems, setRoleItems] = useState<RequestOptionsType[]>([]);
  /** drawer是否显示 */
  const [functionVisable, setFunctionVisable] = useState<boolean>(false);

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
   * 初始化editTable
   * @param _data
   */
  const initEditTable = (_data: DataSourceType[]) => {
    const groupCountTmp: Map<number, number> = new Map();
    const groupMaxIndexTmp: Map<number, number> = new Map();
    const groupMinIndexTmp: Map<number, number> = new Map();
    const groupRoleNextIdTmp: Map<number, number> = new Map();
    let groupNextIdTmp: number = 0;
    let roleNextIdTmp: number = 0;
    _data.map((item) => {
      const idTmp = item.id as number;
      if (!groupCountTmp.has(item.b_risk_role_group_id!)) {
        groupCountTmp.set(item.b_risk_role_group_id!, item.l_group_count!);
      }
      if (!groupMaxIndexTmp.has(item.b_risk_role_group_id!)) {
        groupMaxIndexTmp.set(item.b_risk_role_group_id!, item.m_group_index!);
      } else if (groupMaxIndexTmp.get(item.b_risk_role_group_id!)! < item.m_group_index!) {
        groupMaxIndexTmp.set(item.b_risk_role_group_id!, item.m_group_index!);
      }

      if (!groupMinIndexTmp.has(item.b_risk_role_group_id!)) {
        groupMinIndexTmp.set(item.b_risk_role_group_id!, item.m_group_index!);
      } else if (groupMinIndexTmp.get(item.b_risk_role_group_id!)! > item.m_group_index!) {
        groupMinIndexTmp.set(item.b_risk_role_group_id!, item.m_group_index!);
      }
      if (!groupRoleNextIdTmp.has(item.b_risk_role_group_id!)) {
        groupRoleNextIdTmp.set(item.b_risk_role_group_id!, idTmp);
      } else if (groupRoleNextIdTmp.get(item.b_risk_role_group_id!)! < idTmp) {
        groupRoleNextIdTmp.set(item.b_risk_role_group_id!, idTmp);
      }
      if (groupNextIdTmp < item.b_risk_role_group_id!) {
        groupNextIdTmp = item.b_risk_role_group_id!;
      }
      if (idTmp >= roleNextIdTmp) {
        roleNextIdTmp = idTmp;
      }
    });
    setGroupCount(groupCountTmp);
    setGroupMaxIndex(groupMaxIndexTmp);
    setGroupMinIndex(groupMinIndexTmp);
    setGroupRoleNextId(groupRoleNextIdTmp);
    setRoleNextId(roleNextIdTmp);
    setGroupNextId(groupNextIdTmp);
    setDataSource(_data);
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
        // @ts-ignore
        const res = await show(params);
        // fieldProps={{defaultValue:oldRecord?.a_d_tags?.split(',')}}
        // moment(value.created_at).format('YYYY-MM-DD HH:mm:ss')
        // @ts-ignore
        initEditTable(res.data![0]!.a_a_a_a_g_f_risk_role!);
        const n_execute_logic_tmp = {};
        res.data![0]!.a_a_a_a_g_f_risk_role!.map((item: API.GFRiskRole) => {
          n_execute_logic_tmp['n_execute_logic' + item.b_risk_role_group_id] = item.n_execute_logic;
        });
        const tmpVersion: versionOptionType[] = [];
        res.data!.map((item: API.BDRiskRoleBundle) => {
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
        setRawResultData(res.data);
        setOldRecord(res.data![0]);
        setVersions(tmpVersion);
        setCurrentVersion(res.data![0]!.j_version!);
        setCurrentId(res.data![0]!.id!);
        return {
          table: res.data![0]!.a_a_a_a_g_f_risk_role!,
          ...res.data![0],
          ...n_execute_logic_tmp,
        };
      } else {
        await _getRoleItemEnum();
        const targetVersionData = rawResultData!.find((item) => item.j_version == version)!;
        setOldRecord(targetVersionData);
        initEditTable(targetVersionData.a_a_a_a_g_f_risk_role!);
        const n_execute_logic_tmp = {};
        targetVersionData.a_a_a_a_g_f_risk_role!.map((item) => {
          n_execute_logic_tmp['n_execute_logic' + item.b_risk_role_group_id] = item.n_execute_logic;
        });
        setCurrentVersion(targetVersionData!.j_version!);
        setCurrentId(targetVersionData!.id!);
        return {
          table: targetVersionData.a_a_a_a_g_f_risk_role!,
          ...targetVersionData,
          ...n_execute_logic_tmp,
        };
      }
    } else {
      await _getRoleItemEnum();
      return {};
    }
  };

  /**
   * 格式化editTable ，防止editTable 错乱
   */
  const formatGroup = () => {
    const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];
    const tableDataSourceTmp = [...tableDataSource];
    tableDataSourceTmp.sort((_a, _b) => _a.b_risk_role_group_id! - _b.b_risk_role_group_id!);
    // setDataSource(tableDataSourceTmp);
    formRef.current?.setFieldsValue({
      table: tableDataSourceTmp,
    });
  };

  /**
   *
   * @param _
   * @param __
   */
  const onEditChange = (_: React.Key[], __: DataSourceType[]) => {
    console.log(__);
    console.log(dataSource);
    console.log(currentVersion);
    setEditableRowKeys(_);
  };

  /**
   *
   * @param value
   */
  const onChange = (value: DataSourceType[]) => {
    console.log(value);
  };

  /**
   * 保存单条细则
   * @param key
   * @param row
   * @param originRow
   */
  const onEditSave = (key: React.Key, row: DataSourceType, originRow: DataSourceType) => {
    console.log(originRow);
    const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];
    const _groupCount = tableDataSource.filter(
      (item) => item.b_risk_role_group_id == row.b_risk_role_group_id!,
    )?.length;
    groupCont?.set(row.b_risk_role_group_id!, _groupCount);
    setGroupCount(groupCont);
    const maxIndex = tableDataSource
      .filter((item) => item.b_risk_role_group_id == row.b_risk_role_group_id!)
      ?.sort((a, b) => b.m_group_index! - a.m_group_index!)![0].m_group_index;
    groupMaxIndex?.set(row.b_risk_role_group_id!, maxIndex!);
    setGroupMaxIndex(groupMaxIndex);
    const minIndex = tableDataSource
      .filter((item) => item.b_risk_role_group_id == row.b_risk_role_group_id!)
      ?.sort((a, b) => a.m_group_index! - b.m_group_index!)[0].m_group_index;
    groupMinIndex?.set(row.b_risk_role_group_id!, minIndex!);
    setGroupMinIndex(groupMinIndex);
    groupMinIndex?.set(row.b_risk_role_group_id!, minIndex!);
    setGroupMinIndex(groupMinIndex);
    return Promise.resolve();
  };
  /**
   * 新增组
   */
  const onNewGroup = () => {
    const groupNextIdTmp = groupNextId + 1;
    setGroupNextId(groupNextIdTmp);
    const groupRoleNextIdTmp = groupNextIdTmp * 1000;
    groupRoleNextId.set(groupNextIdTmp, groupRoleNextIdTmp);
    setGroupRoleNextId(groupRoleNextId);
    const _roleId = roleNextId + 1;
    setRoleNextId(_roleId);
    console.log(_roleId);
    const a = {
      id: _roleId,
      b_risk_role_group_id: groupNextIdTmp,
      l_group_count: 1,
      m_group_index: 1,
    };
    actionRef.current?.addEditRecord?.(a);
  };
  /**
   * 删除组
   * @param _groupId
   */
  const onDeleteGroup = (_groupId: number) => {
    const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];
    formRef.current?.setFieldsValue({
      table: tableDataSource.filter((item) => item.b_risk_role_group_id! !== _groupId),
    });
    formatGroup();
  };
  /**
   * 新增细则
   * @param _groupId
   */
  const onNewGroupRole = (_groupId: number) => {
    const _groupCount = groupCont.get(_groupId)!;
    const _groupIndex = groupMaxIndex.get(_groupId)!;
    const _id = groupRoleNextId.get(_groupId)! + 1;
    groupRoleNextId.set(_groupId, _id);
    setGroupRoleNextId(groupRoleNextId);
    const _roleId = roleNextId + 1;
    setRoleNextId(_roleId);
    console.log(_roleId);
    const a = {
      id: _roleId,
      b_risk_role_group_id: _groupId,
      l_group_count: _groupCount + 1,
      m_group_index: _groupIndex + 1,
    };
    actionRef.current?.addEditRecord?.(a);
    formatGroup();
  };
  /**
   * 删除细则
   * @param row
   */
  const onDeleteGroupRole = (row: DataSourceType) => {
    const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];

    if (groupMinIndex.get(row.b_risk_role_group_id!) == row.m_group_index!) {
      const minIndex = tableDataSource
        .filter(
          (item) => item.b_risk_role_group_id == row.b_risk_role_group_id! && item.id !== row.id,
        )
        ?.sort((a, b) => a.m_group_index! - b.m_group_index!)[0].m_group_index;
      if (minIndex) {
        groupMinIndex?.set(row.b_risk_role_group_id!, minIndex);
        setGroupMinIndex(groupMinIndex);
      }
    }
    if (groupMaxIndex.get(row.b_risk_role_group_id!) == row.m_group_index!) {
      const maxIndex = tableDataSource
        .filter(
          (item) => item.b_risk_role_group_id == row.b_risk_role_group_id! && item.id !== row.id,
        )
        ?.sort((a, b) => b.m_group_index! - a.m_group_index!)[0].m_group_index;
      if (maxIndex) {
        groupMaxIndex?.set(row.b_risk_role_group_id!, maxIndex);
        setGroupMaxIndex(groupMaxIndex);
      }
    }
    if (groupCont.get(row.b_risk_role_group_id!)! > 1) {
      groupCont.set(row.b_risk_role_group_id!, groupCont.get(row.b_risk_role_group_id!)! - 1);
      setGroupCount(groupCont!);
    }
    formRef.current?.setFieldsValue({
      table: tableDataSource.filter((item) => item.id !== row.id),
    });
    formatGroup();
  };
  const displayRender = (labels: string[], selectedOptions: DefaultOptionType[]) =>
    labels.map((label, i) => {
      const option = selectedOptions[i];
      if (i === labels.length - 1) {
        return (
          <Tooltip title={option.description} color="#f50" key={option.value}>
            <span key={option.value}>{label}</span>
          </Tooltip>
        );
      }
      return <span key={option.value}>{label} / </span>;
    });

  // columns 属性前为editTable 相关方法，columns属性后位高级表单方法
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: FieldLabels2.n_execute_logic,
      dataIndex: FieldIndex2.a_risk_role_bundle_id,
      ellipsis: true,
      editable: false,
      width: 60,
      onCell: (row) => {
        if (
          groupCont &&
          groupCont.has(row.b_risk_role_group_id!) &&
          groupCont.get(row.b_risk_role_group_id!)! > 1 &&
          groupMinIndex.has(row.b_risk_role_group_id!)
        ) {
          if (row.m_group_index == groupMinIndex!.get(row.b_risk_role_group_id!)) {
            return { rowSpan: groupCont.get(row.b_risk_role_group_id!)! };
          } else {
            return { rowSpan: 0 };
          }
        }
        return {};
      },
      render: (_, row) => {
        if (
          groupCont &&
          groupCont.has(row.b_risk_role_group_id!) &&
          groupCont.get(row.b_risk_role_group_id!)! > 1
        ) {
          return (
            <ProFormSelect
              name={FieldIndex2.n_execute_logic + row.b_risk_role_group_id}
              key={row.b_risk_role_group_id!}
              fieldProps={{ defaultValue: row.n_execute_logic }}
              rules={[{ required: true, message: `请输入${FieldLabels2.n_execute_logic}` }]}
              label=" "
              valueEnum={{
                and: 'AND',
                or: 'OR',
              }}
              placeholder="Please select "
            />
          );
        } else {
          return null;
        }
      },
      renderFormItem: () => (
        <ProFormSelect
          name={FieldIndex2.n_execute_logic}
          label=" "
          valueEnum={{
            and: 'AND',
            or: 'OR',
          }}
          placeholder="Please select"
        />
      ),
    },
    // 字段id
    {
      title: FieldLabels2.c_risk_item_id,
      dataIndex: FieldIndex2.c_risk_item_id,
      valueType: 'cascader',
      ellipsis: true,
      width: '11%',
      formItemProps: {
        rules: [{ required: true, message: `请输入${FieldLabels2.c_risk_item_id}` }],
      },
      fieldProps: {
        // onFocus: (event) => console.log(111),
        displayRender: displayRender,
        width: 100,
        // listHeight: 1,
        /*        dropdownRender : menu => {
                  return <div>
                    {menu}
                    <Divider style={{margin: '4px 0'}}/>
                    <div style={{padding: '8px', cursor: 'pointer'}} onClick={() => console.log(123)}>
                      <Icon type="plus"/> Add item
                    </div>
                  </div>
                }*/
      },
      request: async () => _getRoleItemEnum(),
    },
    /*{
      title: FieldLabels2.d_value_type,
      dataIndex: FieldIndex2.d_value_type,
      valueType: 'select',
      formItemProps: { rules: [{ required: true, message: `请输入${FieldLabels2.d_value_type}` }] },
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
    },*/
    // 算术运算公式
    {
      title: FieldLabels2.e_value_operator,
      // @ts-ignore
      /*      editable: (value, row, index) =>
              // @ts-ignore
              editableFormRef.current?.getRowData(index)?.d_value_type == 'operator',*/
      formItemProps: {
        // rules: [{ required: true, message: `请输入${FieldLabels2.e_value_operator}` }],
      },
      fieldProps: {
        placeholder: '不填则为原始取值',
      },
      dataIndex: FieldIndex2.e_value_operator,
    },
    // 关系运算符
    {
      title: FieldLabels2.f_relational_operator,
      dataIndex: FieldIndex2.f_relational_operator,
      valueType: 'select',
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: `请输入${FieldLabels2.f_relational_operator}` }],
      },
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
      formItemProps: {
        rules: [{ required: true, message: `请输入${FieldLabels2.g_compare_type}` }],
      },
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
      fieldProps: (_, { rowIndex }) => {
        return {
          onSelect: () => {
            return editableFormRef.current?.setRowData?.(rowIndex, {
              h_compare_risk_item_id: null,
              i_compare_value_type: null,
              j_compare_value_operator: null,
            });
          },
        };
      },
    },
    // 对比字段
    {
      title: FieldLabels2.h_compare_risk_item_id,
      dataIndex: FieldIndex2.h_compare_risk_item_id,
      ellipsis: true,
      // @ts-ignore
      editable: (value, row, index) =>
        // @ts-ignore
        editableFormRef.current?.getRowData(index)?.g_compare_type == 'operator',
      formItemProps: {
        rules: [{ required: true, message: `请输入${FieldLabels2.h_compare_risk_item_id}` }],
        // style: {width: 120},
      },
      fieldProps: {
        displayRender: displayRender,
        // style: {width: 120},
      },
      valueType: 'cascader',
      request: async () => _getRoleItemEnum(),

      width: 120,
      /*      render: (_, record) => {
              console.log(_);
              return <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' ,width:120}}>
                {_}
              </div>;
            },*/
    },
    /*{
      title: FieldLabels2.i_compare_value_type,
      width: '80',
      dataIndex: FieldIndex2.i_compare_value_type,
      editable: (value, row, index) =>
        // @ts-ignore
      editableFormRef.current?.getRowData(index)?.g_compare_type == 'operator',
      formItemProps: {
        rules: [{ required: true, message: `请输入${FieldLabels2.i_compare_value_type}` }],
      },
      valueType: 'select',
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
      render: (_, record) => {
        return <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' ,width:80}}>
          {_}
        </div>;
      },
    },*/
    // 算术运算公式
    {
      title: FieldLabels2.j_compare_value_operator,
      dataIndex: FieldIndex2.j_compare_value_operator,
      width: 180,
      ellipsis: true,
      fieldProps: {
        textWrap: 'word-break',
      },
      formItemProps: {
        rules: [{ required: true, message: `请输入${FieldLabels2.j_compare_value_operator}` }],
      },
      /*      render: (_, record) => {
              if(record.j_compare_value_operator!.length>10){
                return <Tooltip title={record.j_compare_value_operator}>{record.j_compare_value_operator!.substring(0,10) + '...'}</Tooltip>;
              }else{
                return record.j_compare_value_operator;
              }
            },*/
    },
    {
      title: '操作',
      width: 80,
      valueType: 'option',
      render: (_, row) => {
        let removeGroupRoleAction = null;
        if (
          groupCont &&
          groupCont.has(row.b_risk_role_group_id!) &&
          groupCont.get(row.b_risk_role_group_id!)! > 1 &&
          groupMinIndex.has(row.b_risk_role_group_id!)
        ) {
          removeGroupRoleAction = (
            <a key="remove" onClick={() => onDeleteGroupRole(row)}>
              <DeleteOutlined />
            </a>
          );
        }
        return [
          <a
            key="edit"
            onClick={() => {
              actionRef.current?.startEditable(row.id!);
            }}
          >
            <EditOutlined />
          </a>,
          removeGroupRoleAction,
        ];
      },
    },
    {
      title: '组操作',
      renderFormItem: () => {
        return <a />;
      },
      tooltip: '操作包括《新增组内细则》和《删除组》',
      editable: false,
      width: 80,
      fixed: 'right',
      onCell: (row) => {
        if (
          groupCont &&
          groupCont.has(row.b_risk_role_group_id!) &&
          groupCont.get(row.b_risk_role_group_id!)! > 1 &&
          groupMinIndex.has(row.b_risk_role_group_id!)
        ) {
          if (row.m_group_index == groupMinIndex!.get(row.b_risk_role_group_id!)) {
            return { rowSpan: groupCont.get(row.b_risk_role_group_id!)! };
          } else {
            return { rowSpan: 0 };
          }
        }
        return {};
      },
      render: (_, row) => {
        let newGroupRoleAction = null;
        if (
          groupCont &&
          groupCont.has(row.b_risk_role_group_id!) &&
          groupMinIndex.has(row.b_risk_role_group_id!)
        ) {
          if (row.m_group_index == groupMinIndex!.get(row.b_risk_role_group_id!)) {
            newGroupRoleAction = (
              <a key="add" onClick={() => onNewGroupRole(row.b_risk_role_group_id!)}>
                <AppstoreAddOutlined />
              </a>
            );
          }
        }
        let removeGroupRoleAction = null;
        // if (groupCont && groupCont.has(row.b_risk_role_group_id!) && groupCont.get(row.b_risk_role_group_id!)! > 1 && groupMinIndex.has(row.b_risk_role_group_id!)) {
        if (
          groupCont &&
          groupCont.has(row.b_risk_role_group_id!) &&
          groupCont.get(row.b_risk_role_group_id!)! > 0 &&
          groupMinIndex.has(row.b_risk_role_group_id!)
        ) {
          if (row.m_group_index == groupMinIndex!.get(row.b_risk_role_group_id!)) {
            removeGroupRoleAction = (
              <a key="remove" onClick={() => onDeleteGroup(row.b_risk_role_group_id!)}>
                <DeleteOutlined />
              </a>
            );
          }
        }
        return [
          newGroupRoleAction,
          <span key="span">&nbsp;&nbsp;&nbsp;&nbsp;</span>,
          removeGroupRoleAction,
        ];
      },
    },
  ];

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
    values.table = values.table?.map((item: DataSourceType) => JSON.stringify(item)).join('##');
    try {
      // @ts-ignore
      if (params.id > 0) {
        // @ts-ignore
        await store({ i_code: oldRecord.i_code, j_version: oldRecord.j_version, ...values });
      } else {
        // @ts-ignore
        await store(values);
      }
      message.success('提交成功');
      history.push(`/risk/risk-role-bundle`);
    } catch {}
  };

  /**
   * 删除
   */
  const onDeleteRiskRoleBundle = async () => {
    try {
      message.loading('正在删除');
      // @ts-ignore
      await destroy({ id: currentId });
      message.success('删除成功');
      history.push(`/risk/risk-role-bundle`);
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
                  history.push(`/risk/risk-role-bundle`);
                }}
              >
                返回列表
              </Button>
              <Popconfirm
                title="确定删除此规则吗？"
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
              <Button type="primary" onClick={onNewGroup} icon={<PlusOutlined />}>
                新建规则组
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
                              return value == oldRecord?.d_score_upper_limit || !oldRecord?.a_name
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
                      <ProFormDigit
                        label={FieldLabels.d_score_upper_limit}
                        tooltip={<>CPA:balabala</>}
                        name={FieldIndex.d_score_upper_limit}
                        rules={[
                          { required: true, message: `请输入${FieldLabels.d_score_upper_limit}` },
                          {
                            validator: (_, value) => {
                              return value == oldRecord?.a_name || !oldRecord?.d_score_upper_limit
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(`旧值：   ${oldRecord?.d_score_upper_limit}`),
                                  );
                            },
                            warningOnly: true,
                          },
                        ]}
                        placeholder={`请输入${FieldLabels.d_score_upper_limit}`}
                      />
                    </Col>
                    <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <ProFormSelect
                        label={FieldLabels.e_execute_logic}
                        name={FieldIndex.e_execute_logic}
                        rules={[
                          { required: true, message: `请选择${FieldLabels.e_execute_logic}` },
                          {
                            validator: (_, value) => {
                              return value == oldRecord?.e_execute_logic ||
                                !oldRecord?.e_execute_logic
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      `旧值：   ${EXECUTE_LOGIC[oldRecord.e_execute_logic].text}`,
                                    ),
                                  );
                            },
                            warningOnly: true,
                          },
                        ]}
                        options={EXECUTE_LOGIC_OPTION}
                      />
                    </Col>
                    <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <ProFormSelect
                        label={FieldLabels.f_finnal_decision}
                        name={FieldIndex.f_finnal_decision}
                        rules={[
                          { required: true, message: `请选择${FieldLabels.f_finnal_decision}` },
                          {
                            validator: (_, value) => {
                              return value == oldRecord?.f_finnal_decision ||
                                !oldRecord?.f_finnal_decision
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      `旧值：   ${
                                        FINNAL_DECISION[oldRecord.f_finnal_decision].text
                                      }`,
                                    ),
                                  );
                            },
                            warningOnly: true,
                          },
                        ]}
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
                        rules={[
                          { required: true, message: `请输入${FieldLabels.g_description}` },
                          {
                            validator: (_, value) => {
                              return value == oldRecord?.g_description || !oldRecord?.g_description
                                ? Promise.resolve()
                                : Promise.reject(new Error(`旧值：   ${oldRecord?.g_description}`));
                            },
                            warningOnly: true,
                          },
                        ]}
                        placeholder={`请输入${FieldLabels.g_description}`}
                      />
                    </Col>
                  </Row>
                </>
              );
            }}
          </ProFormDependency>
        </Card>
        <Card
          title="细则配置"
          className={styles.card}
          bordered={false}
          extra={<a onClick={() => setFunctionVisable(true)}>支持的数学函数</a>}
        >
          <EditableProTable<DataSourceType>
            rowKey="id"
            scroll={{
              x: true,
            }}
            editableFormRef={editableFormRef}
            controlled={false}
            actionRef={actionRef}
            onChange={onChange}
            bordered={true}
            formItemProps={{
              rules: [
                {
                  validator: async (_, value) => {
                    if (value == undefined || value.length < 1) {
                      throw new Error('请至少添加一个细则');
                    }
                    if (value.length > 10) {
                      throw new Error('最多可以设置十个细则');
                    }
                  },
                },
              ],
            }}
            maxLength={10}
            name="table"
            columns={columns}
            recordCreatorProps={false}
            editable={{
              type: 'single',
              editableKeys,
              onlyAddOneLineAlertMessage: '111',
              // @ts-ignore
              onChange: onEditChange,
              // @ts-ignore
              onSave: onEditSave,
              actionRender: (row, config, defaultDom) => {
                return [defaultDom.save, defaultDom.delete || defaultDom.cancel];
              },
            }}
          />
        </Card>
        <DrawerFC visable={functionVisable} onClose={() => setFunctionVisable(false)} />
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;

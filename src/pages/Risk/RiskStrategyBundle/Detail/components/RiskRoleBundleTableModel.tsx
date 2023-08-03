import type { FormValueType } from '@/pages/Risk/RiskRoleBundle/components/CreateForm';
import type { TableListItem, TableListPagination } from '@/pages/Risk/RiskRoleBundle/data';
import { FieldIndex, FieldLabels } from '@/pages/Risk/RiskRoleBundle/service';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Modal, Table } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';

export type Props = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (switchNewRiskRoleBundleId: number[]) => Promise<void>;
  modalVisible: boolean;
  codes?: string[];
  data: API.BDRiskRoleBundle[];
};
// 新增规则
const RiskRoleBundleTableModel: React.FC<Props> = (props) => {
  const actionRef = useRef<ActionType>();
  const [switchNewRiskRoleBundleId, setSwitchNewRiskRoleBundleId] = useState<number[]>([]);

  /** table */
  const _index = async (
    // 第一个参数 params 查询表单和 params 参数的结合
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: TableListPagination & {
      pageSize: number;
      current: number;
    },
    // sort,
    // filter,
  ) => {
    let tmp = props.data;
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    // @ts-ignore
    if (params?.a_name || params?.e_execute_logic || params?.f_finnal_decision) {
      tmp = tmp.filter((item) => {
        let nameMatch = 2;
        let logicMatch = 2;
        let decisionMatch = 2;
        // @ts-ignore
        if (params?.a_name) {
          // @ts-ignore
          if (item.a_name === params.a_name!) {
            nameMatch = 1;
          } else {
            nameMatch = 0;
          }
        }
        // @ts-ignore
        if (params?.e_execute_logic) {
          // @ts-ignore
          if (item.e_execute_logic === params!.e_execute_logic!) {
            logicMatch = 1;
          } else {
            logicMatch = 0;
          }
        }
        // @ts-ignore
        if (params?.f_finnal_decision) {
          // @ts-ignore
          if (item.f_finnal_decision === params!.f_finnal_decision!) {
            decisionMatch = 1;
          } else {
            decisionMatch = 0;
          }
        }
        return !(nameMatch === 0 || logicMatch === 0 || decisionMatch === 0);
      });
    }
    return {
      data: tmp,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: 100,
    };
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: FieldIndex.a_name,
    },
    {
      title: FieldLabels.m_version_count,
      dataIndex: FieldIndex.m_version_count,
      search: false,
    },
    {
      title: FieldLabels.j_version,
      dataIndex: FieldIndex.j_version,
      search: false,
    },
    {
      title: FieldLabels.b_related_role_group_count,
      dataIndex: FieldIndex.b_related_role_group_count,
      search: false,
    },
    {
      title: FieldLabels.d_score_upper_limit,
      dataIndex: FieldIndex.d_score_upper_limit,
      search: false,
    },

    /*{
      title: FieldLabels.e_execute_logic,
      dataIndex: FieldIndex.e_execute_logic,
      valueType: 'select',
      valueEnum: EXECUTE_LOGIC,
      render: (_, record) => (
        <Tag color={EXECUTE_LOGIC[record.e_execute_logic!].color}>
          {EXECUTE_LOGIC[record.e_execute_logic!].text}
        </Tag>
      ),
    },
    {
      title: FieldLabels.f_finnal_decision,
      dataIndex: FieldIndex.f_finnal_decision,
      valueType: 'select',
      valueEnum: FINNAL_DECISION,
      render: (_, record) => (
        <Tag color={FINNAL_DECISION[record.f_finnal_decision!].color}>
          {FINNAL_DECISION[record.f_finnal_decision!].text}
        </Tag>
      ),
    },*/
    {
      title: FieldLabels.g_description,
      dataIndex: FieldIndex.g_description,
      ellipsis: true,
      search: false,
    },
    {
      title: FieldLabels.created_at,
      dataIndex: FieldIndex.created_at,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.created_at).format('YY-MM-DD HH:mm');
      },
      search: false,
    },
    {
      title: FieldLabels.updated_at,
      dataIndex: FieldIndex.updated_at,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.updated_at).format('YY-MM-DD HH:mm');
      },
      search: false,
    },
  ];

  // @ts-ignore
  return (
    <Modal
      title="规则列表"
      open={props.modalVisible}
      destroyOnClose={true}
      onCancel={() => props.onCancel()}
      width={1900}
      footer={[
        <Button key="cancel" onClick={() => props.onCancel()}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={async () => {
            return props.onSubmit(switchNewRiskRoleBundleId);
          }}
        >
          加入策略
        </Button>,
      ]}
    >
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={false}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
          getCheckboxProps: (record: TableListItem) => ({
            // @ts-ignore
            disabled: props.codes?.includes(record.i_code),
          }),
          onChange: (selectedRowKeys: React.Key[], selectedRows: API.BDRiskRoleBundle[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSwitchNewRiskRoleBundleId(selectedRowKeys as number[]);
          },
        }}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 50,
        }}
      />
    </Modal>
  );
};

export default RiskRoleBundleTableModel;

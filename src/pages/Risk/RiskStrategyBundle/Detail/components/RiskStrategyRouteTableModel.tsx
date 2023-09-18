import type { FormValueType } from '@/pages/Risk/RiskRoleBundle/components/CreateForm';
import type { TableListItem, TableListPagination } from '@/pages/Risk/RiskRoleBundle/data';
import { FieldIndex, FieldLabels } from '@/pages/Risk/RiskStrategyRoute/service';
import { putAdminV1NERiskStrategyRoutesId as update } from '@/services/ant-design-pro/NERiskStrategyRoute';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal, Table } from 'antd';
import React, { useRef, useState } from 'react';

export type Props = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (success: boolean) => Promise<void>;
  modalVisible: boolean;
  currentVersion?: number;
  code?: string;
  data: API.NERiskStrategyRoute[];
  riskStrategyRouteIds: number[];
  currentId: number;
};
// 新增规则
const RiskStrategyRouteTableModel: React.FC<Props> = (props) => {
  const actionRef = useRef<ActionType>();
  const [riskStrategyRouteIds, setRiskStrategyRouteIds] = useState<number[]>(
    props.riskStrategyRouteIds,
  );

  /**
   * 提交渠道
   * @param values
   */
  const onFinish = async (values: number[]) => {
    const hide = message.loading('正在配置');
    try {
      hide();
      // @ts-ignore
      let code = props.code;
      console.log({
        id: 0,
        ...{
          version: props.currentVersion,
          code: code,
          ids: values.join(','),
          update_id: props.currentId,
        },
      });
      // @ts-ignore
      await update({
        id: 0,
        ...{
          version: props.currentVersion,
          code: code,
          ids: values.join(','),
          update_id: props.currentId,
        },
      });
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };

  /** table */
  const _index = async () => {
    setRiskStrategyRouteIds(props.riskStrategyRouteIds);
    return {
      data: props.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: 100,
    };
  };

  const columns: ProColumns<API.NERiskStrategyRoute>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: FieldIndex.a_name,
    },

    {
      title: FieldLabels.j_risk_strategy_id_1,
      dataIndex: FieldIndex.j_risk_strategy_id_1,
      render: (_, row) => {
        if (row.r_risk_strategy_1_code === props.code) {
          return (
            <span
              key={2}
              style={{
                color: row.s_risk_strategy_1_version === props.currentVersion ? 'green' : 'red',
              }}
            >
              {row.s_risk_strategy_1_version}
            </span>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.l_risk_strategy_id_2,
      dataIndex: FieldIndex.l_risk_strategy_id_2,
      render: (_, row) => {
        if (row.t_risk_strategy_2_code === props.code) {
          return (
            <span
              key={2}
              style={{
                color: row.u_risk_strategy_2_version === props.currentVersion ? 'green' : 'red',
              }}
            >
              {row.u_risk_strategy_2_version}
            </span>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.n_risk_strategy_id_3,
      dataIndex: FieldIndex.n_risk_strategy_id_3,
      render: (_, row) => {
        if (row.v_risk_strategy_3_code === props.code) {
          return (
            <span
              key={2}
              style={{
                color: row.w_risk_strategy_3_version === props.currentVersion ? 'green' : 'red',
              }}
            >
              {row.w_risk_strategy_3_version}
            </span>
          );
        }
        return '-';
      },
    },
  ];

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Modal
      title="应用到策略路由"
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
            const success = await onFinish(riskStrategyRouteIds);
            return props.onSubmit(success);
          }}
        >
          应用
        </Button>,
      ]}
    >
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={false}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: props.riskStrategyRouteIds,
          getCheckboxProps: (record: TableListItem) => ({
            // @ts-ignore
            disabled: props.riskStrategyRouteIds.includes(record.id),
          }),
          onChange: (selectedRowKeys: React.Key[], selectedRows: API.GGRiskStratey[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setRiskStrategyRouteIds(selectedRowKeys as number[]);
          },
        }}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={false}
      />
    </Modal>
  );
};

export default RiskStrategyRouteTableModel;

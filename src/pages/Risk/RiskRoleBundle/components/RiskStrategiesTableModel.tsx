import type { FormValueType } from '@/pages/Risk/RiskRoleBundle/components/CreateForm';
import type { TableListItem, TableListPagination } from '@/pages/Risk/RiskRoleBundle/data';
import { FieldIndex, FieldLabels } from '@/pages/Risk/RiskStrategyBundle/service';
import { putAdminV1GIRiskStrategyBundlesId as update } from '@/services/ant-design-pro/GIRiskStrategyBundle';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal, Table } from 'antd';
import React, { useRef, useState } from 'react';

export type Props = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (success: boolean) => Promise<void>;
  modalVisible: boolean;
  currentVersion?: number;
  data: API.GGRiskStratey[];
  riskStrategyIds: number[];
  currentId: number;
};
// 新增规则
const RiskStrategiesTableModel: React.FC<Props> = (props) => {
  const actionRef = useRef<ActionType>();
  const [riskStrategyIds, setRiskStrategyIds] = useState<number[]>(props.riskStrategyIds);

  /**
   * 提交渠道
   * @param values
   */
  const onFinish = async (values: number[]) => {
    const hide = message.loading('正在配置');
    try {
      hide();
      // @ts-ignore
      let code = props.data[0].a_a_a_a_g_i_risk_strategy_bundles[0].d_code;
      console.log({
        id: 1,
        ...{ version: props.currentVersion, code: code, ids: values.join(',') },
      });
      await update({
        id: 1,
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
    setRiskStrategyIds(props.riskStrategyIds);
    return {
      data: props.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: 100,
    };
  };

  const columns: ProColumns<API.GGRiskStratey>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: FieldIndex.a_name,
    },
    {
      title: '策略版本号',
      dataIndex: FieldIndex.f_version,
    },
    {
      title: FieldLabels.g_is_current,
      dataIndex: FieldIndex.g_is_current,
      render: (_, row) => {
        return (
          <span key={2} style={{ color: row.g_is_current === 1 ? 'green' : 'red' }}>
            {row.g_is_current === 1 ? '是' : '否'}
          </span>
        );
      },
    },
    {
      title: '规则版本',
      dataIndex: FieldIndex.a_a_a_a_g_i_risk_strategy_bundles.f_version,
      render: (_, row) => {
        // @ts-ignore
        return (
          <span
            key={2}
            style={{
              color:
                row.a_a_a_a_g_i_risk_strategy_bundles[0].e_version === props.currentVersion
                  ? 'green'
                  : 'red',
            }}
          >
            {row.a_a_a_a_g_i_risk_strategy_bundles[0].e_version}
          </span>
        );
      },
    },
  ];

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Modal
      title="应用中的策略"
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
            const success = await onFinish(riskStrategyIds);
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
          defaultSelectedRowKeys: props.riskStrategyIds,
          getCheckboxProps: (record: TableListItem) => ({
            // @ts-ignore
            disabled: props.riskStrategyIds.includes(record.id),
          }),
          onChange: (selectedRowKeys: React.Key[], selectedRows: API.GGRiskStratey[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setRiskStrategyIds(selectedRowKeys as number[]);
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

export default RiskStrategiesTableModel;

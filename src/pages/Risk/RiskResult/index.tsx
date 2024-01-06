import DetailList from '@/pages/Risk/RiskResult/components/DetailList';
import { FINNAL_DECISION } from '@/pages/Risk/RiskRoleBundle/enums';
import styles from '@/pages/Risk/RiskStrategyRoute/index.less';
import { getAdminV1BMBorrowRiskResults as index } from '@/services/ant-design-pro/BMBorrowRiskResult';
import { getAdminV1GDRiskItemEnum2 as getRiskItemEnum2 } from '@/services/ant-design-pro/GDRiskItem';
import { getAdminV1GGRiskStrateiesEnums as getStrateiesEnums } from '@/services/ant-design-pro/GGRiskStratey';
import { getAdminV1NERiskStrategyRoutesEnums as getStrategyRoutesEnums } from '@/services/ant-design-pro/NERiskStrategyRoute';
import { EllipsisOutlined, SyncOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Dropdown, MenuProps } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 风控字段展示 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);
  const [strateies, setStrateies] = useState<RequestOptionsType[]>([]);
  const [strategyRoutes, setStrategyRoutes] = useState<RequestOptionsType[]>([]);
  /** 管理员enum */
  const [riskItems, setRiskItems] = useState<Map<number, API.GDRiskItem>>(new Map());

  /**
   * 查询策略enum
   */
  const _getStrateiesEnums = async () => {
    const data: RequestOptionsType[] = [];
    if (strateies.length === 0) {
      const res = await getStrateiesEnums({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name + '(' + item.f_version + ')',
          value: item.id,
        });
      }
      setStrateies(data);
      return data;
    } else {
      return strateies;
    }
  };
  /**
   * 查询策略enum
   */
  const _getStrategyRoutesEnums = async () => {
    const data: RequestOptionsType[] = [];
    if (strategyRoutes.length === 0) {
      const res = await getStrategyRoutesEnums({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setStrategyRoutes(data);
      return data;
    } else {
      return strategyRoutes;
    }
  };

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
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    // @ts-ignore
    const res = await index({ page: params.current, ...params });
    if (riskItems.size === 0) {
      const res2 = await getRiskItemEnum2({ foo: 1 });
      for (const riskItem of res2.data!) {
        riskItems.set(riskItem.id!, riskItem);
      }
      setRiskItems(riskItems);
    }

    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: res.success,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.total,
    };
  };
  /**
   * 展示预览model
   * @param _id
   */
  const onEditClick = async (_id: number) => {
    setId(_id);
    handleCreateModalVisible(true);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.g_phone,
      dataIndex: FieldIndex.g_phone,
    },
    {
      title: FieldLabels.h_borrow_sn,
      dataIndex: FieldIndex.h_borrow_sn,
    },
    {
      title: FieldLabels.i_amount,
      dataIndex: FieldIndex.i_amount,
    },
    {
      title: '画像信息',
      className: styles.blue,
      children: [
        {
          title: FieldLabels.j_borrow_count,
          dataIndex: FieldIndex.j_borrow_count,
        },
        {
          title: FieldLabels.r_channel,
          dataIndex: FieldIndex.r_channel,
        },
        {
          title: FieldLabels.s_sms,
          dataIndex: FieldIndex.s_sms,
        },
        {
          title: FieldLabels.t_contact,
          dataIndex: FieldIndex.t_contact,
        },
        {
          title: FieldLabels.u_app,
          dataIndex: FieldIndex.u_app,
        },
        {
          title: FieldLabels.v_region,
          dataIndex: FieldIndex.v_region,
        },
        {
          title: FieldLabels.w_age,
          dataIndex: FieldIndex.w_age,
        },
        {
          title: FieldLabels.d_risk_strategy_route_id,
          dataIndex: FieldIndex.d_risk_strategy_route_id,
          valueType: 'select',
          request: _getStrategyRoutesEnums,
        },
      ],
    },
    {
      title: '决策信息',
      className: styles.blue,
      children: [
        {
          title: FieldLabels.e_risk_strategy_id,
          dataIndex: FieldIndex.e_risk_strategy_id,
          valueType: 'select',
          request: _getStrateiesEnums,
        },

        {
          title: FieldLabels.n_reject_risk_role_count,
          dataIndex: FieldIndex.n_reject_risk_role_count,
        },
        {
          title: FieldLabels.o_accept_risk_role_count,
          dataIndex: FieldIndex.o_accept_risk_role_count,
        },
        {
          title: FieldLabels.p_review_risk_role_count,
          dataIndex: FieldIndex.p_review_risk_role_count,
        },
        {
          title: FieldLabels.q_refuse_risk_role_rate,
          dataIndex: FieldIndex.q_refuse_risk_role_rate,
        },
        {
          title: FieldLabels.m_score,
          dataIndex: FieldIndex.m_score,
        },
        {
          title: FieldLabels.k_machine_result,
          dataIndex: FieldIndex.k_machine_result,
          valueType: 'select',
          valueEnum: FINNAL_DECISION,
        },
      ],
    },

    /*    {
          title: FieldLabels.f_admin_id,
          dataIndex: FieldIndex.f_admin_id,
          valueType: 'select',
          request: _getUsersEnum,
          params: { timestamp: Math.random() },
        },
        {
          title: FieldLabels.l_review_result,
          dataIndex: FieldIndex.l_review_result,
          valueType: 'select',
          valueEnum: FINNAL_DECISION,
        },*/

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '5%',
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => onEditClick(record.id!)}>
            编辑
          </a>
        );

        return [edit];
      },
    },
  ];
  const items: MenuProps['items'] = [
    {
      label: <a>更新关联数</a>,
      key: 'item-2',
      icon: <SyncOutlined />,
    },
  ];
  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '风控记录',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => onEditClick(0)}>
            新建风控字段
          </Button>,
          <Dropdown key="dropdown" trigger={['click']} menu={{ items }}>
            <Button key="4" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ],
      }}
    >
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        bordered={true}
        pagination={{
          pageSize: 50,
        }}
      />
      {/*表单model*/}
      <DetailList
        onSubmit={async (success) => {
          if (success) {
            handleCreateModalVisible(false);
            setId(0);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCreateModalVisible(false);
          setId(0);
        }}
        id={id}
        modalVisible={createModalVisible}
        riskItems={riskItems}
      />
    </PageContainer>
  );
};

export default TableList;

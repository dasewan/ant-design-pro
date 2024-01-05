import { getAdminV1DCBorrowRiskDetails as index } from '@/services/ant-design-pro/DCBorrowRiskDetail';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem2, TableListPagination } from '../data';
import { FieldIndex2, FieldLabels2 } from '../service';

import { EXECUTE_LOGIC, FINNAL_DECISION, OPERATOR } from '@/pages/Risk/RiskRoleBundle/enums';

export type FormProps = {
  onCancel: () => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  riskItems: Map<number, API.GDRiskItem>;
  id: number;
};

const DetailList: React.FC<FormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [groupData, seGroupData] = useState<Map<number, object>>(new Map());
  /** 风控字段展示 */
  /** 当前编辑数据 */
  /** 管理员enum */

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
    alert(props.id);
    // @ts-ignore
    const res = await index({ p_borrow_risk_result_id: props.id, page: params.current, ...params });
    let tmp = new Map();
    for (const item of res!.other!.b_d_risk_role_bundle) {
      tmp.set(item.id, item);
    }
    console.log(tmp);
    seGroupData(tmp);

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

  const columns: ProColumns<TableListItem2>[] = [
    {
      title: FieldLabels2.h_risk_role_id,
      dataIndex: FieldIndex2.h_risk_role_id,
      onCell: (row) => {
        if (groupData.get(row.f_risk_role_bundle_id!)!.c_related_role_count > 1) {
          if (
            row.a_a_a_a_a_g_f_risk_role.u_bundle_index ===
            groupData.get(row.f_risk_role_bundle_id!)!.c_related_role_count
          ) {
            return { rowSpan: groupData.get(row.f_risk_role_bundle_id!)!.c_related_role_count };
          } else {
            return { rowSpan: 0 };
          }
          // console.log(row.a_a_a_a_a_g_f_risk_role.u_bundle_index);
        }
        return {};
      },
      render: (_, row) => {
        return groupData.get(row.f_risk_role_bundle_id!)!.a_name;
      },
    },
    {
      title: '组内关系',
      dataIndex: FieldIndex2.g_risk_role_group_id,
      onCell: (row) => {
        if (row.a_a_a_a_a_g_f_risk_role!.l_group_count > 1) {
          if (
            row.a_a_a_a_a_g_f_risk_role!.l_group_count ===
            row.a_a_a_a_a_g_f_risk_role!.m_group_index
          ) {
            return { rowSpan: row.a_a_a_a_a_g_f_risk_role!.l_group_count };
          } else {
            return { rowSpan: 0 };
          }
        }
        return {};
      },
      render: (_, row) => {
        return EXECUTE_LOGIC[row.a_a_a_a_a_g_f_risk_role.n_execute_logic].text;
      },
    },
    {
      title: FieldLabels2.e_risk_strategy_id,
      dataIndex: FieldIndex2.e_risk_strategy_id,
      onCell: (row) => {
        if (row.a_a_a_a_a_g_f_risk_role!.l_group_count > 1) {
          if (
            row.a_a_a_a_a_g_f_risk_role!.l_group_count ===
            row.a_a_a_a_a_g_f_risk_role!.m_group_index
          ) {
            return { rowSpan: row.a_a_a_a_a_g_f_risk_role!.l_group_count };
          } else {
            return { rowSpan: 0 };
          }
        }
        return {};
      },
      render: (_, row) => {
        return FINNAL_DECISION[row.a_a_a_a_a_g_f_risk_role.t_decision].text;
      },
    },
    {
      title: FieldLabels2.l_score,
      dataIndex: FieldIndex2.l_score,
      onCell: (row) => {
        if (row.a_a_a_a_a_g_f_risk_role!.l_group_count > 1) {
          if (
            row.a_a_a_a_a_g_f_risk_role!.l_group_count ===
            row.a_a_a_a_a_g_f_risk_role!.m_group_index
          ) {
            return { rowSpan: row.a_a_a_a_a_g_f_risk_role!.l_group_count };
          } else {
            return { rowSpan: 0 };
          }
        }
        return {};
      },
      render: (_, row) => {
        return row.a_a_a_a_a_g_f_risk_role.s_score;
      },
    },
    {
      title: FieldLabels2.g_risk_role_group_id,
      dataIndex: FieldIndex2.e_value_operator,
      render: (_, row) => {
        return (
          <>
            {row.a_a_a_a_a_g_f_risk_role.e_value_operator === '' ||
            row.a_a_a_a_a_g_f_risk_role.e_value_operator === undefined ||
            row.a_a_a_a_a_g_f_risk_role.e_value_operator === null ? (
              <span
                style={{
                  color: '#1441D9',
                  marginRight: '5px',
                }}
              >
                {props.riskItems.get(row.a_a_a_a_a_g_f_risk_role!.c_risk_item_id).a_name}
              </span>
            ) : (
              <span
                style={{
                  color: '#1441D9',
                  marginRight: '5px',
                }}
              >
                {row.a_a_a_a_a_g_f_risk_role.e_value_operator.replace(
                  /\$x/g,
                  props.riskItems.get(row.a_a_a_a_a_g_f_risk_role!.c_risk_item_id).a_name,
                )}
              </span>
            )}
            {OPERATOR[row.a_a_a_a_a_g_f_risk_role.f_relational_operator].text}
            {row.a_a_a_a_a_g_f_risk_role.g_compare_type === 'const' ? (
              <span
                style={{
                  color: '#1441D9',
                  marginLeft: '5px',
                }}
              >
                <i>{row.a_a_a_a_a_g_f_risk_role.j_compare_value_operator}</i>
              </span>
            ) : (
              <span
                style={{
                  color: '#1441D9',
                  marginLeft: '5px',
                }}
              >
                {row.a_a_a_a_a_g_f_risk_role.j_compare_value_operator.replace(
                  /\$y/g,
                  props.riskItems.get(row.a_a_a_a_a_g_f_risk_role!.h_compare_risk_item_id).a_name,
                )}
              </span>
            )}
          </>
        );
      },
    },
    {
      title: FieldLabels2.k_value,
      dataIndex: FieldIndex2.k_value,
      render: (_, row) => {
        return (
          <>
            {row.a_a_a_a_a_g_f_risk_role!.g_compare_type === 'const' ? (
              <span
                style={{
                  color: row.j_risk_role_result === '1' ? 'green' : 'red',
                  marginRight: '5px',
                }}
              >
                {row.k_value}
              </span>
            ) : (
              <>
                <span>
                  X=
                  <span
                    style={{
                      color: row.j_risk_role_result === '1' ? 'green' : 'red',
                      marginRight: '5px',
                    }}
                  >
                    {row.k_value}
                  </span>
                </span>
                <span>
                  Y=
                  <span
                    style={{
                      color: row.j_risk_role_result === '1' ? 'green' : 'red',
                      marginRight: '5px',
                    }}
                  >
                    {row.m_right_value}
                  </span>
                </span>
              </>
            )}
          </>
        );
      },
    },
    {
      title: FieldLabels2.l_score,
      dataIndex: FieldIndex2.l_score,
      onCell: (row) => {
        if (row.a_a_a_a_a_g_f_risk_role!.l_group_count > 1) {
          if (
            row.a_a_a_a_a_g_f_risk_role!.l_group_count ===
            row.a_a_a_a_a_g_f_risk_role!.m_group_index
          ) {
            return { rowSpan: row.a_a_a_a_a_g_f_risk_role!.l_group_count };
          } else {
            return { rowSpan: 0 };
          }
        }
        return {};
      },
    },
    {
      title: FieldLabels2.i_risk_role_group_result,
      dataIndex: FieldIndex2.i_risk_role_group_result,
      onCell: (row) => {
        if (row.a_a_a_a_a_g_f_risk_role!.l_group_count > 1) {
          if (
            row.a_a_a_a_a_g_f_risk_role!.l_group_count ===
            row.a_a_a_a_a_g_f_risk_role!.m_group_index
          ) {
            return { rowSpan: row.a_a_a_a_a_g_f_risk_role!.l_group_count };
          } else {
            return { rowSpan: 0 };
          }
        }
        return {};
      },
      render: (_, row) => {
        return (
          <span
            style={{
              color: FINNAL_DECISION[row.i_risk_role_group_result].color,
              fontWeight: 'bold',
            }}
          >
            {FINNAL_DECISION[row.i_risk_role_group_result].text}
          </span>
        );
      },
    },
  ];

  // @ts-ignore
  return (
    <Modal
      open={props.modalVisible}
      destroyOnClose={true}
      maskClosable={false}
      width={'100%'}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          关闭
        </Button>,
      ]}
    >
      <ProTable<TableListItem2, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
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
    </Modal>
  );
};

export default DetailList;

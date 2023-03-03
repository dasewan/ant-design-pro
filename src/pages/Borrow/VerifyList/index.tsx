import { VERIFY_STATUS_ENUM } from '@/pages/enums';
import { getAdminV1GVerifies as index } from '@/services/ant-design-pro/GVerify';
import { history } from '@@/core/history';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import React, { useRef } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 渠道enum */

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

    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: res.success,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.total,
    };
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.w_phone,
      dataIndex: FieldIndex.w_phone,
      copyable: true,
    },
    {
      title: FieldLabels.y_ocr_verify_status,
      dataIndex: FieldIndex.y_ocr_verify_status,
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },
    {
      title: FieldLabels.a_b_ocr_verify_times,
      dataIndex: FieldIndex.a_b_ocr_verify_times,
    },
    {
      title: FieldLabels.j_idnumber_verify_status,
      dataIndex: FieldIndex.j_idnumber_verify_status,
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },
    {
      title: FieldLabels.a_c_idnumber_verify_times,
      dataIndex: FieldIndex.a_c_idnumber_verify_times,
    },
    {
      title: FieldLabels.n_contact_verify_status,
      dataIndex: FieldIndex.n_contact_verify_status,
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },
    {
      title: FieldLabels.p_job_verify_status,
      dataIndex: FieldIndex.p_job_verify_status,
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },
    {
      title: FieldLabels.r_loan_bank_verify_status,
      dataIndex: FieldIndex.r_loan_bank_verify_status,
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },
    {
      title: FieldLabels.t_repay_bank_verify_status,
      dataIndex: FieldIndex.t_repay_bank_verify_status,
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },
    {
      title: FieldLabels.v_h5_verify_status,
      dataIndex: FieldIndex.v_h5_verify_status,
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },
    {
      title: FieldLabels.l_liveness_verify_status,
      dataIndex: FieldIndex.l_liveness_verify_status,
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },
    {
      title: FieldLabels.a_e_liveness_verify_times,
      dataIndex: FieldIndex.a_e_liveness_verify_times,
    },
    {
      title: FieldLabels.d_risk_score,
      dataIndex: FieldIndex.d_risk_score,
    },
    {
      title: FieldLabels.e_risk_result,
      dataIndex: FieldIndex.e_risk_result,
    },
    {
      title: FieldLabels.h_next_expired_date,
      dataIndex: FieldIndex.h_next_expired_date,
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.h_next_expired_date).format('YYYY-MM-DD');
      },
      search: {
        transform: (value: any) => ({
          'h_next_expired_date[0]': value[0],
          'h_next_expired_date[1]': value[1],
        }),
      },
    },
    {
      title: FieldLabels.created_at,
      dataIndex: FieldIndex.created_at,
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.created_at).format('YYYY-MM-DD');
      },
      search: {
        transform: (value: any) => ({ 'created_at[0]': value[0], 'created_at[1]': value[1] }),
      },
    },
    {
      title: FieldLabels.updated_at,
      dataIndex: FieldIndex.updated_at,
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.updated_at).format('YYYY-MM-DD');
      },
      search: {
        transform: (value: any) => ({ 'updated_at[0]': value[0], 'updated_at[1]': value[1] }),
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'option',
      width: 220,
      fixed: 'right',
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => history.push(`/borrow/verify/detail/${record.id}`)}>
            编辑
          </a>
        );

        return [edit];
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '认证列表',
        ghost: true,
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
        pagination={{
          pageSize: 50,
        }}
      />
    </PageContainer>
  );
};

export default TableList;

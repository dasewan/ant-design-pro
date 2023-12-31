import { RISK_STATUS_OPTION, VERIFY_STATUS_OPTION } from '@/pages/enums';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1GGRiskStrateiesEnums as getStrateiesEnums } from '@/services/ant-design-pro/GGRiskStratey';
import { getAdminV1GVerifies as index } from '@/services/ant-design-pro/GVerify';
import { history } from '@@/core/history';
import { useIntl } from '@@/exports';
import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';
import { ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Tag } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  const [strateies, setStrateies] = useState<RequestOptionsType[]>([]);
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

  /**
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length === 0) {
      const res = await getChannelsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_title,
          value: item.id,
        });
      }
      setChannels(data);
      return data;
    } else {
      return channels;
    }
  };
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.w_phone',
        defaultMessage: '',
      }),
      dataIndex: 'w_phone',
      copyable: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.b_channel_id',
        defaultMessage: '',
      }),
      dataIndex: 'a_g_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.y_ocr_verify_status',
        defaultMessage: '',
      }),
      dataIndex: 'y_ocr_verify_status',
      valueType: 'select',
      render: (_, row) => {
        if (row.y_ocr_verify_status === 10) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.y_ocr_verify_status === 20) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.y_ocr_verify_status === 30) {
          return <ExclamationCircleTwoTone twoToneColor="#EEC211" />;
        } else if (row.y_ocr_verify_status === 40) {
          return <CloseCircleTwoTone twoToneColor="#D83939" />;
        } else if (row.y_ocr_verify_status === 50) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }
      },
      renderFormItem: () => (
        <ProFormSelect
          name={intl.formatMessage({
            id: 'pages.Borrow.VerifyDetail.y_ocr_verify_status',
            defaultMessage: '',
          })}
          options={VERIFY_STATUS_OPTION}
          placeholder="Please select"
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.j_idnumber_verify_status',
        defaultMessage: '',
      }),
      dataIndex: 'j_idnumber_verify_status',
      render: (_, row) => {
        if (row.j_idnumber_verify_status === 10) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.j_idnumber_verify_status === 20) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.j_idnumber_verify_status === 30) {
          return <ExclamationCircleTwoTone twoToneColor="#EEC211" />;
        } else if (row.j_idnumber_verify_status === 40) {
          return <CloseCircleTwoTone twoToneColor="#D83939" />;
        } else if (row.j_idnumber_verify_status === 50) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }
      },
      renderFormItem: () => (
        <ProFormSelect
          name={intl.formatMessage({
            id: 'pages.Borrow.VerifyDetail.j_idnumber_verify_status',
            defaultMessage: '',
          })}
          options={VERIFY_STATUS_OPTION}
          placeholder="Please select"
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.n_contact_verify_status',
        defaultMessage: '',
      }),
      dataIndex: 'n_contact_verify_status',
      render: (_, row) => {
        if (row.n_contact_verify_status === 10) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.n_contact_verify_status === 20) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.n_contact_verify_status === 30) {
          return <ExclamationCircleTwoTone twoToneColor="#EEC211" />;
        } else if (row.n_contact_verify_status === 40) {
          return <CloseCircleTwoTone twoToneColor="#D83939" />;
        } else if (row.n_contact_verify_status === 50) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }
      },
      renderFormItem: () => (
        <ProFormSelect
          name={intl.formatMessage({
            id: 'pages.Borrow.VerifyDetail.n_contact_verify_status',
            defaultMessage: '',
          })}
          options={VERIFY_STATUS_OPTION}
          placeholder="Please select"
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.p_job_verify_status',
        defaultMessage: '',
      }),
      dataIndex: 'p_job_verify_status',
      render: (_, row) => {
        if (row.p_job_verify_status === 10) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.p_job_verify_status === 20) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.p_job_verify_status === 30) {
          return <ExclamationCircleTwoTone twoToneColor="#EEC211" />;
        } else if (row.p_job_verify_status === 40) {
          return <CloseCircleTwoTone twoToneColor="#D83939" />;
        } else if (row.p_job_verify_status === 50) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }
      },
      renderFormItem: () => (
        <ProFormSelect
          name={intl.formatMessage({
            id: 'pages.Borrow.VerifyDetail.p_job_verify_status',
            defaultMessage: '',
          })}
          options={VERIFY_STATUS_OPTION}
          placeholder="Please select"
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.r_loan_bank_verify_status',
        defaultMessage: '',
      }),
      dataIndex: 'r_loan_bank_verify_status',
      render: (_, row) => {
        if (row.r_loan_bank_verify_status === 10) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.r_loan_bank_verify_status === 20) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.r_loan_bank_verify_status === 30) {
          return <ExclamationCircleTwoTone twoToneColor="#EEC211" />;
        } else if (row.r_loan_bank_verify_status === 40) {
          return <CloseCircleTwoTone twoToneColor="#D83939" />;
        } else if (row.r_loan_bank_verify_status === 50) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }
      },
      renderFormItem: () => (
        <ProFormSelect
          name={intl.formatMessage({
            id: 'pages.Borrow.VerifyDetail.r_loan_bank_verify_status',
            defaultMessage: '',
          })}
          options={VERIFY_STATUS_OPTION}
          placeholder="Please select"
        />
      ),
    },
    /*{
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.t_repay_bank_verify_status',
        defaultMessage: '',
      }),
      dataIndex: 't_repay_bank_verify_status',
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.v_h5_verify_status',
        defaultMessage: '',
      }),
      dataIndex: 'v_h5_verify_status',
      valueType: 'select',
      valueEnum: VERIFY_STATUS_ENUM,
    },*/
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.l_liveness_verify_status',
        defaultMessage: '',
      }),
      dataIndex: 'l_liveness_verify_status',
      render: (_, row) => {
        if (row.l_liveness_verify_status === 10) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.l_liveness_verify_status === 20) {
          return <ClockCircleTwoTone twoToneColor="#d2ccbf" />;
        } else if (row.l_liveness_verify_status === 30) {
          return <ExclamationCircleTwoTone twoToneColor="#EEC211" />;
        } else if (row.l_liveness_verify_status === 40) {
          return <CloseCircleTwoTone twoToneColor="#D83939" />;
        } else if (row.l_liveness_verify_status === 50) {
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }
      },
      renderFormItem: () => (
        <ProFormSelect
          name={intl.formatMessage({
            id: 'pages.Borrow.VerifyDetail.l_liveness_verify_status',
            defaultMessage: '',
          })}
          options={VERIFY_STATUS_OPTION}
          placeholder="Please select"
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.a_b_ocr_verify_times',
        defaultMessage: '',
      }),
      dataIndex: 'a_b_ocr_verify_times',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.a_c_idnumber_verify_times',
        defaultMessage: '',
      }),
      dataIndex: 'a_c_idnumber_verify_times',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.a_e_liveness_verify_times',
        defaultMessage: '',
      }),
      dataIndex: 'a_e_liveness_verify_times',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.g_risk_strategy_id',
        defaultMessage: '',
      }),
      dataIndex: 'c_risk_id',
      valueType: 'select',
      request: _getStrateiesEnums,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.d_risk_score',
        defaultMessage: '',
      }),
      dataIndex: 'd_risk_score',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.e_risk_result',
        defaultMessage: '',
      }),
      dataIndex: 'e_risk_result',
      render: (_, row) => {
        if (row.e_risk_result === 10) {
          return <Tag color="#d2ccbf">WAITING</Tag>;
        } else if (row.e_risk_result === 20) {
          return <Tag color="#d2ccbf">WAITING</Tag>;
        } else if (row.e_risk_result === 30) {
          return <Tag color="#EEC211">REVIEW</Tag>;
        } else if (row.e_risk_result === 40) {
          return <Tag color="#f50">REJECT</Tag>;
        } else if (row.e_risk_result === 50) {
          return <Tag color="#87d068">ACCEPT</Tag>;
        }
      },
      renderFormItem: () => (
        <ProFormSelect
          name={intl.formatMessage({
            id: 'pages.Borrow.VerifyDetail.e_risk_result',
            defaultMessage: '',
          })}
          options={RISK_STATUS_OPTION}
          placeholder="Please select"
        />
      ),
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.VerifyDetail.h_next_expired_date',
        defaultMessage: '',
      }),
      dataIndex: 'h_next_expired_date',
      valueType: 'dateRange',
      render: (_, record) => {
        if (record.h_next_expired_date) {
          return moment(record.h_next_expired_date).format('YY-MM-DD');
        } else {
          return '-';
        }
      },
      search: {
        transform: (value: any) => {
          return {
            'h_next_expired_date[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'h_next_expired_date[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.common.created_at',
        defaultMessage: '',
      }),
      dataIndex: 'created_at',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.created_at).format('MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => {
          return {
            'created_at[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'created_at[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.common.updated_at',
        defaultMessage: '',
      }),
      dataIndex: 'updated_at',
      valueType: 'dateRange',
      render: (_, record) => {
        if (record.created_at !== record.updated_at) {
          return moment(record.updated_at).format('MM-DD HH:mm');
        } else {
          return '-';
        }
      },
      search: {
        transform: (value: any) => {
          return {
            'updated_at[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'updated_at[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'id',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => {
        return (
          <a key="edit" onClick={() => history.push(`/borrow/verify/detail/${record.id}`)}>
            {intl.formatMessage({ id: 'pages.common.option.detail', defaultMessage: '' })}
          </a>
        );
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
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

import {
  COLLECTION_NEWS_CAT,
  COLLECTION_NEWS_TYPE,
  LOAN_LOG_STATUS,
  LOAN_LOG_TYPE,
  RELATION,
  REPAY_LOG_STATUS,
  REPAY_LOG_TYPE,
  REPAY_LOG_WAY,
} from '@/pages/enums';
import { getAdminV1DBorrowsId as show } from '@/services/ant-design-pro/DBorrow';

import type { TableListPagination } from '@/pages/Loan/LoanList/SuccessLoan/data';
import { getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum } from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';
import { GridContent } from '@ant-design/pro-layout';
import ProTable, { type ProColumns } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Alert, Card, Descriptions, Spin, Table, InputNumber, Form, message, Modal,Button   } from 'antd';
import { CardTabListType } from 'antd/es/card/Card';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import type { TableListItem } from '../data';
import styles from '../style.less';
import { postAdminV1OADeductions as  deduction } from '@/services/ant-design-pro/OADeduction';
import {
  PeriodDetailFieldIndex,
  PeriodDetailFieldLabels,
  PeriodFieldIndex,
  PeriodFieldLabels,
} from './service';

type AdvancedState = {
  operationKey: string;
  tabActiveKey: string;
};

const UrgeDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const intl = useIntl();
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  const [period, setPeriod] = useState<API.QBPeriod>();
  const [collectionNews, setcollectionNews] = useState<API.QCCollectionNews[]>();
  const [other, setOther] = useState<API.BorrowDetail>();
  // const [defaultExpandedRowKey, setDefaultExpandedRowKey] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  const [collectionAgencies, setCollectionAgencies] = useState<RequestOptionsType[]>([]);
  const [collectionGroups, setCollectionGroups] = useState<RequestOptionsType[]>([]);
  const [reductionModalVisible, setReductionModalVisible] = useState<boolean>(false);
  const [reductionAmount, setReductionAmount] = useState<number>(0);
  const [collectionSub, setCollectionSub] = useState<{
    logCount: number;
    callCount: number;
    smsCount: number;
    amount: number;
    successAmount: number;
    commission: number;
  }>();
  const [tabActiveKey, handleTabActiveKey] = useState<string>('0');
  const [tabStatus, seTabStatus] = useState<AdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });

  const [collectionTabList, setCollectionTabList] = useState<CardTabListType[]>([
    {
      key: '92',
      tab: 'S0',
    },
    {
      key: '93',
      tab: 'S1',
    },
    {
      key: '94',
      tab: 'S2',
    },
    {
      key: '95',
      tab: 'S3',
    },
  ]);

  /**
   * 查询管理员enum
   */
  const _getUsersEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length === 0) {
      const res = await getUsersEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.name,
          value: item.id!.toString(),
        });
      }
      setAdmins(data);
      return data;
    } else {
      return admins;
    }
  };

  /**
   * 查询组enum
   */
  const _getCollectionGroupsEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionGroups.length === 0) {
      const res = await getCollectionGroupsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
          c_collection_agency_id: item.c_collection_agency_id,
          f_status: item.f_status,
        });
      }
      setCollectionGroups(data);
      return data;
    } else {
      return collectionGroups;
    }
  };
  /**
   * 查询催收机构enum
   */
  const _getCollectionAgenciesEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionAgencies.length === 0) {
      const res = await getCollectionAgenciesEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setCollectionAgencies(data);
      return data;
    } else {
      return collectionAgencies;
    }
  };
  const _setCollectionFooter = (key: string, order2?: API.SFCollectionSubOrder) => {
    console.log(order2);
    console.log(oldRecord?.a_a_a_a_a_s_f_collection_sub_order);
    if (
      oldRecord?.a_a_a_a_a_s_f_collection_sub_order?.k_s0_collection_admin_log_count !==
        undefined ||
      order2?.k_s0_collection_admin_log_count !== undefined
    ) {
      let order = oldRecord?.a_a_a_a_a_s_f_collection_sub_order || order2;
      switch (key) {
        case '92':
          setCollectionSub({
            logCount: order!.k_s0_collection_admin_log_count!,
            callCount: order!.o_s0_collection_admin_call_count!,
            smsCount: order!.s_s0_collection_sms_count!,
            amount: order!.c_s0_collection_amount!,
            successAmount: order!.g_s0_collection_success_amount!,
            commission: order!.w_s0_collection_commission!,
          });
          break;
        case '93':
          setCollectionSub({
            logCount: order!.l_s1_collection_admin_log_count!,
            callCount: order!.p_s1_collection_admin_call_count!,
            smsCount: order!.t_s1_collection_sms_count!,
            amount: order!.d_s1_collection_amount!,
            successAmount: order!.h_s1_collection_success_amount!,
            commission: order!.x_s1_collection_commission!,
          });
          break;
        case '94':
          setCollectionSub({
            logCount: order!.m_s2_collection_admin_log_count!,
            callCount: order!.q_s2_collection_admin_call_count!,
            smsCount: order!.u_s2_collection_sms_count!,
            amount: order!.e_s2_collection_amount!,
            successAmount: order!.i_s2_collection_success_amount!,
            commission: order!.y_s2_collection_commission!,
          });
          break;
        case '95':
          setCollectionSub({
            logCount: order!.n_s3_collection_admin_log_count!,
            callCount: order!.r_s3_collection_admin_call_count!,
            smsCount: order!.v_s3_collection_sms_count!,
            amount: order!.f_s3_collection_amount!,
            successAmount: order!.j_s3_collection_success_amount!,
            commission: order!.z_s3_collection_commission!,
          });
          break;
      }
    }
  };
  const _handleTabChange = (key: string) => {
    handleTabActiveKey(key);
    if (oldRecord?.a_a_a_a_a_q_c_collection_news !== undefined) {
      setcollectionNews(
        oldRecord?.a_a_a_a_a_q_c_collection_news.filter(
          (item) => item.b_collection_stage_id?.toString() === key,
        ),
      );
    }
    _setCollectionFooter(key);
  };
  useEffect(() => {
    const _show = async () => {
      setLoading(true);
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await show({ id: params.id });
      setOldRecord(res.data);
      setOther(res.other);
      if (res.data && res!.data!.a_a_a_a_a_q_b_periods) {
        // const offset = res.data!.a_p_period_count! - res.data!.u_settled_period!;
        // setDefaultExpandedRowKey(res!.data!.a_a_a_a_a_q_b_periods!.shift()!.id! + offset)
      }
      if (res.data && res?.data?.a_a_a_a_a_q_c_collection_news !== undefined) {
        let tmpTabActiveKey: string = tabActiveKey;
        let tmpTabCollectionNewsCount: { [key: string]: number } = {};
        const groupedByStage = res?.data?.a_a_a_a_a_q_c_collection_news.reduce(
          (accumulator, current) => {
            if (!accumulator[current!.b_collection_stage_id!.toString()]) {
              accumulator[current!.b_collection_stage_id!.toString()] = [];
              tmpTabCollectionNewsCount[current!.b_collection_stage_id!.toString()] = 1;
            }
            accumulator[current!.b_collection_stage_id!.toString()].push(current);
            tmpTabActiveKey = current!.b_collection_stage_id!.toString();
            tmpTabCollectionNewsCount[current!.b_collection_stage_id!.toString()]++;
            return accumulator;
          },
          {} as Record<string, API.QCCollectionNews[]>,
        );
        handleTabActiveKey(tmpTabActiveKey);
        _setCollectionFooter(tmpTabActiveKey, res?.data?.a_a_a_a_a_s_f_collection_sub_order);
        setcollectionNews(groupedByStage[tmpTabActiveKey]);
        collectionTabList.forEach((value) => {
          value.tab = (
            <div>
              {value.tab}
              {tmpTabCollectionNewsCount[Number(value.key)] !== undefined ? (
                <span style={{ color: '#43bcba', fontSize: 12 }}>
                  {' '}
                  {tmpTabCollectionNewsCount[Number(value.key)]}
                </span>
              ) : null}
            </div>
          );
        });
        setCollectionTabList(collectionTabList);
        //设置催收footer
      }

      return {
        data: res.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: res.success,
      };
    };
    _show().then(() => setLoading(false));
    _getUsersEnum().then(() => setLoading(false));
    return () => {};
  }, []);

  // const onTabChange = (tabActiveKey: string) => {
  //   seTabStatus({ ...tabStatus, tabActiveKey });
  // };
  const onOperationTabChange = (key: string) => {
    seTabStatus({ ...tabStatus, operationKey: key });
    setcollectionNews([]);
  };
  const showDeducationModal = (item: API.QBPeriod) => {
    setReductionModalVisible(true);
    setPeriod(item);

  };

  const columns: ColumnsType<API.QBPeriod> = [
    {
      title: PeriodFieldLabels.d_index,
      dataIndex: PeriodFieldIndex.d_index,
      key: PeriodFieldIndex.d_index,
    },
    {
      title: PeriodFieldLabels.g_expect_borrow_amount,
      dataIndex: PeriodFieldIndex.g_expect_borrow_amount,
      key: PeriodFieldIndex.g_expect_borrow_amount,
    },
    {
      title: PeriodFieldLabels.a_p_expect_repay_time,
      dataIndex: PeriodFieldIndex.a_p_expect_repay_time,
      key: PeriodFieldIndex.a_p_expect_repay_time,
      render: (_, record) => {
        if (record.l_overdue_days! > 0) {
          return (
            <span style={{ color: 'red' }}>
              {moment(record?.a_p_expect_repay_time).format('YYYY-MM-DD')}(逾期
              {record.l_overdue_days}天)
            </span>
          );
        } else {
          return <span>{moment(record?.a_p_expect_repay_time).format('YYYY-MM-DD')}</span>;
        }
      },
    },
    {
      title: PeriodFieldLabels.l_overdue_days,
      dataIndex: PeriodFieldIndex.l_overdue_days,
      key: PeriodFieldIndex.l_overdue_days,
    },
    {
      title: PeriodFieldLabels.f_expect_repay_total_amount,
      dataIndex: PeriodFieldIndex.f_expect_repay_total_amount,
      key: PeriodFieldIndex.f_expect_repay_total_amount,
      render: (_, record) => {
        let amount =  record.f_expect_repay_total_amount!;
        if(record.a_o_product_settlement_type == 1){
            return amount - record.q_paid_service_fee! - record.p_paid_interest!;
        }else if(record.a_o_product_settlement_type == 2){
          return amount - record.q_paid_service_fee!;
        }else{
          return amount;
        }
      },
    },
    {
      title: PeriodFieldLabels.u_deduction_total_amount,
      dataIndex: PeriodFieldIndex.u_deduction_total_amount,
      key: PeriodFieldIndex.u_deduction_total_amount,
    },
    // {
    //   title: PeriodFieldLabels.a_c_extend_total_amount,
    //   dataIndex: PeriodFieldIndex.a_c_extend_total_amount,
    //   key: PeriodFieldIndex.a_c_extend_total_amount,
    // },
    {
      title: PeriodFieldLabels.a_a_write_off_amount,
      dataIndex: PeriodFieldIndex.a_a_write_off_amount,
      key: PeriodFieldIndex.a_a_write_off_amount,
    },
    {
      title: PeriodFieldLabels.n_paid_amount,
      dataIndex: PeriodFieldIndex.n_paid_amount,
      key: PeriodFieldIndex.n_paid_amount,
    },
    {
      title: "剩余应还",
      dataIndex: PeriodFieldIndex.f_expect_repay_total_amount,
      key: PeriodFieldIndex.f_expect_repay_total_amount,
      render: (_, record) => {
        let amount =  record.f_expect_repay_total_amount! - record.u_deduction_total_amount! - record.n_paid_amount!;
        if(record.a_o_product_settlement_type == 1){
            return amount - record.q_paid_service_fee! - record.p_paid_interest!;
        }else if(record.a_o_product_settlement_type == 2){
          return amount - record.q_paid_service_fee!;
        }else{
          return amount;
        }
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.common.option',
        defaultMessage: '操作',
      }),
      render: (_, record) => {
        return <span onClick={() => showDeducationModal(record)} style={{ cursor: 'pointer', color: '#1890ff' }}>
        减免
      </span>;
      },
    },

  ];

  const loanColumns: ProColumns<API.MCLoanLog>[] = [
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.e_payment_channel', defaultMessage: '' }),
      dataIndex: 'e_payment_channel',
      key: 'e_payment_channel',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.MCLoanLog.k_receiver_bankcard_name',
        defaultMessage: '',
      }),
      dataIndex: 'k_receiver_bankcard_name',
      key: 'k_receiver_bankcard_name',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.MCLoanLog.j_receiver_bankcard_number',
        defaultMessage: '',
      }),
      dataIndex: 'j_receiver_bankcard_number',
      key: 'j_receiver_bankcard_number',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.i_receiver_name', defaultMessage: '' }),
      dataIndex: 'i_receiver_name',
      key: 'i_receiver_name',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.q_outer_sn', defaultMessage: '' }),
      dataIndex: 'q_outer_sn',
      key: 'q_outer_sn',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.u_sync_message', defaultMessage: '' }),
      dataIndex: 'u_sync_message',
      key: 'u_sync_message',
      ellipsis: true,
      width: '10%',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.x_callback_message', defaultMessage: '' }),
      dataIndex: 'x_callback_message',
      key: 'x_callback_message',
      ellipsis: true,
      width: '10%',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.z_remark', defaultMessage: '' }),
      dataIndex: 'z_remark',
      key: 'z_remark',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.g_type', defaultMessage: '' }),
      dataIndex: 'g_type',
      key: 'g_type',
      valueEnum: LOAN_LOG_TYPE,
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.c_admin_id', defaultMessage: '' }),
      dataIndex: 'c_admin_id',
      key: 'c_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.c_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.r_amount', defaultMessage: '' }),
      dataIndex: 'r_amount',
      key: 'r_amount',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.h_status', defaultMessage: '' }),
      dataIndex: 'h_status',
      key: 'h_status',
      valueEnum: LOAN_LOG_STATUS,
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.o_loan_time', defaultMessage: '' }),
      dataIndex: 'o_loan_time',
      key: 'o_loan_time',
      width: 90,
      render: (_, record) => {
        return moment(record.o_loan_time).format('MM-DD HH:mm');
      },
    },
  ];

  const repayColumns: ProColumns<API.RARepayLog>[] = [
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.m_payment_channel', defaultMessage: '' }),
      dataIndex: 'm_payment_channel',
      key: 'm_payment_channel',
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.a_x_payment_method', defaultMessage: '' }),
      dataIndex: 'a_x_payment_method',
      key: 'a_x_payment_method',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.o_bankcard_number', defaultMessage: '' }),
      dataIndex: 'o_bankcard_number',
      key: 'o_bankcard_number',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.p_bankcard_name', defaultMessage: '' }),
      dataIndex: 'p_bankcard_name',
      key: 'p_bankcard_name',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.x_sync_message', defaultMessage: '' }),
      dataIndex: 'x_sync_message',
      key: 'x_sync_message',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.RARepayLog.a_a_callback_message',
        defaultMessage: '',
      }),
      dataIndex: 'a_a_callback_message',
      key: 'a_a_callback_message',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.RARepayLog.b_b_collection_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'b_b_collection_admin_id',
      key: 'b_b_collection_admin_id',
      valueType: 'select',
      ellipsis: true,
      request: _getUsersEnum,
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.k_way', defaultMessage: '' }),
      dataIndex: 'k_way',
      key: 'k_way',
      filters: true,
      onFilter: true,
      valueEnum: REPAY_LOG_WAY,
    },

    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.a_y_period_index', defaultMessage: '' }),
      dataIndex: 'a_y_period_index',
      key: 'a_y_period_index',
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.a_w_overdue_days', defaultMessage: '' }),
      dataIndex: 'a_w_overdue_days',
      key: 'a_w_overdue_days',
    },
    {
      title: intl.formatMessage({
        id: 'pages.RARepayLog.a_e_expect_repay_total_amount',
        defaultMessage: '',
      }),
      dataIndex: 'a_e_expect_repay_total_amount',
      key: 'a_e_expect_repay_total_amount',
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.u_amount', defaultMessage: '' }),
      dataIndex: 'u_amount',
      key: 'u_amount',
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.i_type', defaultMessage: '' }),
      dataIndex: 'i_type',
      key: 'i_type',
      filters: true,
      onFilter: true,
      valueEnum: REPAY_LOG_TYPE,
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.j_status', defaultMessage: '' }),
      dataIndex: 'j_status',
      key: 'j_status',
      filters: true,
      onFilter: true,
      valueEnum: REPAY_LOG_STATUS,
    },
    {
      title: intl.formatMessage({ id: 'pages.RARepayLog.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateTime',
      width: 160,
    },
  ];

  const collectionNewsColumns: ProColumns<API.QCCollectionNews>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.QCCollectionNew.l_stage_day_index',
        defaultMessage: '',
      }),
      dataIndex: 'l_stage_day_index',
      key: 'l_stage_day_index',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNew.m_overdue_days', defaultMessage: '' }),
      dataIndex: 'm_overdue_days',
      key: 'm_overdue_days',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNew.o_period_id', defaultMessage: '' }),
      dataIndex: 'o_period_id',
      key: 'o_period_id',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.QCCollectionNew.c_collection_agency_id',
        defaultMessage: '',
      }),
      dataIndex: 'c_collection_agency_id',
      key: 'c_collection_agency_id',
      valueType: 'select',
      ellipsis: true,
      request: _getCollectionAgenciesEnum,
    },
    {
      title: intl.formatMessage({
        id: 'pages.QCCollectionNew.d_collection_group_id',
        defaultMessage: '',
      }),
      dataIndex: 'd_collection_group_id',
      key: 'd_collection_group_id',
      valueType: 'select',
      ellipsis: true,

      request: _getCollectionGroupsEnum,
    },
    {
      title: intl.formatMessage({
        id: 'pages.QCCollectionNew.e_collection_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'e_collection_admin_id',
      key: 'e_collection_admin_id',
      valueType: 'select',
      ellipsis: true,
      request: _getUsersEnum,
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNew.f_cat', defaultMessage: '' }),
      dataIndex: 'f_cat',
      key: 'f_cat',
      ellipsis: true,
      filters: true,
      onFilter: true,
      valueEnum: COLLECTION_NEWS_CAT,
    },

    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNew.h_phone', defaultMessage: '' }),
      dataIndex: 'h_phone',
      key: 'h_phone',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNew.i_target', defaultMessage: '' }),
      dataIndex: 'i_target',
      key: 'i_target',
      ellipsis: true,
      filters: true,
      onFilter: true,
      valueEnum: RELATION,
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNew.j_content', defaultMessage: '' }),
      dataIndex: 'j_content',
      key: 'j_content',
      ellipsis: true,
    },

    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNew.k_promise_time', defaultMessage: '' }),
      dataIndex: 'k_promise_time',
      key: 'k_promise_time',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNew.g_type', defaultMessage: '' }),
      dataIndex: 'g_type',
      key: 'g_type',
      ellipsis: true,
      filters: true,
      onFilter: true,
      valueEnum: COLLECTION_NEWS_TYPE,
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNew.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateTime',
      sorter: true,
      ellipsis: true,
    },
  ];

  const expandColumns: ColumnsType<API.PeriodDetail> = [
    {
      title: PeriodDetailFieldLabels.title,
      dataIndex: PeriodDetailFieldIndex.title,
      key: PeriodDetailFieldIndex.title,
      className: styles.blue2,
    },
    {
      title: PeriodDetailFieldLabels.borrow_amount,
      dataIndex: PeriodDetailFieldIndex.borrow_amount,
      key: PeriodDetailFieldIndex.borrow_amount,
    },
    {
      title: PeriodDetailFieldLabels.interest,
      dataIndex: PeriodDetailFieldIndex.interest,
      key: PeriodDetailFieldIndex.interest,
    },
    {
      title: PeriodDetailFieldLabels.service_fee,
      dataIndex: PeriodDetailFieldIndex.service_fee,
      key: PeriodDetailFieldIndex.service_fee,
    },
    {
      title: PeriodDetailFieldLabels.violate_fee,
      dataIndex: PeriodDetailFieldIndex.violate_fee,
      key: PeriodDetailFieldIndex.violate_fee,
    },
    {
      title: PeriodDetailFieldLabels.overdue_fee,
      dataIndex: PeriodDetailFieldIndex.overdue_fee,
      key: PeriodDetailFieldIndex.overdue_fee,
    },
    {
      title: PeriodDetailFieldLabels.total_amount,
      dataIndex: PeriodDetailFieldIndex.total_amount,
      key: PeriodDetailFieldIndex.total_amount,
    },
  ];

  const expandedRowRender = (_record: API.QBPeriod) => {
    return (
      <Table
        size="small"
        rowKey="title"
        columns={expandColumns}
        // @ts-ignore
        dataSource={other?.extend_data ? other.extend_data[_record!.d_index!] : undefined}
        pagination={false}
      />
    );
  };

  const collectionExtra = (
    <div style={{ width: 1100 }}>
      {oldRecord?.a_a_a_a_a_b_l_collection_order?.g_collection_order_flow_history_count !==
      undefined ? (
        <Alert
          message={
            <Descriptions size="small" column={17}>
              <Descriptions.Item span={3} label="入催时间">
                {moment(oldRecord?.a_a_a_a_a_b_l_collection_order?.created_at).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="流转次数">
                {oldRecord?.a_a_a_a_a_b_l_collection_order?.g_collection_order_flow_history_count}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="催记数">
                {oldRecord?.a_a_a_a_a_b_l_collection_order?.h_collection_admin_log_count}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="电话数">
                {oldRecord?.a_a_a_a_a_b_l_collection_order?.z_current_call_count}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="短信数">
                {oldRecord?.a_a_a_a_a_b_l_collection_order?.j_system_sms_count}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="入催金额">
                {oldRecord?.a_a_a_a_a_b_l_collection_order?.n_borrow_amount}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="催回金额">
                {oldRecord?.a_a_a_a_a_b_l_collection_order?.l_collection_amount}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="佣金">
                {oldRecord?.a_a_a_a_a_b_l_collection_order?.a_a_commission}
              </Descriptions.Item>
            </Descriptions>
          }
          type="info"
        />
      ) : null}
    </div>
  );

  const repayExtra = (
    <div style={{ width: 700 }}>
      {oldRecord?.a_a_a_a_a_o_a_repay?.a_j_withhold_times !== undefined ? (
        <Alert
          message={
            <Descriptions size="small" column={5}>
              <Descriptions.Item label="支付次数">
                {oldRecord?.a_a_a_a_a_o_a_repay?.a_j_withhold_times}
              </Descriptions.Item>
              <Descriptions.Item label="成功次数">
                {oldRecord?.a_a_a_a_a_o_a_repay?.a_k_success_withhold_times}
              </Descriptions.Item>
              <Descriptions.Item label="减免次数">
                {oldRecord?.a_a_a_a_a_o_a_repay?.t_deduction_times}
              </Descriptions.Item>
              <Descriptions.Item label="部分还款次数">
                {oldRecord?.a_a_a_a_a_o_a_repay?.a_h_part_times}
              </Descriptions.Item>
              <Descriptions.Item label="展期次数">
                {oldRecord?.a_a_a_a_a_o_a_repay?.a_b_extend_times}
              </Descriptions.Item>
            </Descriptions>
          }
          type="info"
        />
      ) : null}
    </div>
  );

  return (
    <div className={styles.main}>
      <Spin spinning={loading} delay={300}>
        <GridContent>
          <Card title="订单详情" style={{ marginBottom: 10 }}>
            <Table
              columns={columns}
              dataSource={oldRecord?.a_a_a_a_a_q_b_periods}
              bordered
              pagination={false}
              rowKey="id"
              size="small"
              expandable={{ expandedRowRender, expandedRowClassName: () => 'red' }}
            />
          </Card>

          <Card
            title="放款记录"
            style={{ marginBottom: 10 }}
            className={styles.tabsCard}
            bordered={false}
          >
            <ProTable<TableListItem, TableListPagination>
              dataSource={oldRecord?.a_a_a_a_a_m_c_loan_logs}
              rowKey="id"
              search={false}
              options={false}
              columns={loanColumns}
              size="small"
              pagination={false}
            />
          </Card>
          <Card
            title="还款记录"
            style={{ marginBottom: 10 }}
            className={styles.tabsCard}
            bordered={false}
            onTabChange={onOperationTabChange}
            extra={repayExtra}
          >
            <ProTable<TableListItem, TableListPagination>
              dataSource={oldRecord?.a_a_a_a_a_r_a_repay_logs}
              rowKey="id"
              search={false}
              options={false}
              columns={repayColumns}
              size="small"
              pagination={false}
            />
          </Card>
          <Card
            title="催收动态"
            style={{ marginBottom: 10 }}
            className={styles.tabsCard}
            bordered={false}
            tabList={collectionTabList}
            onTabChange={_handleTabChange}
            extra={collectionExtra}
            activeTabKey={tabActiveKey}
          >
            <ProTable<API.QCCollectionNews, TableListPagination>
              dataSource={collectionNews}
              rowKey="id"
              search={false}
              options={false}
              columns={collectionNewsColumns}
              size="small"
              pagination={false}
              title={() =>
                collectionSub?.logCount !== undefined ? (
                  <>
                    <Descriptions size="small" column={9} style={{ width: 1000 }}>
                      <Descriptions.Item label="催记数">
                        {collectionSub?.logCount}
                      </Descriptions.Item>
                      <Descriptions.Item label="电话数">
                        {collectionSub?.callCount}
                      </Descriptions.Item>
                      <Descriptions.Item label="短信数">
                        {collectionSub?.smsCount}
                      </Descriptions.Item>
                      <Descriptions.Item label="入催金额">
                        {collectionSub?.amount}
                      </Descriptions.Item>
                      <Descriptions.Item label="催回金额">
                        {collectionSub?.successAmount}
                      </Descriptions.Item>
                      <Descriptions.Item label="佣金">
                        {collectionSub?.commission}
                      </Descriptions.Item>
                    </Descriptions>
                  </>
                ) : null
              }
            />
          </Card>
          <Modal
          title="减免申请"
          visible={reductionModalVisible}
          onCancel={() => setReductionModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setReductionModalVisible(false)}>
              取消
            </Button>,
            <Button key="ok" type="primary" onClick={async () => {
              // 调用减免申请接口
              try {
                await deduction({ c_period_id: period?.id, q_deduction_total_amount:reductionAmount });
                message.success('减免申请提交成功');
                setReductionModalVisible(false);
                // 刷新数据
              } catch (error) {
                message.error('减免申请提交失败');
              }
            }}>
              确认
            </Button>,
          ]}
        >
          <Form layout="vertical" style={{ maxWidth: 300 }}>
            <Form.Item
              name="reductionAmount"
              label="减免金额"
              rules={[{ required: true, message: '请输入减免金额' }]}
              initialValue={0}
            >
              <InputNumber
                min={0}
                precision={2}
                style={{ width: '100%' }}
                formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value!.replace(/\¥\s?|(,*)/g, '')}
                onChange={value => setReductionAmount(value as number)}
              />
            </Form.Item>
          </Form>
        </Modal>
        </GridContent>
      </Spin>
    </div>
  );
};

export default UrgeDetail;

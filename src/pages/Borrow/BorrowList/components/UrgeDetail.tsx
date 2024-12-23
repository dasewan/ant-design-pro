import { BORROW_STATUS_MAP } from '@/pages/enums';
import { getAdminV1DBorrowsId as show } from '@/services/ant-design-pro/DBorrow';
import { ClockCircleTwoTone, HourglassTwoTone } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, Row, Spin, Statistic, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import type { TableListItem } from '../data';
import styles from '../style.less';
import {
  PeriodDetailFieldIndex,
  PeriodDetailFieldLabels,
  PeriodFieldIndex,
  PeriodFieldLabels,
} from './service';
import {useIntl} from "@@/exports";

type AdvancedState = {
  operationKey: string;
  tabActiveKey: string;
};
const urgeTabList = [
  {
    key: 's0',
    tab: 'S0',
  },
  {
    key: 's1',
    tab: 'S1',
  },
  {
    key: 's2',
    tab: 'S2',
  },
  {
    key: 's3',
    tab: 'S3',
  },
];
const UrgeDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const intl = useIntl();
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  const [other, setOther] = useState<API.BorrowDetail>();
  // const [defaultExpandedRowKey, setDefaultExpandedRowKey] = useState<number>();
  const [loaned, setLoaned] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabStatus, seTabStatus] = useState<AdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });

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
      if (res.data && [60, 80, 90].includes(res.data.j_status!)) {
        setLoaned(true);
      }
      return {
        data: res.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: res.success,
      };
    };
    _show().then(() => setLoading(false));
    return () => {};
  }, []);

  // const onTabChange = (tabActiveKey: string) => {
  //   seTabStatus({ ...tabStatus, tabActiveKey });
  // };
  const onOperationTabChange = (key: string) => {
    seTabStatus({ ...tabStatus, operationKey: key });
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
      title: PeriodFieldLabels.l_overdue_days,
      dataIndex: PeriodFieldIndex.l_overdue_days,
      key: PeriodFieldIndex.l_overdue_days,
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
      title: PeriodFieldLabels.f_expect_repay_total_amount,
      dataIndex: PeriodFieldIndex.f_expect_repay_total_amount,
      key: PeriodFieldIndex.f_expect_repay_total_amount,
    },
    {
      title: PeriodFieldLabels.u_deduction_total_amount,
      dataIndex: PeriodFieldIndex.u_deduction_total_amount,
      key: PeriodFieldIndex.u_deduction_total_amount,
    },
    {
      title: PeriodFieldLabels.a_c_extend_total_amount,
      dataIndex: PeriodFieldIndex.a_c_extend_total_amount,
      key: PeriodFieldIndex.a_c_extend_total_amount,
    },
    {
      title: PeriodFieldLabels.a_a_write_off_amount,
      dataIndex: PeriodFieldIndex.a_a_write_off_amount,
      key: PeriodFieldIndex.a_a_write_off_amount,
    },
    {
      title: PeriodFieldLabels.u_deduction_total_amount,
      dataIndex: PeriodFieldIndex.u_deduction_total_amount,
      key: PeriodFieldIndex.u_deduction_total_amount,
    },
    {
      title: PeriodFieldLabels.u_deduction_total_amount,
      dataIndex: PeriodFieldIndex.u_deduction_total_amount,
      key: PeriodFieldIndex.u_deduction_total_amount,
    },
  ];

  const loanColumns: ColumnsType<API.MCLoanLog> = [
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.e_payment_channel', defaultMessage: '' }),
      dataIndex: 'e_payment_channel',
      key: 'e_payment_channel',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.r_amount', defaultMessage: '' }),
      dataIndex: 'r_amount',
      key: 'r_amount',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.k_receiver_bankcard_name', defaultMessage: '' }),
      dataIndex: 'k_receiver_bankcard_name',
      key: 'k_receiver_bankcard_name',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.j_receiver_bankcard_number', defaultMessage: '' }),
      dataIndex: 'j_receiver_bankcard_number',
      key: 'j_receiver_bankcard_number',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.i_receiver_name', defaultMessage: '' }),
      dataIndex: 'i_receiver_name',
      key: 'i_receiver_name',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.c_admin_id', defaultMessage: '' }),
      dataIndex: 'c_admin_id',
      key: 'c_admin_id',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.h_status', defaultMessage: '' }),
      dataIndex: 'h_status',
      key: 'h_status',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.o_loan_time', defaultMessage: '' }),
      dataIndex: 'o_loan_time',
      key: 'o_loan_time',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.p_reference', defaultMessage: '' }),
      dataIndex: 'p_reference',
      key: 'p_reference',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.s_fee', defaultMessage: '' }),
      dataIndex: 's_fee',
      key: 's_fee',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.u_sync_message', defaultMessage: '' }),
      dataIndex: 'u_sync_message',
      key: 'u_sync_message',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.x_callback_message', defaultMessage: '' }),
      dataIndex: 'x_callback_message',
      key: 'x_callback_message',
    },
    {
      title: intl.formatMessage({ id: 'pages.MCLoanLog.z_remark', defaultMessage: '' }),
      dataIndex: 'z_remark',
      key: 'z_remark',
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

  return (
    <div className={styles.main}>
      <Spin spinning={loading} delay={300}>
        <GridContent>
          <Card title="订单详情" style={{ marginBottom: 10 }}>
            {oldRecord?.a_p_period_count !== undefined && oldRecord?.a_p_period_count > 1 ?
              <Row style={{ marginBottom: 24 }}>
                <Col span={3}>
                  <Statistic title="借款金额" value={oldRecord?.m_borrow_amount} prefix="¥" />
                </Col>
                <Col span={3}>
                  <Statistic title="借款期数" value={oldRecord?.a_p_period_count} />
                </Col>
                {loaned ? (
                  <Col span={3}>
                    <Statistic
                      title="放款时间"
                      value={moment(oldRecord?.o_loan_time).format('YYYY-MM-DD')}
                      prefix={<ClockCircleTwoTone style={{ fontSize: '16px' }} />}
                    />
                  </Col>
                ) : null}
                {loaned ? (
                  <Col span={3}>
                    <Statistic title="放款金额" value={oldRecord?.p_loan_amount} prefix="¥" />
                  </Col>
                ) : null}
                {loaned ? (
                  <Col span={3}>
                    <Statistic
                      title="应完结时间"
                      value={moment(oldRecord?.q_expect_repay_time).format('YYYY-MM-DD')}
                      prefix={
                        <HourglassTwoTone
                          style={{ fontSize: '16px' }}
                          twoToneColor={
                            oldRecord?.j_status === BORROW_STATUS_MAP.OVERDUE ? '#eb2f96' : '#52c41a'
                          }
                        />
                      }
                    />
                  </Col>
                ) : null}
                {loaned ? (
                  <Col span={3}>
                    <Statistic
                      title="应还金额"
                      value={oldRecord?.a_a_a_a_a_o_a_repay?.a_l_expect_repay_total_amount}
                      prefix="¥"
                    />
                  </Col>
                ) : null}
                {loaned ? (
                  <Col span={3}>
                    <Statistic title="已还金额" value={oldRecord?.s_amount_paid} prefix="¥" />
                  </Col>
                ) : null}
                {loaned ? (
                  <Col span={3}>
                    <Statistic title="减免金额" value={oldRecord?.s_amount_paid} prefix="¥" />
                  </Col>
                ) : null}
                {loaned && oldRecord?.t_settled_time ? (
                  <Col span={3}>
                    <Statistic
                      title="完结日期"
                      value={moment(oldRecord?.t_settled_time).format('YYYY-MM-DD')}
                      prefix="¥"
                    />
                  </Col>
                ) : null}
              </Row>
              : null}

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
            title="催收动态"
            style={{ marginBottom: 10 }}
            className={styles.tabsCard}
            bordered={false}
            tabList={urgeTabList}
            onTabChange={onOperationTabChange}
          />
          <Card
            title="放款记录"
            style={{ marginBottom: 10 }}
            className={styles.tabsCard}
            bordered={false}
            onTabChange={onOperationTabChange}
          >
            <Table
              columns={loanColumns}
              // dataSource={oldRecord?.a_a_a_a_a_q_b_periods}
              bordered
              pagination={false}
              rowKey="id"
              size="small"
            />
          </Card>
          <Card
            title="还款记录"
            style={{ marginBottom: 10 }}
            className={styles.tabsCard}
            bordered={false}
            onTabChange={onOperationTabChange}
          >
            <Table
              columns={loanColumns}
              // dataSource={oldRecord?.a_a_a_a_a_q_b_periods}
              bordered
              pagination={false}
              rowKey="id"
              size="small"
            />
          </Card>
        </GridContent>
      </Spin>
    </div>
  );
};

export default UrgeDetail;

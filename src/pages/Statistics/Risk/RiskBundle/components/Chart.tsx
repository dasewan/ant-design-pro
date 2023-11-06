import { DualAxes } from '@ant-design/plots';
import moment from 'moment';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
  period: string;
  dpd: string;
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  let columnData: { time: string; value: number; type: string }[] = [];
  let lineData: { time: string; value: number; type: string }[] = [];
  console.log(props);
  console.log(props.period);
  if (props.dpd === 'dpd1') {
    if (props.period === '1') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              (item!.n_period1_overdue_count! * 100) /
              item!.m_period1_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '2') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              (item!.q_period2_overdue_count! * 100) /
              item!.p_period2_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '3') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              (item!.t_period3_overdue_count! * 100) /
              item!.s_period3_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '4') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              (item!.w_period4_overdue_count! * 100) /
              item!.v_period4_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '5') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              (item!.z_period5_overdue_count! * 100) /
              item!.y_period5_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '6') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              (item!.a_c_period6_overdue_count! * 100) /
              item!.a_b_period6_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '100') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              ((item!.n_period1_overdue_count! +
                item!.q_period2_overdue_count! +
                item!.t_period3_overdue_count! +
                item!.w_period4_overdue_count! +
                item!.z_period5_overdue_count! +
                item!.a_c_period6_overdue_count!) *
                100) /
              (item!.m_period1_expected_repay_count! +
                item!.p_period2_expected_repay_count! +
                item!.s_period3_expected_repay_count! +
                item!.v_period4_expected_repay_count! +
                item!.y_period5_expected_repay_count! +
                item!.a_b_period6_expected_repay_count!)
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    }
  } else {
    if (props.period === '1') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              ((item!.m_period1_expected_repay_count! - item!.o_period1_settled_count!) * 100) /
              item!.m_period1_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '2') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              ((item!.p_period2_expected_repay_count! - item!.r_period2_settled_count!) * 100) /
              item!.p_period2_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '3') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              ((item!.s_period3_expected_repay_count! - item!.u_period3_settled_count!) * 100) /
              item!.s_period3_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '4') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              ((item!.v_period4_expected_repay_count! - item!.x_period4_settled_count!) * 100) /
              item!.v_period4_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '5') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              ((item!.y_period5_expected_repay_count! - item!.a_a_period5_settled_count!) * 100) /
              item!.y_period5_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '6') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              ((item!.a_b_period6_expected_repay_count! - item!.a_d_period6_settled_count!) * 100) /
              item!.a_b_period6_expected_repay_count!
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '100') {
      props.rawData.map((item) => {
        columnData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(
            (
              ((item!.m_period1_expected_repay_count! -
                item!.o_period1_settled_count! +
                (item!.p_period2_expected_repay_count! - item!.r_period2_settled_count!) +
                (item!.s_period3_expected_repay_count! - item!.u_period3_settled_count!) +
                (item!.v_period4_expected_repay_count! - item!.x_period4_settled_count!) +
                (item!.y_period5_expected_repay_count! - item!.a_a_period5_settled_count!) +
                (item!.a_b_period6_expected_repay_count! - item!.a_d_period6_settled_count!)) *
                100) /
              (item!.m_period1_expected_repay_count! +
                item!.p_period2_expected_repay_count! +
                item!.s_period3_expected_repay_count! +
                item!.v_period4_expected_repay_count! +
                item!.y_period5_expected_repay_count! +
                item!.a_b_period6_expected_repay_count!)
            ).toFixed(0),
          ),
          type: item.e_version!.toString(),
        });
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          type: item.e_version!.toString(),
        });
        return item;
      });
    }
  }

  const config = {
    data: [columnData, lineData],
    xField: 'time',
    yField: ['value', 'value'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
        // colors: ['#6294F9','#62D9AA','#647697','#F6C021', '#7565F9', '#74CAEC','#9966BC', '#FE9C4E', '#299998', '#FE9DC5']
      },
      {
        geometry: 'line',
        seriesField: 'type',
        lineStyle: ({ name }) => {
          if (name === 'a') {
            return {
              lineDash: [1, 4],
              opacity: 1,
            };
          }

          return {
            opacity: 0.5,
          };
        },
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default Chart;

import { DualAxes } from '@ant-design/plots';
import * as _ from 'lodash';
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
const Chart3: React.FC<FormProps> = (props) => {
  let columnData: { version: string; value: number; type: string }[] = [];
  let lineData: { version: string; value: number; type: string }[] = [];
  if (props.dpd === 'dpd1') {
    if (props.period === '1') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                (_.sumBy(item, 'n_period1_overdue_count') * 100) /
                _.sumBy(item, 'm_period1_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'n_period1_overdue_count').toFixed(1)),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '2') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                (_.sumBy(item, 'q_period2_overdue_count') * 100) /
                _.sumBy(item, 'p_period2_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'q_period2_overdue_count').toFixed(1)),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '3') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                (_.sumBy(item, 't_period3_overdue_count') * 100) /
                _.sumBy(item, 's_period3_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 't_period3_overdue_count').toFixed(1)),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '4') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                (_.sumBy(item, 'w_period4_overdue_count') * 100) /
                _.sumBy(item, 'v_period4_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'w_period4_overdue_count').toFixed(1)),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '5') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                (_.sumBy(item, 'z_period5_overdue_count') * 100) /
                _.sumBy(item, 'y_period5_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'z_period5_overdue_count').toFixed(1)),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '6') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                (_.sumBy(item, 'a_c_period6_overdue_count') * 100) /
                _.sumBy(item, 'a_b_period6_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'a_c_period6_overdue_count').toFixed(1)),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '100') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                ((_.sumBy(item, 'n_period1_overdue_count') +
                  _.sumBy(item, 'q_period2_overdue_count') +
                  _.sumBy(item, 't_period3_overdue_count') +
                  _.sumBy(item, 'w_period4_overdue_count') +
                  _.sumBy(item, 'z_period5_overdue_count') +
                  _.sumBy(item, 'a_c_period6_overdue_count')) *
                  100) /
                (_.sumBy(item, 'm_period1_expected_repay_count') +
                  _.sumBy(item, 'p_period2_expected_repay_count') +
                  _.sumBy(item, 's_period3_expected_repay_count') +
                  _.sumBy(item, 'v_period4_expected_repay_count') +
                  _.sumBy(item, 'y_period5_expected_repay_count') +
                  _.sumBy(item, 'a_b_period6_expected_repay_count'))
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                _.sumBy(item, 'n_period1_overdue_count') +
                _.sumBy(item, 'q_period2_overdue_count') +
                _.sumBy(item, 't_period3_overdue_count') +
                _.sumBy(item, 'w_period4_overdue_count') +
                _.sumBy(item, 'z_period5_overdue_count') +
                _.sumBy(item, 'a_c_period6_overdue_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    }
  } else {
    if (props.period === '1') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                ((_.sumBy(item, 'm_period1_expected_repay_count') -
                  _.sumBy(item, 'n_period1_overdue_count')) *
                  100) /
                _.sumBy(item, 'm_period1_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                _.sumBy(item, 'm_period1_expected_repay_count') -
                _.sumBy(item, 'n_period1_overdue_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '2') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                ((_.sumBy(item, 'p_period2_expected_repay_count') -
                  _.sumBy(item, 'q_period2_overdue_count')) *
                  100) /
                _.sumBy(item, 'p_period2_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                _.sumBy(item, 'p_period2_expected_repay_count') -
                _.sumBy(item, 'q_period2_overdue_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '3') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                ((_.sumBy(item, 's_period3_expected_repay_count') -
                  _.sumBy(item, 't_period3_overdue_count')) *
                  100) /
                _.sumBy(item, 's_period3_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                _.sumBy(item, 's_period3_expected_repay_count') -
                _.sumBy(item, 't_period3_overdue_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '4') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                ((_.sumBy(item, 'v_period4_expected_repay_count') -
                  _.sumBy(item, 'w_period4_overdue_count')) *
                  100) /
                _.sumBy(item, 'v_period4_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                _.sumBy(item, 'v_period4_expected_repay_count') -
                _.sumBy(item, 'w_period4_overdue_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '5') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                ((_.sumBy(item, 'y_period5_expected_repay_count') -
                  _.sumBy(item, 'z_period5_overdue_count')) *
                  100) /
                _.sumBy(item, 'y_period5_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                _.sumBy(item, 'y_period5_expected_repay_count') -
                _.sumBy(item, 'z_period5_overdue_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '6') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                ((_.sumBy(item, 'a_b_period6_expected_repay_count') -
                  _.sumBy(item, 'a_c_period6_overdue_count')) *
                  100) /
                _.sumBy(item, 'a_b_period6_expected_repay_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                _.sumBy(item, 'a_b_period6_expected_repay_count') -
                _.sumBy(item, 'a_c_period6_overdue_count')
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    } else if (props.period === '100') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                ((_.sumBy(item, 'm_period1_expected_repay_count') -
                  _.sumBy(item, 'n_period1_overdue_count') +
                  (_.sumBy(item, 'p_period2_expected_repay_count') -
                    _.sumBy(item, 'q_period2_overdue_count')) +
                  (_.sumBy(item, 's_period3_expected_repay_count') -
                    _.sumBy(item, 't_period3_overdue_count')) +
                  (_.sumBy(item, 'v_period4_expected_repay_count') -
                    _.sumBy(item, 'w_period4_overdue_count')) +
                  (_.sumBy(item, 'y_period5_expected_repay_count') -
                    _.sumBy(item, 'z_period5_overdue_count')) +
                  (_.sumBy(item, 'a_b_period6_expected_repay_count') -
                    _.sumBy(item, 'a_c_period6_overdue_count'))) *
                  100) /
                (_.sumBy(item, 'm_period1_expected_repay_count') +
                  _.sumBy(item, 'p_period2_expected_repay_count') +
                  _.sumBy(item, 's_period3_expected_repay_count') +
                  _.sumBy(item, 'v_period4_expected_repay_count') +
                  _.sumBy(item, 'y_period5_expected_repay_count') +
                  _.sumBy(item, 'a_b_period6_expected_repay_count'))
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          columnData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              (
                _.sumBy(item, 'm_period1_expected_repay_count') -
                _.sumBy(item, 'n_period1_overdue_count') +
                (_.sumBy(item, 'p_period2_expected_repay_count') -
                  _.sumBy(item, 'q_period2_overdue_count')) +
                (_.sumBy(item, 's_period3_expected_repay_count') -
                  _.sumBy(item, 't_period3_overdue_count')) +
                (_.sumBy(item, 'v_period4_expected_repay_count') -
                  _.sumBy(item, 'w_period4_overdue_count')) +
                (_.sumBy(item, 'y_period5_expected_repay_count') -
                  _.sumBy(item, 'z_period5_overdue_count')) +
                (_.sumBy(item, 'a_b_period6_expected_repay_count') -
                  _.sumBy(item, 'a_c_period6_overdue_count'))
              ).toFixed(1),
            ),
            type: 'DPD1',
          });
          lineData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'g_accept_count').toFixed(1)),
            type: 'accept',
          });
          return item;
        })
        .value();
    }
  }

  columnData.sort((x, y) => x.value - y.value);
  const mapping = {};
  for (let i = 0; i < columnData.length; i++) {
    // @ts-ignore
    mapping[columnData[i].version] = i;
  }
  // @ts-ignore
  lineData.sort((x, y) => mapping[x.version] - mapping[y.version]);

  const config = {
    data: [columnData, lineData],
    xField: 'version',
    yField: ['value', 'value'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
        // colors: ['#6294F9','#62D9AA','#647697','#F6C021', '#7565F9', '#74CAEC','#9966BC', '#FE9C4E', '#299998', '#FE9DC5']
        color: ['#CC0029', '#368800'],
      },
      {
        geometry: 'line',
        seriesField: 'type',
        color: ['#CC0029', '#368800'],
        lineStyle: ({ name }: { name: string }) => {
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

export default Chart3;

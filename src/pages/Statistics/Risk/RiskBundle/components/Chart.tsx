import { G2, Mix } from '@ant-design/plots';
import * as _ from 'lodash';
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
  let columnData: { version: string; value: number; type: string }[] = [];
  let columnData2: { version: string; value: number; type: string }[] = [];
  let lineData: { time: string; value: number; version: string }[] = [];
  let pieData: { version: string; value: number }[] = [];
  if (props.dpd === 'dpd1') {
    if (props.period === '1') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '2') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '3') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '4') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '5') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });

          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '6') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '100') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    }
  } else {
    if (props.period === '1') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '2') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '3') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '4') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '5') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '6') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    } else if (props.period === '100') {
      _.chain(props.rawData)
        .groupBy('e_version')
        .map((item) => {
          pieData.push({
            version: item[0]!.e_version!.toString(),
            value: Number(_.sumBy(item, 'f_count').toFixed(1)),
          });
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
          columnData2.push({
            version: item[0]!.e_version!.toString(),
            value: Number(
              ((_.sumBy(item, 'g_accept_count') * 100) / _.sumBy(item, 'f_count')).toFixed(1),
            ),
            type: 'accept',
          });
          return item;
        })
        .value();
      props.rawData.map((item) => {
        lineData.push({
          time: moment(item.a_risk_date).format('MM/DD'),
          value: Number(((item!.g_accept_count! * 100) / item!.f_count!).toFixed(0)),
          version: item.e_version!.toString(),
        });
        return item;
      });
    }
  }
  pieData = _.chain(pieData).orderBy(['version'], 'asc').value();
  lineData = _.chain(lineData).orderBy(['version', 'time'], 'asc').value();
  columnData.sort((x, y) => x.value - y.value);
  columnData = [...columnData, ...columnData2];
  G2.registerInteraction('custom-association-filter', {
    showEnable: [
      {
        trigger: 'element:mouseenter',
        action: 'cursor:pointer',
      },
      {
        trigger: 'element:mouseleave',
        action: 'cursor:default',
      },
    ],
    start: [
      {
        trigger: 'element:click',
        action: (context) => {
          const { view, event } = context; // 获取第二个 view
          const view2 = view.parent.views[2];
          view2.filter('version', (d) => d === event.data?.data.version);
          view2.render(true);
          const view1 = view.parent.views[0];
          view1.filter('version', (d) => d === event.data?.data.version);
          view1.render(true);
        },
      },
    ],
    end: [
      {
        trigger: 'element:dblclick',
        action: (context) => {
          const { view } = context; // 获取第二个 view

          const view2 = view.parent.views[2];
          view2.filter('version', null);
          view2.render(true);
          const view1 = view.parent.views[0];
          view1.filter('version', null);
          view1.render(true);
        },
      },
    ],
  });

  const config = {
    // 关闭 chart 上的 tooltip，子 view 开启 tooltip
    tooltip: false,
    plots: [
      {
        type: 'column',
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 0.45,
            y: 0.45,
          },
        },
        options: {
          data: columnData,
          xField: 'version',
          yField: 'value',
          seriesField: 'type',
          isGroup: true,
          isStack: true,
          color: ['#CC0029', '#368800'],
          tooltip: {
            shared: true,
            showCrosshairs: false,
            showMarkers: false,
          },
          label: {},
          interactions: [
            {
              type: 'active-region',
            },
          ],
        },
      },
      {
        type: 'pie',
        region: {
          start: {
            x: 0.5,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.45,
          },
        },
        options: {
          data: pieData,
          angleField: 'value',
          colorField: 'version',
          tooltip: {
            showMarkers: false,
          },
          radius: 0.85,
          label: {
            type: 'outer',
            content: '{name} {percentage}',
          },

          interactions: [
            {
              type: 'element-active',
            },
            {
              type: 'custom-association-filter',
            },
            // 后续开放
            // {
            //   type: 'association-tooltip',
            //   cfg: {
            //     start: [
            //       {
            //         trigger: 'element:mousemove',
            //         action: 'association:showTooltip',
            //         arg: {
            //           dim: 'x',
            //           linkField: 'area',
            //         },
            //       },
            //     ],
            //   },
            // },
            // {
            //   type: 'association-highlight',
            //   cfg: {
            //     start: [
            //       {
            //         trigger: 'element:mousemove',
            //         action: 'association:highlight',
            //         arg: {
            //           linkField: 'area',
            //         },
            //       },
            //     ],
            //   },
            // },
          ],
        },
      },
      {
        type: 'line',
        region: {
          start: {
            x: 0,
            y: 0.5,
          },
          end: {
            x: 1,
            y: 0.95,
          },
        },
        options: {
          data: lineData,
          xField: 'time',
          yField: 'value',
          seriesField: 'version',
          line: {},
          point: {
            style: {
              r: 2.5,
            },
          },
          meta: {
            time: {
              range: [0, 1],
            },
          },
          smooth: true,
          tooltip: {
            showCrosshairs: true,
            shared: true,
          },
        },
      },
    ],
  };

  // @ts-ignore
  return <Mix {...config} />;
};

export default Chart;

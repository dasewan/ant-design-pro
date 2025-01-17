import { PERIOD_FLAG } from '@/pages/Statistics/enums';
import { G2, Mix } from '@ant-design/plots';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
  collectionAdmins: RequestOptionsType[];
  dimension: string;
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  let columnData: { name: string; value: number; type: string }[] = [];
  let columnData2: { name: string; value: number; type: string }[] = [];
  let pieData: { name: string; value: number }[] = [];
  let lineData: { name: string; value: number; time: string }[] = [];
  props.rawData.map((item) => {
    let adminName = props.collectionAdmins!.find(
      (item2) => item2.value === item.b_collection_admin_id,
    )!.label as string;
    lineData.push({
      time: moment(item.a_date).format('MM/DD'),
      value: item[props.dimension],
      name: adminName,
    });
    return item;
  });
  let periodFlag = props.dimension[0];
  _.chain(props.rawData)
    .groupBy('b_collection_admin_id')
    .map((item) => {
      let adminName = props.collectionAdmins!.find(
        (item2) => item2.value === item[0].b_collection_admin_id,
      )!.label as string;
      pieData.push({
        name: adminName,
        value: Number(_.sumBy(item, props.dimension).toFixed(1)),
      });

      columnData2.push({
        name: adminName,
        value: Number(
          (
            (_.sumBy(item, periodFlag + '_c_no_track_count') * 100) /
            _.sumBy(item, periodFlag + '_a_collection_total_count')
          ).toFixed(1),
        ),
        type: PERIOD_FLAG[periodFlag] + '未跟踪率',
      });
      columnData2.push({
        name: adminName,
        value: Number(
          (
            ((_.sumBy(item, periodFlag + '_d_log_new_count') +
              _.sumBy(item, periodFlag + '_e_sms_new_count') +
              _.sumBy(item, periodFlag + '_f_call_new_count')) *
              100) /
            _.sumBy(item, periodFlag + '_a_collection_total_count')
          ).toFixed(1),
        ),
        type: PERIOD_FLAG[periodFlag] + '跟踪系数',
      });
      columnData2.push({
        name: adminName,
        value: Number(
          (
            ((_.sumBy(item, periodFlag + '_g_settled_count') +
              _.sumBy(item, periodFlag + '_i_part_count') +
              _.sumBy(item, periodFlag + '_k_extend_count')) *
              100) /
            _.sumBy(item, periodFlag + '_a_collection_total_count')
          ).toFixed(1),
        ),
        type: PERIOD_FLAG[periodFlag] + '催回率',
      });
      columnData.push({
        name: adminName,
        value: Number(
          (
            ((_.sumBy(item, periodFlag + '_h_settled_amount') +
              _.sumBy(item, periodFlag + '_j_part_amount') +
              _.sumBy(item, periodFlag + '_l_extend_amount')) *
              100) /
            _.sumBy(item, periodFlag + '_b_collection_total_amount')
          ).toFixed(1),
        ),
        type: PERIOD_FLAG[periodFlag] + '催回率(金额)',
      });
      return item;
    })
    .value();
  pieData = _.chain(pieData).orderBy(['name'], 'asc').value();
  lineData = _.chain(lineData).orderBy(['name', 'time'], 'asc').value();
  columnData.sort((x, y) => x.value - y.value);
  columnData = [...columnData, ...columnData2];
  /*G2.registerInteraction('custom-association-filter', {
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
          view2.filter('name', (d) => d === event.data?.data.name);
          view2.render(true);
          const view1 = view.parent.views[0];
          view1.filter('name', (d) => d === event.data?.data.name);
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
          view2.filter('name', null);
          view2.render(true);
          const view1 = view.parent.views[0];
          view1.filter('name', null);
          view1.render(true);
        },
      },
    ],
  });*/

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
          xField: 'name',
          yField: 'value',
          seriesField: 'type',
          isGroup: true,
          isStack: true,
          color: ['#368800', '#CC0029', '#BBA344', '#6395FA'],
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
          colorField: 'name',
          tooltip: {
            showMarkers: false,
          },
          radius: 0.85,
          label: {
            type: 'outer',
            content: '{name} {percentage}',
          },

          interactions: [
/*            {
              type: 'element-active',
            },
            {
              type: 'custom-association-filter',
            },*/
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
          seriesField: 'name',
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

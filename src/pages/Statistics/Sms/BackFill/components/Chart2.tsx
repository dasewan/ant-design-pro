import {G2, Mix} from '@ant-design/plots';
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import type {TableListItem} from '../data';
import {FieldLabels} from "@/pages/Statistics/Sms/BackFill/service";

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
  field: string;
};

/**
 *
 * @param props
 * @constructor
 */
const Chart2: React.FC<FormProps> = (props) => {
  if (props.rawData.length === 0 || props.field === undefined) {
    return <></>
  }
  console.log(props);

  let pieData: { name: string; value: number }[] = [];
  let lineData: { name: string; value: number; time: string }[] = [];
  //送达率
  let columnData: { name: string; value: number; type: string }[] = [];
  //成功率
  let columnData2: { name: string; value: number; type: string }[] = [];
  //回填率
  let columnData3: { name: string; value: number; type: string }[] = [];
  //单条费用
  let columnData4: { name: string; value: number; type: string }[] = [];
  //单人费用
  let columnData5: { name: string; value: number; type: string }[] = [];
  props.rawData.map((item) => {
    lineData.push({
      time: moment(item.a_date).format('MM/DD'),
      value: item[props.field],
      name: item.b_name,
    });
    return item;
  });
  _.chain(props.rawData)
    .groupBy('b_name').map((items) => {
    pieData.push({
      name: items[0].b_name,
      value: Number((_.sumBy(items, 'c_sented_count')).toFixed(1)),
    });
    columnData.push({
      name: items[0].b_name,
      value: Number((_.meanBy(items, 'e_delivered_rate')).toFixed(1)),
      type: FieldLabels.e_delivered_rate
    });
    columnData2.push({
      name: items[0].b_name,
      value: Number((_.meanBy(items, 'h_success_person_rate')).toFixed(1)),
      type: FieldLabels.h_success_person_rate
    });
    columnData3.push({
      name: items[0].b_name,
      value: Number((_.meanBy(items, 'l_backfill_rate')).toFixed(1)),
      type: FieldLabels.l_backfill_rate
    });
    columnData4.push({
      name: items[0].b_name,
      value: Number((_.meanBy(items, 'j_unit_amount')).toFixed(1)),
      type: FieldLabels.j_unit_amount
    });
    columnData5.push({
      name: items[0].b_name,
      value: Number((_.meanBy(items, 'k_unit_person_amount')).toFixed(1)),
      type: FieldLabels.k_unit_person_amount
    });
    return items
  }).value()

  pieData = _.chain(pieData).orderBy(['name'], 'asc').value();
  lineData = _.chain(lineData).orderBy(['name', 'time'], 'asc').value();
  columnData.sort((x, y) => x.value - y.value);
  columnData = [...columnData, ...columnData2, ...columnData3];
  columnData4.sort((x, y) => x.value - y.value);
  columnData4 = [...columnData4, ...columnData5];
  console.log(pieData)
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
          const {view, event} = context; // 获取第二个 view
          const view2 = view.parent.views[3];
          view2.filter('name', (d) => d === event.data?.data.name);
          view2.render(true);
        },
      },
    ],
    end: [
      {
        trigger: 'element:dblclick',
        action: (context) => {
          const {view} = context; // 获取第二个 view
          const view2 = view.parent.views[3];
          view2.filter('name', null);
          view2.render(true);

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
            x: 0.33,
            y: 0.33,
          },
        },
        options: {
          data: columnData,
          xField: 'name',
          yField: 'value',
          seriesField: 'type',
          isGroup: true,
          isStack: true,
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
        type: 'column',
        region: {
          start: {
            x: 0.33,
            y: 0,
          },
          end: {
            x: 0.66,
            y: 0.33,
          },
        },
        options: {
          data: columnData4,
          xField: 'name',
          yField: 'value',
          seriesField: 'type',
          isGroup: true,
          isStack: true,
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
            x: 0.66,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.33,
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
            {
              type: 'element-active',
            },
            {
              type: 'custom-association-filter',
            },
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

export default Chart2;

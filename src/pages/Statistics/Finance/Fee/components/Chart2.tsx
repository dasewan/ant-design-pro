import {G2, Mix} from '@ant-design/plots';
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import type {TableListItem} from '../data';

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
  props.rawData.map((item) => {
    lineData.push({
      time: moment(item.a_date).format('MM/DD'),
      value: item[props.field],
      name: item.d_name,
    });
    return item;
  });
  _.chain(props.rawData)
    .groupBy('d_name').map((items) => {
    pieData.push({
      name: items[0].d_name,
      value: Number((_.sumBy(items, props.field)).toFixed(1)),
    });
    return items
  }).value()

  pieData = _.chain(pieData).orderBy(['name'], 'asc').value();
  lineData = _.chain(lineData).orderBy(['name', 'time'], 'asc').value();
  console.log(pieData)
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
          const {view, event} = context; // 获取第二个 view
          const view2 = view.parent.views[1];
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
          const view2 = view.parent.views[1];
          view2.filter('name', null);
          view2.render(true);

        },
      },
    ],
  });*/

  const config = {
    // 关闭 chart 上的 tooltip，子 view 开启 tooltip
    tooltip: false,
    plots: [
      {
        type: 'pie',
        region: {
          start: {
            x: 0,
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

/*          interactions: [
            {
              type: 'element-active',
            },
            {
              type: 'custom-association-filter',
            },
          ],*/
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

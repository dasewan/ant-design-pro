import { FieldLabels } from '@/pages/Statistics/Register/DailyReport/service';
import { Column, Line } from '@ant-design/plots';
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
  chartType: string;
  dimension: string[];
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  console.log(props);
  let data: { time: string | number | undefined; value: number; type: string }[] = [];
  let data2: { value: number; type: string }[] = [];
  if (props.chartType === 'line') {
    props.dimension!.map((item: string) => {
      // @ts-ignore
      let typeString = FieldLabels[item];

      props.rawData.map((item2: TableListItem) => {
        data.unshift({
          time: moment(item2.a_date).format('MM/DD'),
          // @ts-ignore
          value: item2[item],
          type: typeString,
        });
        return item2;
      });
      return item;
    });
    console.log(data);
    const config = {
      data,
      xField: 'time',
      yField: 'value',
      seriesField: 'type',
      point: {
        size: 4,
        style: {
          lineWidth: 1,
          fillOpacity: 1,
        },
      },
      annotations:
        props.dimension.length === 1
          ? [
              {
                type: 'line',
                start: ['min', 'mean'],
                end: ['max', 'mean'],
                style: {
                  stroke: '#F4664A',
                  lineDash: [2, 2],
                },
              },
            ]
          : [],
      xAxis: {
        tickCount: 5,
      },
      slider: {
        start: 0.5,
        end: 1,
      },
    };
    // @ts-ignore
    return <Line {...config} />;
  } else if (props.chartType === 'column') {
    props.dimension!.map((item: string) => {
      // @ts-ignore
      data2.unshift({
        value: _.sumBy(props.rawData, item),
        // @ts-ignore
        type: FieldLabels[item],
      });
      return item;
    });
    console.log(data2);
    const config = {
      data: data2,
      xField: 'type',
      yField: 'value',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle',
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
    };
    // @ts-ignore
    return <Column {...config} />;
  }

  // @ts-ignore
  return <></>;
};

export default Chart;

import { DualAxes } from '@ant-design/plots';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
  type: string;
  channels: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  let registerData: {
    time: string | number | undefined;
    value: number | undefined;
    value2: number | undefined;
    type: string;
  }[] = [];
  let unRegisterData: {
    time: string | number | undefined;
    value: number;
    value2: number;
    type: string;
  }[] = [];
  let lineData: { time: string | number | undefined; value: number; type: string }[] = [];
  props.rawData.map((item: TableListItem) => {
    if (props.type === 'time') {
      registerData.unshift({
        time: moment(item.a_first_date).format('MM/DD'),
        value: item.j_register_count,
        value2: item.j_register_count,
        type: 'registered',
      });
      unRegisterData.unshift({
        time: moment(item.a_first_date).format('MM/DD'),
        value: item.i_valid_count! - item.j_register_count!,
        value2: item.i_valid_count! - item.j_register_count!,
        type: 'unRegistered',
      });
      lineData.unshift({
        time: moment(item.a_first_date).format('MM/DD'),
        value: item.a_e_overdue_rate!,
        type: 'overdue',
      });
      lineData.unshift({
        time: moment(item.a_first_date).format('MM/DD'),
        value: item.a_b_refuse_rate!,
        type: 'refuse',
      });
    } else {
      // @ts-ignore
      let channel = props.channels.find((item2) => item2.value === item.b_channel_id)
        .label as string;
      registerData.unshift({
        time: channel,
        value: item.j_register_count,
        value2: item.j_register_count,
        type: 'registered',
      });
      unRegisterData.unshift({
        time: channel,
        value: item.i_valid_count! - item.j_register_count!,
        value2: item.i_valid_count! - item.j_register_count!,
        type: 'unRegistered',
      });
      lineData.unshift({ time: channel, value: item.a_e_overdue_rate!, type: 'overdue' });
      lineData.unshift({ time: channel, value: item.a_b_refuse_rate!, type: 'refuse' });
    }
    return item;
  });
  const uvBillData = [...unRegisterData, ...registerData];

  const config = {
    data: [uvBillData, lineData],
    width: 900,
    xField: 'time',
    yField: ['value', 'value'],
    geometryOptions: [
      {
        geometry: 'column',
        isStack: true,
        isPercent: true,
        seriesField: 'type',
        color: ({ type }: { type: string }) => {
          if (type === 'unRegistered') {
            return 'grey';
          }
        },
        label: {
          position: 'middle',
          content: (item: any) => {
            return `${(item.value * 100).toFixed(0)}%`;
          },
          style: {
            fill: '#fff',
          },
        },
        tooltip: {
          formatter: (item: any) => {
            return {
              name: `${item.type}`,
              value: `${(item.value * 100).toFixed(0)}%`,
            };
          },
        },
      },
      {
        geometry: 'line',
        isStack: false,
        isPercent: true,
        seriesField: 'type',
        color: ({ type }: { type: string }) => {
          if (type === 'refuse') {
            return 'yellow';
          }
          if (type === 'overdue') {
            return 'red';
          }
        },
        tooltip: {
          formatter: (item: any) => {
            return {
              name: `${item.type} `,
              value: `${item.value.toFixed(0)}%`,
            };
          },
        },
        annotations: [
          {
            type: 'line',
            start: ['min', 'mean'],
            end: ['max', 'mean'],
            style: {
              stroke: '#F4664A',
              lineDash: [2, 2],
            },
          },
        ],
      },
    ],
  };
  // @ts-ignore
  return <DualAxes {...config} />;
};

export default Chart;

import {Line} from '@ant-design/plots';
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import type {TableListItem} from '../data';
import {FieldLabels} from "@/pages/Statistics/Collection/Report/service";

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
  fields: string[] | string;
  periods: string[] | string;
};

/**
 *
 * @param props
 * @constructor
 */
const Chart2: React.FC<FormProps> = (props) => {
  console.log(props)
  let lineData: { name: string; value: number; time: string }[] = [];
  if (Array.isArray(props.fields)) { //单期多字段
    props.rawData.map((item) => {
      if (props.periods === '100') {
        (props.fields as string[]).map((field) => {
          lineData.push({
            time: moment(item.a_date).format('MM/DD'),
            value: item[field],
            name: FieldLabels[field],
          });
          return field
        })
      } else {
        _.chain(item.children).filter((f) => f.b_period_index!.toString() === props.periods).map((item2) => {
          (props.fields as string[]).map((field) => {
            lineData.push({
              time: moment(item2.a_date).format('MM/DD'),
              value: item2[field],
              name: FieldLabels[field],
            });
            return field;
          })
          return item2;
        }).value()
      }
      return item
    })
  } else if (Array.isArray(props.periods)) { //单字段多期
    props.rawData.map((item) => {
      (props.periods as string[]).map((period) => {
        if (period === '100') {
          lineData.push({
            time: moment(item.a_date).format('MM/DD'),
            value: item[props.fields],
            name: 'all',
          });
        } else {
          _.chain(item.children).filter((f) => f.b_period_index!.toString() === period).map((item2) => {
            lineData.push({
              time: moment(item2.a_date).format('MM/DD'),
              value: item2[props.fields],
              name: period,
            });
            return item2;
          }).value()
        }
        return period;
      })
      return item
    })


  }
  console.log(lineData)
  const config = {
    data: lineData,
    xField: 'time',
    yField: 'value',
    seriesField: 'name',
    xAxis: {
      type: 'time',
    },

  };

  return <Line {...config} />;
};

export default Chart2;

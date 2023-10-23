import {
  OVERDUE_AMOUNT,
  OVERDUE_AMOUNT_RATE,
  OVERDUE_COUNT,
  OVERDUE_COUNT_RATE,
} from '@/pages/Statistics/enums';
import { Area, Line } from '@ant-design/plots';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import moment from 'moment';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[] | undefined;
  chartType: string;
  products: RequestOptionsType[];
  productIds: string[] | undefined;
  dnds: string[] | undefined;
  dimension: string;
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  console.log(props);
  let data: { time: string | number | undefined; value: number; type: string }[] = [];

  let tmp: { [propName: string]: string };
  if (props.dimension === 'rate') {
    tmp = OVERDUE_COUNT_RATE;
  } else if (props.dimension === 'count') {
    tmp = OVERDUE_COUNT;
  } else if (props.dimension === 'amount_rate') {
    tmp = OVERDUE_AMOUNT_RATE;
  } else if (props.dimension === 'amount') {
    tmp = OVERDUE_AMOUNT;
  }

  //多产品折线图
  if (props.rawData !== undefined && props.rawData?.length > 0 && props.chartType === 'line') {
    let dnd: string = props.dnds !== undefined ? props.dnds[0] : '0';
    props.rawData!.map((item: TableListItem) => {
      if (
        props.productIds !== undefined &&
        props.productIds.includes(item.b_product_id!.toString())
      ) {
        // @ts-ignore
        let product = props.products.find((item2) => item2.value === item.b_product_id.toString())
          .label as string;
        data.unshift({
          time: moment(item.a_expected_date).format('MM/DD'),
          // @ts-ignore
          value: item[tmp[dnd]],
          type: product,
        });
      }
      return item;
    });
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
    };
    // @ts-ignore
    return <Line {...config} />;
  } else if (
    props.rawData !== undefined &&
    props.rawData?.length > 0 &&
    props.chartType === 'area'
  ) {
    //单产品面积图
    props.rawData.reverse();
    props.rawData!.map((item: TableListItem) => {
      for (const [key, value] of Object.entries(tmp)) {
        data.push({
          time: moment(item.a_expected_date).format('MM/DD'),
          // @ts-ignore
          value: item[value],
          type: 'DND' + key,
        });
      }
      return item;
    });
    console.log(data);
    const config = {
      data,
      xField: 'time',
      yField: 'value',
      seriesField: 'type',
      // isPercent: true,
      isStack: false,
    };

    return <Area {...config} />;
  }
  return <>123</>;
};

export default Chart;

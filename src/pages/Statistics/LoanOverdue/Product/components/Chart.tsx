import {
  OVERDUE_AMOUNT,
  OVERDUE_AMOUNT_RATE,
  OVERDUE_COUNT,
  OVERDUE_COUNT_RATE,
} from '@/pages/Statistics/enums';
import { Area, DualAxes } from '@ant-design/plots';
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
  dnds: string | undefined;
  dimension: string;
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
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

  //分组柱状图
  if (props.rawData !== undefined && props.rawData?.length > 0 && props.chartType === 'column') {
    let dnd: string = props.dnds !== undefined ? props.dnds : '0';
    let products: string[] = [];

    const dataTotal = Object.values(
      props.rawData!.reduce((acc: { [key: string]: any }, curr: { [key: string]: any }) => {
        let product = props.products!.find(
          (item2) => item2.value === curr.b_product_id!.toString(),
        )!.label as string;
        const key = `${curr.b_product_id}-${curr.c_a_period_index}`;
        if (!products.includes(product)) {
          products.push(product);
        }
        if (!acc[key]) {
          acc[key] = {
            product: product,
            periodIndex: curr.c_a_period_index,
            value: curr[tmp[dnd]],
            count: 1,
          };
        } else {
          acc[key].value += curr[tmp[dnd]];
          acc[key].count++;
        }
        return acc;
      }, {}),
    );
    const data = dataTotal!.map((item3) => {
      item3.value = item3.value / item3.count;
      return item3;
    }, {});

    const data2Total = Object.values(
      data.reduce((acc, curr) => {
        const key = `${curr.periodIndex}`;
        if (!acc[key]) {
          acc[key] = {
            product: curr.product,
            periodIndex: 'avg' + curr.periodIndex.toString(),
            value2: curr.value,
            count: 1,
          };
        } else {
          acc[key].value2 += curr.value;
          acc[key].count++;
        }
        return acc;
      }, {}),
    );
    const data2Tmp = data2Total!.map((item3: any) => {
      item3.value2 = item3.value2 / item3.count;
      return item3;
    }, {});
    const data2: any[] = [];
    products.forEach((productOne) => {
      data2Tmp.forEach((data2TmpOne) => {
        data2.push({ ...data2TmpOne, ...{ product: productOne } });
      });
    });

    const config = {
      data: [data, data2],
      xField: 'product',
      yField: ['value', 'value2'],
      yAxis: {
        // 格式化左坐标轴
        value: {
          min: 0,
        },
        // 隐藏右坐标轴
        value2: {
          min: 0,
        },
      },
      geometryOptions: [
        {
          geometry: 'column',
          seriesField: 'periodIndex',
          isGroup: true,
          columnStyle: {
            radius: [20, 20, 0, 0],
          },
          columnWidthRatio: 0.4,
          /** 设置间距 */
          marginRatio: 0.1,
          color: ['#770000', '#EB7A7A', '#D8D839', '#3FAF3F', '#2B2BD5', '#75518C'],
        },
        {
          geometry: 'line',
          seriesField: 'periodIndex',
          isStack: false,
          lineStyle: {
            lineWidth: 3,
            lineDash: [5, 5],
          },
          color: ['#770000', '#EB7A7A', '#D8D839', '#3FAF3F', '#2B2BD5', '#75518C'],
        },
      ],
    };

    // @ts-ignore
    return <DualAxes {...config} />;
  } else if (
    props.rawData !== undefined &&
    props.rawData?.length > 0 &&
    props.chartType === 'area'
  ) {
    let dnd: string = props.dnds !== undefined ? props.dnds : '0';
    //单产品面积图
    props.rawData.reverse();
    props.rawData!.map((item: TableListItem) => {
      data.push({
        time: moment(item.a_loan_date).format('MM/DD'),
        // @ts-ignore
        value: item[tmp[dnd]],
        type: item.c_a_period_index!.toString(),
      });
      return item;
    });
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

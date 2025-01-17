import {Column, G2, Pie, Radar, Sunburst} from '@ant-design/plots';
import type {RequestOptionsType} from '@ant-design/pro-utils';
import React from 'react';
import {Col, Row, Typography} from "antd";
import type {TableListItem} from '../data';
import * as _ from 'lodash';

const {Title} = Typography;
export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[] | undefined;
  products: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  return <></>
  //todo 升级后无法使用G2
  const G = G2.getEngine('canvas');
  const _chain = _.chain(props.rawData).groupBy('b_product_id');
  //雷达图
  const radarTypes = ['利润率', '还款率'];
  const radarData: {
    product_id: string; type: string;
    rate: number;
  }[] = [];
  _chain
    .map((group) => {
      let productName = props.products!.find((itemProduct) => itemProduct.value === group[0].b_product_id!.toString())!
        .label as string;
      for (let i = 0; i < radarTypes.length; i++) {
        const radarType = radarTypes[i];
        const rTmp = {
          product_id: productName,
          type: radarType,
          rate: i === 0 ? Math.round(_.meanBy(group, 'm_profit_amount_rate')) : Math.round(_.meanBy(group, 'l_repay_amount_rate')), // 求第二期总和
        }
        radarData.push(rTmp);
      }
      return group;
    })
    .value();


  const radarConfig = {
    data: radarData,
    xField: 'product_id',
    yField: 'rate',
    seriesField: 'type',
    /*    meta: {
          score: {
            alias: '分数',
            min: 0,
            max: 80,
          },
        },*/
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {
      size: 2,
    },
  };
  //旭日图
  // const sunburstDataTmp = _chain.orderBy('f_settled_period_count', 'desc').value();
  const sunburstDataTmp = _chain.value();

  const fields = ['u_period1_repay_count', 'v_period2_repay_count', 'w_period3_repay_count', 'x_period4_repay_count', 'y_period5_repay_count', 'z_period6_repay_count'];
  const fieldNames: { w_period3_repay_count: string; z_period6_repay_count: string; u_period1_repay_count: string; v_period2_repay_count: string; y_period5_repay_count: string; x_period4_repay_count: string; [propName: string]: string } = {
    u_period1_repay_count: '1P',
    v_period2_repay_count: '2P',
    w_period3_repay_count: '3P',
    x_period4_repay_count: '4P',
    y_period5_repay_count: '5P',
    z_period6_repay_count: '6P'
  };

  let sunburstData: { label: string, sum: number, children: any[] } = {label: 'root', sum: 10000, children: []}
  for (const productId in sunburstDataTmp) {
    const products = sunburstDataTmp[productId];
    const productPeriod = products[0].a_b_period;
    const productTotalPeriodCount = _.sumBy(products, 'd_loan_period_count');
    let productName = props.products!.find((itemProduct) => itemProduct.value === products[0].b_product_id!.toString())!
      .label as string;
    let tmp2: { label: string, sum: number, children: any[] } = {
      label: productName,
      sum: productTotalPeriodCount,
      children: []
    }
    for (let i = 0; i < fields.length; i++) {
      if (i >= productPeriod!) {
        break;
      }

      const field = fields[i];
      const PNTotalCount = products.reduce((acc, product) => acc + (product.a_a_per_period_expected_count || 0), 0);
      // @ts-ignore
      const settledCount = products.reduce((acc, product) => acc + (product[field] || 0), 0);
      const unSettledCount = PNTotalCount - settledCount;
      const tmp = [{label: '结清', sum: settledCount}, {label: '未结清', sum: unSettledCount}]
      let tmp3 = {label: fieldNames[field], sum: PNTotalCount, children: tmp};
      tmp2.children.push(tmp3);
    }
    sunburstData.children.push(tmp2);
  }


  const sunburstConfig = {
    data: sunburstData,
    innerRadius: 0.2,
    radius: 1,
    interactions: [
      {
        type: 'element-active',
      },
    ],
    hierarchyConfig: {
      field: 'sum',
    },
    tooltip: {
      formatter: (datum: { label: any; sum: any; }) => ({
        name: datum.label,
        value: datum.sum,
      }),
    },
  };

//柱状图
// 按照producid分组
  const columnDataTmp = _chain.value();

// 计算每个产品每期的利润和

  const columnData = [];

  for (const productId in columnDataTmp) {
    const products = columnDataTmp[productId];
    const periodProfits = ['o_period1_profit', 'p_period2_profit', 'q_period3_profit', 'r_period4_profit', 's_period5_profit', 't_period6_profit'];
    let productName = props.products!.find((itemProduct) => itemProduct.value === productId.toString())!
      .label as string;
    for (let i = 0; i < periodProfits.length; i++) {
      const type = periodProfits[i];
      // @ts-ignore
      const value = products.reduce((acc, product) => acc + (product[type] || 0), 0);
      columnData.push({
        productId: productName,
        type: type,
        value: value
      });
    }
  }
//饼图
  const pieDataTmp = _chain
    .mapValues((group) => _.sumBy(group, 'n_profit'))
    .map((n_profit, b_product_id) => {
      let productName = props.products!.find((itemProduct) => itemProduct.value === b_product_id.toString())!
        .label as string;
      return ({type: productName, profit: n_profit})
    })
    // .orderBy('profit', 'desc')
    .value();
  const colorArray: string[] = [];
  const colors = ['#368800', '#58DD00', '#5C33FF', '#5B8FF9', '#17C7C7', '#33FFFF', '#6F5EF9', '#5D7092', '#6DC8EC', '#AAFFFF'];
  const colors2 = ['#C01D7F', '#CC0029', '#DD7155', '#DD7155', '#F93A60', '#E44E4E', '#B11B1B', '#671010', '#3B0909', '#0F0202'];
  let colorFlag1 = 0;
  let colorFlag2 = 0;
  pieDataTmp.forEach((product) => {
    if (product.profit > 0) {
      colorArray.push(colors[colorFlag1]);
      colorFlag1++;
    } else {
      colorArray.push(colors2[colorFlag2]);
      colorFlag2++;
    }
  });
  const pieData = pieDataTmp.map((item) => ({
    type: item.type,
    profit: Math.abs(item.profit),
  }));
  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    colorField: 'type',
    angleField: 'profit',
    color: colorArray,
    radius: 0.9,
    title: '123123',
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data: { type: any; profit: any; percent: number; }, mappingData: { color: any; }) => {
        const group = new G.Group({});
        group.addShape({
          type: 'circle',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 0,
            y: 25,
            text: `${data.profit} ${Math.round(data.percent * 100)}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const columnConfig = {
    data: columnData,
    xField: 'productId',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  return <><Row key={11}>
    <Col key={'pie'} span={12}>
      <Title level={4}>产品损益分布</Title>
      <Pie {...pieConfig} />
    </Col>
    <Col key={'column'} span={12}>
      <Title level={4}>分期损益分布</Title>
      <Column {...columnConfig} />
    </Col>
  </Row>
    <Row key={22}>
      <Col key={'radar'} span={12}>
        <Title level={4}>期数还款数分布</Title>
        <Sunburst {...sunburstConfig} />
      </Col>
      <Col key={'line'} span={12}>
        <Title level={4}>还款率-利润率</Title>
        <Radar {...radarConfig} />
      </Col>
    </Row></>;
};

export default Chart;

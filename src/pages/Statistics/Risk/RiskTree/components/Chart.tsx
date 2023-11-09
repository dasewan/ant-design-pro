import { Treemap } from '@ant-design/plots';
import { RequestOptionsType } from '@ant-design/pro-utils';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
  riskBundles: RequestOptionsType[];
  riskStrateies: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  for (let i = 0; i < props.rawData.children?.length; i++) {
    props.rawData.children[i].name = props.riskStrateies!.find(
      (item2) => item2.value === props.rawData.children[i].name,
    )?.label as string;
    for (let j = 0; j < props.rawData.children[i]?.children.length; j++) {
      for (let m = 0; m < props.rawData.children[i]?.children[j].children.length; m++) {
        props.rawData.children[i].children[j].children[m].name = props.riskBundles!.find(
          (item2) => item2.value === props.rawData.children[i].children[j].children[m].name,
        )?.label as string;
      }
    }
  }
  const config = {
    data: props.rawData,
    colorField: 'name',
    legend: {
      position: 'top-left',
    },
    rawFields: [],
    tooltip: {
      formatter: (v) => {
        const root = v.path[v.path.length - 1];
        return {
          name: v.name,
          value: `${v.value}(总占比${((v.value / root.value) * 100).toFixed(2)}%)`,
        };
      },
    },
    // use `drilldown: { enabled: true }` to
    // replace `interactions: [{ type: 'treemap-drill-down' }]`
    interactions: [
      {
        type: 'treemap-drill-down',
      },
    ],
    // drilldown: {
    //   enabled: true,
    //   breadCrumb: {
    //     rootText: '初始',
    //   },
    // },
    // 开启动画
    animation: {},
  };

  return <Treemap {...config} />;
};

export default Chart;

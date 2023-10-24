import { Column } from '@ant-design/plots';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[] | undefined;
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  const config = {
    data: props.rawData,
    xField: 'x',
    yField: 'y',
    isGroup: true,
    seriesField: 'series',
    groupField: 'group',
    isStack: true,
    // dodgePadding: 2,
    // intervalPadding: 20,
    columnWidthRatio: 0.9,
    /** 设置间距 */
    marginRatio: -0.4,
    label: {
      position: 'middle',
      content: (item: any) => {
        return `${item.group}
${item.y.toFixed(0)}`;
      },
      style: {
        fill: '#fff',
      },
    },
    interactions: [
      {
        type: 'element-highlight-by-color',
      },
      {
        type: 'element-link',
      },
    ],
  };

  // @ts-ignore
  return <Column {...config} />;
};

export default Chart;

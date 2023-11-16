import { Sankey } from '@ant-design/plots';
import * as _ from 'lodash';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  let data: { source: string; target: string; value: number }[] = [];
  _.chain(props.rawData)
    .groupBy('code')
    .map((items) => {
      data.push({
        source: items[0].source,
        target: items[0].target,
        value: _.sumBy(items, 'value'),
      });
      return items;
    })
    .value();
  const config = {
    data: data,
    sourceField: 'source',
    targetField: 'target',
    weightField: 'value',
    color: ['red', 'green', 'yellow'],
    edgeStyle: {
      fill: '#ccc',
      fillOpacity: 0.4,
    },
  };

  return <Sankey {...config} />;
};

export default Chart;

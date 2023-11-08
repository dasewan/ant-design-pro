import { DotMap } from '@ant-design/maps';
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
  console.log(props.rawData);
  const config = {
    map: {
      type: 'mapbox',
      style: 'dark',
      center: [6.27, 3.24],
      pitch: 0,
      zoom: 4,
    },
    source: {
      data: props.rawData,
      parser: {
        type: 'geojson',
      },
    },
    shape: 'dot',
    color: 'red',
    size: 0.5,
    style: {
      opacity: 1,
    },
    autoFit: true,
    tooltip: {
      items: ['lng', 'lat'],
    },
    zoom: {
      position: 'bottomright',
    },
  };

  return <DotMap {...config} />;
};

export default Chart;

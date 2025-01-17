import {Column, Pie, Radar, Sunburst} from '@ant-design/plots';
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

};

export default Chart;

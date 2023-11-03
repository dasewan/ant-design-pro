import { DualAxes } from '@ant-design/plots';
import React from 'react';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem;
  period: string;
  dpd: string;
};
const DescriptionField: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const Period1Field: string[] = [
  '_b_range1_expected_period1_count',
  '_c_range1_overdue_period1_count',
  '_d_range1_settled_period1_count',
];
const Period2Field: string[] = [
  '_e_range1_expected_period2_count',
  '_f_range1_overdue_period2_count',
  '_g_range1_settled_period2_count',
];
const Period3Field: string[] = [
  '_h_range1_expected_period3_count',
  '_i_range1_overdue_period3_count',
  '_j_range1_settled_period3_count',
];
const Period4Field: string[] = [
  '_k_range1_expected_period4_count',
  '_l_range1_overdue_period4_count',
  '_m_range1_settled_period4_count',
];
const Period5Field: string[] = [
  '_n_range1_expected_period5_count',
  '_o_range1_overdue_period5_count',
  '_p_range1_settled_period5_count',
];
const Period6Field: string[] = [
  '_q_range1_expected_period6_count',
  '_r_range1_overdue_period6_count',
  '_s_range1_settled_period6_count',
];
export type DescriptionType = {
  start: number;
  end: number;
  count: number;
  rate: number;
};
/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  let descriptions: DescriptionType[] = JSON.parse(props.rawData!.a_a_e_range_detail!);
  let columnData: { range: string; rate: number }[] = [];
  let periodNLineData: { range: string; rate: number; type: string }[] = [];
  console.log(props);

  descriptions.map((item, index) => {
    columnData.push({ range: item.end.toString(), rate: item.rate });
    if (props.period !== '') {
      if (props.period === '1') {
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND1',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period1Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period1Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period1Field[0]] -
                props.rawData![DescriptionField[index] + Period1Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period1Field[0]]
            ).toFixed(1),
          ),
        });
      } else if (props.period === '2') {
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND1',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period2Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period2Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period2Field[0]] -
                props.rawData![DescriptionField[index] + Period2Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period2Field[0]]
            ).toFixed(1),
          ),
        });
      } else if (props.period === '3') {
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND1',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period3Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period3Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period3Field[0]] -
                props.rawData![DescriptionField[index] + Period3Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period3Field[0]]
            ).toFixed(1),
          ),
        });
      } else if (props.period === '4') {
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND1',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period4Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period4Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period4Field[0]] -
                props.rawData![DescriptionField[index] + Period4Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period4Field[0]]
            ).toFixed(1),
          ),
        });
      } else if (props.period === '5') {
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND1',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period5Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period5Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period5Field[0]] -
                props.rawData![DescriptionField[index] + Period5Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period5Field[0]]
            ).toFixed(1),
          ),
        });
      } else if (props.period === '6') {
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND1',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period6Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period6Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'DND',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period6Field[0]] -
                props.rawData![DescriptionField[index] + Period6Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period6Field[0]]
            ).toFixed(1),
          ),
        });
      }
    }
    if (props.dpd !== '') {
      if (props.dpd === 'dpd1') {
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period1',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period1Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period1Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period2',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period2Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period2Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period3',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period3Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period3Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period4',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period4Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period4Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period5',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period5Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period5Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period6',
          rate: Number(
            (
              (props.rawData![DescriptionField[index] + Period6Field[1]] * 100) /
              props.rawData![DescriptionField[index] + Period6Field[0]]
            ).toFixed(1),
          ),
        });
      } else if (props.dpd === 'dpd') {
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period1',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period1Field[0]] -
                props.rawData![DescriptionField[index] + Period1Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period1Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period2',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period2Field[0]] -
                props.rawData![DescriptionField[index] + Period2Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period2Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period3',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period3Field[0]] -
                props.rawData![DescriptionField[index] + Period3Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period3Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period4',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period4Field[0]] -
                props.rawData![DescriptionField[index] + Period4Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period4Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period5',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period5Field[0]] -
                props.rawData![DescriptionField[index] + Period5Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period5Field[0]]
            ).toFixed(1),
          ),
        });
        periodNLineData.push({
          range: item.end.toString(),
          type: 'Period6',
          rate: Number(
            (
              ((props.rawData![DescriptionField[index] + Period6Field[0]] -
                props.rawData![DescriptionField[index] + Period6Field[2]]) *
                100) /
              props.rawData![DescriptionField[index] + Period6Field[0]]
            ).toFixed(1),
          ),
        });
      }
    }
    return item;
  });

  const config = {
    data: [columnData, periodNLineData],
    xField: 'range',
    yField: ['rate', 'rate'],
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
        // seriesField: 'periodIndex',
        // isGroup: true,
        columnStyle: {
          radius: [20, 20, 0, 0],
        },
        columnWidthRatio: 0.4,
        /** 设置间距 */
        marginRatio: 0.1,
        // color: ['#770000', '#EB7A7A', '#D8D839', '#3FAF3F', '#2B2BD5', '#75518C'],
      },
      {
        geometry: 'line',
        seriesField: 'type',
        isStack: false,
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
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
        // color: ['#770000', '#EB7A7A', '#D8D839', '#3FAF3F', '#2B2BD5', '#75518C'],
      },
    ],
  };

  // @ts-ignore
  return <DualAxes {...config} />;
};

export default Chart;

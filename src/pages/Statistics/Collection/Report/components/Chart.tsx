import {G2, Mix} from '@ant-design/plots';
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import type {TableListItem} from '../data';
import {FieldLabels, StaticsAmount, StaticsCount} from "@/pages/Statistics/Collection/Report/service";

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
  chartType: string;
};

/**
 *
 * @param props
 * @constructor
 */
const Chart: React.FC<FormProps> = (props) => {
  let pieData: { name: string; value: number }[] = [];
  let pie2Data: { name: string; value: number }[] = [];
  let pie3Data: { name: string; value: number }[] = [];
  let lineData: { name: string; value: number; time: string }[] = [];
  let columnData: { name: string; value: number; type: string }[] = [];
  let pie1DataTmp: any = {};
  let pie2DataTmp: any = {};
  let pie3DataTmp: any = {};
  let columnDataTmp: any = {};
  let StaticCountOrAmount: string[] = [];
  if (props.chartType === 'count') {
    StaticCountOrAmount = StaticsCount;
  } else {
    StaticCountOrAmount = StaticsAmount;
  }
  props.rawData.map((item) => {
    StaticCountOrAmount.map((field) => {
      lineData.push({
        time: moment(item.a_date).format('MM/DD'),
        value: item[field],
        name: FieldLabels[field],
      });

      if (!pie2DataTmp[field]) {
        pie2DataTmp[field] = {
          name: FieldLabels[field],
          value: item[field],
        };
      } else {
        pie2DataTmp[field].value += item[field];
      }
      return field;
    })


    if (props.chartType === 'count') {
      //催回总数
      if (!pie1DataTmp['collection_success_count']) {
        pie1DataTmp['collection_success_count'] = {
          name: FieldLabels.collection_success_count,
          value: item.collection_success_count,
        };
      } else {
        pie1DataTmp['collection_success_count'].value += item.collection_success_count;
      }
      //未催回总数
      if (!pie1DataTmp['collection_fail_count']) {
        pie1DataTmp['collection_fail_count'] = {
          name: FieldLabels.collection_fail_count,
          value: item.d_count! - item.collection_success_count!,
        };
      } else {
        pie1DataTmp['collection_fail_count'].value += (item.d_count! - item.collection_success_count!);
      }

      //结清总数
      if (!pie3DataTmp['settled_count']) {
        pie3DataTmp['settled_count'] = {
          name: FieldLabels.settled_count,
          value: item.settled_count!,
        };
      } else {
        pie3DataTmp['settled_count'].value += item.settled_count!;
      }

      //部分还款总数
      if (!pie3DataTmp['part_count']) {
        pie3DataTmp['part_count'] = {
          name: FieldLabels.part_count,
          value: item.part_count!,
        };
      } else {
        pie3DataTmp['part_count'].value += item.part_count!;
      }

      //展期总数
      if (!pie3DataTmp['extend_count']) {
        pie3DataTmp['extend_count'] = {
          name: FieldLabels.extend_count,
          value: item.extend_count!,
        };
      } else {
        pie3DataTmp['extend_count'].value += item.extend_count!;
      }
      item.children!.map((child) => {
        StaticsCount.map((field5) => {
          let childKey = field5 + child.b_period_index
          if (!columnDataTmp[childKey]) {
            columnDataTmp[childKey] = {
              name: FieldLabels[field5],
              value: child[field5],
              type: child.b_period_index
            };
          } else {
            columnDataTmp[childKey].value += child[field5];
          }
          return field5;
        })
        return child;
      })
    } else {
      //催回总额
      if (!pie1DataTmp['collection_success_amount']) {
        pie1DataTmp['collection_success_amount'] = {
          name: FieldLabels.collection_success_amount,
          value: item.collection_success_amount,
        };
      } else {
        pie1DataTmp['collection_success_amount'].value += item.collection_success_amount;
      }
      //未催回总额
      if (!pie1DataTmp['collection_fail_amount']) {
        pie1DataTmp['collection_fail_amount'] = {
          name: FieldLabels.collection_fail_amount,
          value: item.e_amount! - item.collection_success_amount!,
        };
      } else {
        pie1DataTmp['collection_fail_amount'].value += (item.e_amount! - item.collection_success_amount!);
      }

      //结清总额
      if (!pie3DataTmp['settled_amount']) {
        pie3DataTmp['settled_amount'] = {
          name: FieldLabels.settled_amount,
          value: item.settled_amount!,
        };
      } else {
        pie3DataTmp['settled_amount'].value += item.settled_amount!;
      }

      //部分还款总额
      if (!pie3DataTmp['part_amount']) {
        pie3DataTmp['part_amount'] = {
          name: FieldLabels.part_amount,
          value: item.part_amount!,
        };
      } else {
        pie3DataTmp['part_amount'].value += item.part_amount!;
      }

      //展期总额
      if (!pie3DataTmp['extend_amount']) {
        pie3DataTmp['extend_amount'] = {
          name: FieldLabels.extend_amount,
          value: item.extend_amount!,
        };
      } else {
        pie3DataTmp['extend_amount'].value += item.extend_amount!;
      }

      item.children?.map((child) => {
        StaticsAmount.map((field5) => {
          let childKey = field5 + child.b_period_index
          if (!columnDataTmp[childKey]) {
            columnDataTmp[childKey] = {
              name: FieldLabels[field5],
              value: child[field5],
              type: child.b_period_index
            };
          } else {
            columnDataTmp[childKey].value += child[field5];
          }
          return field5;
        })
        return child;
      })
    }

    return item;
  });
  pieData = Object.values(pie1DataTmp);
  pie2Data = Object.values(pie2DataTmp);
  pie3Data = Object.values(pie3DataTmp);
  columnData = Object.values(columnDataTmp);
  console.log(columnData)


  pie2Data = _.chain(pie2Data).orderBy(['name'], 'asc').value();
  lineData = _.chain(lineData).orderBy(['name', 'time'], 'asc').value();
  G2.registerInteraction('custom-association-filter', {
    showEnable: [
      {
        trigger: 'element:mouseenter',
        action: 'cursor:pointer',
      },
      {
        trigger: 'element:mouseleave',
        action: 'cursor:default',
      },
    ],
    start: [
      {
        trigger: 'element:click',
        action: (context) => {
          const {view, event} = context; // 获取第二个 view
          const view2 = view.parent.views[3];
          view2.filter('name', (d) => d === event.data?.data.name);
          view2.render(true);
          // const view1 = view.parent.views[0];
          // view1.filter('name', (d) => d === event.data?.data.name);
          // view1.render(true);
        },
      },
    ],
    end: [
      {
        trigger: 'element:dblclick',
        action: (context) => {
          const {view} = context; // 获取第二个 view

          const view2 = view.parent.views[3];
          view2.filter('name', null);
          view2.render(true);
          // const view1 = view.parent.views[0];
          // view1.filter('name', null);
          // view1.render(true);
        },
      },
    ],
  });

  const config = {
    // 关闭 chart 上的 tooltip，子 view 开启 tooltip
    tooltip: false,
    plots: [

      {
        type: 'pie',
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 0.2,
            y: 0.25,
          },
        },
        options: {
          data: pieData,
          angleField: 'value',
          colorField: 'name',
          tooltip: {
            showMarkers: true,
          },
          radius: 0.85,
          label: {
            type: 'outer',
            content: '{name} {percentage}',
          },

          interactions: [
            {
              type: 'element-active',
            },


          ],
        },
      },

      {
        type: 'pie',
        region: {
          start: {
            x: 0.2,
            y: 0,
          },
          end: {
            x: 0.4,
            y: 0.25,
          },
        },
        options: {
          data: pie3Data,
          angleField: 'value',
          colorField: 'name',
          tooltip: {
            showMarkers: true,
          },
          radius: 0.85,
          label: {
            type: 'outer',
            content: '{name} {percentage}',
          },

          interactions: [
            {
              type: 'element-active',
            },


          ],
        },
      },

      {
        type: 'pie',
        region: {
          start: {
            x: 0.4,
            y: 0,
          },
          end: {
            x: 0.6,
            y: 0.25,
          },
        },
        options: {
          data: pie2Data,
          angleField: 'value',
          colorField: 'name',
          tooltip: {
            showMarkers: false,
          },
          radius: 0.85,
          label: {
            type: 'outer',
            content: '{name} {percentage}',
          },

          interactions: [
            {
              type: 'element-active',
            },
            {
              type: 'custom-association-filter',
            },

          ],
        },
      },
      {
        type: 'column',
        region: {
          start: {
            x: 0.62,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.25,
          },
        },
        options: {
          data: columnData,
          xField: 'name',
          yField: 'value',
          seriesField: 'type',
          isGroup: true,
          tooltip: {
            showMarkers: true,
          },
          radius: 0.85,
          label: {
            type: 'outer',
            content: '{name} {percentage}',
          },

          interactions: [
            {
              type: 'element-active',
            },


          ],
        },
      },
      {
        type: 'line',
        region: {
          start: {
            x: 0,
            y: 0.5,
          },
          end: {
            x: 1,
            y: 0.95,
          },
        },
        options: {
          data: lineData,
          xField: 'time',
          yField: 'value',
          seriesField: 'name',
          line: {},
          point: {
            style: {
              r: 2.5,
            },
          },
          meta: {
            time: {
              range: [0, 1],
            },
          },
          smooth: true,
          tooltip: {
            showCrosshairs: true,
            shared: true,
          },
        },
      },
    ],
  };

  // @ts-ignore
  return <Mix {...config} />;
};

export default Chart;

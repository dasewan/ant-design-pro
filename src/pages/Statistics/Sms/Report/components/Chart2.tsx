import {G2, Mix} from '@ant-design/plots';
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import type {TableListItem} from '../data';
import {FieldLabels} from "@/pages/Statistics/Sms/Report/service";

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  rawData: TableListItem[];
  field: string;
};

/**
 *
 * @param props
 * @constructor
 */
const Chart2: React.FC<FormProps> = (props) => {
  if (props.rawData.length === 0 || props.field === undefined) {
    return <></>
  }
  console.log(props);

  let pieData: { name: string; value: number }[] = [];
  let lineData: { name: string; value: number; time: string }[] = [];
  //送达率
  let columnData: { name: string; value: number; type: string }[] = [];
  //按数量
  let columnData2: { name: string; value: number; type: string }[] = [];
  //按来源
  let pieData3: { name: string; value: number; }[] = [];
  //来目标
  let pieData4: { name: string; value: number; }[] = [];
  //按时间
  let pieData5: { name: string; value: number; }[] = [];
  //按花费
  props.rawData.map((item) => {
    lineData.push({
      time: moment(item.a_date).format('MM/DD'),
      value: item[props.field],
      name: item.b_name,
    });
    return item;
  });

  pieData3.push({
    name: FieldLabels.m_system_notify_count,
    value: Number((_.sumBy(props.rawData, 'm_system_notify_count')).toFixed(0)),
  });
  pieData3.push({
    name: FieldLabels.n_crontab_notify_count,
    value: Number((_.sumBy(props.rawData, 'n_crontab_notify_count')).toFixed(0)),
  });
  pieData3.push({
    name: FieldLabels.o_admin_sent_count,
    value: Number((_.sumBy(props.rawData, 'o_admin_sent_count')).toFixed(0)),
  });
  pieData4.push({
    name: FieldLabels.p_contact_count,
    value: Number((_.sumBy(props.rawData, 'p_contact_count')).toFixed(0)),
  });
  pieData4.push({
    name: FieldLabels.q_user_count,
    value: Number((_.sumBy(props.rawData, 'q_user_count')).toFixed(0)),
  });
  pieData5.push({
    name: FieldLabels.r_bdpd_count,
    value: Number((_.sumBy(props.rawData, 'r_bdpd_count')).toFixed(0)),
  });
  pieData5.push({
    name: FieldLabels.s_dpd0_count,
    value: Number((_.sumBy(props.rawData, 's_dpd0_count')).toFixed(0)),
  });
  pieData5.push({
    name: FieldLabels.t_dpd1_3_count,
    value: Number((_.sumBy(props.rawData, 't_dpd1_3_count')).toFixed(0)),
  });
  pieData5.push({
    name: FieldLabels.u_dpd4_7_count,
    value: Number((_.sumBy(props.rawData, 'u_dpd4_7_count')).toFixed(0)),
  });
  pieData5.push({
    name: FieldLabels.v_dpd8_15_count,
    value: Number((_.sumBy(props.rawData, 'v_dpd8_15_count')).toFixed(0)),
  });
  pieData5.push({
    name: FieldLabels.w_dpd16_count,
    value: Number((_.sumBy(props.rawData, 'w_dpd16_count')).toFixed(0)),
  });


  _.chain(props.rawData)
    .groupBy('b_name').map((items) => {
    pieData.push({
      name: items[0].b_name,
      value: Number((_.sumBy(items, 'f_total_amount')).toFixed(1)),
    });
    columnData.push({
      name: items[0].b_name,
      value: Number((_.meanBy(items, 'e_delivered_rate')).toFixed(1)),
      type: FieldLabels.e_delivered_rate
    });
    columnData.push({
      name: items[0].b_name,
      value: Number((_.meanBy(items, 'j_otp_success_rate')).toFixed(1)),
      type: FieldLabels.j_otp_success_rate
    });
    columnData.push({
      name: items[0].b_name,
      value: Number((_.meanBy(items, 'k_marketing_success_rate')).toFixed(1)),
      type: FieldLabels.k_marketing_success_rate
    });
    columnData.push({
      name: items[0].b_name,
      value: Number((_.meanBy(items, 'l_notify_success_rate')).toFixed(1)),
      type: FieldLabels.l_notify_success_rate
    });
    columnData2.push({
      name: items[0].b_name,
      value: Number((_.sumBy(items, 'g_otp_count')).toFixed(0)),
      type: FieldLabels.g_otp_count
    });
    columnData2.push({
      name: items[0].b_name,
      value: Number((_.sumBy(items, 'h_marketing_count')).toFixed(0)),
      type: FieldLabels.h_marketing_count
    });
    columnData2.push({
      name: items[0].b_name,
      value: Number((_.sumBy(items, 'i_notify_count')).toFixed(0)),
      type: FieldLabels.i_notify_count
    });
    return items
  }).value()

  pieData = _.chain(pieData).orderBy(['name'], 'asc').value();
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
          const view2 = view.parent.views[6];
          view2.filter('name', (d) => d === event.data?.data.name);
          view2.render(true);
        },
      },
    ],
    end: [
      {
        trigger: 'element:dblclick',
        action: (context) => {
          const {view} = context; // 获取第二个 view
          const view2 = view.parent.views[6];
          view2.filter('name', null);
          view2.render(true);

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
            x: 0.33,
            y: 0.33,
          },
        },
        options: {
          data: pieData4,
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
        type: 'pie',
        region: {
          start: {
            x: 0.33,
            y: 0,
          },
          end: {
            x: 0.66,
            y: 0.33,
          },
        },
        options: {
          data: pieData5,
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
        type: 'pie',
        region: {
          start: {
            x: 0.66,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.33,
          },
        },
        options: {
          data: pieData3,
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
            x: 0,
            y: 0.33,
          },
          end: {
            x: 0.33,
            y: 0.66,
          },
        },
        options: {
          data: columnData,
          xField: 'name',
          yField: 'value',
          seriesField: 'type',
          isGroup: true,
          isStack: true,
          tooltip: {
            shared: true,
            showCrosshairs: false,
            showMarkers: false,
          },
          label: {},
          interactions: [
            {
              type: 'active-region',
            },
          ],
        },
      },

      {
        type: 'column',
        region: {
          start: {
            x: 0.33,
            y: 0.33,
          },
          end: {
            x: 0.66,
            y: 0.66,
          },
        },
        options: {
          data: columnData2,
          xField: 'name',
          yField: 'value',
          seriesField: 'type',
          isStack: true,
          tooltip: {
            shared: true,
            showCrosshairs: false,
            showMarkers: false,
          },
          label: {},
          interactions: [
            {
              type: 'active-region',
            },
          ],
        },
      },
      {
        type: 'pie',
        region: {
          start: {
            x: 0.66,
            y: 0.33,
          },
          end: {
            x: 1,
            y: 0.66,
          },
        },
        options: {
          data: pieData,
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
        type: 'line',
        region: {
          start: {
            x: 0,
            y: 0.66,
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

export default Chart2;

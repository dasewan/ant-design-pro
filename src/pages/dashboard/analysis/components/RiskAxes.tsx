import { DualAxes } from '@ant-design/plots';
import { Card, Radio, Typography, Select } from 'antd';
import type { SelectProps } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import numeral from 'numeral';
import React from 'react';
import type { DataItem, Last30AdminDay, Last30Day } from '../data.d';
import { useIntl } from '@@/exports';
import useStyles from '../style.style';
const { Text } = Typography;
const options: SelectProps['options'] = [];
const RiskAxes = ({
  loading,
  last30Day,
}: {
  loading: boolean;
  last30Day: API.WSCollectionAdminHeatmap[];
}) => {
  const intl = useIntl();
  const { styles } = useStyles();

  // 重组 last30Day 数据
  const uvBillData = last30Day.flatMap(item => {
    const keys = ['i_log_count', 'g_call_count', 'k_sms_count', 's_wa_count', 't_contact_call_count', 'u_contact_sms_count', 'v_contact_wa_count'];
    return keys.map(key => ({
      time: item.a_date,
      value: parseInt((item as any)[key]!),
      type: intl.formatMessage({
        id: 'pages.WSCollectionAdminHeatmap.' + key,
        defaultMessage: '',
      })
    }));
  });


  const transformData = last30Day.map(item => ({
    time: item.a_date,
    count: +((parseInt(item.c_success_count)*100 / parseInt(item.b_init_count)).toFixed(1)),
    name: intl.formatMessage({
        id: 'pages.common.success_rate' ,
        defaultMessage: '',
      })
  }));
  const config = {
    xField: 'time',
    interaction: { tooltip: { sort: (d) => ['uv', 'bill', 'a', 'b', 'c'].indexOf(d.name) } },
    children: [
      {
        data: uvBillData,
        type: 'interval',
        yField: 'value',
        colorField: 'type',
        stack: true,
        style: { maxWidth: 80 },
        // scale: { y: { domainMax: 300 } },
        interaction: { elementHighlight: { background: true } },
      },
      {
        data: transformData,
        type: 'line',
        yField: 'count',
        colorField: 'name',
        axis: { y: { position: 'right' } },
        interaction: {
          tooltip: {
            crosshairs: false,
            marker: false,
          },
        },
      },
    ],
  };;
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title={intl.formatMessage({id:'pages.statistics.dashboard.last_7_action'})}
      style={{
        height: '100%',
      }}
    >
      <div>
        <DualAxes {...config} />
      </div>
    </Card>
  );
};
export default RiskAxes;

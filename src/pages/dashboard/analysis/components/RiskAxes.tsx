import { Column } from '@ant-design/plots';
import { Card, Radio, Typography, Select } from 'antd';
import type { SelectProps } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import numeral from 'numeral';
import React from 'react';
import type { DataItem, Last30AdminDay, Last30Day } from '../data.d';
import useStyles from '../style.style';
const { Text } = Typography;
const options: SelectProps['options'] = [];
const RiskAxes = ({
  loading,
  last30Day,
}: {
  loading: boolean;
  last30Day: Last30Day[];
})  => {
  const { styles } = useStyles();

  // 重组 last30Day 数据
  const restructuredData = last30Day.flatMap(item => {
    const keys = Object.keys(item).filter(key => key !== 'a_date');
    return keys.map(key => ({
      a_date: item.a_date,
      value: item[key as keyof Last30Day],
      type: key
    }));
  });

  const config = {
    data: restructuredData,
    xField: 'a_date',
    yField: 'value',
    colorField: 'type',
    group: true,
    style: {
      inset: 5,
    },
  };
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="通过-拒绝-复审"
      style={{
        height: '100%',
      }}
    >
      <div>
        <Column {...config} />
      </div>
    </Card>
  );
};
export default RiskAxes;

import { Line } from '@ant-design/plots';
import { Card, Radio, Typography, Select } from 'antd';
import type { SelectProps } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import numeral from 'numeral';
import React from 'react';
import type { DataItem, Last30AdminDay, Last30Day } from '../data.d';
import useStyles from '../style.style';
const { Text } = Typography;
const options: SelectProps['options'] = [];
const RegisterLine = ({
  dropdownGroup,
  loading,
  last30AdminDay,
  last30Day,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  last30AdminDay: Last30AdminDay[];
  last30Day: Last30Day[];
}) => {
  const { styles } = useStyles();
  // 合并 last30Day 到 last30AdminDay
  const mergedData = [
    ...last30AdminDay,
    ...last30Day.map(item => ({
      ...item,
      e_collection_admin_id: 0
    }))
  ];

  const config = {
    data: mergedData,
    xField: (d:Last30AdminDay) => d.a_date,
    yField: (d:Last30AdminDay) => parseInt(d.b_init_count ?? '0', 10),
    sizeField: (d:Last30AdminDay) => parseInt(d.b_init_count ?? '0', 10),
    shapeField: 'trail',
    legend: { size: false },
    height: 246,
    colorField: (d:Last30AdminDay) => d.e_collection_admin_id!.toString(),
  };
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="注册-认证"
      // styles={{body:{padding: '4px'}, header:{padding: '4px'}}}
      style={{
        height: '100%',
        // padding: '10px',
      }}
    >
      <div>
        <Line {...config} />
      </div>
    </Card>
  );
};
export default RegisterLine;

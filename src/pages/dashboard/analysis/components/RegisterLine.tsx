import { Line } from '@ant-design/plots';
import { Card, Radio, Typography, Select } from 'antd';
import type { SelectProps } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import numeral from 'numeral';
import React from 'react';
import type { DataItem, Last30AdminDay, Last30Day } from '../data.d';
import useStyles from '../style.style';
import { RequestOptionsType } from '@ant-design/pro-components';
import { useIntl } from '@@/exports';
const { Text } = Typography;
const options: SelectProps['options'] = [];
const RegisterLine = ({
  dropdownGroup,
  loading,
  last30AdminDay,
  last30Day,
  admins,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  last30AdminDay: Last30AdminDay[];
  last30Day: Last30Day[];
  admins: RequestOptionsType[];
}) => {
  const intl = useIntl();
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
    yField: (d: Last30AdminDay) => {
      const initCount = parseInt(d.b_init_count ?? '0', 10);
      const successCount = parseInt(d.c_success_count ?? '0', 10);
      return initCount === 0 ? 0 : Math.round((successCount / initCount) * 100);
    },
    sizeField: (d: Last30AdminDay) => {
      const initCount = parseInt(d.b_init_count ?? '0', 10);
      const successCount = parseInt(d.c_success_count ?? '0', 10);
      return initCount === 0 ? 0 : Math.round((successCount / initCount) * 100);
    },
    shapeField: 'trail',
    legend: { size: false },
    height: 246,
    colorField: (d:Last30AdminDay) => admins.find(a => a.value === d.e_collection_admin_id)?.label || `AVG`,
  };
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title={intl.formatMessage({id:'pages.statistics.dashboard.last_30_rate'})}
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

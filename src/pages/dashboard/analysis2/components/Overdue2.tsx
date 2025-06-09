import { BidirectionalBar } from '@ant-design/plots';
import { Card, DatePicker, Typography } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import numeral from 'numeral';
import React from 'react';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
const { Text } = Typography;
const { RangePicker } = DatePicker;
const Overdue2 = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: DataItem[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => {
  const { styles } = useStyles();
  const data = [
    {
      country: '9',
      '逾期率': 13.4,
      '贷款次数': 1200.3,
    },
    {
      country: '8',
      '逾期率': 14.4,
      '贷款次数': 600.3,
    },
    {
      country: '7',
      '逾期率': 18.4,
      '贷款次数': 800.3,
    },
    {
      country: '6',
      '逾期率': 34.4,
      '贷款次数': 1300.8,
    },
    {
      country: '5',
      '逾期率': 44.4,
      '贷款次数': 1900.5,
    },
    {
      country: '4',
      '逾期率': 24.4,
      '贷款次数': 1800.8,
    },
    {
      country: '3',
      '逾期率': 54.4,
      '贷款次数': 2400.7,
    },
    {
      country: '2',
      '逾期率': 104.4,
      '贷款次数': 500.3,
    },
    {
      country: '1',
      '逾期率': 165.2,
      '贷款次数': 72.9,
    },
  ];
  const config = {
    data,
    height:280,
    xField: 'country',
    yField: ['逾期率', '贷款次数'],
    style: {
      fill: (d) => {
        if (d.groupKey === '贷款次数') return '#64DAAB';
        return '#6395FA';
      },
    },
  };
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="贷款次数逾期率"
      style={{
        height: '100%',
      }}
      extra={
        <div className={styles.salesCardExtra}>
          {dropdownGroup}
          <div className={styles.salesTypeRadio}>
            <RangePicker
              style={{
                width: 256,
              }}
            />
          </div>
        </div>
      }
    >
      <div>
        <BidirectionalBar {...config} />
      </div>
    </Card>
  );
};
export default Overdue2;

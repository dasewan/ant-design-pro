import {Column, DualAxes, Pie} from '@ant-design/plots';
import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type dayjs from 'dayjs';
import numeral from 'numeral';
import type { DataItem, Last30Day } from '../data.d';
import useStyles from '../style.style';
import React from "react";
import OverdueDays from './OverdueDays';

export type TimeType = 'today' | 'week' | 'month' | 'year';
const { RangePicker } = DatePicker;

const rankingListData: {
  title: string;
  total: number;
}[] = [];

for (let i = 0; i < 17; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const SalesCard = ({
  rangePickerValue,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
  last30Day,
}: {
  rangePickerValue: RangePickerProps<dayjs.Dayjs>['value'];
  isActive: (key: TimeType) => string;
  loading: boolean;
  handleRangePickerChange: RangePickerProps<dayjs.Dayjs>['onChange'];
  selectDate: (key: TimeType) => void;
  last30Day: Last30Day[];
}) => {
  const { styles } = useStyles();

  

  const config = {
    data: last30Day,
    angleField: 'value',
    colorField: 'type',
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'AntV\nCharts',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ],
  };
  return (
    <Card
      loading={loading}
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a className={isActive('today')} onClick={() => selectDate('today')}>
                  今日
                </a>
                <a className={isActive('week')} onClick={() => selectDate('week')}>
                  本周
                </a>
                <a className={isActive('month')} onClick={() => selectDate('month')}>
                  
                </a>
                <a className={isActive('year')} onClick={() => selectDate('year')}>
                  本年
                </a>
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{
                  width: 256,
                }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{
            marginBottom: 24,
          }}
          items={[
            {
              key: 'S0',
              label: '',
              children: (
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Row gutter={[16, 16]}>
                        <Col span={8}>
                          <div>              
                          <Pie {...config} />
                          </div>
                        </Col>
                        <Col span={8}>
                        <Pie {...config} />
                        </Col>
                        <Col span={8}>
                        <Pie {...config} />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <h4 className={styles.rankingTitle}>催员排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.rankingItemNumberActive : ''
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              ),
            },
            
            
          ]}
        />
      </div>
    </Card>
  );
};
export default SalesCard;

import { DualAxes } from '@ant-design/plots';
import { Card, Radio, Typography, Select } from 'antd';
import type { SelectProps } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import numeral from 'numeral';
import React from 'react';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
const { Text } = Typography;
const options: SelectProps['options'] = [];
const Overdue = ({
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
    const uvBillData = [
      { time: '2019-03', value: 350, type: 'uv' },
      { time: '2019-04', value: 900, type: 'uv' },
      { time: '2019-05', value: 300, type: 'uv' },
      { time: '2019-06', value: 450, type: 'uv' },
      { time: '2019-07', value: 470, type: 'uv' },
      { time: '2019-03', value: 220, type: 'bill' },
      { time: '2019-04', value: 300, type: 'bill' },
      { time: '2019-05', value: 250, type: 'bill' },
      { time: '2019-06', value: 220, type: 'bill' },
      { time: '2019-07', value: 362, type: 'bill' },
    ];

    const transformData = [
      { time: '2019-03', count: 800, name: 'a' },
      { time: '2019-04', count: 600, name: 'a' },
      { time: '2019-05', count: 400, name: 'a' },
      { time: '2019-06', count: 380, name: 'a' },
      { time: '2019-07', count: 220, name: 'a' },
      { time: '2019-03', count: 750, name: 'b' },
      { time: '2019-04', count: 650, name: 'b' },
      { time: '2019-05', count: 450, name: 'b' },
      { time: '2019-06', count: 400, name: 'b' },
      { time: '2019-07', count: 320, name: 'b' },
      { time: '2019-03', count: 900, name: 'c' },
      { time: '2019-04', count: 600, name: 'c' },
      { time: '2019-05', count: 450, name: 'c' },
      { time: '2019-06', count: 300, name: 'c' },
      { time: '2019-07', count: 200, name: 'c' },
    ];

    const config = {
      xField: 'time',
      height:326,
      interaction: { tooltip: { sort: (d) => ['uv', 'bill', 'a', 'b', 'c'].indexOf(d.name) } },
      children: [
        {
          data: uvBillData,
          type: 'interval',
          yField: 'value',
          colorField: 'type',
          stack: true,
          style: { maxWidth: 80 },
          scale: { y: { domainMax: 1200 } },
          interaction: { elementHighlight: { background: true } },
        },
        {
          data: transformData,
          type: 'line',
          yField: 'count',
          colorField: 'name',
          style: {
            lineWidth: 2,
            opacity: (d) => {
              if (d[0].name === 'a') {
                return 1;
              }
              return 0.5;
            },
            lineDash: (d) => {
              if (d[0].name === 'a') {
                return [1, 4];
              }
            },
          },
          axis: { y: { position: 'right' } },
          interaction: {
            tooltip: {
              crosshairs: false,
              marker: false,
            },
          },
        },
      ],
    };
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="首逾"
      // styles={{body:{padding: '4px'}, header:{padding: '4px'}}}
      style={{
        height: '100%',
        // padding: '10px',
      }}
      extra={
        <div className={styles.salesCardExtra}>
          {dropdownGroup}
          <div className={styles.salesTypeRadio}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100' }}
              placeholder="Please select"
              defaultValue={['all']}
              options={[
                {
                  label: '全部渠道',
                  value: 'all',
                },
                {
                  label: '极互-a',
                  value: '极互-a',
                },
                {
                  label: '极互-c',
                  value: '极互-c',
                },
                {
                  label: '拍拍贷',
                  value: '拍拍贷',
                },
                {
                  label: '9Panda',
                  value: '9Panda',
                },
                {
                  label: '优客',
                  value: '优客',
                },
                {
                  label: '龙信',
                  value: '龙信',
                },
              ]}
            />
          </div>
        </div>
      }
    >
      <div>
        <DualAxes {...config} />
      </div>
    </Card>
  );
};
export default Overdue;

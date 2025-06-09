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
const RiskAxes = ({
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
    { time: '2019-03', count: 800 },
    { time: '2019-04', count: 600 },
    { time: '2019-05', count: 400 },
    { time: '2019-06', count: 380 },
    { time: '2019-07', count: 220 },
  ];

  const config = {
    xField: 'time',
    height:246,
    legend: {
      color: {
        itemMarker: 'round',
        itemMarkerSize: 14,
        position: 'right',
      },
    },
    children: [
      {
        data: uvBillData,
        type: 'interval',
        yField: 'value',
        stack: true,
        colorField: 'type',
        style: { maxWidth: 80 },
        label: { position: 'inside' },
        scale: { y: { domainMax: 1200 } },
        interaction: {
          elementHighlight: true,
          elementHighlight: { background: true },
        },
      },
      {
        data: transformData,
        type: 'line',
        yField: 'count',
        colorField: () => 'count',
        style: { lineWidth: 2 },
        axis: { y: { position: 'right' } },
        interaction: {
          tooltip: {
            crosshairs: false,
            marker: false,
          },
        },
      },
    ],
    theme: { category10: ['#F4A49E', '#FACDAA', '#EE7B91', '#E85285', '#BE408C', '#BE408C'] },
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
export default RiskAxes;

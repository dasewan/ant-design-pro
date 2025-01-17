import { Line } from '@ant-design/plots';
import { Card, Radio, Typography, Select } from 'antd';
import type { SelectProps } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import numeral from 'numeral';
import React from 'react';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
const { Text } = Typography;
const options: SelectProps['options'] = [];
const RegisterLine = ({
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
  const config = {
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json',
    },
    xField: (d) => new Date(d.year),
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: false },
    height:246,
    colorField: 'category',
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
        <Line {...config} />
      </div>
    </Card>
  );
};
export default RegisterLine;

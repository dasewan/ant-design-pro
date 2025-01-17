import {Funnel, Pie} from '@ant-design/plots';
import {Card, Col, DatePicker, Row, Typography} from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import numeral from 'numeral';
import React from 'react';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
const { Text } = Typography;
const { RangePicker } = DatePicker;
const OverdueDays = ({
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
      value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/pie-doughnut.json',
    },
    height:280,
    angleField: 'value',
    colorField: 'name',
    legend: false,
    innerRadius: 0.6,
    labels: [
      { text: 'name', style: { fontSize: 10, fontWeight: 'bold' } },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        style: {
          fontSize: 9,
          dy: 12,
        },
      },
    ],
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },
    scale: {
      color: {
        palette: 'spectral',
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="逾期天数分布"
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
      <Row gutter={24}>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}><Pie {...config} /></Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}> <Pie {...config} /></Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}> <Pie {...config} /></Col>
      </Row>

    </Card>
  );
};
export default OverdueDays;

import { Funnel } from '@ant-design/plots';
import { Card, DatePicker, Typography, Row, Col } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import numeral from 'numeral';
import React from 'react';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
const { Text } = Typography;
const { RangePicker } = DatePicker;
const RiskFields = ({
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
    { stage: '简历筛选', number: 253 },
    { stage: '初试人数', number: 151 },
    { stage: '复试人数', number: 113 },
    { stage: '录取人数', number: 87 },
    { stage: '入职人数', number: 59 },
  ];

  const config = {
    data,
    height: 280,
    xField: 'stage',
    yField: 'number',
    label: {
      text: (d) => `${d.stage}\n${d.number}`,
    },
  };
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="细则通过拒绝率"
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
        <Col xl={12} lg={24} md={24} sm={24} xs={24}><Funnel {...config} /></Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}><Funnel {...config} /></Col>
      </Row>

    </Card>
  );
};
export default RiskFields;

import { InfoCircleOutlined } from '@ant-design/icons';
import { Area, Column } from '@ant-design/plots';
import { Col, Progress, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
import Yuan from '../utils/Yuan';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};
const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => {
  const { styles } = useStyles();
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="今日注册"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(1154).format('0,0')}
          footer={<div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Field label="已认证" value={numeral(981).format('0,0')}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <Field label="认证率" value={"84%"}/>
        </div>}
            contentHeight={46}
            >
            <Area
              xField="x"
              yField="y"
              shapeField="smooth"
            height={46}
            axis={false}
            style={{
              fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
              fillOpacity: 0.6,
              width: '100%',
            }}
            padding={-20}
            data={[
              {x: "00", y: 24},
              {x: "01", y: 14},
              {x: "02", y: 9},
              {x: "03", y: 8},
              {x: "04", y: 10},
              {x: "05", y: 4},
              {x: "06", y: 3},
              {x: "07", y: 10},
              {x: "08", y: 26},
              {x: "09", y: 39},
              {x: "10", y: 45},
              {x: "11", y: 50},
              {x: "12", y: 58},
              {x: "13", y: 63},
              {x: "14", y: 70},
              {x: "15", y: 83},
              {x: "16", y: 104},
              {x: "17", y: 117},
              {x: "18", y: 94},
              {x: "19", y: 101},
              {x: "20", y: 77},
              {x: "21", y: 70},
              {x: "22", y: 42},
              {x: "23", y: 33},
            ]}
          />
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="今日签约"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(3234).format('0,0')}
          footer={<div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Field label="通过率" value={"32%"}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <Field label="拒绝率" value={"56%"}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <Field label="复审通过率" value={"63%"}/>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>}
          contentHeight={46}
        >
          <Area
            xField="x"
            yField="y"
            shapeField="smooth"
            height={46}
            axis={false}
            style={{
              fill: 'linear-gradient(-90deg, white 0%, red 100%)',
              fillOpacity: 0.6,
              width: '100%',
            }}
            padding={-20}
            data={[
              {x: "00", y: 102},
              {x: "01", y: 74},
              {x: "02", y: 29},
              {x: "03", y: 18},
              {x: "04", y: 10},
              {x: "05", y: 19},
              {x: "06", y: 33},
              {x: "07", y: 60},
              {x: "08", y: 156},
              {x: "09", y: 199},
              {x: "10", y: 265},
              {x: "11", y: 210},
              {x: "12", y: 151},
              {x: "13", y: 193},
              {x: "14", y: 200},
              {x: "15", y: 213},
              {x: "16", y: 224},
              {x: "17", y: 197},
              {x: "18", y: 168},
              {x: "19", y: 181},
              {x: "20", y: 187},
              {x: "21", y: 150},
              {x: "22", y: 102},
              {x: "23", y: 93},
            ]}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="今日放款"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(1496).format('0,0')}
          footer={<div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Field label="放款金额" value={numeral(54200).format('0,0')}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <Trend flag="down">
              日同比
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>}
          contentHeight={46}
        >
          <Column
            xField="x"
            yField="y"
            padding={-20}
            axis={false}
            height={46}
            data={[
              {x: "00", y: 22},
              {x: "01", y: 34},
              {x: "02", y: 21},
              {x: "03", y: 8},
              {x: "04", y: 2},
              {x: "05", y: 11},
              {x: "06", y: 23},
              {x: "07", y: 36},
              {x: "08", y: 66},
              {x: "09", y: 129},
              {x: "10", y: 135},
              {x: "11", y: 130},
              {x: "12", y: 71},
              {x: "13", y: 83},
              {x: "14", y: 90},
              {x: "15", y: 93},
              {x: "16", y: 94},
              {x: "17", y: 77},
              {x: "18", y: 68},
              {x: "19", y: 91},
              {x: "20", y: 77},
              {x: "21", y: 70},
              {x: "22", y: 42},
              {x: "23", y: 23},
            ]}
            style={{
              fill: '#21ace9',

            }}
            scale={{ x: { paddingInner: 0.4 } }}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="今日还款"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(1342).format('0,0')}
          footer={<div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Field label="今日应还" value={numeral(1215).format('0,0')}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <Field label="今日已还" value={numeral(956).format('0,0')}/>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>}
          contentHeight={46}
        >
          <Column
            xField="x"
            yField="y"
            padding={-20}
            axis={false}
            height={46}
            data={[
              {x: "00", y: 42},
              {x: "01", y: 24},
              {x: "02", y: 11},
              {x: "03", y: 8},
              {x: "04", y: 2},
              {x: "05", y: 1},
              {x: "06", y: 9},
              {x: "07", y: 26},
              {x: "08", y: 36},
              {x: "09", y: 49},
              {x: "10", y: 145},
              {x: "11", y: 130},
              {x: "12", y: 71},
              {x: "13", y: 63},
              {x: "14", y: 60},
              {x: "15", y: 73},
              {x: "16", y: 64},
              {x: "17", y: 127},
              {x: "18", y: 168},
              {x: "19", y: 91},
              {x: "20", y: 47},
              {x: "21", y: 30},
              {x: "22", y: 42},
              {x: "23", y: 23},
            ]}
            style={{
              fill: '#24cc29',

            }}
            scale={{ x: { paddingInner: 0.4 } }}
          />
        </ChartCard>
      </Col>
    </Row>
  );
};
export default IntroduceRow;

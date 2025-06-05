import { InfoCircleOutlined } from '@ant-design/icons';
import { Area, Column } from '@ant-design/plots';
import { Col, Progress, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import type { DataItem, Today, TodayHour } from '../data.d';
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
const IntroduceRow = ({ loading, today, todayHour }: { loading: boolean; today?: Today; todayHour?: TodayHour[]; }) => {
  const { styles } = useStyles();

  // 处理数据补充逻辑
  const processedTodayHour = (() => {
    if (!todayHour) {
      return Array.from({ length: 24 }, (_, index) => ({
        b_hour: index,
        i_log_count: 0,
        g_call_count: 0,
        k_sms_count: 0,
        l_repay_count: 0
      }));
    }

    const hourMap = new Map<number, any>();
    todayHour.forEach(item => {
      // 转换为整数
      const convertedItem = {
        ...item,
        i_log_count: parseInt(item.i_log_count!, 10),
        g_call_count: parseInt(item.g_call_count!, 10),
        k_sms_count: parseInt(item.k_sms_count!, 10),
        l_repay_count: parseInt(item.l_repay_count!, 10)
      };
      hourMap.set(item.b_hour, convertedItem);
    });

    const fullData = [];
    for (let i = 0; i < 24; i++) {
      if (hourMap.has(i)) {
        fullData.push(hourMap.get(i)!);
      } else {
        fullData.push({
          b_hour: i,
          i_log_count: 0,
          g_call_count: 0,
          k_sms_count: 0,
          l_repay_count: 0
        } );
      }
    }

    return fullData;
  })();

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="日志数"
          action={
            <Tooltip title="今日各个时段记录日志数">
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
            <Field label="已认证" value={numeral(981).format('0,0')} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Field label="认证率" value={"84%"} />
          </div>}
          contentHeight={46}
        >
          <Area
            xField="b_hour"
            yField="i_log_count"
            shapeField="smooth"
            height={46}
            axis={false}
            style={{
              fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
              fillOpacity: 0.6,
              width: '100%',
            }}
            padding={-20}
            data={processedTodayHour}
          />
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="电话数"
          action={
            <Tooltip title="今日各个时段拨打电话数">
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
            <Field label="通过率" value={"32%"} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Field label="拒绝率" value={"56%"} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Field label="复审通过率" value={"63%"} />&nbsp;&nbsp;&nbsp;&nbsp;
          </div>}
          contentHeight={46}
        >
          <Area
            xField="b_hour"
            yField="g_call_count"
            shapeField="smooth"
            height={46}
            axis={false}
            style={{
              fill: 'linear-gradient(-90deg, white 0%, red 100%)',
              fillOpacity: 0.6,
              width: '100%',
            }}
            padding={-20}
            data={processedTodayHour}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="案件总数"
          action={
            <Tooltip title="今日各个时段成功催回案件数">
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
            <Field label="放款金额" value={numeral(54200).format('0,0')} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Trend flag="down">
              日同比
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>}
          contentHeight={46}
        >
          <Column
            xField="b_hour"
            yField="k_sms_count"
            padding={-20}
            axis={false}
            height={46}
            data={processedTodayHour}
            style={{
              fill: '#21ace9',
            }}
            scale={{ x: { paddingInner: 0.4 } }}
            // 设置 tooltip 配置
            tooltip={{
              items: [
                {
                  field: 'k_sms_count',
                  label: '短信数量',
                },
              ],
            }}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="未跟总数"
          action={
            <Tooltip title="今日各个时段未跟踪案件数">
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
            <Field label="今日应还" value={numeral(1215).format('0,0')} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Field label="今日已还" value={numeral(956).format('0,0')} />&nbsp;&nbsp;&nbsp;&nbsp;
          </div>}
          contentHeight={46}
        >
          <Column
            xField="b_hour"
            yField="l_repay_count"
            padding={-20}
            axis={false}
            height={46}
            data={processedTodayHour}
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

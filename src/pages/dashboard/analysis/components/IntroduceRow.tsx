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
const IntroduceRow = ({ loading, today, yesterday, todayHour }: { loading: boolean; today?: Today; yesterday?: Today; todayHour?: TodayHour[]; }) => {
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
          title="今日日志数"
          action={
            <Tooltip title="今日各个时段记录日志数">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(today?.i_log_count).format('0,0')}
          footer={<div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Field label="昨日日志数" value={numeral(yesterday?.i_log_count ? parseInt(yesterday.i_log_count, 10) : 0).format('0,0')} />&nbsp;&nbsp;&nbsp;&nbsp;
            {today?.i_log_count !== undefined && yesterday?.i_log_count !== undefined && parseInt(yesterday.i_log_count, 10) !== 0 ? (
              <Trend flag={parseInt(today.i_log_count, 10) >= parseInt(yesterday.i_log_count, 10) ? 'up' : 'down'}>
                日同比
                <span className={styles.trendText}>
                  {numeral((parseInt(today.i_log_count, 10) - parseInt(yesterday.i_log_count, 10)) / parseInt(yesterday.i_log_count, 10)).format('0.0%')}
                </span>
              </Trend>
            ) : (
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>N/A</span>
              </Trend>
            )}
            
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
          title="今日短信数"
          action={
            <Tooltip title="今日各个时段发送短信数">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(today?.k_sms_count).format('0,0')}
          footer={<div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Field label="昨日短信数" value={numeral(yesterday?.k_sms_count ? parseInt(yesterday.k_sms_count, 10) : 0).format('0,0')} />&nbsp;&nbsp;&nbsp;&nbsp;
            {today?.k_sms_count !== undefined && yesterday?.k_sms_count !== undefined && parseInt(yesterday.k_sms_count, 10) !== 0 ? (
              <Trend flag={parseInt(today.k_sms_count, 10) >= parseInt(yesterday.k_sms_count, 10) ? 'up' : 'down'}>
                日同比
                <span className={styles.trendText}>
                  {numeral((parseInt(today.k_sms_count, 10) - parseInt(yesterday.k_sms_count, 10)) / parseInt(yesterday.k_sms_count, 10)).format('0.0%')}
                </span>
              </Trend>
            ) : (
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>N/A</span>
              </Trend>
            )}
          </div>}
          contentHeight={46}
        >
          <Area
            xField="b_hour"
            yField="k_sms_count"
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
          title="今日电话数"
          action={
            <Tooltip title="今日各个时段拨打电话数">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(today?.g_call_count).format('0,0')}
          footer={<div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Field label="昨日电话数" value={numeral(yesterday?.g_call_count ? parseInt(yesterday.g_call_count, 10) : 0).format('0,0')} />&nbsp;&nbsp;&nbsp;&nbsp;
            {today?.g_call_count !== undefined && yesterday?.g_call_count !== undefined && parseInt(yesterday.g_call_count, 10) !== 0 ? (
              <Trend flag={parseInt(today.g_call_count, 10) >= parseInt(yesterday.g_call_count, 10) ? 'up' : 'down'}>
                日同比
                <span className={styles.trendText}>
                  {numeral((parseInt(today.g_call_count, 10) - parseInt(yesterday.g_call_count, 10)) / parseInt(yesterday.g_call_count, 10)).format('0.0%')}
                </span>
              </Trend>
            ) : (
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>N/A</span>
              </Trend>
            )}
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
          title="今日还款数"
          action={
            <Tooltip title="今日各个时段还款数">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(today?.l_repay_count).format('0,0')}
          footer={<div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Field label="今日总案件" value={numeral(today?.b_init_count).format('0,0')} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Field label="昨日总案件" value={numeral(parseInt(yesterday?.l_repay_count || '0', 10)).format('0,0') + '/' + numeral(parseInt(yesterday?.b_init_count || '0', 10)).format('0,0')} />&nbsp;&nbsp;&nbsp;&nbsp;
            {
              (today?.l_repay_count !== undefined && today?.b_init_count !== undefined && yesterday?.l_repay_count !== undefined && yesterday?.b_init_count !== undefined) &&
              (parseInt(yesterday?.b_init_count || '0', 10) > 0 && parseInt(today?.b_init_count || '0', 10) > 0) ? (
                // 计算今日和昨日的还款率
                (() => {
                  const todayRepayRate = parseInt(today?.l_repay_count || '0', 10) / parseInt(today?.b_init_count || '0', 10);
                  const yesterdayRepayRate = parseInt(yesterday?.l_repay_count || '0', 10) / parseInt(yesterday?.b_init_count || '0', 10);
                  return (
                    <Trend flag={todayRepayRate >= yesterdayRepayRate ? 'up' : 'down'}>
                      <span className={styles.trendText}>
                        {numeral((todayRepayRate - yesterdayRepayRate)/yesterdayRepayRate).format('0.0%')}
                      </span>
                    </Trend>
                  );
                })()
              ) : (
                <Trend flag="down">
                  还款率日同比
                  <span className={styles.trendText}>N/A</span>
                </Trend>
              )
            }
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

import { Pie } from '@ant-design/plots';
import { RequestOptionsType } from '@ant-design/pro-components';
import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { useState } from 'react';
import useStyles from '../style.style';
import { useIntl } from '@@/exports';

export type TimeType = 'today' | 'week' | 'month' | 'year' | 'range';
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
const PlotMaps = {};
const SalesCard = ({
  rangePickerValue,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
  last30AdminDay,
  admins,
}: {
  rangePickerValue: RangePickerProps<dayjs.Dayjs>['value'];
  isActive: (key: TimeType) => string;
  loading: boolean;
  handleRangePickerChange: RangePickerProps<dayjs.Dayjs>['onChange'];
  selectDate: (key: TimeType) => void;
  last30AdminDay: API.WSCollectionAdminHeatmap[];
  admins: RequestOptionsType[];
}) => {
  const { styles } = useStyles();
  const [currentTimeType, setCurrentTimeType] = useState<TimeType>('week');
  const intl = useIntl();

  // 转换last30AdminDay数据结构，增加时间过滤
  const transformAdminData = (data: API.WSCollectionAdminHeatmap[], timeType: TimeType) => {
    const today = dayjs();
    let filteredData = data;

    // 根据时间类型过滤数据
    if (timeType === 'today') {
      filteredData = data.filter((item) => dayjs(item.a_date).isSame(today, 'day'));
    } else if (timeType === 'week') {
      filteredData = data.filter((item) => dayjs(item.a_date).isSame(today, 'week'));
    } else if (timeType === 'month') {
      filteredData = data.filter((item) => dayjs(item.a_date).isSame(today, 'month'));
    } else if (timeType === 'range') {
      filteredData = data.filter((item) => dayjs(item.a_date).isBefore(rangePickerValue[1]) && dayjs(item.a_date).isAfter(rangePickerValue[0]));
    }
    const adminMap = new Map<
      number,
      {
        total_call_count: number;
        total_sms_count: number;
        total_wa_count: number;
        total_log_count: number;
        total_contact_call_count: number;
        total_contact_sms_count: number;
        total_contact_wa_count: number;
        total_repay_count: number;
      }
    >();

    filteredData.forEach((item) => {
      const adminId = item.e_collection_admin_id;
      const current = adminMap.get(adminId!) || {
        total_log_count: 0,
        total_call_count: 0,
        total_sms_count: 0,
        total_wa_count: 0,
        total_contact_call_count: 0,
        total_contact_sms_count: 0,
        total_contact_wa_count: 0,
        total_repay_count: 0,
      };

      adminMap.set(adminId!, {
        total_call_count: current.total_call_count + item.g_call_count!,
        total_sms_count: current.total_sms_count + item.k_sms_count!,
        total_wa_count: current.total_wa_count + item.s_wa_count!,
        total_log_count: current.total_log_count + item.i_log_count!,
        total_contact_call_count: current.total_contact_call_count + item.t_contact_call_count!,
        total_contact_sms_count: current.total_contact_sms_count + item.u_contact_sms_count!,
        total_contact_wa_count: current.total_contact_wa_count + item.v_contact_wa_count!,
        total_repay_count: current.total_repay_count + item.l_repay_count!,
      });
    });

    return {
      total_call_count: Array.from(adminMap).map(
        ([e_collection_admin_id, { total_call_count }]) => ({
          e_collection_admin_id,
          total_call_count,
        }),
      ),
      total_sms_count: Array.from(adminMap).map(([e_collection_admin_id, { total_sms_count }]) => ({
        e_collection_admin_id,
        total_sms_count,
      })),
      total_wa_count: Array.from(adminMap).map(([e_collection_admin_id, { total_wa_count }]) => ({
        e_collection_admin_id,
        total_wa_count,
      })),
      total_log_count: Array.from(adminMap).map(([e_collection_admin_id, { total_log_count }]) => ({
        e_collection_admin_id,
        total_log_count,
      })),
      total_contact_call_count: Array.from(adminMap).map(
        ([e_collection_admin_id, { total_contact_call_count }]) => ({
          e_collection_admin_id,
          total_contact_call_count,
        }),
      ),
      total_contact_sms_count: Array.from(adminMap).map(
        ([e_collection_admin_id, { total_contact_sms_count }]) => ({
          e_collection_admin_id,
          total_contact_sms_count,
        }),
      ),
      total_contact_wa_count: Array.from(adminMap).map(
        ([e_collection_admin_id, { total_contact_wa_count }]) => ({
          e_collection_admin_id,
          total_contact_wa_count,
        }),
      ),
      total_repay_count: Array.from(adminMap).map(
        ([e_collection_admin_id, { total_repay_count }]) => ({
          e_collection_admin_id,
          total_repay_count,
        }),
      ),
    };
  };

  const handleSelectDate = (key: TimeType) => {
    setCurrentTimeType(key);
    selectDate(key);
  };

  const sumAdminBonuses = (data: API.WSCollectionAdminHeatmap[], timeType: TimeType): API.WSCollectionAdminHeatmap[] => {

    const today = dayjs();
    let filteredData = data;

    // 根据时间类型过滤数据
    if (timeType === 'today') {
      filteredData = data.filter((item) => dayjs(item.a_date).isSame(today, 'day'));
    } else if (timeType === 'week') {
      filteredData = data.filter((item) => dayjs(item.a_date).isSame(today, 'week'));
    } else if (timeType === 'month') {
      filteredData = data.filter((item) => dayjs(item.a_date).isSame(today, 'month'));
    } else if (timeType === 'range') {
      filteredData = data.filter((item) => dayjs(item.a_date).isBefore(rangePickerValue[1]) && dayjs(item.a_date).isAfter(rangePickerValue[0]));
    }

    const adminMap = new Map<number, API.WSCollectionAdminHeatmap>();

    for (const item of filteredData) {
      const adminId = item.e_collection_admin_id;

      if (!adminMap.has(adminId!)) {
        adminMap.set(adminId!, {
          e_collection_admin_id: adminId,
          a_i_lv1_bonus: 0,
          a_j_lv2_bonus: 0,
          a_k_lv3_bonus: 0,
          a_l_lv4_bonus: 0,
          r_bonus: 0,
        });
      }

      const adminData = adminMap.get(adminId!)!;
      adminData.a_i_lv1_bonus! += item.a_i_lv1_bonus!;
      adminData.a_j_lv2_bonus! += item.a_j_lv2_bonus!;
      adminData.a_k_lv3_bonus! += item.a_k_lv3_bonus!;
      adminData.a_l_lv4_bonus! += item.a_l_lv4_bonus!;
      adminData.r_bonus! += item.r_bonus!;
    }

    // 将Map转换为数组并按r_bonus降序排序
    return Array.from(adminMap.values()).sort((a, b) => b.r_bonus! - a.r_bonus!);
  }
  const adminStats = transformAdminData(last30AdminDay, currentTimeType);
  const adminRank = sumAdminBonuses(last30AdminDay, currentTimeType);
  const data = {
    pie1: adminStats.total_call_count.map((item) => ({
      area:
        admins.find((a) => a.value === item.e_collection_admin_id)?.label ||
        `${item.e_collection_admin_id}`,
      value: item.total_call_count,
    })),
    pie2: adminStats.total_sms_count.map((item) => ({
      area:
        admins.find((a) => a.value === item.e_collection_admin_id)?.label ||
        `${item.e_collection_admin_id}`,
      value: item.total_sms_count,
    })),
    pie3: adminStats.total_wa_count.map((item) => ({
      area:
        admins.find((a) => a.value === item.e_collection_admin_id)?.label ||
        `${item.e_collection_admin_id}`,
      value: item.total_wa_count,
    })),
    pie4: adminStats.total_log_count.map((item) => ({
      area:
        admins.find((a) => a.value === item.e_collection_admin_id)?.label ||
        `${item.e_collection_admin_id}`,
      value: item.total_log_count,
    })),
    pie5: adminStats.total_contact_call_count.map((item) => ({
      area:
        admins.find((a) => a.value === item.e_collection_admin_id)?.label ||
        `${item.e_collection_admin_id}`,
      value: item.total_contact_call_count,
    })),
    pie6: adminStats.total_contact_sms_count.map((item) => ({
      area:
        admins.find((a) => a.value === item.e_collection_admin_id)?.label ||
        `${item.e_collection_admin_id}`,
      value: item.total_contact_sms_count,
    })),
    pie7: adminStats.total_contact_wa_count.map((item) => ({
      area:
        admins.find((a) => a.value === item.e_collection_admin_id)?.label ||
        `${item.e_collection_admin_id}`,
      value: item.total_contact_wa_count,
    })),
    pie8: adminStats.total_repay_count.map((item) => ({
      area:
        admins.find((a) => a.value === item.e_collection_admin_id)?.label ||
        `${item.e_collection_admin_id}`,
      value: item.total_repay_count,
    })),
  };

  const showTooltip = (evt, currentPie) => {
    Object.keys(PlotMaps).forEach((plotKey) => {
      if (plotKey !== currentPie) {
        const plot = PlotMaps[plotKey];
        if (plot) {
          plot.chart.emit('tooltip:show', {
            data: { data: { area: evt.data?.data?.area } },
          });
          plot.chart.emit('element:highlight', {
            data: { data: { area: evt.data?.data?.area } },
          });
        }
      }
    });
  };

  const hideTooltip = (evt, currentPie) => {
    Object.keys(PlotMaps).forEach((plotKey) => {
      if (plotKey !== currentPie) {
        const plot = PlotMaps[plotKey];
        if (plot) {
          plot.chart.emit('tooltip:hide');
          plot.chart.emit('element:unhighlight', {
            data: { data: { area: evt.data?.data?.area } },
          });
        }
      }
    });
  };



  // 配置对象
  const configs = {
    pie1: {
      angleField: 'value',
      colorField: 'area',
      data: data.pie1,
      label: { text: 'value' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: 'Call' } },
    },
    pie2: {
      angleField: 'value',
      colorField: 'area',
      data: data.pie2,
      label: { text: 'value' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: 'Sms' } },
    },
    pie3: {
      angleField: 'value',
      colorField: 'area',
      data: data.pie3,
      label: { text: 'value' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: 'Whatsapp' } },
    },
    pie4: {
      angleField: 'value',
      colorField: 'area',
      data: data.pie4,
      label: { text: 'value' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: 'Log' } },
    },
    pie5: {
      angleField: 'value',
      colorField: 'area',
      data: data.pie5,
      label: { text: 'value' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: 'Contact Call' } },
    },
    pie6: {
      angleField: 'value',
      colorField: 'area',
      data: data.pie6,
      label: { text: 'value' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: 'Contact Sms' } },
    },
    pie7: {
      angleField: 'value',
      colorField: 'area',
      data: data.pie7,
      label: { text: 'value' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: 'Contact WhatsApp' } },
    },
    pie8: {
      angleField: 'value',
      colorField: 'area',
      data: data.pie8,
      label: { text: 'value' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: 'Success' } },
    },
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
                <a
                  className={currentTimeType == 'today' ? styles.currentDate : styles.currentDate2}
                  onClick={() => handleSelectDate('today')}
                >
                  {intl.formatMessage({ id: 'pages.common.today' })}
                </a>
                <a className={isActive('week')} onClick={() => handleSelectDate('week')}>
                  {intl.formatMessage({ id: 'pages.common.this_week' })}
                </a>
                <a className={isActive('month')} onClick={() => handleSelectDate('month')}>
                  {intl.formatMessage({ id: 'pages.common.this_month' })}
                </a>
              </div>
              {/* <RangePicker
                value={rangePickerValue}
                onChange={()=> {handleSelectDate('range'); handleRangePickerChange}}
                style={{
                  width: 256,
                }}
              /> */}
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
                    <Row gutter={[16, 16]} justify="space-around">
                      {Object.keys(configs).map((pieKey, index) => (
                        <Col key={pieKey} xs={6} sm={6} md={6} lg={6} xl={6}>
                          {/* <div>{configs[pieKey].statistic?.title?.content}</div> */}
                          <div><h5 className={styles.rankingTitle} style={{ textAlign: 'center' }}>{configs[pieKey].statistic?.title?.content}</h5></div>
                          <Pie
                            {...configs[pieKey]}
                            // width="100%"  // 使用百分比宽度以适应不同屏幕
                            height={200} // 设置高度
                            onReady={(plot) => {
                              PlotMaps[`pie${index + 1}`] = plot;
                              plot.chart.on('element:pointerover', (evt) => {
                                showTooltip(evt, `pie${index + 1}`);
                              });
                              plot.chart.on('element:pointerout', (evt) => {
                                hideTooltip(evt, `pie${index + 1}`);
                              });
                            }}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div
                      className={styles.salesRank}
                      style={{ maxHeight: '300px', overflowY: 'auto' }}
                    >
                      <h4 className={styles.rankingTitle}>{intl.formatMessage({ id: 'pages.statistics.dashboard.collection_admin_rank' })}</h4>
                      <ul className={styles.rankingList}>
                        {adminRank.map((item, i) => (
                          <li key={item.e_collection_admin_id}>
                            <span
                              className={`${styles.rankingItemNumber} ${i < 2 ? styles.rankingItemNumberActive : ''
                                }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={admins.find((a) => a.value === item.e_collection_admin_id)?.label}>
                              {admins.find((a) => a.value === item.e_collection_admin_id)?.label}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <span>{numeral(item.a_i_lv1_bonus).format('0,0')}</span>
                              <span>+</span>
                              <span>{numeral(item.a_j_lv2_bonus).format('0,0')}</span>
                              <span>+</span>
                              <span>{numeral(item.a_k_lv3_bonus).format('0,0')}</span>
                              <span>+</span>
                              <span>{numeral(item.a_l_lv4_bonus).format('0,0')}</span>
                              <span>=</span>
                              <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{numeral(item.r_bonus).format('0,0')}</span>
                            </div>
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

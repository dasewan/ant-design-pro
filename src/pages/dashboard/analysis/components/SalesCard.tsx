import { Column, DualAxes, Pie } from '@ant-design/plots';
import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import dayjs from 'dayjs'; 
import numeral from 'numeral';
import type { DataItem, Last30AdminDay, Last30Day } from '../data.d';
import useStyles from '../style.style';
import React, { useEffect, useState } from 'react';
import OverdueDays from './OverdueDays';
import { RequestOptionsType } from '@ant-design/pro-components';

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
const PlotMaps = {};
const SalesCard = ({
  rangePickerValue,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
  last30AdminDay,
  admins
}: {
  rangePickerValue: RangePickerProps<dayjs.Dayjs>['value'];
  isActive: (key: TimeType) => string;
  loading: boolean;
  handleRangePickerChange: RangePickerProps<dayjs.Dayjs>['onChange'];
  selectDate: (key: TimeType) => void;
  last30AdminDay: Last30AdminDay[];
  admins: RequestOptionsType[];
}) => {
  const { styles } = useStyles();
  const [currentTimeType, setCurrentTimeType] = useState<TimeType>('today');

  // 转换last30AdminDay数据结构，增加时间过滤
  const transformAdminData = (data: Last30AdminDay[], timeType: TimeType) => {
    const today = dayjs();
    let filteredData = data;
    
    // 根据时间类型过滤数据
    if (timeType === 'today') {
      filteredData = data.filter(item => dayjs(item.a_date).isSame(today, 'day'));
    } else if (timeType === 'week') {
      filteredData = data.filter(item => dayjs(item.a_date).isSame(today, 'week'));
    } else if (timeType === 'month') {
      filteredData = data.filter(item => dayjs(item.a_date).isSame(today, 'month'));
    }
    const adminMap = new Map<number, { total_log_count: number, total_call_count: number, total_repay_count: number }>();

    filteredData.forEach(item => {
      const adminId = item.e_collection_admin_id;
      const current = adminMap.get(adminId!) || { total_log_count: 0, total_call_count: 0, total_repay_count: 0 };

      adminMap.set(adminId!, {
        total_log_count: current.total_log_count + parseInt(item.i_log_count!),
        total_call_count: current.total_call_count + parseInt(item.g_call_count!),
        total_repay_count: current.total_repay_count + parseInt(item.l_repay_count!)
      });
    });

    return {
      total_log_count: Array.from(adminMap).map(([e_collection_admin_id, { total_log_count }]) => ({
        e_collection_admin_id,
        total_log_count
      })),
      total_call_count: Array.from(adminMap).map(([e_collection_admin_id, { total_call_count }]) => ({
        e_collection_admin_id,
        total_call_count
      })),
      total_repay_count: Array.from(adminMap).map(([e_collection_admin_id, { total_repay_count }]) => ({
        e_collection_admin_id,
        total_repay_count
      }))
    };
  };

  const handleSelectDate = (key: TimeType) => {
    setCurrentTimeType(key);
    selectDate(key);
  };

  const adminStats = transformAdminData(last30AdminDay, currentTimeType);

  const data = {
    pie1: adminStats.total_log_count.map(item => ({
      area: admins.find(a => a.value === item.e_collection_admin_id)?.label || `管理员${item.e_collection_admin_id}`,
      bill: item.total_log_count
    })),
    pie2: adminStats.total_call_count.map(item => ({
      area: admins.find(a => a.value === item.e_collection_admin_id)?.label || `管理员${item.e_collection_admin_id}`,
      value: item.total_call_count
    })),
    pie3: adminStats.total_repay_count.map(item => ({
      area: admins.find(a => a.value === item.e_collection_admin_id)?.label || `管理员${item.e_collection_admin_id}`,
      profit: item.total_repay_count
    }))
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
      angleField: 'bill',
      colorField: 'area',
      data: data.pie1,
      label: { text: 'bill' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: '日志总数' } }
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
      statistic: { title: { content: '电话总数' } }
    },
    pie3: {
      angleField: 'profit',
      colorField: 'area',
      data: data.pie3,
      label: { text: 'profit' },
      legend: false,
      tooltip: { title: 'area' },
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
      statistic: { title: { content: '还款总数' } }
    }
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
                <a className={currentTimeType == 'today' ? styles.currentDate : styles.currentDate2} onClick={() => handleSelectDate('today')}>
                  今日
                </a>
                <a className={isActive('week')} onClick={() => handleSelectDate('week')}>
                  本周
                </a>
                <a className={isActive('month')} onClick={() => handleSelectDate('month')}>
                  本月
                </a>
                <a className={isActive('year')} onClick={() => handleSelectDate('year')}>
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
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      {Object.keys(configs).map((pieKey, index) => (
                        <div key={pieKey} style={{ flex: '0 0 32%', marginBottom: '10px' }}>
                          <Pie
                            {...configs[pieKey]}
                            width={300}  // 设置宽度
                            height={300} // 设置高度
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
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <h4 className={styles.rankingTitle}>催员排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${i < 3 ? styles.rankingItemNumberActive : ''
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

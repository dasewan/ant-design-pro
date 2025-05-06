import { Row, Col, Tooltip } from 'antd';
import React, { CSSProperties } from 'react';

interface TimePoint {
  date: string;
  hour: number;
  minute: number;
  count: number;
}

interface Props {
  data: TimePoint[];
}

const HeatmapChart: React.FC<Props> = ({ data }) => {
  // 生成所有时间槽（96个）
  const generateAllTimeSlots = () => {
    const slots: { hour: number; minute: number }[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push({ hour, minute });
      }
    }
    return slots;
  };

  // 创建数据映射
  const createDataMap = () => {
    return data.reduce((acc: Record<string, number>, curr) => {
      const key = `${curr.hour}:${curr.minute}`;
      acc[key] = curr.count;
      return acc;
    }, {});
  };

  // 获取颜色强度
  const getColor = (count?: number): string => {
    if (typeof count !== 'number' || count === 0) return '#f0f0f0'; // 无数据
    // if (count <= 3) return '#f6ffed';   // 极低值（浅青）
    if (count <= 5) return '#b7eb8f';   // 低值
    // if (count <= 9) return '#b7eb8f';   // 中低值
    // if (count <= 12) return '#73d13d';  // 中等值
    // if (count <= 15) return '#389e0d';  // 中高值
    if (count <= 10) return '#237804';  // 高值
    if (count <= 15) return '#FB7CC8';  // 高值
    if (count <= 20) return '#FF0033';  // 高值
    return '#660000';                   // 极高值（深墨绿）
  };
  // 生成三小时刻度
  const generateTimeTicks = () => {
    return Array.from({ length: 8 }, (_, index) => ({
      hour: index * 3,
      position: index * 3 * 4 // 每3小时对应12个格子
    }));
  };

  // 格式化时间显示
  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  // 样式配置
  const boxStyle = (color: string): CSSProperties => ({
    width: '6px',
    height: '20px',
    backgroundColor: color,
    margin: '0.5px',
    borderRadius: '2px',
    cursor: 'pointer'
  });

  const timeSlots = generateAllTimeSlots();
  const dataMap = createDataMap();
  const timeTicks = generateTimeTicks();

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      {/* 热力图主体 */}
      <Row wrap={false}>
        {timeSlots.map((slot, index) => {
          const timeKey = `${slot.hour}:${slot.minute}`;
          const count = dataMap[timeKey];
          const tooltipTitle = count !== undefined
            ? `${formatTime(slot.hour, slot.minute)} - 访问量: ${count}次`
            : `${formatTime(slot.hour, slot.minute)} - 无数据`;

          return (
            <Col key={index}>
              <Tooltip title={tooltipTitle} overlayStyle={{ fontSize: '12px' }}>
                <div style={boxStyle(getColor(count))} />
              </Tooltip>
            </Col>
          );
        })}
      </Row>
      <Row
        justify="space-between"
        style={{
          marginTop: 4,
          position: 'relative',
          width: `${timeSlots.length * 7}px` // 根据格子数量计算总宽度
        }}
      >
        {timeTicks.map((tick, index) => (
          <div
            key={`line-${index}`}
            style={{
              position: 'absolute',
              left: `${(tick.position / timeSlots.length) * 100}%`,
              width: '2px',
              height: '6px',
              backgroundColor: '#999',
              transform: 'translateX(-50%)',
              zIndex: 1
            }}
          />
        ))}
      </Row>
      {/* 时间刻度线 */}
      <Row
        justify="space-between"
        style={{
          marginTop: 4,
          position: 'relative',
          width: `${timeSlots.length * 7}px` // 根据格子数量计算总宽度
        }}
      >
        {timeTicks.map((tick, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${(tick.position / timeSlots.length) * 100}%`,
              transform: 'translateX(-50%)',
              fontSize: '10px'
            }}
          >
            {`${tick.hour.toString().padStart(2, '0')}:00`}
          </div>
        ))}
      </Row>
    </div>
  );
};

export default HeatmapChart;

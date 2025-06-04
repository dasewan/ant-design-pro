import { Row, Col, Tooltip } from 'antd';
import React, { CSSProperties, useEffect, useRef } from 'react';
interface Props {
  data: API.WTCollectionAdminHeatmapDetail[];
  activeButtonKey: string;
}

const HeatmapChart: React.FC<Props> = ({ data, activeButtonKey }) => {
  const generateAllTimeSlots = () => {
    const slots: { hour: number; minute: number }[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push({ hour, minute });
      }
    }
    return slots;
  };

  const createDataMap = () => {
    return data.reduce((acc: Record<string, API.WTCollectionAdminHeatmapDetail>, curr) => {
      const key = `${curr.b_hour}:${curr.c_minute}`;
      acc[key] = curr!;
      return acc;
    }, {});
  };

  const getColor = (count?: number): string => {
    if (typeof count !== 'number' || count === 0) return '#f0f0f0'; // 无数据
    if (count <= 3) return '#b7eb8f';   // 低值
    if (count <= 6) return '#237804';  // 高值
    if (count <= 10) return '#FB7CC8';  // 高值
    if (count <= 15) return '#FF0033';  // 高值
    return '#660000';                   // 极高值（深墨绿）
  };

  const generateTimeTicks = () => {
    return Array.from({ length: 8 }, (_, index) => ({
      hour: index * 3,
      position: index * 3 * 4 // 每3小时对应12个格子
    }));
  };

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const boxStyle = (color: string): CSSProperties => ({
    width: '6px',
    height: '20px',
    backgroundColor: color,
    margin: '0.5px',
    borderRadius: '2px',
    cursor: 'pointer'
  });

  const timeSlots = generateAllTimeSlots();
  const dataMapRef = useRef(createDataMap());
  const timeTicks = generateTimeTicks();

  // 修改 useEffect 依赖项，添加 activeButtonKey
  useEffect(() => {
    dataMapRef.current = createDataMap();
  }, [data, activeButtonKey]);

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <Row wrap={false}>
        {timeSlots.map((slot, index) => {
          const timeKey = `${slot.hour}:${slot.minute}`;
          const data = dataMapRef.current[timeKey];
          let count;
          switch (activeButtonKey) {
            case 'show':
              count = data?.h_count;
              break;
            case 'out':
              count = data?.i_log_count;
              break;
            case 'primary':
              count = data?.g_call_count;
              break;
            default:
              count = data?.h_count;
          }

          const tooltipTitle = data !== undefined
            ? `${formatTime(slot.hour, slot.minute)} - total cnt: ${data.h_count ?? 0}, log cnt: ${data.i_log_count ?? 0}, call cnt: ${data.g_call_count ?? 0}`
            : `${formatTime(slot.hour, slot.minute)} - no data`;

          return (
            <Col key={index}>
              {count != undefined && count > 0 ? (
                <Tooltip title={tooltipTitle} overlayStyle={{ fontSize: '12px' }}>
                  <div style={boxStyle(getColor(count ?? 0))} />
                </Tooltip>
              ) : (
                <div style={boxStyle(getColor(count ?? 0))} />
              )}
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

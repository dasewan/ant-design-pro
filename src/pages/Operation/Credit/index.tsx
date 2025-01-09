import {
  getAdminV1OBKycs as index,
  putAdminV1OBKycsId as update,
} from '@/services/ant-design-pro/OBKyc';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import {Divider, message, Row, Col, Result, Spin, Switch, Alert, Radio, Table, InputNumber, Space, Button} from 'antd';
import type { RadioChangeEvent, InputNumberProps } from 'antd';
import { ProForm, ProFormRadio, ProFormText,ProFormDigit } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { fieldLabels } from './service';
import {history, useIntl} from "@@/exports";
import 'katex/dist/katex.min.css';
import MathFormula from './MathFormula';
import { ProCard } from '@ant-design/pro-components';
import moment from "moment/moment";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const ageGroups = [
  { min: 0, max: 5, startColor: [220, 220, 220], endColor: [150, 150, 150] }, // 少年：浅灰色到深灰色
  { min: 6, max: 10, startColor: [200, 255, 255], endColor: [0, 200, 200] }, // 青年：浅青色到深青色
  { min: 11, max: 15, startColor: [255, 255, 200], endColor: [200, 200, 0] }, // 中年：浅黄色到深黄色
  { min: 16, max: 20, startColor: [230, 200, 255], endColor: [128, 0, 188] }, // 老年：浅红色到深红色
];
// 根据年龄计算背景颜色
const getBackgroundColor = (age) => {
  // 找到年龄所属的分段
  const group = ageGroups.find((g) => age >= g.min && age <= g.max);
  if (!group) return 'white'; // 默认白色

  // 计算归一化的年龄值（在当前分段中的比例）
  const normalizedAge = (age - group.min) / (group.max - group.min);

  // 计算颜色值
  const color = group.startColor.map((start, i) => {
    const end = group.endColor[i];
    return Math.floor(start + (end - start) * normalizedAge);
  });

  return `rgb(${color.join(',')})`;
};

function calculateCreditScorePenalty(overdueDays: number, p: number = 10, q: number = 0.1): number {
  return -Math.floor((p * overdueDays) / (1 + q * overdueDays));
}
function calculateCreditScoreReward(
  overdueDays: number,
  repayCount: number,
  k: number = 35,
  a: number = 0.4,
  b: number = 0.05
): number {
  return Math.floor(k / ((1 + a * overdueDays) * (1 + b * repayCount)));
}
interface DynamicPenaltyParameters {
  p: number;
  q: number;
}


interface DynamicRewardParameters {
  k: number;
  a: number;
  b: number;
}



interface Order {
  overdue_days: number;
  repay_count: number;
}
interface Coefficient {
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  k1: number;
  k2: number;
  k3: number;
  k4: number;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  break1: number;
  break2: number;
  break3: number;
  break4: number;
  initial_score: number;
  overdue_days: string;
}





const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  // 排序固定模版
  const [data, setData] = useState<TableListItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [dataSource, setDataSource] = useState<[]>([]);
  const [coefficient, setCoefficient] = useState<Coefficient>([]);

  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState('break');
  //loose strict
  // @ts-ignore
  useEffect(() => {
    async function _index() {
        // @ts-ignore
        const res = await index({ page: 1, limit: 10000 });
        setData(res.data!)
        // @ts-ignore
      setMode(res.other.mode);
        setLoading(false)
    }

    _index();
    return () => {
      return;
    };
  }, [loading]);
  function getDynamicPenaltyParameters(repayCount: number, coefficient: Coefficient): DynamicPenaltyParameters {
    if (repayCount > 15) {
      return { p: coefficient.p4, q: coefficient.q4 };
    } else if (repayCount > 10) {
      return { p: coefficient.p3, q: coefficient.q3 };
    } else if (repayCount > 5) {
      return { p: coefficient.p2, q: coefficient.q2 };
    } else {
      return { p: coefficient.p1, q: coefficient.q1 };
    }
  }
  function getDynamicRewardParameters(repayCount: number, coefficient: Coefficient): DynamicRewardParameters {
    if (repayCount > 15) {
      return { k: coefficient.k4, a: coefficient.a4, b: coefficient.b4 };
    } else if (repayCount > 10) {
      return { k: coefficient.k3, a: coefficient.a3, b: coefficient.b3 };
    } else if (repayCount > 5) {
      return { k: coefficient.k2, a: coefficient.a2, b: coefficient.b2 };
    } else {
      return { k: coefficient.k1, a: coefficient.a1, b: coefficient.b1 };
    }
  }
  function getDynamicBreak(repayCount: number, coefficient: Coefficient): number {
    if (repayCount > 15) {
      return coefficient.break4;
    } else if (repayCount > 10) {
      return coefficient.break3;
    } else if (repayCount > 5) {
      return coefficient.break2;
    } else {
      return coefficient.break1;
    }
  }

  const calculate =  (coefficient: Coefficient) => {
    console.log(coefficient)
    const orders: Order[] = coefficient.overdue_days.split('-').map(Number).map((overdueDays, index) => ({
      overdue_days: overdueDays,
      repay_count: index + 1,
    }));
    let dataSource = [];
    let score = 600;
    orders.map((order, index) => {
      const penaltyParams = getDynamicPenaltyParameters(order.repay_count, coefficient); // 假设初始信用分为 600
      const breakDays = getDynamicBreak(order.repay_count, coefficient);

      for (let i = 1; i <= order.overdue_days; i++) {
        if (i > breakDays) {
          break;
        }
        let dayPenalty = calculateCreditScorePenalty(i, penaltyParams.p, penaltyParams.q);
        dataSource.push({
          repayCount: order.repay_count,
          overdueDays: i,
          type: 'penalty',
          change: dayPenalty,
          credit: score + dayPenalty,
        })
        score += dayPenalty;

      }

      const rewardParams = getDynamicRewardParameters(order.repay_count, coefficient);
      const reward = calculateCreditScoreReward(
        order.overdue_days,
        order.repay_count,
        rewardParams.k,
        rewardParams.a,
        rewardParams.b
      );
      dataSource.push({
        repayCount: order.repay_count,
        overdueDays: order.overdue_days,
        type: 'reward',
        change: reward,
        credit: score + reward,
      })
      score += reward;
    });
    setDataSource(dataSource)
  };

  const exportToExcel = (data, columns, filename) => {
    const extraRows = [
      { p: coefficient.p1, q: coefficient.q1, k: coefficient.k1, a: coefficient.a1, b: coefficient.b1, break: coefficient.break1 },
      { p: coefficient.p2, q: coefficient.q2, k: coefficient.k2, a: coefficient.a2, b: coefficient.b2, break: coefficient.break2 },
      { p: coefficient.p3, q: coefficient.q3, k: coefficient.k3, a: coefficient.a3, b: coefficient.b3, break: coefficient.break3 },
      { p: coefficient.p4, q: coefficient.q4, k: coefficient.k4, a: coefficient.a4, b: coefficient.b4, break: coefficient.break4 },

    ];
    // 1. 创建一个空的工作表
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    // 2. 添加额外数据的表头
    const extraHeader = ['p', 'q', 'k', 'a', 'b', 'break']; // 额外数据的表头
    XLSX.utils.sheet_add_aoa(worksheet, [extraHeader], { origin: 'A1' }); // 在 A1 开始添加表头

    // 3. 添加额外数据
    extraRows.forEach((row, rowIndex) => {
      const rowData = [row.p, row.q, row.k, row.a, row.b, row.break]; // 将额外数据转换为数组
      XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: `A${rowIndex + 2}` }); // 从 A2 开始添加数据
    });

    // 4. 添加表格数据的表头
    const tableHeader = columns.map(col => col.title); // 表格数据的表头
    XLSX.utils.sheet_add_aoa(worksheet, [tableHeader], { origin: `A${extraRows.length + 3}` }); // 在额外数据下方添加表头

    // 5. 添加表格数据
    const tableData = data.map(item => columns.map(col => item[col.dataIndex])); // 将表格数据转换为二维数组
    XLSX.utils.sheet_add_aoa(worksheet, tableData, { origin: `A${extraRows.length + 4}` }); // 在表头下方添加数据

    // 6. 创建并导出 Excel 文件
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${filename}.xlsx`);
  };

  const columns = [
    { title: '借款次数', dataIndex: 'repayCount', key: 'repayCount' ,
      onCell: (record, rowIndex) => {
        // 计算相同工资的行数
        let rowSpan = 1;
        for (let i = rowIndex + 1; i < dataSource.length; i++) {
          if (dataSource[i].repayCount === record.repayCount) {
            rowSpan++;
          } else {
            break;
          }
        }

        // 如果是相同工资的第一行，返回 rowSpan
        if (rowIndex === 0 || dataSource[rowIndex - 1].repayCount !== record.repayCount) {
          return { rowSpan };
        }

        // 否则返回 rowSpan 为 0，表示不显示该单元格
        return { rowSpan: 0 };
      },
    },
    { title: '逾期天数', dataIndex: 'overdueDays', key: 'overdueDays' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    {
      title: '变更', dataIndex: 'change', key: 'change',
      render: (_, record) => {
        if (record.change < 0) {
          return <span style={{color: 'red'}}>{record.change}</span>
        } else {
          return <span style={{color: 'green'}}>{record.change}</span>
        }
      }
    },
    { title: '信用分', dataIndex: 'credit', key: 'credit' },
  ];

  return (
    <PageContainer
      header={{
        title: '信用分系数',
        ghost: true,
      }}
    >
      <div>
        <Alert
          message="Warning"
          description="请确保您已经充分预演过信用分系数，如需定制信用分公式，请联系管理员。"
          type="warning"
        />

        <ProCard
          split="vertical"
          bordered
          headerBordered
        >
          <ProCard title="公式" colSpan="60%">
            <Divider orientation="left">逾期惩罚公式</Divider>
            <p>
              <MathFormula formula="\Delta S_{\text{penalty}} = -\frac{p \cdot \text{overdueDays}}{1 + q \cdot \text{overdueDays}}" />
            </p>
            <div style={{ textAlign: 'center' }}>
              <ul style={{ display: 'inline-block', textAlign: 'left' }}>
                <li>p: 惩罚强度系数，控制惩罚的最大值。</li>
                <li>q: 惩罚增长系数，控制惩罚的增长速度。</li>
              </ul>
            </div>
            <Divider orientation="left">还款奖励公式</Divider>
            <p>
              <MathFormula formula="\Delta S_{\text{reward}} = \frac{k}{(1 + a \cdot \text{overdueDays}) \cdot (1 + b \cdot \text{repayCount})}" />
              <div style={{ textAlign: 'center' }}>
                <ul style={{ display: 'inline-block', textAlign: 'left' }}>
                  <li>k：基础奖励值。</li>
                  <li>a：逾期天数对奖励的影响系数。</li>
                  <li>b：还款次数对奖励的影响系数。</li>
                </ul>
              </div>
            </p>
            <Divider orientation="left">系数</Divider>

            <ProForm<{
              name: string;
              company?: string;
              useMode?: string;
            }>
              layout={'horizontal'}
              submitter={{
                render: (props, doms) => {
                  return (
                    <Row>
                      <Col offset={16}>
                        <Space>{doms}</Space>
                      </Col>
                    </Row>
                  );
                },
              }}
              onFinish={async (values) => {
                console.log(values);
                setCoefficient(values);
                calculate(values);
                message.success('提交成功');
              }}
              grid={true}
              params={{}}
              request={async () => {
                let values = {
                  p1: 15,
                  p2: 15,
                  p3: 15,
                  p4: 15,
                  q1: 1.3,
                  q2: 1.5,
                  q3: 1.7,
                  q4: 1.8,
                  k1: 35,
                  k2: 35,
                  k3: 35,
                  k4: 35,
                  a1: 0.4,
                  a2: 0.5,
                  a3: 0.6,
                  a4: 0.7,
                  b1: 0.05,
                  b2: 0.06,
                  b3: 0.07,
                  b4: 0.08,
                  break1: 3,
                  break2: 4,
                  break3: 4,
                  break4: 5,
                  initial_score: 600,
                  overdue_days: '0-0-1-0-2-3-2-4-5-6-5-4-7-8-12-11-7-6-15',
                };
                setCoefficient(values);
                calculate(values);
                return values;
              }}
            >
              <Divider variant="dashed" orientation="left">
                0-5
              </Divider>
              <ProFormDigit
                name="p1"
                min={10}
                max={50}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 1, addonBefore: 'p' }}
              />
              <ProFormDigit
                name="q1"
                min={0.1}
                max={5.0}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.1, addonBefore: 'q' }}
              />
              <ProFormDigit
                name="k1"
                min={10}
                max={70}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 1, addonBefore: 'k' }}
              />
              <ProFormDigit
                name="a1"
                min={0.1}
                max={5.0}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.1, addonBefore: 'a' }}
              />
              <ProFormDigit
                name="b1"
                min={0.01}
                max={0.2}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.01, addonBefore: 'b' }}
              />
              <ProFormDigit
                name="break1"
                min={1}
                max={10}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.01, addonBefore: 'break', precision: 0 }}
              />
              <Divider variant="dashed" orientation="left">
                6-10
              </Divider>
              <ProFormDigit
                name="p2"
                min={10}
                max={50}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 1, addonBefore: 'p' }}
              />
              <ProFormDigit
                name="q2"
                min={0.1}
                max={5.0}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.1, addonBefore: 'q' }}
              />
              <ProFormDigit
                name="k2"
                min={10}
                max={70}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 1, addonBefore: 'k' }}
              />
              <ProFormDigit
                name="a2"
                min={0.1}
                max={5.0}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.1, addonBefore: 'a' }}
              />
              <ProFormDigit
                name="b2"
                min={0.01}
                max={0.2}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.01, addonBefore: 'b' }}
              />
              <ProFormDigit
                name="break2"
                min={1}
                max={10}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.01, addonBefore: 'break', precision: 0 }}
              />
              <Divider variant="dashed" orientation="left">
                11-15
              </Divider>
              <ProFormDigit
                name="p3"
                min={10}
                max={50}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 1, addonBefore: 'p' }}
              />
              <ProFormDigit
                name="q3"
                min={0.1}
                max={5.0}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.1, addonBefore: 'q' }}
              />
              <ProFormDigit
                name="k3"
                min={10}
                max={70}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 1, addonBefore: 'k' }}
              />
              <ProFormDigit
                name="a3"
                min={0.1}
                max={5.0}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.1, addonBefore: 'a' }}
              />
              <ProFormDigit
                name="b3"
                min={0.01}
                max={0.2}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.01, addonBefore: 'b' }}
              />
              <ProFormDigit
                name="break3"
                min={1}
                max={10}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.01, addonBefore: 'break', precision: 0 }}
              />
              <Divider variant="dashed" orientation="left">
                16+
              </Divider>
              <ProFormDigit
                name="p4"
                min={10}
                max={50}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 1, addonBefore: 'p' }}
              />
              <ProFormDigit
                name="q4"
                min={0.1}
                max={5.0}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.1, addonBefore: 'q' }}
              />
              <ProFormDigit
                name="k4"
                min={10}
                max={70}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 1, addonBefore: 'k' }}
              />
              <ProFormDigit
                name="a4"
                min={0.1}
                max={5.0}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.1, addonBefore: 'a' }}
              />
              <ProFormDigit
                name="b4"
                min={0.01}
                max={0.2}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.01, addonBefore: 'b' }}
              />
              <ProFormDigit
                name="break4"
                min={1}
                max={10}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.01, addonBefore: 'break', precision: 0 }}
              />
              <ProFormDigit
                name="initial_score"
                min={200}
                max={700}
                width="sm"
                colProps={{ span: 4 }}
                fieldProps={{ step: 0.01, addonBefore: '基础信用分', precision: 0 }}
              />

              <ProFormText
                name="overdue_days"
                tooltip="最长为 24 位"
                placeholder="-分割"
                colProps={{ span: 20 }}
                fieldProps={{ step: 0.01, addonBefore: 'overdueDays', style: { width: '100%' } }}
              />
            </ProForm>
          </ProCard>
          <ProCard title="预演结果"     extra={
            <Button type="primary" onClick={() => exportToExcel(dataSource, columns, 'table_data')}>
              导出
            </Button>
          }>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered
              onRow={(record) => ({
                style: {
                  backgroundColor: getBackgroundColor(record.repayCount), // 动态设置背景颜色
                },
              })}
            />
          </ProCard>
        </ProCard>
      </div>
    </PageContainer>
  );
};

export default TableList;

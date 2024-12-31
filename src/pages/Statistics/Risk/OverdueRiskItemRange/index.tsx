import { PERIODS } from '@/pages/enums';

import { getAdminV1GDRiskItemEnum as getRiskItemEnum } from '@/services/ant-design-pro/GDRiskItem';
import { getAdminV1WHOverdueRiskItemRanges as index } from '@/services/ant-design-pro/WHOverdueRiskItemRange';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormSelect,
  QueryFilter,
} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Col, Dropdown, MenuProps, Row, Tooltip } from 'antd';
import { DefaultOptionType } from 'antd/es/cascader';
import { isEqual } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [records, setRecords] = useState<TableListItem[] | undefined>([]);
  /** 图表显隐 */
  const [chartVisible, handleChartVisible] = useState<boolean>(false);
  /** 图表类型 dpd period */
  const [chartChartType, setChartChartType] = useState<string>('');
  /** 风控字段enum */
  const [roleItems, setRoleItems] = useState<RequestOptionsType[]>([]);
  const [dpd, setDpd] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [preParams, setPreParams] = useState<any>();

  /** table */
  const _index = async (
    // 第一个参数 params 查询表单和 params 参数的结合
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: TableListPagination & {
      pageSize: number;
      current: number;
      [propName: string]: any;
    },
    // sort,
    // filter,
  ) => {
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    if (typeof params.a_a_a_risk_week === 'string') {
      params.a_a_a_risk_week = params.a_a_a_risk_week.replace(/\D/g, '');
    } else if (params.a_a_a_risk_week !== undefined) {
      params.a_a_a_risk_week =
        moment(params.a_a_a_risk_week).year() + '' + moment(params.a_a_a_risk_week).isoWeek();
    }

    let res;
    let params2 = { ...params };
    delete params2.dpd;
    delete params2.period;
    if (!isEqual(params2, preParams)) {
      setPreParams(params2);
      // @ts-ignore
      res = await index({ page: params.current, ...params });
      setRecords(res.data);
    } else {
      res = {
        data: records,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: true,
        // 不传会使用 data 的长度，如果是分页一定要传
      };
    }
    if (params.dpd !== undefined) {
      setDpd(params.dpd);
    }
    if (params.period !== undefined) {
      setPeriod(params.period);
    }

    if (res.data!.length > 0 && params.dpd !== undefined && params.period === undefined) {
      handleChartVisible(true);
      setChartChartType('dpd');
      setPeriod('');
    } else if (res.data!.length > 0 && params.dpd === undefined && params.period !== undefined) {
      handleChartVisible(true);
      setChartChartType('period');
      setDpd('');
    } else {
      handleChartVisible(false);
      setChartChartType('');
      setPeriod('');
      setDpd('');
    }

    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: res.success,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.total,
    };
  };

  /**
   * 查询风控字段enum
   */
  const _getRoleItemEnum = async () => {
    let data: RequestOptionsType[] = [];
    if (roleItems.length === 0) {
      const cachedData = localStorage.getItem('riskItemEnum');
      if (cachedData) {
        // 如果存在缓存数据，直接使用
        data = JSON.parse(cachedData);
        setRoleItems(data);
      } else {
        // @ts-ignore
        const res = await getRiskItemEnum({ foo: 1, h_parent_id: 0, load_items: 1 });
        for (const cat of res.data!) {
          // @ts-ignore
          if (cat.cChildren.length > 0) {
            const dataChild = [];
            // @ts-ignore
            for (const catChild of cat.cChildren!) {
              const children = [];
              if (catChild.a_a_a_a_g_d_risk_item.length > 0) {
                for (const item of catChild.a_a_a_a_g_d_risk_item!) {
                  children.push({
                    label: item.a_name,
                    value: item.id,
                    description: item.g_description,
                  });
                }
                dataChild.push({
                  label: catChild.b_name,
                  value: catChild.id,
                  children,
                });
              } else if (catChild.cChildren.length > 0) {
                const children2 = [];
                for (const _children2 of catChild.cChildren!) {
                  const children3 = [];
                  if (_children2.a_a_a_a_g_d_risk_item.length > 0) {
                    for (const item of _children2.a_a_a_a_g_d_risk_item!) {
                      children3.push({
                        label: item.a_name,
                        value: item.id,
                        description: item.g_description,
                      });
                    }
                    children2.push({
                      label: _children2.b_name,
                      value: _children2.id,
                      children: children3,
                    });
                  }
                  // console.log(catChild.b_name)
                }
                dataChild.push({
                  label: catChild.b_name,
                  value: catChild.id,
                  children: children2,
                });
              }
            }
            // console.log(dataChild);
            data.push({
              label: cat.b_name,
              value: cat.id,
              children: dataChild,
            });
          } else {
            const children = [];
            for (const item of cat.a_a_a_a_g_d_risk_item!) {
              children.push({
                label: item.a_name,
                value: item.id,
                description: item.g_description,
              });
            }
            data.push({
              label: cat.b_name,
              value: cat.id,
              children,
            });
          }
        }
        localStorage.setItem('riskItemEnum', JSON.stringify(data));
        setRoleItems(data);

      }

      return data;
    } else {
      return roleItems;
    }
  };
  useEffect(() => {
    _getRoleItemEnum();
    return () => {};
  }, []);
  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  const findLabelByValue = (
    data: RequestOptionsType[],
    value: number,
  ): React.ReactNode | undefined => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.value === value) {
        return item.label;
      }
      if (item.children) {
        const label = findLabelByValue(item.children, value);
        if (label) {
          return label;
        }
      }
    }
    return null;
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'/admin/v1/aLAdminFiles_templete/white_info_list.xlsx'}
        >
          报表说明
        </a>
      ),
      key: 'item-2',
      icon: <DownloadOutlined />,
    },
  ];
  // @ts-ignore
  return (
    <PageContainer
      header={{
        // title: '营销统计',
        ghost: true,
        extra: [
          <Tooltip key="11" title="字段区间期数图: 风控日期或字段 + 期数" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={chartChartType !== 'period'}
              onClick={() => handleChartVisible(!chartVisible)}
            >
              {chartChartType !== 'period'
                ? '显示期数'
                : !chartVisible && chartChartType === 'period'
                ? '显示期数'
                : '隐藏期数'}
            </Button>
          </Tooltip>,
          <Tooltip key="1" title="字段区间DPD图: 风控日期或字段 + DPD" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={chartChartType !== 'dpd'}
              onClick={() => handleChartVisible(!chartVisible)}
            >
              {chartChartType !== 'dpd'
                ? '显示DPD'
                : !chartVisible && chartChartType === 'dpd'
                ? '显示DPD'
                : '隐藏DPD'}
            </Button>
          </Tooltip>,

          <Dropdown key="dropdown" trigger={['click']} menu={{ items }}>
            <Button key="7" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ],
      }}
    >
      <>
        <div>
          <QueryFilter
            labelWidth="auto"
            span={4}
            onFinish={async (values: any) => {
              await _index(values);
            }}
          >
            <ProForm.Group>
              <ProFormDatePicker.Week name="a_a_a_risk_week" label="风控日期" />
              <ProFormCascader
                name="a_a_b_risk_item_id"
                label="字段"
                fieldProps={{
                  multiple: true,
                  showSearch: { filter },
                  options: roleItems,
                }}
              />
              <ProFormSelect options={PERIODS} name="period" label="期数" />
              <ProFormSelect
                options={[
                  {
                    label: 'DPD1',
                    value: 'dpd1',
                  },
                  {
                    label: 'DPD',
                    value: 'dpd',
                  },
                ]}
                name="dpd"
                label="DPD"
              />
            </ProForm.Group>
          </QueryFilter>
        </div>
      </>

      <div key="1" style={{ display: chartVisible ? 'block' : 'none' }}>
        <Row gutter={[16, 16]}>
          {records!.map((item: TableListItem) => (
            <Col key={item.id} span={8}>
              <div style={{ marginTop: 20 }}>
                {' '}
                {findLabelByValue(roleItems, item.a_a_b_risk_item_id!)}{' '}
                <span style={{ color: 'grey' }}> 2023-10-21</span>{' '}
                <span style={{ color: 'black' }}>{item.a_a_a_risk_week}</span>
              </div>
              <Chart rawData={item} period={period} dpd={dpd}></Chart>
            </Col>
          ))}
        </Row>
      </div>
    </PageContainer>
  );
};

export default TableList;

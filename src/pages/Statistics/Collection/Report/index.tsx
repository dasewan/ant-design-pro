import {getAdminV1WMCollectionReports as index} from '@/services/ant-design-pro/WMCollectionReport';
import {DownloadOutlined, EllipsisOutlined} from '@ant-design/icons';
import {ProFormSelect} from '@ant-design/pro-form';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {Button, Dropdown, MenuProps, Tooltip} from 'antd';
import {isEqual} from 'lodash';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import type {TableListItem, TableListPagination} from './data';
import {FieldIndex, FieldLabels, FieldOptions2, FieldRateIndex, FieldRateLabels} from './service';
import Chart from "@/pages/Statistics/Collection/Report/components/Chart";
import {PERIODS} from "@/pages/enums";
import Chart2 from "@/pages/Statistics/Collection/Report/components/Chart2";

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [records, setRecords] = useState<TableListItem[]>([]);
  const [total, setTotal] = useState<number | undefined>(0);

  /** 图表显隐 */
  const [chartVisible, handleChartVisible] = useState<boolean>(false);
  const [isLite, setIsLite] = useState<boolean>(true);

  /** 图表类型 area column */
  const [chartChartType, setChartChartType] = useState<string>('');
  const [chartCountEnable, setChartCountEnable] = useState<boolean>(false);
  const [chartAmountEnable, setChartAmountEnable] = useState<boolean>(false);
  const [chartCustomizeEnable, setChartCustomizeEnable] = useState<boolean>(false);
  /** 维度 */
  const [periodMultiple, setPeriodMultiple] = useState<boolean>(true);
  const [periods, setPeriods] = useState<string | string[]>('');
  const [fieldMultiple, setFieldMultiple] = useState<boolean>(true);
  const [fields, setFields] = useState<string | string[]>('');


  const [preParams, setPreParams] = useState<any>();
  /** 管理员enum */


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
    let res;
    let params2 = {...params};
    delete params2.field;
    delete params2.period;
    if (!isEqual(params2, preParams)) {
      setPreParams(params2);
      // @ts-ignore
      res = await index({page: params.current, ...params});
      setRecords(res.data);
      setTotal(res.total);
    } else {
      res = {
        data: records,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: true,
        // 不传会使用 data 的长度，如果是分页一定要传
        total: total,
      };
    }
    if (Array.isArray(params.field) && params.field.length === 1 && Array.isArray(params.period) && params.period.length > 1) {
      params.field = params.field[0];
    } else if (Array.isArray(params.period) && params.period.length === 1 && Array.isArray(params.field) && params.field.length > 1) {
      params.period = params.period[0];
    }
    setFields(params.field);
    setPeriods(params.period);


    if (res.data!.length > 0) {
      setChartCountEnable(true)
      setChartAmountEnable(true)
      setChartCustomizeEnable(true)
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_date,
      dataIndex: FieldIndex.a_date,
      width: 120,
      fixed: 'left',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'a_date[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'a_date[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
      render: (_, record) => {
        let color = 'black';
        let fontWeight = 400;
        let rate = (record.collection_success_amount! * 100) / record.e_amount!;
        let rate2 = 100 - rate
        if (rate2 > 30) {
          // 根据损益值的大小设定红色的深度
          const intensity = Math.min(Math.max(rate2, 0.63), 1); // 可根据需求调整1000的值
          const red = Math.floor(255 * intensity);
          color = `rgb(${red}, 0, 0)`;
          fontWeight = intensity * 1000;
        } else {
          let rate3 = (record.collection_success_count! * 100) / record.d_count!;
          let rate4 = 100 - rate3
          if (rate4 > 30) {
            // 根据损益值的大小设定红色的深度
            const intensity = Math.min(Math.max(rate4, 0.63), 1); // 可根据需求调整1000的值
            const red = Math.floor(255 * intensity);
            color = `rgb(${red}, 0, 0)`;
            fontWeight = intensity * 1000;
          }
        }
        if (record.b_period_index! > 0) {
          return <span style={{color, fontWeight}}>{`Period ${record.b_period_index!}`}</span>;
        } else {

          return <span style={{color, fontWeight}}>{moment(record.a_date).format('YYYY-MM-DD')}</span>;
        }
      },
    },
    {
      title: '期数',
      dataIndex: 'period',
      hideInTable: true,
      renderFormItem: () => {
        return (
          <ProFormSelect
            mode={periodMultiple ? 'multiple' : 'single'}
            fieldProps={{
              style: {width: 130},
              onChange: (value) => {
                if (Array.isArray(value) && value.length > 1) {
                  setFieldMultiple(false);
                } else if (Array.isArray(value) && value.length === 1) {
                  setFieldMultiple(true);
                } else {
                  setFieldMultiple(true);
                }
              },
            }}
            name='period'
            // @ts-ignore
            options={PERIODS}
            placeholder="Please select"
          />
        );
      },
    },
    {
      title: '字段',
      dataIndex: 'field',
      hideInTable: true,
      renderFormItem: () => {
        return (
          <ProFormSelect
            mode={fieldMultiple ? 'multiple' : 'single'}
            fieldProps={{
              style: {width: 130},
              onChange: (value) => {
                if (Array.isArray(value) && value.length > 1) {
                  setPeriodMultiple(false);
                } else if (Array.isArray(value) && value.length === 1) {
                  setPeriodMultiple(true);
                } else {
                  setPeriodMultiple(true);
                }
              },
            }}
            name='field'
            // @ts-ignore
            options={FieldOptions2}
            placeholder="Please select"
          />
        );
      },
    },
    {
      title: FieldLabels.d_count,
      dataIndex: FieldIndex.d_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.e_amount,
      dataIndex: FieldIndex.e_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.settled_count,
      dataIndex: FieldIndex.settled_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.settled_amount,
      dataIndex: FieldIndex.settled_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.part_count,
      dataIndex: FieldIndex.part_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.part_amount,
      dataIndex: FieldIndex.part_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.extend_count,
      dataIndex: FieldIndex.extend_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.extend_amount,
      dataIndex: FieldIndex.extend_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.collection_success_amount,
      dataIndex: FieldIndex.collection_success_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.collection_success_count,
      dataIndex: FieldIndex.collection_success_count,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.collection_success_amount_rate,
      dataIndex: FieldRateIndex.collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        let color = 'black';
        let fontWeight = 400;
        let rate = (record.collection_success_amount! * 100) / record.e_amount!;
        let rate2 = 100 - rate
        if (rate2 > 30) {
          // 根据损益值的大小设定红色的深度
          const intensity = Math.min(Math.max(rate2, 0.63), 1); // 可根据需求调整1000的值
          const red = Math.floor(255 * intensity);
          color = `rgb(${red}, 0, 0)`;
          fontWeight = intensity * 1000;
        }
        return <span style={{color, fontWeight}}>{`${rate.toFixed(0)}%`}</span>;
      },
    },
    {
      title: FieldRateLabels.collection_success_count_rate,
      dataIndex: FieldRateIndex.collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        let color = 'black';
        let fontWeight = 400;
        let rate = (record.collection_success_count! * 100) / record.d_count!;
        let rate2 = 100 - rate
        if (rate2 > 30) {
          // 根据损益值的大小设定红色的深度
          const intensity = Math.min(Math.max(rate2, 0.63), 1); // 可根据需求调整1000的值
          const red = Math.floor(255 * intensity);
          color = `rgb(${red}, 0, 0)`;
          fontWeight = intensity * 1000;
        }
        return <span style={{color, fontWeight}}>{`${rate.toFixed(0)}%`}</span>;
      },
    },
    {
      title: FieldLabels['dpd-3_settled_count'],
      dataIndex: FieldIndex['dpd-3_settled_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-3_settled_amount'],
      dataIndex: FieldIndex['dpd-3_settled_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-3_part_count'],
      dataIndex: FieldIndex['dpd-3_part_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-3_part_amount'],
      dataIndex: FieldIndex['dpd-3_part_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-3_extend_count'],
      dataIndex: FieldIndex['dpd-3_extend_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-3_extend_amount'],
      dataIndex: FieldIndex['dpd-3_extend_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-3_collection_success_amount'],
      dataIndex: FieldIndex['dpd-3_collection_success_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-3_collection_success_count'],
      dataIndex: FieldIndex['dpd-3_collection_success_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels['dpd-3_collection_success_amount_rate'],
      dataIndex: FieldRateIndex['dpd-3_collection_success_amount_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd-3_collection_success_amount']! > 0) {
          return ((record['dpd-3_collection_success_amount']! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record['dpd-3_collection_success_amount']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels['dpd-3_collection_success_count_rate'],
      dataIndex: FieldRateIndex['dpd-3_collection_success_count_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd-3_collection_success_count']! > 0) {
          return ((record['dpd-3_collection_success_count']! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record['dpd-3_collection_success_count']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels['dpd-2_settled_count'],
      dataIndex: FieldIndex['dpd-2_settled_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-2_settled_amount'],
      dataIndex: FieldIndex['dpd-2_settled_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-2_part_count'],
      dataIndex: FieldIndex['dpd-2_part_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-2_part_amount'],
      dataIndex: FieldIndex['dpd-2_part_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-2_extend_count'],
      dataIndex: FieldIndex['dpd-2_extend_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-2_extend_amount'],
      dataIndex: FieldIndex['dpd-2_extend_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-2_collection_success_amount'],
      dataIndex: FieldIndex['dpd-2_collection_success_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-2_collection_success_count'],
      dataIndex: FieldIndex['dpd-2_collection_success_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels['dpd-2_collection_success_amount_rate'],
      dataIndex: FieldRateIndex['dpd-2_collection_success_amount_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd-2_collection_success_amount']! > 0) {
          return ((record['dpd-2_collection_success_amount']! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record['dpd-2_collection_success_amount']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels['dpd-2_collection_success_count_rate'],
      dataIndex: FieldRateIndex['dpd-2_collection_success_count_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd-2_collection_success_count']! > 0) {
          return ((record['dpd-2_collection_success_count']! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record['dpd-2_collection_success_count']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels['dpd-1_settled_count'],
      dataIndex: FieldIndex['dpd-1_settled_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-1_settled_amount'],
      dataIndex: FieldIndex['dpd-1_settled_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-1_part_count'],
      dataIndex: FieldIndex['dpd-1_part_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-1_part_amount'],
      dataIndex: FieldIndex['dpd-1_part_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-1_extend_count'],
      dataIndex: FieldIndex['dpd-1_extend_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-1_extend_amount'],
      dataIndex: FieldIndex['dpd-1_extend_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-1_collection_success_amount'],
      dataIndex: FieldIndex['dpd-1_collection_success_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd-1_collection_success_count'],
      dataIndex: FieldIndex['dpd-1_collection_success_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels['dpd-1_collection_success_amount_rate'],
      dataIndex: FieldRateIndex['dpd-1_collection_success_amount_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd-1_collection_success_amount']! > 0) {
          return ((record['dpd-1_collection_success_amount']! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record['dpd-1_collection_success_amount']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels['dpd-1_collection_success_count_rate'],
      dataIndex: FieldRateIndex['dpd-1_collection_success_count_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd-1_collection_success_count']! > 0) {
          return ((record['dpd-1_collection_success_count']! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record['dpd-1_collection_success_count']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      }
    },
    {
      title: FieldLabels.dpd0_settled_count,
      dataIndex: FieldIndex.dpd0_settled_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd0_settled_amount,
      dataIndex: FieldIndex.dpd0_settled_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd0_part_count,
      dataIndex: FieldIndex.dpd0_part_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd0_part_amount,
      dataIndex: FieldIndex.dpd0_part_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd0_extend_count,
      dataIndex: FieldIndex.dpd0_extend_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd0_extend_amount,
      dataIndex: FieldIndex.dpd0_extend_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd0_collection_success_amount,
      dataIndex: FieldIndex.dpd0_collection_success_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd0_collection_success_count,
      dataIndex: FieldIndex.dpd0_collection_success_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.dpd0_collection_success_amount_rate,
      dataIndex: FieldRateIndex.dpd0_collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd0_collection_success_amount! > 0) {
          return ((record.dpd0_collection_success_amount! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record.dpd0_collection_success_amount!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels.dpd0_collection_success_count_rate,
      dataIndex: FieldRateIndex.dpd0_collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd0_collection_success_count! > 0) {
          return ((record.dpd0_collection_success_count! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record.dpd0_collection_success_count!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels.dpd1_settled_count,
      dataIndex: FieldIndex.dpd1_settled_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd1_settled_amount,
      dataIndex: FieldIndex.dpd1_settled_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd1_part_count,
      dataIndex: FieldIndex.dpd1_part_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd1_part_amount,
      dataIndex: FieldIndex.dpd1_part_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd1_extend_count,
      dataIndex: FieldIndex.dpd1_extend_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd1_extend_amount,
      dataIndex: FieldIndex.dpd1_extend_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd1_collection_success_amount,
      dataIndex: FieldIndex.dpd1_collection_success_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd1_collection_success_count,
      dataIndex: FieldIndex.dpd1_collection_success_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.dpd1_collection_success_amount_rate,
      dataIndex: FieldRateIndex.dpd1_collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd1_collection_success_amount! > 0) {
          return ((record.dpd1_collection_success_amount! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record.dpd1_collection_success_amount!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },

    },
    {
      title: FieldRateLabels.dpd1_collection_success_count_rate,
      dataIndex: FieldRateIndex.dpd1_collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd1_collection_success_count! > 0) {
          return ((record.dpd1_collection_success_count! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record.dpd1_collection_success_count!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels.dpd2_settled_count,
      dataIndex: FieldIndex.dpd2_settled_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd2_settled_amount,
      dataIndex: FieldIndex.dpd2_settled_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd2_part_count,
      dataIndex: FieldIndex.dpd2_part_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd2_part_amount,
      dataIndex: FieldIndex.dpd2_part_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd2_extend_count,
      dataIndex: FieldIndex.dpd2_extend_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd2_extend_amount,
      dataIndex: FieldIndex.dpd2_extend_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd2_collection_success_amount,
      dataIndex: FieldIndex.dpd2_collection_success_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd2_collection_success_count,
      dataIndex: FieldIndex.dpd2_collection_success_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.dpd2_collection_success_amount_rate,
      dataIndex: FieldRateIndex.dpd2_collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd2_collection_success_amount! > 0) {
          return ((record.dpd2_collection_success_amount! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record.dpd2_collection_success_amount!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels.dpd2_collection_success_count_rate,
      dataIndex: FieldRateIndex.dpd2_collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd2_collection_success_count! > 0) {
          return ((record.dpd2_collection_success_count! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record.dpd2_collection_success_count!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels.dpd3_settled_count,
      dataIndex: FieldIndex.dpd3_settled_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd3_settled_amount,
      dataIndex: FieldIndex.dpd3_settled_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd3_part_count,
      dataIndex: FieldIndex.dpd3_part_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd3_part_amount,
      dataIndex: FieldIndex.dpd3_part_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd3_extend_count,
      dataIndex: FieldIndex.dpd3_extend_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd3_extend_amount,
      dataIndex: FieldIndex.dpd3_extend_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd3_collection_success_amount,
      dataIndex: FieldIndex.dpd3_collection_success_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd3_collection_success_count,
      dataIndex: FieldIndex.dpd3_collection_success_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.dpd3_collection_success_amount_rate,
      dataIndex: FieldRateIndex.dpd3_collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd3_collection_success_amount! > 0) {
          return ((record.dpd3_collection_success_amount! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record.dpd3_collection_success_amount!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels.dpd3_collection_success_count_rate,
      dataIndex: FieldRateIndex.dpd3_collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd3_collection_success_count! > 0) {
          return ((record.dpd3_collection_success_count! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record.dpd3_collection_success_count!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels.dpd4_settled_count,
      dataIndex: FieldIndex.dpd4_settled_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd4_settled_amount,
      dataIndex: FieldIndex.dpd4_settled_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd4_part_count,
      dataIndex: FieldIndex.dpd4_part_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd4_part_amount,
      dataIndex: FieldIndex.dpd4_part_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd4_extend_count,
      dataIndex: FieldIndex.dpd4_extend_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd4_extend_amount,
      dataIndex: FieldIndex.dpd4_extend_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd4_collection_success_amount,
      dataIndex: FieldIndex.dpd4_collection_success_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd4_collection_success_count,
      dataIndex: FieldIndex.dpd4_collection_success_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.dpd4_collection_success_amount_rate,
      dataIndex: FieldRateIndex.dpd4_collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd4_collection_success_amount! > 0) {
          return ((record.dpd4_collection_success_amount! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record.dpd4_collection_success_amount!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels.dpd4_collection_success_count_rate,
      dataIndex: FieldRateIndex.dpd4_collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd4_collection_success_count! > 0) {
          return ((record.dpd4_collection_success_count! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record.dpd4_collection_success_count!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels.dpd5_settled_count,
      dataIndex: FieldIndex.dpd5_settled_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd5_settled_amount,
      dataIndex: FieldIndex.dpd5_settled_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd5_part_count,
      dataIndex: FieldIndex.dpd5_part_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd5_part_amount,
      dataIndex: FieldIndex.dpd5_part_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd5_extend_count,
      dataIndex: FieldIndex.dpd5_extend_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd5_extend_amount,
      dataIndex: FieldIndex.dpd5_extend_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd5_collection_success_amount,
      dataIndex: FieldIndex.dpd5_collection_success_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd5_collection_success_count,
      dataIndex: FieldIndex.dpd5_collection_success_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.dpd5_collection_success_amount_rate,
      dataIndex: FieldRateIndex.dpd5_collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd5_collection_success_amount! > 0) {
          return ((record.dpd5_collection_success_amount! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record.dpd5_collection_success_amount!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels.dpd5_collection_success_count_rate,
      dataIndex: FieldRateIndex.dpd5_collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd5_collection_success_count! > 0) {
          return ((record.dpd5_collection_success_count! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record.dpd5_collection_success_count!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels.dpd6_settled_count,
      dataIndex: FieldIndex.dpd6_settled_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd6_settled_amount,
      dataIndex: FieldIndex.dpd6_settled_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd6_part_count,
      dataIndex: FieldIndex.dpd6_part_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd6_part_amount,
      dataIndex: FieldIndex.dpd6_part_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd6_extend_count,
      dataIndex: FieldIndex.dpd6_extend_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd6_extend_amount,
      dataIndex: FieldIndex.dpd6_extend_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd6_collection_success_amount,
      dataIndex: FieldIndex.dpd6_collection_success_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd6_collection_success_count,
      dataIndex: FieldIndex.dpd6_collection_success_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.dpd6_collection_success_amount_rate,
      dataIndex: FieldRateIndex.dpd6_collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd6_collection_success_amount! > 0) {
          return ((record.dpd6_collection_success_amount! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record.dpd6_collection_success_amount!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels.dpd6_collection_success_count_rate,
      dataIndex: FieldRateIndex.dpd6_collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd6_collection_success_count! > 0) {
          return ((record.dpd6_collection_success_count! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record.dpd6_collection_success_count!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels.dpd7_settled_count,
      dataIndex: FieldIndex.dpd7_settled_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd7_settled_amount,
      dataIndex: FieldIndex.dpd7_settled_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd7_part_count,
      dataIndex: FieldIndex.dpd7_part_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd7_part_amount,
      dataIndex: FieldIndex.dpd7_part_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd7_extend_count,
      dataIndex: FieldIndex.dpd7_extend_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd7_extend_amount,
      dataIndex: FieldIndex.dpd7_extend_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd7_collection_success_amount,
      dataIndex: FieldIndex.dpd7_collection_success_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd7_collection_success_count,
      dataIndex: FieldIndex.dpd7_collection_success_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.dpd7_collection_success_amount_rate,
      dataIndex: FieldRateIndex.dpd7_collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd7_collection_success_amount! > 0) {
          return ((record.dpd7_collection_success_amount! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record.dpd7_collection_success_amount!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels.dpd0_collection_success_count_rate,
      dataIndex: FieldRateIndex.dpd0_collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd0_collection_success_count! > 0) {
          return ((record.dpd0_collection_success_count! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record.dpd0_collection_success_count!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels['dpd8-15_settled_count'],
      dataIndex: FieldIndex['dpd8-15_settled_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd8-15_settled_amount'],
      dataIndex: FieldIndex['dpd8-15_settled_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd8-15_part_count'],
      dataIndex: FieldIndex['dpd8-15_part_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd8-15_part_amount'],
      dataIndex: FieldIndex['dpd8-15_part_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd8-15_extend_count'],
      dataIndex: FieldIndex['dpd8-15_extend_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd8-15_extend_amount'],
      dataIndex: FieldIndex['dpd8-15_extend_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd8-15_collection_success_amount'],
      dataIndex: FieldIndex['dpd8-15_collection_success_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd8-15_collection_success_count'],
      dataIndex: FieldIndex['dpd8-15_collection_success_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels['dpd8-15_collection_success_amount_rate'],
      dataIndex: FieldRateIndex['dpd8-15_collection_success_amount_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd8-15_collection_success_amount']! > 0) {
          return ((record['dpd8-15_collection_success_amount']! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record['dpd8-15_collection_success_amount']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels['dpd8-15_collection_success_count_rate'],
      dataIndex: FieldRateIndex['dpd8-15_collection_success_count_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd8-15_collection_success_count']! > 0) {
          return ((record['dpd8-15_collection_success_count']! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record['dpd8-15_collection_success_count']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels['dpd16-30_settled_count'],
      dataIndex: FieldIndex['dpd16-30_settled_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd16-30_settled_amount'],
      dataIndex: FieldIndex['dpd16-30_settled_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd16-30_part_count'],
      dataIndex: FieldIndex['dpd16-30_part_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd16-30_part_amount'],
      dataIndex: FieldIndex['dpd16-30_part_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd16-30_extend_count'],
      dataIndex: FieldIndex['dpd16-30_extend_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd16-30_extend_amount'],
      dataIndex: FieldIndex['dpd16-30_extend_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd16-30_collection_success_amount'],
      dataIndex: FieldIndex['dpd16-30_collection_success_amount'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels['dpd16-30_collection_success_count'],
      dataIndex: FieldIndex['dpd16-30_collection_success_count'],
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels['dpd16-30_collection_success_amount_rate'],
      dataIndex: FieldRateIndex['dpd16-30_collection_success_amount_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd16-30_collection_success_amount']! > 0) {
          return ((record['dpd16-30_collection_success_amount']! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record['dpd16-30_collection_success_amount']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels['dpd16-30_collection_success_count_rate'],
      dataIndex: FieldRateIndex['dpd16-30_collection_success_count_rate'],
      search: false,
      width: 80,
      render: (_, record) => {
        if (record['dpd16-30_collection_success_count']! > 0) {
          return ((record['dpd16-30_collection_success_count']! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record['dpd16-30_collection_success_count']!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldLabels.dpd31_settled_count,
      dataIndex: FieldIndex.dpd31_settled_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd31_settled_amount,
      dataIndex: FieldIndex.dpd31_settled_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd31_part_count,
      dataIndex: FieldIndex.dpd31_part_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd31_part_amount,
      dataIndex: FieldIndex.dpd31_part_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd31_extend_count,
      dataIndex: FieldIndex.dpd31_extend_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd31_extend_amount,
      dataIndex: FieldIndex.dpd31_extend_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd31_collection_success_amount,
      dataIndex: FieldIndex.dpd31_collection_success_amount,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.dpd31_collection_success_count,
      dataIndex: FieldIndex.dpd31_collection_success_count,
      hideInTable: isLite,
      search: false,
      width: 80,
    },
    {
      title: FieldRateLabels.dpd31_collection_success_amount_rate,
      dataIndex: FieldRateIndex.dpd31_collection_success_amount_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd31_collection_success_amount! > 0) {
          return ((record.dpd31_collection_success_amount! * 100) / record.collection_success_amount!).toFixed(0) + '%';
        } else if ((record.dpd31_collection_success_amount!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },
    {
      title: FieldRateLabels.dpd31_collection_success_count_rate,
      dataIndex: FieldRateIndex.dpd31_collection_success_count_rate,
      search: false,
      width: 80,
      render: (_, record) => {
        if (record.dpd31_collection_success_count! > 0) {
          return ((record.dpd31_collection_success_count! * 100) / record.collection_success_count!).toFixed(0) + '%';
        } else if ((record.dpd31_collection_success_count!) === 0) {
          return "0%"
        } else {
          return '-'
        }
      },
    },


  ];
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
      icon: <DownloadOutlined/>,
    },
  ];
  // @ts-ignore
  return (
    <PageContainer
      header={{
        // title: '营销统计',
        ghost: true,
        extra: [
          <Tooltip key="11" title="催员(多选) + 维度(单选)" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={!chartCountEnable}
              onClick={() => {
                if (chartChartType !== 'count') {
                  handleChartVisible(true)
                } else {
                  handleChartVisible(!chartVisible)
                }
                setChartChartType('count')
              }}
            >
              {chartChartType === 'count' && chartVisible
                ? '隐藏数量统计'
                : '显示数量统计'}
            </Button>
          </Tooltip>,
          <Tooltip key="1" title="催员(单选) + 维度(多选)" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={!chartAmountEnable}
              onClick={() => {
                if (chartChartType !== 'amount') {
                  handleChartVisible(true)
                } else {
                  handleChartVisible(!chartVisible)
                }
                setChartChartType('amount')
              }}
            >
              {chartChartType === 'amount' && chartVisible
                ? '隐藏金额统计'
                : '显示金额统计'}
            </Button>
          </Tooltip>,
          <Tooltip key="2" title="催员(单选) + 维度(多选)" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={!chartCustomizeEnable}
              onClick={() => {
                if (chartChartType !== 'customize') {
                  handleChartVisible(true)
                } else {
                  handleChartVisible(!chartVisible)
                }
                setChartChartType('customize')
              }}
            >
              {chartChartType === 'customize' && chartVisible
                ? '隐藏自定义统计'
                : '显示自定义统计'}
            </Button>
          </Tooltip>,
          <Button key="3" onClick={() => setIsLite(!isLite)}>
            {isLite ? '全部' : '精简'}
          </Button>,

          <Dropdown key="dropdown" trigger={['click']} menu={{items}}>
            <Button key="7" style={{padding: '0 8px'}}>
              <EllipsisOutlined/>
            </Button>
          </Dropdown>,
        ],
      }}
    >
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        bordered={true}
        scroll={{x: '50%'}}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 300,
        }}
        options={false}
        toolBarRender={() => [
          <div
            key="1"
            style={{height: 600, width: 1780, display: chartVisible ? 'block' : 'none'}}
          >
            {chartChartType === 'amount' || chartChartType === 'count' ?
              <Chart
                rawData={records}
                chartType={chartChartType}
              ></Chart> : <Chart2
                rawData={records}
                fields={fields}
                periods={periods}
              ></Chart2>
            }
          </div>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;

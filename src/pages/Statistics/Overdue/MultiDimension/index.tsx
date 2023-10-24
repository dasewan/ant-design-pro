import { BORROW_AMOUNT_GROUP, BORROW_COUNT_GROUP, PERIODS } from '@/pages/enums';
import { X_AXIS, Y_AXIS } from '@/pages/Statistics/enums';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import { getAdminV1ProductsEnum as getProductsEnum } from '@/services/ant-design-pro/BProduct';
import { getAdminV1GGRiskStrateiesEnums as getStrateiesEnums } from '@/services/ant-design-pro/GGRiskStratey';
import { getAdminV1WDMultiDimensionOverdues as index } from '@/services/ant-design-pro/WDMultiDimensionOverdue';
import {
  ProForm,
  ProFormCascader,
  ProFormDateRangePicker,
  ProFormSelect,
  QueryFilter,
} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [products, setProducts] = useState<RequestOptionsType[]>([]);
  const [records, setRecords] = useState<TableListItem[] | undefined>([]);
  /** 图表显隐 */
  const [chartVisible, handleChartVisible] = useState<boolean>(false);
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  const [strateies, setStrateies] = useState<RequestOptionsType[]>([]);
  /** 图例 */
  const legendMap: any = {
    b_product_id: products,
    c_a_period_index: PERIODS,
    c_b_channel_id: channels,
    c_c_borrow_count: BORROW_COUNT_GROUP,
    c_d_risk_strategy_id: strateies,
    c_e_borrow_amount: BORROW_AMOUNT_GROUP,
  };

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
    if (params.x === params.group || params.x === params.series || params.group === params.series) {
      message.error('不能有相同的维度');
      return false;
    }
    /*    value[0].$d !== undefined
          ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
          : value[0] + ' 00:00:00'*/
    params.a_expected_date[0] =
      params.a_expected_date[0].$d !== undefined
        ? moment(params.a_expected_date[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        : params.a_expected_date[0] + ' 00:00:00';
    params.a_expected_date[1] =
      params.a_expected_date[1].$d !== undefined
        ? moment(params.a_expected_date[1].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        : params.a_expected_date[1] + ' 00:00:00';
    let res;
    // @ts-ignore
    res = await index({ page: params.current, ...params });
    let dataFormat: any = [];
    res.data!.map((item: any) => {
      // dataFormat.push({x: item.x.toString(), y: Number(item.y), series: item.series.toString(), group: item.group.toString()})
      dataFormat.push({
        x: legendMap[params.x].find((item2: any) => {
          return item2.value === item.x.toString();
        }).label,
        y: Number(item.y),
        series: legendMap[params.series].find((item2: any) => {
          return item2.value === item.series.toString();
        })!.label,
        group: legendMap[params.group].find((item2: any) => {
          return item2.value === item.group.toString();
        })!.label,
      });
      return item;
    });
    setRecords(dataFormat);

    if (res.data!.length > 0) {
      handleChartVisible(true);
    } else {
      handleChartVisible(false);
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
   * 查询产品enum
   */
  const _getProductsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (products.length === 0) {
      const res = await getProductsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.b_name,
          value: item.id!.toString(),
        });
      }
      setProducts(data);
      return data;
    } else {
      return products;
    }
  };
  /**
   * 查询策略enum
   */
  const _getStrateiesEnums = async () => {
    const data: RequestOptionsType[] = [];
    if (strateies.length === 0) {
      const res = await getStrateiesEnums({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name + '(' + item.f_version + ')',
          value: item.id!.toString(),
        });
      }
      setStrateies(data);
      return data;
    } else {
      return strateies;
    }
  };

  /**
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length === 0) {
      const res = await getChannelsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_title,
          value: item.id!.toString(),
        });
      }
      setChannels(data);
      return data;
    } else {
      return channels;
    }
  };
  useEffect(() => {
    _getChannelsEnum({}, {});
    _getStrateiesEnums();
    _getProductsEnum({}, {});
    return () => {};
  }, []);
  // @ts-ignore
  return (
    <PageContainer
      header={{
        // title: '营销统计',
        ghost: true,
        extra: [
          <Button
            key="5"
            onClick={() =>
              window.open('/admin/v1/aLAdminFiles_templete/white_info_list.xlsx', '_blank')
            }
          >
            报表说明
          </Button>,
        ],
      }}
    >
      <>
        <div>
          <QueryFilter
            labelWidth="auto"
            span={4}
            onFinish={async (values: any) => {
              console.log(values);
              const a = await _index(values);
              console.log(a);
            }}
          >
            <ProForm.Group>
              <ProFormDateRangePicker
                name="a_expected_date"
                label="日期区间"
                rules={[{ required: true }]}
              />
              <ProFormSelect
                options={X_AXIS}
                // width="xs"
                name="x"
                label="x轴"
                rules={[{ required: true }]}
              />
              <ProFormCascader
                fieldProps={{
                  options: Y_AXIS,
                }}
                // width="xs"
                name="y"
                label="y轴"
                rules={[{ required: true }]}
              />
              <ProFormSelect
                options={X_AXIS}
                // width="xs"
                name="group"
                label="组"
                rules={[{ required: true }]}
              />
              <ProFormSelect
                options={X_AXIS}
                // width="xs"
                name="series"
                label="系列"
                rules={[{ required: true }]}
              />
            </ProForm.Group>
          </QueryFilter>
        </div>
      </>
      <div key="1" style={{ height: 600, width: 1780, display: chartVisible ? 'block' : 'none' }}>
        <Chart rawData={records}></Chart>
      </div>
    </PageContainer>
  );
};

export default TableList;

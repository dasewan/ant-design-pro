import { DIMENSIONS, DPDS, PERIODS } from '@/pages/enums';
import { getAdminV1ProductsEnum as getProductsEnum } from '@/services/ant-design-pro/BProduct';
import { getAdminV1WBProductOverdues as index } from '@/services/ant-design-pro/WBProductOverdue';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { isEqual } from 'lodash';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import Chart from './components/Chart';
import type { TableListItem, TableListPagination } from './data';
import styles from './index.less';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [products, setProducts] = useState<RequestOptionsType[]>([]);
  const [records, setRecords] = useState<TableListItem[] | undefined>([]);
  const [total, setTotal] = useState<number | undefined>(0);

  /** 图表显隐 */
  const [chartVisible, handleChartVisible] = useState<boolean>(false);
  /** 图表类型 line area */
  const [chartChartType, setChartChartType] = useState<string>('');
  /** 维度 */
  const [dimension, setDimension] = useState<string>('rate');
  const [showCount, setShowCount] = useState<boolean>(true);
  const [showCountRate, setShowCountRate] = useState<boolean>(true);
  const [showAmount, setShowAmount] = useState<boolean>(true);
  const [showAmountRate, setShowAmountRate] = useState<boolean>(true);
  const [preParams, setPreParams] = useState<any>();
  const [productIds, setProductIds] = useState<string[]>();
  const [dnds, setDnds] = useState<string[]>();

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
    let flag = 0;
    let params2 = { ...params };
    delete params2.dpd;
    delete params2.dimension;
    if (!isEqual(params2, preParams)) {
      setPreParams(params2);
      // @ts-ignore
      res = await index({ page: params.current, ...params });
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
    if (res.data!.length > 0) {
      flag++;
    }
    if (params.dimension !== undefined) {
      setDimension(params.dimension);
      flag++;
    }
    if (
      params.dpd !== undefined &&
      params.dpd.length === 1 &&
      params.b_product_id !== undefined &&
      params.b_product_id.length >= 1
    ) {
      setChartChartType('line');
      setProductIds(params.b_product_id);
      setDnds(params.dpd);
      flag++;
    } else if (
      (params.dpd === undefined || params.dpd.length === 0) &&
      params.b_product_id !== undefined &&
      params.b_product_id.length === 1
    ) {
      setChartChartType('area');
      setProductIds(params.b_product_id);
      setDnds(params.dpd);
      flag++;
    }
    if (flag !== 3) {
      handleChartVisible(false);
      setChartChartType('');
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_expected_date,
      dataIndex: FieldIndex.a_expected_date,
      width: 100,
      fixed: 'left',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'a_expected_date[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'a_expected_date[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
      render: (_, value) => {
        return moment(value.a_expected_date).format('YYYY-MM-DD');
      },
    },

    {
      title: FieldLabels.b_product_id,
      dataIndex: FieldIndex.b_product_id,
      width: 110,
      fixed: 'left',
      valueType: 'select',
      renderFormItem: () => {
        return (
          <ProFormSelect
            mode="multiple"
            name={FieldIndex.b_product_id}
            fieldProps={{ style: { width: 130 } }}
            // @ts-ignore
            options={products}
            placeholder="Please select"
          />
        );
      },
      request: _getProductsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.c_a_period_index,
      dataIndex: FieldIndex.c_a_period_index,
      renderFormItem: () => {
        return (
          <ProFormSelect
            name={FieldIndex.c_a_period_index}
            fieldProps={{ style: { width: 130 } }}
            options={PERIODS}
            placeholder="Please select"
          />
        );
      },
    },
    {
      title: 'DPD',
      dataIndex: 'dpd',
      renderFormItem: () => {
        return (
          <ProFormSelect
            mode="multiple"
            name="dpd"
            fieldProps={{ style: { width: 130 } }}
            options={DPDS}
            placeholder="Please select"
          />
        );
      },
    },
    {
      title: '维度',
      dataIndex: 'dimension',
      renderFormItem: () => {
        return (
          <ProFormSelect
            name="dimension"
            fieldProps={{ style: { width: 130 } }}
            options={DIMENSIONS}
            placeholder="Please select"
          />
        );
      },
    },
    {
      title: FieldLabels.c_expected_count,
      dataIndex: FieldIndex.c_expected_count,
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: FieldLabels.d_expected_amount,
      dataIndex: FieldIndex.d_expected_amount,
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: FieldLabels.e_settled_count,
      dataIndex: FieldIndex.e_settled_count,
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: FieldLabels.f_settled_amount,
      dataIndex: FieldIndex.f_settled_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.g_partial_count,
      dataIndex: FieldIndex.g_partial_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.h_partial_amount,
      dataIndex: FieldIndex.h_partial_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.i_extend_count,
      dataIndex: FieldIndex.i_extend_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.j_extend_amount,
      dataIndex: FieldIndex.j_extend_amount,
      search: false,
      width: 80,
    },
    {
      title: '逾期率',
      search: false,
      hideInTable: !showCountRate,
      children: [
        {
          title: FieldLabels.m_DPD0_count_rate,
          dataIndex: FieldIndex.m_DPD0_count_rate,
          width: 80,
          render: (_, value) => {
            return `${value.m_DPD0_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.q_DPD1_count_rate,
          dataIndex: FieldIndex.q_DPD1_count_rate,
          className: styles.blue,
          width: 80,
          render: (_, value) => {
            return `${value.q_DPD1_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.u_DPD2_count_rate,
          dataIndex: FieldIndex.u_DPD2_count_rate,
          width: 80,
          render: (_, value) => {
            return `${value.u_DPD2_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.y_DPD3_count_rate,
          dataIndex: FieldIndex.y_DPD3_count_rate,
          width: 80,
          render: (_, value) => {
            return `${value.y_DPD3_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_c_DPD4_count_rate,
          dataIndex: FieldIndex.a_c_DPD4_count_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_c_DPD4_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_g_DPD5_count_rate,
          dataIndex: FieldIndex.a_g_DPD5_count_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_g_DPD5_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_k_DPD7_count_rate,
          dataIndex: FieldIndex.a_k_DPD7_count_rate,
          className: styles.blue,
          width: 80,
          render: (_, value) => {
            return `${value.a_k_DPD7_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_o_DPD15_count_rate,
          dataIndex: FieldIndex.a_o_DPD15_count_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_o_DPD15_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_s_DPD30_count_rate,
          dataIndex: FieldIndex.a_s_DPD30_count_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_s_DPD30_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_w_DPD60_count_rate,
          dataIndex: FieldIndex.a_w_DPD60_count_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_w_DPD60_count_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels['b_a_DPD60+_count_rate'],
          dataIndex: FieldIndex['b_a_DPD60+_count_rate'],
          width: 80,
          render: (_, value) => {
            return `${value['b_a_DPD60+_count_rate']!.toFixed(0)}%`;
          },
        },
      ],
    },
    {
      title: '逾期数',
      search: false,
      hideInTable: !showCount,
      children: [
        {
          title: FieldLabels.k_DPD0_count,
          dataIndex: FieldIndex.k_DPD0_count,
          width: 80,
        },
        {
          title: FieldLabels.o_DPD1_count,
          dataIndex: FieldIndex.o_DPD1_count,
          className: styles.blue,
          width: 80,
        },
        {
          title: FieldLabels.s_DPD2_count,
          dataIndex: FieldIndex.s_DPD2_count,
          width: 80,
        },
        {
          title: FieldLabels.w_DPD3_count,
          dataIndex: FieldIndex.w_DPD3_count,
          width: 80,
        },
        {
          title: FieldLabels.a_a_DPD4_count,
          dataIndex: FieldIndex.a_a_DPD4_count,
          width: 80,
        },
        {
          title: FieldLabels.a_e_DPD5_count,
          dataIndex: FieldIndex.a_e_DPD5_count,
          width: 80,
        },
        {
          title: FieldLabels.a_i_DPD7_count,
          dataIndex: FieldIndex.a_i_DPD7_count,
          width: 80,
        },
        {
          title: FieldLabels.a_m_DPD15_count,
          dataIndex: FieldIndex.a_m_DPD15_count,
          className: styles.blue,
          width: 80,
        },
        {
          title: FieldLabels.a_q_DPD30_count,
          dataIndex: FieldIndex.a_q_DPD30_count,
          width: 80,
        },
        {
          title: FieldLabels.a_u_DPD60_count,
          dataIndex: FieldIndex.a_u_DPD60_count,
          width: 80,
        },
        {
          title: FieldLabels['a_y_DPD60+_count'],
          dataIndex: FieldIndex['a_y_DPD60+_count'],
          width: 80,
        },
      ],
    },
    {
      title: '金额逾期率',
      search: false,
      className: styles.blue,
      hideInTable: !showAmountRate,
      children: [
        {
          title: FieldLabels.n_DPD0_amount_rate,
          dataIndex: FieldIndex.n_DPD0_amount_rate,
          width: 80,
          render: (_, value) => {
            return `${value.n_DPD0_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.r_DPD1_amount_rate,
          dataIndex: FieldIndex.r_DPD1_amount_rate,
          className: styles.blue,
          width: 80,
          render: (_, value) => {
            return `${value.r_DPD1_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.v_DPD2_amount_rate,
          dataIndex: FieldIndex.v_DPD2_amount_rate,
          width: 80,
          render: (_, value) => {
            return `${value.v_DPD2_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.z_DPD3_amount_rate,
          dataIndex: FieldIndex.z_DPD3_amount_rate,
          width: 80,
          render: (_, value) => {
            return `${value.z_DPD3_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_d_DPD4_amount_rate,
          dataIndex: FieldIndex.a_d_DPD4_amount_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_d_DPD4_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_h_DPD5_amount_rate,
          dataIndex: FieldIndex.a_h_DPD5_amount_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_h_DPD5_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_l_DPD7_amount_rate,
          dataIndex: FieldIndex.a_l_DPD7_amount_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_l_DPD7_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_p_DPD15_amount_rate,
          dataIndex: FieldIndex.a_p_DPD15_amount_rate,
          className: styles.blue,
          width: 80,
          render: (_, value) => {
            return `${value.a_p_DPD15_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_t_DPD30_amount_rate,
          dataIndex: FieldIndex.a_t_DPD30_amount_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_t_DPD30_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels.a_x_DPD60_amount_rate,
          dataIndex: FieldIndex.a_x_DPD60_amount_rate,
          width: 80,
          render: (_, value) => {
            return `${value.a_x_DPD60_amount_rate!.toFixed(0)}%`;
          },
        },
        {
          title: FieldLabels['b_b_DPD60+_amount_rate'],
          dataIndex: FieldIndex['b_b_DPD60+_amount_rate'],
          width: 80,
          render: (_, value) => {
            return `${value['b_b_DPD60+_amount_rate']!.toFixed(0)}%`;
          },
        },
      ],
    },

    {
      title: '逾期金额',
      search: false,
      className: styles.blue,
      hideInTable: !showAmount,
      children: [
        {
          title: FieldLabels.l_DPD0_amount,
          dataIndex: FieldIndex.l_DPD0_amount,
          width: 80,
        },
        {
          title: FieldLabels.p_DPD1_amount,
          dataIndex: FieldIndex.p_DPD1_amount,
          className: styles.blue,
          width: 80,
        },
        {
          title: FieldLabels.t_DPD2_amount,
          dataIndex: FieldIndex.t_DPD2_amount,
          width: 80,
        },
        {
          title: FieldLabels.x_DPD3_amount,
          dataIndex: FieldIndex.x_DPD3_amount,
          width: 80,
        },
        {
          title: FieldLabels.a_b_DPD4_amount,
          dataIndex: FieldIndex.a_b_DPD4_amount,
          width: 80,
        },
        {
          title: FieldLabels.a_f_DPD5_amount,
          dataIndex: FieldIndex.a_f_DPD5_amount,
          width: 80,
        },
        {
          title: FieldLabels.a_j_DPD7_amount,
          dataIndex: FieldIndex.a_j_DPD7_amount,
          width: 80,
        },
        {
          title: FieldLabels.a_n_DPD15_amount,
          dataIndex: FieldIndex.a_n_DPD15_amount,
          width: 80,
        },
        {
          title: FieldLabels.a_r_DPD30_amount,
          dataIndex: FieldIndex.a_r_DPD30_amount,
          className: styles.blue,
          width: 80,
        },
        {
          title: FieldLabels.a_v_DPD60_amount,
          dataIndex: FieldIndex.a_v_DPD60_amount,
          width: 80,
        },
        {
          title: FieldLabels['a_z_DPD60+_amount'],
          dataIndex: FieldIndex['a_z_DPD60+_amount'],
          width: 80,
        },
      ],
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
          <Tooltip key="11" title="应还日期(区间) + 产品(单选) + 维度" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={chartChartType !== 'area'}
              onClick={() => handleChartVisible(!chartVisible)}
            >
              {chartChartType !== 'area'
                ? '显示面积图'
                : !chartVisible && chartChartType === 'area'
                ? '显示面积图'
                : '隐藏面积图'}
            </Button>
          </Tooltip>,
          <Tooltip key="1" title="应还日期(区间) + 产品(多选) + DPD(单选) + 维度" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={chartChartType !== 'line'}
              onClick={() => handleChartVisible(!chartVisible)}
            >
              {chartChartType !== 'line'
                ? '显示折线图'
                : !chartVisible && chartChartType === 'line'
                ? '显示折线图'
                : '隐藏折线图'}
            </Button>
          </Tooltip>,
          <Button key="2" onClick={() => setShowCountRate(!showCountRate)}>
            {showCountRate ? '隐藏逾期率%' : '显示逾期率%'}
          </Button>,
          <Button key="3" onClick={() => setShowCount(!showCount)}>
            {showCount ? '隐藏逾期数' : '显示逾期数'}
          </Button>,
          <Button key="4" onClick={() => setShowAmountRate(!showAmountRate)}>
            {showAmountRate ? '隐藏金额逾期率%' : '显示金额逾期率%'}
          </Button>,
          <Button key="5" onClick={() => setShowAmount(!showAmount)}>
            {showAmount ? '隐藏逾期金额' : '显示逾期金额'}
          </Button>,
          <Dropdown key="dropdown" trigger={['click']} menu={{ items }}>
            <Button key="7" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ],
      }}
    >
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          span: 4,
        }}
        bordered={true}
        scroll={{ x: '50%' }}
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
            style={{ height: 600, width: 1780, display: chartVisible ? 'block' : 'none' }}
          >
            <Chart
              rawData={records}
              chartType={chartChartType}
              dimension={dimension}
              products={products}
              productIds={productIds}
              dnds={dnds}
            ></Chart>
          </div>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;

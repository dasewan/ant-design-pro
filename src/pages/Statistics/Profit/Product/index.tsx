import { getAdminV1ProductsEnum as getProductsEnum } from '@/services/ant-design-pro/BProduct';
import { getAdminV1WEProductProfits as index } from '@/services/ant-design-pro/WEProductProfit';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import Chart from './components/Chart';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [products, setProducts] = useState<RequestOptionsType[]>([]);
  const [records, setRecords] = useState<TableListItem[] | undefined>([]);

  /** 图表显隐 */
  const [chartVisible, handleChartVisible] = useState<boolean>(false);

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
    // @ts-ignore
    let res = await index({ page: params.current, ...params });
    setRecords(res.data);
    if (res.data.length > 0) {
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_loan_date,
      dataIndex: FieldIndex.id,
      width: 100,
      fixed: 'left',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'a_loan_date[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'a_loan_date[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
      render: (_, value) => {
        return moment(value.a_loan_date).format('YYYY-MM-DD');
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
      title: FieldLabels.c_loan_count,
      dataIndex: FieldIndex.c_loan_count,
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: FieldLabels.d_loan_period_count,
      dataIndex: FieldIndex.d_loan_period_count,
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
      title: FieldLabels.f_settled_period_count,
      dataIndex: FieldIndex.f_settled_period_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.g_loan_amount,
      dataIndex: FieldIndex.g_loan_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.h_repay_amount,
      dataIndex: FieldIndex.h_repay_amount,
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
      title: FieldLabels.l_repay_amount_rate,
      dataIndex: FieldIndex.l_repay_amount_rate,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.m_profit_amount_rate,
      dataIndex: FieldIndex.m_profit_amount_rate,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.n_profit,
      dataIndex: FieldIndex.n_profit,
      search: false,
      width: 80,
      render: (_, record) => {
        let color = 'black';
        let fontWeight = 400;
        if (record.n_profit! < 0) {
          // 根据损益值的大小设定红色的深度
          const intensity = Math.min(Math.max(Math.abs(record.n_profit!) / 100000, 0.63), 1); // 可根据需求调整1000的值
          const red = Math.floor(255 * intensity);
          color = `rgb(${red}, 0, 0)`;
          fontWeight = intensity * 1000;
        }
        return <span style={{ color, fontWeight }}>{record.n_profit}</span>;
      },
    },
    {
      title: FieldLabels.o_period1_profit,
      dataIndex: FieldIndex.o_period1_profit,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.p_period2_profit,
      dataIndex: FieldIndex.p_period2_profit,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.q_period3_profit,
      dataIndex: FieldIndex.q_period3_profit,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.r_period4_profit,
      dataIndex: FieldIndex.r_period4_profit,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.s_period5_profit,
      dataIndex: FieldIndex.s_period5_profit,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.t_period6_profit,
      dataIndex: FieldIndex.t_period6_profit,
      search: false,
      width: 80,
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
              disabled={!chartVisible}
              onClick={() => handleChartVisible(!chartVisible)}
            >
              {!chartVisible ? '显示综合分析' : '隐藏综合分析'}
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
            style={{ height: 900, width: 1780, display: chartVisible ? 'block' : 'none' }}
          >
            <Chart rawData={records} products={products}></Chart>
          </div>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;

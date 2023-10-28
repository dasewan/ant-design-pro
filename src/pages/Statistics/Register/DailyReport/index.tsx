import Chart from '@/pages/Statistics/Register/DailyReport/components/Chart';
import { getAdminV1WFDailyReports as index } from '@/services/ant-design-pro/WFDailyReport';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { isEqual } from 'lodash';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { DIMENSIONS, FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [records, setRecords] = useState<TableListItem[]>([]);
  /** 图表显隐 */
  const [chartVisible, handleChartVisible] = useState<boolean>(false);
  /** 图表类型 area column */
  const [chartChartType, setChartChartType] = useState<string>('');
  /** 图表类型 time channel */
  const [preParams, setPreParams] = useState<any>();
  const [total, setTotal] = useState<number | undefined>(0);
  /** 维度 */
  const [dimension, setDimension] = useState<string[]>([]);

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
    let res;
    let params2 = { ...params };
    delete params2.dimension;
    if (!isEqual(params2, preParams)) {
      setPreParams(params2);
      // @ts-ignore
      res = await index({ page: params.current, ...params });
      setRecords(res.data!);
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
    setDimension(params.dimension);
    if (res.data!.length > 0 && params.dimension !== undefined && params.dimension.length > 0) {
      handleChartVisible(true);
    } else {
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_date,
      dataIndex: FieldIndex.id,
      width: 110,
      fixed: 'left',
      valueType: 'dateRange',
      render: (_, value) => {
        return moment(value.a_date).format('YYYY-MM-DD');
      },
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
    },
    {
      title: '维度',
      tooltip: '各个维度之间大多是无关联或弱关联，请选择适当的维度生成',
      dataIndex: 'dimension',
      renderFormItem: () => {
        return (
          <ProFormSelect
            mode="multiple"
            name="dimension"
            fieldProps={{ style: { width: 130 } }}
            options={DIMENSIONS}
            placeholder="Please select"
          />
        );
      },
    },
    {
      title: FieldLabels.b_register_count,
      dataIndex: FieldIndex.b_register_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.c_black_count,
      dataIndex: FieldIndex.c_black_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.d_white_count,
      dataIndex: FieldIndex.d_white_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.e_grey_count,
      dataIndex: FieldIndex.e_grey_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.f_certification_count,
      dataIndex: FieldIndex.f_certification_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.g_machine_accept_count,
      dataIndex: FieldIndex.g_machine_accept_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.h_machine_refuse_count,
      dataIndex: FieldIndex.h_machine_refuse_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.i_review_count,
      dataIndex: FieldIndex.i_review_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.j_review_accept_count,
      dataIndex: FieldIndex.j_review_accept_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.k_review_refuse_count,
      dataIndex: FieldIndex.k_review_refuse_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.l_loan_count,
      dataIndex: FieldIndex.l_loan_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.m_loan_period_count,
      dataIndex: FieldIndex.m_loan_period_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.n_loan_amount,
      dataIndex: FieldIndex.n_loan_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.o_re_loan_count,
      dataIndex: FieldIndex.o_re_loan_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.p_re_loan_amount,
      dataIndex: FieldIndex.p_re_loan_amount,
      search: false,
      width: 110,
    },
    {
      title: FieldLabels.q_loan_fail_count,
      dataIndex: FieldIndex.q_loan_fail_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.r_loan_intercept_count,
      dataIndex: FieldIndex.r_loan_intercept_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.s_settled_count,
      dataIndex: FieldIndex.s_settled_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.t_settled_period_count,
      dataIndex: FieldIndex.t_settled_period_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.u_repay_amount,
      dataIndex: FieldIndex.u_repay_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.v_re_repay_count,
      dataIndex: FieldIndex.v_re_repay_count,
      search: false,
      width: 100,
    },
    {
      title: FieldLabels.w_re_repay_amount,
      dataIndex: FieldIndex.w_re_repay_amount,
      search: false,
      width: 110,
    },
    {
      title: FieldLabels.x_repay_fail_count,
      dataIndex: FieldIndex.x_repay_fail_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.y_extend_count,
      dataIndex: FieldIndex.y_extend_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.z_extend_amount,
      dataIndex: FieldIndex.z_extend_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_a_reduce_count,
      dataIndex: FieldIndex.a_a_reduce_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_b_reduce_amount,
      dataIndex: FieldIndex.a_b_reduce_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_c_collection_count,
      dataIndex: FieldIndex.a_c_collection_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_d_collection_log_count,
      dataIndex: FieldIndex.a_d_collection_log_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_e_collection_success_count,
      dataIndex: FieldIndex.a_e_collection_success_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_f_collection_success_amount,
      dataIndex: FieldIndex.a_f_collection_success_amount,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_g_otp_sms_count,
      dataIndex: FieldIndex.a_g_otp_sms_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_h_notification_sms_count,
      dataIndex: FieldIndex.a_h_notification_sms_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.a_i_marketing_sms_count,
      dataIndex: FieldIndex.a_i_marketing_sms_count,
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
        ghost: true,
        extra: [
          <Tooltip key="1" title="首次营销日期(区间) + 渠道" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={!chartVisible}
              onClick={() => {
                if (chartVisible && chartChartType !== 'column') {
                  setChartChartType('column');
                } else {
                  setChartChartType('');
                }
              }}
            >
              {chartChartType !== 'column'
                ? '显示渠道对比柱状图'
                : !chartVisible && chartChartType === 'column'
                ? '显示渠道对比柱状图'
                : '隐藏渠道对比柱状图'}
            </Button>
          </Tooltip>,
          <Tooltip key="111" title="首次营销日期(指定一天)" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={!chartVisible}
              onClick={() => {
                if (chartVisible && chartChartType !== 'line') {
                  setChartChartType('line');
                } else {
                  setChartChartType('');
                }
              }}
            >
              {chartChartType !== 'line'
                ? '显示折线图'
                : !chartVisible && chartChartType === 'line'
                ? '显示折线图'
                : '隐藏折线图'}
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
          labelWidth: 120,
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
            style={{
              height: 600,
              width: 1780,
              display: chartVisible && chartChartType !== '' ? 'block' : 'none',
            }}
          >
            <Chart rawData={records} chartType={chartChartType} dimension={dimension}></Chart>
          </div>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;

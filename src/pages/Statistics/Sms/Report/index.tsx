import {getAdminV1WQSmsReports as index} from '@/services/ant-design-pro/WQSmsReport';
import {DownloadOutlined, EllipsisOutlined} from '@ant-design/icons';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {Button, Dropdown, MenuProps, Tooltip} from 'antd';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import type {TableListItem, TableListPagination} from './data';
import {FieldIndex, FieldLabels, FieldOptions2} from './service';
import {isEqual} from "lodash";
import Chart2 from "@/pages/Statistics/Sms/Report/components/Chart2";

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [records, setRecords] = useState<TableListItem[]>([]);

  /** 图表显隐 */
  const [chartVisible, handleChartVisible] = useState<boolean>(false);
  const [preParams, setPreParams] = useState<any>();
  const [total, setTotal] = useState<number | undefined>(0);
  const [field, setField] = useState<string>('e_success_count');
  const [chartChartType, setChartChartType] = useState<string>('');

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
    setField(params.field);
    setRecords(res.data);
    console.log(params)
    if (res.data!.length > 0 && params.field !== undefined && params.field !== "") {
      setChartChartType('chart');
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_date,
      dataIndex: FieldIndex.a_date,
      width: 100,
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
        return moment(record.a_date).format('YYYY-MM-DD');
      },
    },

    {
      title: FieldLabels.b_name,
      dataIndex: FieldIndex.b_name,
      width: 80,
    },
    {
      title: '维度',
      dataIndex: 'field',
      hideInTable: true,
      valueType: 'select',
      valueEnum: FieldOptions2,
    },
    {
      title: FieldLabels.c_sented_count,
      dataIndex: FieldIndex.c_sented_count,
      search: false,
      width: 80,
    },

    {
      title: FieldLabels.d_delivered_count,
      dataIndex: FieldIndex.d_delivered_count,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.e_delivered_rate,
      dataIndex: FieldIndex.e_delivered_rate,
      search: false,
      width: 80,
    },
    {
      title: FieldLabels.f_total_amount,
      dataIndex: FieldIndex.f_total_amount,
      search: false,
      width: 80,
    },
    {
      title: '按渠道',
      dataIndex: '按渠道',
      search: false,
      width: 80,
      children: [
        {
          title: FieldLabels.g_otp_count,
          dataIndex: FieldIndex.g_otp_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.h_marketing_count,
          dataIndex: FieldIndex.h_marketing_count,
          search: false,
          width: 80,
        }, {
          title: FieldLabels.i_notify_count,
          dataIndex: FieldIndex.i_notify_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.j_otp_success_rate,
          dataIndex: FieldIndex.j_otp_success_rate,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.k_marketing_success_rate,
          dataIndex: FieldIndex.k_marketing_success_rate,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_notify_success_rate,
          dataIndex: FieldIndex.l_notify_success_rate,
          search: false,
          width: 80,
        },
      ]
    },
    {
      title: '按来源',
      dataIndex: '按来源',
      search: false,
      width: 80,
      children: [
        {
          title: FieldLabels.m_system_notify_count,
          dataIndex: FieldIndex.m_system_notify_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_crontab_notify_count,
          dataIndex: FieldIndex.n_crontab_notify_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_admin_sent_count,
          dataIndex: FieldIndex.o_admin_sent_count,
          search: false,
          width: 80,
        },
      ]
    },
    {
      title: '按目标',
      dataIndex: '按目标',
      search: false,
      width: 80,
      children: [
        {
          title: FieldLabels.p_contact_count,
          dataIndex: FieldIndex.p_contact_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_user_count,
          dataIndex: FieldIndex.q_user_count,
          search: false,
          width: 80,
        },
      ]
    },
    {
      title: '按时间',
      dataIndex: '按时间',
      search: false,
      width: 80,
      children: [
        {
          title: FieldLabels.r_bdpd_count,
          dataIndex: FieldIndex.r_bdpd_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.s_dpd0_count,
          dataIndex: FieldIndex.s_dpd0_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.t_dpd1_3_count,
          dataIndex: FieldIndex.t_dpd1_3_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.u_dpd4_7_count,
          dataIndex: FieldIndex.u_dpd4_7_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.v_dpd8_15_count,
          dataIndex: FieldIndex.v_dpd8_15_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.w_dpd16_count,
          dataIndex: FieldIndex.w_dpd16_count,
          search: false,
          width: 80,
        },
      ]
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
          <Tooltip key="11" title=" 维度(单选)" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={chartChartType !== 'chart'}
              onClick={() => handleChartVisible(!chartVisible)}
            >
              {chartChartType !== 'chart'
                ? '显示报表'
                : !chartVisible && chartChartType === 'chart'
                  ? '显示报表'
                  : '隐藏报表'}
            </Button>
          </Tooltip>,
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
        search={{
          span: 4,
        }}
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
            <Chart2 rawData={records} field={field}></Chart2>
          </div>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;

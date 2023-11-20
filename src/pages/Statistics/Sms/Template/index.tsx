import {getAdminV1WRSmsTemplates as index} from '@/services/ant-design-pro/WRSmsTemplate';
import {DownloadOutlined, EllipsisOutlined} from '@ant-design/icons';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {Button, Dropdown, MenuProps} from 'antd';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import type {TableListItem, TableListPagination} from './data';
import {FieldIndex, FieldLabels} from './service';
import {isEqual} from "lodash";
import Chart2 from "@/pages/Statistics/Sms/Template/components/Chart2";

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [records, setRecords] = useState<TableListItem[]>([]);

  /** 图表显隐 */
  const [chartVisible, handleChartVisible] = useState<boolean>(false);
  const [preParams, setPreParams] = useState<any>();
  const [total, setTotal] = useState<number | undefined>(0);
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
    setRecords(res.data);
    console.log(params)
    if (res.data!.length > 0) {
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
      title: FieldLabels.b_template_count,
      dataIndex: FieldIndex.b_template_count,
      width: 80,
    },
    {
      title: FieldLabels.c_template_count,
      dataIndex: FieldIndex.c_template_count,
      width: 80,
    },
    {
      title: FieldLabels.d_template_count,
      dataIndex: FieldIndex.d_template_count,
      width: 80,
    },
    {
      title: FieldLabels.e_template_count,
      dataIndex: FieldIndex.e_template_count,
      width: 80,
    },
    {
      title: FieldLabels.f_template_count,
      dataIndex: FieldIndex.f_template_count,
      width: 80,
    },
    {
      title: FieldLabels.g_template_count,
      dataIndex: FieldIndex.g_template_count,
      width: 80,
    },
    {
      title: FieldLabels.h_template_count,
      dataIndex: FieldIndex.h_template_count,
      width: 80,
    },
    {
      title: FieldLabels.i_template_count,
      dataIndex: FieldIndex.i_template_count,
      width: 80,
    },
    {
      title: FieldLabels.j_template_count,
      dataIndex: FieldIndex.j_template_count,
      width: 80,
    },
    {
      title: FieldLabels.k_template_count,
      dataIndex: FieldIndex.k_template_count,
      width: 80,
    },
    {
      title: FieldLabels.l_template_count,
      dataIndex: FieldIndex.l_template_count,
      width: 80,
    },
    {
      title: FieldLabels.m_template_count,
      dataIndex: FieldIndex.m_template_count,
      width: 80,
    },
    {
      title: FieldLabels.n_template_count,
      dataIndex: FieldIndex.n_template_count,
      width: 80,
    },
    {
      title: FieldLabels.o_template_count,
      dataIndex: FieldIndex.o_template_count,
      width: 80,
    },
    {
      title: FieldLabels.p_template_count,
      dataIndex: FieldIndex.p_template_count,
      width: 80,
    },
    {
      title: FieldLabels.q_template_count,
      dataIndex: FieldIndex.q_template_count,
      width: 80,
    },
    {
      title: FieldLabels.r_template_count,
      dataIndex: FieldIndex.r_template_count,
      width: 80,
    },
    {
      title: FieldLabels.s_template_count,
      dataIndex: FieldIndex.s_template_count,
      width: 80,
    },
    {
      title: FieldLabels.t_template_count,
      dataIndex: FieldIndex.t_template_count,
      width: 80,
    },
    {
      title: FieldLabels.u_template_count,
      dataIndex: FieldIndex.u_template_count,
      width: 80,
    },
    {
      title: FieldLabels.v_template_count,
      dataIndex: FieldIndex.v_template_count,
      width: 80,
    },
    {
      title: FieldLabels.w_template_count,
      dataIndex: FieldIndex.w_template_count,
      width: 80,
    },
    {
      title: FieldLabels.x_template_count,
      dataIndex: FieldIndex.x_template_count,
      width: 80,
    },
    {
      title: FieldLabels.y_template_count,
      dataIndex: FieldIndex.y_template_count,
      width: 80,
    },
    {
      title: FieldLabels.z_template_count,
      dataIndex: FieldIndex.z_template_count,
      width: 80,
    },
    {
      title: FieldLabels.a_a_template_count,
      dataIndex: FieldIndex.a_a_template_count,
      width: 80,
    },
    {
      title: FieldLabels.a_b_template_count,
      dataIndex: FieldIndex.a_b_template_count,
      width: 80,
    },
    {
      title: FieldLabels.a_c_template_count,
      dataIndex: FieldIndex.a_c_template_count,
      width: 80,
    },
    {
      title: FieldLabels.a_d_template_count,
      dataIndex: FieldIndex.a_d_template_count,
      width: 80,
    },
    {
      title: FieldLabels.a_e_template_count,
      dataIndex: FieldIndex.a_e_template_count,
      width: 80,
    }, {
      title: FieldLabels.a_f_template_count,
      dataIndex: FieldIndex.a_f_template_count,
      width: 80,
    }, {
      title: FieldLabels.a_g_template_count,
      dataIndex: FieldIndex.a_g_template_count,
      width: 80,
    }, {
      title: FieldLabels.a_h_template_count,
      dataIndex: FieldIndex.a_h_template_count,
      width: 80,
    }, {
      title: FieldLabels.a_i_template_count,
      dataIndex: FieldIndex.a_i_template_count,
      width: 80,
    }, {
      title: FieldLabels.a_j_template_count,
      dataIndex: FieldIndex.a_j_template_count,
      width: 80,
    }, {
      title: FieldLabels.a_k_template_count,
      dataIndex: FieldIndex.a_k_template_count,
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
            <Chart2 rawData={records}></Chart2>
          </div>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;

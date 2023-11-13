import Chart from '@/pages/Statistics/Collection/Admin/components/Chart';
import Chart2 from '@/pages/Statistics/Collection/Admin/components/Chart2';
import { FieldOptions, FieldOptions2 } from '@/pages/Statistics/enums';
import { getAdminV1GMCollectionAdminsEnum as getCollectionAdminsEnum } from '@/services/ant-design-pro/GMCollectionAdmin';
import { getAdminV1HECollectionGroupsEnum as getCollectionGroupsEnum } from '@/services/ant-design-pro/HECollectionGroup';
import { getAdminV1TCollectionAgenciesEnum as getCollectionAgenciesEnum } from '@/services/ant-design-pro/TCollectionAgency';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { getAdminV1WLCollectionAdmins as index } from '@/services/ant-design-pro/WLCollectionAdmin';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { isEqual } from 'lodash';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

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
  /** 维度 */
  const [dimension, setDimension] = useState<string | string[]>('l_a_collection_total_count');
  const [adminMultiple, setAdminMultiple] = useState<boolean>(true);
  const [dimensionMultiple, setDimensionMultiple] = useState<boolean>(false);

  const [preParams, setPreParams] = useState<any>();
  const [collectionAdmins, setCollectionAdmins] = useState<RequestOptionsType[]>([]);
  const [collectionAgencies, setCollectionAgencies] = useState<RequestOptionsType[]>([]);
  const [collectionGroups, setCollectionGroups] = useState<RequestOptionsType[]>([]);
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);

  /**
   * 查询组enum
   */
  const _getCollectionGroupsEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionGroups.length === 0) {
      const res = await getCollectionGroupsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
          c_collection_agency_id: item.c_collection_agency_id,
          f_status: item.f_status,
        });
      }
      setCollectionGroups(data);
      return data;
    } else {
      return collectionGroups;
    }
  };
  /**
   * 查询机构enum
   */
  const _getCollectionAgenciesEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionAgencies.length === 0) {
      const res = await getCollectionAgenciesEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setCollectionAgencies(data);
      return data;
    } else {
      return collectionAgencies;
    }
  };
  /**
   * 查询管理员enum
   */
  const _getCollectionAdminsEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (collectionAdmins.length === 0) {
      const res = await getCollectionAdminsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
          d_collection_group_id: item.d_collection_group_id,
          f_status: item.f_status,
        });
      }
      setCollectionAdmins(data);
      return data;
    } else {
      return collectionAdmins;
    }
  };
  /**
   * 查询管理员enum
   */
  const _getUsersEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length === 0) {
      const res = await getUsersEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.name,
          value: item.id,
        });
      }
      setAdmins(data);
      return data;
    } else {
      return admins;
    }
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
    let res;
    let flag = 0;
    let params2 = { ...params };
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
    setDimension(params.dimension);
    if (admins.length === 0) {
      // @ts-ignore
      await _getUsersEnum();
    }
    if (collectionAgencies.length === 0) {
      await _getCollectionAgenciesEnum();
    }
    if (collectionGroups.length === 0) {
      await _getCollectionGroupsEnum();
    }
    if (collectionAdmins.length === 0) {
      await _getCollectionAdminsEnum();
    }

    if (res.data!.length > 0) {
      flag++;
    }
    if (adminMultiple) {
      setChartChartType('chart');
      flag++;
    }
    if (dimensionMultiple) {
      setChartChartType('chart2');
      flag++;
    }
    if (flag < 2) {
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
        let color = 'black';
        let fontWeight = 400;
        let rate = (record.l_c_no_track_count! * 100) / record.l_a_collection_total_count!;
        if (rate > 30) {
          // 根据损益值的大小设定红色的深度
          const intensity = Math.min(Math.max(rate, 0.63), 1); // 可根据需求调整1000的值
          const red = Math.floor(255 * intensity);
          color = `rgb(${red}, 0, 0)`;
          fontWeight = intensity * 1000;
        } else {
          let rate2 =
            (record.l_d_log_new_count! + record.l_e_sms_new_count! + record.l_f_call_new_count!) /
            record.l_a_collection_total_count!;
          if (rate2 < 4) {
            // 根据损益值的大小设定红色的深度
            const intensity = Math.min(Math.max(1 - rate2, 0.63), 1); // 可根据需求调整1000的值
            const red = Math.floor(255 * intensity);
            color = `rgb(${red}, 0, 0)`;
            fontWeight = intensity * 1000;
          } else {
            let rate3 =
              ((record.l_g_settled_count! + record.l_i_part_count! + record.l_k_extend_count!) *
                100) /
              record.l_a_collection_total_count!;
            if (rate3 < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate3, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            } else {
              let rate4 =
                ((record.l_h_settled_amount! +
                  record.l_j_part_amount! +
                  record.l_l_extend_amount!) *
                  100) /
                record.l_b_collection_total_amount!;
              if (rate4 < 60) {
                // 根据损益值的大小设定红色的深度
                const intensity = Math.min(Math.max(1 - rate4, 0.63), 1); // 可根据需求调整1000的值
                const red = Math.floor(255 * intensity);
                color = `rgb(${red}, 0, 0)`;
                fontWeight = intensity * 1000;
              } else {
                let rate5 =
                  record.l_m_level1_commission! +
                  record.l_n_level2_commission! +
                  record.l_o_level3_commission!;
                if (rate5 === 0) {
                  // 根据损益值的大小设定红色的深度
                  const intensity = 1; // 可根据需求调整1000的值
                  const red = Math.floor(255 * intensity);
                  color = `rgb(${red}, 0, 0)`;
                  fontWeight = intensity * 1000;
                }
              }
            }
          }
        }
        return (
          <span style={{ color, fontWeight }}>{moment(record.a_date).format('YYYY-MM-DD')}</span>
        );
      },
    },

    {
      title: FieldLabels.b_collection_admin_id,
      dataIndex: FieldIndex.b_collection_admin_id,
      width: 110,
      fixed: 'left',
      valueType: 'select',
      renderFormItem: () => {
        return (
          <ProFormSelect
            mode={adminMultiple ? 'multiple' : 'single'}
            name={FieldIndex.b_collection_admin_id}
            fieldProps={{
              style: { width: 130 },
              onChange: (value) => {
                if (Array.isArray(value) && value.length > 1) {
                  setDimensionMultiple(false);
                } else if (Array.isArray(value) && value.length === 1) {
                  setDimensionMultiple(true);
                } else {
                  setDimensionMultiple(true);
                }
              },
            }}
            // @ts-ignore
            options={admins}
            placeholder="Please select"
          />
        );
      },
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.i_collection_group_id,
      dataIndex: FieldIndex.i_collection_group_id,
      width: 50,
      fixed: 'left',
      renderFormItem: () => {
        return (
          <ProFormSelect
            name={FieldIndex.i_collection_group_id}
            fieldProps={{ style: { width: 130 } }}
            // @ts-ignore
            options={collectionGroups}
            placeholder="Please select"
          />
        );
      },
      request: _getCollectionGroupsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.h_collection_agency_id,
      dataIndex: FieldIndex.h_collection_agency_id,
      width: 50,
      fixed: 'left',
      renderFormItem: () => {
        return (
          <ProFormSelect
            name={FieldIndex.h_collection_agency_id}
            fieldProps={{ style: { width: 130 } }}
            // @ts-ignore
            options={collectionAgencies}
            placeholder="Please select"
          />
        );
      },
      request: _getCollectionAgenciesEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: '维度',
      dataIndex: 'dimension',
      hideInTable: true,
      valueType: 'select',
      valueEnum: FieldOptions,
      renderFormItem: () => {
        return (
          <ProFormSelect
            mode={dimensionMultiple ? 'multiple' : 'single'}
            name="dimension"
            fieldProps={{
              style: { width: 130 },
              onChange: (value) => {
                if (Array.isArray(value) && value.length > 1) {
                  setAdminMultiple(false);
                } else if (Array.isArray(value) && value.length === 1) {
                  setAdminMultiple(true);
                } else {
                  setAdminMultiple(true);
                }
              },
            }}
            initialValue="l_a_collection_total_count"
            // @ts-ignore
            options={FieldOptions2}
            placeholder="Please select"
          />
        );
      },
    },

    {
      title: FieldLabels.d_collection_new_count,
      dataIndex: FieldIndex.d_collection_new_count,
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: FieldLabels.f_collection_admin_in_count,
      dataIndex: FieldIndex.f_collection_admin_in_count,
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: FieldLabels.g_collection_admin_out_count,
      dataIndex: FieldIndex.g_collection_admin_out_count,
      search: false,
      width: 80,
      fixed: 'left',
    },
    {
      title: '总体',
      search: false,
      children: [
        {
          title: FieldLabels.l_a_collection_total_count,
          dataIndex: FieldIndex.l_a_collection_total_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_b_collection_total_amount,
          dataIndex: FieldIndex.l_b_collection_total_amount,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_c_no_track_count,
          dataIndex: FieldIndex.l_c_no_track_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '未跟踪率',
          dataIndex: '未跟踪率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate = (record.l_c_no_track_count! * 100) / record.l_a_collection_total_count!;
            if (rate > 30) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.l_d_log_new_count,
          dataIndex: FieldIndex.l_d_log_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_e_sms_new_count,
          dataIndex: FieldIndex.l_e_sms_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_f_call_new_count,
          dataIndex: FieldIndex.l_f_call_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '跟踪系数',
          dataIndex: '跟踪系数',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              (record.l_d_log_new_count! + record.l_e_sms_new_count! + record.l_f_call_new_count!) /
              record.l_a_collection_total_count!;
            if (rate < 4) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.l_g_settled_count,
          dataIndex: FieldIndex.l_g_settled_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_h_settled_amount,
          dataIndex: FieldIndex.l_h_settled_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_i_part_count,
          dataIndex: FieldIndex.l_i_part_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_j_part_amount,
          dataIndex: FieldIndex.l_j_part_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_k_extend_count,
          dataIndex: FieldIndex.l_k_extend_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_l_extend_amount,
          dataIndex: FieldIndex.l_l_extend_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '催回率',
          dataIndex: '催回率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.l_g_settled_count! + record.l_i_part_count! + record.l_k_extend_count!) *
                100) /
              record.l_a_collection_total_count!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: '催回率(金额)',
          dataIndex: '催回率(金额)',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.l_h_settled_amount! + record.l_j_part_amount! + record.l_l_extend_amount!) *
                100) /
              record.l_b_collection_total_amount!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.l_m_level1_commission,
          dataIndex: FieldIndex.l_m_level1_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_n_level2_commission,
          dataIndex: FieldIndex.l_n_level2_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_o_level3_commission,
          dataIndex: FieldIndex.l_o_level3_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '佣金',
          dataIndex: '佣金',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              record.l_m_level1_commission! +
              record.l_n_level2_commission! +
              record.l_o_level3_commission!;
            if (rate === 0) {
              // 根据损益值的大小设定红色的深度
              const intensity = 1; // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{rate}</span>;
          },
        },
        {
          title: FieldLabels.l_r_day1_paid_count,
          dataIndex: FieldIndex.l_r_day1_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_s_day1_paid_amount,
          dataIndex: FieldIndex.l_s_day1_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_t_day1_action_count,
          dataIndex: FieldIndex.l_t_day1_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_u_day2_3_paid_count,
          dataIndex: FieldIndex.l_u_day2_3_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_v_day2_3_paid_amount,
          dataIndex: FieldIndex.l_v_day2_3_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_w_day2_3_action_count,
          dataIndex: FieldIndex.l_w_day2_3_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_x_day4_paid_count,
          dataIndex: FieldIndex.l_x_day4_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_y_day4_paid_amount,
          dataIndex: FieldIndex.l_y_day4_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.l_z_day4_action_count,
          dataIndex: FieldIndex.l_z_day4_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
      ],
    },
    {
      title: 'Period 1',
      search: false,
      children: [
        {
          title: FieldLabels.m_a_collection_total_count,
          dataIndex: FieldIndex.m_a_collection_total_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_b_collection_total_amount,
          dataIndex: FieldIndex.m_b_collection_total_amount,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_c_no_track_count,
          dataIndex: FieldIndex.m_c_no_track_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '未跟踪率',
          dataIndex: '未跟踪率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate = (record.m_c_no_track_count! * 100) / record.m_a_collection_total_count!;
            if (rate > 30) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.m_d_log_new_count,
          dataIndex: FieldIndex.m_d_log_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_e_sms_new_count,
          dataIndex: FieldIndex.m_e_sms_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_f_call_new_count,
          dataIndex: FieldIndex.m_f_call_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '跟踪系数',
          dataIndex: '跟踪系数',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              (record.m_d_log_new_count! + record.m_e_sms_new_count! + record.m_f_call_new_count!) /
              record.m_a_collection_total_count!;
            if (rate < 4) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.m_g_settled_count,
          dataIndex: FieldIndex.m_g_settled_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_h_settled_amount,
          dataIndex: FieldIndex.m_h_settled_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_i_part_count,
          dataIndex: FieldIndex.m_i_part_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_j_part_amount,
          dataIndex: FieldIndex.m_j_part_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_k_extend_count,
          dataIndex: FieldIndex.m_k_extend_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_l_extend_amount,
          dataIndex: FieldIndex.m_l_extend_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '催回率',
          dataIndex: '催回率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.m_g_settled_count! + record.m_i_part_count! + record.m_k_extend_count!) *
                100) /
              record.m_a_collection_total_count!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: '催回率(金额)',
          dataIndex: '催回率(金额)',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.m_h_settled_amount! + record.m_j_part_amount! + record.m_l_extend_amount!) *
                100) /
              record.m_b_collection_total_amount!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.m_m_level1_commission,
          dataIndex: FieldIndex.m_m_level1_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_n_level2_commission,
          dataIndex: FieldIndex.m_n_level2_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_o_level3_commission,
          dataIndex: FieldIndex.m_o_level3_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '佣金',
          dataIndex: '佣金',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              record.m_m_level1_commission! +
              record.m_n_level2_commission! +
              record.m_o_level3_commission!;
            if (rate === 0) {
              // 根据损益值的大小设定红色的深度
              const intensity = 1; // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{rate}</span>;
          },
        },
        {
          title: FieldLabels.m_r_day1_paid_count,
          dataIndex: FieldIndex.m_r_day1_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_s_day1_paid_amount,
          dataIndex: FieldIndex.m_s_day1_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_t_day1_action_count,
          dataIndex: FieldIndex.m_t_day1_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_u_day2_3_paid_count,
          dataIndex: FieldIndex.m_u_day2_3_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_v_day2_3_paid_amount,
          dataIndex: FieldIndex.m_v_day2_3_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_w_day2_3_action_count,
          dataIndex: FieldIndex.m_w_day2_3_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_x_day4_paid_count,
          dataIndex: FieldIndex.m_x_day4_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_y_day4_paid_amount,
          dataIndex: FieldIndex.m_y_day4_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.m_z_day4_action_count,
          dataIndex: FieldIndex.m_z_day4_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
      ],
    },
    {
      title: 'Period 2',
      search: false,
      children: [
        {
          title: FieldLabels.n_a_collection_total_count,
          dataIndex: FieldIndex.n_a_collection_total_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_b_collection_total_amount,
          dataIndex: FieldIndex.n_b_collection_total_amount,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_c_no_track_count,
          dataIndex: FieldIndex.n_c_no_track_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '未跟踪率',
          dataIndex: '未跟踪率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate = (record.n_c_no_track_count! * 100) / record.n_a_collection_total_count!;
            if (rate > 30) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.n_d_log_new_count,
          dataIndex: FieldIndex.n_d_log_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_e_sms_new_count,
          dataIndex: FieldIndex.n_e_sms_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_f_call_new_count,
          dataIndex: FieldIndex.n_f_call_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '平均跟踪系数',
          dataIndex: '平均跟踪系数',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              (record.n_d_log_new_count! + record.n_e_sms_new_count! + record.n_f_call_new_count!) /
              record.n_a_collection_total_count!;
            if (rate < 4) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.n_g_settled_count,
          dataIndex: FieldIndex.n_g_settled_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_h_settled_amount,
          dataIndex: FieldIndex.n_h_settled_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_i_part_count,
          dataIndex: FieldIndex.n_i_part_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_j_part_amount,
          dataIndex: FieldIndex.n_j_part_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_k_extend_count,
          dataIndex: FieldIndex.n_k_extend_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_l_extend_amount,
          dataIndex: FieldIndex.n_l_extend_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '催回率',
          dataIndex: '催回率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.n_g_settled_count! + record.n_i_part_count! + record.n_k_extend_count!) *
                100) /
              record.n_a_collection_total_count!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: '催回率(金额)',
          dataIndex: '催回率(金额)',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.n_h_settled_amount! + record.n_j_part_amount! + record.n_l_extend_amount!) *
                100) /
              record.n_b_collection_total_amount!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.n_m_level1_commission,
          dataIndex: FieldIndex.n_m_level1_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_n_level2_commission,
          dataIndex: FieldIndex.n_n_level2_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_o_level3_commission,
          dataIndex: FieldIndex.n_o_level3_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '佣金',
          dataIndex: '佣金',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              record.n_m_level1_commission! +
              record.n_n_level2_commission! +
              record.n_o_level3_commission!;
            if (rate === 0) {
              // 根据损益值的大小设定红色的深度
              const intensity = 1; // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{rate}</span>;
          },
        },
        {
          title: FieldLabels.n_r_day1_paid_count,
          dataIndex: FieldIndex.n_r_day1_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_s_day1_paid_amount,
          dataIndex: FieldIndex.n_s_day1_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_t_day1_action_count,
          dataIndex: FieldIndex.n_t_day1_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_u_day2_3_paid_count,
          dataIndex: FieldIndex.n_u_day2_3_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_v_day2_3_paid_amount,
          dataIndex: FieldIndex.n_v_day2_3_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_w_day2_3_action_count,
          dataIndex: FieldIndex.n_w_day2_3_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_x_day4_paid_count,
          dataIndex: FieldIndex.n_x_day4_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_y_day4_paid_amount,
          dataIndex: FieldIndex.n_y_day4_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.n_z_day4_action_count,
          dataIndex: FieldIndex.n_z_day4_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
      ],
    },
    {
      title: 'Period 3',
      search: false,
      children: [
        {
          title: FieldLabels.o_a_collection_total_count,
          dataIndex: FieldIndex.o_a_collection_total_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_b_collection_total_amount,
          dataIndex: FieldIndex.o_b_collection_total_amount,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_c_no_track_count,
          dataIndex: FieldIndex.o_c_no_track_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '未跟踪率',
          dataIndex: '未跟踪率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate = (record.o_c_no_track_count! * 100) / record.o_a_collection_total_count!;
            if (rate > 30) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.o_d_log_new_count,
          dataIndex: FieldIndex.o_d_log_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_e_sms_new_count,
          dataIndex: FieldIndex.o_e_sms_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_f_call_new_count,
          dataIndex: FieldIndex.o_f_call_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '平均跟踪系数',
          dataIndex: '平均跟踪系数',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              (record.o_d_log_new_count! + record.o_e_sms_new_count! + record.o_f_call_new_count!) /
              record.o_a_collection_total_count!;
            if (rate < 4) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.o_g_settled_count,
          dataIndex: FieldIndex.o_g_settled_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_h_settled_amount,
          dataIndex: FieldIndex.o_h_settled_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_i_part_count,
          dataIndex: FieldIndex.o_i_part_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_j_part_amount,
          dataIndex: FieldIndex.o_j_part_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_k_extend_count,
          dataIndex: FieldIndex.o_k_extend_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_l_extend_amount,
          dataIndex: FieldIndex.o_l_extend_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '催回率',
          dataIndex: '催回率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.o_g_settled_count! + record.o_i_part_count! + record.o_k_extend_count!) *
                100) /
              record.o_a_collection_total_count!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: '催回率(金额)',
          dataIndex: '催回率(金额)',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.o_h_settled_amount! + record.o_j_part_amount! + record.o_l_extend_amount!) *
                100) /
              record.o_b_collection_total_amount!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.o_m_level1_commission,
          dataIndex: FieldIndex.o_m_level1_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_n_level2_commission,
          dataIndex: FieldIndex.o_n_level2_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_o_level3_commission,
          dataIndex: FieldIndex.o_o_level3_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '佣金',
          dataIndex: '佣金',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              record.o_m_level1_commission! +
              record.o_n_level2_commission! +
              record.o_o_level3_commission!;
            if (rate === 0) {
              // 根据损益值的大小设定红色的深度
              const intensity = 1; // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{rate}</span>;
          },
        },
        {
          title: FieldLabels.o_r_day1_paid_count,
          dataIndex: FieldIndex.o_r_day1_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_s_day1_paid_amount,
          dataIndex: FieldIndex.o_s_day1_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_t_day1_action_count,
          dataIndex: FieldIndex.o_t_day1_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_u_day2_3_paid_count,
          dataIndex: FieldIndex.o_u_day2_3_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_v_day2_3_paid_amount,
          dataIndex: FieldIndex.o_v_day2_3_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_w_day2_3_action_count,
          dataIndex: FieldIndex.o_w_day2_3_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_x_day4_paid_count,
          dataIndex: FieldIndex.o_x_day4_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_y_day4_paid_amount,
          dataIndex: FieldIndex.o_y_day4_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.o_z_day4_action_count,
          dataIndex: FieldIndex.o_z_day4_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
      ],
    },
    {
      title: 'Period 4',
      search: false,
      children: [
        {
          title: FieldLabels.p_a_collection_total_count,
          dataIndex: FieldIndex.p_a_collection_total_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_b_collection_total_amount,
          dataIndex: FieldIndex.p_b_collection_total_amount,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_c_no_track_count,
          dataIndex: FieldIndex.p_c_no_track_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '未跟踪率',
          dataIndex: '未跟踪率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate = (record.p_c_no_track_count! * 100) / record.p_a_collection_total_count!;
            if (rate > 30) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.p_d_log_new_count,
          dataIndex: FieldIndex.p_d_log_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_e_sms_new_count,
          dataIndex: FieldIndex.p_e_sms_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_f_call_new_count,
          dataIndex: FieldIndex.p_f_call_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '平均跟踪系数',
          dataIndex: '平均跟踪系数',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              (record.p_d_log_new_count! + record.p_e_sms_new_count! + record.p_f_call_new_count!) /
              record.p_a_collection_total_count!;
            if (rate < 4) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.p_g_settled_count,
          dataIndex: FieldIndex.p_g_settled_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_h_settled_amount,
          dataIndex: FieldIndex.p_h_settled_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_i_part_count,
          dataIndex: FieldIndex.p_i_part_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_j_part_amount,
          dataIndex: FieldIndex.p_j_part_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_k_extend_count,
          dataIndex: FieldIndex.p_k_extend_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_l_extend_amount,
          dataIndex: FieldIndex.p_l_extend_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '催回率',
          dataIndex: '催回率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.p_g_settled_count! + record.p_i_part_count! + record.p_k_extend_count!) *
                100) /
              record.p_a_collection_total_count!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: '催回率(金额)',
          dataIndex: '催回率(金额)',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.p_h_settled_amount! + record.p_j_part_amount! + record.p_l_extend_amount!) *
                100) /
              record.p_b_collection_total_amount!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.p_m_level1_commission,
          dataIndex: FieldIndex.p_m_level1_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_n_level2_commission,
          dataIndex: FieldIndex.p_n_level2_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_o_level3_commission,
          dataIndex: FieldIndex.p_o_level3_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '佣金',
          dataIndex: '佣金',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              record.p_m_level1_commission! +
              record.p_n_level2_commission! +
              record.p_o_level3_commission!;
            if (rate === 0) {
              // 根据损益值的大小设定红色的深度
              const intensity = 1; // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{rate}</span>;
          },
        },
        {
          title: FieldLabels.p_r_day1_paid_count,
          dataIndex: FieldIndex.p_r_day1_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_s_day1_paid_amount,
          dataIndex: FieldIndex.p_s_day1_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_t_day1_action_count,
          dataIndex: FieldIndex.p_t_day1_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_u_day2_3_paid_count,
          dataIndex: FieldIndex.p_u_day2_3_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_v_day2_3_paid_amount,
          dataIndex: FieldIndex.p_v_day2_3_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_w_day2_3_action_count,
          dataIndex: FieldIndex.p_w_day2_3_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_x_day4_paid_count,
          dataIndex: FieldIndex.p_x_day4_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_y_day4_paid_amount,
          dataIndex: FieldIndex.p_y_day4_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.p_z_day4_action_count,
          dataIndex: FieldIndex.p_z_day4_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
      ],
    },
    {
      title: 'Period 5',
      search: false,
      children: [
        {
          title: FieldLabels.q_a_collection_total_count,
          dataIndex: FieldIndex.q_a_collection_total_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_b_collection_total_amount,
          dataIndex: FieldIndex.q_b_collection_total_amount,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_c_no_track_count,
          dataIndex: FieldIndex.q_c_no_track_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '未跟踪率',
          dataIndex: '未跟踪率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate = (record.q_c_no_track_count! * 100) / record.q_a_collection_total_count!;
            if (rate > 30) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.q_d_log_new_count,
          dataIndex: FieldIndex.q_d_log_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_e_sms_new_count,
          dataIndex: FieldIndex.q_e_sms_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_f_call_new_count,
          dataIndex: FieldIndex.q_f_call_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '平均跟踪系数',
          dataIndex: '平均跟踪系数',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              (record.q_d_log_new_count! + record.q_e_sms_new_count! + record.q_f_call_new_count!) /
              record.q_a_collection_total_count!;
            if (rate < 4) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.q_g_settled_count,
          dataIndex: FieldIndex.q_g_settled_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_h_settled_amount,
          dataIndex: FieldIndex.q_h_settled_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_i_part_count,
          dataIndex: FieldIndex.q_i_part_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_j_part_amount,
          dataIndex: FieldIndex.q_j_part_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_k_extend_count,
          dataIndex: FieldIndex.q_k_extend_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_l_extend_amount,
          dataIndex: FieldIndex.q_l_extend_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '催回率',
          dataIndex: '催回率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.q_g_settled_count! + record.q_i_part_count! + record.q_k_extend_count!) *
                100) /
              record.q_a_collection_total_count!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: '催回率(金额)',
          dataIndex: '催回率(金额)',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.q_h_settled_amount! + record.q_j_part_amount! + record.q_l_extend_amount!) *
                100) /
              record.q_b_collection_total_amount!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.q_m_level1_commission,
          dataIndex: FieldIndex.q_m_level1_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_n_level2_commission,
          dataIndex: FieldIndex.q_n_level2_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_o_level3_commission,
          dataIndex: FieldIndex.q_o_level3_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '佣金',
          dataIndex: '佣金',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              record.q_m_level1_commission! +
              record.q_n_level2_commission! +
              record.q_o_level3_commission!;
            if (rate === 0) {
              // 根据损益值的大小设定红色的深度
              const intensity = 1; // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{rate}</span>;
          },
        },
        {
          title: FieldLabels.q_r_day1_paid_count,
          dataIndex: FieldIndex.q_r_day1_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_s_day1_paid_amount,
          dataIndex: FieldIndex.q_s_day1_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_t_day1_action_count,
          dataIndex: FieldIndex.q_t_day1_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_u_day2_3_paid_count,
          dataIndex: FieldIndex.q_u_day2_3_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_v_day2_3_paid_amount,
          dataIndex: FieldIndex.q_v_day2_3_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_w_day2_3_action_count,
          dataIndex: FieldIndex.q_w_day2_3_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_x_day4_paid_count,
          dataIndex: FieldIndex.q_x_day4_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_y_day4_paid_amount,
          dataIndex: FieldIndex.q_y_day4_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.q_z_day4_action_count,
          dataIndex: FieldIndex.q_z_day4_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
      ],
    },
    {
      title: 'Period 6',
      search: false,
      children: [
        {
          title: FieldLabels.r_a_collection_total_count,
          dataIndex: FieldIndex.r_a_collection_total_count,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_b_collection_total_amount,
          dataIndex: FieldIndex.r_b_collection_total_amount,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_c_no_track_count,
          dataIndex: FieldIndex.r_c_no_track_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '未跟踪率',
          dataIndex: '未跟踪率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate = (record.r_c_no_track_count! * 100) / record.r_a_collection_total_count!;
            if (rate > 30) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.r_d_log_new_count,
          dataIndex: FieldIndex.r_d_log_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_e_sms_new_count,
          dataIndex: FieldIndex.r_e_sms_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_f_call_new_count,
          dataIndex: FieldIndex.r_f_call_new_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '平均跟踪系数',
          dataIndex: '平均跟踪系数',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              (record.r_d_log_new_count! + record.r_e_sms_new_count! + record.r_f_call_new_count!) /
              record.r_a_collection_total_count!;
            if (rate < 4) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.r_g_settled_count,
          dataIndex: FieldIndex.r_g_settled_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_h_settled_amount,
          dataIndex: FieldIndex.r_h_settled_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_i_part_count,
          dataIndex: FieldIndex.r_i_part_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_j_part_amount,
          dataIndex: FieldIndex.r_j_part_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_k_extend_count,
          dataIndex: FieldIndex.r_k_extend_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_l_extend_amount,
          dataIndex: FieldIndex.r_l_extend_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '催回率',
          dataIndex: '催回率',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.r_g_settled_count! + record.r_i_part_count! + record.r_k_extend_count!) *
                100) /
              record.r_a_collection_total_count!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: '催回率(金额)',
          dataIndex: '催回率(金额)',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              ((record.r_h_settled_amount! + record.r_j_part_amount! + record.r_l_extend_amount!) *
                100) /
              record.r_b_collection_total_amount!;
            if (rate < 60) {
              // 根据损益值的大小设定红色的深度
              const intensity = Math.min(Math.max(1 - rate, 0.63), 1); // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{`${rate.toFixed(0)}%`}</span>;
          },
        },
        {
          title: FieldLabels.r_m_level1_commission,
          dataIndex: FieldIndex.r_m_level1_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_n_level2_commission,
          dataIndex: FieldIndex.r_n_level2_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_o_level3_commission,
          dataIndex: FieldIndex.r_o_level3_commission,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: '佣金',
          dataIndex: '佣金',
          search: false,
          width: 80,
          render: (_, record) => {
            let color = 'black';
            let fontWeight = 400;
            let rate =
              record.r_m_level1_commission! +
              record.r_n_level2_commission! +
              record.r_o_level3_commission!;
            if (rate === 0) {
              // 根据损益值的大小设定红色的深度
              const intensity = 1; // 可根据需求调整1000的值
              const red = Math.floor(255 * intensity);
              color = `rgb(${red}, 0, 0)`;
              fontWeight = intensity * 1000;
            }
            return <span style={{ color, fontWeight }}>{rate}</span>;
          },
        },
        {
          title: FieldLabels.r_r_day1_paid_count,
          dataIndex: FieldIndex.r_r_day1_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_s_day1_paid_amount,
          dataIndex: FieldIndex.r_s_day1_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_t_day1_action_count,
          dataIndex: FieldIndex.r_t_day1_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_u_day2_3_paid_count,
          dataIndex: FieldIndex.r_u_day2_3_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_v_day2_3_paid_amount,
          dataIndex: FieldIndex.r_v_day2_3_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_w_day2_3_action_count,
          dataIndex: FieldIndex.r_w_day2_3_action_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_x_day4_paid_count,
          dataIndex: FieldIndex.r_x_day4_paid_count,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_y_day4_paid_amount,
          dataIndex: FieldIndex.r_y_day4_paid_amount,
          hideInTable: isLite,
          search: false,
          width: 80,
        },
        {
          title: FieldLabels.r_z_day4_action_count,
          dataIndex: FieldIndex.r_z_day4_action_count,
          hideInTable: isLite,
          search: false,
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
          <Tooltip key="11" title="催员(多选) + 维度(单选)" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={chartChartType !== 'chart'}
              onClick={() => handleChartVisible(!chartVisible)}
            >
              {chartChartType !== 'chart'
                ? '显示多催员单维度'
                : !chartVisible && chartChartType === 'chart'
                ? '显示多催员单维度'
                : '隐藏多催员单维度'}
            </Button>
          </Tooltip>,
          <Tooltip key="1" title="催员(单选) + 维度(多选)" color="#2db7f5">
            <Button
              key="3"
              type="primary"
              disabled={chartChartType !== 'chart2'}
              onClick={() => handleChartVisible(!chartVisible)}
            >
              {chartChartType !== 'chart2'
                ? '显示单催员多维度'
                : !chartVisible && chartChartType === 'chart2'
                ? '显示单催员多维度'
                : '隐藏单催员多维度'}
            </Button>
          </Tooltip>,
          <Button key="2" onClick={() => setIsLite(!isLite)}>
            {isLite ? '全部' : '精简'}
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
            {chartChartType === 'chart' ? (
              <Chart
                rawData={records}
                dimension={dimension as string}
                collectionAdmins={collectionAdmins}
              ></Chart>
            ) : (
              <Chart2
                rawData={records}
                dimensions={dimension as string[]}
                collectionAdmins={collectionAdmins}
              ></Chart2>
            )}
          </div>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;

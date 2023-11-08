import { getAdminV1GGRiskStrateiesEnums2 as getRiskStrateiesEnums2 } from '@/services/ant-design-pro/GGRiskStratey';
import { getAdminV1GJRiskTagsEnums as getRiskTagsEnums } from '@/services/ant-design-pro/GJRiskTag';
import { getAdminV1WKRiskTagsId as index } from '@/services/ant-design-pro/WKRiskTag';
import { DownloadOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ProForm, ProFormDateRangePicker, QueryFilter } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { ProFieldRequestData } from '@ant-design/pro-utils';
import { Button, Dropdown, MenuProps, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
import type { TableListPagination } from './data';

const TableList: React.FC = () => {
  /** 当前编辑数据 */
  /** 当前编辑数据 */
  const [records, setRecords] = useState<any[]>([]);
  const [riskTags, setRiskTags] = useState<RequestOptionsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [riskStrateies, setRiskStrateies] = useState<RequestOptionsType[]>([]);

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

    if (params.a_risk_date[0] !== undefined) {
      params.a_risk_date[0] =
        params.a_risk_date[0].$d !== undefined
          ? moment(params.a_risk_date[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
          : params.a_risk_date[0] + ' 00:00:00';
      params.a_risk_date[1] =
        params.a_risk_date[1].$d !== undefined
          ? moment(params.a_risk_date[1].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
          : params.a_risk_date[1] + ' 00:00:00';
    }
    let res;
    setLoading(true);
    // @ts-ignore
    res = await index({ id: 1 });
    setRecords(res.data!);
    setLoading(false);

    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      // 不传会使用 data 的长度，如果是分页一定要传
    };
  };
  /**
   * 查询规则enum
   */
  const _getRiskTagsEnums: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (riskTags.length === 0) {
      const res = await getRiskTagsEnums({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setRiskTags(data);
      return data;
    } else {
      return riskTags;
    }
  };
  /**
   * 查询规则enum
   */
  const _getRiskStrateiesEnums2: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (riskStrateies.length === 0) {
      const res = await getRiskStrateiesEnums2({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setRiskStrateies(data);
      return data;
    } else {
      return riskStrateies;
    }
  };

  useEffect(() => {
    _getRiskTagsEnums({}, {});
    _getRiskStrateiesEnums2({}, {});
    return () => {};
  }, []);

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
  // @ts-ignore
  return (
    <PageContainer
      header={{
        // title: '营销统计',
        ghost: true,
        extra: [
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
              <ProFormDateRangePicker
                name="a_risk_date"
                label="日期区间"
                rules={[{ required: true }]}
              />
            </ProForm.Group>
          </QueryFilter>
        </div>
      </>
      <Spin spinning={loading}>
        <div key="1" style={{ height: 600, width: 1900 }}>
          <Chart rawData={records}></Chart>
        </div>
      </Spin>
    </PageContainer>
  );
};

export default TableList;

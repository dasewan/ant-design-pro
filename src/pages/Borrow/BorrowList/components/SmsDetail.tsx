import { TableListItem } from '@/pages/Borrow/BorrowList/components/data';
import { SmsFieldIndex, SmsFieldLabels } from '@/pages/Borrow/BorrowList/components/service';
import { TableListPagination } from '@/pages/Borrow/BorrowList/data';
import { SMS_TYPE } from '@/pages/enums';
import { getAdminV1RCSms as index } from '@/services/ant-design-pro/RCSms';
import { SearchOutlined } from '@ant-design/icons';
import { Bar, Pie } from '@ant-design/plots';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Datum } from '@antv/g2plot/src/types/common';
import { Button, Card, Col, Divider, Input, InputRef, Row, Space } from 'antd';
import { ColumnType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useParams } from 'umi';

export type FormProps = {};
type DataIndex = keyof API.RCSms;

const colorMap = {
  登录: '#0099FF',
  拒绝: '#FF9900',
  通过: '#a0c69d',
  放款: '#99CC33',
  还款: '#006633',
  展期: '#CCFF99',
  催收: '#FF0033',
  召回: '#999999',
  营销: '#CC99CC',
  其他: '#666666',
};
const typeTitleMap = {
  101: '登录',
  102: '拒绝',
  103: '通过',
  104: '放款',
  105: '还款',
  106: '展期',
  107: '催收',
  108: '召回',
  109: '营销',
  110: '其他',
};

const SmsDetail: React.FC<FormProps> = () => {
  const params2 = useParams<{ id: string; verifyId?: string }>();
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [allDataSource, setAllDataSource] = useState<TableListItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const chartRef = useRef(null);
  // const tableListDataSource: TableListItem[] = [];

  useEffect(() => {
    /** table */
    const _index = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await index({ page: 1, limit: 100 });
      setDataSource(res.data!);
      setAllDataSource(res.data!);
      return {
        data: res.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: res.success,
        // 不传会使用 data 的长度，如果是分页一定要传
        total: res.total,
      };
    };
    _index();
  }, [params2.id]);

  const config = {
    appendPadding: 10,
    angleField: 'count',
    colorField: 'type',
    radius: 0.9,
    legend: true,
    tooltip: {
      fields: ['type', 'count'],
      formatter: (datum: Datum) => {
        return { name: datum.type, value: datum.count };
      },
    },
    label: {
      type: 'outer',
      labelHeight: 18,
      content: '{name}-{value}',
      style: {
        fontSize: 12,
      },
    },
    /*    label: {
          type: 'inner',
          offset: '-8%',
          style: {
            fontSize: 12,
          },

        },*/
    color: ({ type }: { type: string }) => {
      if (colorMap[type] != undefined) {
        return colorMap[type];
      }
      return '#F0FFFF';
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const barConfig = {
    isStack: true,
    xField: 'count',
    yField: 'e_merchant',
    seriesField: 'type',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'left', 'middle', 'right'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
    color: ({ type }: { type: string }) => {
      if (colorMap[type] != undefined) {
        return colorMap[type];
      }
      return 'red';
    },
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
    console.log(allDataSource);
    setDataSource(allDataSource);
  };
  const pieElementClick = (_type: string) => {
    setDataSource(allDataSource.filter((item) => item.d_type == _type));
  };
  const barElementClick = (_type: string, _merchant: string) => {
    setDataSource(
      allDataSource.filter((item) => item.d_type == _type && item.e_merchant == _merchant),
    );
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<API.RCSms> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]!.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    /*    onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },*/
    render: (text) => {
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      );
    },
  });

  const columns: ProColumns<TableListItem>[] = [
    {
      title: SmsFieldLabels.address,
      // @ts-ignore
      dataIndex: SmsFieldIndex.address,
      ...getColumnSearchProps('address'),
    },
    {
      title: SmsFieldLabels.body,
      // @ts-ignore
      dataIndex: SmsFieldIndex.body,
      width: '60%',
      ...getColumnSearchProps('body'),
    },
    {
      title: SmsFieldLabels.date_sent,
      dataIndex: SmsFieldIndex.date_sent,
      render: (__, value) => {
        // @ts-ignore
        return moment(new Date(value.date)).format('YYYY-MM-DD HH:mm');
      },
    },

    {
      title: SmsFieldLabels.c_level,
      dataIndex: SmsFieldIndex.c_level,
    },
    {
      title: SmsFieldLabels.d_type,
      dataIndex: SmsFieldIndex.d_type,
      valueEnum: SMS_TYPE,
    },
  ];
  return (
    <>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <Row gutter={0} justify="space-between">
              <Col span={24}>
                <Divider>一类金融总览</Divider>
                {allDataSource.length > 0 ? (
                  <Pie
                    ref={chartRef}
                    onEvent={(chart, event) => {
                      if (event.type == 'element:click') {
                        pieElementClick(event.data!.data.d_type);
                      }
                    }}
                    data={_(allDataSource)
                      .groupBy('d_type')
                      .map((level, d_type) => ({
                        d_type: d_type,
                        type: typeTitleMap[d_type],
                        count: level.length,
                      }))
                      .orderBy('d_type')
                      .value()}
                    {...config}
                  />
                ) : (
                  ''
                )}
              </Col>
            </Row>
            <Row gutter={0} justify="space-between">
              <Col span={24}>
                <Divider>商户一类金融统计</Divider>
                {allDataSource.length > 0 ? (
                  <Bar
                    onEvent={(chart, event) => {
                      if (event.type == 'element:click') {
                        barElementClick(event.data!.data.d_type, event.data!.data.e_merchant);
                      }
                    }}
                    data={_.chain(allDataSource)
                      .groupBy('e_merchant') // 先按省份分组
                      .map((group, e_merchant) => {
                        // 对每个省份的数据再按年龄分组，并计算数量
                        const d_typeCounts = _.chain(group)
                          .groupBy('d_type')
                          .map((d_typeGroup, d_type) => ({
                            d_type: d_type,
                            count: d_typeGroup.length,
                          }))
                          .orderBy(['d_type'], ['asc']) // 再按年龄排序
                          .value();

                        // 计算该省份所占总数和每个年龄所占总数
                        const totalCount = _.sumBy(d_typeCounts, 'count');
                        const d_typeTotalCounts = _.countBy(group, 'd_type');

                        return { e_merchant, d_typeCounts, totalCount, d_typeTotalCounts };
                      })
                      .orderBy(['totalCount'], ['desc']) // 先按总数排序
                      .flatMap(({ e_merchant, d_typeCounts }) => {
                        // 将每个省份的年龄数量信息展开成一个新的数组
                        return d_typeCounts.map(({ d_type, count }) => ({
                          e_merchant,
                          d_type: d_type,
                          type: typeTitleMap[d_type],
                          count,
                        }));
                      })
                      .value()}
                    {...barConfig}
                  />
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <ProTable<TableListItem, TableListPagination>
              revalidateOnFocus={false}
              rowKey="id"
              search={false}
              dataSource={dataSource}
              columns={columns}
              postData={(data: any[]) => {
                return data;
              }}
              pagination={{
                pageSize: 5,
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SmsDetail;

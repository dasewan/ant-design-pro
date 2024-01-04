import { TableListItem } from '@/pages/Borrow/BorrowList/components/data';
import { SmsFieldIndex } from '@/pages/Borrow/BorrowList/components/service';
import { TableListPagination } from '@/pages/Borrow/BorrowList/data';
import { SMS_TYPE } from '@/pages/enums';
import { US_SMS_TYPE } from '@/pages/enumsUs';
import { getAdminV1RCSms as index } from '@/services/ant-design-pro/RCSms';
import { useIntl } from '@@/exports';
import { PhoneTwoTone, SearchOutlined } from '@ant-design/icons';
import { Bar, Pie } from '@ant-design/plots';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Datum } from '@antv/g2plot/src/types/common';
import { Button, Card, Col, ConfigProvider, Divider, Input, InputRef, Row, Space, Tag } from 'antd';
import { ColumnType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import _ from 'lodash';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useParams } from 'umi';
import styles from './style.less';

type DataIndex = keyof API.RCSms;

const colorMap: { [key: string]: string } = {
  登录: '#0099FF',
  拒绝: '#FF9900',
  通过: '#a0c69d',
  放款: '#99CC33',
  还款: '#006633',
  展期: '#CCFF99',
  逾期: '#FF0033',
  召回: '#999999',
  营销: '#CC99CC',
  其他: '#666666',
  严重逾期: '#711212',
  逾期提醒: '#97d8eb',
};
const typeTitleMap: { [key: string]: string } = {
  login: '登录',
  refuse: '拒绝',
  accept: '通过',
  loan: '放款',
  repay: '还款',
  extend: '展期',
  overdue: '逾期',
  recall: '召回',
  marketing: '营销',
  other: '其他',
  serious_overdue: '严重逾期',
  before_overdue: '逾期提醒',
};

const colorMapUs = {
  login: '#0099FF',
  refuse: '#FF9900',
  accept: '#a0c69d',
  loan: '#99CC33',
  repay: '#006633',
  extend: '#CCFF99',
  overdue: '#FF0033',
  recall: '#999999',
  marketing: '#CC99CC',
  other: '#666666',
  seriousOverdue: '#711212',
  beforeOverdue: '#97d8eb',
};
const typeTitleMapUs: { [key: string]: string } = {
  login: 'login',
  refuse: 'refuse',
  accept: 'accept',
  loan: 'loan',
  repay: 'repay',
  extend: 'extend',
  overdue: 'overdue',
  recall: 'recall',
  marketing: 'marketing',
  other: 'other',
  serious_overdue: 'seriousOverdue',
  before_overdue: 'beforeOverdue',
};
const typeOrder = [
  'login',
  'refuse',
  'accept',
  'loan',
  'repay',
  'extend',
  'before_overdue',
  'overdue',
  'serious_overdue',
  'repay',
  'recall',
  'marketing',
  'other',
];

const SmsDetail: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const params2 = useParams<{ id: string; userId?: string }>();
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [allDataSource, setAllDataSource] = useState<TableListItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const chartRef = useRef(null);
  // const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [lastUploadTime, setLastUploadTime] = useState<string>('');
  // const tableListDataSource: TableListItem[] = [];

  useEffect(() => {
    /** table */
    const _index = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await index({ page: 1, limit: 100, a_user_id: params2.userId });
      setDataSource(res.data!);
      setAllDataSource(res.data!);
      setLastUploadTime(res.other.last_upload_time);
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
      /*      if(currentLanguage === 'zh-cn'){
              if (colorMap[type] !== undefined) {
                return colorMap[type];
              }
            }else{
              if (colorMapUs[type] !== undefined) {
                return colorMapUs[type];
              }
            }*/

      if (currentLanguage === 'zh-cn') {
        if (colorMap[type] !== undefined) {
          return colorMap[type];
        }
      } else {
        console.log(type);
        if (colorMapUs[type] !== undefined) {
          return colorMapUs[type];
        }
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
      if (currentLanguage === 'zh-cn') {
        if (colorMap[type] !== undefined) {
          return colorMap[type];
        }
      } else {
        if (colorMapUs[type] !== undefined) {
          return colorMapUs[type];
        }
      }
      return 'red';
    },
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    /*    if (checkedList.length === 1 && checkedList.includes('已删除')) {
          setDataSource(allDataSource.filter((item) => 1 === item.q_is_deleted!));
        }
        if (checkedList.length === 1 && checkedList.includes('通讯录')) {
          setDataSource(allDataSource.filter((item) => item.r_is_contact! === 1));
        }
        if (checkedList.length === 2) {
          setDataSource(allDataSource.filter((item) => item.q_is_deleted! === 1 && item.r_is_contact! === 1));
        }*/
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void, dataIndex: string) => {
    clearFilters();
    if (dataIndex === 'address') {
      // setCheckedList([]);
    }
    setSearchText('');
    setDataSource(allDataSource);
  };
  const pieElementClick = (_type: string) => {
    setDataSource(allDataSource.filter((item) => item.d_type === _type));
  };
  const barElementClick = (_type: string, _merchant: string) => {
    setDataSource(
      allDataSource.filter((item) => item.d_type === _type && item.e_merchant === _merchant),
    );
  };
  /*  const onChange = (e: CheckboxChangeEvent) => {
      console.log(`checked = ${e.target.checked}`);
    };*/
  /*  const onChange = (list: CheckboxValueType[]) => {
      setCheckedList(list);
    };*/

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
        {/*{dataIndex === 'address' ?
          <div style={{marginBottom: 8, display: 'block'}}>
            <Space>
              <CheckboxGroup options={['已删除', '通讯录']} value={checkedList} onChange={onChange} />
            </Space>
          </div> : ''
        }*/}

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
            onClick={() => clearFilters && handleReset(clearFilters, dataIndex)}
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
    render: (text, value) => {
      let tmp;
      if (searchedColumn === dataIndex && searchText !== '') {
        tmp = (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText, value.s_keyword]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        );
      } else if (dataIndex === 'body' && value.s_keyword !== '' && value.s_keyword !== null) {
        let keywords: string[] = [value.s_keyword];
        let markedContent = text;
        keywords.forEach((keyword) => {
          const regex = new RegExp(`${keyword}`, 'gi');
          markedContent = markedContent.replace(
            regex,
            `<span style="color: red; font-weight: bold;">$&</span>`,
          );
        });

        tmp = <span dangerouslySetInnerHTML={{ __html: markedContent }} />;
      } else {
        tmp = <span>{text}</span>;
      }
      if (value.q_is_deleted && value.r_is_contact && dataIndex === 'address') {
        return (
          <div className={styles.strike}>
            {tmp} <PhoneTwoTone />
          </div>
        );
      } else if (value.q_is_deleted && dataIndex === 'address') {
        return <div className={styles.strike}>{tmp}</div>;
      } else if (value.r_is_contact && dataIndex === 'address') {
        return (
          <div>
            {tmp} <PhoneTwoTone />
          </div>
        );
      }
      return <div>{tmp}</div>;
    },
  });

  const columns: ProColumns<TableListItem>[] = [
    {
      // @ts-ignore
      title: intl.formatMessage({ id: 'pages.Borrow.Sms.address', defaultMessage: '' }),
      // @ts-ignore
      dataIndex: SmsFieldIndex.address,
      ...getColumnSearchProps('address'),
    },
    {
      // @ts-ignore
      title: intl.formatMessage({ id: 'pages.Borrow.Sms.body', defaultMessage: '' }),
      // @ts-ignore
      dataIndex: SmsFieldIndex.body,
      width: '50%',
      ...getColumnSearchProps('body'),
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Sms.date_sent', defaultMessage: '' }),
      dataIndex: SmsFieldIndex.date_sent,
      render: (__, value) => {
        // @ts-ignore
        return moment(new Date(value.date)).format('YYYY-MM-DD HH:mm');
      },
    },

    {
      title: intl.formatMessage({ id: 'pages.Borrow.Sms.c_level', defaultMessage: '' }),
      dataIndex: SmsFieldIndex.c_level,
      render: (__, value) => {
        if (value.c_level === 1) {
          return (
            <Tag color="#f50">
              {intl.formatMessage({ id: 'pages.Borrow.Sms.finance1', defaultMessage: '' })}
            </Tag>
          );
        } else if (value.c_level === 2) {
          return (
            <Tag color="#2db7f5">
              {intl.formatMessage({ id: 'pages.Borrow.Sms.finance2', defaultMessage: '' })}
            </Tag>
          );
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Sms.d_type', defaultMessage: '' }),
      dataIndex: SmsFieldIndex.d_type,
      valueEnum: currentLanguage === 'zh-cn' ? SMS_TYPE : US_SMS_TYPE,
      // filters: SMS_TYPE_FILTER,
    },
  ];
  return (
    <>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <Row gutter={0} justify="space-between">
              <Col span={24}>
                <Divider>
                  {intl.formatMessage({ id: 'pages.Borrow.Sms.overview', defaultMessage: '' })}
                </Divider>
                {allDataSource.length > 0 ? (
                  // @ts-ignore
                  <Pie
                    ref={chartRef}
                    onEvent={(chart, event) => {
                      if (event.type === 'element:click') {
                        pieElementClick(event.data!.data.d_type);
                      }
                    }}
                    data={_(allDataSource)
                      .filter((item) => item.d_type !== 'other')
                      .orderBy((item) => typeOrder.indexOf(item.d_type!))
                      .groupBy('d_type')
                      .map((level, d_type) => ({
                        d_type: d_type,
                        type:
                          currentLanguage === 'zh-cn'
                            ? typeTitleMap[d_type!]
                            : typeTitleMapUs[d_type],
                        count: level.length,
                      }))
                      .orderBy((item) => typeOrder.indexOf(item.d_type))
                      // .orderBy('d_type')
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
                <Divider>
                  {intl.formatMessage({
                    id: 'pages.Borrow.Sms.merchant_overview',
                    defaultMessage: '',
                  })}
                </Divider>
                {allDataSource.length > 0 ? (
                  // @ts-ignore
                  <Bar
                    onEvent={(chart, event) => {
                      if (event.type === 'element:click') {
                        barElementClick(event.data!.data.d_type, event.data!.data.e_merchant);
                      }
                    }}
                    data={_.chain(allDataSource)
                      .orderBy((item) => typeOrder.indexOf(item.d_type!))
                      .groupBy('e_merchant') // 先按省份分组
                      .map((group, e_merchant) => {
                        // 对每个省份的数据再按年龄分组，并计算数量
                        const d_typeCounts = _.chain(group)
                          .filter((item) => item.d_type !== 'other')
                          .groupBy('d_type')
                          .map((d_typeGroup, d_type) => ({
                            d_type: d_type,
                            count: d_typeGroup.length,
                          }))
                          .orderBy((item) => typeOrder.indexOf(item.d_type))
                          // .orderBy(['d_type'], ['asc']) // 再按年龄排序
                          .value();

                        // 计算该省份所占总数和每个年龄所占总数
                        const totalCount = _.sumBy(d_typeCounts, 'count');
                        const d_typeTotalCounts = _.countBy(group, 'd_type');

                        return { e_merchant, d_typeCounts, totalCount, d_typeTotalCounts };
                      })
                      .orderBy(['totalCount'], ['desc']) // 先按总数排序
                      .flatMap(({ e_merchant, d_typeCounts }) => {
                        // console.log(b)
                        return _.chain(d_typeCounts)
                          .orderBy((item) => typeOrder.indexOf(item.d_type))
                          .map(({ d_type, count }) => ({
                            e_merchant,
                            d_type: d_type,
                            type:
                              currentLanguage === 'zh-cn'
                                ? typeTitleMap[d_type]
                                : typeTitleMapUs[d_type],
                            count,
                          }))
                          .value();
                        // console.log(d_typeCounts.sort((item) =>  typeOrder.indexOf(item.d_type)))
                        // 将每个省份的年龄数量信息展开成一个新的数组
                        /*                        return d_typeCounts.sort((item) =>  typeOrder.indexOf(item.d_type)).map(({ d_type, count }) => ({
                                                  e_merchant,
                                                  d_type: d_type,
                                                  type: typeTitleMap[d_type],
                                                  count,
                                                }));*/
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
                pageSize: 500,
              }}
              toolBarRender={() => [
                <span key="sms">
                  {intl.formatMessage({
                    id: 'pages.Borrow.Sms.last_upload_time',
                    defaultMessage: '',
                  })}
                  ： {moment(lastUploadTime).format('YY-MM-DD HH:mm')}
                </span>,
              ]}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SmsDetail;

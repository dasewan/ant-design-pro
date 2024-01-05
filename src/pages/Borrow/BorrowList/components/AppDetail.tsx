import type { TableListPagination } from '@/pages/Borrow/BorrowList/data';
import { APP_FINANCE_TYPE_FILTER, IS_UNINSTALL, IS_UNINSTALL_FILTER } from '@/pages/enums';
import {
  US_APP_FINANCE_TYPE_FILTER,
  US_IS_UNINSTALL,
  US_IS_UNINSTALL_FILTER,
} from '@/pages/enumsUs';
import { getAdminV1SAApps as index } from '@/services/ant-design-pro/SAApp';
import { useIntl } from '@@/exports';
import { SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { InputRef } from 'antd';
import { Button, ConfigProvider, Input, Space, Tag } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import _ from 'lodash';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useParams } from 'umi';

export type TableListItem = API.SAApp;
type DataIndex = keyof API.SAApp;

const AppDetail: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const params2 = useParams<{ id: string; userId?: string }>();
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [allDataSource, setAllDataSource] = useState<TableListItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [lastUploadTime, setLastUploadTime] = useState<string>('');
  // const tableListDataSource: TableListItem[] = [];

  useEffect(() => {
    /** table */
    const _index = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await index({ page: 1, limit: 10000, a_user_id: params2.userId });
      setDataSource(
        _(res.data!)
          .orderBy(
            [({ b_level }) => b_level || 1000, ({ g_sms_count }) => g_sms_count || 0],
            ['asc', 'desc'],
          )
          .value(),
      );
      setAllDataSource(
        _(res.data!)
          .orderBy(
            [({ b_level }) => b_level || 1000, ({ g_sms_count }) => g_sms_count || 0],
            ['asc', 'desc'],
          )
          .value(),
      );
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<API.SAApp> => ({
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

  // @ts-ignore
  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.appName', defaultMessage: '' }),
      dataIndex: 'appName',
      key: 'appName',
      ...getColumnSearchProps('appName'),
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.c_merchant', defaultMessage: '' }),
      dataIndex: 'c_merchant',
      key: 'c_merchant',
      ...getColumnSearchProps('c_merchant'),
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.b_level', defaultMessage: '' }),
      dataIndex: 'b_level',
      key: 'b_level',
      filters: currentLanguage === 'zh-cn' ? APP_FINANCE_TYPE_FILTER : US_APP_FINANCE_TYPE_FILTER,
      onFilter: (value: string, record) => {
        return record.b_level === value;
      },
      render: (__, value) => {
        if (value.b_level === '1') {
          return (
            <Tag color="#f50">
              {intl.formatMessage({ id: 'pages.Borrow.Sms.finance1', defaultMessage: '' })}
            </Tag>
          );
        } else if (value.b_level === '2') {
          return (
            <Tag color="#108ee9">
              {intl.formatMessage({ id: 'pages.Borrow.Sms.finance2', defaultMessage: '' })}
            </Tag>
          );
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.f_history_installed', defaultMessage: '' }),
      dataIndex: 'f_history_installed',
      key: 'f_history_installed',
      valueEnum: currentLanguage === 'zh-cn' ? IS_UNINSTALL : US_IS_UNINSTALL,
      filters: currentLanguage === 'zh-cn' ? IS_UNINSTALL_FILTER : US_IS_UNINSTALL_FILTER,
      onFilter: (value: string, record) => {
        return record.f_history_installed === value;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.g_sms_count', defaultMessage: '' }),
      dataIndex: 'g_sms_count',
      key: 'g_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.d_call_times - b.d_call_times,
    },

    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.packageName', defaultMessage: '' }),
      dataIndex: 'packageName',
      key: 'packageName',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.versionName', defaultMessage: '' }),
      dataIndex: 'versionName',
      key: 'versionName',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.isSystemApp', defaultMessage: '' }),
      dataIndex: 'isSystemApp',
      key: 'isSystemApp',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.firstInstallTime', defaultMessage: '' }),
      dataIndex: 'firstInstallTime',
      key: 'firstInstallTime',
      render: (__, value) => {
        // @ts-ignore
        return value.firstInstallTime > 0
          ? moment(new Date(value.firstInstallTime)).format('YYYY-MM-DD HH:mm')
          : '';
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.h_login_sms_count', defaultMessage: '' }),
      dataIndex: 'h_login_sms_count',
      key: 'h_login_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.h_login_sms_count - b.h_login_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.i_refuse_sms_count', defaultMessage: '' }),
      dataIndex: 'i_refuse_sms_count',
      key: 'i_refuse_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.i_refuse_sms_count - b.i_refuse_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.j_accept_sms_count', defaultMessage: '' }),
      dataIndex: 'j_accept_sms_count',
      key: 'j_accept_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.j_accept_sms_count - b.j_accept_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.k_loan_sms_count', defaultMessage: '' }),
      dataIndex: 'k_loan_sms_count',
      key: 'k_loan_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.k_loan_sms_count - b.k_loan_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.l_repay_sms_count', defaultMessage: '' }),
      dataIndex: 'l_repay_sms_count',
      key: 'l_repay_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.l_repay_sms_count - b.l_repay_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.m_extend_sms_count', defaultMessage: '' }),
      dataIndex: 'm_extend_sms_count',
      key: 'm_extend_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.m_extend_sms_count - b.m_extend_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.n_urge_sms_count', defaultMessage: '' }),
      dataIndex: 'n_urge_sms_count',
      key: 'n_urge_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.n_urge_sms_count - b.n_urge_sms_count,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.App.o_marketing_sms_count',
        defaultMessage: '',
      }),
      dataIndex: 'o_marketing_sms_count',
      key: 'o_marketing_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.o_marketing_sms_count - b.o_marketing_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.p_recall_sms_count', defaultMessage: '' }),
      dataIndex: 'p_recall_sms_count',
      key: 'p_recall_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.p_recall_sms_count - b.p_recall_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.q_other_sms_count', defaultMessage: '' }),
      dataIndex: 'q_other_sms_count',
      key: 'q_other_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.q_other_sms_count - b.q_other_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.r_total_sms_count', defaultMessage: '' }),
      dataIndex: 'r_total_sms_count',
      key: 'r_total_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.r_total_sms_count - b.r_total_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.s_loan_amount', defaultMessage: '' }),
      dataIndex: 's_loan_amount',
      key: 's_loan_amount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.s_loan_amount - b.s_loan_amount,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.App.t_repay_amount', defaultMessage: '' }),
      dataIndex: 't_repay_amount',
      key: 't_repay_amount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.t_repay_amount - b.t_repay_amount,
    },
  ];
  return (
    <>
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        rowKey="id"
        search={false}
        dataSource={dataSource}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        scroll={{ x: '50%' }}
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
    </>
  );
};

export default AppDetail;

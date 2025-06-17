import type { TableListPagination } from '@/pages/Borrow/BorrowList/data';
import { IS_REGISTER, IS_REGISTER_FILTER } from '@/pages/enums';
import { US_IS_REGISTER, US_IS_REGISTER_FILTER } from '@/pages/enumsUs';
import { getAdminV1BJContacts as index } from '@/services/ant-design-pro/BJContact';
import { useIntl } from '@@/exports';
import { SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { InputRef } from 'antd';
import { Button, ConfigProvider, Input, Space } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import _ from 'lodash';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useParams } from 'umi';

export type TableListItem = API.BJContact;
type DataIndex = keyof API.BJContact;

const ContactDetail: React.FC = () => {
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
      console.log(
        _(res.data!)
          .orderBy(
            [
              ({ c_close_level }) => c_close_level || 0,
              ({ e_registered }) => e_registered || 0,
              ({ f_loan_times }) => f_loan_times || 0,
              'displayName',
            ],
            ['desc', 'desc', 'desc', 'asc'],
          )
          .value(),
      );
      setDataSource(
        _(res.data!)
          .orderBy(
            [
              ({ c_close_level }) => c_close_level || 0,
              ({ e_registered }) => e_registered || 0,
              ({ f_loan_times }) => f_loan_times || 0,
              'displayName',
            ],
            ['desc', 'desc', 'desc', 'asc'],
          )
          .value(),
      );
      setAllDataSource(
        _(res.data!)
          .orderBy(
            [
              ({ c_close_level }) => c_close_level || 0,
              ({ e_registered }) => e_registered || 0,
              ({ f_loan_times }) => f_loan_times || 0,
              'displayName',
            ],
            ['desc', 'desc', 'desc', 'asc'],
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<API.BJContact> => ({
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
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.phoneValue', defaultMessage: '' }),
      dataIndex: 'phoneValue',
      key: 'phoneValue',
      ...getColumnSearchProps('phoneValue'),
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.displayName', defaultMessage: '' }),
      dataIndex: 'displayName',
      key: 'displayName',
    },

    {
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.b_relation', defaultMessage: '' }),
      dataIndex: 'b_relation',
      key: 'b_relation',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.c_close_level', defaultMessage: '' }),
      dataIndex: 'c_close_level',
      key: 'c_close_level',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.d_call_times', defaultMessage: '' }),
      dataIndex: 'd_call_times',
      key: 'd_call_times',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.d_call_times - b.d_call_times,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.Contact.i_last_call_time',
        defaultMessage: '',
      }),
      dataIndex: 'i_last_call_time',
      key: 'i_last_call_time',
      render: (__, value) => {
        // @ts-ignore
        return value.d_call_times
          ? moment(new Date(value.d_call_times)).format('YYYY-MM-DD HH:mm')
          : '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.j_sms_count', defaultMessage: '' }),
      dataIndex: 'j_sms_count',
      key: 'j_sms_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.j_sms_count - b.j_sms_count,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.k_sms', defaultMessage: '' }),
      dataIndex: 'k_sms',
      key: 'k_sms',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.e_registered', defaultMessage: '' }),
      dataIndex: 'e_registered',
      key: 'e_registered',
      valueEnum: currentLanguage === 'zh-cn' ? IS_REGISTER : US_IS_REGISTER,
      filters: currentLanguage === 'zh-cn' ? IS_REGISTER_FILTER : US_IS_REGISTER_FILTER,
      onFilter: (value: string, record) => {
        return record.e_registered === value;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.Contact.h_related_user_id',
        defaultMessage: '',
      }),
      dataIndex: 'h_related_user_id',
      key: 'h_related_user_id',
      render: (__, value) =>
        value.h_related_user_id ? (
          <a href="/borrow/detail/19/contact/115" target="_blank" rel="noreferrer">
            {value.h_related_user_id}
          </a>
        ) : (
          '-'
        ),
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.f_loan_times', defaultMessage: '' }),
      dataIndex: 'f_loan_times',
      key: 'f_loan_times',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.f_loan_times - b.f_loan_times,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Contact.g_repay_times', defaultMessage: '' }),
      dataIndex: 'g_repay_times',
      key: 'g_repay_times',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.g_repay_times - b.g_repay_times,
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

export default ContactDetail;

import {
  ContactFieldIndex,
  ContactFieldLabels,
} from '@/pages/Borrow/BorrowList/components/service';
import type { TableListPagination } from '@/pages/Borrow/BorrowList/data';
import { getAdminV1BJContacts as index } from '@/services/ant-design-pro/BJContact';
import { SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useParams } from 'umi';

export type TableListItem = API.BJContact;
type DataIndex = keyof API.BJContact;

const ContactDetail: React.FC = () => {
  const params2 = useParams<{ id: string; verifyId?: string }>();
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [allDataSource, setAllDataSource] = useState<TableListItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  // const tableListDataSource: TableListItem[] = [];

  useEffect(() => {
    /** table */
    const _index = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await index({ page: 1, limit: 10000 });
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
      title: ContactFieldLabels.displayName,
      // @ts-ignore
      dataIndex: ContactFieldIndex.displayName,
    },
    {
      title: ContactFieldLabels.phoneValue,
      // @ts-ignore
      dataIndex: ContactFieldIndex.phoneValue,
      ...getColumnSearchProps('phoneValue'),
    },
    {
      title: ContactFieldLabels.b_relation,
      dataIndex: ContactFieldIndex.b_relation,
    },
    {
      title: ContactFieldLabels.c_close_level,
      dataIndex: ContactFieldIndex.c_close_level,
    },
    {
      title: ContactFieldLabels.e_registered,
      dataIndex: ContactFieldIndex.e_registered,
    },
    {
      title: ContactFieldLabels.f_loan_times,
      dataIndex: ContactFieldIndex.f_loan_times,
    },
    {
      title: ContactFieldLabels.g_repay_times,
      dataIndex: ContactFieldIndex.g_repay_times,
    },
    {
      title: ContactFieldLabels.h_related_user_id,
      dataIndex: ContactFieldIndex.h_related_user_id,
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
      title: ContactFieldLabels.d_call_times,
      dataIndex: ContactFieldIndex.d_call_times,
    },
    {
      title: ContactFieldLabels.i_last_call_time,
      dataIndex: ContactFieldIndex.i_last_call_time,
      render: (__, value) => {
        // @ts-ignore
        return value.d_call_times
          ? moment(new Date(value.d_call_times)).format('YYYY-MM-DD HH:mm')
          : '-';
      },
    },
    {
      title: ContactFieldLabels.company,
      dataIndex: ContactFieldIndex.company,
    },
    {
      title: ContactFieldLabels.jobTitle,
      dataIndex: ContactFieldIndex.jobTitle,
    },
    {
      title: ContactFieldLabels.postalAddresses,
      dataIndex: ContactFieldIndex.postalAddresses,
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
          pageSize: 5,
        }}
        toolBarRender={() => [
          <span key={1}>最近上送时间： 2022-03-02 15:34</span>,
          <span key={2} style={{ color: 'red' }}>
            注册联系人：30
          </span>,
          <span key={3} style={{ color: 'red' }}>
            放款联系人： 20
          </span>,
          <span key={4} style={{ color: 'red' }}>
            还款联系人：10
          </span>,
          <span key={5} style={{ color: 'red' }}>
            呼叫次数：50
          </span>,
        ]}
      />
    </>
  );
};

export default ContactDetail;

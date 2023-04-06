import { AppFieldIndex, AppFieldLabels } from '@/pages/Borrow/BorrowList/components/service';
import { TableListPagination } from '@/pages/Borrow/BorrowList/data';
import { getAdminV1SAApps as index } from '@/services/ant-design-pro/SAApp';
import { SearchOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Input, InputRef, Space } from 'antd';
import { ColumnType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useParams } from 'umi';

export type FormProps = {};
export type TableListItem = API.SAApp;
type DataIndex = keyof API.SAApp;

const AppDetail: React.FC<FormProps> = () => {
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
      const res = await index({ page: 1, limit: 100 });
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: AppFieldLabels.appName,
      // @ts-ignore
      dataIndex: AppFieldIndex.appName,
      ...getColumnSearchProps('appName'),
    },
    {
      title: AppFieldLabels.c_merchant,
      // @ts-ignore
      dataIndex: AppFieldIndex.c_merchant,
      ...getColumnSearchProps('c_merchant'),
    },
    {
      title: AppFieldLabels.firstInstallTime,
      // @ts-ignore
      dataIndex: AppFieldIndex.firstInstallTime,
      render: (__, value) => {
        // @ts-ignore
        return moment(new Date(value.firstInstallTime)).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: AppFieldLabels.f_history_installed,
      dataIndex: AppFieldIndex.f_history_installed,
    },
    {
      title: AppFieldLabels.g_sms_count,
      dataIndex: AppFieldIndex.g_sms_count,
    },
    {
      title: AppFieldLabels.h_login_sms_count,
      dataIndex: AppFieldIndex.h_login_sms_count,
    },
    {
      title: AppFieldLabels.i_refuse_sms_count,
      dataIndex: AppFieldIndex.i_refuse_sms_count,
    },
    {
      title: AppFieldLabels.j_accept_sms_count,
      dataIndex: AppFieldIndex.j_accept_sms_count,
    },
    {
      title: AppFieldLabels.k_loan_sms_count,
      dataIndex: AppFieldIndex.k_loan_sms_count,
    },
    {
      title: AppFieldLabels.l_repay_sms_count,
      dataIndex: AppFieldIndex.l_repay_sms_count,
    },
    {
      title: AppFieldLabels.m_extend_sms_count,
      dataIndex: AppFieldIndex.m_extend_sms_count,
    },
    {
      title: AppFieldLabels.n_urge_sms_count,
      dataIndex: AppFieldIndex.n_urge_sms_count,
    },
    {
      title: AppFieldLabels.o_marketing_sms_count,
      dataIndex: AppFieldIndex.o_marketing_sms_count,
    },
    {
      title: AppFieldLabels.p_recall_sms_count,
      dataIndex: AppFieldIndex.p_recall_sms_count,
    },
    {
      title: AppFieldLabels.q_other_sms_count,
      dataIndex: AppFieldIndex.q_other_sms_count,
    },
    {
      title: AppFieldLabels.s_loan_amount,
      dataIndex: AppFieldIndex.s_loan_amount,
    },
    {
      title: AppFieldLabels.t_repay_amount,
      dataIndex: AppFieldIndex.t_repay_amount,
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
        toolBarRender={() => [<span>最近上送时间： 2022-03-02 15:34</span>]}
      />
    </>
  );
};

export default AppDetail;

import type { TableListPagination } from '@/pages/Borrow/BorrowList/data';
import { IS_REGISTER, IS_REGISTER_FILTER } from '@/pages/enums';
import { US_IS_REGISTER, US_IS_REGISTER_FILTER } from '@/pages/enumsUs';
import { getAdminV1SGContactsAdmin as index } from '@/services/ant-design-pro/SGContact';
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

export type TableListItem = API.SGContact;
type DataIndex = keyof API.SGContact;

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
      const res = await index({ page: 1, limit: 10000, b_user_id: params2.userId });
      setDataSource(res.data!);
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

  

  const columns2: ProColumns<API.HKContactSms>[] = [
    {
      title: intl.formatMessage({ id: 'pages.HKContactSms.date_sent', defaultMessage: '' }),
      dataIndex: 'date_sent',
      key: 'date_sent',
    },
    {
      title: intl.formatMessage({ id: 'pages.HKContactSms.type', defaultMessage: '' }),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: intl.formatMessage({ id: 'pages.HKContactSms.address', defaultMessage: '' }),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: intl.formatMessage({ id: 'pages.HKContactSms.body', defaultMessage: '' }),
      dataIndex: 'body',
      key: 'body',
    },
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.a_idnumber', defaultMessage: '' }),
      dataIndex: 'a_idnumber',
      key: 'a_idnumber',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.b_user_id', defaultMessage: '' }),
      dataIndex: 'b_user_id',
      key: 'b_user_id',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.c_relation', defaultMessage: '' }),
      dataIndex: 'c_relation',
      key: 'c_relation',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.d_call_times', defaultMessage: '' }),
      dataIndex: 'd_call_times',
      key: 'd_call_times',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.e_last_call_time', defaultMessage: '' }),
      dataIndex: 'e_last_call_time',
      key: 'e_last_call_time',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.f_name', defaultMessage: '' }),
      dataIndex: 'f_name',
      key: 'f_name',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.g_phone', defaultMessage: '' }),
      dataIndex: 'g_phone',
      key: 'g_phone',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.h_review_result', defaultMessage: '' }),
      dataIndex: 'h_review_result',
      key: 'h_review_result',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.i_need_review', defaultMessage: '' }),
      dataIndex: 'i_need_review',
      key: 'i_need_review',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.j_admin_id', defaultMessage: '' }),
      dataIndex: 'j_admin_id',
      key: 'j_admin_id',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.k_review_count', defaultMessage: '' }),
      dataIndex: 'k_review_count',
      key: 'k_review_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.l_sms_count', defaultMessage: '' }),
      dataIndex: 'l_sms_count',
      key: 'l_sms_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.m_relation_level', defaultMessage: '' }),
      dataIndex: 'm_relation_level',
      key: 'm_relation_level',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.n_call_count', defaultMessage: '' }),
      dataIndex: 'n_call_count',
      key: 'n_call_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.SGContacts.valid_whatsapp', defaultMessage: '' }),
      dataIndex: 'valid_whatsapp',
      key: 'valid_whatsapp',
      render: (text, record) => (
         (
          <a 
            href={`https://wa.me/234${record.g_phone}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {intl.formatMessage({ id: 'pages.SGContacts.valid_whatsapp', defaultMessage: '' })}
          </a>
        )
      ),
    }
   
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
        expandable={{
          rowExpandable: (record) => record.a_a_a_a_a_h_k_contact_smss && record.a_a_a_a_a_h_k_contact_smss.length > 0,
                expandedRowRender: (record) => (
                  <ProTable
                    rowKey="id"
                    columns={columns2}
                    dataSource={record.a_a_a_a_a_h_k_contact_smss || []}
                    pagination={false}
                    headerTitle={false}
                    search={false}
                    options={false}
                  />
                ),
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

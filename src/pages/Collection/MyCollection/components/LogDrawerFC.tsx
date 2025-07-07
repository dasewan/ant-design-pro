import type { TableListPagination } from '@/pages/UserManager/AUser/data';
import { useIntl } from '@@/exports';
import { RequestOptionsType } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Drawer } from 'antd';
import React, { useRef } from 'react';
import {
  EditOutlined,
  PhoneOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

export type DrawerFCProps = {
  showDetail: boolean;
  onClose: () => void;
  data: API.QCCollectionNews[];
  type: string;
  admins: RequestOptionsType[];
};

const LogDrawerFC: React.FC<DrawerFCProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  const columns: ProColumns<API.QCCollectionNews>[] = [
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.e_collection_admin_id', defaultMessage: '' }),
      dataIndex: 'e_collection_admin_id',
      key: 'e_collection_admin_id',
      valueType: 'select',
      request: async () => {
        return props.admins;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.f_cat', defaultMessage: '' }),
      dataIndex: 'f_cat',
      key: 'f_cat',
      render: (text) => {
        switch(text) {
          case 0: return <EditOutlined style={{ color: 'black', fontSize: '18px' }} />;
          case 1: return <PhoneOutlined style={{ color: 'blue' , fontSize: '18px' }} />;
          case 6: return <ContactsOutlined style={{ color: 'green', fontSize: '18px'  }} />;
          default: return text;
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.g_type', defaultMessage: '' }),
      dataIndex: 'g_type',
      key: 'g_type',
      valueType: 'select',
      valueEnum: {
        0: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.new', defaultMessage: '新案件' }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.negotiating', defaultMessage: '协商中' }),
          status: 'Processing',
        },
        2: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.promised', defaultMessage: '承诺还款' }),
          status: 'Processing',
        },
        3: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.unfulfilled', defaultMessage: '承诺未还' }),
          status: 'Warning',
        },
        4: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.rejected', defaultMessage: '拒绝还款' }),
          status: 'Error',
        },
        7: {
          text: intl.formatMessage({ id: 'pages.BLCollectionOrder.k_status.repay', defaultMessage: '已还款' }),
          status: 'Success',
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.j_content', defaultMessage: '' }),
      dataIndex: 'j_content',
      key: 'j_content',
      render: (text, record) => {
        if (!text) return null;
        if (record.f_cat === 1 || record.f_cat === 6) {
          return (
            <audio
              controls
              src={`https://api.dasewan.cn/storage/${text}`}
            />
          );
        }
        return text;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.k_promise_time', defaultMessage: '' }),
      dataIndex: 'k_promise_time',
      key: 'k_promise_time',
    },
    {
      title: intl.formatMessage({ id: 'pages.QCCollectionNews.m_overdue_days', defaultMessage: '' }),
      dataIndex: 'm_overdue_days',
      key: 'm_overdue_days',
    },
    {
      title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateTime',

    }
  ];

  return (
    <Drawer
      width={1000}
      open={props.showDetail}
      onClose={() => {
        props.onClose();
      }}
      closable={false}
      destroyOnClose={true}
    >
      <ProTable<API.NCCollectionOrderFlowHistory, TableListPagination>
        headerTitle={intl.formatMessage({
          id: 'menu.collection.collection-news',
          defaultMessage: '',
        })}
        actionRef={actionRef}
        revalidateOnFocus={false}
        search={false}
        options={false}
        rowKey="id"
        //@bookmark
        // @ts-ignore
        request={() => {
          return {
            data: props.data.reverse(),
            success: true,
            total: props.data.length,
          };
        }}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
      />
    </Drawer>
  );
};

export default LogDrawerFC;

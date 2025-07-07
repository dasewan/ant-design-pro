import type { TableListPagination } from '@/pages/UserManager/AUser/data';
import { useIntl } from '@@/exports';
import { RequestOptionsType } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Drawer } from 'antd';
import React, { useRef } from 'react';

export type DrawerFCProps = {
  showDetail: boolean;
  onClose: () => void;
  data: API.NCCollectionOrderFlowHistory[];
  type: string;
  admins: RequestOptionsType[];
  admins2: RequestOptionsType[];
};

const DrawerFC: React.FC<DrawerFCProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  const columns: ProColumns<API.NCCollectionOrderFlowHistory>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.NCCollectionOrderFlowHistory.e_collection_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'e_collection_admin_id',
      key: 'e_collection_admin_id',
      valueType: 'select',
      request: async () => {
        return props.admins;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.NCCollectionOrderFlowHistory.f_d_collection_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'f_d_collection_admin_id',
      key: 'f_d_collection_admin_id',
      valueType: 'select',
      request: async () => {
        return props.admins;
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.NCCollectionOrderFlowHistory.f_f_type',
        defaultMessage: '',
      }),
      dataIndex: 'f_f_type',
      key: 'f_f_type',
      valueType: 'select',
      valueEnum: {
        1: {
          text: intl.formatMessage({ id: 'pages.NCCollectionOrderFlowHistory.f_f_type.system', defaultMessage: 'system' }),
          status: 'Default',
        },
        2: {
          text: intl.formatMessage({ id: 'pages.NCCollectionOrderFlowHistory.f_f_type.admin', defaultMessage: 'admin' }),
          status: 'Success',
        },
        3: {
          text: intl.formatMessage({ id: 'pages.NCCollectionOrderFlowHistory.f_f_type.release', defaultMessage: 'release' }),
          status: 'Warning',
        },
        4: {
          text: intl.formatMessage({ id: 'pages.NCCollectionOrderFlowHistory.f_f_type.noon', defaultMessage: 'noon' }),
          status: 'Default',
        },
        5: {
          text: intl.formatMessage({ id: 'pages.NCCollectionOrderFlowHistory.f_f_type.night', defaultMessage: 'night' }),
          status: 'Default',
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.NCCollectionOrderFlowHistory.f_e_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'f_e_admin_id',
      key: 'f_e_admin_id',
      valueType: 'select',
      request: async () => {
        return props.admins2;
      },
    },
    {
      title: 'created_at',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      key: 'created_at',
    },
  ];

  return (
    <Drawer
      width={600}
      open={props.showDetail}
      onClose={() => {
        props.onClose();
      }}
      closable={false}
      destroyOnClose={true}
    >
      <ProTable<API.NCCollectionOrderFlowHistory, TableListPagination>
        headerTitle={intl.formatMessage({
          id: 'menu.collection.collection-order-flow-history',
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
            data: props.data,
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

export default DrawerFC;

import { FLOW_TYPE } from '@/pages/Review/ReviewBorrowFlow/enums';
import { US_FLOW_TYPE } from '@/pages/Review/ReviewBorrowFlow/enumsUs';
import type { TableListPagination } from '@/pages/UserManager/AUser/data';
import { getAdminV1BHReviewBorrowFlows as index } from '@/services/ant-design-pro/BHReviewBorrowFlow';
import { useIntl } from '@@/exports';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils/lib/typing';
import { ConfigProvider, Drawer } from 'antd';
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react';

export type DrawerFCProps = {
  showDetail: boolean;
  onClose: () => void;
  data: API.BFReviewBorrow;
  admins: RequestOptionsType[];
  groups: RequestOptionsType[];
};

const DrawerFC: React.FC<DrawerFCProps> = (props) => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const actionRef = useRef<ActionType>();
  const [admins, setAdmins] = useState<RequestOptionsType[]>(props.admins);
  const [groups, setGroups] = useState<RequestOptionsType[]>(props.admins);
  /**
   * 获取用户动态
   * @param params
   */
  const _index = async (
    // 第一个参数 params 查询表单和 params 参数的结合
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    params: TableListPagination & {
      pageSize: number;
      current: number;
    },
    // sort,
    // filter,
  ) => {
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    // @ts-ignore
    const res = await index({
      // @ts-ignore
      a_borrow_id: props.data!.a_borrow_id!,
      page: params.current,
      ...params,
    });
    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: res.success,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.total,
    };
  };
  /**
   * 查询管理员enum
   */
  const _getUsersEnum = async () => {
    if (admins.length === 0) {
      setAdmins(props.admins);
      return props.admins;
    } else {
      return admins;
    }
  };
  /**
   * 查询管理员enum
   */
  const _getAPReviewGroupsEnum = async () => {
    if (groups.length === 0) {
      setGroups(props.groups);
      return props.groups;
    } else {
      return groups;
    }
  };
  const columns: ProColumns<API.BHReviewBorrowFlow>[] = [
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BHReviewBorrowFlow.c_before_review_group_id',
        defaultMessage: '',
      }),
      dataIndex: 'c_before_review_group_id',
      valueType: 'select',
      request: _getAPReviewGroupsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BHReviewBorrowFlow.b_before_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'b_before_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.b_before_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BHReviewBorrowFlow.g_type',
        defaultMessage: '',
      }),
      dataIndex: 'g_type',
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? FLOW_TYPE : US_FLOW_TYPE,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BHReviewBorrowFlow.e_after_review_group_id',
        defaultMessage: '',
      }),
      dataIndex: 'e_after_review_group_id',
      valueType: 'select',
      request: _getAPReviewGroupsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BHReviewBorrowFlow.d_after_admin_id',
        defaultMessage: '',
      }),
      dataIndex: 'd_after_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.d_after_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BHReviewBorrowFlow.created_at',
        defaultMessage: '',
      }),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => {
        return moment(record.created_at).format('YYYY-MM-DD HH:mm');
      },
    },
  ];

  return (
    <Drawer
      width={900}
      open={props.showDetail}
      onClose={() => {
        props.onClose();
      }}
      closable={false}
      destroyOnClose={true}
    >
      <ProTable<API.ABCreditHistory, TableListPagination>
        headerTitle="流转历史"
        actionRef={actionRef}
        revalidateOnFocus={false}
        search={false}
        options={false}
        rowKey="id"
        // @ts-ignore
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
      />
    </Drawer>
  );
};

export default DrawerFC;

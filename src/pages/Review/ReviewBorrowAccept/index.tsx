import { REVIEW_STATUS } from '@/pages/enums';
import DrawerFC from '@/pages/Review/ReviewBorrow/components/DrawerFC';
import { BORROW_TIMES_TYPE } from '@/pages/Review/ReviewGroup/enums';
import { US_BORROW_TIMES_TYPE } from '@/pages/Review/ReviewGroup/enumsUs';
import { getAdminV1APReviewGroupsEnum as getAPReviewGroupsEnum } from '@/services/ant-design-pro/APReviewGroup';
import { getAdminV1BFReviewBorrows as index } from '@/services/ant-design-pro/BFReviewBorrow';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { ConfigProvider } from 'antd';
import React, { useContext, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const actionRef = useRef<ActionType>();
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 审核组enum */
  const [groups, setGroups] = useState<RequestOptionsType[]>([]);
  /** drawer是否显示 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();

  /**
   * 查询管理员enum
   */
  const _getUsersEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length === 0) {
      const res = await getUsersEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.name,
          value: item.id!.toString(),
        });
      }
      setAdmins(data);
      return data;
    } else {
      return admins;
    }
  };
  /**
   * 查询审核组enum
   */
  const _getAPReviewGroupsEnum = async () => {
    const data: RequestOptionsType[] = [];
    console.log(123);
    if (groups.length === 0) {
      const res = await getAPReviewGroupsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id!.toString(),
        });
      }
      setGroups(data);
      return data;
    } else {
      return groups;
    }
  };

  /** table */
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
    const res = await index({ page: params.current, ...params, c_result: 50 });

    /*    if(admins.length === 0){
          // @ts-ignore
          await _getUsersEnum();
        }*/
    if (groups.length === 0) {
      // @ts-ignore
      await _getAPReviewGroupsEnum();
    }

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
   * 流转记录drawer
   * @param record
   */
  const _showDrawer = (record: TableListItem) => {
    setCurrentRow(record);
    setShowDetail(true);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.h_sn', defaultMessage: '' }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'h_sn'],
      copyable: true,
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-h_sn': value }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.BorrowDetail.a_k_phone', defaultMessage: '' }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'a_k_phone'],
      copyable: true,
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-a_k_phone': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.m_borrow_amount',
        defaultMessage: '',
      }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'm_borrow_amount'],
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-m_borrow_amount': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.BorrowDetail.l_borrow_count',
        defaultMessage: '',
      }),
      dataIndex: ['a_a_a_a_a_d_borrow', 'l_borrow_count'],
      search: {
        transform: (value: any) => ({ 'a_a_a_a_a_d_borrow-l_borrow_count': value }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.n_borrow_times_type',
        defaultMessage: '',
      }),
      dataIndex: 'n_borrow_times_type',
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? BORROW_TIMES_TYPE : US_BORROW_TIMES_TYPE,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.m_review_group_id',
        defaultMessage: '',
      }),
      dataIndex: 'm_review_group_id',
      valueType: 'select',
      request: _getAPReviewGroupsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewBorrow.b_admin_id', defaultMessage: '' }),
      dataIndex: 'b_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.b_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.s_ocr_result',
        defaultMessage: '',
      }),
      dataIndex: 's_ocr_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.d_id_number_result',
        defaultMessage: '',
      }),
      dataIndex: 'd_id_number_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.e_contact_persion_result',
        defaultMessage: '',
      }),
      dataIndex: 'e_contact_persion_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.f_job_result',
        defaultMessage: '',
      }),
      dataIndex: 'f_job_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.g_contact_result',
        defaultMessage: '',
      }),
      dataIndex: 'g_contact_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.h_sms_result',
        defaultMessage: '',
      }),
      dataIndex: 'h_sms_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.i_risk_result',
        defaultMessage: '',
      }),
      dataIndex: 'i_risk_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.j_app_result',
        defaultMessage: '',
      }),
      dataIndex: 'j_app_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.k_history_result',
        defaultMessage: '',
      }),
      dataIndex: 'k_history_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.o_device_result',
        defaultMessage: '',
      }),
      dataIndex: 'o_device_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.p_bank_result',
        defaultMessage: '',
      }),
      dataIndex: 'p_bank_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.r_liveness_result',
        defaultMessage: '',
      }),
      dataIndex: 'r_liveness_result',
      valueType: 'select',
      valueEnum: REVIEW_STATUS,
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewBorrow.l_flow_count',
        defaultMessage: '',
      }),
      dataIndex: 'l_flow_count',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              _showDrawer(record);
            }}
          >
            {record.l_flow_count}
          </a>
        );
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        ghost: true,
      }}
    >
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 50,
        }}
      />

      <DrawerFC
        showDetail={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        data={currentRow!}
        admins={admins}
        groups={groups}
      />
    </PageContainer>
  );
};

export default TableList;

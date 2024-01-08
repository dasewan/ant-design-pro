import DrawerFC from '@/pages/Review/ReviewBorrow/components/DrawerFC';
import MoveForm from '@/pages/Review/ReviewBorrow/components/MoveForm';
import { BORROW_TIMES_TYPE } from '@/pages/Review/ReviewGroup/enums';
import { US_BORROW_TIMES_TYPE } from '@/pages/Review/ReviewGroup/enumsUs';
import { getAdminV1APReviewGroupsEnum as getAPReviewGroupsEnum } from '@/services/ant-design-pro/APReviewGroup';
import { getAdminV1BFReviewBorrows as index } from '@/services/ant-design-pro/BFReviewBorrow';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';
import { QuestionOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { ConfigProvider, Space, Table, Tooltip } from 'antd';
import React, { useContext, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

export { getAdminV1BHReviewBorrowFlows as index2 } from '@/services/ant-design-pro/BHReviewBorrowFlow';

const TableList: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const actionRef = useRef<ActionType>();
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 可选的审核员 */
  const [canMoveAdmins, setCanMoveAdmins] = useState<number[]>([]);
  /** 被转移的订单类型 */
  const [borrowTimesType, setBorrowTimesType] = useState<number>();
  /** 审核组enum */
  const [groups, setGroups] = useState<RequestOptionsType[]>([]);
  /** 转移的ids */
  const [ids, setIds] = useState<string>('');
  /** 操作转移 */
  const [moveModalVisible, handleMoveModalVisible] = useState<boolean>(false);
  /** drawer是否显示 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [checkBoxDisable, setCheckBoxDisable] = useState<boolean>(true);

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
    const res = await index({ page: params.current, ...params, c_result: 10 });
    // @ts-ignore
    if (params.n_borrow_times_type !== undefined && params.b_admin_id !== undefined) {
      setCheckBoxDisable(false);
      // @ts-ignore
      setBorrowTimesType(params.n_borrow_times_type);
      setCanMoveAdmins(res.other);
    } else {
      setCheckBoxDisable(true);
      setBorrowTimesType(undefined);
      actionRef.current?.clearSelected();
    }

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
   * 开始转移
   * @param _ids
   */
  const handleMove = (_ids: string) => {
    setIds(_ids);
    handleMoveModalVisible(true);
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
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'id',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record) => {
        const edit = (
          <a
            key="edit"
            target="_blank"
            rel="noreferrer"
            href={`/borrow/detail/${record.a_borrow_id}`}
          >
            {intl.formatMessage({ id: 'pages.Borrow.ReviewBorrow.review', defaultMessage: '' })}
          </a>
        );
        return [edit];
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
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
          getCheckboxProps: () => ({
            disabled: checkBoxDisable,
          }),
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              {intl.formatMessage({
                id: 'pages.searchTable.chosen',
                defaultMessage: '',
              })}{' '}
              {selectedRowKeys.length}{' '}
              {intl.formatMessage({
                id: 'pages.searchTable.item',
                defaultMessage: '',
              })}
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                {intl.formatMessage({
                  id: 'pages.searchTable.cancelSelected',
                  defaultMessage: '',
                })}
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <Space size={16}>
              <a
                onClick={() =>
                  handleMove(selectedRows.map((item: TableListItem) => item.id).join(','))
                }
              >
                {intl.formatMessage({
                  id: 'pages.common.move',
                  defaultMessage: '',
                })}
              </a>
            </Space>
          );
        }}
        headerTitle={
          <Tooltip
            placement="right"
            title={intl.formatMessage({
              id: 'pages.Borrow.ReviewBorrow.batchMoveTooltip',
              defaultMessage: '',
            })}
          >
            {intl.formatMessage({
              id: 'pages.Borrow.ReviewBorrow.batchMove',
              defaultMessage: '',
            })}
            <QuestionOutlined />
          </Tooltip>
        }
      />

      <MoveForm
        onSubmit={async (success) => {
          if (success) {
            handleMoveModalVisible(false);
            setIds('');
            setCheckBoxDisable(true);
            setBorrowTimesType(undefined);
            actionRef.current?.clearSelected();
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleMoveModalVisible(false);
          setCheckBoxDisable(true);
          setBorrowTimesType(undefined);
          setIds('');
          actionRef.current?.clearSelected();
        }}
        moveIds={ids}
        modalVisible={moveModalVisible}
        admins={admins}
        canMoveAdmins={canMoveAdmins}
        borrowTimesType={borrowTimesType}
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

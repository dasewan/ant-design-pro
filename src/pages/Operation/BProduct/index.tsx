import { MenuOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal, Tag } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import React, { useRef, useState } from 'react';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import type { TableListItem, TableListPagination } from './data';
import styles from './index.less';
import { fieldLabels } from './service';

import OverviewModel from '@/pages/Operation/BProduct/components/OverviewModel';
import Snapshot from '@/pages/Operation/BProduct/components/Snapshot';
import TryCalcuteModel from '@/pages/Operation/BProduct/components/TryCalcuteModel';
import {
  AMOUNT_TYPE,
  COMMON_STATUS_ALLOW,
  COMMON_STATUS_DISPLAY,
  PRODUCT_SETTLEMENT_TYPE,
  PRODUCT_TYPE,
} from '@/pages/Operation/BProduct/enums';
import {
  getAdminV1BProducts as index,
  putAdminV1BProductsSort as sort,
} from '@/services/ant-design-pro/BProduct';
import { history } from '@@/core/history';

export { getAdminV1HProductSnapshots as index2 } from '@/services/ant-design-pro/HProductSnapshot';
export { getAdminV1UsersEnum as getUserEnum } from '@/services/ant-design-pro/User';

// 排序相关固定模版start
const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));
const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
));
// 排序相关固定模版end

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 预览model */
  const [overviewModalVisible, setOverviewModalVisible] = useState<boolean>(false);
  /** 试算model */
  const [tryCalcuteModalVisible, setTryCalcuteModalVisible] = useState<boolean>(false);
  /** 快照model */
  const [snapshotModalVisible, setSnapshotModalVisible] = useState<boolean>(false);
  /** 当前数据 */
  const [newRecord, setNewRecord] = useState<TableListItem>();
  // 排序固定模版
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);

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
    const res = await index({ foo: null, page: params.current, limit: 100, ...params });
    // 排序固定模版
    if (res.data) {
      setDataSource(res.data);
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
   * 排序固定模版start
   * @param newData
   */
  const confirm = (newData: API.BProduct[]) => {
    const ids = newData.map((item: TableListItem) => item.id).join('##');
    const names = newData.map((item: TableListItem) => item.b_name).join(',');
    const content = '新的产品顺序为:' + names;
    Modal.confirm({
      title: '确认排序?',
      content: content,
      onOk: async () => {
        // @ts-ignore
        const res = await sort({ foo: null, ids: ids });
        console.log(res);
        if (res.success) {
          message.success('排序成功');
          actionRef.current?.reload();
        } else {
          message.error('排序失败');
        }
        return Promise.resolve();
      },
      onCancel: () => Promise.resolve(),
    });
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(dataSource!.slice(), oldIndex, newIndex).filter(
        (el: TableListItem) => !!el,
      );
      confirm(newData);
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const indexKey = dataSource.findIndex((x) => x.id === restProps['data-row-key']);
    return <SortableItem index={indexKey} {...restProps} />;
  };
  // 排序固定模版end

  /**
   * 展示试算model
   * @param record
   */
  const onTryCalcuteClick = (record: TableListItem) => {
    setNewRecord(record);
    setTryCalcuteModalVisible(true);
  };

  /**
   * 关闭试算model
   */
  const onTryCalcuteModelOk = () => {
    setTryCalcuteModalVisible(false);
  };

  /**
   * 展示预览model
   * @param record
   */
  const onOverviewClick = (record: TableListItem) => {
    setNewRecord(record);
    setOverviewModalVisible(true);
  };

  /**
   * 关闭预览model
   */
  const onOverviewModelOk = () => {
    setOverviewModalVisible(false);
  };

  /**
   * 展示快照model
   * @param record
   */
  const onSnapshotClick = (record: TableListItem) => {
    setNewRecord(record);
    setSnapshotModalVisible(true);
  };

  /**
   * 关闭预览model
   */
  const onSnapshotModelOk = () => {
    setSnapshotModalVisible(false);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: fieldLabels.b_name,
      dataIndex: 'b_name',
      fixed: 'left',
      width: 160,
    },
    {
      title: '基本信息',
      search: false,
      children: [
        {
          title: fieldLabels.o_type,
          dataIndex: 'o_type',
          width: 100,
          initialValue: [],
          valueType: 'select',
          render: (_, record) => (
            <Tag color={PRODUCT_TYPE[record.o_type!].color}>
              {PRODUCT_TYPE[record.o_type!].text}
            </Tag>
          ),
        },
        {
          title: fieldLabels.a_a_amount_type,
          dataIndex: 'a_a_amount_type',
          initialValue: [],
          width: 120,
          valueType: 'select',
          render: (_, record) => (
            <Tag color={AMOUNT_TYPE[record.a_a_amount_type!].color}>
              {AMOUNT_TYPE[record.a_a_amount_type!].text}
            </Tag>
          ),
        },
        {
          title: fieldLabels.a_b_day_valid_count,
          dataIndex: 'a_b_day_valid_count',
          width: 120,
        },
        {
          title: fieldLabels.m_can_part_pay,
          dataIndex: 'm_can_part_pay',
          initialValue: [],
          valueType: 'select',
          valueEnum: COMMON_STATUS_ALLOW,
          width: 130,
        },
        {
          title: fieldLabels.n_can_extend,
          dataIndex: 'n_can_extend',
          initialValue: [],
          valueType: 'select',
          valueEnum: COMMON_STATUS_ALLOW,
          width: 120,
        },
        {
          title: fieldLabels.u_status,
          dataIndex: 'u_status',
          initialValue: [],
          valueType: 'select',
          valueEnum: COMMON_STATUS_DISPLAY,
          width: 100,
        },
      ],
    },
    {
      title: '金额计算',
      search: false,
      children: [
        {
          title: fieldLabels.f_settlement_type,
          dataIndex: 'f_settlement_type',
          initialValue: [],
          valueType: 'select',
          render: (_, record) => (
            <Tag color={PRODUCT_SETTLEMENT_TYPE[record.f_settlement_type!].color}>
              {PRODUCT_SETTLEMENT_TYPE[record.f_settlement_type!].text}
            </Tag>
          ),
          width: 120,
        },
        {
          title: fieldLabels.c_amount,
          dataIndex: 'c_amount',
          width: 100,
          className: styles.blue2,
        },
        {
          title: fieldLabels.z_period,
          dataIndex: 'z_period',
          width: 100,
          className: styles.blue2,
        },
        {
          title: fieldLabels.e_life,
          dataIndex: 'e_life',
          width: 100,
          className: styles.blue2,
        },
        {
          title: fieldLabels.g_interest,
          dataIndex: 'g_interest',
          width: 100,
          className: styles.blue2,
        },
        {
          title: fieldLabels.h_service_fee_rate,
          dataIndex: 'h_service_fee_rate',
          width: 100,
          className: styles.blue2,
        },
        {
          title: fieldLabels.i_overdue_rate,
          dataIndex: 'i_overdue_rate',
          width: 100,
          className: styles.blue2,
        },
        {
          title: fieldLabels.i_overdue_rate,
          dataIndex: 'i_overdue_rate',
          width: 100,
          className: styles.blue2,
        },
        {
          title: fieldLabels.k_extend_rate,
          dataIndex: 'k_extend_rate',
          width: 100,
          className: styles.blue2,
        },
        {
          title: fieldLabels.l_min_pay,
          dataIndex: 'l_min_pay',
          width: 120,
          className: styles.blue2,
        },
      ],
    },
    {
      title: '可借条件',
      search: false,
      className: styles.blue,
      children: [
        {
          title: fieldLabels.q_unlock_credit_fraction,
          dataIndex: 'q_unlock_credit_fraction',
          width: 100,
          className: styles.blue,
        },
        {
          title: fieldLabels.r_settled_times,
          dataIndex: 'r_settled_times',
          width: 120,
          className: styles.blue,
        },
        {
          title: fieldLabels.s_max_overdue_days,
          dataIndex: 's_max_overdue_days',
          width: 120,
          className: styles.blue,
        },
        {
          title: fieldLabels.t_max_overdue_times,
          dataIndex: 't_max_overdue_times',
          width: 120,
          className: styles.blue,
        },
      ],
    },
    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'option',
      width: 220,
      fixed: 'right',
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => history.push(`/operation/product/detail/${record.id}`)}>
            编辑
          </a>
        );
        const overdue = (
          <a key="overdue" onClick={() => onOverviewClick(record)}>
            预览
          </a>
        );
        const tryCalcute = (
          <a key="tryCalcute" onClick={() => onTryCalcuteClick(record)}>
            试算
          </a>
        );
        const snapshot = (
          <a key="snapshot" onClick={() => onSnapshotClick(record)}>
            快照
          </a>
        );
        return [overdue, tryCalcute, snapshot, edit, <DragHandle key="drag" />];
      },
    },
  ];

  return (
    <PageContainer
      header={{
        title: '借贷产品管理',
        ghost: true,
        extra: [
          <Button key="3" type="primary">
            产品统计
          </Button>,
          <Button
            key="4"
            type="primary"
            onClick={() => history.push(`/operation/product/detail/0`)}
          >
            新建
          </Button>,
        ],
      }}
    >
      <ProTable<TableListItem, TableListPagination>
        // headerTitle="客户列表"
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
        pagination={false}
        scroll={{ x: '50%' }}
        bordered={true}
        // 排序固定模版
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
      <OverviewModel
        onOk={onOverviewModelOk}
        modalVisible={overviewModalVisible}
        record={newRecord!}
      />
      <TryCalcuteModel
        onOk={onTryCalcuteModelOk}
        modalVisible={tryCalcuteModalVisible}
        record={newRecord!}
      />
      {/*@ts-ignore*/}
      <Snapshot
        onOk={onSnapshotModelOk}
        modalVisible={snapshotModalVisible}
        productId={newRecord?.id}
      />
    </PageContainer>
  );
};

export default TableList;

import { MenuOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import React, { useRef, useState } from 'react';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import type { TableListItem, TableListPagination } from './data';
import styles from './index.less';
import { FieldLabels } from './service';

import { RISK_TAGS_ENUM } from '@/pages/enums';
import { getAdminV1GGRiskStrateiesEnums as getStrateiesEnums } from '@/services/ant-design-pro/GGRiskStratey';
import {
  getAdminV1NERiskStrategyRoutes as index,
  putAdminV1NERiskStrategyRoutesSort as sort,
} from '@/services/ant-design-pro/NERiskStrategyRoute';
import { RequestOptionsType } from '@ant-design/pro-utils';
import CreateForm from './components/CreateForm';

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
  /** 管理员enum */
  const [strateies, setStrateies] = useState<RequestOptionsType[]>([]);
  /** 风控字段展示 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);
  // 排序固定模版
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);

  /**
   * 查询管理员enum
   */
  const _getStrateiesEnums = async () => {
    const data: RequestOptionsType[] = [];
    if (strateies.length === 0) {
      const res = await getStrateiesEnums({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id,
        });
      }
      setStrateies(data);
      return data;
    } else {
      return strateies;
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
    const res = await index({ foo: null, page: params.current, limit: 100, ...params });
    console.log(res.data);
    res.data!.forEach((_item: TableListItem) => {
      if (_item.c_borrow !== undefined && _item.c_borrow !== null && _item.c_borrow.length > 0) {
        // @ts-ignore
        _item.c_borrow = _item.c_borrow.split(',');
      }
      if (_item.d_channel !== undefined && _item.d_channel !== null && _item.d_channel.length > 0) {
        // @ts-ignore
        _item.d_channel = _item.d_channel.split(',');
      }
      if (_item.e_sms !== undefined && _item.e_sms !== null && _item.e_sms.length > 0) {
        // @ts-ignore
        _item.e_sms = _item.e_sms.split(',');
      }
      if (_item.f_contact !== undefined && _item.f_contact !== null && _item.f_contact.length > 0) {
        // @ts-ignore
        _item.f_contact = _item.f_contact.split(',');
      }
      if (_item.g_app !== undefined && _item.g_app !== null && _item.g_app.length > 0) {
        // @ts-ignore
        _item.g_app = _item.g_app.split(',');
      }
      if (_item.h_region !== undefined && _item.h_region !== null && _item.h_region.length > 0) {
        // @ts-ignore
        _item.h_region = _item.h_region.split(',');
      }
      if (_item.i_age !== undefined && _item.i_age !== null && _item.i_age.length > 0) {
        // @ts-ignore
        _item.i_age = _item.i_age.split(',');
      }
    });
    // 排序固定模版
    if (res.data) {
      setDataSource(res.data);
    }
    await _getStrateiesEnums();
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
  const confirm = (newData: TableListItem[]) => {
    const ids = newData.map((item: TableListItem) => item.id).join('##');
    const names = newData.map((item: TableListItem) => item.a_name).join(',');
    const content = '新的策略路由顺序为:' + names;
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
    console.log(className);
    console.log(style);
    const indexKey = dataSource.findIndex((x) => x.id === restProps['data-row-key']);
    return <SortableItem index={indexKey} {...restProps} />;
  };
  // 排序固定模版end
  /**
   * 展示预览model
   * @param _id
   */
  const onEditClick = async (_id: number) => {
    setId(_id);
    handleCreateModalVisible(true);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: 'a_name',
      fixed: 'left',
    },
    {
      title: '画像',
      search: false,
      children: [
        {
          title: FieldLabels.c_borrow,
          dataIndex: 'c_borrow',
          valueType: 'select',
          valueEnum: RISK_TAGS_ENUM,
          hideInSearch: true,
        },
        {
          title: FieldLabels.d_channel,
          dataIndex: 'd_channel',
          valueType: 'select',
          valueEnum: RISK_TAGS_ENUM,
          hideInSearch: true,
        },
        {
          title: FieldLabels.e_sms,
          dataIndex: 'e_sms',
          valueType: 'select',
          valueEnum: RISK_TAGS_ENUM,
          hideInSearch: true,
        },
        {
          title: FieldLabels.f_contact,
          dataIndex: 'f_contact',
          valueType: 'select',
          valueEnum: RISK_TAGS_ENUM,
          hideInSearch: true,
        },
        {
          title: FieldLabels.g_app,
          dataIndex: 'g_app',
          valueType: 'select',
          valueEnum: RISK_TAGS_ENUM,
          hideInSearch: true,
        },
        {
          title: FieldLabels.h_region,
          dataIndex: 'h_region',
          valueType: 'select',
          valueEnum: RISK_TAGS_ENUM,
          hideInSearch: true,
        },
        {
          title: FieldLabels.i_age,
          dataIndex: 'i_age',
          valueType: 'select',
          valueEnum: RISK_TAGS_ENUM,
          hideInSearch: true,
        },
      ],
    },
    {
      title: '决策',
      search: false,
      className: styles.blue,
      children: [
        {
          title: FieldLabels.j_risk_strategy_id_1,
          dataIndex: 'j_risk_strategy_id_1',
          render: (_, record) => {
            if (record.j_risk_strategy_id_1 !== undefined && record.j_risk_strategy_id_1 !== null) {
              const label = strateies.find(
                (value) => value.value === record.j_risk_strategy_id_1,
              )!.label;
              return label + '[' + record.k_risk_strategy_1_rate + '%]';
            } else {
              return undefined;
            }
          },
        },
        {
          title: FieldLabels.l_risk_strategy_id_2,
          dataIndex: 'l_risk_strategy_id_2',
          render: (_, record) => {
            if (record.l_risk_strategy_id_2 !== undefined && record.l_risk_strategy_id_2 !== null) {
              const label = strateies.find(
                (value) => value.value === record.l_risk_strategy_id_2,
              )!.label;
              return label + '[' + record.m_risk_strategy_2_rate + '%]';
            } else {
              return undefined;
            }
          },
        },
        {
          title: FieldLabels.n_risk_strategy_id_3,
          dataIndex: 'n_risk_strategy_id_3',
          render: (_, record) => {
            if (record.n_risk_strategy_id_3 !== undefined && record.n_risk_strategy_id_3 !== null) {
              const label = strateies.find(
                (value) => value.value === record.n_risk_strategy_id_3,
              )!.label;
              return label + '[' + record.o_risk_strategy_3_rate + '%]';
            } else {
              return undefined;
            }
          },
        },
      ],
    },
    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'option',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => onEditClick(record.id!)}>
            编辑
          </a>
        );

        return [edit, <DragHandle key="drag" />];
      },
    },
  ];

  return (
    <PageContainer
      header={{
        title: '决策路由',
        ghost: true,
        extra: [
          <Button key="4" type="primary" onClick={() => onEditClick(0)}>
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
        search={false}
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
      <CreateForm
        onSubmit={async (success) => {
          if (success) {
            handleCreateModalVisible(false);
            setId(0);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCreateModalVisible(false);
          setId(0);
        }}
        id={id}
        modalVisible={createModalVisible}
        strategies={strateies}
      />
    </PageContainer>
  );
};

export default TableList;

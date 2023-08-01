import CreateForm from '@/pages/Risk/RiskItem/components/CreateForm';
import { getAdminV1ANRiskItemCats as indexCat } from '@/services/ant-design-pro/ANRiskItemCat';
import {
  getAdminV1GDRiskItems as index,
  putAdminV1GDRiskItemsReletedCount as updateCount,
} from '@/services/ant-design-pro/GDRiskItem';
import { EllipsisOutlined, SyncOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Dropdown, MenuProps, message, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { RISK_ITEM_TYPE } from './enums';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 风控字段展示 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);
  const [cats, setCats] = useState<RequestOptionsType[]>([]);

  /**
   * 查询分类enum
   */
  const _getCatsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (cats.length === 0) {
      // @ts-ignore
      const res = await indexCat({ foo: 1, h_parent_id: 0 });
      // console.log(res.data);
      for (const item of res.data!) {
        const children = [];
        // @ts-ignore
        for (const _children of item.cChildren!) {
          const children2 = [];
          for (const _children2 of _children.cChildren!) {
            children2.push({
              label: _children2.b_name,
              value: _children2.id,
            });
          }

          children.push({
            label: _children.b_name,
            value: _children.id,
            children: children2,
          });
        }
        data.push({
          label: item.b_name,
          value: item.id,
          children,
        });
      }
      console.log(data);
      setCats(data);
      return data;
    } else {
      return cats;
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
    const res = await index({ page: params.current, ...params });

    res.data!.forEach((_item: API.GDRiskItem) => {
      if (_item.k_parent_cat_id === undefined || _item.k_parent_cat_id === 0) {
        // @ts-ignore
        _item.d_cat_id = [_item.d_cat_id];
      } else {
        // @ts-ignore
        _item.d_cat_id = [_item.k_parent_cat_id, _item.d_cat_id];
      }
    });

    // @ts-ignore
    await _getCatsEnum();

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
   * 展示预览model
   * @param _id
   */
  const onEditClick = async (_id: number) => {
    setId(_id);
    handleCreateModalVisible(true);
  };
  /**
   * 更新关联规则数量
   */
  const _updateCount = async () => {
    message.loading('正在更新');
    const res = await updateCount();
    if (res.success) {
      message.success('更新成功');
      actionRef.current?.reload();
    } else {
      message.success('更新失败');
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: FieldIndex.a_name,
      // width: 410,
    },
    /*    {
          title: FieldLabels.b_local_name,
          dataIndex: FieldIndex.b_local_name,
          width:360,
        },*/
    {
      title: FieldLabels.d_cat_id,
      dataIndex: FieldIndex.d_cat_id,
      valueType: 'cascader',
      request: _getCatsEnum,
      // width:'20%'
    },
    {
      title: FieldLabels.e_type,
      dataIndex: FieldIndex.e_type,
      valueType: 'select',
      initialValue: [],
      width: '5%',
      // @ts-ignore
      valueEnum: RISK_ITEM_TYPE,
      render: (_, record) => (
        <Tag color={RISK_ITEM_TYPE[record.e_type!].color}>
          {RISK_ITEM_TYPE[record.e_type!].text}
        </Tag>
      ),
    },
    {
      title: FieldLabels.f_related_count,
      dataIndex: FieldIndex.f_related_count,
      width: '5%',
    },
    {
      title: FieldLabels.g_description,
      dataIndex: FieldIndex.g_description,
      ellipsis: true,
      width: '5%',
    },
    /*    {
          title: FieldLabels.h_local_description,
          dataIndex: FieldIndex.h_local_description,
          ellipsis: true,
        },*/
    {
      title: FieldLabels.i_comment,
      dataIndex: FieldIndex.i_comment,
      ellipsis: true,
      width: '5%',
    },
    /*{
      title: FieldLabels.created_at,
      dataIndex: FieldIndex.created_at,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.created_at).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({
          'created_at[0]': value[0],
          'created_at[1]': value[1],
        }),
      },
    },
    {
      title: FieldLabels.updated_at,
      dataIndex: FieldIndex.updated_at,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record!.updated_at).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({
          'updated_at[0]': value[0],
          'updated_at[1]': value[1],
        }),
      },
    },*/
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '5%',
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => onEditClick(record.id!)}>
            编辑
          </a>
        );

        return [edit];
      },
    },
  ];
  const items: MenuProps['items'] = [
    {
      label: <a onClick={() => _updateCount()}>更新关联数</a>,
      key: 'item-2',
      icon: <SyncOutlined />,
    },
  ];
  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '风控字段管理',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => onEditClick(0)}>
            新建风控字段
          </Button>,
          <Dropdown key="dropdown" trigger={['click']} menu={{ items }}>
            <Button key="4" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ],
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
      {/*表单model*/}
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
        cats={cats}
      />
    </PageContainer>
  );
};

export default TableList;

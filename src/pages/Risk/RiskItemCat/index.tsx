import CreateForm from '@/pages/Risk/RiskItemCat/components/CreateForm';
import {
  getAdminV1ANRiskItemCatEnums as getCatsEnum,
  getAdminV1ANRiskItemCats as index,
} from '@/services/ant-design-pro/ANRiskItemCat';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
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
    const res = await getCatsEnum({ foo: 1, h_parent_id: 0 });
    data.push({
      label: '-',
      value: 0,
    });
    for (const item of res.data!) {
      data.push({
        label: item.b_name,
        value: item.id,
      });
    }
    setCats(data);
    return data;
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
    const res = await index({ page: params.current, h_parent_id: 0, ...params });
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.b_name,
      dataIndex: FieldIndex.b_name,
    },
    {
      title: FieldLabels.b_name,
      dataIndex: FieldIndex.b_name,
    },
    {
      title: FieldLabels.h_parent_id,
      dataIndex: FieldIndex.h_parent_id,
      valueType: 'select',
      request: _getCatsEnum,
    },
    {
      title: FieldLabels.e_description,
      dataIndex: FieldIndex.e_description,
      ellipsis: true,
    },
    {
      title: FieldLabels.g_comment,
      dataIndex: FieldIndex.g_comment,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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

  const expandedRowRender = (record: TableListItem) => {
    const dataSourse: TableListItem[] = record.children!;
    return (
      <ProTable<TableListItem, TableListPagination>
        columns={columns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={dataSourse}
        pagination={false}
        rowKey="id"
      />
    );
  };

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
        ],
      }}
    >
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={_index}
        columns={columns}
        postData={(data: any[]) => {
          return data;
        }}
        pagination={{
          pageSize: 50,
        }}
        // @ts-ignore
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: true,
          // @ts-ignore
          rowExpandable: (record) => record.children.length! > 0,
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

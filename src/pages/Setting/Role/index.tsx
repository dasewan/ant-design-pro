import CreateForm from '@/pages/Setting/Role/components/CreateForm';

import { getAdminV1GNCollectionStagesEnum as getCollectionStagesEnum } from '@/services/ant-design-pro/GNCollectionStage';
import {
  getAdminV1Roles as index,
  putAdminV1RolesId as update,
  getAdminV1RolesId as show,
} from '@/services/ant-design-pro/ROle';
import {
  getAdminV1Permissions as index2,

} from '@/services/ant-design-pro/PErmission';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import {Button, TreeDataNode} from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import {useIntl} from "@@/exports";

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  /** 新建催收机构 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);
  const [permissionTreeData, setPermissionTreeData] = useState<TreeDataNode[]>([]);

  function convertToTreeData(data: API.Permission[]): TreeDataNode[] {
    const root: TreeDataNode = { key: 'root', title: 'root', children: [] };
    const nodeMap: { [key: string]: TreeDataNode } = { '': root };

    data.forEach(item => {
      const parts = item.path.split('/');
      let currentPath = '';
      let currentPath2 = '';
      let parentNode = root;

      parts.forEach((part, index) => {
        const path = currentPath ? `${currentPath}/${part}` : part;
        console.log(path);
        const path2 = currentPath2 ? `${currentPath2}.${part}` : part;
        if (!nodeMap[path]) {
          const newNode: TreeDataNode = {
            key: item.name,
            title: intl.formatMessage({ id: 'menu.' + path2, defaultMessage: 'menu.' + path2 }),
            children: [],
          };
          nodeMap[path] = newNode;
          parentNode.children!.push(newNode);
        }
        parentNode = nodeMap[path];
        currentPath = path;
        currentPath2 = path2;
      });
    });
    setPermissionTreeData(root.children || []);
    return root.children || [];
  }
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
    if(permissionTreeData.length === 0){
      const res2 = await index2({ page: params.current, ...params });
      convertToTreeData(res2.data!);
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
   * 新建催收机构model
   * @param _id
   */
  const onEditClick = async (_id: number) => {
    setId(_id);
    handleCreateModalVisible(true);
  };


  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'name',
      dataIndex: 'name',
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

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '催收机构管理',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => onEditClick(0)}>
            新建催收机构
          </Button>,
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
        collectionStages={[]}
        admins={[]}
        permissions = {permissionTreeData}
      />

    </PageContainer>
  );
};

export default TableList;

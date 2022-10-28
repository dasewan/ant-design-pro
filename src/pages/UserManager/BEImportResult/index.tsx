import { STATUS_ENUM } from '@/pages/enums';
import CreateForm from '@/pages/Risk/RiskItemCat/components/CreateForm';
import { getChannelsEnum, getUserEnum } from '@/pages/UserManager/AUser/service';
import { IMPORT_TYPE } from '@/pages/UserManager/BEImportResult/enums';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Tag } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels, index } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 风控字段展示 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);

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
    // @ts-ignore

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
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length == 0) {
      const res = await getChannelsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_title,
          value: item.id,
        });
      }
      setChannels(data);
      return data;
    } else {
      return channels;
    }
  };

  /**
   * 查询管理员enum
   */
  const _getUserEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length == 0) {
      const res = await getUserEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.name,
          value: item.id,
        });
      }
      setAdmins(data);
      return data;
    } else {
      return admins;
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_admin_file_id,
      dataIndex: FieldIndex.a_admin_file_id,
    },
    {
      title: FieldLabels.b_type,
      dataIndex: FieldIndex.b_type,
      valueType: 'select',
      render: (_, record) => (
        <Tag color={IMPORT_TYPE[record.b_type!].color}>{IMPORT_TYPE[record.b_type!].text}</Tag>
      ),
    },
    {
      title: FieldLabels.c_channel_id,
      dataIndex: FieldIndex.c_channel_id,
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: FieldLabels.d_valid_date,
      dataIndex: FieldIndex.d_valid_date,
      ellipsis: true,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.d_valid_date).format('YY-MM-DD');
      },
      search: {
        transform: (value: any) => ({ 'd_valid_date[0]': value[0], 'd_valid_date[1]': value[1] }),
      },
    },
    {
      title: FieldLabels.e_import_count,
      dataIndex: FieldIndex.e_import_count,
    },
    {
      title: FieldLabels.f_valid_count,
      dataIndex: FieldIndex.f_valid_count,
    },
    {
      title: FieldLabels.g_register_count,
      dataIndex: FieldIndex.g_register_count,
    },
    {
      title: FieldLabels.h_repeat_count,
      dataIndex: FieldIndex.h_repeat_count,
    },
    {
      title: FieldLabels.i_admin_id,
      dataIndex: FieldIndex.i_admin_id,
      valueType: 'select',
      request: _getUserEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id == 1 && item.id == record.i_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: FieldLabels.l_expect_execute_at,
      dataIndex: FieldIndex.l_expect_execute_at,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.l_expect_execute_at).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({
          'l_expect_execute_at[0]': value[0],
          'l_expect_execute_at[1]': value[1],
        }),
      },
    },
    {
      title: FieldLabels.updated_at,
      dataIndex: FieldIndex.updated_at,
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.updated_at).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({ 'updated_at[0]': value[0], 'updated_at[1]': value[1] }),
      },
    },
    {
      title: FieldLabels.k_status,
      dataIndex: FieldIndex.k_status,
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      hideInSearch: true,
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '导入结果',
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
      />
    </PageContainer>
  );
};

export default TableList;

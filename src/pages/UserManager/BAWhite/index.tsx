import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, Button, Dropdown, Menu, message, Popconfirm } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { destroy, getChannelsEnum, getUserEnum, index } from './service';

import ImportForm from '@/pages/UserManager/BAWhite/components/ImportForm';
import { DownloadOutlined, EllipsisOutlined, FileTextOutlined } from '@ant-design/icons';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';

const TableList: React.FC = () => {
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 导入白名单excel */
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

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
    const res = await index({ foo: null, page: params.current, ...params });
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
  const _confirmRemove = async (id: number) => {
    const hide = message.loading('正在配置');
    try {
      // @ts-ignore
      await destroy({
        id: id,
      });
      if (actionRef.current) {
        actionRef.current.reload();
      }
      hide();
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };

  /**
   * 查询管理员enum
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

  const columns: ProColumns<TableListItem>[] = [
    //todo 动态draw和复制分离
    {
      title: '电话',
      dataIndex: 'a_phone',
      copyable: true,
    },
    {
      title: '渠道',
      dataIndex: 'l_channel_id',
      valueType: 'select',
      request: _getChannelsEnum,
      params: { timestamp: Math.random() },
    },
    {
      title: '营销次数',
      dataIndex: 'd_market_times',
    },
    {
      title: '是否注册',
      dataIndex: 'b_user_id',
      render: (_, record) => {
        return record.b_user_id ? <Badge status="success" /> : <Badge status="default" />;
      },
    },
    {
      title: '有效时间',
      dataIndex: 'i_valid_date',
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.i_valid_date).format('YY-MM-DD');
      },
      search: {
        transform: (value: any) => ({ 'i_valid_date[0]': value[0], 'i_valid_date[1]': value[1] }),
      },
    },
    {
      title: '导入管理员',
      dataIndex: 'k_admin_id',
      valueType: 'select',
      request: _getUserEnum,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const remove = (
          <Popconfirm
            title={`Are you sure to delete ${record.a_phone}?`}
            key={record.id}
            onConfirm={() => _confirmRemove(record.id!)}
            okText="Yes"
            cancelText="No"
          >
            <a href="@/pages/UserManager/BAWhite/index#">Delete</a>
          </Popconfirm>
        );
        return [remove];
      },
    },
  ];

  return (
    <PageContainer
      header={{
        title: '白名单信息',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => handleImportModalVisible(true)}>
            导入白名单
          </Button>,
          <Dropdown
            key="dropdown"
            trigger={['click']}
            overlay={
              <Menu
                items={[
                  { label: '操作说明', key: 'item-1', icon: <FileTextOutlined /> },
                  {
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={'/admin/v1/aLAdminFiles_templete/white_info_list.xlsx'}
                      >
                        模版下载
                      </a>
                    ),
                    key: 'item-2',
                    icon: <DownloadOutlined />,
                  },
                ]}
              />
            }
          >
            <Button key="4" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
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
        pagination={{
          pageSize: 50,
        }}
      />
      <ImportForm
        onSubmit={async (success) => {
          if (success) {
            handleImportModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleImportModalVisible(false);
        }}
        modalVisible={importModalVisible}
      />
    </PageContainer>
  );
};

export default TableList;

import CreateForm from '@/pages/Review/ReviewGroup/components/CreateForm';

import { COMMON_STATUS_QIYONG } from '@/pages/Operation/Channel/enums';
import ReleaseForm from '@/pages/Review/ReviewGroup/components/ReleaseForm';
import { BORROW_TIMES_TYPE, MODE_TYPE } from '@/pages/Review/ReviewGroup/enums';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import {
  getAdminV1APReviewGroups as index,
  getAdminV1APReviewGroupsConfig as check,
} from '@/services/ant-design-pro/APReviewGroup';
import { getAdminV1ProductsEnum as getProductsEnum } from '@/services/ant-design-pro/BProduct';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button, message, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 新建审核组 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 释放 */
  const [releaseModalVisible, handleReleaseModalVisible] = useState<boolean>(false);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);
  const [products, setProducts] = useState<RequestOptionsType[]>([]);
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 渠道enum */
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 审核组enum */
  const [groups, setGroups] = useState<RequestOptionsType[]>([]);
  const [currentRecord, setCurrentRecord] = useState<TableListItem>();

  /**
   * 查询产品enum
   */
  const _getProductsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (products.length == 0) {
      const res = await getProductsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.b_name,
          value: item.id!.toString(),
        });
      }
      setProducts(data);
      return data;
    } else {
      return products;
    }
  };
  /**
   * 查询管理员enum
   */
  const _getUsersEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length == 0) {
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
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length == 0) {
      const res = await getChannelsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_title,
          value: item.id!.toString(),
        });
      }
      setChannels(data);
      return data;
    } else {
      return channels;
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
    if (products.length == 0) {
      // @ts-ignore
      await _getProductsEnum();
    }
    if (admins.length == 0) {
      // @ts-ignore
      await _getUsersEnum();
    }
    if (channels.length == 0) {
      // @ts-ignore
      await _getChannelsEnum();
    }
    if (groups.length == 0) {
      const dataGroup: RequestOptionsType[] = [];
      // @ts-ignore
      for (const item of res.data!) {
        dataGroup.push({
          label: item.a_name,
          value: item.id!.toString(),
          b_borrow_times: item.b_borrow_times,
        });
      }
      setGroups(dataGroup);
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
  const _check = async () => {
    const hide = message.loading('正在检查配置');

    try {
      const res = await check({ foo: 1 });
      if (!res.success) {
        message.error(res.message);
        return false;
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
   * 新建审核组model
   * @param _id
   */
  const onEditClick = async (_id: number) => {
    setId(_id);
    handleCreateModalVisible(true);
  };
  /**
   * 释放model
   * @param _record
   */
  const onReleaseClick = async (_record: TableListItem) => {
    setCurrentRecord(_record);
    handleReleaseModalVisible(true);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: FieldLabels.a_name,
      dataIndex: FieldIndex.a_name,
    },

    {
      title: FieldLabels.b_borrow_times,
      dataIndex: FieldIndex.b_borrow_times,
      valueType: 'select',
      initialValue: [],
      valueEnum: BORROW_TIMES_TYPE,
      render: (_, record) => (
        <Tag color={BORROW_TIMES_TYPE[record.b_borrow_times!].color}>
          {BORROW_TIMES_TYPE[record.b_borrow_times!].text}
        </Tag>
      ),
    },
    {
      title: FieldLabels.c_weight,
      dataIndex: FieldIndex.c_weight,
    },
    {
      title: FieldLabels.g_mode,
      dataIndex: FieldIndex.g_mode,
      valueType: 'select',
      initialValue: [],
      valueEnum: MODE_TYPE,
      render: (_, record) => (
        <Tag color={MODE_TYPE[record.g_mode!].color}>{MODE_TYPE[record.g_mode!].text}</Tag>
      ),
    },
    {
      title: FieldLabels.d_status,
      dataIndex: FieldIndex.d_status,
      initialValue: [],
      valueType: 'select',
      valueEnum: COMMON_STATUS_QIYONG,
    },
    {
      title: FieldLabels.e_channels,
      dataIndex: FieldIndex.e_channels,
      render: (_, record) => {
        let r = '';
        if (record.e_channels != null && record.e_channels.length > 0) {
          const channelsIdArr = record.e_channels!.split(',');
          const channelsArr = channels.filter((value) =>
            channelsIdArr.find((_id) => _id == value.value),
          );

          for (const c of channelsArr) {
            r += '[' + c.label + '] ';
          }
          return r;
        }
        return r;
      },
    },
    {
      title: FieldLabels.h_products,
      dataIndex: FieldIndex.h_products,
      render: (_, record) => {
        let r = '';
        if (record.h_products != '' && record.h_products != null) {
          const productIdArr = record.h_products!.split(',');
          const productArr = products.filter((value) =>
            productIdArr.find((_id) => _id == value.value),
          );

          for (const c of productArr) {
            r += '[' + c.label + '] ';
          }
          return r;
        }
        return r;
      },
    },
    {
      title: FieldLabels.f_admins,
      dataIndex: FieldIndex.f_admins,
      render: (_, record) => {
        let r = '';
        if (record.f_admins != null && record.f_admins != '') {
          const adminIdArr = record.f_admins!.split(',');
          const adminsArr = admins.filter((value) => adminIdArr.find((_id) => _id == value.value));

          for (const c of adminsArr) {
            r += '[' + c.label + '] ';
          }
          return r;
        }
        return r;
      },
    },
    {
      title: FieldLabels.i_review_wait_count,
      dataIndex: FieldIndex.i_review_wait_count,
    },
    {
      title: FieldLabels.j_review_refuse_count,
      dataIndex: FieldIndex.j_review_refuse_count,
    },
    {
      title: FieldLabels.k_review_accept_count,
      dataIndex: FieldIndex.k_review_accept_count,
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
        let move;
        if (record.i_review_wait_count! > 0) {
          move = (
            <a key="move" onClick={() => onReleaseClick(record)}>
              释放
            </a>
          );
        }

        return [edit, move];
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '审核组管理',
        ghost: true,
        extra: [
          <Button key="2" type="primary" onClick={() => _check()}>
            验证审核配置
          </Button>,
          <Button key="3" type="primary" onClick={() => onEditClick(0)}>
            新建审核组
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
        products={products}
        channels={channels}
        admins={admins}
      />
      {/*释放model*/}
      <ReleaseForm
        onSubmit={async (success) => {
          if (success) {
            handleReleaseModalVisible(false);
            setId(0);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleReleaseModalVisible(false);
          setId(0);
        }}
        modalVisible={releaseModalVisible}
        record={currentRecord!}
        groups={groups}
      />
    </PageContainer>
  );
};

export default TableList;

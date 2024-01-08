import CreateForm from '@/pages/Review/ReviewGroup/components/CreateForm';

import { COMMON_STATUS_QIYONG } from '@/pages/enums';
import { US_COMMON_STATUS_QIYONG } from '@/pages/enumsUs';
import ReleaseForm from '@/pages/Review/ReviewGroup/components/ReleaseForm';
import { BORROW_TIMES_TYPE } from '@/pages/Review/ReviewGroup/enums';
import { US_BORROW_TIMES_TYPE } from '@/pages/Review/ReviewGroup/enumsUs';
import { getAdminV1ChannelsEnum as getChannelsEnum } from '@/services/ant-design-pro/AFChannel';
import {
  getAdminV1APReviewGroups as index,
  getAdminV1APReviewGroupsConfig as check,
} from '@/services/ant-design-pro/APReviewGroup';
import { getAdminV1ProductsEnum as getProductsEnum } from '@/services/ant-design-pro/BProduct';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button, ConfigProvider, message, Tag } from 'antd';
import React, { useContext, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
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
    if (products.length === 0) {
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
   * 查询渠道enum
   */
  const _getChannelsEnum: ProFieldRequestData = async () => {
    const data: RequestOptionsType[] = [];
    if (channels.length === 0) {
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
    if (products.length === 0) {
      // @ts-ignore
      await _getProductsEnum();
    }
    if (admins.length === 0) {
      // @ts-ignore
      await _getUsersEnum();
    }
    if (channels.length === 0) {
      // @ts-ignore
      await _getChannelsEnum();
    }
    if (groups.length === 0) {
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
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.check', defaultMessage: '' }),
    );

    try {
      const res = await check({ foo: 1 });
      if (!res.success) {
        message.error(res.message);
        return false;
      }
      hide();
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
      return true;
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
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
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.a_name', defaultMessage: '' }),
      dataIndex: 'a_name',
      key: 'a_name',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewGroup.b_borrow_times',
        defaultMessage: '',
      }),
      dataIndex: 'b_borrow_times',
      key: 'b_borrow_times',
      valueType: 'select',
      initialValue: [],
      valueEnum: currentLanguage === 'zh-cn' ? BORROW_TIMES_TYPE : US_BORROW_TIMES_TYPE,
      render: (_, record) => {
        if (currentLanguage === 'zh-cn') {
          return (
            <Tag color={BORROW_TIMES_TYPE[record.b_borrow_times!].color}>
              {BORROW_TIMES_TYPE[record.b_borrow_times!].text}
            </Tag>
          );
        } else {
          return (
            <Tag color={US_BORROW_TIMES_TYPE[record.b_borrow_times!].color}>
              {US_BORROW_TIMES_TYPE[record.b_borrow_times!].text}
            </Tag>
          );
        }
      },
    },

    /*    {
          title: FieldLabels.g_mode,
          dataIndex: FieldIndex.g_mode,
          valueType: 'select',
          initialValue: [],
          valueEnum: MODE_TYPE,
          render: (_, record) => (
            <Tag color={MODE_TYPE[record.g_mode!].color}>{MODE_TYPE[record.g_mode!].text}</Tag>
          ),
        },*/

    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.e_channels', defaultMessage: '' }),
      dataIndex: 'e_channels',
      key: 'e_channels',
      render: (_, record) => {
        let r = '';
        if (
          record.e_channels !== null &&
          record.e_channels !== undefined &&
          record.e_channels.length > 0
        ) {
          const channelsIdArr = record.e_channels!.split(',');
          const channelsArr = channels.filter((value) =>
            channelsIdArr.find((_id) => _id === value.value),
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
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.h_products', defaultMessage: '' }),
      dataIndex: 'h_products',
      render: (_, record) => {
        let r = '';
        if (
          record.h_products !== undefined &&
          record.h_products !== '' &&
          record.h_products !== null
        ) {
          const productIdArr = record.h_products!.split(',');
          const productArr = products.filter((value) =>
            productIdArr.find((_id) => _id === value.value),
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
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.f_admins', defaultMessage: '' }),
      dataIndex: 'f_admins',
      key: 'f_admins',
      render: (_, record) => {
        let r = '';
        if (record.f_admins !== undefined && record.f_admins !== null && record.f_admins !== '') {
          const adminIdArr = record.f_admins!.split(',');
          const adminsArr = admins.filter((value) => adminIdArr.find((_id) => _id === value.value));

          for (const c of adminsArr) {
            r += '[' + c.label + '] ';
          }
          return r;
        }
        return r;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.c_weight', defaultMessage: '' }),
      dataIndex: 'c_weight',
      key: 'c_weight',
      render: (_, record) => {
        if (record.c_weight !== undefined && record.c_weight !== null && record.c_weight > 0) {
          return record.c_weight + '%';
        } else {
          return '-';
        }
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewGroup.i_review_wait_count',
        defaultMessage: '',
      }),
      dataIndex: 'i_review_wait_count',
      key: 'i_review_wait_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewGroup.j_review_refuse_count',
        defaultMessage: '',
      }),
      dataIndex: 'j_review_refuse_count',
      key: 'j_review_refuse_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewGroup.k_review_accept_count',
        defaultMessage: '',
      }),
      dataIndex: 'k_review_accept_count',
      key: 'k_review_accept_count',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.d_status', defaultMessage: '' }),
      dataIndex: 'd_status',
      key: 'd_status',
      initialValue: [],
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? COMMON_STATUS_QIYONG : US_COMMON_STATUS_QIYONG,
    },

    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const edit = (
          <a key="edit" onClick={() => onEditClick(record.id!)}>
            {intl.formatMessage({ id: 'pages.common.option.edit', defaultMessage: '' })}
          </a>
        );
        let move;
        if (record.i_review_wait_count! > 0) {
          move = (
            <a key="move" onClick={() => onReleaseClick(record)}>
              {intl.formatMessage({ id: 'pages.common.option.release', defaultMessage: '' })}
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
        ghost: true,
        extra: [
          <Button key="2" type="primary" onClick={() => _check()}>
            {intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.check', defaultMessage: '' })}
          </Button>,
          <Button key="3" type="primary" onClick={() => onEditClick(0)}>
            {intl.formatMessage({ id: 'pages.Borrow.ReviewGroup.add', defaultMessage: '' })}
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

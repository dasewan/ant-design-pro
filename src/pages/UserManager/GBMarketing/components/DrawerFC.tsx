import { NEWS_ENUM } from '@/pages/enums';
import type { TableListPagination } from '@/pages/UserManager/AUser/data';
import ProList from '@ant-design/pro-list';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, Drawer, Space, Tag } from 'antd';
import moment from 'moment';
import React, { useRef } from 'react';

import { getAdminV1ABCreditHistories as getABCreditHistories } from '@/services/ant-design-pro/ABCreditHistory';
import { getAdminV1ACUserNews as getACUserNews } from '@/services/ant-design-pro/ACUserNew';

export type DrawerFCProps = {
  showDetail: boolean;
  onClose: () => void;
  aUser: API.AUser;
  type: string;
};

const columns: ProColumns<API.ABCreditHistory>[] = [
  {
    title: '类型',
    dataIndex: 'b_type',
    key: 'b_type',
    render: (_, value) => {
      if (value.b_type === 1) {
        return <Badge status="error" text="提额" />;
      }
      return <Badge status="success" text="降额" />;
    },
  },
  {
    title: '变更前额度',
    dataIndex: 'c_before_credit_amount',
    key: 'c_before_credit_amount',
  },
  {
    title: '变更额度',
    dataIndex: 'd_amount',
    key: 'd_amount',
  },
  {
    title: '变更时间',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (_, value) => {
      return moment(value.created_at).format('YYYY-MM-DD');
    },
  },
  {
    title: '备注',
    dataIndex: 'h_comment',
    key: 'h_comment',
    ellipsis: true,
  },
];

const DrawerFC: React.FC<DrawerFCProps> = (props) => {
  const actionRef = useRef<ActionType>();

  /** table */
  const _getABCreditHistories = async (
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
    const res = await getABCreditHistories({
      a_user_id: props.aUser!.id!,
      page: params.current,
      ...params,
    });
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
   * 获取用户动态
   * @param params
   */
  const _getACUserNews = async (
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
    const res = await getACUserNews({
      a_user_id: props.aUser!.id!,
      page: params.current,
      ...params,
    });
    return {
      data: res.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: res.success,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.total,
    };
  };

  return (
    <Drawer
      width={600}
      open={props.showDetail}
      onClose={() => {
        props.onClose();
      }}
      closable={false}
      destroyOnClose={true}
    >
      {props.type === 'aCUserNews' && (
        <ProList<API.ACUserNew>
          onRow={() => {
            return {
              onMouseEnter: () => {},
              onClick: () => {},
            };
          }}
          // loading={props.aCUserNews.get(props.id) ? false:true}
          rowKey="name"
          headerTitle={props.aUser?.a_phone}
          tooltip="记录用户部分节点"
          // @ts-ignore
          request={_getACUserNews}
          showActions="hover"
          showExtra="hover"
          metas={{
            title: {
              dataIndex: 'created_at',
              render: (_, value) => {
                return moment(value.created_at).format('YYYY-MM-DD HH:mm:ss');
              },
            },
            // avatar: {
            //   dataIndex: 'image',
            // },
            description: {
              dataIndex: 'c_comment',
            },
            subTitle: {
              render: (_, value) => {
                return (
                  <Space size={0}>
                    <Tag color={NEWS_ENUM[value.b_type!].color}>
                      {NEWS_ENUM[value.b_type!].text}
                    </Tag>
                  </Space>
                );
              },
            },
          }}
        />
      )}
      {props.type === 'aBCreditHistory' && (
        <ProTable<API.ABCreditHistory, TableListPagination>
          headerTitle="授信历史"
          actionRef={actionRef}
          revalidateOnFocus={false}
          search={false}
          options={false}
          rowKey="id"
          // @ts-ignore
          request={_getABCreditHistories}
          columns={columns}
          postData={(data: any[]) => {
            return data;
          }}
        />
      )}
    </Drawer>
  );
};

export default DrawerFC;

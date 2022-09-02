import CreateForm from '@/pages/Operation/Channel/components/CreateForm';
import { CHANNEL_TYPE, COMMON_STATUS_QIYONG } from '@/pages/Operation/Channel/enums';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFieldRequestData, RequestOptionsType } from '@ant-design/pro-utils';
import { Button, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels, getProductsEnum, index } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 渠道展示 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);
  const [products, setProducts] = useState<RequestOptionsType[]>([]);

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
    await _getProductsEnum();

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
      title: FieldLabels.a_title,
      dataIndex: FieldIndex.a_title,
    },
    {
      title: FieldLabels.f_divide_into_type,
      dataIndex: FieldIndex.f_divide_into_type,
      valueType: 'select',
      initialValue: [],
      valueEnum: CHANNEL_TYPE,
      render: (_, record) => (
        <Tag color={CHANNEL_TYPE[record.f_divide_into_type!].color}>
          {CHANNEL_TYPE[record.f_divide_into_type!].text}
        </Tag>
      ),
    },
    {
      title: FieldLabels.g_divide_one_money,
      dataIndex: FieldIndex.g_divide_one_money,
    },
    {
      title: FieldLabels.h_reg_hide_basic,
      dataIndex: FieldIndex.h_reg_hide_basic,
    },
    {
      title: FieldLabels.i_reg_hide_rate,
      dataIndex: FieldIndex.i_reg_hide_rate,
    },
    {
      title: FieldLabels.j_max_register,
      dataIndex: FieldIndex.j_max_register,
    },
    {
      title: FieldLabels.u_max_loan,
      dataIndex: FieldIndex.u_max_loan,
    },
    {
      title: FieldLabels.m_self_user,
      dataIndex: FieldIndex.m_self_user,
    },
    {
      title: FieldLabels.n_contact_user,
      dataIndex: FieldIndex.n_contact_user,
    },
    {
      title: FieldLabels.o_contact_phone,
      dataIndex: FieldIndex.o_contact_phone,
    },
    {
      title: FieldLabels.d_status,
      dataIndex: FieldIndex.d_status,
      initialValue: [],
      valueType: 'select',
      valueEnum: COMMON_STATUS_QIYONG,
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
        const download = (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/admin/v1/channels-download/${record.id}`}
          >
            密钥下载
          </a>
        );
        return [edit, download];
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '渠道管理',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => onEditClick(0)}>
            新建渠道
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
      />
    </PageContainer>
  );
};

export default TableList;

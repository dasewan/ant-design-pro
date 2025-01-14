import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {Button, Popconfirm, Space, Table} from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { message } from 'antd';

import EditForm from '@/pages/Operation/Sms/Custom/components/EditForm';

import { getAdminV1HJSmsTemplatesIndex2 as index, deleteAdminV1HJSmsTemplatesId as destory } from '@/services/ant-design-pro/HJSmsTemplate';
import { getAdminV1QHSmsChannelsEnum as getChannels } from '@/services/ant-design-pro/QHSmsChannel';
import { getAdminV1QHSmsChannelsEnum2 as getOperators } from '@/services/ant-design-pro/QHSmsChannel';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import {useIntl} from "@@/exports";
import BatchForm from "@/pages/Operation/Sms/Template/components/BatchForm";
import {COMMON_STATUS_INT, COMMON_STATUS_INT_ARRAY, LOAN_LOG_STATUS} from "@/pages/enums";

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [operators, setOperators] = useState<RequestOptionsType[]>([]);
  const [channels, setChannels] = useState<RequestOptionsType[]>([]);
  /** 当前编辑数据 */
  const [id, setId] = useState<number>(0);
  const [batchIds, handleBatchIds] = useState<string>('');
  const [batchModalVisible, handleBatchModalVisible] = useState<boolean>(false);

  /**
   * 查询通道enum
   */
  const _getChannelssEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (operators.length === 0) {
      const res = await getChannels({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_channel_name,
          value: item.id,
        });
      }
      setChannels(data);
      return data;
    } else {
      return operators;
    }
  };
  /**
   * 查询催收机构enum
   */
  const _getOperatorsEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (operators.length === 0) {
      const res = await getOperators({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_channel_name,
          value: item.id,
        });
      }
      setOperators(data);
      return data;
    } else {
      return operators;
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
    if (channels.length === 0) {
      await _getChannelssEnum();
    }
    if (operators.length === 0) {
      await _getOperatorsEnum();
    }
    // @ts-ignore
    const res = await index({ page: params.current, ...params });


    res.data!.forEach((_item: API.HJSmsTemplate) => {
        // @ts-ignore
      _item.b_node_type = [_item.b_node_type, _item.c_type];
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
   * 新建催收组model
   * @param _id
   */
  const onEditClick = async (_id: number) => {
    setId(_id);
    handleCreateModalVisible(true);
  };
  /**
   * 移出、恢复黑名单信息
   */
  const _handle = async (id: number) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    try {
      // @ts-ignore
      await destory({
        id: id
      });
      if (actionRef.current) {
        actionRef.current.reload();
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
   * 开始营销
   * @param ids
   */
  const handleBatch = (ids: string) => {
    handleBatchIds(ids);
    handleBatchModalVisible(true);
  };
  const expendColumns: ProColumns<API.HFCollectionAgencyRole>[] = [
    {
      title: '运营商',
      dataIndex: 'c_operator',
      valueType: 'select',
      request: async () => {
        return operators;
      },
    },
  ];
  const expendColumns2: ProColumns<API.HFCollectionAgencyRole>[] = [

    {
      title: intl.formatMessage({ id: 'pages.KASmsTemplateOperatorRole.c_sms_channel_id', defaultMessage: '' }),
      dataIndex: 'c_sms_channel_id',
      key: 'c_sms_channel_id',
      valueType: 'select',
      request: async () => {
        return channels;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.KASmsTemplateOperatorRole.d_proportion', defaultMessage: '' }),
      dataIndex: 'd_proportion',
      key: 'd_proportion',
    },
    {
      title: intl.formatMessage({ id: 'pages.KASmsTemplateOperatorRole.e_sender_id', defaultMessage: '' }),
      dataIndex: 'e_sender_id',
      key: 'e_sender_id',
    },
    {
      title: intl.formatMessage({ id: 'pages.KASmsTemplateOperatorRole.updated_at', defaultMessage: '' }),
      dataIndex: 'updated_at',
      key: 'updated_at',
      valueType: 'date',
    },
    {
      title: intl.formatMessage({ id: 'pages.KASmsTemplateOperatorRole.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'date',
    }
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.HJSmsTemplate.e_days', defaultMessage: '' }),
      dataIndex: 'o_plan_time',
      key: 'o_plan_time',
      valueType: 'dateTime'
    },
    {
      title: intl.formatMessage({ id: 'pages.HJSmsTemplate.i_proportion', defaultMessage: '' }),
      dataIndex: 'i_proportion',
      key: 'i_proportion',
      valueType: 'select',
      valueEnum: COMMON_STATUS_INT,
    },
    {
      title: intl.formatMessage({ id: 'pages.HJSmsTemplate.j_default_sms_channel_id', defaultMessage: '' }),
      dataIndex: 'j_default_sms_channel_id',
      key: 'j_default_sms_channel_id',
      valueType: 'select',
      request: _getChannelssEnum
    },

    {
      title: intl.formatMessage({ id: 'pages.HJSmsTemplate.created_at', defaultMessage: '' }),
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'date',
    },
    {
      title: 'Sender',
      dataIndex: 'a_sender_id',
      key: 'a_sender_id',
    },
    {
      title: intl.formatMessage({ id: 'pages.HJSmsTemplate.d_template', defaultMessage: '' }),
      dataIndex: 'd_template',
      key: 'd_template',
      width: "50%"
    },
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
          return          <Popconfirm
            title={`${intl.formatMessage({
              id: 'pages.userManager.rBlack.remove_tip',
              defaultMessage: '',
            })}`}
            key={record.id}
            onConfirm={() => _handle(record.id!)}
            okText="Yes"
            cancelText="No"
          >
            <a>{intl.formatMessage({ id: 'pages.common.option.delete', defaultMessage: '' })}</a>
          </Popconfirm>

      },
    },

  ];
  const expandedRowRender2 = (record: API.KSmsTemplateOperator) => {
    const dataSourse: API.KASmsTemplateOperatorRole[] = record.a_a_a_a_a_k_a_sms_template_operator_roles!;
    return (
      <ProTable<API.NBCollectionGroupRole, TableListPagination>
        columns={expendColumns2}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={dataSourse}
        pagination={false}
        rowKey="id"
      />
    );
  };
  const expandedRowRender = (record: TableListItem) => {
    const dataSourse: API.KSmsTemplateOperator[] = record.a_a_a_a_a_k_sms_template_operators!;
    return (
      <ProTable<API.KSmsTemplateOperator, TableListPagination>
        columns={expendColumns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={dataSourse}
        pagination={false}
        rowKey="id"
        // @ts-ignore
        expandable={{
          defaultExpandAllRows: true,
          expandedRowRender: expandedRowRender2,
          // @ts-ignore
          rowExpandable: (_record) => _record.a_a_a_a_a_k_a_sms_template_operator_roles.length! > 0,
        }}
      />
    );
  };

  // @ts-ignore
  return (
    <PageContainer
      header={{
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => onEditClick(0)}>
            新建
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
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
        }}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <Space size={16}>
              <a
                onClick={() =>
                  handleBatch(selectedRows.map((item: TableListItem) => item.id).join(','))
                }
              >
                {intl.formatMessage({
                  id: 'pages.common.option.batch',
                  defaultMessage: '',
                })}
              </a>
            </Space>
          );
        }}
        pagination={{
          pageSize: 50,
        }}
        // @ts-ignore
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: true,
          // @ts-ignore
          rowExpandable: (record) => record.a_a_a_a_a_k_sms_template_operators.length! > 0,
        }}
      />
      {/*表单model*/}
      <EditForm
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
        operators={operators}
        channels={channels}
        // admins={admins}
      />

      {/*表单model*/}
      <BatchForm
        onSubmit={async (success) => {
          if (success) {
            handleBatchModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleBatchModalVisible(false);
        }}
        batchIds={batchIds}
        modalVisible={batchModalVisible}
        channels={channels}
      />
    </PageContainer>
  );
};

export default TableList;

import { BLACK_TYPE } from '@/pages/enums';
import DrawerFC from '@/pages/UserManager/RBlack/components/DrawerFC';
import { ProForm, ProFormCaptcha } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { message, Popover } from 'antd';
import React, { useRef, useState } from 'react';
import { destory, getAKReasons, getCaptchaType, getUsersEnum, index } from '../service';
import type { TableListItem, TableListPagination } from './data';

export type FormValueType = Partial<{ code: string }>;

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };
const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 拉黑原因enum */
  const [reasons, setReasons] = useState<RequestOptionsType[]>([]);
  /** 确定按钮 */
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const formRef = useRef<ProFormInstance>();
  const [id, setId] = useState<number>(0);
  /** drawer */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** 当前黑名单信息 */
  const [currentRow, setCurrentRow] = useState<TableListItem>();

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
    const res = await index({ page: params.current, c_type: 1, ...params });
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
  const _getUsersEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length == 0) {
      const res = await getUsersEnum({ foo: 1 });
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

  /**
   * 查询管理员enum
   */
  const _getAKReasons = async () => {
    const data: RequestOptionsType[] = [];
    if (reasons.length == 0) {
      const res = await getAKReasons({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.c_title,
          value: item.id,
        });
      }
      setReasons(data);
      return data;
    } else {
      return reasons;
    }
  };
  /**
   * 提交移除黑名单表单
   * @param fields
   */
  const _handle = async (fields: FormValueType) => {
    const hide = message.loading('正在配置');
    try {
      // @ts-ignore
      await destory({
        id: id,
        ...fields,
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
   * 授信额度drawer
   * @param record
   */
  const _showDrawer = (record: TableListItem) => {
    setCurrentRow(record);
    setShowDetail(true);
  };

  /**
   * 验证码
   */
  const _ProFormCaptcha = (
    <ProForm<{ code: string }>
      onFinish={async (values) => {
        // const val1 = await formRef.current?.validateFields();
        // const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
        await _handle(values);
      }}
      layout={'inline'}
      submitter={{
        searchConfig: {
          submitText: '移除',
        },
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          disabled: confirmDisabled,
          style: {
            float: 'right',
          },
        },
      }}
      formRef={formRef}
      params={{ id: '100' }}
      formKey="base-form-use-demo"
    >
      <ProFormCaptcha
        phoneName="phone"
        name="code"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
        placeholder="请输入验证码"
        onGetCaptcha={async () => {
          // @ts-ignore
          const res = await getCaptchaType({ type: 'black' });
          if (res.success == true) {
            message.success(`验证码发送成功!`);
            setConfirmDisabled(false);
          } else {
            message.success(res.message);
          }
        }}
      />
    </ProForm>
  );

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '电话',
      dataIndex: 'a_info',
      copyable: true,
    },
    {
      title: '命中次数',
      dataIndex: 'b_hit_count',
      render: (_, record) => {
        return record.b_hit_count! > 0 ? (
          <a
            onClick={async () => {
              _showDrawer(record);
            }}
          >
            {record.b_hit_count!}
          </a>
        ) : (
          '-'
        );
      },
    },
    {
      title: '影响灰名单数量',
      dataIndex: 'k_gray_hit_count',
    },
    {
      title: '管理员',
      dataIndex: 'e_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id == 1 && item.id == record.e_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: '原因',
      dataIndex: ['a_g_black_reason', 'a_reason_id'],
      valueType: 'select',
      request: _getAKReasons,
      params: { timestamp: Math.random() },
      search: {
        transform: (value: any) => ({ 'a_g_black_reason-a_reason_id': value }),
      },
    },
    {
      title: '类型',
      dataIndex: 'g_type',
      initialValue: [],
      valueType: 'select',
      valueEnum: BLACK_TYPE,
    },
    {
      title: '备注',
      dataIndex: ['a_g_black_reason', 'b_comment'],
      search: {
        transform: (value: any) => ({ 'a_g_black_reason-b_comment': value }),
      },
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const remove = (
          <Popover
            overlayStyle={{ width: 480 }}
            // overlayInnerStyle={{width:1000}}
            // color='red'
            content={_ProFormCaptcha}
            title={`从黑名单中移除${record.a_info}`}
            trigger="click"
            key={record.a_info! + 1000}
            id={record.a_info! + 1000}
            onVisibleChange={(_visible) => {
              setId(record.id!);
              if (!_visible) {
                setConfirmDisabled(true);
              }
            }}
          >
            <a href="@/pages/UserManager/RBlack/Phone/index#">移除</a>
          </Popover>
        );
        return [remove];
      },
    },
  ];

  return (
    <div>
      <ProTable<TableListItem, TableListPagination>
        revalidateOnFocus={false}
        actionRef={actionRef}
        rowKey="a_info"
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
      <DrawerFC
        showDetail={showDetail}
        onClose={() => {
          setShowDetail(false);
        }}
        currentRow={currentRow!}
      />
    </div>
  );
};

export default TableList;

import { BLACK_TYPE } from '@/pages/enums';
import { US_BLACK_TYPE } from '@/pages/enumsUs';
import DrawerFC from '@/pages/UserManager/RBlack/components/DrawerFC';
import { getAdminV1AKReasons as getAKReasons } from '@/services/ant-design-pro/AKReason';
import {
  deleteAdminV1RBlacksId as destory,
  getAdminV1RBlacks as index,
} from '@/services/ant-design-pro/RBlack';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { ConfigProvider, message, Popconfirm } from 'antd';
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

export type FormValueType = Partial<{ code: string }>;

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };
const TableList: React.FC = ({}) => {
  const intl = useIntl();

  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const actionRef = useRef<ActionType>();
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 拉黑原因enum */
  const [reasons, setReasons] = useState<RequestOptionsType[]>([]);
  /** 确定按钮 */
  // const [confirmDisabled, setConfirmDisabled] = useState(true);
  // const formRef = useRef<ProFormInstance>();
  // const [id, setId] = useState<number>(0);
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
    const res = await index({ page: params.current, c_type: 5, ...params });
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
    if (admins.length === 0) {
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
    if (reasons.length === 0) {
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
   */
  const _handle = async (id: number) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    try {
      // @ts-ignore
      await destory({
        id: id,
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
   * 授信额度drawer
   * @param record
   */
  const _showDrawer = (record: TableListItem) => {
    setCurrentRow(record);
    setShowDetail(true);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.userManager.rBlack.a_info', defaultMessage: '' }),
      dataIndex: 'a_info',
      copyable: true,
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.rBlack.l_admin_file_id',
        defaultMessage: '',
      }),
      dataIndex: 'l_admin_file_id',
    },
    {
      title: intl.formatMessage({ id: 'pages.userManager.rBlack.b_hit_count', defaultMessage: '' }),
      dataIndex: 'b_hit_count',
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
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
      title: intl.formatMessage({
        id: 'pages.userManager.rBlack.m_last_hit_time',
        defaultMessage: '',
      }),
      // @ts-ignore
      dataIndex: 'm_last_hit_time',
      render: (__, value) => {
        if (value.m_last_hit_time !== null) {
          // @ts-ignore
          return moment(new Date(value.m_last_hit_time)).format('YYYY-MM-DD HH:mm');
        } else {
          return '-';
        }
      },
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'm_last_hit_time[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'm_last_hit_time[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.rBlack.k_gray_hit_count',
        defaultMessage: '',
      }),
      dataIndex: 'k_gray_hit_count',
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.common.range', defaultMessage: '' }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.userManager.rBlack.e_admin_id', defaultMessage: '' }),
      dataIndex: 'e_admin_id',
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.e_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.userManager.rBlack.f_black_reason_id',
        defaultMessage: '',
      }),
      dataIndex: ['a_g_black_reason', 'a_reason_id'],
      valueType: 'select',
      request: _getAKReasons,
      params: { timestamp: Math.random() },
      search: {
        transform: (value: any) => ({ 'a_g_black_reason-a_reason_id': value }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.userManager.rBlack.g_type', defaultMessage: '' }),
      dataIndex: 'g_type',
      initialValue: [],
      valueType: 'select',
      valueEnum: currentLanguage === 'zh-cn' ? BLACK_TYPE : US_BLACK_TYPE,
    },
    {
      title: intl.formatMessage({ id: 'pages.userManager.rBlack.d_overdate', defaultMessage: '' }),
      // @ts-ignore
      dataIndex: 'd_overdate',
      render: (__, value) => {
        if (value.d_overdate !== null) {
          // @ts-ignore
          return moment(new Date(value.d_overdate)).format('YYYY-MM-DD');
        } else {
          return '-';
        }
      },
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'd_overdate[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'd_overdate[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
      // @ts-ignore
      dataIndex: 'created_at',
      render: (__, value) => {
        if (value.created_at !== null) {
          // @ts-ignore
          return moment(new Date(value.created_at)).format('YYYY-MM-DD');
        } else {
          return '-';
        }
      },
      valueType: 'dateRange',
      search: {
        transform: (value: any) => {
          return {
            'created_at[0]':
              value[0].$d !== undefined
                ? moment(value[0].$d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[0] + ' 00:00:00',
            'created_at[1]':
              value[1].$d !== undefined
                ? moment(value[1].$d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                : value[1] + ' 00:00:00',
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.userManager.rBlack.h_remark', defaultMessage: '' }),
      dataIndex: ['a_g_black_reason', 'b_comment'],
      search: {
        transform: (value: any) => ({ 'a_g_black_reason-b_comment': value }),
      },
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const remove = (
          <Popconfirm
            title={`${intl.formatMessage({
              id: 'pages.userManager.rBlack.remove_tip',
              defaultMessage: '',
            })}${record.a_info}`}
            key={record.id}
            onConfirm={() => _handle(record.id!)}
            okText="Yes"
            cancelText="No"
          >
            <a>{intl.formatMessage({ id: 'pages.common.option.delete', defaultMessage: '' })}</a>
          </Popconfirm>
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

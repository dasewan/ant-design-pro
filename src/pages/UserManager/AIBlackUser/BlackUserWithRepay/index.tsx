import DrawerFC from '@/pages/UserManager/AUser/components/DrawerFC';
import type { FormValueType } from '@/pages/UserManager/RBlack/Idnumber';
import { getCaptchaType } from '@/pages/UserManager/RBlack/service';
import { DollarOutlined } from '@ant-design/icons';
import { ProForm, ProFormCaptcha } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, message, Popover, Rate } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { destory, index } from './service';

const hitEnum = {
  phone: { text: '手机号', status: 'Default' },
  idnumber: { text: '身份证', status: 'Processing' },
  idnumber2: { text: '证件号', status: 'Success' },
  bank: { text: '银行卡号', status: 'Error' },
  imei: { text: 'IMEI', status: 'Error' },
  mac: { text: 'MAC', status: 'Error' },
  device: { text: 'DEVICE', status: 'Error' },
};

const TableList: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<API.AUser>();
  /** DrawerFC 类型 */
  const [type, setType] = useState<string>('');
  /** 已查询详情的用户id缓存 */
  const [id, setId] = useState<number>(0);
  /** drawer是否显示 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  /** 验证码确定按钮 */
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

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
    //todo 过滤 a_user-t_cur_borrow_status
    // @ts-ignore
    const res = await index({ page: params.current, ...params });
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
   * 授信额度drawer
   * @param record
   * @param _type
   */
  const _showDrawer = (record: API.AUser, _type: string) => {
    setCurrentRow(record);
    setType(_type);
    setShowDetail(true);
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
      console.log(error);
      hide();
      message.error('配置失败请重试！');
      return false;
    }
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
          const res = await getCaptchaType({ type: 'blackUser' });
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
    //todo 动态draw和复制分离
    {
      title: '电话',
      dataIndex: ['a_user', 'a_phone'],
      tooltip: '规则名称是唯一的',
      copyable: true,
      search: {
        transform: (value: any) => ({ 'a_user-a_phone': value }),
      },
    },
    {
      title: '注册时间',
      dataIndex: ['a_user', 'created_at'],
      valueType: 'dateRange',
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              _showDrawer(record.a_user!, 'aCUserNews');
            }}
          >
            {moment(record.a_user!.created_at).format('YY-MM-DD HH:mm')}
          </a>
        );
      },
      search: {
        transform: (value: any) => ({
          'a_user-created_at[0]': value[0],
          'a_user-created_at[1]': value[1],
        }),
      },
    },
    //todo 跳转到此用户规则匹配记录
    {
      title: '信用分',
      dataIndex: ['a_user', 'g_credit_fraction'],
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-g_credit_fraction': value }),
      },
    },
    {
      title: '授信额度',
      dataIndex: ['a_user', 'f_credit_amount'],
      fieldProps: { placeholder: '支持区间' },
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              _showDrawer(record.a_user!, 'aBCreditHistory');
            }}
          >
            {record.a_user!.f_credit_amount}
          </a>
        );
      },
      search: {
        transform: (value: any) => ({ 'a_user-f_credit_amount': value }),
      },
    },
    //todo 跳转
    {
      title: '当前订单',
      dataIndex: ['a_user', 'r_current_borrow_id'],
      search: {
        transform: (value: any) => ({ 'a_user-r_current_borrow_id': value }),
      },
    },
    //todo 跳转到此用户所有订单
    {
      title: '逾期/放款',
      dataIndex: ['a_user', 'af_loan_count'],
      hideInSearch: true,
      tip: '2笔为一个图标',
      colSize: 16,
      render: (_, record) => {
        return (
          <div>
            <Rate
              character={<DollarOutlined style={{ fontSize: 12 }} />}
              disabled
              allowHalf={true}
              style={{ color: 'red', margin: 0 }}
              count={record.a_user!.af_loan_count}
              value={record.a_user!.ah_overdue_times! / 2}
            />
          </div>
        );
      },
    },
    {
      title: '放款笔数',
      dataIndex: ['a_user', 'af_loan_count'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-af_loan_count': value }),
      },
    },
    {
      title: '逾期次数',
      dataIndex: ['a_user', 'ah_overdue_times'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-ah_overdue_times': value }),
      },
    },
    {
      title: '逾期',
      dataIndex: ['a_user', 'ai_repay_max_overdue_days'],
      tooltip: '历史最大逾期天数/累计逾期天数',
      hideInSearch: true,
      render(_, record) {
        return record.a_user!.ai_repay_max_overdue_days || record.a_user!.an_total_overdue_days
          ? record.a_user!.ai_repay_max_overdue_days + '/' + record.a_user!.an_total_overdue_days
          : '-';
      },
    },
    {
      title: '历史最大逾期天数',
      dataIndex: ['a_user', 'ai_repay_max_overdue_days'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-ai_repay_max_overdue_days': value }),
      },
    },
    {
      title: '累计逾期天数',
      dataIndex: ['a_user', 'an_total_overdue_days'],
      hideInTable: true,
      fieldProps: { placeholder: '支持区间' },
      search: {
        transform: (value: any) => ({ 'a_user-an_total_overdue_days': value }),
      },
    },
    //todo 跳转到此用户所有费用
    {
      title: '损益',
      dataIndex: ['a_user', 'r_loss'],
      fieldProps: { placeholder: '支持区间' },
      render(_, record) {
        let color = 'success';
        if (record.a_user!.aj_loss) {
          if (record.a_user!.aj_loss > 0) {
            color = 'green';
          } else if (record.a_user!.aj_loss < 0) {
            color = 'red';
          } else {
            color = '#303030';
          }
        }
        return <span style={{ color: color }}>{record.a_user!.aj_loss}</span>;
      },
      search: {
        transform: (value: any) => ({ 'a_user-r_loss': value }),
      },
    },
    {
      title: '手机号',
      dataIndex: 'c_phone_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.c_phone_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: '身份证号',
      dataIndex: 'd_idnumber_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.d_idnumber_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: '证件号',
      dataIndex: 'e_idnumber2_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.e_idnumber2_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: '银行卡号',
      dataIndex: 'f_bankcard_no_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.f_bankcard_no_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: 'IMEI',
      dataIndex: 'g_imei_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.g_imei_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: 'MAC',
      dataIndex: 'h_mac_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.h_mac_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: 'DEVICE',
      dataIndex: 'i_device_hit_id',
      hideInSearch: true,
      width: 80,
      render(_, record) {
        return record.i_device_hit_id ? <Badge status="error" /> : <Badge status="default" />;
      },
    },
    {
      title: '命中项',
      dataIndex: 'h_mac_hit_id[]',
      hideInTable: true,
      valueType: 'checkbox',
      valueEnum: hitEnum,
    },
    {
      title: (
        <Badge dot offset={[3, 0]} color={'green'}>
          <span className="ant-table-cell-content">结清时间</span>
        </Badge>
      ),
      dataIndex: ['a_user', 'al_last_ettled_time'],
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.a_user!.al_last_ettled_time).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({
          'a_user-al_last_ettled_time[0]': value[0],
          'a_user-al_last_ettled_time[1]': value[1],
        }),
      },
    },
    {
      title: (
        <Badge dot offset={[3, 0]} color={'green'}>
          <span className="ant-table-cell-content">最近访问时间</span>
        </Badge>
      ),
      dataIndex: ['a_user', 'am_access_time'],
      valueType: 'dateRange',
      render: (_, record) => {
        return moment(record.a_user!.am_access_time).format('YY-MM-DD HH:mm');
      },
      search: {
        transform: (value: any) => ({
          'a_user-am_access_time[0]': value[0],
          'a_user-am_access_time[1]': value[1],
        }),
      },
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
            title={`从黑名单中移除${record.a_user?.a_phone}`}
            trigger="click"
            key={record.a_user?.a_phone}
            onVisibleChange={(_visible) => {
              setId(record.id!);
              if (!_visible) {
                setConfirmDisabled(true);
              }
            }}
          >
            <a href="@/pages/UserManager/AIBlackUser/BlackUserWithRepay/index#">移除</a>
          </Popover>
        );
        return [remove];
      },
    },
  ];

  return (
    <div>
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
      <DrawerFC
        showDetail={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        aUser={currentRow!}
        type={type}
      />
    </div>
  );
};

export default TableList;

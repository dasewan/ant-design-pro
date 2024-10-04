import {
  getAdminV1OBKycs as index,
  putAdminV1OBKycsId as update,
} from '@/services/ant-design-pro/OBKyc';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import {Divider, message, Modal, Popconfirm, Result, Spin, Switch, Alert, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { fieldLabels } from './service';
import {useIntl} from "@@/exports";



const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  // 排序固定模版
  const [data, setData] = useState<TableListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('break');
  //loose strict
  // @ts-ignore
  useEffect(() => {
    async function _index() {
        // @ts-ignore
        const res = await index({ page: 1, limit: 10000 });
        setData(res.data!)
        // @ts-ignore
      setMode(res.other.mode);
        setLoading(false)
    }

    _index();
    return () => {
      return;
    };
  }, [loading]);

  const onChange = async (e: RadioChangeEvent) => {

    setLoading(true);
    try {
      // @ts-ignore
      const res = await update({ id: 0, mode: e.target.value });
      if (!res.success) {
        //恢复原值
      }

    } catch (error) {
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );

    }
    setLoading(false);

    message.success('修改成功');


    console.log('radio checked', e.target.value);
    setMode(e.target.value);
  };

  const confirmSwitch = async (_item: TableListItem) => {
    let _success = true;
    _item.g_status = _item.g_status === 'y' ? 'n' : 'y';
    setLoading(true);
    try {
      // @ts-ignore
      const res = await update({ ..._item });
      if (!res.success) {
        //恢复原值
        _item.g_status = _item.g_status === 'y' ? 'n' : 'y';
        _success = false;
      }

    } catch (error) {
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      //恢复原值
      _item.g_status = _item.g_status === 'y' ? 'n' : 'y';
      _success = false;
    }
    setLoading(false);
    if (_success) {
      message.success('修改成功');
    } else {
      message.warning('修改失败');
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.OBKyc.a_name', defaultMessage: '' }),
      dataIndex: 'a_name',
      key: 'a_name',
      width: "20%",
    },
    {
      title: intl.formatMessage({ id: 'pages.OBKyc.i_description', defaultMessage: '' }),
      dataIndex: 'i_description',
      key: 'i_description',
    },
    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'option',
      width: "10%",
      fixed: 'right',
      render: (_, record) => {

        const edit = <Popconfirm
              key={record.id}
              title="Are you sure to switch?"
              onConfirm={confirmSwitch.bind(this, record)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                checked={record.g_status === 'y'}
                // checked={checked}

              />
            </Popconfirm>
          ;


        return [edit];
      },
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'KYC管理',
        ghost: true,
        extra: [
          <Radio.Group buttonStyle="solid" onChange={onChange} value={mode}>
            <Radio.Button value="loose">宽松模式</Radio.Button>
            <Radio.Button value="strict">严格模式</Radio.Button>
          </Radio.Group>
        ],
      }}
    >
    <div>
      <Alert
        message="Warning"
        description="请确保系统已正确配置相关网关，只要开启就会进行验证。"
        type="warning"
      />
      {
        data.map((item) => {
          return <Spin spinning={loading} key={item.id}>
            <Divider orientation="left">{item.a_name}</Divider>
            <ProTable<TableListItem, TableListPagination>
              // headerTitle="客户列表"
              revalidateOnFocus={false}
              actionRef={actionRef}
              rowKey="id"
              toolBarRender={false}
              search={false}
              columns={columns}
              dataSource={item.children!.map(({ children, ...rest }) => rest)}
              pagination={false}
              scroll={{ x: '50%' }}
              bordered={true}
            />
          </Spin>
        })
      }


    </div>
    </PageContainer>
  );
};

export default TableList;

import {
  getAdminV1QVerifyItems as index,
  putAdminV1QVerifyItemsId as update,
  putAdminV1QVerifyItemsSort as sort,
} from '@/services/ant-design-pro/QVerifyItem';
import { MenuOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Divider, message, Modal, Popconfirm, Result, Spin, Switch } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import React, { useEffect, useRef, useState } from 'react';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import type { TableListItem, TableListPagination } from './data';
import { fieldLabels } from './service';

import TimerButton from '@/pages/Setting/SystemSettings/components/TimerButton';
// 排序相关固定模版start
const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));
const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
));
// 排序相关固定模版end

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 排序固定模版
  const [dataMap, setDataMap] = useState<Map<string, TableListItem[]>>(new Map());
  const [idNumberData, setIdNumberData] = useState<TableListItem[]>([]);
  const [contactData, setContactData] = useState<TableListItem[]>([]);
  const [jobData, setJobData] = useState<TableListItem[]>([]);
  const [loanBankData, setLoanBankData] = useState<TableListItem[]>([]);
  const [livenessData, setLivenessData] = useState<TableListItem[]>([]);
  const [readed, setReaded] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  useEffect(() => {
    async function _index() {
      if (!dataMap.has('register')) {
        // @ts-ignore
        const res = await index({ page: 1, limit: 10000 });
        const idNumber: TableListItem[] = [];
        const contact: TableListItem[] = [];
        const job: TableListItem[] = [];
        const loanBank: TableListItem[] = [];
        const liveness: TableListItem[] = [];
        const tmpMap: Map<string, TableListItem[]> = new Map();
        idNumber.push(...res.data![0].children!);
        contact.push(...res.data![1].children!);
        job.push(...res.data![2].children!);
        loanBank.push(...res.data![3].children!);
        // liveness.push(...res.data![4].children!);
        tmpMap.set('idNumber', idNumber);
        tmpMap.set('contact', contact);
        tmpMap.set('job', job);
        tmpMap.set('loanBank', loanBank);
        // tmpMap.set('liveness', liveness);
        setDataMap(tmpMap);
        setIdNumberData(idNumber);
        setContactData(contact);
        setJobData(job);
        setLoanBankData(loanBank);
        // setLivenessData(liveness);
      }
      return dataMap;
    }

    _index();
    return () => {
      return;
    };
  }, []);
  /**
   * 排序固定模版start
   * @param newData
   */
  const confirm = (newData: TableListItem[], cat = 'idNumber') => {
    const ids = newData
      .filter((item) => item.d_status === 'y')
      .map((item: TableListItem) => item.id)
      .join('##');
    const names = newData
      .filter((item) => item.d_status === 'y')
      .map((item: TableListItem) => item.b_name)
      .join(',');
    const content = '新的认证项顺序为:' + names;
    setLoading(true);
    Modal.confirm({
      title: '确认排序?',
      content: content,
      onOk: async () => {
        // @ts-ignore
        const res = await sort({ foo: null, ids: ids });
        let tmpMap;
        if (res.success) {
          tmpMap = dataMap;
          tmpMap.set(cat, newData);
          setDataMap(tmpMap);
          if (cat === 'idNumber') {
            setIdNumberData(newData);
          }
          if (cat === 'contact') {
            setContactData(newData);
          }
          if (cat === 'job') {
            setJobData(newData);
          }
          if (cat === 'loanBank') {
            setLoanBankData(newData);
          }
          // if (cat === 'liveness') {
          //   setLivenessData(newData);
          // }
          message.success('排序成功');
        } else {
          message.error('排序失败');
        }
        return Promise.resolve();
      },
      onCancel: () => Promise.resolve(),
    });
    setLoading(false);
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      // @ts-ignore
      const newData = arrayMoveImmutable(
        dataMap.get('idNumber')?.slice(),
        oldIndex,
        newIndex,
      ).filter((el: TableListItem) => !!el);
      confirm(newData, 'idNumber');
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    console.log(className, style);
    const indexKey = dataMap.get('idNumber')?.findIndex((x) => x.id === restProps['data-row-key']);
    return <SortableItem index={indexKey} {...restProps} />;
  };
  // 排序固定模版end

  /**
   * 排序固定模版start2
   * @param newData
   */
  const onSortEnd2 = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      // @ts-ignore
      const newData = arrayMoveImmutable(
        dataMap.get('contact')?.slice(),
        oldIndex,
        newIndex,
      ).filter((el: TableListItem) => !!el);
      confirm(newData, 'contact');
    }
  };

  const DraggableContainer2 = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd2}
      {...props}
    />
  );

  const DraggableBodyRow2: React.FC<any> = ({ className, style, ...restProps }) => {
    console.log(className, style);
    // function findIndex base on Table rowKey props and should always be a right array index
    const indexKey = dataMap.get('contact')?.findIndex((x) => x.id === restProps['data-row-key']);
    return <SortableItem index={indexKey} {...restProps} />;
  };
  // 排序固定模版end 2

  /**
   * 排序固定模版start3
   * @param newData
   */
  const onSortEnd3 = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      // @ts-ignore
      const newData = arrayMoveImmutable(dataMap.get('job')?.slice(), oldIndex, newIndex).filter(
        (el: TableListItem) => !!el,
      );
      confirm(newData, 'job');
    }
  };

  const DraggableContainer3 = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd3}
      {...props}
    />
  );

  const DraggableBodyRow3: React.FC<any> = ({ className, style, ...restProps }) => {
    console.log(className, style);
    // function findIndex base on Table rowKey props and should always be a right array index
    const indexKey = dataMap.get('job')?.findIndex((x) => x.id === restProps['data-row-key']);
    return <SortableItem index={indexKey} {...restProps} />;
  };
  // 排序固定模版end 3

  /**
   * 排序固定模版start4
   * @param newData
   */
  const onSortEnd4 = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      // @ts-ignore
      const newData = arrayMoveImmutable(
        dataMap.get('loanBank')?.slice(),
        oldIndex,
        newIndex,
      ).filter((el: TableListItem) => !!el);
      confirm(newData, 'loanBank');
    }
  };

  const DraggableContainer4 = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd4}
      {...props}
    />
  );

  const DraggableBodyRow4: React.FC<any> = ({ className, style, ...restProps }) => {
    console.log(className, style);
    // function findIndex base on Table rowKey props and should always be a right array index
    const indexKey = dataMap.get('loanBank')?.findIndex((x) => x.id === restProps['data-row-key']);
    return <SortableItem index={indexKey} {...restProps} />;
  };
  // 排序固定模版end 4

  const confirmSwitch = async (_item: TableListItem) => {
    let _success = true;
    _item.d_status = _item.d_status === 'y' ? 'n' : 'y';
    setLoading(true);
    try {
      // @ts-ignore
      const res = await update({ ..._item });
      if (!res.success) {
        //恢复原值
        _item.d_status = _item.d_status === 'y' ? 'n' : 'y';
        _success = false;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      //恢复原值
      _item.d_status = _item.d_status === 'y' ? 'n' : 'y';
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
      title: fieldLabels.b_name,
      dataIndex: 'b_name',
    },
    {
      title: fieldLabels.i_description,
      dataIndex: 'i_description',
      ellipsis: true,
    },
    {
      title: fieldLabels.j_remark,
      dataIndex: 'j_remark',
      ellipsis: true,
    },
    {
      title: fieldLabels.r_multi_validator,
      dataIndex: 'r_multi_validator',
      width: 360,
      render: (_, record) => {
        return record.r_multi_validator?.split(',').map((item) => {
          return (
            <span key={record.id}>
              {item}
              <br />
            </span>
          );
        });
      },
    },
    {
      title: fieldLabels.p_hint_text,
      dataIndex: 'p_hint_text',
      ellipsis: true,
    },
    {
      title: fieldLabels.t_values,
      dataIndex: 't_values',
      ellipsis: true,
    },

    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'option',
      width: 220,
      fixed: 'right',
      render: (_, record) => {
        const edit =
          record.g_edit === 'y' ? (
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={confirmSwitch.bind(this, record)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                checked={record.d_status === 'y'}
              />
            </Popconfirm>
          ) : null;
        const drag =
          record.a_parent_id! > 0 &&
          [4, 8, 9, 10].find((n) => n === record.a_parent_id!) &&
          record.d_status === 'y' ? (
            <DragHandle key="drag" />
          ) : null;

        return [edit, drag];
      },
    },
  ];

  return (
    <div>
      <div style={{ display: !readed ? 'none' : 'block' }}>
        <Spin spinning={loading}>
          <Divider orientation="left">ID Number</Divider>
          <ProTable<TableListItem, TableListPagination>
            // headerTitle="客户列表"
            revalidateOnFocus={false}
            actionRef={actionRef}
            rowKey="id"
            toolBarRender={false}
            search={false}
            columns={columns}
            dataSource={idNumberData}
            pagination={false}
            scroll={{ x: '50%' }}
            bordered={true}
            // 排序固定模版
            components={{
              body: {
                wrapper: DraggableContainer,
                row: DraggableBodyRow,
              },
            }}
          />
          <Divider orientation="left">Contact</Divider>
          <ProTable<TableListItem, TableListPagination>
            // headerTitle="客户列表"
            revalidateOnFocus={false}
            actionRef={actionRef}
            rowKey="id"
            toolBarRender={false}
            search={false}
            columns={columns}
            dataSource={contactData}
            pagination={false}
            scroll={{ x: '50%' }}
            bordered={true}
            // 排序固定模版
            components={{
              body: {
                wrapper: DraggableContainer2,
                row: DraggableBodyRow2,
              },
            }}
          />
          <Divider orientation="left">Job</Divider>
          <ProTable<TableListItem, TableListPagination>
            // headerTitle="客户列表"
            revalidateOnFocus={false}
            actionRef={actionRef}
            rowKey="id"
            toolBarRender={false}
            search={false}
            columns={columns}
            dataSource={jobData}
            pagination={false}
            scroll={{ x: '50%' }}
            bordered={true}
            // 排序固定模版
            components={{
              body: {
                wrapper: DraggableContainer3,
                row: DraggableBodyRow3,
              },
            }}
          />
          <Divider orientation="left">Bank</Divider>
          <ProTable<TableListItem, TableListPagination>
            // headerTitle="客户列表"
            revalidateOnFocus={false}
            actionRef={actionRef}
            rowKey="id"
            toolBarRender={false}
            search={false}
            columns={columns}
            dataSource={loanBankData}
            pagination={false}
            scroll={{ x: '50%' }}
            bordered={true}
            // 排序固定模版
            components={{
              body: {
                wrapper: DraggableContainer4,
                row: DraggableBodyRow4,
              },
            }}
          />
          {/*<Divider orientation="left">Liveness</Divider>*/}
          {/*<ProTable<TableListItem, TableListPagination>*/}
          {/*  // headerTitle="客户列表"*/}
          {/*  revalidateOnFocus={false}*/}
          {/*  actionRef={actionRef}*/}
          {/*  rowKey="id"*/}
          {/*  toolBarRender={false}*/}
          {/*  search={false}*/}
          {/*  columns={columns}*/}
          {/*  dataSource={livenessData}*/}
          {/*  pagination={false}*/}
          {/*  scroll={{ x: '50%' }}*/}
          {/*  bordered={true}*/}
          {/*  // 排序固定模版*/}
          {/*  // components={{*/}
          {/*  //   body: {*/}
          {/*  //     wrapper: DraggableContainer4,*/}
          {/*  //     row: DraggableBodyRow4,*/}
          {/*  //   },*/}
          {/*  // }}*/}
          {/*/>*/}
        </Spin>
      </div>
      <div style={{ display: readed ? 'none' : 'block' }}>
        <Result
          status="warning"
          title="认证参数只支持开关和排序，认证项预置了部分配置，如果您需要更改配置，请联系客服！"
          extra={
            /*            <Button disabled={sec > 0} type="primary" key="console" onClick={()=>setReaded(true)}>
                          Go Setting {sec}
                        </Button>*/
            <TimerButton
              name={'开始设置'}
              num={3}
              onClick={() => {
                setReaded(true);
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export default TableList;

import ReleaseForm from '@/pages/Review/ReviewAdmin/components/ReleaseForm';
import { BORROW_TIMES_OPTION, BORROW_TIMES_TYPE } from '@/pages/Review/ReviewAdmin/enums';
import { getAdminV1APReviewGroupsEnum as getAPReviewGroupsEnum } from '@/services/ant-design-pro/APReviewGroup';
import {
  getAdminV1ARReviewAdmins as index,
  putAdminV1ARReviewAdminsId as update,
} from '@/services/ant-design-pro/ARReviewAdmin';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { message, Popconfirm, Spin, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 审核组enum */
  const [groups, setGroups] = useState<RequestOptionsType[]>([]);
  /** 释放 */
  const [releaseModalVisible, handleReleaseModalVisible] = useState<boolean>(false);
  const [canMoveAdmins, setCanMoveAdmins] = useState<Map<number, number[]>>(new Map());
  const [loading, setLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<TableListItem>();

  /**
   * 查询管理员enum
   */
  const _getUserEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (admins.length === 0) {
      const res = await getUserEnum({ foo: 1 });
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
   * 查询审核组enum
   */
  const _getAPReviewGroupsEnum = async () => {
    const data: RequestOptionsType[] = [];
    if (groups.length === 0) {
      const res = await getAPReviewGroupsEnum({ foo: 1 });
      for (const item of res.data!) {
        data.push({
          label: item.a_name,
          value: item.id!.toString(),
        });
      }
      setGroups(data);
      return data;
    } else {
      return groups;
    }
  };

  const confirmSwitch = async (_item: TableListItem, field: string) => {
    let _success = true;
    _item[field] = _item[field] === 'y' ? 'n' : 'y';
    setLoading(true);
    try {
      // @ts-ignore
      const res = await update({ ..._item });
      if (!res.success) {
        //恢复原值
        _item[field] = _item[field] === 'y' ? 'n' : 'y';
        _success = false;
      }
    } catch (error) {
      message.error('配置失败请重试！');
      //恢复原值
      _item[field] = _item[field] === 'y' ? 'n' : 'y';
      _success = false;
    }
    setLoading(false);
    if (_success) {
      message.success('修改成功');
    } else {
      message.warn('修改失败');
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

    const canMoveAdminsTmp: Map<number, number[]> = new Map();
    // @ts-ignore
    if (res.other[1] !== undefined) {
      // @ts-ignore
      canMoveAdminsTmp.set(1, res.other[1]);
    }
    // @ts-ignore
    if (res.other[2] !== undefined) {
      // @ts-ignore
      canMoveAdminsTmp.set(2, res.other[2]);
    }
    // @ts-ignore
    if (res.other[3] !== undefined) {
      // @ts-ignore
      canMoveAdminsTmp.set(3, res.other[3]);
    }
    setCanMoveAdmins(canMoveAdminsTmp);
    /*    res.other.map( item => {
          if (!canMoveAdminsTmp.has(item.b_risk_role_group_id!)) {
            canMoveAdminsTmp.set(item.b_risk_role_group_id!, item.m_group_index!);
          } else if (canMoveAdminsTmp.get(item.b_risk_role_group_id!)! < item.m_group_index!) {
            canMoveAdminsTmp.set(item.b_risk_role_group_id!, item.m_group_index!);
          }
        })*/

    /*    if(admins.length === 0){
          // @ts-ignore
          await _getUserEnum();
        }*/
    if (groups.length === 0) {
      // @ts-ignore
      await _getAPReviewGroupsEnum();
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
      title: FieldLabels.b_admin_id,
      dataIndex: FieldIndex.b_admin_id,
      valueType: 'select',
      request: _getUserEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id === 1 && item.id === record.b_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: FieldLabels.c_review_group_id,
      dataIndex: FieldIndex.c_review_group_id,
      valueType: 'select',
      request: _getAPReviewGroupsEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        let r = '';
        if (record.c_review_group_id !== null && record.c_review_group_id !== '') {
          const groupIdArr = record.c_review_group_id!.split(',');
          const groupsArr = groups.filter((value) => groupIdArr.find((_id) => _id === value.value));

          for (const c of groupsArr) {
            r += '[' + c.label + '] ';
          }
          return r;
        }
        return r;
      },
    },
    {
      title: FieldLabels.m_borrow_times,
      dataIndex: FieldIndex.m_borrow_times,
      valueType: 'select',
      initialValue: [],
      valueEnum: BORROW_TIMES_TYPE,
      render: (_, record) => {
        let r = '';
        if (record.m_borrow_times !== null && record.m_borrow_times !== '') {
          const groupIdArr = record.m_borrow_times!.split(',');
          const groupsArr = BORROW_TIMES_OPTION.filter((value) =>
            groupIdArr.find((_id) => _id === value.value),
          );

          for (const c of groupsArr) {
            r += '[' + c.label + '] ';
          }
          return r;
        }
        return r;
      },
    },
    {
      title: FieldLabels.n_review_wait_count,
      dataIndex: FieldIndex.n_review_wait_count,
    },
    {
      title: FieldLabels.o_review_refuse_count,
      dataIndex: FieldIndex.o_review_refuse_count,
    },
    {
      title: FieldLabels.p_review_accept_count,
      dataIndex: FieldIndex.p_review_accept_count,
    },
    {
      title: FieldLabels.d_can_id_number,
      dataIndex: FieldIndex.d_can_id_number,
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Are you sure to switch ${FieldLabels.d_can_id_number}`}
            onConfirm={confirmSwitch.bind(this, record, FieldIndex.d_can_id_number)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={record.d_can_id_number === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: FieldLabels.e_can_contact_persion,
      dataIndex: FieldIndex.e_can_contact_persion,
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Are you sure to switch ${FieldLabels.e_can_contact_persion}`}
            onConfirm={confirmSwitch.bind(this, record, FieldIndex.e_can_contact_persion)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={record.e_can_contact_persion === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: FieldLabels.f_can_job,
      dataIndex: FieldIndex.f_can_job,
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Are you sure to switch ${FieldLabels.f_can_job}`}
            onConfirm={confirmSwitch.bind(this, record, FieldIndex.f_can_job)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={record.f_can_job === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: FieldLabels.k_can_app,
      dataIndex: FieldIndex.k_can_app,
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Are you sure to switch ${FieldLabels.k_can_app}`}
            onConfirm={confirmSwitch.bind(this, record, FieldIndex.k_can_app)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={record.k_can_app === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: FieldLabels.g_can_contact,
      dataIndex: FieldIndex.g_can_contact,
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Are you sure to switch ${FieldLabels.g_can_contact}`}
            onConfirm={confirmSwitch.bind(this, record, FieldIndex.g_can_contact)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={record.g_can_contact === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: FieldLabels.h_can_sms,
      dataIndex: FieldIndex.h_can_sms,
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Are you sure to switch ${FieldLabels.h_can_sms}`}
            onConfirm={confirmSwitch.bind(this, record, FieldIndex.h_can_sms)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={record.h_can_sms === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: FieldLabels.i_can_risk,
      dataIndex: FieldIndex.i_can_risk,
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Are you sure to switch ${FieldLabels.i_can_risk}`}
            onConfirm={confirmSwitch.bind(this, record, FieldIndex.i_can_risk)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={record.i_can_risk === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: FieldLabels.l_can_history_borrow,
      dataIndex: FieldIndex.l_can_history_borrow,
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Are you sure to switch ${FieldLabels.l_can_history_borrow}`}
            onConfirm={confirmSwitch.bind(this, record, FieldIndex.l_can_history_borrow)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={record.l_can_history_borrow === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: FieldLabels.j_status,
      dataIndex: FieldIndex.j_status,
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Are you sure to switch ${FieldLabels.j_status}`}
            onConfirm={confirmSwitch.bind(this, record, FieldIndex.j_status)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch checkedChildren="开" unCheckedChildren="关" checked={record.j_status === 'y'} />
          </Popconfirm>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        let move;
        if (record.n_review_wait_count! > 0) {
          move = (
            <a key="move" onClick={() => onReleaseClick(record)}>
              释放
            </a>
          );
        }

        return [move];
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '审核成员管理',
        ghost: true,
      }}
    >
      <Spin spinning={loading}>
        <ProTable<TableListItem, TableListPagination>
          revalidateOnFocus={false}
          actionRef={actionRef}
          rowKey="id"
          search={false}
          request={_index}
          columns={columns}
          postData={(data: any[]) => {
            return data;
          }}
          pagination={{
            pageSize: 50,
          }}
        />
      </Spin>
      {/*释放model*/}
      <ReleaseForm
        onSubmit={async (success) => {
          if (success) {
            handleReleaseModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleReleaseModalVisible(false);
        }}
        modalVisible={releaseModalVisible}
        record={currentRecord!}
        admins={admins}
        canMoveAdmins={canMoveAdmins}
      />
    </PageContainer>
  );
};

export default TableList;

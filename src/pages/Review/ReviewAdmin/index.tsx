import ReleaseForm from '@/pages/Review/ReviewAdmin/components/ReleaseForm';
import { BORROW_TIMES_OPTION, BORROW_TIMES_TYPE } from '@/pages/Review/ReviewGroup/enums';
import { US_BORROW_TIMES_OPTION, US_BORROW_TIMES_TYPE } from '@/pages/Review/ReviewGroup/enumsUs';
import { getAdminV1APReviewGroupsEnum as getAPReviewGroupsEnum } from '@/services/ant-design-pro/APReviewGroup';
import {
  getAdminV1ARReviewAdmins as index,
  putAdminV1ARReviewAdminsId as update,
} from '@/services/ant-design-pro/ARReviewAdmin';
import { getAdminV1UsersEnum as getUserEnum } from '@/services/ant-design-pro/User';
import { useIntl } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { ConfigProvider, message, Popconfirm, Spin, Switch } from 'antd';
import React, { useContext, useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
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
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      //恢复原值
      _item[field] = _item[field] === 'y' ? 'n' : 'y';
      _success = false;
    }
    setLoading(false);
    if (_success) {
      message.success('修改成功');
    } else {
      message.warning('修改失败');
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
    /*    {
          title: intl.formatMessage({ id: 'pages.Borrow.ReviewAdmin.a_name', defaultMessage: '' }),
          dataIndex: 'a_name',
          key: 'a_name',
        },*/
    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewAdmin.b_admin_id', defaultMessage: '' }),
      dataIndex: 'b_admin_id',
      key: 'b_admin_id',
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
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.c_review_group_id',
        defaultMessage: '',
      }),
      dataIndex: 'c_review_group_id',
      key: 'c_review_group_id',
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
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.m_borrow_times',
        defaultMessage: '',
      }),
      dataIndex: 'm_borrow_times',
      key: 'm_borrow_times',
      valueType: 'select',
      initialValue: [],
      valueEnum: currentLanguage === 'zh-cn' ? BORROW_TIMES_TYPE : US_BORROW_TIMES_TYPE,
      render: (_, record) => {
        let r = '';
        if (record.m_borrow_times !== null && record.m_borrow_times !== '') {
          const groupIdArr = record.m_borrow_times!.split(',');
          const groupsArr =
            currentLanguage === 'zh-cn'
              ? BORROW_TIMES_OPTION.filter((value) => groupIdArr.find((_id) => _id === value.value))
              : US_BORROW_TIMES_OPTION.filter((value) =>
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
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.g_can_contact',
        defaultMessage: '',
      }),
      dataIndex: 'g_can_contact',
      key: 'g_can_contact',
      render: (_, record) => {
        return (
          <Popconfirm
            title={`${intl.formatMessage({
              id: 'pages.common.switch_tip',
              defaultMessage: '',
            })} ${intl.formatMessage({
              id: 'pages.Borrow.ReviewAdmin.g_can_contact',
              defaultMessage: '',
            })}`}
            onConfirm={confirmSwitch.bind(this, record, 'g_can_contact2')}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren={intl.formatMessage({ id: 'pages.common.open', defaultMessage: '' })}
              unCheckedChildren={intl.formatMessage({
                id: 'pages.common.close',
                defaultMessage: '',
              })}
              checked={record.g_can_contact === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewAdmin.h_can_sms', defaultMessage: '' }),
      dataIndex: 'h_can_sms',
      key: 'h_can_sms',
      render: (_, record) => {
        return (
          <Popconfirm
            title={`${intl.formatMessage({
              id: 'pages.common.switch_tip',
              defaultMessage: '',
            })} ${intl.formatMessage({
              id: 'pages.Borrow.ReviewAdmin.h_can_sms',
              defaultMessage: '',
            })}`}
            onConfirm={confirmSwitch.bind(this, record, 'h_can_sms2')}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren={intl.formatMessage({ id: 'pages.common.open', defaultMessage: '' })}
              unCheckedChildren={intl.formatMessage({
                id: 'pages.common.close',
                defaultMessage: '',
              })}
              checked={record.h_can_sms === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewAdmin.i_can_risk', defaultMessage: '' }),
      dataIndex: 'i_can_risk',
      key: 'i_can_risk',
      render: (_, record) => {
        return (
          <Popconfirm
            title={`${intl.formatMessage({
              id: 'pages.common.switch_tip',
              defaultMessage: '',
            })} ${intl.formatMessage({
              id: 'pages.Borrow.ReviewAdmin.i_can_risk',
              defaultMessage: '',
            })}`}
            onConfirm={confirmSwitch.bind(this, record, 'i_can_risk2')}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren={intl.formatMessage({ id: 'pages.common.open', defaultMessage: '' })}
              unCheckedChildren={intl.formatMessage({
                id: 'pages.common.close',
                defaultMessage: '',
              })}
              checked={record.i_can_risk === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewAdmin.k_can_app', defaultMessage: '' }),
      dataIndex: 'k_can_app',
      key: 'k_can_app',
      render: (_, record) => {
        return (
          <Popconfirm
            title={`${intl.formatMessage({
              id: 'pages.common.switch_tip',
              defaultMessage: '',
            })} ${intl.formatMessage({
              id: 'pages.Borrow.ReviewAdmin.k_can_app',
              defaultMessage: '',
            })}`}
            onConfirm={confirmSwitch.bind(this, record, 'k_can_app2')}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren={intl.formatMessage({ id: 'pages.common.open', defaultMessage: '' })}
              unCheckedChildren={intl.formatMessage({
                id: 'pages.common.close',
                defaultMessage: '',
              })}
              checked={record.k_can_app === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.l_can_history_borrow',
        defaultMessage: '',
      }),
      dataIndex: 'l_can_history_borrow',
      key: 'l_can_history_borrow',
      render: (_, record) => {
        return (
          <Popconfirm
            title={`${intl.formatMessage({
              id: 'pages.common.switch_tip',
              defaultMessage: '',
            })} ${intl.formatMessage({
              id: 'pages.Borrow.ReviewAdmin.l_can_history_borrow',
              defaultMessage: '',
            })}`}
            onConfirm={confirmSwitch.bind(this, record, 'l_can_history_borrow2')}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren={intl.formatMessage({ id: 'pages.common.open', defaultMessage: '' })}
              unCheckedChildren={intl.formatMessage({
                id: 'pages.common.close',
                defaultMessage: '',
              })}
              checked={record.l_can_history_borrow === 'y'}
            />
          </Popconfirm>
        );
      },
    },

    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.n_review_wait_count',
        defaultMessage: '',
      }),
      dataIndex: 'n_review_wait_count',
      key: 'n_review_wait_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.o_review_refuse_count',
        defaultMessage: '',
      }),
      dataIndex: 'o_review_refuse_count',
      key: 'o_review_refuse_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.p_review_accept_count',
        defaultMessage: '',
      }),
      dataIndex: 'p_review_accept_count',
      key: 'p_review_accept_count',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.q_review_wait_count1',
        defaultMessage: '',
      }),
      dataIndex: 'q_review_wait_count1',
      key: 'q_review_wait_count1',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.r_review_wait_count2',
        defaultMessage: '',
      }),
      dataIndex: 'r_review_wait_count2',
      key: 'r_review_wait_count2',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.ReviewAdmin.s_review_wait_count3',
        defaultMessage: '',
      }),
      dataIndex: 's_review_wait_count3',
      key: 's_review_wait_count3',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.ReviewAdmin.j_status', defaultMessage: '' }),
      dataIndex: 'j_status',
      key: 'j_status',
      render: (_, record) => {
        return (
          <Popconfirm
            title={`${intl.formatMessage({
              id: 'pages.common.switch_tip',
              defaultMessage: '',
            })} ${intl.formatMessage({
              id: 'pages.Borrow.ReviewAdmin.j_status',
              defaultMessage: '',
            })}`}
            onConfirm={confirmSwitch.bind(this, record, 'j_status2')}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checkedChildren={intl.formatMessage({ id: 'pages.common.open', defaultMessage: '' })}
              unCheckedChildren={intl.formatMessage({
                id: 'pages.common.close',
                defaultMessage: '',
              })}
              checked={record.j_status === 'y'}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.common.option', defaultMessage: '' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        let move;
        if (record.n_review_wait_count! > 0) {
          move = (
            <a key="move" onClick={() => onReleaseClick(record)}>
              {intl.formatMessage({ id: 'pages.common.option.release', defaultMessage: '' })}
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

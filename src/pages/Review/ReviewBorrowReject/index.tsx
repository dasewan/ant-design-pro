import DrawerFC from '@/pages/Review/ReviewBorrow/components/DrawerFC';
import { REVIEW_TAG_TYPE } from '@/pages/Review/ReviewBorrow/enums';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Col, Row, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import type { TableListItem, TableListPagination } from './data';
import { FieldIndex, FieldLabels } from './service';

import { getAdminV1APReviewGroupsEnum as getAPReviewGroupsEnum } from '@/services/ant-design-pro/APReviewGroup';
import { getAdminV1BFReviewBorrows as index } from '@/services/ant-design-pro/BFReviewBorrow';
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  /** 管理员enum */
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);
  /** 审核组enum */
  const [groups, setGroups] = useState<RequestOptionsType[]>([]);
  /** drawer是否显示 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();

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
    console.log(123);
    if (groups.length == 0) {
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
    const res = await index({ page: params.current, ...params, c_result: 2 });

    /*    if(admins.length == 0){
          // @ts-ignore
          await _getUsersEnum();
        }*/
    if (groups.length == 0) {
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
   * 流转记录drawer
   * @param record
   */
  const _showDrawer = (record: TableListItem) => {
    setCurrentRow(record);
    setShowDetail(true);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单号',
      dataIndex: ['a_a_a_a_a_d_borrow', 'h_sn'],
      copyable: true,
      search: {
        transform: (value: any) => ({ 'd_borrow-h_sn': value }),
      },
    },
    {
      title: '手机号',
      dataIndex: ['a_a_a_a_a_d_borrow', 'ak_phone'],
      copyable: true,
      search: {
        transform: (value: any) => ({ 'd_borrow-ak_phone': value }),
      },
    },
    {
      title: '借款金额',
      dataIndex: ['a_a_a_a_a_d_borrow', 'm_borrow_amount'],
      search: {
        transform: (value: any) => ({ 'd_borrow-m_borrow_amount': value }),
      },
    },
    {
      title: '借款次数',
      dataIndex: ['a_a_a_a_a_d_borrow', 'l_borrow_count'],
      search: {
        transform: (value: any) => ({ 'd_borrow-l_borrow_count': value }),
      },
    },
    {
      title: FieldLabels.b_admin_id,
      dataIndex: FieldIndex.b_admin_id,
      valueType: 'select',
      request: _getUsersEnum,
      params: { timestamp: Math.random() },
      render: (_, record) => {
        console.log(admins);
        console.log(_);
        //todo 如果管理员状态被禁用，删除线
        return admins.find((item) => {
          return item.role_id == 1 && item.id == record.b_admin_id;
        }) ? (
          <del>{_}</del>
        ) : (
          _
        );
      },
    },
    {
      title: FieldLabels.d_id_number_tag_ids,
      dataIndex: FieldIndex.d_id_number_tag_ids,
      hideInSearch: true,
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        if (record.d_id_number_tag_ids != null && record.d_id_number_tag_ids != '') {
          const tagIds = record.d_id_number_tag_ids!.split(',');
          return (
            <div>
              {tagIds.map((item) => (
                <Row key={item}>
                  <Col>
                    <Tag color={REVIEW_TAG_TYPE[item].color}>{REVIEW_TAG_TYPE[item].text}</Tag>
                  </Col>
                </Row>
              ))}
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.e_contact_persion_tag_ids,
      dataIndex: FieldIndex.e_contact_persion_tag_ids,
      hideInSearch: true,
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        if (record.e_contact_persion_tag_ids != null && record.e_contact_persion_tag_ids != '') {
          const tagIds = record.e_contact_persion_tag_ids!.split(',');
          return (
            <div>
              {tagIds.map((item) => (
                <Row key={item}>
                  <Col>
                    <Tag color={REVIEW_TAG_TYPE[item].color}>{REVIEW_TAG_TYPE[item].text}</Tag>
                  </Col>
                </Row>
              ))}
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.f_job_tag_ids,
      dataIndex: FieldIndex.f_job_tag_ids,
      hideInSearch: true,
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        if (record.f_job_tag_ids != null && record.f_job_tag_ids != '') {
          const tagIds = record.f_job_tag_ids!.split(',');
          return (
            <div>
              {tagIds.map((item) => (
                <Row key={item}>
                  <Col>
                    <Tag color={REVIEW_TAG_TYPE[item].color}>{REVIEW_TAG_TYPE[item].text}</Tag>
                  </Col>
                </Row>
              ))}
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.g_contact_tag_ids,
      dataIndex: FieldIndex.g_contact_tag_ids,
      hideInSearch: true,
      width: 100,
      valueType: 'option',
      render: (_, record) => {
        if (record.g_contact_tag_ids != null && record.g_contact_tag_ids != '') {
          const tagIds = record.g_contact_tag_ids!.split(',');
          return (
            <div>
              {tagIds.map((item) => (
                <Row key={item}>
                  <Col>
                    <Tag color={REVIEW_TAG_TYPE[item].color}>{REVIEW_TAG_TYPE[item].text}</Tag>
                  </Col>
                </Row>
              ))}
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.h_sms_tag_ids,
      dataIndex: FieldIndex.h_sms_tag_ids,
      hideInSearch: true,
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        if (record.h_sms_tag_ids != null && record.h_sms_tag_ids != '') {
          const tagIds = record.h_sms_tag_ids!.split(',');
          return (
            <div>
              {tagIds.map((item) => (
                <Row key={item}>
                  <Col>
                    <Tag color={REVIEW_TAG_TYPE[item].color}>{REVIEW_TAG_TYPE[item].text}</Tag>
                  </Col>
                </Row>
              ))}
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.i_risk_tag_ids,
      dataIndex: FieldIndex.i_risk_tag_ids,
      hideInSearch: true,
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        if (record.i_risk_tag_ids != null && record.i_risk_tag_ids != '') {
          const tagIds = record.i_risk_tag_ids!.split(',');
          return (
            <div>
              {tagIds.map((item) => (
                <Row key={item}>
                  <Col>
                    <Tag color={REVIEW_TAG_TYPE[item].color}>{REVIEW_TAG_TYPE[item].text}</Tag>
                  </Col>
                </Row>
              ))}
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.j_app_tag_ids,
      dataIndex: FieldIndex.j_app_tag_ids,
      hideInSearch: true,
      valueType: 'option',
      width: 10,
      render: (_, record) => {
        if (record.j_app_tag_ids != null && record.j_app_tag_ids != '') {
          const tagIds = record.j_app_tag_ids!.split(',');
          return (
            <div>
              {tagIds.map((item) => (
                <Row key={item}>
                  <Col>
                    <Tag color={REVIEW_TAG_TYPE[item].color}>{REVIEW_TAG_TYPE[item].text}</Tag>
                  </Col>
                </Row>
              ))}
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.k_history_tag_ids,
      dataIndex: FieldIndex.k_history_tag_ids,
      hideInSearch: true,
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        if (record.k_history_tag_ids != null && record.k_history_tag_ids != '') {
          const tagIds = record.k_history_tag_ids!.split(',');
          return (
            <div>
              {tagIds.map((item) => (
                <Row key={item}>
                  <Col>
                    <Tag color={REVIEW_TAG_TYPE[item].color}>{REVIEW_TAG_TYPE[item].text}</Tag>
                  </Col>
                </Row>
              ))}
            </div>
          );
        }
        return '-';
      },
    },
    {
      title: FieldLabels.l_flow_count,
      dataIndex: FieldIndex.l_flow_count,
      hideInSearch: true,
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              _showDrawer(record);
            }}
          >
            {record.l_flow_count}
          </a>
        );
      },
    },
  ];

  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '审核拒绝的订单',
        ghost: true,
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

      <DrawerFC
        showDetail={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        data={currentRow!}
        admins={admins}
      />
    </PageContainer>
  );
};

export default TableList;

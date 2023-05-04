import type { TableListPagination } from '@/pages/UserManager/AUser/data';
import { getAdminV1AMBlackHitHistories as getAMBlackHitHistories } from '@/services/ant-design-pro/AMBlackHitHistory';
import ProList from '@ant-design/pro-list';
import { Alert, Drawer } from 'antd';
import moment from 'moment';
import React from 'react';

export type DrawerFCProps = {
  showDetail: boolean;
  onClose: () => void;
  currentRow: API.RBlack;
};

const DrawerFC: React.FC<DrawerFCProps> = (props) => {
  /**
   * 获取黑名单命中历史
   * @param params
   */
  const _getAMBlackHitHistories = async (
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
    const res = await getAMBlackHitHistories({
      a_black_id: props.currentRow.id,
      page: params.current,
      ...params,
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

  return (
    <Drawer
      width={600}
      open={props.showDetail}
      onClose={() => {
        props.onClose();
      }}
      closable={false}
      destroyOnClose={true}
    >
      <ProList<API.AMBlackHitHistory>
        // loading={props.AMBlackHitHistorys.get(props.id) ? false:true}
        rowKey="id"
        headerTitle={props.currentRow?.a_info}
        // @ts-ignore
        request={_getAMBlackHitHistories}
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            dataIndex: 'created_at',
            render: (_, record) => {
              return moment(record.created_at).format('YYYY-MM-DD HH:mm:ss');
            },
          },
          subTitle: {
            dataIndex: 'user_phone',
            render: (_, record) => {
              return record.d_loan_count === 0 ? (
                record.c_user_phone
              ) : (
                <Alert
                  message={record.c_user_phone + '放款次数：' + record.d_loan_count}
                  type="error"
                />
              );
            },
          },
        }}
      />
    </Drawer>
  );
};

export default DrawerFC;

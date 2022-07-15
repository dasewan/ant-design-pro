import ProList from '@ant-design/pro-list';
import { Alert, Drawer } from 'antd';
import moment from 'moment';
import React from 'react';

export type DrawerFCProps = {
  showDetail: boolean;
  onClose: () => void;
  data: API.AMBlackHitHistory[];
  currentRow: API.RBlack;
  id: number;
};

const DrawerFC: React.FC<DrawerFCProps> = (props) => {
  return (
    <Drawer
      width={600}
      visible={props.showDetail}
      onClose={() => {
        props.onClose();
      }}
      closable={false}
    >
      <ProList<API.AMBlackHitHistory>
        // loading={props.AMBlackHitHistorys.get(props.id) ? false:true}
        rowKey="id"
        headerTitle={props.currentRow?.a_info}
        dataSource={props.data}
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            dataIndex: 'created_at',
            render: (_, record) => {
              return moment(record.created_at).format('YYYY-MM-DD HH:mm:ss');
            },
          },
          // avatar: {
          //   dataIndex: 'image',
          // },
          // description: {
          //   dataIndex: 'user_phone',
          // },
          subTitle: {
            dataIndex: 'user_phone',
            render: (_, record) => {
              return record.d_loan_count == 0 ? (
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

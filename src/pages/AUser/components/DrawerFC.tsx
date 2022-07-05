import { NEWS_ENUM } from '@/pages/enums';
import ProList from '@ant-design/pro-list';
import { Drawer, Space, Tag } from 'antd';
import moment from 'moment';
import React from 'react';

export type DrawerFCProps = {
  showDetail: boolean;
  onClose: () => void;
  currentRow: API.AUser;
  type: string;
  aCUserNews: Map<number, API.ACUserNew[]>;
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
      {props.type == 'aCUserNews' && props.aCUserNews.has(props.id) && (
        <ProList<API.ACUserNew>
          onRow={(record: any) => {
            return {
              onMouseEnter: () => {
                console.log(record);
              },
              onClick: () => {
                console.log(record);
              },
            };
          }}
          // loading={props.aCUserNews.get(props.id) ? false:true}
          rowKey="name"
          headerTitle={props.currentRow?.a_phone}
          tooltip="记录用户部分节点"
          dataSource={props.aCUserNews.get(props.id)}
          showActions="hover"
          showExtra="hover"
          metas={{
            title: {
              dataIndex: 'created_at',
              render: (_, value) => {
                return moment(value.created_at).format('YYYY-MM-DD HH:mm:ss');
              },
            },
            // avatar: {
            //   dataIndex: 'image',
            // },
            description: {
              dataIndex: 'c_comment',
            },
            subTitle: {
              render: (_, value) => {
                console.log(NEWS_ENUM);
                return (
                  <Space size={0}>
                    <Tag color={NEWS_ENUM[value.b_type!].color}>
                      {NEWS_ENUM[value.b_type!].text}
                    </Tag>
                  </Space>
                );
              },
            },
          }}
        />
      )}
    </Drawer>
  );
};

export default DrawerFC;

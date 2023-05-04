import { Drawer, Table } from 'antd';
import React from 'react';

export type DrawerFCProps = {
  visable: boolean;
  onClose: () => void;
  // aUser: API.AUser;
  // type: string;
};

const columns = [
  {
    title: '函数',
    dataIndex: 'function',
    key: 'function',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '语法',
    dataIndex: 'grammar',
    key: 'grammar',
  },
  {
    title: '输出',
    dataIndex: 'res',
    key: 'res',
  },
];
const data = [
  {
    key: '1',
    function: 'abs()',
    description: '绝对值',
    grammar: 'abs(-3)',
    res: '3',
  },
  {
    key: '2',
    function: 'acos()',
    description: '反余弦',
    grammar: 'acos(0.64)',
    res: '0.876298061168',
  },
  {
    key: '3',
    function: 'acosh()',
    description: '反双曲余弦',
    grammar: 'acosh(2)',
    res: '1.3169578969248',
  },
  {
    key: '4',
    function: 'asin()',
    description: '反正弦',
    grammar: 'asin(0.64)',
    res: '0.694498265627',
  },
];

const DrawerFC: React.FC<DrawerFCProps> = (props) => {
  return (
    <Drawer
      width={1200}
      open={props.visable}
      onClose={() => {
        props.onClose();
      }}
      closable={false}
      destroyOnClose={true}
      placement="left"
    >
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    </Drawer>
  );
};

export default DrawerFC;

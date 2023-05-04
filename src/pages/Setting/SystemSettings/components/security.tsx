import { putAdminV1GHSettingsId as update } from '@/services/ant-design-pro/GHSetting';
import { Badge, List, message, Popconfirm, Spin, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import CreateForm from './CreateForm';

type Unpacked<T> = T extends (infer U)[] ? U : T;

export type Props = {
  data?: API.GHSetting[] | any;
};

const SecurityView: React.FC<Props> = (props) => {
  const [data, setData] = useState<API.GHSetting[]>(props.data);
  const [editData, setEditData] = useState<API.GHSetting>();
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 相当于 componentDidMount
    setData(props.data);
    return;
  }, [props.data]);
  // setData(props.data);
  const confirm = async (_item: API.GHSetting) => {
    const tmpData: API.GHSetting[] = [];
    let _success = true;
    if (_item.h_field_type === 'ProFormSwitch') {
      _item.e_value = _item.e_value === '1' ? '0' : '1';
      setLoading(true);
      try {
        // @ts-ignore
        const res = await update({ ..._item });
        if (!res.success) {
          //恢复原值
          _item.e_value = _item.e_value === '1' ? '0' : '1';
          _success = false;
        }
      } catch (error) {
        message.error('配置失败请重试！');
        //恢复原值
        _item.e_value = _item.e_value === '1' ? '0' : '1';
        _success = false;
      }
    }
    data.map((_: API.GHSetting) => {
      if (_.id === _item.id) {
        tmpData.push(_item);
      } else {
        tmpData.push(_);
      }
      return tmpData;
    });
    setData(tmpData);
    setLoading(false);
    if (_success) {
      message.success('修改成功');
    } else {
      message.warn('修改失败');
    }
  };

  // const cancel = () => {
  //   message.error('Click on No');
  // };
  const showModel = (_item: API.GHSetting) => {
    setEditData(_item);
    handleCreateModalVisible(true);
  };
  return (
    <Spin spinning={loading}>
      <List<Unpacked<typeof props.data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              item.h_field_type === 'ProFormSwitch' ? (
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={confirm.bind(this, item)}
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    checked={item.e_value === '1'}
                  />
                </Popconfirm>
              ) : (
                <a key="Modify" onClick={() => showModel(item)}>
                  {item.e_value !== '' ? '修改' : '设置'}
                </a>
              ),
            ]}
          >
            <List.Item.Meta
              title={
                <>
                  <span>
                    {item.k_badge !== '' ? <Badge color={item.k_badge} /> : ''}
                    {item.a_title}:
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    {item.h_field_type === 'ProFormSwitch' ? (
                      item.e_value === '1' ? (
                        <span style={{ color: 'green', fontWeight: 'bold' }}>已启用</span>
                      ) : (
                        <span style={{ color: 'red', fontWeight: 'bold' }}>已关闭</span>
                      )
                    ) : (
                      <span style={{ color: 'purple', fontWeight: 'bold' }}>{item.e_value}</span>
                    )}
                  </span>
                </>
              }
              description={item.b_description}
            />
          </List.Item>
        )}
      />
      {/*表单model*/}
      <CreateForm
        onSubmit={async (_item: API.GHSetting) => {
          confirm(_item);
          handleCreateModalVisible(false);
        }}
        onCancel={() => {
          handleCreateModalVisible(false);
        }}
        modalVisible={createModalVisible}
        data={editData!}
      />
    </Spin>
  );
};

export default SecurityView;

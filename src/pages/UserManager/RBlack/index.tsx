import ImportForm from '@/pages/UserManager/RBlack/components/ImportForm';
import { getAdminV1RBlackTab as getRBlackTab } from '@/services/ant-design-pro/RBlack';
import { DownloadOutlined, EllipsisOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { TabPaneProps } from 'antd';
import { Button, Dropdown, Menu } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { CacheRoute, CacheSwitch } from 'react-router-cache-route';
import { history } from 'umi';

type RBlackProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const RBlack: FC<RBlackProps> = (props) => {
  /** 导入黑名单excel */
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  /** tabs */
  const [tabList, setTabList] = useState<
    (TabPaneProps & {
      key?: React.ReactText;
    })[]
  >([
    {
      key: 'phone',
      tab: '手机号码',
    },
    {
      key: 'id-number',
      tab: '证件号',
    },
    {
      key: 'id-number2',
      tab: '证件号2',
    },
    {
      key: 'bank-card',
      tab: '银行卡号',
    },
    {
      key: 'imei',
      tab: 'IMEI',
    },
    {
      key: 'device',
      tab: '设备',
    },
  ]);
  const { match } = props;
  /** 获取tab */
  const _getRBlackTab = async () => {
    // @ts-ignore
    const res = await getRBlackTab({ foo: null });
    tabList.forEach((value) => {
      const tabCount = res.data?.find((item: API.CommonTab) => item.key == value.key)?.tab_count;
      const todayCount = res.data?.find(
        (item: API.CommonTab) => item.key == value.key,
      )?.today_count;
      if (tabCount != undefined && tabCount > 0) {
        value.tab = (
          <div>
            {value.tab + ' ' + tabCount}
            <span className={'statistic-today-increase'}>
              {todayCount != undefined && todayCount > 0 ? '+' + todayCount : ''}
            </span>
          </div>
        );
      }
    });
    setTabList(tabList);
  };
  useEffect(() => {
    _getRBlackTab().then(() => history.push(`/user-manager/black-info-list/phone`));
    return () => {};
  }, []);

  const _handleTabChange = (key: string) => {
    const url = match.url === '/' ? '' : match.url;
    console.log(url);
    console.log(key);
    console.log(`${url}/${key}`);
    history.push(`${url}/${key}`);
  };

  const _getTabKey = () => {
    const { location } = props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  return (
    <PageContainer
      header={{
        title: '黑名单信息',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => handleImportModalVisible(true)}>
            导入黑名单
          </Button>,
          <Dropdown
            key="dropdown"
            trigger={['click']}
            overlay={
              <Menu
                items={[
                  { label: '操作说明', key: 'item-1', icon: <FileTextOutlined /> },
                  {
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={'/admin/v1/aLAdminFiles_templete/black_info_list.xlsx'}
                      >
                        模版下载
                      </a>
                    ),
                    key: 'item-2',
                    icon: <DownloadOutlined />,
                  },
                ]}
              />
            }
          >
            <Button key="4" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ],
      }}
      tabList={tabList}
      tabActiveKey={_getTabKey()}
      onTabChange={_handleTabChange}
    >
      {/*{props.children}*/}
      <ImportForm
        onSubmit={async (success) => {
          if (success) {
            handleImportModalVisible(false);
            // if (actionRef.current) {
            //   actionRef.current.reload();
            // }
          }
        }}
        onCancel={() => {
          handleImportModalVisible(false);
        }}
        modalVisible={importModalVisible}
      />
      <CacheSwitch>
        <CacheRoute path="/user-manager/black-info-list/phone">{props.children}</CacheRoute>
        <CacheRoute path="/user-manager/black-info-list/id-number">{props.children}</CacheRoute>
        <CacheRoute path="/user-manager/black-info-list/id-number2">{props.children}</CacheRoute>
        <CacheRoute path="/user-manager/black-info-list/bank-card">{props.children}</CacheRoute>
        <CacheRoute path="/user-manager/black-info-list/imei">{props.children}</CacheRoute>
        <CacheRoute path="/user-manager/black-info-list/device">{props.children}</CacheRoute>
      </CacheSwitch>
      *
    </PageContainer>
  );
};

export default RBlack;

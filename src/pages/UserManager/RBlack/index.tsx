import ImportForm from '@/pages/UserManager/RBlack/components/ImportForm';
import { getAdminV1RBlackTab as getRBlackTab } from '@/services/ant-design-pro/RBlack';
import { DownloadOutlined, EllipsisOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { TabPaneProps } from 'antd';
import { Button, Dropdown, MenuProps } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { AliveScope, KeepAlive } from 'react-activation';
import { useLocation } from 'react-router-dom';
import { history, Outlet } from 'umi';

const RBlack: FC = () => {
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
    // {
    //   key: 'imei',
    //   tab: 'IMEI',
    // },
    {
      key: 'device',
      tab: '设备',
    },
  ]);
  const location = useLocation();

  /** 获取tab */
  const _getRBlackTab = async () => {
    return;
    // @ts-ignore
    const res = await getRBlackTab({ foo: null });
    tabList.forEach((value) => {
      const tabCount = res.data?.find((item: API.CommonTab) => item.key === value.key)?.tab_count;
      const todayCount = res.data?.find(
        (item: API.CommonTab) => item.key === value.key,
      )?.today_count;
      if (tabCount !== undefined && tabCount > 0) {
        value.tab = (
          <div>
            {value.tab + ' ' + tabCount}
            <span className={'statistic-today-increase'}>
              {todayCount !== undefined && todayCount > 0 ? '+' + todayCount : ''}
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
    console.log(location.pathname);
    const url = '/user-manager/black-info-list';
    history.push(`${url}/${key}`);
  };

  const _getTabKey = () => {
    console.log(location.pathname);
    const url = '/user-manager/black-info-list';
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'phone';
  };
  const items: MenuProps['items'] = [
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
  ];

  return (
    <AliveScope>
      <PageContainer
        header={{
          title: '黑名单信息',
          ghost: true,
          extra: [
            <Button key="3" type="primary" onClick={() => handleImportModalVisible(true)}>
              导入黑名单
            </Button>,
            <Dropdown key="dropdown" trigger={['click']} menu={{ items }}>
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
        {/*<Outlet />*/}
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
        {/*      <Router>
      <CacheSwitch>
        <CacheRoute path="/user-manager/black-info-list/phone" element={<Outlet />} children={element}></CacheRoute>

      </CacheSwitch>
      </Router>*/}
        {/*      <KeepAlive name={match?.params.key}>
        <div>
        {match?.params.key}
        <Outlet />
        </div>
      </KeepAlive>*/}
        {/*      <KeepAlive name={location.pathname}>
        <Outlet />
      </KeepAlive>*/}
        <KeepAlive
          when={true}
          name={location.pathname}
          id={location.pathname}
          saveScrollPosition="screen"
        >
          <Outlet />
        </KeepAlive>
        {/*        <KeepAlive  when={true} name={location.pathname} id={location.pathname}>
          <div>123</div>
        </KeepAlive>*/}
        {/*      <Routes>

        <Route path="/phone" element={<KeepAlive name="phone">
         <Outlet />
        </KeepAlive>}>

        </Route>

        <Route path="/id-number" element={ <KeepAlive name="id-number">
          <div><Outlet /></div>
        </KeepAlive>}>

        </Route>

      </Routes>*/}
      </PageContainer>
    </AliveScope>
  );
};

export default RBlack;

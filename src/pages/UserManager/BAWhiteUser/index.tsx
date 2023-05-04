import { getAdminV1BAWhiteTab as getBAWhiteTab } from '@/services/ant-design-pro/BAWhite';
import { PageContainer } from '@ant-design/pro-layout';
import type { TabPaneProps } from 'antd';
import { Tooltip } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { history, Outlet } from 'umi';

const BAWhite: FC = () => {
  /** tabs */
  const [tabList, setTabList] = useState<
    (TabPaneProps & {
      key?: React.ReactText;
    })[]
  >([
    {
      key: 'white-user',
      tab: '白名单用户',
    },
    {
      key: 'white-user-with-overdue',
      tab: '逾期白名单',
    },
  ]);
  /** 获取tab */
  const _getBAWhiteTab = async () => {
    // @ts-ignore
    const res = await getBAWhiteTab({ foo: null });
    tabList.forEach((value) => {
      const tabCount = res.data?.find((item: API.CommonTab) => item.key === value.key)?.tab_count;
      const todayCount = res.data?.find(
        (item: API.CommonTab) => item.key === value.key,
      )?.today_count;
      const title = res.data?.find((item: API.CommonTab) => item.key === value.key)?.tooltip;
      value.tab = (
        <div>
          {tabCount !== undefined && tabCount > 0 ? value.tab + ' ' + tabCount : value.tab}
          {todayCount !== undefined && todayCount > 0 ? (
            <Tooltip title={title}>
              <span className={'statistic-today-increase'}>{'+' + todayCount}</span>
            </Tooltip>
          ) : (
            ''
          )}
        </div>
      );
    });
    setTabList(tabList);
  };
  useEffect(() => {
    _getBAWhiteTab().then(() => history.push(`/user-manager/white-user-list/white-user`));
    return () => {};
  }, []);

  const _handleTabChange = (key: string) => {
    history.push(`/user-manager/white-user-list/${key}`);
  };

  const _getTabKey = () => {
    /*    const { location } = props;
        const url = match.path === '/' ? '' : match.path;
        const tabKey = location.pathname.replace(`${url}/`, '');
        if (tabKey && tabKey !== '/') {
          return tabKey;
        }*/
    return 'articles';
  };

  return (
    <PageContainer
      header={{
        title: '白名单用户',
        ghost: true,
      }}
      tabList={tabList}
      tabActiveKey={_getTabKey()}
      onTabChange={_handleTabChange}
    >
      <Outlet />
    </PageContainer>
  );
};

export default BAWhite;

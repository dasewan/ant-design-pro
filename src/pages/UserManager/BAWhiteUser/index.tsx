import { useIntl } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { FC } from 'react';
import { useEffect } from 'react';
import { history, Outlet } from 'umi';

const BAWhite: FC = () => {
  const intl = useIntl();
  /** tabs */
  const tabList = [
    {
      key: 'white-user',
      tab: intl.formatMessage({
        id: 'pages.userManager.bAWhiteUser.tab.whiteUserList',
        defaultMessage: '白名单用户',
      }),
    },
    {
      key: 'white-user-with-overdue',
      tab: intl.formatMessage({
        id: 'pages.userManager.bAWhiteUser.tab.whiteUserWithOverdueList',
        defaultMessage: '逾期白名单用户',
      }),
    },
  ];
  /** 获取tab */
  /*  const _getBAWhiteTab = async () => {
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
    };*/
  useEffect(() => {
    history.push(`/user-manager/white-user-list/white-user`);
    return () => {};
  }, []);

  const _handleTabChange = (key: string) => {
    console.log('key');
    console.log(key);
    history.push(`/user-manager/white-user-list/${key}`);
  };

  return (
    <PageContainer
      header={{
        ghost: true,
      }}
      tabList={tabList}
      // tabActiveKey={_getTabKey()}
      onTabChange={_handleTabChange}
    >
      <Outlet />
    </PageContainer>
  );
};

export default BAWhite;

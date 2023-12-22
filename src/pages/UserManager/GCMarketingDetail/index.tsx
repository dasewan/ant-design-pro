import { Outlet, useIntl } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { FC } from 'react';
import { useEffect } from 'react';
import { history } from 'umi';

const GCMarketingDetail: FC = () => {
  const intl = useIntl();
  /** tabs */
  const tabList = [
    {
      key: 'marketing-success-user',
      tab: intl.formatMessage({
        id: 'pages.userManager.marketingDetail.tab.marketing-success-user',
        defaultMessage: '白名单用户',
      }),
    },
    {
      key: 'marketing-list',
      tab: intl.formatMessage({
        id: 'pages.userManager.marketingDetail.tab.marketing-list',
        defaultMessage: '白名单用户',
      }),
    },
  ];
  /** 获取tab */
  /*  const _getGAMarketingDetailsTab = async () => {
      // @ts-ignore
      const res = await getGAMarketingDetailsTab({ foo: null });
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
    history.push(`/user-manager/marketing-detail-list/marketing-success-user`);
    /*    _getGAMarketingDetailsTab().then(() =>
          history.push(`/user-manager/marketing-detail-list/marketing-success-user`),
        );*/
    return () => {};
  }, []);

  const _handleTabChange = (key: string) => {
    history.push(`/user-manager/marketing-detail-list/${key}`);
  };

  /*const _getTabKey = () => {
     const { location } = props;
     const url = match.path === '/' ? '' : match.path;
     const tabKey = location.pathname.replace(`${url}/`, '');
     if (tabKey && tabKey !== '/') {
       return tabKey;
     }
    return 'marketing-success-user';
  };
   */

  return (
    <PageContainer
      tabList={tabList}
      // tabActiveKey={_getTabKey()}
      onTabChange={_handleTabChange}
    >
      <Outlet />
    </PageContainer>
  );
};

export default GCMarketingDetail;

import { Outlet } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { FC } from 'react';
import { useEffect } from 'react';
import { history } from 'umi';

const tabList = [
  {
    key: 'black-user',
    tab: '黑名单用户',
  },
  {
    key: 'black-user-with-repay',
    tab: '已结清黑名单',
  },
];

const RBlack: FC = () => {
  useEffect(() => {
    history.push(`/user-manager/black-user-list/black-user`);
    return () => {};
  }, []);

  const _handleTabChange = (key: string) => {
    // const url = match.url === '/' ? '' : match.url;
    history.push(`/user-manager/black-user-list/${key}`);
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
        title: '黑名单用户',
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

export default RBlack;

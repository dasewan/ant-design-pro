import { PageContainer } from '@ant-design/pro-layout';
import type { TabPaneProps } from 'antd';
import { Tooltip } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { getGAMarketingDetailsTab } from './service';

type CommonProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const GCMarketingDetail: FC<CommonProps> = (props) => {
  const { match } = props;
  /** tabs */
  const [tabList, setTabList] = useState<
    (TabPaneProps & {
      key?: React.ReactText;
    })[]
  >([
    {
      key: 'marketing-success-user',
      tab: '已注册用户',
    },
    {
      key: 'marketing-user-with-overdue',
      tab: '已逾期用户',
    },
    {
      key: 'marketing-list',
      tab: '未注册名单',
    },
  ]);
  /** 获取tab */
  const _getGAMarketingDetailsTab = async () => {
    // @ts-ignore
    const res = await getGAMarketingDetailsTab({ foo: null });
    tabList.forEach((value) => {
      const tabCount = res.data?.find((item: API.CommonTab) => item.key == value.key)?.tab_count;
      const todayCount = res.data?.find(
        (item: API.CommonTab) => item.key == value.key,
      )?.today_count;
      const title = res.data?.find((item: API.CommonTab) => item.key == value.key)?.tooltip;
      value.tab = (
        <div>
          {tabCount != undefined && tabCount > 0 ? value.tab + ' ' + tabCount : value.tab}
          {todayCount != undefined && todayCount > 0 ? (
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
    _getGAMarketingDetailsTab().then(() =>
      history.push(`/marketing-detail-list/marketing-success-user`),
    );
    return () => {};
  }, []);

  const _handleTabChange = (key: string) => {
    const url = match.url === '/' ? '' : match.url;
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
        title: '营销用户',
        ghost: true,
      }}
      tabList={tabList}
      tabActiveKey={_getTabKey()}
      onTabChange={_handleTabChange}
    >
      {props.children}
    </PageContainer>
  );
};

export default GCMarketingDetail;

import { PageContainer } from '@ant-design/pro-layout';
import type { TabPaneProps } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { getTab } from './service';

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
  /** tabs */
  const [tabList, setTabList] = useState<
    (TabPaneProps & {
      key?: React.ReactText;
    })[]
  >([
    {
      key: 'success-loan',
      tab: '放款成功订单',
    },
    {
      key: 'processing-loan',
      tab: '放款中订单',
    },
    {
      key: 'fail-loan',
      tab: '放款失败订单',
    },
    {
      key: 'unknown-loan',
      tab: '放款未知结果订单',
    },
    {
      key: 'intercept-loan',
      tab: '放款拦截订单',
    },
  ]);
  const { match } = props;
  /** 获取tab */
  const _getRBlackTab = async () => {
    // @ts-ignore
    const res = await getTab({ foo: null });
    tabList.forEach((value) => {
      const tabCount = res.data?.find((item: API.CommonTab) => item.key == value.key)?.tab_count;
      const todayCount = res.data?.find(
        (item: API.CommonTab) => item.key == value.key,
      )?.today_count;
      if (tabCount != undefined && tabCount > 0) {
        value.tab = (
          <div>
            {value.tab + ' '}
            <span className={'statistic-total-increase'}>
              {todayCount != undefined && todayCount > 0 ? '+' + todayCount : ''}
            </span>
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
    _getRBlackTab().then(() => history.push(`/loan/loan-list/success-loan`));
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
        title: '放款结果',
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

export default RBlack;

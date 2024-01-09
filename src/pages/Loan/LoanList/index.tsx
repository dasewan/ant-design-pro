import { getAdminV1MBLoanTab as getTab } from '@/services/ant-design-pro/MBLoan';
import { useIntl } from '@@/exports';
import { PageContainer } from '@ant-design/pro-layout';
import type { TabPaneProps } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { AliveScope, KeepAlive } from 'react-activation';
import { useLocation } from 'react-router-dom';
import { history, Outlet } from 'umi';

const RBlack: FC = () => {
  const intl = useIntl();
  /** tabs */
  const [tabList, setTabList] = useState<
    (TabPaneProps & {
      key?: React.ReactText;
    })[]
  >([
    {
      key: 'success-loan',
      tab: intl.formatMessage({
        id: 'pages.Loan.success-loan',
        defaultMessage: 'phone',
      }),
    },
    {
      key: 'processing-loan',
      tab: intl.formatMessage({
        id: 'pages.Loan.processing-loan',
        defaultMessage: 'phone',
      }),
    },
    {
      key: 'fail-loan',
      tab: intl.formatMessage({
        id: 'pages.Loan.fail-loan',
        defaultMessage: 'phone',
      }),
    },
    {
      key: 'unknown-loan',
      tab: intl.formatMessage({
        id: 'pages.Loan.unknown-loan',
        defaultMessage: 'phone',
      }),
    },
    {
      key: 'intercept-loan',
      tab: intl.formatMessage({
        id: 'pages.Loan.intercept-loan',
        defaultMessage: 'phone',
      }),
    },
  ]);
  const location = useLocation();
  /** 获取tab */
  const _getRBlackTab = async () => {
    // return;
    // @ts-ignore
    const res = await getTab({ foo: null });
    tabList.forEach((value) => {
      const tabCount = res.data?.find((item: API.CommonTab) => item.key === value.key)?.tab_count;
      let color = 'blue';
      if (value.key === 'success-loan') {
        color = 'green';
      } else if (value.key === 'intercept-loan' || value.key === 'fail-loan') {
        color = 'red';
      }
      const todayCount = res.data?.find(
        (item: API.CommonTab) => item.key === value.key,
      )?.today_count;
      if (tabCount !== undefined && tabCount > 0) {
        value.tab = (
          <div>
            {value.tab + ' '}
            <span className={'statistic-total-increase'}>
              {todayCount !== undefined && todayCount > 0 ? '' + todayCount : ''}
            </span>
            <span className={'statistic-today-increase'} style={{ color: color }}>
              {todayCount !== undefined && todayCount > 0 ? '+' + todayCount : ''}
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
    history.push(`/loan/loan-list/${key}`);
  };

  const _getTabKey = () => {
    const url = '/loan/loan-list';
    const tabKey = location.pathname.replace(`${url}/`, '');
    console.log(tabKey);
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'success-loan';
  };

  return (
    <AliveScope>
      <PageContainer
        header={{
          ghost: true,
        }}
        tabList={tabList}
        tabActiveKey={_getTabKey()}
        onTabChange={_handleTabChange}
      >
        <KeepAlive
          when={true}
          name={location.pathname}
          id={location.pathname}
          saveScrollPosition="screen"
        >
          <Outlet context={{}} />
        </KeepAlive>
      </PageContainer>
    </AliveScope>
  );
};

export default RBlack;

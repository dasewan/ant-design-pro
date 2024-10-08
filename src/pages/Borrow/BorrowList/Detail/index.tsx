import { DownloadOutlined, EllipsisOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { TabPaneProps } from 'antd';
import { Button, Descriptions, Dropdown, MenuProps, Skeleton, Statistic } from 'antd';
import type { FC } from 'react';
import React, { Fragment, useEffect, useState } from 'react';

import ReviewForm from '@/pages/Borrow/BorrowList/components/ReviewForm';
import { BORROW_STATUS_ENUM, BORROW_STATUS_MAP, VERIFY_STATUS_MAP } from '@/pages/enums';
import { getAdminV1DBorrowsId as show } from '@/services/ant-design-pro/DBorrow';
import { Outlet } from '@@/exports';
import moment from 'moment';
import { AliveScope, KeepAlive } from 'react-activation';
import { history, useParams } from 'umi';
import styles from '../style.less';
import type { TableListItem } from './data.d';

const ButtonGroup = Button.Group;

const Advanced: FC = () => {
  const params = useParams<{ id: string }>();
  const [display, setDisplay] = useState<string>('table-cell');
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  const [other, setOther] = useState<API.BorrowDetail>();
  const [userId, setUserId] = useState<number>();
  const [riskId, setRiskId] = useState<number>();
  const [borrowId, setBorrowId] = useState<number>();
  const [verifyId, setVerifyId] = useState<number>();
  const [showReviewButton, setShowReviewButton] = useState<boolean>(true);
  const [reviewModalVisible, handleReviewModalVisible] = useState<boolean>(false);
  const [tabActiveKey, handleTabActiveKey] = useState<string>('urge');

  /** tabs */
  const [tabList, setTabList] = useState<
    (TabPaneProps & {
      key?: React.ReactText;
    })[]
  >([
    {
      key: 'urge',
      tab: '催收',
    },
    {
      key: 'verify',
      tab: '认证',
    },
    {
      key: 'profile',
      tab: '画像',
    },
    {
      key: 'risk',
      tab: '风控',
    },
    {
      key: 'sms',
      tab: '短信',
    },
    {
      key: 'contact',
      tab: '通讯录',
    },
    {
      key: 'app',
      tab: 'App',
    },
    {
      key: 'device',
      tab: '设备',
    },
    {
      key: 'borrow',
      tab: '借贷分析',
    },
    {
      key: 'relation',
      tab: '关系网络',
    },
    {
      key: 'borrow-history',
      tab: '历史借贷',
    },
    {
      key: 'borrow-log',
      tab: '操作日志',
    },
    {
      key: 'send-log',
      tab: '发送日志',
    },
    {
      key: 'repay-log',
      tab: '还款日志',
    },
  ]);

  /** 获取tab */
  const _getTab = async () => {
    return;
    // @ts-ignore
    const res = await getTab({ foo: null });
    tabList.forEach((value) => {
      const tabCount = res.data?.find((item: API.CommonTab) => item.key === value.key)?.tab_count;

      if (tabCount !== undefined && tabCount > 0) {
        value.tab = (
          <div>
            {value.tab}
            <span style={{ color: 'red' }}>{tabCount > 0 ? ' ' + tabCount : ''}</span>
          </div>
        );
      }
    });
    setTabList(tabList);
  };

  useEffect(() => {
    const _show = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await show({ id: params.id });
      setOldRecord(res.data);
      setOther(res.other);
      setUserId(res.data!.a_user_id);
      setBorrowId(res.data!.id);
      setVerifyId(res.data!.c_verify_id);
      setRiskId(res.data!.a_a_a_a_a_g_verify!.c_risk_id);
      return {
        data: res.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: res.success,
      };
    };
    _show().then((_data) => {
      if (_data.data!.k_sub_status === 3040 || _data.data!.j_status === 40) {
        _getTab().then(() =>
          history.push(
            `/borrow/detail/${_data.data!.id}/risk/${_data.data!.a_a_a_a_a_g_verify!.c_risk_id}`,
          ),
        );
        handleTabActiveKey('risk');
      } else {
        _getTab().then(() =>
          history.push(`/borrow/detail/${_data.data!.id}/urge/${_data.data!.id}`),
        );
        handleTabActiveKey('urge');
      }
    });
    // _getTab().then(() => history.push(`/borrow/detail/10/verify`));
    return () => {};
  }, []);

  const _handleTabChange = (key: string) => {
    let url = '';
    if (['urge', 'borrow-log', 'send-log', 'repay-log'].find((item) => item === key)) {
      url = `/borrow/detail/${borrowId}/${key}/${borrowId}`;
    } else if (
      ['profile', 'sms', 'contact', 'app', 'device', 'borrow', 'relation'].find(
        (item) => item === key,
      )
    ) {
      url = `/borrow/detail/${borrowId}/${key}/${userId}`;
    } else if (['verify'].find((item) => item === key)) {
      url = `/borrow/detail/${borrowId}/${key}/${verifyId}`;
    } else if (['risk'].find((item) => item === key)) {
      url = `/borrow/detail/${borrowId}/${key}/${riskId}`;
    }
    handleTabActiveKey(key);
    console.log(url);
    history.push(`${url}`);
  };

  const items: MenuProps['items'] = [
    { label: '展期', key: 'item-1', icon: <FileTextOutlined /> },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'/admin/v1/aLAdminFiles_templete/black_info_list.xlsx'}
        >
          减免
        </a>
      ),
      key: 'item-2',
      icon: <DownloadOutlined />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'/admin/v1/aLAdminFiles_templete/black_info_list.xlsx'}
        >
          平账
        </a>
      ),
      key: 'item-2',
      icon: <DownloadOutlined />,
    },
  ];
  const items2: MenuProps['items'] = [
    { label: '展期', key: 'item-1', icon: <FileTextOutlined /> },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'/admin/v1/aLAdminFiles_templete/black_info_list.xlsx'}
        >
          减免
        </a>
      ),
      key: 'item-2',
      icon: <DownloadOutlined />,
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'/admin/v1/aLAdminFiles_templete/black_info_list.xlsx'}
        >
          平账
        </a>
      ),
      key: 'item-2',
      icon: <DownloadOutlined />,
    },
  ];
  const action = (
    <RouteContext.Consumer>
      {({ isMobile }) => {
        if (isMobile) {
          return (
            <Fragment>
              <ButtonGroup>
                <Button key="sms">发送短信</Button>
                <Button key="black">拉黑</Button>
                {oldRecord?.a_a_a_a_a_g_verify?.f_status === VERIFY_STATUS_MAP.OVERVIEW &&
                showReviewButton ? (
                  <Button key="review" onClick={() => handleReviewModalVisible(true)}>
                    审核
                  </Button>
                ) : null}
                {oldRecord?.a_a_a_a_a_g_verify?.e_risk_result === VERIFY_STATUS_MAP.OVERVIEW &&
                (oldRecord?.a_a_a_a_a_g_verify?.f_status !== VERIFY_STATUS_MAP.OVERVIEW ||
                  !showReviewButton) ? (
                  <Button key="review-record" onClick={() => handleReviewModalVisible(true)}>
                    审核记录
                  </Button>
                ) : null}
                <Button key="link">还款链接</Button>
                <Button
                  key="show"
                  onClick={() => {
                    if (display === 'table-cell') {
                      setDisplay('none');
                    } else {
                      setDisplay('table-cell');
                    }
                  }}
                >
                  {display === 'table-cell' ? '隐藏' : '展示'}
                </Button>
                <Dropdown key="dropdown" trigger={['click']} menu={{ items }}>
                  <Button key="4" style={{ padding: '0 8px' }}>
                    <EllipsisOutlined />
                  </Button>
                </Dropdown>
              </ButtonGroup>
              <Button type="primary">主操作</Button>
            </Fragment>
          );
        }
        return (
          <Fragment>
            <ButtonGroup>
              <Button key="sms">发送短信</Button>
              <Button key="black">拉黑</Button>
              {oldRecord?.a_a_a_a_a_g_verify?.f_status === VERIFY_STATUS_MAP.OVERVIEW &&
              showReviewButton ? (
                <Button key="review" onClick={() => handleReviewModalVisible(true)}>
                  审核
                </Button>
              ) : null}
              {oldRecord?.a_a_a_a_a_g_verify?.e_risk_result === VERIFY_STATUS_MAP.OVERVIEW &&
              (oldRecord?.a_a_a_a_a_g_verify?.f_status !== VERIFY_STATUS_MAP.OVERVIEW ||
                !showReviewButton) ? (
                <Button key="review-record" onClick={() => handleReviewModalVisible(true)}>
                  审核记录
                </Button>
              ) : null}
              <Button key="link">还款链接</Button>
              <Button
                key="show"
                onClick={() => {
                  if (display === 'table-cell') {
                    setDisplay('none');
                  } else {
                    setDisplay('table-cell');
                  }
                }}
              >
                {display === 'table-cell' ? '隐藏' : '展示'}
              </Button>
              <Dropdown key="dropdown" trigger={['click']} menu={{ items: items2 }}>
                <Button key="4" style={{ padding: '0 8px' }}>
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </ButtonGroup>
            <Button type="primary">主操作</Button>
          </Fragment>
        );
      }}
    </RouteContext.Consumer>
  );

  const description = other?.a_user ? (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions
          className={styles.headerList}
          size="small"
          column={isMobile ? 1 : { xs: 1, sm: 1, md: 4, xl: 4 }}
        >
          <Descriptions.Item style={{ display: display }} label="注册渠道">
            {other?.a_user?.l_channel_id}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="签约时间">
            {moment(other?.a_user?.created_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="借款产品">
            {oldRecord?.d_product_id}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="最后活跃">
            {other?.a_user?.a_m_access_time}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="决策集">
            $60.00
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="风控结果">
            $60.00
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="风控分数">
            $60.00
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="催记数量">
            $60.00
          </Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  ) : (
    <Skeleton />
  );
  const extra = (
    <div className={styles.moreInfo}>
      <Statistic
        title="状态"
        value={oldRecord ? BORROW_STATUS_ENUM[oldRecord!.j_status!].text : ''}
        valueStyle={
          oldRecord && oldRecord!.j_status === BORROW_STATUS_MAP.OVERDUE ? { color: '#cf1322' } : {}
        }
        suffix={
          oldRecord && oldRecord!.j_status === BORROW_STATUS_MAP.OVERDUE
            ? oldRecord.a_i_overdue_days + 'Days'
            : ''
        }
      />
      <Statistic title="订单金额" value={568.08} prefix="¥" />
    </div>
  );

  return (
    <AliveScope>
      <PageContainer
        title={
          oldRecord
            ? ['单号：', oldRecord?.h_sn, '(', oldRecord?.l_borrow_count, ')'].join('')
            : '单号：'
        }
        extra={action}
        className={styles.pageHeader}
        content={description}
        extraContent={extra}
        tabActiveKey={tabActiveKey}
        onTabChange={_handleTabChange}
        tabList={tabList}
      >
        {/*{props.children}*/}
        <KeepAlive
          when={true}
          name={location.pathname}
          id={location.pathname}
          saveScrollPosition="screen"
        >
          <Outlet />
        </KeepAlive>
        <ReviewForm
          onSubmit={async (success) => {
            if (success) {
              handleReviewModalVisible(false);
              setShowReviewButton(false);
            }
          }}
          onCancel={() => {
            handleReviewModalVisible(false);
          }}
          borrowId={borrowId}
          modalVisible={reviewModalVisible}
          showReviewRecord={!showReviewButton}
          verifyId={verifyId}
        />
      </PageContainer>
    </AliveScope>
  );
};

export default Advanced;

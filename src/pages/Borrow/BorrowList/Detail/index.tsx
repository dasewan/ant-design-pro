import { DownloadOutlined, EllipsisOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { TabPaneProps } from 'antd';
import { Button, Descriptions, Dropdown, Menu, Skeleton, Statistic } from 'antd';
import type { FC } from 'react';
import React, { Fragment, useEffect, useState } from 'react';

import ReviewForm from '@/pages/Borrow/BorrowList/components/ReviewForm';
import { BORROW_STATUS_ENUM, BORROW_STATUS_MAP, VERIFY_STATUS_MAP } from '@/pages/enums';
import {
  getAdminV1DBorrowsId as show,
  getAdminV1DBorrowTab as getTab,
} from '@/services/ant-design-pro/DBorrow';
import moment from 'moment';
import { CacheRoute, CacheSwitch } from 'react-router-cache-route';
import { history, useParams } from 'umi';
import styles from '../style.less';
import type { TableListItem } from './data.d';

const ButtonGroup = Button.Group;

type RBlackProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const Advanced: FC<RBlackProps> = (props) => {
  const { match } = props;
  const params = useParams<{ id: string }>();
  const [display, setDisplay] = useState<string>('table-cell');
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  const [other, setOther] = useState<API.BorrowDetail>();
  const [userId, setUserId] = useState<number>();
  const [borrowId, setBorrowId] = useState<number>();
  const [verifyId, setVerifyId] = useState<number>();
  const [showReviewButton, setShowReviewButton] = useState<boolean>(true);
  const [reviewModalVisible, handleReviewModalVisible] = useState<boolean>(false);

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
    // @ts-ignore
    const res = await getTab({ foo: null });
    tabList.forEach((value) => {
      const tabCount = res.data?.find((item: API.CommonTab) => item.key == value.key)?.tab_count;

      if (tabCount != undefined && tabCount > 0) {
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
      return {
        data: res.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: res.success,
      };
    };
    // _show();
    _show().then((_data) =>
      _getTab().then(() => history.push(`/borrow/detail/${_data.data!.id}/urge/${_data.data!.id}`)),
    );
    // _getTab().then(() => history.push(`/borrow/detail/10/verify`));
    return () => {};
  }, []);

  const _handleTabChange = (key: string) => {
    let url = match.url === '/' ? '' : match.url;
    console.log(url);
    console.log(key);
    if (['urge', 'risk', 'borrow-log', 'send-log', 'repay-log'].find((item) => item == key)) {
      url = url + '/' + key + '/' + borrowId;
    } else if (
      ['profile', 'sms', 'contact', 'app', 'device', 'borrow', 'relation'].find(
        (item) => item == key,
      )
    ) {
      url = url + '/' + key + '/' + userId;
    } else if (['verify'].find((item) => item == key)) {
      url = url + '/' + key + '/' + verifyId;
    }
    console.log(`${url}`);

    history.push(`${url}`);
  };

  const _getTabKey = () => {
    const { location } = props;
    location.pathname.split('/').pop();
    const tabKey = location.pathname.split('/').splice(-2, 1)[0];
    console.log(tabKey);

    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'urge';
  };

  const action = (
    <RouteContext.Consumer>
      {({ isMobile }) => {
        if (isMobile) {
          return (
            <Fragment>
              <ButtonGroup>
                <Button key="sms">发送短信</Button>
                <Button key="black">拉黑</Button>
                {oldRecord?.a_a_a_a_a_g_verify?.f_status == VERIFY_STATUS_MAP.OVERVIEW &&
                showReviewButton ? (
                  <Button key="review" onClick={() => handleReviewModalVisible(true)}>
                    审核
                  </Button>
                ) : null}
                {oldRecord?.a_a_a_a_a_g_verify?.e_risk_result == VERIFY_STATUS_MAP.OVERVIEW &&
                (oldRecord?.a_a_a_a_a_g_verify?.f_status != VERIFY_STATUS_MAP.OVERVIEW ||
                  !showReviewButton) ? (
                  <Button key="review-record" onClick={() => handleReviewModalVisible(true)}>
                    审核记录
                  </Button>
                ) : null}
                <Button key="link">还款链接</Button>
                <Button
                  key="show"
                  onClick={() => {
                    if (display == 'table-cell') {
                      setDisplay('none');
                    } else {
                      setDisplay('table-cell');
                    }
                  }}
                >
                  {display == 'table-cell' ? '隐藏' : '展示'}
                </Button>
                <Dropdown
                  key="dropdown"
                  trigger={['click']}
                  overlay={
                    <Menu
                      items={[
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
                      ]}
                    />
                  }
                >
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
              {oldRecord?.a_a_a_a_a_g_verify?.f_status == VERIFY_STATUS_MAP.OVERVIEW &&
              showReviewButton ? (
                <Button key="review" onClick={() => handleReviewModalVisible(true)}>
                  审核
                </Button>
              ) : null}
              {oldRecord?.a_a_a_a_a_g_verify?.e_risk_result == VERIFY_STATUS_MAP.OVERVIEW &&
              (oldRecord?.a_a_a_a_a_g_verify?.f_status != VERIFY_STATUS_MAP.OVERVIEW ||
                !showReviewButton) ? (
                <Button key="review-record" onClick={() => handleReviewModalVisible(true)}>
                  审核记录
                </Button>
              ) : null}
              <Button key="link">还款链接</Button>
              <Button
                key="show"
                onClick={() => {
                  if (display == 'table-cell') {
                    setDisplay('none');
                  } else {
                    setDisplay('table-cell');
                  }
                }}
              >
                {display == 'table-cell' ? '隐藏' : '展示'}
              </Button>
              <Dropdown
                key="dropdown"
                trigger={['click']}
                overlay={
                  <Menu
                    items={[
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
                    ]}
                  />
                }
              >
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
          oldRecord && oldRecord!.j_status == BORROW_STATUS_MAP.OVERDUE ? { color: '#cf1322' } : {}
        }
        suffix={
          oldRecord && oldRecord!.j_status == BORROW_STATUS_MAP.OVERDUE
            ? oldRecord.a_i_overdue_days + 'Days'
            : ''
        }
      />
      <Statistic title="订单金额" value={568.08} prefix="¥" />
    </div>
  );

  return (
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
      tabActiveKey={_getTabKey()}
      onTabChange={_handleTabChange}
      tabList={tabList}
    >
      {/*{props.children}*/}
      <CacheSwitch>
        <CacheRoute path={'/borrow/detail/' + params.id + '/urge/' + borrowId}>
          {props.children}
        </CacheRoute>
        <CacheRoute path={'/borrow/detail/' + params.id + '/verify/' + verifyId}>
          {props.children}
        </CacheRoute>
        <CacheRoute path={'/borrow/detail/' + params.id + '/sms/' + userId}>
          {props.children}
        </CacheRoute>
        <CacheRoute path={'/borrow/detail/' + params.id + '/app/' + userId}>
          {props.children}
        </CacheRoute>
        <CacheRoute path={'/borrow/detail/' + params.id + '/contact/' + userId}>
          {props.children}
        </CacheRoute>
        <CacheRoute path="/user-manager/black-info-list/id-number2">{props.children}</CacheRoute>
        <CacheRoute path="/user-manager/black-info-list/bank-card">{props.children}</CacheRoute>
        <CacheRoute path="/user-manager/black-info-list/imei">{props.children}</CacheRoute>
        <CacheRoute path="/user-manager/black-info-list/device">{props.children}</CacheRoute>
      </CacheSwitch>
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
  );
};

export default Advanced;

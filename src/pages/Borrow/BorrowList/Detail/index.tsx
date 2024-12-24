import { DownloadOutlined, EllipsisOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { TabPaneProps } from 'antd';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Dropdown,
  MenuProps,
  Row,
  Skeleton,
  Statistic,
  Tag,
  Badge,
} from 'antd';
import type { FC } from 'react';
import React, { Fragment, useEffect, useState } from 'react';

import ReviewForm from '@/pages/Borrow/BorrowList/components/ReviewForm';
import {
  BORROW_STATUS_ENUM,
  BORROW_STATUS_MAP,
  RISK_STATUS_OPTION,
  VERIFY_STATUS_MAP,
} from '@/pages/enums';
import { getAdminV1DBorrowsProfileId as show } from '@/services/ant-design-pro/DBorrow';
import { Outlet } from '@@/exports';
import {
  AlertOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FieldNumberOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
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
  const [userId, setUserId] = useState<number>();
  const [riskResultId, setRiskResultId] = useState<number>();
  const [borrowId, setBorrowId] = useState<number>();
  const [verifyId, setVerifyId] = useState<number>();
  const [showReviewButton, setShowReviewButton] = useState<boolean>(true);
  const [reviewModalVisible, handleReviewModalVisible] = useState<boolean>(false);
  const [tabActiveKey, handleTabActiveKey] = useState<string>('urge');
  const statusIcons: { [key: number]: React.ReactNode } = {
    3010: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<ClockCircleOutlined />}
        color="default"
      >
        待机审
      </Tag>
    ),
    3020: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<SyncOutlined spin />}
        color="processing"
      >
        机审中
      </Tag>
    ),
    3030: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CloseCircleOutlined />}
        color="warning"
      >
        机审拒绝
      </Tag>
    ),
    3040: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<SyncOutlined spin />}
        color="default"
      >
        待人审
      </Tag>
    ),
    3050: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        机审通过
      </Tag>
    ),
    4010: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<SyncOutlined spin />}
        color="processing"
      >
        待人审
      </Tag>
    ),
    4020: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<SyncOutlined spin />}
        color="processing"
      >
        人审中
      </Tag>
    ),
    4040: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CloseCircleOutlined />}
        color="warning"
      >
        人审拒绝
      </Tag>
    ),
    4050: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<ClockCircleOutlined />}
        color="success"
      >
        人审通过
      </Tag>
    ),
    5010: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<SyncOutlined spin />}
        color="processing"
      >
        放款队列中
      </Tag>
    ),
    5020: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<SyncOutlined spin />}
        color="processing"
      >
        放款中
      </Tag>
    ),
    5030: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<ClockCircleOutlined />}
        color="processing"
      >
        放款未知
      </Tag>
    ),
    5040: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CloseCircleOutlined />}
        color="warning"
      >
        放款失败
      </Tag>
    ),
    5050: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        放款成功
      </Tag>
    ),
    5060: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CloseCircleOutlined />}
        color="error"
      >
        放款拦截
      </Tag>
    ),

    6010: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<SyncOutlined spin />}
        color="processing"
      >
        待还款
      </Tag>
    ),
    6020: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<SyncOutlined spin />}
        color="processing"
      >
        还款支付中
      </Tag>
    ),
    6040: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CloseCircleOutlined />}
        color="warning"
      >
        还款失败
      </Tag>
    ),
    6050: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        还款成功
      </Tag>
    ),

    8010: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        提前结清
      </Tag>
    ),
    8020: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        还款日结清
      </Tag>
    ),
    8030: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        逾后结清
      </Tag>
    ),
    8040: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        严重逾后结清
      </Tag>
    ),
    8050: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        减免结清
      </Tag>
    ),
    8060: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        平账结清
      </Tag>
    ),
    8070: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<CheckCircleOutlined />}
        color="success"
      >
        核销结清
      </Tag>
    ),
    9010: (
      <Tag style={{ fontSize: '18px', padding: '6px 10px' }} icon={<AlertOutlined />} color="error">
        轻微逾期
      </Tag>
    ),
    9020: (
      <Tag style={{ fontSize: '18px', padding: '6px 10px' }} icon={<AlertOutlined />} color="error">
        中等逾期
      </Tag>
    ),
    9030: (
      <Tag style={{ fontSize: '18px', padding: '6px 10px' }} icon={<AlertOutlined />} color="error">
        严重逾期
      </Tag>
    ),
    10010: (
      <Tag
        style={{ fontSize: '18px', padding: '6px 10px' }}
        icon={<MinusCircleOutlined />}
        color="processing"
      >
        关闭
      </Tag>
    ),
  };
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

  useEffect(() => {
    const _show = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await show({ id: params.id });
      setOldRecord(res.data);
      setUserId(res.data!.a_user_id);
      setBorrowId(res.data!.id);
      setVerifyId(res.data!.c_verify_id);
      setRiskResultId(res.data!.f_risk_result_id);
      tabList.forEach((value) => {
        switch (value.key) {
          case 'urge':
            value.tab = (
              <div>
                {value.tab}
                <span style={{ color: 'red', fontSize: 12 }}> {res.data!.a_v_urge_log_count!}</span>
              </div>
            );
            break;
          case 'risk':
            value.tab = (
              <div>
                {value.tab}
                <span style={{ color: 'red', fontSize: 12 }}> {res.data!.a_a_risk_score}</span>
              </div>
            );
            break;
          case 'sms':
            value.tab = (
              <div>
                {value.tab}
                {/*<span style={{color: 'red', fontSize: 12}}> {res.data!!}</span>*/}
              </div>
            );
            break;
          case 'contact':
            value.tab = (
              <div>
                {value.tab}
                <span style={{ color: 'red', fontSize: 12 }}> {res.data!.a_v_urge_log_count!}</span>
              </div>
            );
            break;
          case 'app':
            value.tab = (
              <div>
                {value.tab}
                <span style={{ color: 'red', fontSize: 12 }}> {res.data!.a_v_urge_log_count!}</span>
              </div>
            );
            break;
          case 'borrow':
            value.tab = (
              <div>
                {value.tab}
                <span style={{ color: 'red', fontSize: 12 }}> {res.data!.a_v_urge_log_count!}</span>
              </div>
            );
            break;
          case 'relation':
            value.tab = (
              <div>
                {value.tab}
                <span style={{ color: 'red', fontSize: 12 }}> {res.data!.a_v_urge_log_count!}</span>
              </div>
            );
            break;
          case 'borrow-history':
            value.tab = (
              <div>
                {value.tab}
                <span style={{ color: 'red', fontSize: 12 }}> {res.data!.a_v_urge_log_count!}</span>
              </div>
            );
            break;
          case 'borrow-log':
            value.tab = (
              <div>
                {value.tab}
                <span style={{ color: 'red', fontSize: 12 }}> {res.data!.a_v_urge_log_count!}</span>
              </div>
            );
            break;
          case 'send-log':
            value.tab = (
              <div>
                {value.tab}
                <span style={{ color: 'red', fontSize: 12 }}> {res.data!.a_v_urge_log_count!}</span>
              </div>
            );
            break;
        }
      });
      setTabList(tabList);

      return {
        data: res.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: res.success,
      };
    };
    _show().then((_data) => {
      if (_data.data!.k_sub_status === 3040 || _data.data!.j_status === 40) {
        history.push(
          `/borrow/detail/${_data.data!.id}/risk/${
            _data.data!.a_a_a_a_a_b_m_borrow_risk_result!.id
          }`,
        );
        handleTabActiveKey('risk');
      } else {
        history.push(`/borrow/detail/${_data.data!.id}/urge/${_data.data!.id}`);
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
      url = `/borrow/detail/${borrowId}/${key}/${riskResultId}`;
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
                {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result ===
                  VERIFY_STATUS_MAP.OVERVIEW && showReviewButton ? (
                  <Button key="review" onClick={() => handleReviewModalVisible(true)}>
                    审核
                  </Button>
                ) : null}
                {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result ===
                  VERIFY_STATUS_MAP.OVERVIEW &&
                ((oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result !== undefined &&
                  oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result >
                    VERIFY_STATUS_MAP.OVERVIEW) ||
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
              {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result ===
                VERIFY_STATUS_MAP.OVERVIEW && showReviewButton ? (
                <Button key="review" onClick={() => handleReviewModalVisible(true)}>
                  审核
                </Button>
              ) : null}
              {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result ===
                VERIFY_STATUS_MAP.OVERVIEW &&
              ((oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result !== undefined &&
                oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result >
                  VERIFY_STATUS_MAP.OVERVIEW) ||
                !showReviewButton) ? (
                <Button key="review-record" onClick={() => handleReviewModalVisible(true)}>
                  审核记录
                </Button>
              ) : null}
              <Button key="link">还款链接</Button>
              <Dropdown key="dropdown" trigger={['click']} menu={{ items: items2 }}>
                <Button key="4" style={{ padding: '0 8px' }}>
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </ButtonGroup>
          </Fragment>
        );
      }}
    </RouteContext.Consumer>
  );

  // @ts-ignore
  // @ts-ignore
  const description = oldRecord?.id ? (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions
          className={styles.headerList}
          size="small"
          column={isMobile ? 1 : { xs: 1, sm: 2, md: 3, lg: 3, xl: 5, xxl: 5 }}
        >
          <Descriptions.Item style={{ display: display }} label="产品">
            {oldRecord?.a_a_a_a_a_h_product_snapshot?.b_name}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="借款金额">
            {oldRecord?.m_borrow_amount}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="借款期数">
            {oldRecord?.a_p_period_count}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="借款期限">
            {oldRecord?.a_n_days}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="最后活跃时间">
            {moment(oldRecord?.a_a_a_a_a_a_a_user?.a_m_access_time).format('YYYY-MM-DD HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="风控策略">
            {oldRecord?.a_a_a_a_a_g_g_risk_stratey?.a_name}(
            {oldRecord?.a_a_a_a_a_g_g_risk_stratey?.f_version})
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="风控结果">
            {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result !== undefined && oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result === 30 ? <Badge status="default" /> : null}
            {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result !== undefined && oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result === 40 ? <Badge status="error" /> : null}
            {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result !== undefined && oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result === 50 ? <Badge status="success" /> : null}
            &nbsp;
            {
              RISK_STATUS_OPTION.find(
                (item) =>
                  item.value === oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.k_machine_result,
              )?.label
            }
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="风控分数">
            {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.m_score}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="人审结果">
            {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result !== undefined && oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result === 30 ? <Badge status="default" /> : null}
            {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result !== undefined && oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result === 40 ? <Badge status="error" /> : null}
            {oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result !== undefined && oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result === 50 ? <Badge status="success" /> : null}
            &nbsp;
            {
              RISK_STATUS_OPTION.find(
                (item) =>
                  item.value === oldRecord?.a_a_a_a_a_b_m_borrow_risk_result?.l_review_result,
              )?.label
            }
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="名单类型">
            {oldRecord?.a_a_a_a_a_n_user_profile?.b_white_id !== undefined &&
            oldRecord?.a_a_a_a_a_n_user_profile?.b_white_id > 0
              ? <span style={{color: "green"}}>白名单&nbsp;&nbsp; </span>
              : ''}
            {oldRecord?.a_a_a_a_a_n_user_profile?.c_black_phone_id !== undefined &&
            (oldRecord?.a_a_a_a_a_n_user_profile?.c_black_phone_id > 0 ||
              oldRecord!.a_a_a_a_a_n_user_profile!.d_black_id_number_id! > 0 ||
              oldRecord!.a_a_a_a_a_n_user_profile!.e_black_bank_card_id! > 0 ||
              oldRecord!.a_a_a_a_a_n_user_profile!.f_black_imei_id! > 0 ||
              oldRecord!.a_a_a_a_a_n_user_profile!.f_black_imei_id! > 0)
              ? <span style={{color: "red", fontWeight: 550}}>黑名单&nbsp;&nbsp; </span>
              : ''}
            {oldRecord?.a_a_a_a_a_n_user_profile?.h_grey_id !== undefined &&
            oldRecord?.a_a_a_a_a_n_user_profile?.h_grey_id !== '0'
              ? <span style={{color: "darkred"}}>灰名单&nbsp;&nbsp;</span>
              : ''}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="放款时间">
            {moment(oldRecord?.o_loan_time).format('YYYY-MM-DD HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="放款金额">
            {oldRecord?.p_loan_amount}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="已还金额">
            {oldRecord?.s_amount_paid}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="订单损益">
            {oldRecord?.w_loss_amount}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="用户损益">
            {oldRecord?.a_a_a_a_a_a_a_user?.a_j_loss}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="逾期天数">
            {oldRecord?.a_h_total_overdue_days !== undefined && oldRecord?.a_h_total_overdue_days > 0 ?
              <span style={{color: "red", fontWeight: 550}}>{oldRecord?.a_h_total_overdue_days} </span> : oldRecord?.a_h_total_overdue_days}
          </Descriptions.Item>
          <Descriptions.Item style={{ display: display }} label="减免次数">
            {oldRecord?.a_d_reduce_times}
          </Descriptions.Item>

        </Descriptions>
      )}
    </RouteContext.Consumer>
  ) : (
    <Skeleton />
  );
  const extra = (
    <div className={styles.moreInfo}>
      <Card>
        <Card.Grid style={{ width: '33%', textAlign: 'center' }}>
          <Statistic
            title="状态"
            value={oldRecord ? BORROW_STATUS_ENUM[oldRecord!.j_status!].text : ''}
            valueStyle={
              oldRecord && oldRecord!.j_status === BORROW_STATUS_MAP.OVERDUE
                ? { color: '#cf1322' }
                : {}
            }
            suffix={
              oldRecord && oldRecord!.j_status === BORROW_STATUS_MAP.OVERDUE
                ? oldRecord.a_i_overdue_days + 'Days'
                : ''
            }
          />
        </Card.Grid>
        <Card.Grid style={{ width: '33%', textAlign: 'center' }}>
          <Statistic title="应还金额" value={oldRecord?.r_amount_due} prefix="¥" />
        </Card.Grid>
        <Card.Grid style={{ width: '33%', textAlign: 'center' }}>
          <Statistic title="还款日" value={oldRecord?.q_expect_repay_time} prefix="¥" />
        </Card.Grid>
      </Card>
    </div>
  );

  return (
    <AliveScope>
      <PageContainer
        title={
          oldRecord ? (
            <Row style={{ width: 1200 }}>
              <Col>{statusIcons[oldRecord!.k_sub_status!]}</Col>
              <Col>
                <Tag
                  style={{ fontSize: '18px', padding: '6px 10px' }}
                  icon={<ClockCircleOutlined style={{ color: '#43bcba' }} />}
                  bordered={false}
                >
                  {moment(oldRecord?.q_expect_repay_time).format('YYYY-MM-DD')}
                </Tag>
              </Col>
              <Col>
                <Tag
                  style={{ fontSize: '18px', padding: '6px 10px' }}
                  icon={<CalculatorOutlined style={{ color: '#43bcba' }} />}
                  bordered={false}
                >
                  {oldRecord?.v_amount_due}
                </Tag>
              </Col>
              <Col>
                <Tag
                  style={{ fontSize: '18px', padding: '6px 10px' }}
                  icon={<FieldNumberOutlined style={{ color: '#43bcba' }} />}
                  bordered={false}
                >
                  {oldRecord?.h_sn + ' (' + oldRecord?.l_borrow_count + ') ' + oldRecord?.a_k_phone}
                </Tag>
              </Col>
            </Row>
          ) : (
            ''
          )
        }
        extra={action}
        className={styles.pageHeader}
        content={description}
        // extraContent={extra}
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

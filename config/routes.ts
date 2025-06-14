﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'DashboardOutlined',
    component: './Welcome',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/analysis',
      },
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
      },
      {
        name: 'analysis2',
        icon: 'smile',
        path: '/dashboard/analysis2',
        component: './dashboard/analysis2',
      },
      {
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: 'user',
    icon: 'TeamOutlined',
    path: '/user-manager',
    // component: './AUser',
    routes: [
      {
        name: 'user',
        icon: 'smile',
        path: '/user-manager/user',
        component: './UserManager/AUser',
      },
      {
        name: 'white-info',
        icon: 'smile',
        path: '/user-manager/white-info',
        component: './UserManager/BAWhite',
      },
      {
        name: 'white',
        icon: 'smile',
        path: '/user-manager/white',
        component: './UserManager/BAWhiteUser',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'user',
            icon: 'smile',
            path: '/user-manager/white/user',
            component: './UserManager/BAWhiteUser/BAWhiteUser',
          },
          {
            name: 'user-with-overdue',
            icon: 'smile',
            path: '/user-manager/white/user-with-overdue',
            component: './UserManager/BAWhiteUser/BAWhiteUserWithOverdue',
          },
          {
            name: 'user-with-serious-overdue',
            icon: 'smile',
            path: '/user-manager/white/user-with-serious-overdue',
            component: './UserManager/BAWhiteUser/BAWhiteUserWithSeriousOverdue',
          },
        ],
      },
      {
        name: 'black-info-list',
        icon: 'smile',
        path: '/user-manager/black-info-list',
        component: './UserManager/RBlack',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'black-phone-list',
            icon: 'smile',
            path: '/user-manager/black-info-list/phone',
            component: './UserManager/RBlack/Phone', // hideInMenu:true,
          },
          {
            name: 'black-id-number-list',
            icon: 'smile',
            path: '/user-manager/black-info-list/id-number',
            component: './UserManager/RBlack/IdNumber', // hideInMenu:true,
          },
          {
            name: 'black-id-number2-list',
            icon: 'smile',
            path: '/user-manager/black-info-list/id-number2',
            component: './UserManager/RBlack/IdNumber2', // hideInMenu:true,
          },
          {
            name: 'black-bank-card-list',
            icon: 'smile',
            path: '/user-manager/black-info-list/bank-card',
            component: './UserManager/RBlack/BankCard', // hideInMenu:true,
          },
          {
            name: 'black-device-list',
            icon: 'smile',
            path: '/user-manager/black-info-list/device',
            component: './UserManager/RBlack/Device', // hideInMenu:true,
          },
          {
            name: 'black-imei-list',
            icon: 'smile',
            path: '/user-manager/black-info-list/imei',
            component: './UserManager/RBlack/Imei', // hideInMenu:true,
          },
        ],
      },
      /*{
        name: 'black-user-list',
        icon: 'smile',
        path: '/user-manager/black-user-list',
        component: './UserManager/AIBlackUser',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'black-user',
            icon: 'smile',
            path: '/user-manager/black-user-list/black-user',
            component: './UserManager/AIBlackUser/BlackUser',
          },
          {
            name: 'black-user-with-repay',
            icon: 'smile',
            path: '/user-manager/black-user-list/black-user-with-repay',
            component: './UserManager/AIBlackUser/BlackUserWithRepay',
          },
        ],
      },*/
      {
        name: 'black-user-list',
        icon: 'smile',
        path: '/user-manager/black-user-list/black-user',
        component: './UserManager/AIBlackUser/BlackUser',
      },
      {
        name: 'g-b-marketing',
        icon: 'smile',
        path: '/user-manager/g-b-marketing',
        component: './UserManager/GBMarketing',
      },
      {
        name: 'marketing-detail-list',
        icon: 'smile',
        path: '/user-manager/marketing-detail-list',
        component: './UserManager/GCMarketingDetail',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'marketing-success-user',
            icon: 'smile',
            path: '/user-manager/marketing-detail-list/marketing-success-user',
            component: './UserManager/GCMarketingDetail/MarketingSuccessUser',
          },
          {
            name: 'marketing-user-with-overdue',
            icon: 'smile',
            path: '/user-manager/marketing-detail-list/marketing-user-with-overdue',
            component: './UserManager/GCMarketingDetail/MarketingUserWithOverdue',
          },
          {
            name: 'marketing-list',
            icon: 'smile',
            path: '/user-manager/marketing-detail-list/marketing-list',
            component: './UserManager/GCMarketingDetail/MarketingList',
          },
        ],
      },
      {
        name: 'import-result-list',
        icon: 'smile',
        path: '/user-manager/import-result-list',
        component: './UserManager/BEImportResult',
      },
    ],
  },

  {
    name: 'borrow',
    icon: 'ContainerOutlined',
    path: '/borrow',
    routes: [
      {
        name: 'borrow-list',
        icon: 'smile',
        path: '/borrow/borrow-list',
        component: './Borrow/BorrowList',
      },
      {
        name: 'loaned-list',
        icon: 'smile',
        path: '/borrow/loan-list',
        component: './Borrow/LoanList',
      },
      /*{
        name: 'recently-list',
        icon: 'smile',
        path: '/borrow/outstanding-list',
        component: './Borrow/OutstandingList',
      },
      {
        name: 'overdue-list',
        icon: 'smile',
        path: '/borrow/outstanding-list',
        component: './Borrow/OutstandingList',
      },*/
      /*      {
              name: 'outstanding-list',
              icon: 'smile',
              path: '/borrow/outstanding-list',
              component: './Borrow/OutstandingList',
            },*/
      {
        name: 'verify-list',
        icon: 'smile',
        path: '/borrow/verify-list',
        component: './Borrow/VerifyList',
      },
      {
        name: 'verify-detail',
        icon: 'smile',
        path: '/borrow/verify/detail/:id',
        component: './Borrow/VerifyList/Detail',
        hideInMenu: true,
      },
      {
        name: 'borrow-detail',
        icon: 'smile',
        path: '/borrow/detail/:id',
        component: './Borrow/BorrowList/Detail',
        hideInMenu: true,
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'urge-detail',
            icon: 'smile',
            path: '/borrow/detail/:id/urge/:urgeId',
            component: './Borrow/BorrowList/components/UrgeDetail',
          },
          {
            name: 'verify-detail',
            icon: 'smile',
            path: '/borrow/detail/:id/verify/:verifyId',
            component: './Borrow/VerifyList/components/VerifyDetail',
          },
          {
            name: 'sms-detail',
            icon: 'smile',
            path: '/borrow/detail/:id/sms/:userId',
            component: './Borrow/BorrowList/components/SmsDetail',
          },
          {
            name: 'sms-detail',
            icon: 'smile',
            path: '/borrow/detail/:id/risk/:riskId',
            component: './Risk/RiskResult/components/DetailList',
          },
          {
            name: 'app-detail',
            icon: 'smile',
            path: '/borrow/detail/:id/app/:userId',
            component: './Borrow/BorrowList/components/AppDetail',
          },
          {
            name: 'contact-detail',
            icon: 'smile',
            path: '/borrow/detail/:id/contact/:userId',
            component: './Borrow/BorrowList/components/ContactDetail',
          },
          {
            name: 'contact-detail',
            icon: 'smile',
            path: '/borrow/detail/:id/device/:userId',
            component: './Borrow/BorrowList/components/DeviceDetail',
          },
        ],
      },
    ],
  },
  {
    name: 'review',
    icon: 'FileSearchOutlined',
    path: '/review',
    routes: [
      {
        name: 'review-group',
        icon: 'smile',
        path: '/review/review-group',
        component: './Review/ReviewGroup',
      },
      {
        name: 'review-admin',
        icon: 'smile',
        path: '/review/review-admin',
        component: './Review/ReviewAdmin',
      },
      {
        name: 'review-borrow',
        icon: 'smile',
        path: '/review/review-borrow',
        component: './Review/ReviewBorrow',
      },
      {
        name: 'review-borrow-accept',
        icon: 'smile',
        path: '/review/review-borrow-accept',
        component: './Review/ReviewBorrowAccept',
      },
      {
        name: 'review-borrow-reject',
        icon: 'smile',
        path: '/review/review-borrow-reject',
        component: './Review/ReviewBorrowReject',
      },
      {
        name: 'review-borrow-flow',
        icon: 'smile',
        path: '/review/review-borrow-flow',
        component: './Review/ReviewBorrowFlow',
      },
    ],
  },
  {
    name: 'loan',
    icon: 'BankOutlined',
    path: '/loan',
    routes: [
      {
        name: 'waiting-loan',
        icon: 'smile',
        path: '/loan/waiting-loan',
        component: './Loan/WaitingLoan',
      },
      {
        name: 'queue-loan',
        icon: 'smile',
        path: '/loan/queue-loan',
        component: './Loan/QueueLoan',
      },
      {
        name: 'loan-list',
        icon: 'smile',
        path: '/loan/loan-list',
        component: './Loan/LoanList',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'success-loan',
            icon: 'smile',
            path: '/loan/loan-list/success-loan',
            component: './Loan/LoanList/SuccessLoan',
          },
          {
            name: 'fail-loan',
            icon: 'smile',
            path: '/loan/loan-list/fail-loan',
            component: './Loan/LoanList/FailLoan',
          },
          {
            name: 'intercept-loan',
            icon: 'smile',
            path: '/loan/loan-list/intercept',
            component: './Loan/LoanList/InterceptLoan',
          },
          {
            name: 'processing-loan',
            icon: 'smile',
            path: '/loan/loan-list/processing',
            component: './Loan/LoanList/ProcessingLoan',
          },
          {
            name: 'unknown-loan',
            icon: 'smile',
            path: '/loan/loan-list/unknown',
            component: './Loan/LoanList/UnknownLoan',
          },
        ],
      },
      {
        name: 'loan-log',
        icon: 'smile',
        path: '/loan/log',
        component: './Loan/LoanLog',
      },
    ],
  },
  {
    name: 'repay',
    icon: 'CreditCardOutlined',
    path: '/repay',
    routes: [
      {
        name: 'repay-list',
        icon: 'smile',
        path: '/repay/list',
        component: './Repay/RepayList',
      },
      {
        name: 'repay-log',
        icon: 'smile',
        path: '/repay/log',
        component: './Repay/RepayLog',
      },
      {
        name: 'extend-list',
        icon: 'smile',
        path: '/repay/extend-list',
        component: './Repay/ExtendList',
      },
    ],
  },
  {
    name: 'telemarketing',
    icon: 'PhoneOutlined',
    path: '/telemarketing',
    routes: [
      {
        name: 'telemarketing-role',
        icon: 'smile',
        path: '/telemarketing/role',
        component: './Stay',
      },
      {
        name: 'telemarketing-admin-list',
        icon: 'smile',
        path: '/telemarketing/admin-list',
        component: './Stay',
      },
      {
        name: 'my-telemarketing',
        icon: 'smile',
        path: '/telemarketing/my-telemarketing',
        component: './Stay',
      },
      {
        name: 'telemarketing-order-flow-history',
        icon: 'smile',
        path: '/telemarketing/order-flow-history',
        component: './Stay',
      },

    ],
  },
  {
    name: 'collection',
    icon: 'CommentOutlined',
    path: '/collection',
    routes: [
      {
        name: 'collection-agency-list',
        icon: 'smile',
        path: '/collection/collection-agency-list',
        component: './Collection/CollectionAgency',
      },
      {
        name: 'collection-group-list',
        icon: 'smile',
        path: '/collection/collection-group-list',
        component: './Collection/CollectionGroup',
      },
      {
        name: 'collection-admin-list',
        icon: 'smile',
        path: '/collection/collection-admin-list',
        component: './Collection/CollectionAdmin',
      },
      {
        name: 'collection-role',
        icon: 'smile',
        path: '/collection/collection-role',
        component: './Collection/CollectionRole',
      },
      {
        name: 'my-collection',
        icon: 'smile',
        path: '/collection/my-collection',
        component: './Collection/MyCollection',
      },
      {
        name: 'collection-order-flow-history',
        icon: 'smile',
        path: '/collection/collection-order-flow-history',
        component: './Collection/CollectionOrderFlowHistory',
      },
      {
        name: 'collection-assign-log',
        icon: 'smile',
        path: '/collection/collection-assign-log',
        component: './Collection/CollectionAssignLog',
      },
      {
        name: 'collection-news',
        icon: 'smile',
        path: '/collection/collection-news',
        component: './Collection/CollectionNews',
      },
    ],
  },

  {
    name: 'risk',
    icon: 'AlertOutlined',
    path: '/risk',
    routes: [
      {
        name: 'risk-item-cat',
        icon: 'smile',
        path: '/risk/risk-item-cat',
        component: './Risk/RiskItemCat',
      },
      {
        name: 'risk-item',
        icon: 'smile',
        path: '/risk/risk-item',
        component: './Risk/RiskItem',
      },
      {
        name: 'risk-role-bundle',
        icon: 'smile',
        path: '/risk/risk-role-bundle',
        component: './Risk/RiskRoleBundle',
      },
      {
        name: 'risk-role-bundle-detail',
        icon: 'smile',
        path: '/risk/risk-role-bundle/detail/:id',
        component: './Risk/RiskRoleBundle/Detail',
        hideInMenu: true,
      },
      {
        name: 'risk-tag',
        icon: 'smile',
        path: '/risk/risk-tag',
        component: './Risk/RiskTag',
      },
      {
        name: 'risk-strategy-bundle',
        icon: 'smile',
        path: '/risk/risk-strategy-bundle',
        component: './Risk/RiskStrategyBundle',
      },
      {
        name: 'risk-strategy-bundle-detail',
        icon: 'smile',
        path: '/risk/risk-strategy-bundle/detail/:id',
        component: './Risk/RiskStrategyBundle/Detail',
        hideInMenu: true,
      },
      {
        name: 'risk-strategy-route',
        icon: 'smile',
        path: '/risk/risk-strategy-route',
        component: './Risk/RiskStrategyRoute',
      },
      {
        name: 'risk-result',
        icon: 'smile',
        path: '/risk/risk-result',
        component: './Risk/RiskResult',
      },
      {
        name: 'risk-back-tracking',
        icon: 'smile',
        path: '/risk/risk-back-tracking',
        component: './Stay',
      },
    ],
  },
  {
    name: 'operation',
    icon: 'ProductOutlined',
    path: '/operation',
    routes: [
      {
        name: 'product',
        icon: 'smile',
        path: '/operation/product',
        component: './Operation/BProduct',
        access: 'normalRouteFilter',
      },
      {
        name: 'product-detail',
        icon: 'smile',
        path: '/operation/product/detail/:id',
        component: './Operation/BProduct/Detail',
        hideInMenu: true,
      },
      {
        name: 'channel',
        icon: 'smile',
        path: '/operation/channel',
        component: './Operation/Channel',
        access: 'normalRouteFilter',
      },
      {
        name: 'payment-channel',
        icon: 'smile',
        path: '/operation/payment-channel',
        component: './Operation/PaymentChannel',
        access: 'normalRouteFilter',
      },
      {
        name: 'kyc',
        icon: 'smile',
        path: '/operation/kyc',
        component: './Operation/Kyc',
        access: 'normalRouteFilter',
      },
      {
        name: 'credit',
        icon: 'smile',
        path: '/operation/credit',
        component: './Operation/Credit',
        access: 'normalRouteFilter',
      },
      {
        name: 'sms',
        icon: 'smile',
        path: '/operation/sms',
        routes: [
          {
            name: 'template',
            icon: 'smile',
            path: '/operation/sms/template',
            component: './Operation/Sms/Template',
            access: 'normalRouteFilter',
          },
          {
            name: 'custom',
            icon: 'smile',
            path: '/operation/sms/custom',
            component: './Operation/Sms/Custom',
            access: 'normalRouteFilter',
          },
        ],
      },
      {
        name: 'app',
        icon: 'smile',
        path: '/operation/app',
        routes: [
          {
            name: 'push',
            icon: 'smile',
            path: '/operation/app/push',
            component: './Stay',
          },
          {
            name: 'news',
            icon: 'smile',
            path: '/operation/app/news',
            component: './Stay',
          },
          {
            name: 'banner',
            icon: 'smile',
            path: '/operation/app/banner',
            component: './Stay',
          },
          {
            name: 'service',
            icon: 'smile',
            path: '/operation/app/service',
            component: './Stay',
          },
          {
            name: 'node',
            icon: 'smile',
            path: '/operation/app/node',
            component: './Stay',
          },
          {
            name: 'point',
            icon: 'smile',
            path: '/operation/app/point',
            component: './Stay',
          },
          {
            name: 'update',
            icon: 'smile',
            path: '/operation/app/update',
            component: './Stay',
          },
          {
            name: 'agreement',
            icon: 'smile',
            path: '/operation/app/agreement',
            component: './Stay',
          },
        ],
      },
      {
        name: 'market',
        icon: 'smile',
        path: '/operation/market',
        routes: [
          {
            name: 'competitors-list',
            icon: 'smile',
            path: '/operation/market/competitors-list',
            component: './Stay',
          },
          {
            name: 'competitors',
            icon: 'smile',
            path: '/operation/market/competitors',
            component: './Stay',
          },
          {
            name: 'trend',
            icon: 'smile',
            path: '/operation/market/trend',
            component: './Stay',
          },
        ],
      },
      {
        name: 'feedback',
        icon: 'smile',
        path: '/operation/feedback',
        component: './Stay',
      },
      {
        name: 'loss',
        icon: 'smile',
        path: '/operation/loss',
        component: './Stay',
      },
    ],
  },
  {
    name: 'statistics',
    icon: 'FundOutlined',
    path: '/statistics',
    routes: [
      {
        name: 'register',
        icon: 'smile',
        path: '/statistics/register',
        routes: [
          {
            name: 'marketing',
            icon: 'smile',
            path: '/statistics/register/marketing',
            component: './Statistics/Register/Marketing',
          },
          {
            name: 'daily-report',
            icon: 'smile',
            path: '/statistics/register/daily-report',
            component: './Statistics/Register/DailyReport',
          },
        ],
      },
      {
        name: 'overdue',
        icon: 'smile',
        path: '/statistics/overdue',
        routes: [
          {
            name: 'product',
            icon: 'smile',
            path: '/statistics/overdue/product',
            component: './Statistics/Overdue/Product',
          },
          {
            name: 'multi-dimension',
            icon: 'smile',
            path: '/statistics/overdue/multi-dimension',
            component: './Statistics/Overdue/MultiDimension',
          },
        ],
      },
      {
        name: 'loan-overdue',
        icon: 'smile',
        path: '/statistics/loan-overdue',
        routes: [
          {
            name: 'product',
            icon: 'smile',
            path: '/statistics/loan-overdue/product',
            component: './Statistics/LoanOverdue/Product',
          },
        ],
      },
      {
        name: 'profit',
        icon: 'smile',
        path: '/statistics/profit',
        routes: [
          {
            name: 'product',
            icon: 'smile',
            path: '/statistics/profit/product',
            component: './Statistics/Profit/Product',
          },
        ],
      },
      {
        name: 'risk',
        icon: 'smile',
        path: '/statistics/risk',
        routes: [
          {
            name: 'overdue-risk-item-range',
            icon: 'smile',
            path: '/statistics/risk/overdue-risk-item-range',
            component: './Statistics/Risk/OverdueRiskItemRange',
          },
          {
            name: 'risk-bundle',
            icon: 'smile',
            path: '/statistics/risk/risk-bundle',
            component: './Statistics/Risk/RiskBundle',
          },
          {
            name: 'risk-strategy',
            icon: 'smile',
            path: '/statistics/risk/risk-strategy',
            component: './Statistics/Risk/RiskStrategy',
          },
          {
            name: 'risk-tag',
            icon: 'smile',
            path: '/statistics/risk/risk-tag',
            component: './Statistics/Risk/RiskTag',
          },
          {
            name: 'risk-region',
            icon: 'smile',
            path: '/statistics/risk/risk-region',
            component: './Statistics/Risk/RiskRegion',
          },
          {
            name: 'risk-tree',
            icon: 'smile',
            path: '/statistics/risk/risk-tree',
            component: './Statistics/Risk/RiskTree',
          },
        ],
      },
      {
        name: 'collection',
        icon: 'smile',
        path: '/statistics/collection',
        routes: [
          {
            name: 'admin-news',
            icon: 'smile',
            path: '/statistics/collection/admin-news',
            component: './Statistics/Collection/AdminNews',
          },
          {
            name: 'admin',
            icon: 'smile',
            path: '/statistics/collection/admin',
            component: './Statistics/Collection/Admin',
          },
          {
            name: 'admin-heatmap',
            icon: 'smile',
            path: '/statistics/collection/admin-heatmap',
            component: './Statistics/Collection/AdminHeatmap',
          },
          {
            name: 'report',
            icon: 'smile',
            path: '/statistics/collection/report',
            component: './Statistics/Collection/Report',
          },
          {
            name: 'flow',
            icon: 'smile',
            path: '/statistics/collection/flow',
            component: './Statistics/Collection/Flow',
          },

        ],
      },

      {
        name: 'sms',
        icon: 'smile',
        path: '/statistics/sms',
        routes: [
          {
            name: 'back-fill',
            icon: 'smile',
            path: '/statistics/sms/back-fill',
            component: './Statistics/Sms/BackFill',
          },
          {
            name: 'report',
            icon: 'smile',
            path: '/statistics/sms/report',
            component: './Statistics/Sms/Report',
          },
          {
            name: 'template',
            icon: 'smile',
            path: '/statistics/sms/template',
            component: './Statistics/Sms/Template',
          },
        ],
      },
      {
        name: 'finance',
        icon: 'smile',
        path: '/statistics/finance',
        routes: [
          {
            name: 'fee',
            icon: 'smile',
            path: '/statistics/finance/fee',
            component: './Statistics/Finance/Fee',
          },
        ],
      },
    ],
  },
  {
    name: 'finance',
    icon: 'CalculatorOutlined',
    path: '/finance',
    routes: [
      {
        name: 'collection-agency-day',
        icon: 'smile',
        path: '/finance/collection-agency-day',
        component: './Stay',
      },
      {
        name: 'collection-agency-month',
        icon: 'smile',
        path: '/finance/collection-agency-month',
        component: './Stay',
      },

      {
        name: 'collection-admin-day',
        icon: 'smile',
        path: '/finance/collection-admin-day',
        component: './Stay',
      },
      {
        name: 'collection-admin-month',
        icon: 'smile',
        path: '/finance/collection-admin-month',
        component: './Stay',
      },
      {
        name: 'review-admin-day',
        icon: 'smile',
        path: '/finance/review-admin-day',
        component: './Stay',
      },
      {
        name: 'review-admin-month',
        icon: 'smile',
        path: '/finance/review-admin-month',
        component: './Stay',
      },
      {
        name: 'telemarketing-admin-day',
        icon: 'smile',
        path: '/finance/telemarketing-admin-day',
        component: './Stay',
      },
      {
        name: 'telemarketing-admin-month',
        icon: 'smile',
        path: '/finance/telemarketing-admin-month',
        component: './Stay',
      },
      {
        name: 'loan-day',
        icon: 'smile',
        path: '/finance/loan-day',
        component: './Stay',
      },

      {
        name: 'repay-day',
        icon: 'smile',
        path: '/finance/repay-day',
        component: './Stay',
      },
      {
        name: 'loan-repay-week',
        icon: 'smile',
        path: '/finance/loan-repay-week',
        component: './Stay',
      },
      {
        name: 'loan-repay-month',
        icon: 'smile',
        path: '/finance/loan-repay-month',
        component: './Stay',
      },
      {
        name: 'supplier',
        icon: 'smile',
        path: '/finance/supplier',
        component: './Stay',
      },

    ],
  },
  {
    name: 'setting',
    icon: 'SettingOutlined',
    path: '/setting',
    routes: [
      {
        name: 'system-setting',
        icon: 'smile',
        path: '/setting/system-setting',
        component: './Setting/SystemSettings',
      },
      {
        name: 'verify-item',
        icon: 'smile',
        path: '/setting/verify-item',
        component: './Setting/QVerifyItem',
      },
      {
        name: 'role',
        icon: 'smile',
        path: '/setting/role',
        component: './Setting/Role',
      },
    ],
  },

  {
    component: './404',
  },
];

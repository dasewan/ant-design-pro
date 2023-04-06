export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: 'user',
    icon: 'smile',
    path: '/user-manager',
    // component: './AUser',
    routes: [
      {
        name: 'user-list',
        icon: 'smile',
        path: '/user-manager/user-list',
        component: './UserManager/AUser',
      },
      {
        name: 'white-info-list',
        icon: 'smile',
        path: '/user-manager/white-info-list',
        component: './UserManager/BAWhite',
      },
      {
        name: 'white-user-list',
        icon: 'smile',
        path: '/user-manager/white-user-list',
        component: './UserManager/BAWhiteUser',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'white-user',
            icon: 'smile',
            path: '/user-manager/white-user-list/white-user',
            component: './UserManager/BAWhiteUser/BAWhiteUser',
          },
          {
            name: 'white-user-with-overdue',
            icon: 'smile',
            path: '/user-manager/white-user-list/white-user-with-overdue',
            component: './UserManager/BAWhiteUser/BAWhiteUserWithOverdue',
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
      {
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
    name: 'review',
    icon: 'smile',
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
    name: 'borrow',
    icon: 'smile',
    path: '/borrow',
    routes: [
      {
        name: 'borrow-list',
        icon: 'smile',
        path: '/borrow/borrow-list',
        component: './Borrow/BorrowList',
      },
      {
        name: 'outstanding-list',
        icon: 'smile',
        path: '/borrow/outstanding-list',
        component: './Borrow/OutstandingList',
      },
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
        ],
      },
    ],
  },
  {
    name: 'loan',
    icon: 'smile',
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
            path: '/loan/loan-list/intercept-loan',
            component: './Loan/LoanList/InterceptLoan',
          },
          {
            name: 'processing-loan',
            icon: 'smile',
            path: '/loan/loan-list/processing-loan',
            component: './Loan/LoanList/ProcessingLoan',
          },
          {
            name: 'unknown-loan',
            icon: 'smile',
            path: '/loan/loan-list/unknown-loan',
            component: './Loan/LoanList/UnknownLoan',
          },
        ],
      },
      {
        name: 'loan-log',
        icon: 'smile',
        path: '/loan/loan-log',
        component: './Loan/LoanLog',
      },
    ],
  },
  {
    name: 'repay',
    icon: 'smile',
    path: '/repay',
    routes: [
      {
        name: 'repay-list',
        icon: 'smile',
        path: '/repay/repay-list',
        component: './Repay/RepayList',
      },
      {
        name: 'repay-log',
        icon: 'smile',
        path: '/repay/repay-log',
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
    name: 'risk',
    icon: 'smile',
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
    ],
  },
  {
    name: 'operation',
    icon: 'smile',
    path: '/operation',
    routes: [
      {
        name: 'product',
        icon: 'smile',
        path: '/operation/product',
        component: './Operation/BProduct',
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
      },
      {
        name: 'payment-channel',
        icon: 'smile',
        path: '/operation/payment-channel',
        component: './Operation/PaymentChannel',
      },
    ],
  },
  {
    name: 'setting',
    icon: 'smile',
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
    ],
  },

  {
    component: './404',
  },
];

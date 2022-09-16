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
        name: 'blackinfo-list',
        icon: 'smile',
        path: '/user-manager/blackinfo-list',
        component: './UserManager/RBlack',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'blackphone-list',
            icon: 'smile',
            path: '/user-manager/blackinfo-list/phone',
            component: './UserManager/RBlack/Phone', // hideInMenu:true,
          },
          {
            name: 'blackidnumber-list',
            icon: 'smile',
            path: '/user-manager/blackinfo-list/idnumber',
            component: './UserManager/RBlack/Idnumber', // hideInMenu:true,
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
    ],
  },

  {
    component: './404',
  },
];

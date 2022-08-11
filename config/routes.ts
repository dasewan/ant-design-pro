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
    // path: '/user',
    // component: './AUser',
    routes: [
      {
        name: 'user-list',
        icon: 'smile',
        path: '/user-list',
        component: './AUser',
      },
      {
        name: 'white-info-list',
        icon: 'smile',
        path: '/white-info-list',
        component: './BAWhite',
      },
      {
        name: 'white-user-list',
        icon: 'smile',
        path: '/white-user-list',
        component: './BAWhiteUser',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'white-user',
            icon: 'smile',
            path: '/white-user-list/white-user',
            component: './BAWhiteUser/BAWhiteUser',
          },
          {
            name: 'white-user-with-overdue',
            icon: 'smile',
            path: '/white-user-list/white-user-with-overdue',
            component: './BAWhiteUser/BAWhiteUserWithOverdue',
          },
        ],
      },
      {
        name: 'blackinfo-list',
        icon: 'smile',
        path: '/blackinfo-list',
        component: './RBlack',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'blackphone-list',
            icon: 'smile',
            path: '/blackinfo-list/phone',
            component: './RBlack/Phone', // hideInMenu:true,
          },
          {
            name: 'blackidnumber-list',
            icon: 'smile',
            path: '/blackinfo-list/idnumber',
            component: './RBlack/Idnumber', // hideInMenu:true,
          },
        ],
      },
      {
        name: 'black-user-list',
        icon: 'smile',
        path: '/black-user-list',
        component: './AIBlackUser',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'black-user',
            icon: 'smile',
            path: '/black-user-list/black-user',
            component: './AIBlackUser/BlackUser',
          },
          {
            name: 'black-user-with-repay',
            icon: 'smile',
            path: '/black-user-list/black-user-with-repay',
            component: './AIBlackUser/BlackUserWithRepay',
          },
        ],
      },
      {
        name: 'g-b-marketing',
        icon: 'smile',
        path: '/g-b-marketing',
        component: './GBMarketing',
      },
      {
        name: 'marketing-detail-list',
        icon: 'smile',
        path: '/marketing-detail-list',
        component: './GCMarketingDetail',
        hideChildrenInMenu: true,
        routes: [
          {
            name: 'marketing-success-user',
            icon: 'smile',
            path: '/marketing-detail-list/marketing-success-user',
            component: './GCMarketingDetail/MarketingSuccessUser',
          },
          {
            name: 'marketing-user-with-overdue',
            icon: 'smile',
            path: '/marketing-detail-list/marketing-user-with-overdue',
            component: './GCMarketingDetail/MarketingUserWithOverdue',
          },
          {
            name: 'marketing-list',
            icon: 'smile',
            path: '/marketing-detail-list/marketing-list',
            component: './GCMarketingDetail/MarketingList',
          },
        ],
      },
    ],
  },

  {
    component: './404',
  },
];

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
            component: './RBlack/Phone',
            // hideInMenu:true,
          },
          {
            name: 'blackidnumber-list',
            icon: 'smile',
            path: '/blackinfo-list/idnumber',
            component: './RBlack/Idnumber',
            // hideInMenu:true,
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];

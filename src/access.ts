/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    // normalRouteFilter: (route) => currentUser?.permissions?.includes(route.name),
    normalRouteFilter: (route) => currentUser?.permissions?.includes(route.path),
    // normalRouteFilter: (route) => {
    //   console.log(route);
    //   return true;
    //
    // },
  };
}

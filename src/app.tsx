import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { RequestConfig } from '@@/plugin-request/request';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { MessageArgsProps } from 'antd';
import { message } from 'antd';
import type { ReactChild, ReactFragment, ReactPortal } from 'react';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { getAdminV1CurrentUsers as queryCurrentUser } from './services/ant-design-pro/CurrentUser';
import type { Context } from 'D:/x/github/ant-design-pro/node_modules/umi-request';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
const errorHandler = function (error: {
  response: any;
  data: {
    message:
      | string
      | ReactChild
      | ReactFragment
      | ReactPortal
      | MessageArgsProps
      | null
      | undefined;
  };
  message: any;
}) {
  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    console.log(error);
    message.error(error.data.message);
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    console.log(error.message);
  }

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw error; // 如果throw. 错误将继续抛出.

  // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  // return {some: 'data'};
};
const demo1Middleware = async (ctx: Context, next: () => void) => {
  const { req } = ctx;
  const { options } = req;
  ctx.req.options.params = {
    ...options.params,
    XDEBUG_SESSION_START: 15851,
  };
  await next();
};

const demo2Middleware = async (ctx: Context, next: () => void) => {
  await next();
};

export const request: RequestConfig = {
  errorHandler,
  middlewares: [demo1Middleware, demo2Middleware],
};

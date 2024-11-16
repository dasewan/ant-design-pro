// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Display the specified ALAdminFile Get Captcha GET /admin/v1/captcha/${param1} */
export async function getAdminV1CaptchaType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminV1CaptchaTypeParams,
  options?: { [key: string]: any },
) {
  const { id: param0, type: param1, ...queryParams } = params;
  return request<{ success?: boolean; data?: string; message?: string }>(
    `/admin/v1/captcha/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

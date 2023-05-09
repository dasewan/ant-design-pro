// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get a listing of the CurrentUsers. Get all CurrentUsers GET /admin/v1/currentUsers */
export async function getAdminV1CurrentUsers(options?: { [key: string]: any }) {
  return request<{ data?: API.CurrentUser }>('/admin/v1/currentUsers', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Store a newly created CurrentUser in storage Store CurrentUser POST /admin/v1/currentUsers */
export async function postAdminV1CurrentUsers(
  body: API.CurrentUser,
  options?: { [key: string]: any },
) {
  return request<{ success?: boolean; data?: API.CurrentUser; message?: string }>(
    '/admin/v1/currentUsers',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** Display the specified CurrentUser Get CurrentUser GET /admin/v1/currentUsers/${param0} */
export async function getAdminV1CurrentUsersId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminV1CurrentUsersIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: API.CurrentUser; message?: string }>(
    `/admin/v1/currentUsers/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** Update the specified CurrentUser in storage Update CurrentUser PUT /admin/v1/currentUsers/${param0} */
export async function putAdminV1CurrentUsersId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putAdminV1CurrentUsersIdParams,
  body: API.CurrentUser,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: API.CurrentUser; message?: string }>(
    `/admin/v1/currentUsers/${param0}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}

/** Remove the specified CurrentUser from storage Delete CurrentUser DELETE /admin/v1/currentUsers/${param0} */
export async function deleteAdminV1CurrentUsersId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAdminV1CurrentUsersIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: string; message?: string }>(
    `/admin/v1/currentUsers/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** Store a newly created CurrentUser in storage Store CurrentUser POST /admin/v1/login */
export async function postAdminV1Login(body: API.CurrentUser, options?: { [key: string]: any }) {
  return request<{ success?: boolean; data?: API.LoginResult; message?: string }>(
    '/admin/v1/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

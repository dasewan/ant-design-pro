// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get a listing of the Users. Get all Users GET /admin/v1/users_enum */
export async function getAdminV1UsersEnum(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminV1UsersEnumParams,
  options?: { [key: string]: any },
) {
  const { foo: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: API.User[]; total?: number; message?: string }>(
    '/admin/v1/users_enum',
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** Get a listing of the Users. Get all Users GET /users */
export async function getUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersParams,
  options?: { [key: string]: any },
) {
  const { current: param0, pageSize: param1, ...queryParams } = params;
  return request<{ success?: boolean; data?: API.User[]; total?: number; message?: string }>(
    '/users',
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** Store a newly created User in storage Store User POST /users */
export async function postUsers(body: API.User, options?: { [key: string]: any }) {
  return request<{ success?: boolean; data?: API.User; message?: string }>('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Display the specified User Get User GET /users/${param0} */
export async function getUsersId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: API.User; message?: string }>(`/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update the specified User in storage Update User PUT /users/${param0} */
export async function putUsersId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putUsersIdParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: API.User; message?: string }>(`/users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Remove the specified User from storage Delete User DELETE /users/${param0} */
export async function deleteUsersId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsersIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: string; message?: string }>(`/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

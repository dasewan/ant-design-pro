// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get a listing of the NoticeIconItems. Get all NoticeIconItems GET /noticeIconItems */
export async function getNoticeIconItems(options?: { [key: string]: any }) {
  return request<{
    success?: boolean;
    data?: API.NoticeIconItem[];
    total?: number;
    message?: string;
  }>('/noticeIconItems', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Store a newly created NoticeIconItem in storage Store NoticeIconItem POST /noticeIconItems */
export async function postNoticeIconItems(
  body: API.NoticeIconItem,
  options?: { [key: string]: any },
) {
  return request<{ success?: boolean; data?: API.NoticeIconItem; message?: string }>(
    '/noticeIconItems',
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

/** Display the specified NoticeIconItem Get NoticeIconItem GET /noticeIconItems/${param0} */
export async function getNoticeIconItemsId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNoticeIconItemsIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: API.NoticeIconItem; message?: string }>(
    `/noticeIconItems/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** Update the specified NoticeIconItem in storage Update NoticeIconItem PUT /noticeIconItems/${param0} */
export async function putNoticeIconItemsId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putNoticeIconItemsIdParams,
  body: API.NoticeIconItem,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: API.NoticeIconItem; message?: string }>(
    `/noticeIconItems/${param0}`,
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

/** Remove the specified NoticeIconItem from storage Delete NoticeIconItem DELETE /noticeIconItems/${param0} */
export async function deleteNoticeIconItemsId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteNoticeIconItemsIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ success?: boolean; data?: string; message?: string }>(
    `/noticeIconItems/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

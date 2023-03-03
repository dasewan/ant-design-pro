import type { TableListItem } from '@/pages/Borrow/VerifyList/data';
import { getAdminV1GVerifiesId as show } from '@/services/ant-design-pro/GVerify';
import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import VerifyDetail from '../components/VerifyDetail';

const TableList: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  useEffect(() => {
    /** table */
    const _show = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await show({ id: params.id });
      setOldRecord(res.data);
      return {
        data: res.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: res.success,
      };
    };
    _show();
  }, [params.id]);
  // @ts-ignore
  return (
    <PageContainer
      header={{
        title: '认证详情',
        ghost: true,
      }}
    >
      <VerifyDetail oldRecord={oldRecord} />
    </PageContainer>
  );
};

export default TableList;

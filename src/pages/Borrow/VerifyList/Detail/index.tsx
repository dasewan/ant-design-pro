import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import VerifyDetail from '../components/VerifyDetail';

const TableList: React.FC = () => {
  // @ts-ignore
  return (
    <PageContainer
      header={{
        ghost: true,
      }}
    >
      <VerifyDetail />
    </PageContainer>
  );
};

export default TableList;

import ImportForm from '@/pages/RBlack/components/ImportForm';
import { DownloadOutlined, EllipsisOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { history } from 'umi';

type RBlackProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const tabList = [
  {
    key: 'phone',
    tab: '手机号码',
  },
  {
    key: 'idnumber',
    tab: '证件号',
  },
  {
    key: 'bankcard',
    tab: '银行卡号',
  },
];

const RBlack: FC<RBlackProps> = (props) => {
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const { match } = props;
  useEffect(() => {
    history.push(`/blackinfo-list/phone`);
    return () => {};
  }, []);

  const _handleTabChange = (key: string) => {
    const url = match.url === '/' ? '' : match.url;
    history.push(`${url}/${key}`);
  };

  const _getTabKey = () => {
    const { location } = props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  return (
    <PageContainer
      header={{
        title: '黑名单信息',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => handleImportModalVisible(true)}>
            导入黑名单
          </Button>,
          <Dropdown
            key="dropdown"
            trigger={['click']}
            overlay={
              <Menu
                items={[
                  { label: '操作说明', key: 'item-1', icon: <FileTextOutlined /> },
                  {
                    label: (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={'/admin/v1/aLAdminFiles_templete/white_info_list.xlsx'}
                      >
                        模版下载
                      </a>
                    ),
                    key: 'item-2',
                    icon: <DownloadOutlined />,
                  },
                ]}
              />
            }
          >
            <Button key="4" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ],
      }}
      tabList={tabList}
      tabActiveKey={_getTabKey()}
      onTabChange={_handleTabChange}
    >
      {props.children}
      <ImportForm
        onSubmit={async (success) => {
          if (success) {
            handleImportModalVisible(false);
            // if (actionRef.current) {
            //   actionRef.current.reload();
            // }
          }
        }}
        onCancel={() => {
          handleImportModalVisible(false);
        }}
        modalVisible={importModalVisible}
      />
    </PageContainer>
  );
};

export default RBlack;

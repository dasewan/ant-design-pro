import { getAdminV1BIPaymentChannels as index } from '@/services/ant-design-pro/BIPaymentChannel';
import { getAdminV1GKBanks as indexBank } from '@/services/ant-design-pro/GKBank';
import { putAdminV1HAPaymentChannelBanksId as update } from '@/services/ant-design-pro/HAPaymentChannelBank';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import type { InputRef, MenuProps } from 'antd';
import { Button, Input, Menu, message, Popconfirm, Space, Spin, Switch } from 'antd';
import { groupBy } from 'lodash';
import type { SelectInfo } from 'rc-menu/es/interface';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { TableListItem } from './data';

import SwitchChannel from '@/pages/Operation/PaymentChannel/components/SwitchChannel';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

type MenuItem = Required<MenuProps>['items'][number];

type CommonProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};
type DataIndex = keyof API.HAPaymentChannelBank;

const BAWhite: FC<CommonProps> = () => {
  const [tabActive, SetTabActive] = useState<string>('transfer');
  // const [transferData, setTransferData] = useState<TableListItem[]>([]);
  const [resultData, setResultData] = useState<TableListItem[]>([]);
  const [transactionDictionary, setTransactionDictionary] = useState<{
    [index: string]: TableListItem[];
  }>();
  const [transferDictionary, setTransferDictionary] = useState<{
    [index: string]: TableListItem[];
  }>();
  const [loanMenuItemType, setLoanMenuItemType] = useState<MenuItem[]>([]);
  const [repayMenuItemType, setRepayMenuItemType] = useState<MenuItem[]>([]);
  const [menuItemType, setMenuItemType] = useState<MenuItem[]>([]);
  const [dataSource, setDataSource] = useState<API.HAPaymentChannelBank[]>([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [modelodalVisible, handleModalVisible] = useState<boolean>(false);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string>('');

  const [time, handleTime] = useState<number>(1);
  const [type, setType] = useState<string>('transfer');

  /** 管理员enum */
  const [banks, setBanks] = useState<RequestOptionsType[]>([]);

  const [key, setKey] = useState('1');

  const tabList = [
    {
      key: 'transfer',
      tab: '放款渠道银行',
    },
    {
      key: 'transaction',
      tab: '还款渠道银行',
    },
  ];

  useEffect(() => {
    async function _index() {
      // @ts-ignore
      const res = await index({ page: 1, limit: 10000 });
      /**
       * 查询银行卡enum
       */
      const _getBankEnum = async () => {
        const data: RequestOptionsType[] = [];
        if (banks.length === 0) {
          const res2 = await indexBank({ foo: 1 });
          for (const item of res2.data!) {
            data.push({
              label: item.a_name,
              value: item.id,
              text: item.a_name,
            });
          }
          setBanks(data);
          return data;
        } else {
          return banks;
        }
      };
      await _getBankEnum();
      setResultData(res.data!);

      const loanData = groupBy(res.data, 'e_type').transfer;
      const repayData = groupBy(res.data, 'e_type').transaction;
      const repayDictionary = groupBy(repayData, 'b_channel_code');
      /*      forEach(groupBy(repayData,'d_method'), function(value,_key) {
            })*/
      /*      map(groupBy(repayData,'d_method'), function(value,_key) {
            })*/
      setTransferDictionary(groupBy(loanData, 'd_method'));
      setTransactionDictionary(groupBy(repayData, 'd_method'));
      // setTransferData(groupBy(res.data, 'e_type').transfer)
      const tmpItemType: MenuItem[] = [];
      for (const item of loanData!) {
        tmpItemType.push({
          label: item.a_name,
          key: item.id,
        } as MenuItem);
      }
      const tmpItemType2: MenuItem[] = [];
      setLoanMenuItemType(tmpItemType);
      setMenuItemType(tmpItemType);
      for (const repayDictionaryKey in repayDictionary) {
        if (repayDictionary[repayDictionaryKey].length === 1) {
          tmpItemType2.push({
            label: repayDictionaryKey,
            key: repayDictionary[repayDictionaryKey][0].id,
          } as MenuItem);
        } else if (repayDictionary[repayDictionaryKey].length > 1) {
          const tmpItemType3: MenuItem[] = [];

          for (const item of repayDictionary[repayDictionaryKey]!) {
            tmpItemType3.push({
              label: item.h_method_name,
              key: item.id,
            } as MenuItem);
          }
          tmpItemType2.push({
            label: repayDictionaryKey,
            key: repayDictionary[repayDictionaryKey][0].id + '_',
            children: tmpItemType3,
          } as MenuItem);
        }
      }
      setRepayMenuItemType(tmpItemType2);
      // setLoading(false);
      /*setDataSource(res.data!.slice(-1)[0].a_a_a_a_h_a_payment_channel_bank);
      setKey(res.data!.slice(-1).id as string);
      setDefaultSelectedKeys(res.data!.slice(-1)[0].id as string);*/
      return res;
    }

    // setLoading(true);
    _index().then((res) => {
      setDefaultSelectedKeys(res.data!.slice(-1)[0].id as string);
      setDataSource(res.data!.slice(-1)[0].a_a_a_a_h_a_payment_channel_bank);
      setKey(res.data!.slice(-1).id as string);
      setLoading(false);
    });
    // setLoading(false);
    return () => {};
  }, [banks, time]);

  /**
   * 展示预览model
   * @param _type
   */
  const onEditClick = async (_type: string) => {
    handleModalVisible(true);
    setType(_type);
  };

  const _handleTabChange = (_key: string) => {
    SetTabActive(_key);
    setDataSource([]);
    if (_key === 'transfer') {
      setMenuItemType(loanMenuItemType);
      setDefaultSelectedKeys('6');
    } else {
      setMenuItemType(repayMenuItemType);
    }
  };
  const _handleMenuChange = (e: SelectInfo) => {
    const menuId = e.key as string;
    console.log(123123);
    console.log(menuId);
    const _dataSource = resultData?.find(
      (item) => item?.id?.toString() === menuId,
    )?.a_a_a_a_h_a_payment_channel_bank;
    setDataSource(_dataSource!);
    setKey(e.key as string);
  };
  const setLoading2 = async () => {
    setLoading(true);
  };
  const confirmSwitch = async (_item: API.HAPaymentChannelBank) => {
    let _success = true;
    _item.f_status = _item.f_status === 'y' ? 'n' : 'y';
    setLoading(true);
    try {
      // @ts-ignore
      const res = await update({ ..._item });
      if (!res.success) {
        //恢复原值
        _item.f_status = _item.f_status === 'y' ? 'n' : 'y';
        _success = false;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      //恢复原值
      _item.f_status = _item.f_status === 'y' ? 'n' : 'y';
      _success = false;
    }
    setLoading(false);
    if (_success) {
      message.success('修改成功');
    } else {
      message.warn('修改失败');
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<API.HAPaymentChannelBank> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            key="search"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
            key="clear"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (dataIndex === 'b_bank_id') {
        const tmpBanks = banks.filter((item) => {
          return item.text
            ?.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase());
        });
        const tmpBankIds: number[] = [];
        tmpBanks.map((item) => tmpBankIds.push(item.value as number));
        return tmpBankIds.includes(record.b_bank_id!);
      } else {
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase());
      }
    },
    /*    onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },*/
    render: (text) => {
      let _text = text;
      if (dataIndex === 'b_bank_id') {
        _text = banks.find((item) => {
          return item.value === text.props.record.b_bank_id;
        })?.label;
      }
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={_text ? _text.toString() : ''}
        />
      ) : (
        _text
      );
    },
  });

  const columns: ProColumns<API.HAPaymentChannelBank>[] = [
    {
      title: '银行名称',
      dataIndex: 'b_bank_id',
      valueType: 'select',
      request: async () => banks,
      width: 180,
      ...getColumnSearchProps('b_bank_id'),
    },
    {
      title: '银行编码',
      dataIndex: 'c_bank_code',
      width: 180,
      ...getColumnSearchProps('c_bank_code'),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 220,
      fixed: 'right',
      dataIndex: 'id',
      render: (_, record) => {
        const edit = (
          <Popconfirm
            key={record.id}
            title="Are you sure to delete this task?"
            onConfirm={confirmSwitch.bind(this, record)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch checkedChildren="开" unCheckedChildren="关" checked={record.f_status === 'y'} />
          </Popconfirm>
        );

        return [edit];
      },
    },
  ];

  return (
    <PageContainer
      header={{
        title: '支付渠道管理',
        ghost: true,
        extra: [
          <Button key="3" type="primary" onClick={() => onEditClick('transfer')} loading={loading}>
            放款渠道
          </Button>,
          <Button
            key="4"
            type="primary"
            onClick={() => onEditClick('transaction')}
            loading={loading}
          >
            还款渠道
          </Button>,
        ],
      }}
      tabList={tabList}
      tabActiveKey={tabActive}
      onTabChange={_handleTabChange}
    >
      {/*{tabActive === 'transfer' ?*/}
      <Spin spinning={loading}>
        <div>
          <ProTable<API.HAPaymentChannelBank>
            columns={columns}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
            }}
            search={false}
            tableRender={(_, dom) => (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                }}
              >
                <Menu
                  onSelect={(e) => _handleMenuChange(e)}
                  style={{ width: 256 }}
                  defaultSelectedKeys={[defaultSelectedKeys]}
                  defaultOpenKeys={[defaultSelectedKeys]}
                  mode="inline"
                  items={menuItemType}
                />
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  {dom}
                </div>
              </div>
            )}
            params={{
              key,
            }}
            dataSource={dataSource}
            dateFormatter="string"
          />
        </div>
      </Spin>
      <SwitchChannel
        onSubmit={async (success) => {
          if (success) {
            await setLoading2();
            setLoading(true);
            handleModalVisible(false);
            handleTime(Date.now());
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        modalVisible={modelodalVisible}
        type={type}
        transactionDictionary={transactionDictionary}
        transferDictionary={transferDictionary}
      />
    </PageContainer>
  );
};

export default BAWhite;

import { GridContent } from '@ant-design/pro-layout';
import { Alert, Menu, Result } from 'antd';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SecurityView from './components/security';
import styles from './style.less';

import TimerButton from '@/pages/Setting/SystemSettings/components/TimerButton';
import { getAdminV1GHSettings as index } from '@/services/ant-design-pro/GHSetting';

const { Item } = Menu;

type SettingsStateKeys = 'register' | 'verify' | 'borrow' | 'merchant' | 'other';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

const Settings: React.FC = () => {
  const menuMap: Record<string, React.ReactNode> = {
    register: '注册配置',
    verify: '认证配置',
    risk: '风控配置',
    borrow: '借款配置',
    loan: '放款配置',
    repay: '还款配置',
    merchant: '商户配置',
    admin: '后台设置',
    other: '其他配置',
  };
  const menuInfoMap: Record<string, React.ReactNode> = {
    register: '',
    verify: '建议不要中断用户认证流程（即使命中黑名单），这样可以完整的获取用户资料',
    borrow: '',
    merchant: '',
    other: '',
  };

  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'register',
  });
  const dom = useRef<HTMLDivElement>();
  const [dataMap, setDataMap] = useState<Map<string, API.GHSetting[]>>(new Map());
  const [readed, setReaded] = useState<boolean>(false);

  useLayoutEffect(() => {
    const resize = () => {
      requestAnimationFrame(() => {
        if (!dom.current) {
          return;
        }
        let mode: 'inline' | 'horizontal' = 'inline';
        const { offsetWidth } = dom.current;
        if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
          mode = 'horizontal';
        }
        if (window.innerWidth < 768 && offsetWidth > 400) {
          mode = 'horizontal';
        }
        setInitConfig({ ...initConfig, mode: mode as SettingsState['mode'] });
      });
    };
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);
  // @ts-ignore
  useEffect(() => {
    async function _index() {
      if (!dataMap.has('register')) {
        // @ts-ignore
        const res = await index({ page: 1, limit: 10000 });
        const registerData: API.GHSetting[] = [];
        const verifyData: API.GHSetting[] = [];
        const riskData: API.GHSetting[] = [];
        const borrowData: API.GHSetting[] = [];
        const repayData: API.GHSetting[] = [];
        const loanData: API.GHSetting[] = [];
        const merchantData: API.GHSetting[] = [];
        const adminData: API.GHSetting[] = [];
        const otherData: API.GHSetting[] = [];
        const tmpMap: Map<string, API.GHSetting[]> = new Map();

        res.data?.map((_item: API.GHSetting) => {
          switch (_item.i_cat) {
            case 'register':
              registerData.push(_item);
              break;
            case 'verify':
              verifyData.push(_item);
              break;
            case 'risk':
              riskData.push(_item);
              break;
            case 'borrow':
              borrowData.push(_item);
              break;
            case 'loan':
              loanData.push(_item);
              break;
            case 'repay':
              repayData.push(_item);
              break;
            case 'merchant':
              merchantData.push(_item);
              break;
            case 'admin':
              adminData.push(_item);
              break;
            case 'other':
              otherData.push(_item);
              break;
          }
          return _item;
        });
        tmpMap.set('register', registerData);
        tmpMap.set('verify', verifyData);
        tmpMap.set('risk', riskData);
        tmpMap.set('borrow', borrowData);
        tmpMap.set('loan', loanData);
        tmpMap.set('repay', repayData);
        tmpMap.set('merchant', merchantData);
        tmpMap.set('admin', adminData);
        tmpMap.set('other', otherData);

        setDataMap(tmpMap);
      }
      return dataMap;
    }

    _index();
    return () => {
      return;
    };
  }, []);
  const getMenu = () => {
    // return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
    Object.keys(menuMap).map((item) => {
      return <Item key={item}>{menuMap[item]}</Item>;
    });
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;
    return <SecurityView data={dataMap.get(selectKey)} />;
  };

  return (
    <div>
      <div style={{ display: !readed ? 'none' : 'block' }}>
        <GridContent>
          <div
            className={styles.main}
            ref={(ref) => {
              if (ref) {
                dom.current = ref;
              }
            }}
          >
            <div className={styles.leftMenu}>
              <Menu
                mode={initConfig.mode}
                selectedKeys={[initConfig.selectKey]}
                onClick={({ key }) => {
                  setInitConfig({
                    ...initConfig,
                    selectKey: key as SettingsStateKeys,
                  });
                }}
              >
                {getMenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
              <Alert message={menuInfoMap[initConfig.selectKey]} type="info" />
              {renderChildren()}
            </div>
          </div>
        </GridContent>
      </div>
      <div style={{ display: readed ? 'none' : 'block' }}>
        <Result
          status="warning"
          title="配置系统参数前，请明确你将要修改系统参数的用途！"
          extra={
            /*            <Button disabled={sec > 0} type="primary" key="console" onClick={()=>setReaded(true)}>
                          Go Setting {sec}
                        </Button>*/
            <TimerButton
              name={'开始设置'}
              num={3}
              onClick={() => {
                setReaded(true);
              }}
            />
          }
        />
      </div>
    </div>
  );
};
export default Settings;

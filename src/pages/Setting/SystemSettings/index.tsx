import { GridContent } from '@ant-design/pro-layout';
import { Menu, Result } from 'antd';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SecurityView from './components/security';
import styles from './style.less';

import TimerButton from '@/pages/Setting/SystemSettings/components/TimerButton';
import { index } from './service';

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
    borrow: '借贷配置',
    merchant: '商户配置',
    other: '其他配置',
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
        const borrowData: API.GHSetting[] = [];
        const merchantData: API.GHSetting[] = [];
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
            case 'borrow':
              borrowData.push(_item);
              break;
            case 'merchant':
              merchantData.push(_item);
              break;
            case 'other':
              otherData.push(_item);
              break;
          }
        });
        tmpMap.set('register', registerData);
        tmpMap.set('verify', verifyData);
        tmpMap.set('borrow', borrowData);
        tmpMap.set('merchant', merchantData);
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
              {renderChildren()}
            </div>
          </div>
        </GridContent>
      </div>
      <div style={{ display: readed ? 'none' : 'block' }}>
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            /*            <Button disabled={sec > 0} type="primary" key="console" onClick={()=>setReaded(true)}>
                          Go Setting {sec}
                        </Button>*/
            <TimerButton
              name={'Go Setting'}
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

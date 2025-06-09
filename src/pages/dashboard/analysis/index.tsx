import { EllipsisOutlined } from '@ant-design/icons';
import { GridContent, RequestOptionsType } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Col, Dropdown, Row } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type { RadioChangeEvent } from 'antd/es/radio';
import type dayjs from 'dayjs';
import type { FC } from 'react';
import React, { useEffect } from 'react';
import { Suspense, useState } from 'react';
import IntroduceRow from './components/IntroduceRow';
import OfflineData from './components/OfflineData';
import PageLoading from './components/PageLoading';
import ProportionSales from './components/ProportionSales';
import type { TimeType } from './components/SalesCard';
import SalesCard from './components/SalesCard';
import TopSearch from './components/TopSearch';
import type { AnalysisData, CollectionDashboardData } from './data.d';
import { fakeChartData } from './service';
import useStyles from './style.style';
import { getTimeDistance } from './utils/utils';
import { getAdminV1WSCollectionAdminHeatmapsD as index } from '@/services/ant-design-pro/WSCollectionAdminHeatmap';
import RegisterLine from "@/pages/dashboard/analysis/components/RegisterLine";
import RiskAxes from "@/pages/dashboard/analysis/components/RiskAxes";
import Overdue from "@/pages/dashboard/analysis/components/Overdue";
import RiskFields from "@/pages/dashboard/analysis/components/RiskFields";
import Reloan from "@/pages/dashboard/analysis/components/Reloan";
import Overdue2 from "@/pages/dashboard/analysis/components/Overdue2";
import OverdueDays from "@/pages/dashboard/analysis/components/OverdueDays";
import { getAdminV1UsersEnum as getUsersEnum } from '@/services/ant-design-pro/User';
type RangePickerValue = RangePickerProps<dayjs.Dayjs>['value'];
type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};
type SalesType = 'all' | 'online' | 'stores';
const Analysis: FC<AnalysisProps> = () => {
  const { styles } = useStyles();
  const [salesType, setSalesType] = useState<SalesType>('all');
  const [currentTabKey, setCurrentTabKey] = useState<string>('');
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance('year'),
  );
  const [myData, setMyData] = useState<CollectionDashboardData>();
  const { loading, data } = useRequest(fakeChartData);
  const [admins, setAdmins] = useState<RequestOptionsType[]>([]);

  useEffect(() => {
    async function _index() {
        // @ts-ignore
        const res = await index({ page: 1, limit: 10000 });
        setMyData(res.data!)
    }

    _index();
    const _getUsersEnum = async () => {
      const data: RequestOptionsType[] = [];
      if (admins.length === 0) {
        const res = await getUsersEnum({ foo: 1 });
        for (const item of res.data!) {
          data.push({
            label: item.name,
            value: item.id,
          });
        }
        setAdmins(data);
        return data;
      } else {
        return admins;
      }
    };
    _getUsersEnum();
    
    return () => {
      return;
    };
  }, [loading]);

  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };
  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };
  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as dayjs.Dayjs, 'day') &&
      rangePickerValue[1].isSame(value[1] as dayjs.Dayjs, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  let salesPieData;

  if (salesType === 'all') {
    salesPieData = data?.salesTypeData;
  } else {
    salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
  }

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: '操作一',
            },
            {
              key: '2',
              label: '操作二',
            },
          ],
        }}
        placement="bottomRight"
      >
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );
  const handleChangeSalesType = (e: RadioChangeEvent) => {
    setSalesType(e.target.value);
  };
  const handleTabChange = (key: string) => {
    setCurrentTabKey(key);
  };
  const activeKey = currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || '';
  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          {/*今日数据*/}
          <IntroduceRow loading={loading} today={myData?.today} yesterday={myData?.yesterday} todayHour={myData?.todayHour} />
        </Suspense>

        <Row
          gutter={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              {/*催回率*/}
              <RegisterLine
                dropdownGroup={dropdownGroup}
                loading={loading}
                last30AdminDay={myData?.last30AdminDay || []}
                last30Day={myData?.last30Day || []}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              {/*总案件，日志，电话，催回*/}
              <RiskAxes
                loading={loading}
                last30Day={myData?.last30Day || []}
              />
            </Suspense>
          </Col>
        </Row>



















        <Suspense fallback={null} >
          {/*催收*/}
          <SalesCard
            rangePickerValue={rangePickerValue}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
            admins={admins}
            last30AdminDay={myData?.last30AdminDay || []}
          />
        </Suspense>

        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >

          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              {/*字段拒绝率*/}
              <RiskFields
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <Overdue2
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />

            </Suspense>
          </Col>
        </Row>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <Reloan
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <OverdueDays
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row>

      </>
    </GridContent>
  );
};
export default Analysis;

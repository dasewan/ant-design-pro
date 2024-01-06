import type { TableListPagination } from '@/pages/Borrow/BorrowList/data';
import { DEVICE_NODE } from '@/pages/enums';
import { US_DEVICE_NODE } from '@/pages/enumsUs';
import { getAdminV1GLPhotosId as show2 } from '@/services/ant-design-pro/GLPhoto';
import { getAdminV1HCDevices as index1 } from '@/services/ant-design-pro/HCDevice';
import { getAdminV1HDDynamicDevices as index } from '@/services/ant-design-pro/HDDynamicDevice';
import { useIntl } from '@@/exports';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Card, ConfigProvider, Descriptions } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'umi';

export type TableListItem = API.HDDynamicDevice;
export type DescriptionItem = API.HCDevice;
export type Description2Item = API.GLPhoto;

const DeviceDetail: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const currentLanguage = locale!.locale;
  const params2 = useParams<{ id: string; userId: string }>();
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [data1Source, setData1Source] = useState<DescriptionItem[]>([]);
  const [description2DataSource, setDescription2DataSource] = useState<Description2Item>();

  useEffect(() => {
    /** table */
    const _index = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res1 = await index1({ page: 1, limit: 10000, a_user_id: params2.userId });
      setData1Source(res1.data!);
      // @ts-ignore
      const res = await index({ page: 1, limit: 10000, a_user_id: params2.userId });
      setDataSource(res.data!);
      const res3 = await show2({ id: parseInt(params2.userId) });
      setDescription2DataSource(res3.data);
      return {
        data: res.data,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: res.success,
        // 不传会使用 data 的长度，如果是分页一定要传
        total: res.total,
      };
    };
    _index();
  }, [params2.id]);
  const columns1: ProColumns<DescriptionItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.e_n_max_md5', defaultMessage: '' }),
      dataIndex: 'e_n_max_md5',
      key: 'e_n_max_md5',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.deviceID', defaultMessage: '' }),
      dataIndex: 'deviceID',
      key: 'deviceID',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.isRoot', defaultMessage: '' }),
      dataIndex: 'isRoot',
      key: 'isRoot',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.version', defaultMessage: '' }),
      dataIndex: 'version',
      key: 'version',
      width: 180,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.board', defaultMessage: '' }),
      dataIndex: 'board',
      key: 'board',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.bootloader', defaultMessage: '' }),
      dataIndex: 'bootloader',
      key: 'bootloader',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.brand', defaultMessage: '' }),
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.device', defaultMessage: '' }),
      dataIndex: 'device',
      key: 'device',
      render: (text) => <div style={{ whiteSpace: 'nowrap' }}>{text}</div>,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.display', defaultMessage: '' }),
      dataIndex: 'display',
      key: 'display',
      render: (text) => <div style={{ whiteSpace: 'nowrap' }}>{text}</div>,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.fingerprint', defaultMessage: '' }),
      dataIndex: 'fingerprint',
      key: 'fingerprint',
      render: (text) => <div style={{ whiteSpace: 'nowrap' }}>{text}</div>,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.hardware', defaultMessage: '' }),
      dataIndex: 'hardware',
      key: 'hardware',
      render: (text) => <div style={{ whiteSpace: 'nowrap' }}>{text}</div>,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.host', defaultMessage: '' }),
      dataIndex: 'host',
      key: 'host',
      render: (text) => <div style={{ whiteSpace: 'nowrap' }}>{text}</div>,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.id2', defaultMessage: '' }),
      dataIndex: 'id2',
      key: 'id2',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.manufacturer', defaultMessage: '' }),
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.model', defaultMessage: '' }),
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.product', defaultMessage: '' }),
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.type', defaultMessage: '' }),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.isPhysicalDevice', defaultMessage: '' }),
      dataIndex: 'isPhysicalDevice',
      key: 'isPhysicalDevice',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.Device.serialNumber', defaultMessage: '' }),
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
      // @ts-ignore
      dataIndex: 'created_at',
      render: (__, value) => {
        // @ts-ignore
        return moment(value.created_at).format('YYYY-MM-DD HH:mm');
      },
    },
  ];
  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.Borrow.DynamicDevice.e_node', defaultMessage: '' }),
      dataIndex: 'e_node',
      key: 'e_node',
      valueEnum: currentLanguage === 'zh-cn' ? DEVICE_NODE : US_DEVICE_NODE,
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.DynamicDevice.latitude', defaultMessage: '' }),
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.DynamicDevice.longitude', defaultMessage: '' }),
      dataIndex: 'longitude',
      key: 'longitude',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.DynamicDevice.altitude', defaultMessage: '' }),
      dataIndex: 'altitude',
      key: 'altitude',
      render: (_, item) => Math.floor(parseFloat(item.altitude ?? '0')),
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.DynamicDevice.ip', defaultMessage: '' }),
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.macAddress',
        defaultMessage: '',
      }),
      dataIndex: 'macAddress',
      key: 'macAddress',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.connectionType',
        defaultMessage: '',
      }),
      dataIndex: 'connectionType',
      key: 'connectionType',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.DynamicDevice.hostCount', defaultMessage: '' }),
      dataIndex: 'hostCount',
      key: 'hostCount',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.DynamicDevice.ssid', defaultMessage: '' }),
      dataIndex: 'ssid',
      key: 'ssid',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.geo_location_country',
        defaultMessage: '',
      }),
      dataIndex: 'geo_location_country',
      key: 'geo_location_country',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.geo_location_state',
        defaultMessage: '',
      }),
      dataIndex: 'geo_location_state',
      key: 'geo_location_state',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.geo_location_city',
        defaultMessage: '',
      }),
      dataIndex: 'geo_location_city',
      key: 'geo_location_city',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.geo_location_address',
        defaultMessage: '',
      }),
      dataIndex: 'geo_location_address',
      key: 'geo_location_address',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.ip_location_country',
        defaultMessage: '',
      }),
      dataIndex: 'ip_location_country',
      key: 'ip_location_country',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.ip_location_state',
        defaultMessage: '',
      }),
      dataIndex: 'ip_location_state',
      key: 'ip_location_state',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.ip_location_city',
        defaultMessage: '',
      }),
      dataIndex: 'ip_location_city',
      key: 'ip_location_city',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.ip_location_address',
        defaultMessage: '',
      }),
      dataIndex: 'ip_location_address',
      key: 'ip_location_address',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.DynamicDevice.ip_lat', defaultMessage: '' }),
      dataIndex: 'ip_lat',
      key: 'ip_lat',
    },
    {
      title: intl.formatMessage({ id: 'pages.Borrow.DynamicDevice.ip_lon', defaultMessage: '' }),
      dataIndex: 'ip_lon',
      key: 'ip_lon',
    },
    {
      title: intl.formatMessage({
        id: 'pages.Borrow.DynamicDevice.ip_gps_distance',
        defaultMessage: '',
      }),
      dataIndex: 'ip_gps_distance',
      key: 'ip_gps_distance',
    },
    {
      title: intl.formatMessage({ id: 'pages.common.created_at', defaultMessage: '' }),
      // @ts-ignore
      dataIndex: 'created_at',
      render: (__, value) => {
        // @ts-ignore
        return moment(value.created_at).format('YYYY-MM-DD HH:mm');
      },
    },
  ];
  return (
    <>
      <Card
        title={intl.formatMessage({ id: 'pages.Borrow.Device', defaultMessage: '' })}
        bodyStyle={{ padding: 0 }}
      >
        <ProTable<TableListItem, TableListPagination>
          revalidateOnFocus={false}
          rowKey="id"
          search={false}
          dataSource={data1Source}
          columns={columns1}
          postData={(data: any[]) => {
            return data;
          }}
          scroll={{ x: '100%' }}
          pagination={{
            pageSize: 10,
          }}
          options={false}
          toolBarRender={false}
        />
      </Card>
      <Card
        title={intl.formatMessage({ id: 'pages.Borrow.DynamicDevice', defaultMessage: '' })}
        bodyStyle={{ padding: 0 }}
      >
        <ProTable<TableListItem, TableListPagination>
          revalidateOnFocus={false}
          rowKey="id"
          search={false}
          dataSource={dataSource}
          columns={columns}
          postData={(data: any[]) => {
            return data;
          }}
          scroll={{ x: '50%' }}
          pagination={{
            pageSize: 10,
          }}
          options={false}
          toolBarRender={false}
        />
      </Card>
      <Card
        title={intl.formatMessage({ id: 'pages.Borrow.Photo', defaultMessage: '' })}
        bodyStyle={{ padding: 0 }}
      >
        <Descriptions bordered>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.Borrow.Photo.one_day_ago_count',
              defaultMessage: '',
            })}
          >
            {description2DataSource?.one_day_ago_count}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.Borrow.Photo.one_week_ago_count',
              defaultMessage: '',
            })}
          >
            {description2DataSource?.one_week_ago_count}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.Borrow.Photo.one_month_ago_count',
              defaultMessage: '',
            })}
          >
            {description2DataSource?.one_month_ago_count}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'pages.Borrow.Photo.one_year_ago_count',
              defaultMessage: '',
            })}
          >
            {description2DataSource?.one_year_ago_count}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default DeviceDetail;

import {
  DeviceFieldLabels,
  DynamicDeviceFieldIndex,
  DynamicDeviceFieldLabels,
  PhotoFieldLabels,
} from '@/pages/Borrow/BorrowList/components/service';
import type { TableListPagination } from '@/pages/Borrow/BorrowList/data';
import { getAdminV1GLPhotosId as show2 } from '@/services/ant-design-pro/GLPhoto';
import { getAdminV1HCDevicesId as show } from '@/services/ant-design-pro/HCDevice';
import { getAdminV1HDDynamicDevices as index } from '@/services/ant-design-pro/HDDynamicDevice';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Card, Descriptions } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';

export type FormProps = {};
export type TableListItem = API.HDDynamicDevice;
export type DescriptionItem = API.HCDevice;
export type Description2Item = API.GLPhoto;

const DeviceDetail: React.FC<FormProps> = () => {
  const params2 = useParams<{ id: string; userId: string }>();
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [descriptionDataSource, setDescriptionDataSource] = useState<DescriptionItem>();
  const [description2DataSource, setDescription2DataSource] = useState<Description2Item>();

  useEffect(() => {
    /** table */
    const _index = async () => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      // @ts-ignore
      const res = await index({ page: 1, limit: 10000, a_user_id: params2.userId });
      setDataSource(res.data!);
      const res2 = await show({ id: parseInt(params2.userId) });
      setDescriptionDataSource(res2.data);
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

  const columns: ProColumns<TableListItem>[] = [
    {
      title: DynamicDeviceFieldLabels.e_node,
      dataIndex: DynamicDeviceFieldIndex.e_node,
    },
    {
      title: DynamicDeviceFieldLabels.f_urge_user_id,
      dataIndex: DynamicDeviceFieldIndex.f_urge_user_id,
    },
    {
      title: DynamicDeviceFieldLabels.latitude,
      dataIndex: DynamicDeviceFieldIndex.latitude,
    },
    {
      title: DynamicDeviceFieldLabels.longitude,
      dataIndex: DynamicDeviceFieldIndex.longitude,
    },
    {
      title: DynamicDeviceFieldLabels.altitude,
      dataIndex: DynamicDeviceFieldIndex.altitude,
    },
    {
      title: DynamicDeviceFieldLabels.geo_location_country,
      dataIndex: DynamicDeviceFieldIndex.geo_location_country,
      render: (__, value) => {
        return (
          value.geo_location_country +
          '|' +
          value.geo_location_state +
          '|' +
          value.geo_location_city +
          '|' +
          value.geo_location_address
        );
      },
    },
    {
      title: DynamicDeviceFieldLabels.connectivityType,
      dataIndex: DynamicDeviceFieldIndex.connectivityType,
    },
    {
      title: DynamicDeviceFieldLabels.ip,
      dataIndex: DynamicDeviceFieldIndex.ip,
    },
    {
      title: DynamicDeviceFieldLabels.ip_location_country,
      dataIndex: DynamicDeviceFieldIndex.ip_location_country,
      render: (__, value) => {
        return (
          value.ip_location_country +
          '|' +
          value.ip_location_state +
          '|' +
          value.ip_location_city +
          '|' +
          value.ip_location_address
        );
      },
    },
    {
      title: DynamicDeviceFieldLabels.macAddress,
      dataIndex: DynamicDeviceFieldIndex.macAddress,
    },
    {
      title: DynamicDeviceFieldLabels.connectionType,
      dataIndex: DynamicDeviceFieldIndex.connectionType,
    },
    {
      title: DynamicDeviceFieldLabels.hostCount,
      dataIndex: DynamicDeviceFieldIndex.hostCount,
    },
    {
      title: DynamicDeviceFieldLabels.ssid,
      dataIndex: DynamicDeviceFieldIndex.ssid,
    },
    {
      title: DynamicDeviceFieldLabels.battery,
      dataIndex: DynamicDeviceFieldIndex.battery,
    },
    {
      title: DynamicDeviceFieldLabels.operator_name,
      dataIndex: DynamicDeviceFieldIndex.operator_name,
    },
    {
      title: DynamicDeviceFieldLabels.operator_country_code,
      dataIndex: DynamicDeviceFieldIndex.operator_country_code,
    },
    {
      title: DynamicDeviceFieldLabels.language_code,
      dataIndex: DynamicDeviceFieldIndex.language_code,
    },
    {
      title: DynamicDeviceFieldLabels.country_code,
      dataIndex: DynamicDeviceFieldIndex.country_code,
    },
    {
      title: DynamicDeviceFieldLabels.created_at,
      // @ts-ignore
      dataIndex: DynamicDeviceFieldIndex.created_at,
      render: (__, value) => {
        // @ts-ignore
        return moment(value.created_at).format('YYYY-MM-DD HH:mm');
      },
    },
  ];
  return (
    <>
      <Card title="设备信息" bodyStyle={{ padding: 0 }}>
        <Descriptions bordered>
          <Descriptions.Item label={DeviceFieldLabels.version}>
            {descriptionDataSource?.version}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.board}>
            {descriptionDataSource?.board}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.bootloader}>
            {descriptionDataSource?.bootloader}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.brand}>
            {descriptionDataSource?.brand}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.device}>
            {descriptionDataSource?.device}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.display}>
            {descriptionDataSource?.display}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.fingerprint}>
            {descriptionDataSource?.fingerprint}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.hardware}>
            {descriptionDataSource?.hardware}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.host}>
            {descriptionDataSource?.host}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.id2}>
            {descriptionDataSource?.id2}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.manufacturer}>
            {descriptionDataSource?.manufacturer}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.model}>
            {descriptionDataSource?.model}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.product}>
            {descriptionDataSource?.product}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.type}>
            {descriptionDataSource?.type}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.isPhysicalDevice}>
            {descriptionDataSource?.isPhysicalDevice}
          </Descriptions.Item>
          <Descriptions.Item label={DeviceFieldLabels.serialNumber}>
            {descriptionDataSource?.serialNumber}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="设备动态信息" bodyStyle={{ padding: 0 }}>
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
            pageSize: 5,
          }}
          toolBarRender={() => [
            <span key={2} style={{ color: 'red' }}>
              GPS 面积：30
            </span>,
          ]}
        />
      </Card>
      <Card title="相册信息" bodyStyle={{ padding: 0 }}>
        <Descriptions bordered>
          <Descriptions.Item label={PhotoFieldLabels.one_day_ago_count}>
            {description2DataSource?.one_day_ago_count}
          </Descriptions.Item>
          <Descriptions.Item label={PhotoFieldLabels.one_week_ago_count}>
            {description2DataSource?.one_week_ago_count}
          </Descriptions.Item>
          <Descriptions.Item label={PhotoFieldLabels.one_month_ago_count}>
            {description2DataSource?.one_month_ago_count}
          </Descriptions.Item>
          <Descriptions.Item label={PhotoFieldLabels.one_year_ago_count}>
            {description2DataSource?.one_year_ago_count}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default DeviceDetail;

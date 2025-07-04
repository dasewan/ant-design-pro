import {
  getAdminV1DACollectionKpis as index,
  putAdminV1DACollectionKpisId as update,
} from '@/services/ant-design-pro/DACollectionKpi';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProForm, ProFormSelect } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { message, Modal } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { KpiFieldIndex, KpiFieldLabels } from '../service';
import {useIntl} from "@@/exports";
export type FormValueType = Partial<API.DACollectionKpi>;
export type FormRecord = API.DACollectionKpi;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  collectionStageId: number;
  collectionAgencyId: number;
  collectionAgencies: RequestOptionsType[];
  collectionStages: RequestOptionsType[];
  // admins: RequestOptionsType[];
};

/**
 *
 * @param props
 * @constructor
 */
const KpiForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();
  const [tableData, setTableData] = useState<API.DACollectionKpi[]>([]);
  const [table2Data, setTable2Data] = useState<API.DACollectionKpi[]>([]);
  const intl = useIntl();

  const columns: ProColumns<API.DACollectionKpi>[] = [

    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.d_level', defaultMessage: '' }),
      dataIndex: 'd_level',
      key: 'd_level',
      valueType: 'select',
      request: async () => {
        return [
          { label: 'Lv-1', value: 1 },
          { label: 'Lv-2', value: 2 },
          { label: 'Lv-3', value: 3 },
          { label: 'Lv-4', value: 4 },
        ];
      },
      editable: () => {
        return false;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.e_collection_amount_begin_rate', defaultMessage: '' }),
      dataIndex: 'e_collection_amount_begin_rate',
      key: 'e_collection_amount_begin_rate',
      valueType: 'percent',
      formItemProps: {
        rules: [
          {
            required: true,
            message: `${KpiFieldLabels.e_collection_amount_begin_rate}是必填项`,
          },
        ],
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.f_collection_amount_end_rate', defaultMessage: '' }),
      dataIndex: 'f_collection_amount_end_rate',
      key: 'f_collection_amount_end_rate',
      valueType: 'percent',
      formItemProps: {
        rules: [
          {
            required: true,
            message: `${KpiFieldLabels.f_collection_amount_end_rate}是必填项`,
          },
        ],
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.g_commission_rate', defaultMessage: '' }),
      dataIndex: 'g_commission_rate',
      key: 'g_commission_rate',
      valueType: 'percent',
      formItemProps: {
        rules: [
          {
            required: true,
            message: `${KpiFieldLabels.g_commission_rate}是必填项`,
          },
        ],
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.r_reach_day_bonus', defaultMessage: '' }),
      dataIndex: 'r_reach_day_bonus',
      key: 'r_reach_day_bonus',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.h_additional_1_days', defaultMessage: '' }),
      dataIndex: 'h_additional_1_days',
      key: 'h_additional_1_days',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.i_addition_2_bonus', defaultMessage: '' }),
      dataIndex: 'i_addition_1_bonus',
      key: 'i_addition_1_bonus',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.j_additional_2_days', defaultMessage: '' }),
      dataIndex: 'j_additional_2_days',
      key: 'j_additional_2_days',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.k_addition_2_bonus', defaultMessage: '' }),
      dataIndex: 'k_addition_2_bonus',
      key: 'k_addition_2_bonus',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.l_additional_3_days', defaultMessage: '' }),
      dataIndex: 'l_additional_3_days',
      key: 'l_additional_3_days',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.m_addition_3_bonus', defaultMessage: '' }),
      dataIndex: 'm_addition_3_bonus',
      key: 'm_addition_3_bonus',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.n_additional_4_days', defaultMessage: '' }),
      dataIndex: 'n_additional_4_days',
      key: 'n_additional_4_days',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.s_addition_4_bonus', defaultMessage: '' }),
      dataIndex: 's_addition_4_bonus',
      key: 's_addition_4_bonus',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.o_exceeds_days', defaultMessage: '' }),
      dataIndex: 'o_exceeds_days',
      key: 'o_exceeds_days',
      valueType: 'digit',
    },
    {
      title: intl.formatMessage({ id: 'pages.DACollectionKpi.p_exceeds_penalty', defaultMessage: '' }),
      dataIndex: 'p_exceeds_penalty',
      key: 'p_exceeds_penalty',
      valueType: 'digit',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: API.DACollectionKpi, index, action) => {
        return [
          <a
            key="edit"
            onClick={() => {
              // @ts-ignore
              action?.startEditable(record.d_level);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  /**
   * 提交渠道
   * @param values
   */
  const onFinish = async (values: FormValueType) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'pages.common.editIng', defaultMessage: '正在配置' }),
    );
    if (moment().diff(currentTableListItemMoment) > 3000000) {
      hide();
      message.error(intl.formatMessage({ id: 'pages.common.editExpired', defaultMessage: '' }));
      return false;
    }
    try {
      values.a_collection_stage_id = props.collectionStageId;
      values.b_collection_agency_id = props.collectionAgencyId;
      console.log('values', values);
      // @ts-ignore
      const res = await update({ id: 0, ...values });
      if (!res.success) {
        message.error(res.message);
        return false;
      }
      hide();
      message.success(
        intl.formatMessage({ id: 'pages.common.editSuccess', defaultMessage: '配置成功' }),
      );
      return true;
    } catch (error) {
      hide();
      message.error(
        intl.formatMessage({ id: 'pages.common.editFailed', defaultMessage: '配置失败请重试！' }),
      );
      return false;
    }
  };

  // @ts-ignore
  const BlueTableHeader = ({ children }) => (
    <th style={{ backgroundColor: '#66CCCC' }}>{children}</th>
  );
  const onChange2 = () => {
    return Modal.warning({
      title: '权限警告',
      content:
        '您当前登录帐号不是催收机构管理员机构，原则上小组规则应该由催收机构管理员编辑，建议您放弃修改，或者您可以忽视此警告继续编辑',
    });
  };

  function validate(arr: API.DACollectionKpi[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
      if (
        arr[i].f_collection_amount_end_rate! <= arr[i].e_collection_amount_begin_rate! ||
        arr[i + 1].e_collection_amount_begin_rate! <= arr[i].f_collection_amount_end_rate!
      ) {
        return false;
      }
    }
    return true;
  }

  return (
    <ModalForm<FormRecord>
      open={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onOpenChange={(visible) => {
        formRef.current?.resetFields();
        if (!visible) {
          props.onCancel();
        }
      }}
      width={1500}
      // @ts-ignore
      request={async () => {
        // @ts-ignore
        const res = await index({
          foo: 1,
          a_collection_stage_id: props.collectionStageId,
          b_collection_agency_id: props.collectionAgencyId,
        });
        setCurrentTableListItemMoment(moment());
        if (res.data!.length === 0) {
          // @ts-ignore
          res.data!.new_kpis = [
            {
              d_level: 1,
              e_collection_amount_begin_rate: 0,
              f_collection_amount_end_rate: 0,
              g_commission_rate: 0,
              h_additional_1_days:0,
              i_addition_1_bonus:0,
              j_additional_2_days:0,
              k_addition_2_bonus:0,
              l_additional_3_days:0,
              m_addition_3_bonus:0,
              n_additional_days:0,
              o_exceeds_days:0,
              p_exceeds_penalty:0,
              r_reach_day_bonus:0,
            },
            {
              d_level: 2,
              e_collection_amount_begin_rate: 0,
              f_collection_amount_end_rate: 0,
              g_commission_rate: 0,
              h_additional_1_days:0,
              i_addition_1_bonus:0,
              j_additional_2_days:0,
              k_addition_2_bonus:0,
              l_additional_3_days:0,
              m_addition_3_bonus:0,
              n_additional_days:0,
              o_exceeds_days:0,
              p_exceeds_penalty:0,
              r_reach_day_bonus:0,
            },
            {
              d_level: 3,
              e_collection_amount_begin_rate: 0,
              f_collection_amount_end_rate: 0,
              g_commission_rate: 0,
              h_additional_1_days:0,
              i_addition_1_bonus:0,
              j_additional_2_days:0,
              k_addition_2_bonus:0,
              l_additional_3_days:0,
              m_addition_3_bonus:0,
              n_additional_days:0,
              o_exceeds_days:0,
              p_exceeds_penalty:0,
              r_reach_day_bonus:0,
            },
            {
              d_level: 4,
              e_collection_amount_begin_rate: 0,
              f_collection_amount_end_rate: 0,
              g_commission_rate: 0,
              h_additional_1_days:0,
              i_addition_1_bonus:0,
              j_additional_2_days:0,
              k_addition_2_bonus:0,
              l_additional_3_days:0,
              m_addition_3_bonus:0,
              n_additional_days:0,
              o_exceeds_days:0,
              p_exceeds_penalty:0,
              r_reach_day_bonus:0,
            },
          ];
          // @ts-ignore
          res.data!.old_kpis = [
            {
              d_level: 1,
              e_collection_amount_begin_rate: 0,
              f_collection_amount_end_rate: 0,
              g_commission_rate: 0,
            },
            {
              d_level: 2,
              e_collection_amount_begin_rate: 0,
              f_collection_amount_end_rate: 0,
              g_commission_rate: 0,
            },
            {
              d_level: 3,
              e_collection_amount_begin_rate: 0,
              f_collection_amount_end_rate: 0,
              g_commission_rate: 0,
            },
          ];
        } else {
          // @ts-ignore
          res.data!.new_kpis = res.data!.filter((item) => item.c_type === 1);
          // @ts-ignore
          res.data!.old_kpis = res.data!.filter((item) => item.c_type === 2);
        }
        // @ts-ignore
        res.data!.a_collection_stage_id = props.collectionStageId;
        // @ts-ignore
        res.data!.b_collection_agency_id = props.collectionAgencyId;
        // @ts-ignore
        setTableData(res.data.new_kpis);
        // @ts-ignore
        setTable2Data(res.data.old_kpis);
        return res.data;
      }}
      formRef={formRef}
      onFinish={async (formData) => {
        if (!validate(tableData)) {
          message.error('等级催回率验证错误！');
          return;
        }
        // if (!validate(table2Data)) {
        //   message.error('等级催回率验证错误！');
        //   return;
        // }
        // @ts-ignore
        formData.new_kpis = JSON.stringify(tableData);
        // @ts-ignore
        // formData.old_kpis = JSON.stringify(table2Data);
        const success = await onFinish(formData);
        if (success) {
          return props.onSubmit(success);
        }
      }}
      params={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      initialValues={{
        l_type: 1,
        o_send_email: 1,
      }}
    >
      <ProFormSelect
        name="a_collection_stage_id"
        label="催收阶段"
        request={async () => props.collectionStages}
        disabled={true}
      />
      <ProFormSelect
        name="b_collection_agency_id"
        label="催收机构"
        request={async () => props.collectionAgencies}
        disabled={true}
      />

      <ProForm.Item name="new_kpis" label="新案件催收规则">
        <EditableProTable<API.DACollectionKpi>
          columns={columns}
          rowKey="d_level"
          components={{
            header: {
              cell: BlueTableHeader,
            },
          }}
          onChange={(nestedTableData) => {
            // @ts-ignore
            setTableData(nestedTableData);
          }}
          editable={{
            type: 'single',
            onlyAddOneLineAlertMessage: '111',
            // @ts-ignore
            // onSave: onChange2,
            actionRender: (row, config, defaultDom) => {
              return [defaultDom.save, defaultDom.cancel];
            },
          }}
          recordCreatorProps={false}
        />
      </ProForm.Item>
      {/*<ProForm.Item name="old_kpis" label="旧案件和部分催回催收规则">
        <EditableProTable<API.DACollectionKpi>
          columns={columns}
          rowKey="d_level"
          components={{
            header: {
              cell: BlueTableHeader,
            },
          }}
          onChange={(nestedTableData) => {
            // @ts-ignore
            setTable2Data(nestedTableData);
          }}
          editable={{
            type: 'single',
            onlyAddOneLineAlertMessage: '111',
            // @ts-ignore
            onSave: onChange2,
            actionRender: (row, config, defaultDom) => {
              return [defaultDom.save, defaultDom.cancel];
            },
          }}
        />
      </ProForm.Item>*/}
    </ModalForm>
  );
};

export default KpiForm;

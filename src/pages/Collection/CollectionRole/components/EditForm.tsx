import {
  ASSIGN_TYPE,
  ASSIGN_TYPE_ARRAY,
  COMMON_STATUS_INT_ARRAY,
  FLOW_TYPE_ARRAY,
} from '@/pages/enums';
import {
  getAdminV1GNCollectionStagesId as show,
  putAdminV1GNCollectionStagesId as update,
} from '@/services/ant-design-pro/GNCollectionStage';
import { BankOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { Alert, message, Modal } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import type { TableListItem } from '../data';
import styles from '../index.less';
import {
  AgencyRoleFieldIndex,
  AgencyRoleFieldLabels,
  FieldIndex,
  FieldLabels,
  GroupRoleFieldIndex,
  GroupRoleFieldLabels,
} from '../service';

export type FormValueType = Partial<TableListItem>;
export type FormRecord = TableListItem;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  id: number;
  collectionAgencies: RequestOptionsType[];
  collectionGroups: RequestOptionsType[];
  // admins: RequestOptionsType[];
};

interface NestedEditableTableProps {
  dataSource: API.NBCollectionGroupRole[];
  onChange: (record: API.NBCollectionGroupRole[]) => void;
  collectionGroups: RequestOptionsType[];
  collectionAgencyId: number;
}

const NestedEditableTable: React.FC<NestedEditableTableProps> = ({
  dataSource,
  onChange,
  collectionGroups,
  collectionAgencyId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {}, []);

  const columns: ProColumns<API.NBCollectionGroupRole>[] = [
    {
      title: GroupRoleFieldLabels.d_collection_group_id,
      dataIndex: GroupRoleFieldIndex.d_collection_group_id,
      valueType: 'select',
      request: async () => {
        return collectionGroups;
      },
      params: { timestamp: Math.random() },
      formItemProps: {
        rules: [
          { required: true, message: `${GroupRoleFieldLabels.d_collection_group_id}是必填项` },
        ],
      },
      className: styles.blue2,
    },
    {
      title: GroupRoleFieldLabels.e_collection_group_proportion,
      dataIndex: GroupRoleFieldIndex.e_collection_group_proportion,
      valueType: 'percent',
      formItemProps: {
        rules: [
          {
            required: true,
            message: `${GroupRoleFieldLabels.e_collection_group_proportion}是必填项`,
          },
        ],
      },
      className: styles.blue2,
    },
    {
      title: GroupRoleFieldLabels.f_assign_type,
      dataIndex: GroupRoleFieldIndex.f_assign_type,
      valueEnum: ASSIGN_TYPE,
      formItemProps: {
        rules: [{ required: true, message: `${GroupRoleFieldLabels.f_assign_type}是必填项` }],
      },
      className: styles.blue2,
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      className: styles.blue2,
      render: (_, record: API.NBCollectionGroupRole, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.id!);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // @ts-ignore
  const BlueTableHeader = ({ children }) => (
    <th style={{ backgroundColor: '#CCFFFF' }}>{children}</th>
  );

  const onChange2 = () => {
    return Modal.warning({
      title: '权限警告',
      content:
        '您当前登录帐号不是催收机构管理员机构，原则上小组规则应该由催收机构管理员编辑，建议您放弃修改，或者您可以忽视此警告继续编辑',
    });
  };
  const onDelete = () => {
    return Modal.warning({
      title: '权限警告',
      content:
        '您当前登录帐号不是催收机构管理员机构，原则上小组规则应该由催收机构管理员编辑，建议您放弃修改，或者您可以忽视此警告继续编辑',
    });
  };
  const onEditChange = () => {};

  return (
    <>
      <ProForm.Item
        name={'a_a_a_a_a_n_b_collection_group_roles' + collectionAgencyId}
        initialValue={dataSource}
      >
        <EditableProTable<API.NBCollectionGroupRole>
          rowKey="id"
          columns={columns}
          components={{
            header: {
              cell: BlueTableHeader,
            },
          }}
          recordCreatorProps={{
            record: () => {
              return {
                id: parseInt((Math.random() * 1000000).toFixed(0)),
              };
            },
            creatorButtonText: '新增一个组',
            type: 'dashed',
            size: 'small',
            icon: <UsergroupAddOutlined />,
          }}
          // onChange={(nestedTableData) => handleNestedTableChange(nestedTableData, 1)}
          onChange={onChange}
          editable={{
            type: 'single',
            // @ts-ignore
            onChange: onEditChange,
            // @ts-ignore
            onSave: onChange2,
            // @ts-ignore
            onDelete: onDelete,
            deletePopconfirmMessage: '确定要删除这个催收小组吗？',
          }}
          tableRender={(_, dom) => (
            <div
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <div style={{ width: 10 }} />
              <div
                style={{
                  flex: 1,
                }}
              >
                {dom}
              </div>
            </div>
          )}
        />
      </ProForm.Item>
      <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Alert
          message="权限警告"
          description="您当前登录帐号不是催收机构管理员机构，原则上小组规则应该由催收机构管理员编辑，建议您撤销刚才的修改，或者您可以忽视此警告继续编辑，"
          type="error"
        />
      </Modal>
    </>
  );
};

/**
 *
 * @param props
 * @constructor
 */
const EditForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const [currentTableListItemMoment, setCurrentTableListItemMoment] = useState<moment.Moment>();
  const [oldRecord, setOldRecord] = useState<TableListItem>();
  const [tableData, setTableData] = useState<API.HFCollectionAgencyRole[]>([]);

  const columns: ProColumns<API.HFCollectionAgencyRole>[] = [
    {
      title: AgencyRoleFieldLabels.b_collection_agency_id,
      dataIndex: AgencyRoleFieldIndex.b_collection_agency_id,
      valueType: 'select',
      request: async () => {
        return props.collectionAgencies.filter(
          (item) => item.c_begin_collection_stage <= oldRecord!.id!,
        );
      },
      formItemProps: {
        rules: [
          { required: true, message: `${AgencyRoleFieldLabels.b_collection_agency_id}是必填项` },
        ],
      },
    },
    {
      title: AgencyRoleFieldLabels.c_collection_agency_proportion,
      dataIndex: AgencyRoleFieldIndex.c_collection_agency_proportion,
      valueType: 'percent',
      formItemProps: {
        rules: [
          {
            required: true,
            message: `${AgencyRoleFieldLabels.c_collection_agency_proportion}是必填项`,
          },
        ],
      },
    },
    {
      title: AgencyRoleFieldLabels.d_assign_type,
      dataIndex: AgencyRoleFieldIndex.d_assign_type,
      valueEnum: ASSIGN_TYPE,
      formItemProps: {
        rules: [{ required: true, message: `${AgencyRoleFieldLabels.d_assign_type}是必填项` }],
      },
    },

    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: API.HFCollectionAgencyRole, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.id!);
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
    const hide = message.loading('正在配置');
    if (moment().diff(currentTableListItemMoment) > 3000000) {
      hide();
      message.error('配置超时！');
      return false;
    }
    try {
      if (props.id > 0) {
        delete values.a_name;
        console.log('values', values);
        // @ts-ignore
        const res = await update({ id: props.id, ...values });
        if (!res.success) {
          message.error(res.message);
          return false;
        }
      }
      hide();
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };

  const handleNestedTableChange = (nestedTableData: API.NBCollectionGroupRole[], index: number) => {
    const newData = [...tableData];
    newData[index].a_a_a_a_a_n_b_collection_group_roles = nestedTableData;
    setTableData(newData);
  };
  const expandedRowRender2 = (record: API.HFCollectionAgencyRole, index: number) => {
    const nestedDataSource = record.a_a_a_a_a_n_b_collection_group_roles;
    const collectionGroups2 = props.collectionGroups.filter(
      (item) => item.c_collection_agency_id == record.b_collection_agency_id!,
    );
    return (
      <NestedEditableTable
        dataSource={nestedDataSource!}
        onChange={(updatedRecord) => {
          handleNestedTableChange(updatedRecord, index);
        }}
        collectionGroups={collectionGroups2}
        collectionAgencyId={record.b_collection_agency_id!}
      />
    );
  };
  // @ts-ignore
  const BlueTableHeader = ({ children }) => (
    <th style={{ backgroundColor: '#66CCCC' }}>{children}</th>
  );

  return (
    <ModalForm<FormRecord>
      visible={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onVisibleChange={(visible) => {
        formRef.current?.resetFields();
        if (!visible) {
          props.onCancel();
        }
      }}
      width={1400}
      // @ts-ignore
      request={async () => {
        if (props.id > 0) {
          const res = await show({ id: props.id });
          setCurrentTableListItemMoment(moment());
          setOldRecord(res.data);
          setTableData(res.data!.a_a_a_a_a_h_f_collection_agency_roles!);
          return res.data;
        } else {
          setCurrentTableListItemMoment(moment());
          setOldRecord({});
          return {};
        }
      }}
      formRef={formRef}
      onFinish={async (formData) => {
        console.log('Submitting data', tableData);
        console.log(formData);
        // @ts-ignore
        formData.a_a_a_a_a_h_f_collection_agency_roles = JSON.stringify(tableData);
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
      <ProFormText label={<>{FieldLabels.a_name}</>} name={FieldIndex.a_name} disabled={true} />
      <ProFormDigit
        label={<>{FieldLabels.c_start_day}</>}
        name={FieldIndex.c_start_day}
        min={-7}
        fieldProps={{ precision: 0 }}
      />
      <ProFormDigit
        label={<>{FieldLabels.d_end_day}</>}
        name={FieldIndex.d_end_day}
        fieldProps={{ precision: 0 }}
      />
      <ProFormRadio.Group
        label={<>{FieldLabels.b_flow_type}</>}
        name={FieldIndex.b_flow_type}
        radioType="button"
        options={FLOW_TYPE_ARRAY}
      />
      <ProFormRadio.Group
        label={<>{FieldLabels.g_assign_type}</>}
        name={FieldIndex.g_assign_type}
        radioType="button"
        options={ASSIGN_TYPE_ARRAY}
      />
      <ProFormRadio.Group
        label={<>{FieldLabels.e_status}</>}
        name={FieldIndex.e_status}
        radioType="button"
        options={COMMON_STATUS_INT_ARRAY}
      />
      <ProFormTextArea label={<>{FieldLabels.f_comment}</>} name={FieldIndex.f_comment} />
      <ProForm.Item name="a_a_a_a_a_h_f_collection_agency_roles" label="催收规则">
        <EditableProTable<API.HFCollectionAgencyRole>
          columns={columns}
          rowKey="id"
          expandable={{ expandedRowRender: expandedRowRender2 }}
          components={{
            header: {
              cell: BlueTableHeader,
            },
          }}
          onChange={(nestedTableData) => {
            setTableData(nestedTableData);
          }}
          recordCreatorProps={{
            record: () => {
              return {
                id: parseInt((Math.random() * 1000000).toFixed(0)),
              };
            },
            creatorButtonText: '新增一个机构',
            icon: <BankOutlined />,
          }}
          editable={{
            type: 'single',
            onlyAddOneLineAlertMessage: '111',
            actionRender: (row, config, defaultDom) => {
              return [defaultDom.save, defaultDom.delete || defaultDom.cancel];
            },
            deletePopconfirmMessage: '确定要删除这个催收机构吗？',
          }}
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default EditForm;

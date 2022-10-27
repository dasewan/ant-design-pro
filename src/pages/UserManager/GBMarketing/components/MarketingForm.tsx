import { storeGCMarketingHistories } from '@/pages/UserManager/GBMarketing/service';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import type { ProFieldRequestData } from '@ant-design/pro-utils';
import type { RequestOptionsType } from '@ant-design/pro-utils/lib/typing';
import { Col, Image, message, Row } from 'antd';
import React, { useRef, useState } from 'react';

export type FormValueType = Partial<API.GBMarketing>;
export type FormRecord = API.GBMarketing;
export type FormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: boolean) => Promise<void>;
  modalVisible: boolean;
  marketingIds: string;
};

/**
 *
 * @param props
 * @constructor
 */
const MarketingForm: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  /** 短信模版enum */
  const [smss, setSmss] = useState<RequestOptionsType[]>([]);
  /** 短信模版预览enum */
  const [smsViews, setSmsViews] = useState<RequestOptionsType[]>([]);
  /** 已选择的预览内容 */
  const [smsSelectedView, setSmsSelectedView] = useState<string>('');
  const [useViewCountShow, setUseViewCountShow] = useState<boolean>(false);
  /**
   * 开始营销
   * @param fields
   */
  const _handle = async (fields: FormValueType) => {
    const hide = message.loading('正在配置');
    // props.values.id
    try {
      await storeGCMarketingHistories({
        // @ts-ignore
        ids: props.marketingIds,
        ...fields,
      });
      hide();
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };

  /**
   * 查询短信enum
   */
  const _getSMSsEnum: ProFieldRequestData = async () => {
    if (smss.length == 0) {
      // const res = await getChannelsEnum({ foo: 1 });
      const data = [
        { label: '营销短信1', value: 1 },
        { label: '营销短信2', value: 2 },
        { label: '营销短信3', value: 3 },
        { label: '营销短信4', value: 4 },
      ];
      const data2 = [
        { label: '亲爱的Tom你好，您的授信额度已送达，点击http://www.baidu.com获取额度', value: 1 },
        { label: '亲爱的Tom你好，您的授信额度已送达，点击http://www.baidu.com获取额度2', value: 2 },
        { label: '亲爱的Tom你好，您的授信额度已送达，点击http://www.baidu.com获取额度3', value: 3 },
        { label: '亲爱的Tom你好，您的授信额度已送达，点击http://www.baidu.com获取额度4', value: 4 },
      ];
      setSmss(data);
      setSmsViews(data2);
      return data;
    } else {
      return smss;
    }
  };

  return (
    <ModalForm<FormRecord>
      visible={props.modalVisible}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onVisibleChange={(visible) => {
        formRef.current?.resetFields();
        if (!visible) {
          setSmsSelectedView('');
          setUseViewCountShow(false);
          props.onCancel();
        }
      }}
      formRef={formRef}
      onFinish={async (formData) => {
        const success = await _handle(formData);
        return props.onSubmit(success);
      }}
      params={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      initialValues={{
        l_type: 1,
        o_send_email: 1,
      }}
    >
      <ProFormSelect
        name="c_sms_templete_id"
        label="短信模版"
        request={_getSMSsEnum}
        fieldProps={{
          onChange: (value) => {
            // @ts-ignore
            setSmsSelectedView(
              smsViews!.find((item) => {
                return item.value == value;
              })?.label,
            );
          },
        }}
        placeholder="Please select a channel"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      {smsSelectedView != '' ? (
        <div>
          <Row>
            <Col span={4} style={{ textAlign: 'right' }}>
              短信模版预览：
            </Col>
            <Col span={14}>{smsSelectedView}</Col>
          </Row>
          <br />
        </div>
      ) : (
        ''
      )}
      <ProFormRadio.Group
        name="d_theme_id"
        label="主题"
        request={async () => [
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_1.jpg"
                alt="主题a"
              />
            ),
            value: '1',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_2.jpg"
                alt="主题a"
              />
            ),
            value: '2',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_3.jpg"
                alt="主题a"
              />
            ),
            value: '3',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_4.jpg"
                alt="主题a"
              />
            ),
            value: '4',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_5.jpg"
                alt="主题a"
              />
            ),
            value: '5',
          },
          {
            label: (
              <Image
                width={80}
                src="http://api.dasewan.cn/storage/marketing_theme/theme_6.jpg"
                alt="主题a"
              />
            ),
            value: '6',
          },
        ]}
        placeholder="Please select a channel"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormRadio.Group
        tooltip={<div>邮件模版和主题相似</div>}
        name="o_send_email"
        label="是否发送邮件"
        radioType="button"
        options={[
          {
            label: '发送邮件',
            value: 1,
          },
          {
            label: '不发送邮件',
            value: 2,
          },
        ]}
      />
      <ProFormRadio.Group
        tooltip={
          <div>
            未查看：在收到营销短信后，没有点开过链接查看的用户
            <br />
            已查看：点开过链接，但是没有注册
          </div>
        }
        name="l_type"
        label="目标用户"
        radioType="button"
        fieldProps={{
          onChange: (event) => {
            if (event.target.value == 3) {
              setUseViewCountShow(true);
            } else {
              setUseViewCountShow(false);
            }
          },
        }}
        options={[
          {
            label: '未注册',
            value: 3,
          },
          {
            label: '未查看',
            value: 4,
          },
          {
            label: '已查看',
            value: 5,
          },
        ]}
      />
      {useViewCountShow ? (
        <ProFormDigit
          label="查看次数"
          name="n_user_view_count"
          min={1}
          max={10}
          fieldProps={{ precision: 0 }}
        />
      ) : (
        ''
      )}
      <ProFormDateTimePicker
        name="h_begin_at"
        label="开始时间"
        rules={[{ required: true, message: 'Please select your reason!' }]}
      />
      <ProFormText
        // width="md"
        name="g_comment"
        label="备注"
        placeholder="请输入备注"
      />
    </ModalForm>
  );
};

export default MarketingForm;

import type { TableListItem } from '@/pages/Operation/BProduct/Detail/data';
import { QuestionOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Button, Descriptions, Modal, Tooltip } from 'antd';
import React from 'react';
import { fieldLabels } from '../service';

export type Props = {
  onOk: () => void;
  modalVisible: boolean;
  oldRecord?: TableListItem;
  record: TableListItem;
};

/**
 *
 * @param props
 * @constructor
 */
const OverviewModel: React.FC<Props> = (props) => {
  return (
    <Modal
      title="预览"
      open={props.modalVisible}
      onOk={props.onOk}
      onCancel={props.onOk}
      width="90%"
      style={{ top: 20 }}
      destroyOnClose={true}
      footer={[
        <Button key="submit" type="primary" onClick={props.onOk}>
          知道了
        </Button>,
      ]}
    >
      <Descriptions column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} bordered>
        {/*产品名称*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.b_name}
            </>
          }
        >
          {props.oldRecord?.b_name === props.record?.b_name || !props.oldRecord?.b_name ? (
            props.record?.b_name
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.b_name}
              <RightOutlined /> {props.record?.b_name}
            </span>
          )}
        </Descriptions.Item>
        {/*产品类型*/}
        <Descriptions.Item label={fieldLabels.o_type}>
          {props.oldRecord?.o_type === props.record?.o_type || !props.oldRecord?.o_type ? (
            props.record?.o_type === 1 ? (
              '真实产品'
            ) : props.record?.o_type === 3 ? (
              '贷超产品'
            ) : props.record?.o_type === 2 ? (
              '虚拟产品'
            ) : (
              ''
            )
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.o_type === 1
                ? '真实产品'
                : props.oldRecord?.o_type === 3
                ? '贷超产品'
                : props.record?.o_type === 2
                ? '虚拟产品'
                : ''}
              <RightOutlined />
              {props.record?.o_type === 1
                ? '真实产品'
                : props.record?.o_type === 3
                ? '贷超产品'
                : props.record?.o_type === 2
                ? '虚拟产品'
                : ''}
            </span>
          )}
        </Descriptions.Item>
        {/*产品链接*/}
        <Descriptions.Item label={fieldLabels.p_url}>
          {props.oldRecord?.p_url === props.record?.p_url || !props.oldRecord?.p_url ? (
            <Tooltip placement="top" title={props.record?.o_type !== 3 ? '-' : props.record?.p_url}>
              {props.record?.o_type !== 3 ? '-' : props.record?.p_url?.substring(0, 5)}
            </Tooltip>
          ) : (
            <span>
              <Badge status="error" />
              <Tooltip
                placement="top"
                title={props.oldRecord?.o_type !== 3 ? '-' : props.oldRecord?.p_url}
              >
                {props.oldRecord?.o_type !== 3 ? '-' : props.oldRecord?.p_url?.substring(0, 5)}
              </Tooltip>
              <RightOutlined />
              <Tooltip
                placement="top"
                title={props.record?.o_type !== 3 ? '-' : props.record?.p_url}
              >
                {props.record?.o_type !== 3 ? '-' : props.record?.p_url?.substring(0, 5)}
              </Tooltip>
            </span>
          )}
        </Descriptions.Item>
        {/*产品额度类型*/}
        <Descriptions.Item
          label={
            <>
              {fieldLabels.a_a_amount_type} &nbsp;&nbsp;
              <Tooltip placement="right" title={<>灵活额度:用户可借最大额度为授信额度</>}>
                <QuestionOutlined />
              </Tooltip>
            </>
          }
        >
          {props.oldRecord?.a_a_amount_type === props.record?.a_a_amount_type ||
          !props.oldRecord?.a_a_amount_type ? (
            props.record?.a_a_amount_type === 1 ? (
              '灵活额度'
            ) : props.record?.a_a_amount_type === 2 ? (
              '固定额度'
            ) : (
              ''
            )
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.a_a_amount_type === 1
                ? '灵活额度'
                : props.oldRecord?.a_a_amount_type === 2
                ? '固定额度'
                : ''}
              <RightOutlined />
              {props.record?.a_a_amount_type === 1
                ? '灵活额度'
                : props.record?.a_a_amount_type === 2
                ? '固定额度'
                : ''}
            </span>
          )}
        </Descriptions.Item>
        {/*每日可借数量*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.a_b_day_valid_count} &nbsp;&nbsp;
              <Tooltip placement="right" title="0表示不限制">
                <QuestionOutlined />{' '}
              </Tooltip>
            </>
          }
        >
          {props.oldRecord?.a_b_day_valid_count === props.record?.a_b_day_valid_count ||
          !props.oldRecord?.a_b_day_valid_count ? (
            props.record?.a_b_day_valid_count
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.a_b_day_valid_count}
              <RightOutlined /> {props.record?.a_b_day_valid_count}
            </span>
          )}
        </Descriptions.Item>
        {/*是否允许部分还款*/}
        <Descriptions.Item label={<>{fieldLabels.m_can_part_pay}</>}>
          {props.oldRecord?.m_can_part_pay === props.record?.m_can_part_pay ||
          !props.oldRecord?.m_can_part_pay ? (
            props.record?.m_can_part_pay === 'y' ? (
              '允许'
            ) : props.record?.m_can_part_pay === 'n' ? (
              '不允许'
            ) : (
              ''
            )
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.m_can_part_pay === 'y'
                ? '允许'
                : props.oldRecord?.m_can_part_pay === 'n'
                ? '不允许'
                : ''}
              <RightOutlined />
              {props.record?.m_can_part_pay === 'y'
                ? '允许'
                : props.record?.m_can_part_pay === 'n'
                ? '不允许'
                : ''}
            </span>
          )}
        </Descriptions.Item>
        {/*是否允许展期*/}
        <Descriptions.Item label={<>{fieldLabels.n_can_extend}</>}>
          {props.oldRecord?.n_can_extend === props.record?.n_can_extend ||
          !props.oldRecord?.n_can_extend ? (
            props.record?.n_can_extend === 'y' ? (
              '允许'
            ) : props.record?.n_can_extend === 'n' ? (
              '不允许'
            ) : (
              ''
            )
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.n_can_extend === 'y'
                ? '允许'
                : props.oldRecord?.n_can_extend === 'n'
                ? '不允许'
                : ''}
              <RightOutlined />
              {props.record?.n_can_extend === 'y'
                ? '允许'
                : props.record?.n_can_extend === 'n'
                ? '不允许'
                : ''}
            </span>
          )}
        </Descriptions.Item>
        {/*状态*/}
        <Descriptions.Item label={<>{fieldLabels.u_status}</>}>
          {props.oldRecord?.u_status === props.record?.u_status || !props.oldRecord?.u_status ? (
            props.record?.u_status === 'y' ? (
              '显示'
            ) : props.record?.u_status === 'n' ? (
              '隐藏'
            ) : (
              ''
            )
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.u_status === 'y'
                ? '显示'
                : props.oldRecord?.u_status === 'n'
                ? '隐藏'
                : ''}
              <RightOutlined />
              {props.record?.u_status === 'y'
                ? '显示'
                : props.record?.u_status === 'n'
                ? '隐藏'
                : ''}
            </span>
          )}
        </Descriptions.Item>
        {/*结算方式*/}
        <Descriptions.Item label={fieldLabels.f_settlement_type}>
          {props.oldRecord?.f_settlement_type === props.record?.f_settlement_type ||
          !props.oldRecord?.f_settlement_type ? (
            props.record?.f_settlement_type === 1 ? (
              '头收'
            ) : props.record?.f_settlement_type === 2 ? (
              '只头收服务费'
            ) : props.record?.f_settlement_type === 3 ? (
              '后收'
            ) : (
              ''
            )
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.f_settlement_type === 1
                ? '头收'
                : props.oldRecord?.f_settlement_type === 2
                ? '只头收服务费'
                : props.record?.f_settlement_type === 3
                ? '后收'
                : ''}
              <RightOutlined />
              {props.record?.f_settlement_type === 1
                ? '头收'
                : props.record?.f_settlement_type === 2
                ? '只头收服务费'
                : props.record?.f_settlement_type === 3
                ? '后收'
                : ''}
            </span>
          )}
        </Descriptions.Item>
        {/*产品额度*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.c_amount} &nbsp;&nbsp;
              <Tooltip placement="right" title="产品额度类型为固定额度才可用">
                <QuestionOutlined />
              </Tooltip>
            </>
          }
        >
          {props.oldRecord?.c_amount === props.record?.c_amount || !props.oldRecord?.c_amount ? (
            props.record?.c_amount
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.c_amount}
              <RightOutlined /> {props.record?.c_amount}
            </span>
          )}
        </Descriptions.Item>
        {/*产品期数*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.z_period} &nbsp;&nbsp;
              <Tooltip placement="right" title="输入1则不分期">
                <QuestionOutlined />
              </Tooltip>
            </>
          }
        >
          {props.oldRecord?.z_period === props.record?.z_period || !props.oldRecord?.z_period ? (
            props.record?.z_period
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.z_period}
              <RightOutlined /> {props.record?.z_period}
            </span>
          )}
        </Descriptions.Item>
        {/*产品周期*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.e_life} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.e_life === props.record?.e_life || !props.oldRecord?.e_life ? (
            props.record?.e_life
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.e_life}
              <RightOutlined /> {props.record?.e_life}
            </span>
          )}
        </Descriptions.Item>
        {/*利息*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.g_interest} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.g_interest === props.record?.g_interest ||
          !props.oldRecord?.g_interest ? (
            props.record?.g_interest
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.g_interest}
              <RightOutlined /> {props.record?.g_interest}
            </span>
          )}
        </Descriptions.Item>
        {/*服务费*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.h_service_fee_rate} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.h_service_fee_rate === props.record?.h_service_fee_rate ||
          !props.oldRecord?.h_service_fee_rate ? (
            props.record?.h_service_fee_rate
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.h_service_fee_rate}
              <RightOutlined /> {props.record?.h_service_fee_rate}
            </span>
          )}
        </Descriptions.Item>
        {/*罚息*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.i_overdue_rate} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.i_overdue_rate === props.record?.i_overdue_rate ||
          !props.oldRecord?.i_overdue_rate ? (
            props.record?.i_overdue_rate
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.i_overdue_rate}
              <RightOutlined /> {props.record?.i_overdue_rate}
            </span>
          )}
        </Descriptions.Item>
        {/*违约金费率*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.i_overdue_rate} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.j_violate_fee_rate === props.record?.j_violate_fee_rate ||
          !props.oldRecord?.j_violate_fee_rate ? (
            props.record?.j_violate_fee_rate
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.j_violate_fee_rate}
              <RightOutlined /> {props.record?.j_violate_fee_rate}
            </span>
          )}
        </Descriptions.Item>
        {/*展期费率*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.k_extend_rate} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.k_extend_rate === props.record?.k_extend_rate ||
          !props.oldRecord?.k_extend_rate ? (
            props.record?.k_extend_rate
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.k_extend_rate}
              <RightOutlined /> {props.record?.k_extend_rate}
            </span>
          )}
        </Descriptions.Item>
        {/*最低还款金额*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.l_min_pay} &nbsp;&nbsp;
            </>
          }
          span={3}
        >
          {props.oldRecord?.l_min_pay === props.record?.l_min_pay || !props.oldRecord?.l_min_pay ? (
            props.record?.l_min_pay
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.l_min_pay}
              <RightOutlined /> {props.record?.l_min_pay}
            </span>
          )}
        </Descriptions.Item>
        {/*解锁信用分*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.q_unlock_credit_fraction} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.q_unlock_credit_fraction === props.record?.q_unlock_credit_fraction ||
          !props.oldRecord?.q_unlock_credit_fraction ? (
            props.record?.q_unlock_credit_fraction
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.q_unlock_credit_fraction}
              <RightOutlined /> {props.record?.q_unlock_credit_fraction}
            </span>
          )}
        </Descriptions.Item>
        {/*最小结清次数*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.r_settled_times} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.r_settled_times === props.record?.r_settled_times ||
          !props.oldRecord?.r_settled_times ? (
            props.record?.r_settled_times
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.r_settled_times}
              <RightOutlined /> {props.record?.r_settled_times}
            </span>
          )}
        </Descriptions.Item>
        {/*最大逾期天数*/}
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.s_max_overdue_days} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.s_max_overdue_days === props.record?.s_max_overdue_days ||
          !props.oldRecord?.s_max_overdue_days ? (
            props.record?.s_max_overdue_days
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.s_max_overdue_days}
              <RightOutlined /> {props.record?.s_max_overdue_days}
            </span>
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <UserOutlined />
              &nbsp;&nbsp;{fieldLabels.t_max_overdue_times} &nbsp;&nbsp;
            </>
          }
        >
          {props.oldRecord?.t_max_overdue_times === props.record?.t_max_overdue_times ||
          !props.oldRecord?.t_max_overdue_times ? (
            props.record?.t_max_overdue_times
          ) : (
            <span>
              <Badge status="error" />
              {props.oldRecord?.t_max_overdue_times}
              <RightOutlined /> {props.record?.t_max_overdue_times}
            </span>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default OverviewModel;

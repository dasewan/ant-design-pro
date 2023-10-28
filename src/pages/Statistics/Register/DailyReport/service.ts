// @ts-ignore
/* eslint-disable */

export const FieldLabels = {
  id: 'id',
  a_date: '日期',
  b_register_count: '注册数',
  c_black_count: '黑名单数',
  d_white_count: '白名单数',
  e_grey_count: '灰名单数',
  f_certification_count: '认证数',
  g_machine_accept_count: '通过数',
  h_machine_refuse_count: '拒绝数',
  i_review_count: '复审数',
  j_review_accept_count: '复审通过',
  k_review_refuse_count: '复审拒绝',
  l_loan_count: '放款数',
  m_loan_period_count: '放款期数',
  n_loan_amount: '放款金额',
  o_re_loan_count: '复贷放款',
  p_re_loan_amount: '复贷放款金额',
  q_loan_fail_count: '放款失败',
  r_loan_intercept_count: '放款拦截',
  s_settled_count: '结清数',
  t_settled_period_count: '还款期数',
  u_repay_amount: '还款金额',
  v_re_repay_count: '复贷还款数',
  w_re_repay_amount: '复贷还款金额',
  x_repay_fail_count: '还款失败',
  y_extend_count: '展期数',
  z_extend_amount: '展期金额',
  a_a_reduce_count: '减免数',
  a_b_reduce_amount: '减免金额',
  a_c_collection_count: '入催数',
  a_d_collection_log_count: '催记数',
  a_e_collection_success_count: '催回数',
  a_f_collection_success_amount: '催回金额',
  a_g_otp_sms_count: 'otp数',
  a_h_notification_sms_count: '通知数',
  a_i_marketing_sms_count: '营销数',
  created_at: '创建时间',
  updated_at: '更新时间',
};
export const FieldIndex = {
  id: 'id',
  a_date: 'a_date',
  b_register_count: 'b_register_count',
  c_black_count: 'c_black_count',
  d_white_count: 'd_white_count',
  e_grey_count: 'e_grey_count',
  f_certification_count: 'f_certification_count',
  g_machine_accept_count: 'g_machine_accept_count',
  h_machine_refuse_count: 'h_machine_refuse_count',
  i_review_count: 'i_review_count',
  j_review_accept_count: 'j_review_accept_count',
  k_review_refuse_count: 'k_review_refuse_count',
  l_loan_count: 'l_loan_count',
  m_loan_period_count: 'm_loan_period_count',
  n_loan_amount: 'n_loan_amount',
  o_re_loan_count: 'o_re_loan_count',
  p_re_loan_amount: 'p_re_loan_amount',
  q_loan_fail_count: 'q_loan_fail_count',
  r_loan_intercept_count: 'r_loan_intercept_count',
  s_settled_count: 's_settled_count',
  t_settled_period_count: 't_settled_period_count',
  u_repay_amount: 'u_repay_amount',
  v_re_repay_count: 'v_re_repay_count',
  w_re_repay_amount: 'w_re_repay_amount',
  x_repay_fail_count: 'x_repay_fail_count',
  y_extend_count: 'y_extend_count',
  z_extend_amount: 'z_extend_amount',
  a_a_reduce_count: 'a_a_reduce_count',
  a_b_reduce_amount: 'a_b_reduce_amount',
  a_c_collection_count: 'a_c_collection_count',
  a_d_collection_log_count: 'a_d_collection_log_count',
  a_e_collection_success_count: 'a_e_collection_success_count',
  a_f_collection_success_amount: 'a_f_collection_success_amount',
  a_g_otp_sms_count: 'a_g_otp_sms_count',
  a_h_notification_sms_count: 'a_h_notification_sms_count',
  a_i_marketing_sms_count: 'a_i_marketing_sms_count',
  created_at: 'created_at',
  updated_at: 'updated_at',
};
type StatusOption = {
  label: string;
  value: string | number;
};
export const DIMENSIONS: StatusOption[] = [
  {
    label: '注册数',
    value: 'b_register_count',
  },
  {
    label: '黑名单数',
    value: 'c_black_count',
  },
  {
    label: '白名单数',
    value: 'd_white_count',
  },
  {
    label: '灰名单数',
    value: 'e_grey_count',
  },
  {
    label: '认证数',
    value: 'f_certification_count',
  },
  {
    label: '通过数',
    value: 'g_machine_accept_count',
  },
  {
    label: '拒绝数',
    value: 'h_machine_refuse_count',
  },
  {
    label: '复审数',
    value: 'i_review_count',
  },
  {
    label: '复审通过',
    value: 'j_review_accept_count',
  },
  {
    label: '复审拒绝',
    value: 'k_review_refuse_count',
  },
  {
    label: '放款数',
    value: 'l_loan_count',
  },
  {
    label: '放款期数',
    value: 'm_loan_period_count',
  },
  {
    label: '放款金额',
    value: 'n_loan_amount',
  },
  {
    label: '复贷放款',
    value: 'o_re_loan_count',
  },
  {
    label: '复贷放款金额',
    value: 'p_re_loan_amount',
  },
  {
    label: '放款失败',
    value: 'q_loan_fail_count',
  },
  {
    label: '放款拦截',
    value: 'r_loan_intercept_count',
  },
  {
    label: '结清数',
    value: 's_settled_count',
  },
  {
    label: '还款期数',
    value: 't_settled_period_count',
  },
  {
    label: '还款金额',
    value: 'u_repay_amount',
  },
  {
    label: '复贷还款数',
    value: 'v_re_repay_count',
  },
  {
    label: '复贷还款金额',
    value: 'w_re_repay_amount',
  },
  {
    label: '还款失败',
    value: 'x_repay_fail_count',
  },
  {
    label: '展期数',
    value: 'y_extend_count',
  },
  {
    label: '展期金额',
    value: 'z_extend_amount',
  },
  {
    label: '灰名单数',
    value: 'e_grey_count',
  },
  {
    label: '减免数',
    value: 'a_a_reduce_count',
  },
  {
    label: '减免金额',
    value: 'a_b_reduce_amount',
  },
  {
    label: '入催数',
    value: 'a_c_collection_count',
  },
  {
    label: '催记数',
    value: 'a_d_collection_log_count',
  },
  {
    label: '催回数',
    value: 'a_e_collection_success_count',
  },
  {
    label: '催回金额',
    value: 'a_f_collection_success_amount',
  },
  {
    label: 'otp数',
    value: 'a_g_otp_sms_count',
  },
  {
    label: '通知数',
    value: 'a_h_notification_sms_count',
  },
  {
    label: '营销数',
    value: 'a_i_marketing_sms_count',
  },
];

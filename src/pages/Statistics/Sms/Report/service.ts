// @ts-ignore
/* eslint-disable */

export const FieldLabels = {
  id: 'id',
  a_date: '日期',
  b_name: '服务商',
  c_sented_count: '发送条数',
  d_delivered_count: '送达条数',
  e_delivered_rate: '送达率',
  f_total_amount: '总花费',
  g_otp_count: '验证码通道',
  h_marketing_count: '营销通道',
  i_notify_count: '通知通道',
  j_otp_success_rate: '验证码通道',
  k_marketing_success_rate: '营销通道',
  l_notify_success_rate: '通知通道',
  m_system_notify_count: '系统',
  n_crontab_notify_count: '计划任务',
  o_admin_sent_count: '管理员',
  p_contact_count: '通讯录',
  q_user_count: '本人',
  r_bdpd_count: '逾前短信数',
  s_dpd0_count: '还款日短息数',
  t_dpd1_3_count: 'dpd1-3短信数',
  u_dpd4_7_count: 'dpd4-7短信数',
  v_dpd8_15_count: 'dpd8-15短信数',
  w_dpd16_count: 'dpd16+短信数',

};

export const FieldIndex = {
  id: 'id',
  a_date: 'a_date',
  b_name: 'b_name',
  c_sented_count: 'c_sented_count',
  d_delivered_count: 'd_delivered_count',
  e_delivered_rate: 'e_delivered_rate',
  f_total_amount: 'f_total_amount',
  g_otp_count: 'g_otp_count',
  h_marketing_count: 'h_marketing_count',
  i_notify_count: 'i_notify_count',
  j_otp_success_rate: 'j_otp_success_rate',
  k_marketing_success_rate: 'k_marketing_success_rate',
  l_notify_success_rate: 'l_notify_success_rate',
  m_system_notify_count: 'm_system_notify_count',
  n_crontab_notify_count: 'n_crontab_notify_count',
  o_admin_sent_count: 'o_admin_sent_count',
  p_contact_count: 'p_contact_count',
  q_user_count: 'q_user_count',
  r_bdpd_count: 'r_bdpd_count',
  s_dpd0_count: 's_dpd0_count',
  t_dpd1_3_count: 't_dpd1_3_count',
  u_dpd4_7_count: 'u_dpd4_7_count',
  v_dpd8_15_count: 'v_dpd8_15_count',
  w_dpd16_count: 'w_dpd16_count',
  created_at: 'created_at',
  updated_at: 'updated_at',
};
export const FieldOptions2 = Object.fromEntries(
  Object.entries(FieldLabels).slice(-21).map(([key, text]) => {
    return [key, {text, status: 'Default'}];
  }),
);

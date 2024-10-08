// @ts-ignore
/* eslint-disable */

export const PeriodFieldLabels = {
  a_borrow_id: 'borrow_id',
  b_repay_id: '用户',
  c_period_count: '分期期数',
  d_index: '分期序号',
  e_status: '状态',
  f_expect_repay_total_amount: '应还款总金额',
  g_expect_borrow_amount: '应还本金',
  h_expect_interest: '应还利息',
  i_expect_service_fee: '应还服务费',
  j_expect_violate_fee: '应还违约金',
  k_expect_overdue_fee: '应还罚息',
  l_overdue_days: '在逾天数',
  m_history_overdue_days: '历史逾期天数',
  n_paid_amount: '已支付金额',
  o_paid_borrow_amount: '已支付本金',
  p_paid_interest: '已支付利息',
  q_paid_service_fee: '已支付服务费',
  r_paid_violate_fee: '已支付违约金',
  s_paid_overdue_fee: '已支付罚息',
  t_deduction_times: '减免次数',
  u_deduction_total_amount: '减免总额',
  v_deduction_total_borrow_amount: '减免总本金',
  w_deduction_total_interest: '减免总利息',
  x_deduction_total_service_fee: '减免总服务费',
  y_deduction_total_violate_fee: '减免总违约金',
  z_deduction_total_overdue_fee: '减免总罚息',
  a_a_write_off_amount: '平账金额',
  a_b_extend_times: '展期次数',
  a_c_extend_total_amount: '展期总额',
  a_d_extend_total_days: '展期总天数',
  a_e_extend_total_fee: '展期费',
  a_f_extend_total_violate_fee: '展期违约金',
  a_g_extend_total_overdue_fee: '展期罚息',
  a_h_part_times: '部分还款次数',
  a_i_view_times: '查看次数',
  a_j_withhold_times: '尝试支付次数',
  a_k_success_withhold_times: '成功支付次数',
  a_n_user_id: '用户id',
  a_o_product_settlement_type: '结算方式*',
  a_p_expect_repay_time: '应还款日',
  a_q_calculate_time: '核算日期',
  a_r_extend_admin_id: '展期通过管理员',
  a_s_extend_days: '展期天数',
  a_t_extend_total_days: '展期总天数',
  created_at: '创建时间',
  updated_at: '更新时间',
};

export const PeriodDetailFieldLabels = {
  title: '',
  borrow_amount: '本金',
  interest: '利息',
  service_fee: '服务费',
  violate_fee: '违约金',
  overdue_fee: '罚息',
  total_amount: '总计',
};
export const SmsFieldLabels = {
  a_user_id: '用户',
  b_cat: '短信类型',
  c_level: '金融类型',
  d_type: '类型',
  e_merchant: '商户',
  f_amount: '涉及金额',
  date: 'data',
  date_sent: '日期',
  thread_id: 'thread_id',
  read: 'read',
  seen: 'seen',
  status: 'status',
  type: 'type',
  address: 'Sender',
  body: '短信内容',
  created_at: '创建时间',
  updated_at: '更新时间',
};

export const AppFieldLabels = {
  a_user_id: '用户',
  b_level: '1类金融',
  c_merchant: '商户',
  d_merchant_id: '商户id',
  f_history_installed: '是否卸载',
  g_sms_count: '关联短信数量',
  appName: 'appName',
  packageName: 'packageName',
  versionName: 'versionName',
  isSystemApp: 'isSystemApp',
  firstInstallTime: 'data',
  h_login_sms_count: '登录短信数',
  i_refuse_sms_count: '拒绝短信数',
  j_accept_sms_count: '通过短信数',
  k_loan_sms_count: '放款短信数',
  l_repay_sms_count: '还款短信数',
  m_extend_sms_count: '展期短信数',
  n_urge_sms_count: '催收短息数',
  o_marketing_sms_count: '营销短信数',
  p_recall_sms_count: '召回短信数',
  q_other_sms_count: '其他短信数',
  r_total_sms_count: '短信总数',
  s_loan_amount: '放款总金额',
  t_repay_amount: '还款总金额',
  created_at: '创建时间',
  updated_at: '更新时间',
};

export const ContactFieldLabels = {
  a_user_id: '用户',
  b_relation: '关系',
  c_close_level: '亲近程度',
  d_call_times: '呼叫次数',
  e_registered: '是否注册',
  f_loan_times: '放款次数',
  g_repay_times: '结清次数',
  h_related_user_id: '关联用户',
  i_last_call_time: '最近呼叫',
  identifier: 'identifier',
  displayName: 'displayName',
  givenName: 'givenName',
  middleName: 'middleName',
  familyName: 'familyName',
  prefix: 'prefix',
  suffix: 'suffix',
  company: 'company',
  jobTitle: 'jobTitle',
  androidAccountType: 'androidAccountType',
  androidAccountName: 'androidAccountName',
  phoneValue: 'phones',
  phoneLabel: 'phoneLabel',
  postalAddresses: 'postalAddresses',
  birthday: 'birthday',
  created_at: '创建时间',
  updated_at: '更新时间',
};

export const DeviceFieldLabels = {
  id: 'id',
  a_user_id: '用户',
  b_borrow_id: '订单',
  c_device_id: '唯一码',
  d_device: 'device',
  e_n_max_md5: 'md5（进入缓存30天）',
  f_o_index: 'index',
  g_p_index: 'index',
  h_q_user_ids: '关联的用户id',
  i_r_user_ids: '关联的用户id',
  version: 'version',
  board: 'board',
  bootloader: 'bootloader',
  brand: 'brand',
  device: 'device',
  display: 'display',
  fingerprint: 'fingerprint',
  hardware: 'hardware',
  host: 'host',
  id2: 'id',
  manufacturer: 'manufacturer',
  model: 'model',
  product: 'product',
  type: 'type',
  isPhysicalDevice: 'isPhysicalDevice',
  serialNumber: 'serialNumber',
  name: 'name',
  systemName: 'systemName',
  systemVersion: 'systemVersion',
  localizedModel: 'localizedModel',
  identifierForVendor: 'identifierForVendor',
  appCodeName: 'appCodeName',
  appName: 'appName',
  appVersion: 'appVersion',
  deviceMemory: 'deviceMemory',
  language: 'language',
  languages: 'languages',
  platform: 'platform',
  productSub: 'productSub',
  userAgent: 'userAgent',
  vendor: 'vendor',
  vendorSub: 'vendorSub',
  hardwareConcurrency: 'hardwareConcurrency',
  maxTouchPoints: 'maxTouchPoints',
  deviceID: 'maxTouchPoints',
  isRoot: 'maxTouchPoints',
  created_at: '创建时间',
  updated_at: '更新时间',
};
export const DynamicDeviceFieldLabels = {
  id: 'id',
  a_user_id: '用户',
  b_borrow_id: '订单',
  c_device_id: 'h_c_devices.id',
  d_device: 'device',
  e_node: '1:登录',
  f_urge_user_id: 'h_c_devices.id',
  latitude: 'latitude',
  longitude: 'longitude',
  altitude: 'altitude',
  connectivityType: 'connectivityType',
  ip: 'ip',
  macAddress: 'macAddress',
  connectionType: 'connectionType',
  hostCount: '所属wifi连接的设备数',
  ssid: 'macAddress',
  geo_location_country: 'gps国家',
  geo_location_state: 'gps省',
  geo_location_city: 'gps市',
  geo_location_address: 'gps地址',
  ip_location_country: 'ip国家',
  ip_location_state: 'ip省',
  ip_location_city: 'ip市',
  ip_location_address: 'ip地址',
  battery: '电池电量',
  operator_name: '运营商名称',
  operator_country_code: '运营商代码',
  language_code: '语言',
  country_code: '国家code',
  created_at: '创建时间',
  updated_at: '更新时间',
};

export const PhotoFieldLabels = {
  id: 'id',
  a_user_id: '用户',
  one_year_ago_count: '一年内新增相册数',
  one_month_ago_count: '一月内新增相册数',
  one_week_ago_count: '一周内新增相册数',
  one_day_ago_count: '一天内新增相册数',
  created_at: '创建时间',
  updated_at: '更新时间',
};

export const PeriodFieldIndex = {
  id: 'id',
  a_borrow_id: 'a_borrow_id',
  b_repay_id: 'b_repay_id',
  c_period_count: 'c_period_count',
  d_index: 'd_index',
  e_status: 'e_status',
  f_expect_repay_total_amount: 'f_expect_repay_total_amount',
  g_expect_borrow_amount: 'g_expect_borrow_amount',
  h_expect_interest: 'h_expect_interest',
  i_expect_service_fee: 'i_expect_service_fee',
  j_expect_violate_fee: 'j_expect_violate_fee',
  k_expect_overdue_fee: 'k_expect_overdue_fee',
  l_overdue_days: 'l_overdue_days',
  m_history_overdue_days: 'm_history_overdue_days',
  n_paid_amount: 'n_paid_amount',
  o_paid_borrow_amount: 'o_paid_borrow_amount',
  p_paid_interest: 'p_paid_interest',
  q_paid_service_fee: 'q_paid_service_fee',
  r_paid_violate_fee: 'r_paid_violate_fee',
  s_paid_overdue_fee: 's_paid_overdue_fee',
  t_deduction_times: 't_deduction_times',
  u_deduction_total_amount: 'u_deduction_total_amount',
  v_deduction_total_borrow_amount: 'v_deduction_total_borrow_amount',
  w_deduction_total_interest: 'w_deduction_total_interest',
  x_deduction_total_service_fee: 'x_deduction_total_service_fee',
  y_deduction_total_violate_fee: 'y_deduction_total_violate_fee',
  z_deduction_total_overdue_fee: 'z_deduction_total_overdue_fee',
  a_a_write_off_amount: 'a_a_write_off_amount',
  a_b_extend_times: 'a_b_extend_times',
  a_c_extend_total_amount: 'a_c_extend_total_amount',
  a_d_extend_total_days: 'a_d_extend_total_days',
  a_e_extend_total_fee: 'a_e_extend_total_fee',
  a_f_extend_total_violate_fee: 'a_f_extend_total_violate_fee',
  a_g_extend_total_overdue_fee: 'a_g_extend_total_overdue_fee',
  a_h_part_times: 'a_h_part_times',
  a_i_view_times: 'a_i_view_times',
  a_j_withhold_times: 'a_j_withhold_times',
  a_k_success_withhold_times: 'a_k_success_withhold_times',
  a_n_user_id: 'a_n_user_id',
  a_o_product_settlement_type: 'a_o_product_settlement_type',
  a_p_expect_repay_time: 'a_p_expect_repay_time',
  a_q_calculate_time: 'a_q_calculate_time',
  a_r_extend_admin_id: 'a_r_extend_admin_id',
  a_s_extend_days: 'a_s_extend_days',
  a_t_extend_total_days: 'a_t_extend_total_days',
  created_at: 'created_at',
  updated_at: 'updated_at',
};
export const PeriodDetailFieldIndex = {
  title: 'title',
  borrow_amount: 'borrow_amount',
  interest: 'interest',
  service_fee: 'service_fee',
  violate_fee: 'violate_fee',
  overdue_fee: 'overdue_fee',
  total_amount: 'total_amount',
};
export const SmsFieldIndex = {
  a_user_id: 'a_user_id',
  b_cat: 'b_cat',
  c_level: 'c_level',
  d_type: 'd_type',
  e_merchant: 'e_merchant',
  f_amount: 'f_amount',
  date: 'date',
  date_sent: 'date_sent',
  thread_id: 'thread_id',
  read: 'read',
  seen: 'seen',
  status: 'status',
  type: 'type',
  address: 'address',
  body: 'body',
  created_at: 'created_at',
  updated_at: 'updated_at',
};
export const AppFieldIndex = {
  id: 'id',
  a_user_id: 'a_user_id',
  b_level: 'b_level',
  c_merchant: 'c_merchant',
  d_merchant_id: 'd_merchant_id',
  f_history_installed: 'f_history_installed',
  g_sms_count: 'g_sms_count',
  appName: 'appName',
  packageName: 'packageName',
  versionName: 'versionName',
  isSystemApp: 'isSystemApp',
  firstInstallTime: 'firstInstallTime',
  h_login_sms_count: 'h_login_sms_count',
  i_refuse_sms_count: 'i_refuse_sms_count',
  j_accept_sms_count: 'j_accept_sms_count',
  k_loan_sms_count: 'k_loan_sms_count',
  l_repay_sms_count: 'l_repay_sms_count',
  m_extend_sms_count: 'm_extend_sms_count',
  n_urge_sms_count: 'n_urge_sms_count',
  o_marketing_sms_count: 'o_marketing_sms_count',
  p_recall_sms_count: 'p_recall_sms_count',
  q_other_sms_count: 'q_other_sms_count',
  r_total_sms_count: 'r_total_sms_count',
  s_loan_amount: 's_loan_amount',
  t_repay_amount: 't_repay_amount',
  created_at: 'created_at',
  updated_at: 'updated_at',
};

export const ContactFieldIndex = {
  id: 'id',
  a_user_id: 'a_user_id',
  b_relation: 'b_relation',
  c_close_level: 'c_close_level',
  d_call_times: 'd_call_times',
  e_registered: 'e_registered',
  f_loan_times: 'f_loan_times',
  g_repay_times: 'g_repay_times',
  h_related_user_id: 'h_related_user_id',
  i_last_call_time: 'i_last_call_time',
  identifier: 'identifier',
  displayName: 'displayName',
  givenName: 'givenName',
  middleName: 'middleName',
  familyName: 'familyName',
  prefix: 'prefix',
  suffix: 'suffix',
  company: 'company',
  jobTitle: 'jobTitle',
  androidAccountType: 'androidAccountType',
  androidAccountName: 'androidAccountName',
  phoneValue: 'phoneValue',
  phoneLabel: 'phoneLabel',
  postalAddresses: 'postalAddresses',
  birthday: 'birthday',
  created_at: 'created_at',
  updated_at: 'updated_at',
};
export const DeviceFieldIndex = {
  id: 'id',
  a_user_id: 'a_user_id',
  b_borrow_id: 'b_borrow_id',
  c_device_id: 'c_device_id',
  d_device: 'd_device',
  e_n_max_md5: 'e_n_max_md5',
  f_o_index: 'f_o_index',
  g_p_index: 'g_p_index',
  h_q_user_ids: 'h_q_user_ids',
  i_r_user_ids: 'i_r_user_ids',
  version: 'version',
  board: 'board',
  bootloader: 'bootloader',
  brand: 'brand',
  device: 'device',
  display: 'display',
  fingerprint: 'fingerprint',
  hardware: 'hardware',
  host: 'host',
  id2: 'id2',
  manufacturer: 'manufacturer',
  model: 'model',
  product: 'product',
  type: 'type',
  isPhysicalDevice: 'isPhysicalDevice',
  serialNumber: 'serialNumber',
  name: 'name',
  systemName: 'systemName',
  systemVersion: 'systemVersion',
  localizedModel: 'localizedModel',
  identifierForVendor: 'identifierForVendor',
  appCodeName: 'appCodeName',
  appName: 'appName',
  appVersion: 'appVersion',
  deviceMemory: 'deviceMemory',
  language: 'language',
  languages: 'languages',
  platform: 'platform',
  productSub: 'productSub',
  userAgent: 'userAgent',
  vendor: 'vendor',
  vendorSub: 'vendorSub',
  hardwareConcurrency: 'hardwareConcurrency',
  maxTouchPoints: 'maxTouchPoints',
  deviceID: 'deviceID',
  isRoot: 'isRoot',
  created_at: 'created_at',
  updated_at: 'updated_at',
};
export const DynamicDeviceFieldIndex = {
  id: 'id',
  a_user_id: 'a_user_id',
  b_borrow_id: 'b_borrow_id',
  c_device_id: 'c_device_id',
  d_device: 'd_device',
  e_node: 'e_node',
  f_urge_user_id: 'f_urge_user_id',
  latitude: 'latitude',
  longitude: 'longitude',
  altitude: 'altitude',
  connectivityType: 'connectivityType',
  ip: 'ip',
  macAddress: 'macAddress',
  connectionType: 'connectionType',
  hostCount: 'hostCount',
  ssid: 'ssid',
  geo_location_country: 'geo_location_country',
  geo_location_state: 'geo_location_state',
  geo_location_city: 'geo_location_city',
  geo_location_address: 'geo_location_address',
  ip_location_country: 'ip_location_country',
  ip_location_state: 'ip_location_state',
  ip_location_city: 'ip_location_city',
  ip_location_address: 'ip_location_address',
  battery: 'battery',
  operator_name: 'operator_name',
  operator_country_code: 'operator_country_code',
  language_code: 'language_code',
  country_code: 'country_code',
  created_at: 'created_at',
  updated_at: 'updated_at',
};
export const PhotoFieldIndex = {
  id: 'id',
  a_user_id: 'a_user_id',
  one_year_ago_count: 'one_year_ago_count',
  one_month_ago_count: 'one_month_ago_count',
  one_week_ago_count: 'one_week_ago_count',
  one_day_ago_count: 'one_day_ago_count',
  created_at: 'created_at',
  updated_at: 'updated_at',
};

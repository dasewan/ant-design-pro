// @ts-ignore
/* eslint-disable */

export {
  getAdminV1BDRiskRoleBundles as index,
  getAdminV1BDRiskRoleBundlesId as show,
  postAdminV1BDRiskRoleBundles as store,
  putAdminV1BDRiskRoleBundlesId as update,
} from '@/services/ant-design-pro/BDRiskRoleBundle';

export const FieldLabels = {
  a_name: '规则名称',
  b_related_role_group_count: '关联细则组数',
  c_related_role_count: '关联细则数',
  d_score_upper_limit: '分数上限',
  e_execute_logic: '执行逻辑',
  f_finnal_decision: '最终决策',
  g_description: '规则描述',
  h_local_name: '规则名称本地化',
  i_code: '同一bundles不同版本的标识',
  j_version: '当前版本号',
  k_is_current: '是否是最新版本',
  l_verdion_index: '版本序号',
  m_version_count: '版本数',
  created_at: '创建时间',
  updated_at: '更新时间',
};
export const FieldIndex = {
  a_name: 'a_name',
  b_related_role_group_count: 'b_related_role_group_count',
  c_related_role_count: 'c_related_role_count',
  d_score_upper_limit: 'd_score_upper_limit',
  e_execute_logic: 'e_execute_logic',
  f_finnal_decision: 'f_finnal_decision',
  g_description: 'g_description',
  h_local_name: 'h_local_name',
  i_code: 'i_code',
  j_version: 'j_version',
  k_is_current: 'k_is_current',
  l_verdion_index: 'l_verdion_index',
  m_version_count: 'm_version_count',
  created_at: 'created_at',
  updated_at: 'updated_at',
};

export const FieldLabels2 = {
  a_risk_role_bundle_id: '规则id',
  b_risk_role_group_id: '组id',
  c_risk_item_id: '字段id',
  d_value_type: '取值类型',
  e_value_operator: '算术运算公式',
  f_relational_operator: '关系运算符',
  g_compare_type: '对比类型',
  h_compare_risk_item_id: '对比字段',
  i_compare_value_type: '取值类型',
  j_compare_value_operator: '算术运算公式',
  k_role_item_profile: '统计用md5(tmp_risk_item_id+value_type+value_operator...)',
  l_group_count: '组内细则数量',
  m_group_index: '组内细则index',
  n_execute_logic: '组内关系',
  created_at: '创建时间',
  updated_at: '更新时间',
};
export const FieldIndex2 = {
  a_risk_role_bundle_id: 'a_risk_role_bundle_id',
  b_risk_role_group_id: 'b_risk_role_group_id',
  c_risk_item_id: 'c_risk_item_id',
  d_value_type: 'd_value_type',
  e_value_operator: 'e_value_operator',
  f_relational_operator: 'f_relational_operator',
  g_compare_type: 'g_compare_type',
  h_compare_risk_item_id: 'h_compare_risk_item_id',
  i_compare_value_type: 'i_compare_value_type',
  j_compare_value_operator: 'j_compare_value_operator',
  k_role_item_profile: 'k_role_item_profile',
  l_group_count: 'l_group_count',
  m_group_index: 'm_group_index',
  n_execute_logic: 'n_execute_logic',
  created_at: 'created_at',
  updated_at: 'updated_at',
};

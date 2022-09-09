export type TableListItem = API.AnRiskItemCat;

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
export const FieldLabels = {
  a_title: '渠道名称',
  b_app_id: '应用ID',
  c_app_secret: '应用密钥',
  d_status: '状态',
  e_type: '渠道类型',
  f_divide_into_type: '结算类型',
  g_divide_one_money: '结算金额',
  h_reg_hide_basic: '扣量起始',
  i_reg_hide_rate: '扣量率',
  j_max_register: '每日最大注册人数',
  k_media_source: '媒体串',
  l_media_url: '推广链接',
  m_self_user: '本司对接人',
  n_contact_user: '联系人',
  o_contact_phone: '联系电话',
  p_contact_address: '联系地址',
  q_contact_comment: '联系备注',
  r_products: '可借产品',
  s_products_package: '可借产品包',
  u_max_loan: '每日最大放款笔数',
};
export const FieldIndex = {
  a_title: 'a_title',
  b_app_id: 'b_app_id',
  c_app_secret: 'c_app_secret',
  d_status: 'd_status',
  e_type: 'e_type',
  f_divide_into_type: 'f_divide_into_type',
  g_divide_one_money: 'g_divide_one_money',
  h_reg_hide_basic: 'h_reg_hide_basic',
  i_reg_hide_rate: 'i_reg_hide_rate',
  j_max_register: 'j_max_register',
  k_media_source: 'k_media_source',
  l_media_url: 'l_media_url',
  m_self_user: 'm_self_user',
  n_contact_user: 'n_contact_user',
  o_contact_phone: 'o_contact_phone',
  p_contact_address: 'p_contact_address',
  q_contact_comment: 'q_contact_comment',
  r_products: 'r_products',
  s_products_package: 's_products_package',
  t_allow_many_borrow: 't_allow_many_borrow',
  u_max_loan: 'u_max_loan',
};

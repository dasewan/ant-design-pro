// @ts-ignore
/* eslint-disable */

export const FieldLabels = {
  id: 'id',
  a_date: '日期',
  b_name: '服务商',
  c_sented_count: '发送条数',
  d_delivered_count: '送达条数',
  e_delivered_rate: '送达率',
  f_sented_person: '发送人数',
  g_success_person: '成功人数',
  h_success_person_rate: '成功率',
  i_total_amount: '总花费',
  j_unit_amount: '单条费用',
  k_unit_person_amount: '单人费用',
  l_backfill_rate: '回填率',

};

export const FieldIndex = {
  id: 'id',
  a_date: 'a_date',
  b_name: 'b_name',
  c_sented_count: 'c_sented_count',
  d_delivered_count: 'd_delivered_count',
  e_delivered_rate: 'e_delivered_rate',
  f_sented_person: 'f_sented_person',
  g_success_person: 'g_success_person',
  h_success_person_rate: 'h_success_person_rate',
  i_total_amount: 'i_total_amount',
  j_unit_amount: 'j_unit_amount',
  k_unit_person_amount: 'k_unit_person_amount',
  l_backfill_rate: 'l_backfill_rate',
  created_at: 'created_at',
  updated_at: 'updated_at',
};


export const FieldOptions2 = Object.fromEntries(
  Object.entries(FieldLabels).slice(-10).map(([key, text]) => {
    return [key, {text, status: 'Default'}];
  }),
);

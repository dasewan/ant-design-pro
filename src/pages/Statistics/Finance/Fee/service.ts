// @ts-ignore
/* eslint-disable */

export const FieldLabels = {
  id: 'id',
  a_date: '日期',
  b_type: '类型',
  c_currency: '币种',
  d_name: '服务商',
  e_success_count: '成功数量',
  f_success_amount: '成功金额',
  g_fail_count: '失败数量',
  h_fail_amount: '失败金额',

};

export const FieldIndex = {
  id: 'id',
  a_date: 'a_date',
  b_type: 'b_type',
  c_currency: 'c_currency',
  d_name: 'd_name',
  e_success_count: 'e_success_count',
  f_success_amount: 'f_success_amount',
  g_fail_count: 'g_fail_count',
  h_fail_amount: 'h_fail_amount',
  created_at: 'created_at',
  updated_at: 'updated_at'
};


export const FieldOptions2 = Object.fromEntries(
  Object.entries(FieldLabels).slice(-4).map(([key, text]) => {
    return [key, {text, status: 'Default'}];
  }),
);

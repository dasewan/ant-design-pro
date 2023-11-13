import { FieldLabels } from '@/pages/Statistics/Collection/Admin/service';
import { SelectProps } from 'antd';

type StatusOption = {
  label: string;
  value: string | number;
};

export const OVERDUE_COUNT_RATE: { [propName: string]: string } = {
  '0': 'm_DPD0_count_rate',
  '1': 'q_DPD1_count_rate',
  '2': 'u_DPD2_count_rate',
  '3': 'y_DPD3_count_rate',
  // '4': 'a_c_DPD4_count_rate',
  // '5': 'a_g_DPD5_count_rate',
  '7': 'a_k_DPD7_count_rate',
  '15': 'a_o_DPD15_count_rate',
  '30': 'a_s_DPD30_count_rate',
  '60': 'a_w_DPD60_count_rate',
  '60+': 'b_a_DPD60+_count_rate',
};
export const OVERDUE_AMOUNT_RATE: { [propName: string]: string } = {
  '0': 'n_DPD0_amount_rate',
  '1': 'r_DPD1_amount_rate',
  '2': 'v_DPD2_amount_rate',
  '3': 'z_DPD3_amount_rate',
  // '4': 'a_d_DPD4_amount_rate',
  // '5': 'a_h_DPD5_amount_rate',
  '7': 'a_l_DPD7_amount_rate',
  '15': 'a_p_DPD15_amount_rate',
  '30': 'a_t_DPD30_amount_rate',
  '60': 'a_x_DPD60_amount_rate',
  '60+': 'b_b_DPD60+_amount_rate',
};
export const OVERDUE_COUNT: { [propName: string]: string } = {
  '0': 'k_DPD0_count',
  '1': 'o_DPD1_count',
  '2': 's_DPD2_count',
  '3': 'w_DPD3_count',
  // '4': 'a_a_DPD4_count',
  // '5': 'a_e_DPD5_count',
  '7': 'a_i_DPD7_count',
  '15': 'a_m_DPD15_count',
  '30': 'a_q_DPD30_count',
  '60': 'a_u_DPD60_count',
  '60+': 'a_y_DPD60+_count',
};
export const OVERDUE_AMOUNT: { [propName: string]: string } = {
  '0': 'l_DPD0_amount',
  '1': 'p_DPD1_amount',
  '2': 't_DPD2_amount',
  '3': 'x_DPD3_amount',
  // '4': 'a_b_DPD4_amount',
  // '5': 'a_f_DPD5_amount',
  '7': 'a_j_DPD7_amount',
  '15': 'a_n_DPD15_amount',
  '30': 'a_r_DPD30_amount',
  '60': 'a_v_DPD60_amount',
  '60+': 'a_z_DPD60+_amount',
};

export const X_AXIS: StatusOption[] = [
  {
    label: '产品',
    value: 'b_product_id',
  },
  {
    label: '期数',
    value: 'c_a_period_index',
  },
  {
    label: '渠道',
    value: 'c_b_channel_id',
  },
  {
    label: '借款次数',
    value: 'c_c_borrow_count',
  },
  {
    label: '风控',
    value: 'c_d_risk_strategy_id',
  },
  {
    label: '借款金额',
    value: 'c_e_borrow_amount',
  },
];
export const Y_AXIS: SelectProps<any>['options'] | string[] = [
  {
    label: '逾期率',
    value: 'rate',
    children: [
      {
        label: 'DPD0',
        value: 'm_DPD0_count_rate',
      },
      {
        label: 'DPD1',
        value: 'q_DPD1_count_rate',
      },
      {
        label: 'DPD2',
        value: 'u_DPD2_count_rate',
      },
      {
        label: 'DPD3',
        value: 'y_DPD3_count_rate',
      },
      {
        label: 'DPD7',
        value: 'a_k_DPD7_count_rate',
      },
      {
        label: 'DPD15',
        value: 'a_o_DPD15_count_rate',
      },
      {
        label: 'DPD30',
        value: 'a_s_DPD30_count_rate',
      },
      {
        label: 'DPD60',
        value: 'a_w_DPD60_count_rate',
      },
      {
        label: 'DPD60+',
        value: 'b_a_DPD60+_count_rate',
      },
    ],
  },
  {
    label: '逾期数',
    value: 'count',
    children: [
      {
        label: 'DPD0',
        value: 'k_DPD0_count',
      },
      {
        label: 'DPD1',
        value: 'o_DPD1_count',
      },
      {
        label: 'DPD2',
        value: 's_DPD2_count',
      },
      {
        label: 'DPD3',
        value: 'w_DPD3_count',
      },
      {
        label: 'DPD7',
        value: 'a_i_DPD7_count',
      },
      {
        label: 'DPD15',
        value: 'a_m_DPD15_count',
      },
      {
        label: 'DPD30',
        value: 'a_q_DPD30_count',
      },
      {
        label: 'DPD60',
        value: 'a_u_DPD60_count',
      },
      {
        label: 'DPD60+',
        value: 'a_y_DPD60+_count',
      },
    ],
  },
  {
    label: '金额逾期率',
    value: 'amount_rate',
    children: [
      {
        label: 'DPD0',
        value: 'n_DPD0_amount_rate',
      },
      {
        label: 'DPD1',
        value: 'r_DPD1_amount_rate',
      },
      {
        label: 'DPD2',
        value: 'v_DPD2_amount_rate',
      },
      {
        label: 'DPD3',
        value: 'z_DPD3_amount_rate',
      },
      {
        label: 'DPD7',
        value: 'a_l_DPD7_amount_rate',
      },
      {
        label: 'DPD15',
        value: 'a_p_DPD15_amount_rate',
      },
      {
        label: 'DPD30',
        value: 'a_t_DPD30_amount_rate',
      },
      {
        label: 'DPD60',
        value: 'a_x_DPD60_amount_rate',
      },
      {
        label: 'DPD60+',
        value: 'b_b_DPD60+_amount_rate',
      },
    ],
  },
  {
    label: '逾期金额',
    value: 'amount',
    children: [
      {
        label: 'DPD0',
        value: 'l_DPD0_amount',
      },
      {
        label: 'DPD1',
        value: 'p_DPD1_amount',
      },
      {
        label: 'DPD2',
        value: 't_DPD2_amount',
      },
      {
        label: 'DPD3',
        value: 'x_DPD3_amount',
      },
      {
        label: 'DPD7',
        value: 'a_j_DPD7_amount',
      },
      {
        label: 'DPD15',
        value: 'a_n_DPD15_amount',
      },
      {
        label: 'DPD30',
        value: 'a_r_DPD30_amount',
      },
      {
        label: 'DPD60',
        value: 'a_v_DPD60_amount',
      },
      {
        label: 'DPD60+',
        value: 'a_z_DPD60+_amount',
      },
    ],
  },
];

export const PERIOD_FLAG: { [propName: string]: string } = {
  l: '',
  m: 'P1',
  n: 'P2',
  o: 'P3',
  p: 'P4',
  q: 'P5',
  r: 'P6',
};
export const FieldOptions = Object.fromEntries(
  Object.entries(FieldLabels).map(([key, text]) => {
    return [key, { text, status: 'Default' }];
  }),
);
export const FieldOptions2 = Object.entries(FieldLabels).map(([value, label]) => ({
  label,
  value,
}));

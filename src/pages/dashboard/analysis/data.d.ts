import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export interface VisitDataType {
  x: string;
  y: number;
}

export type SearchDataType = {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
};

export type OfflineDataType = {
  name: string;
  cvr: number;
};

export interface OfflineChartData {
  date: number;
  type: number;
  value: number;
}

export type RadarData = {
  name: string;
  label: string;
  value: number;
};

export interface AnalysisData {
  visitData: DataItem[];
  visitData2: DataItem[];
  salesData: DataItem[];
  searchData: DataItem[];
  offlineData: OfflineDataType[];
  offlineChartData: DataItem[];
  salesTypeData: DataItem[];
  salesTypeDataOnline: DataItem[];
  salesTypeDataOffline: DataItem[];
  radarData: RadarData[];
}

export interface CollectionDashboard {
  success: boolean
  errorMessage?: string
  message?: string
  data?: CollectionDashboardData
  other?: any[]
  total?: number
  currentPage?: number
  perPage?: number
  hasMorePages?: boolean
}

export interface CollectionDashboardData {
  todayHour?: TodayHour[]
  today?: Today
  yesterday?: Today
  last30AdminDay?: Last30AdminDay[]
  last30Day?: Last30Day[]
}

export interface TodayHour {
  b_hour: number
  i_log_count?: string
  g_call_count?: string
  k_sms_count?: string
  l_repay_count?: string
}

export interface Today {
  a_date: string
  b_init_count?: string
  c_success_count?: string
  h_count?: string
  i_log_count?: string
  g_call_count?: string
  k_sms_count?: string
  l_repay_count?: string
  n_no_log_count?: string
  o_no_call_count?: string
}

export interface Last30AdminDay {
  a_date: string
  e_collection_admin_id?: number
  b_init_count?: string
  c_success_count?: string
  h_count?: string
  i_log_count?: string
  g_call_count?: string
  k_sms_count?: string
  l_repay_count?: string
  n_no_log_count?: string
  o_no_call_count?: string
}

export interface Last30Day {
  a_date: string
  b_init_count?: string
  c_success_count?: string
  h_count?: string
  i_log_count?: string
  g_call_count?: string
  k_sms_count?: string
  l_repay_count?: string
  n_no_log_count?: string
  o_no_call_count?: string
}

import { ProSchemaValueEnumObj } from '@ant-design/pro-utils/es/typing';

export interface StatusItem {
  text: string;
  status: string;
}

export interface StatusColorItem {
  text: string;
  color: string;
}

export interface StatusEnum extends ProSchemaValueEnumObj {
  [key: number]: StatusItem;
}

export interface StatusEnum2 {
  [key: string]: StatusItem;
}

export interface StatusColorEnum extends ProSchemaValueEnumObj {
  [key: number]: StatusColorItem;
}

export interface StatusColorEnum2 extends ProSchemaValueEnumObj {
  [key: string]: StatusColorItem;
}

type StatusOption = {
  label: string;
  value: string | number;
};

export const STATUS_ENUM: StatusEnum = {
  10: { text: '待执行', status: 'Default' },
  20: { text: '进行中', status: 'Processing' },
  30: { text: '未知', status: 'Error' },
  40: { text: '执行失败', status: 'Error' },
  50: { text: '执行成功', status: 'Success' },
};

export const COMMON_STATUS: StatusEnum = {
  10: { text: 'WAITING', status: 'Default' },
  20: { text: 'PROCESSING', status: 'Processing' },
  30: { text: 'UNKNOWN', status: 'Default' },
  40: { text: 'FAIL', status: 'Error' },
  50: { text: 'SUCCESS', status: 'Success' },
};

export const VERIFY_STATUS_ENUM: StatusEnum = {
  10: { text: 'WAITING', status: 'Default' },
  20: { text: 'PROCESSING', status: 'Processing' },
  30: { text: 'UNKNOWN', status: 'Default' },
  40: { text: 'FAIL', status: 'Error' },
  50: { text: 'SUCCESS', status: 'Success' },
  60: { text: 'EXPIRED', status: 'Error' },
};

export type NoticeIconItemType = 'notification' | 'message' | 'event';
//用户动态 1：注册 3：登录 5：认证 7：机审 9：人审 11：放款 13：展期 15：还款 17：部分还款 19：提额 21：降额
export const NEWS_ENUM: StatusColorEnum = {
  1: { text: '注册', color: 'green' },
  3: { text: '登录', color: 'green' },
  5: { text: '认证', color: 'blue' },
  7: { text: '机审', color: 'blue' },
  9: { text: '人审', color: 'blue' },
  11: { text: '放款', color: 'blue' },
  13: { text: '展期', color: 'green' },
  15: { text: '还款', color: 'green' },
  17: { text: '部分还款', color: 'green' },
  19: { text: '提额', color: 'green' },
  21: { text: '降额', color: 'red' },
  23: { text: '催记', color: 'blue' },
  25: { text: '查阅', color: 'blue' },
  27: { text: '短信', color: 'blue' },
  29: { text: '拉黑', color: 'red' },
  31: { text: '命中白名单', color: 'green' },
  33: { text: '从白名单中移除', color: 'red' },
};
// 客户当前页面
export const INDEX_ACTION_ENUM: StatusEnum = {
  11: { text: '创建订单', status: 'Processing' },
  12: { text: '认证列表', status: 'Processing' },
  13: { text: '活体', status: 'Processing' },
  14: { text: '签约', status: 'Processing' },
  21: { text: '待机审', status: 'Processing' },
  22: { text: '待人审', status: 'Processing' },
  23: { text: '待放款', status: 'Processing' },
  31: { text: '活体被拒', status: 'Warning' },
  32: { text: '机审被拒', status: 'Warning' },
  33: { text: '人审被拒', status: 'Warning' },
  41: { text: '逾前还款', status: 'Success' },
  42: { text: '还款日', status: 'Success' },
  43: { text: '逾期', status: 'Error' },
  44: { text: '严重逾期', status: 'Error' },
  52: { text: '认证列表', status: 'Processing' },
  53: { text: '活体', status: 'Processing' },
  54: { text: '签约', status: 'Processing' },
};
//授信
export const CREDIT_TYPE_ENUM: StatusEnum = {
  1: { text: '提额', status: 'Error' },
  2: { text: '降额', status: 'Success' },
};
//订单状态
export const BORROW_STATUS_ENUM: StatusColorEnum = {
  10: { text: '认证中', color: '#00e5f7' },
  20: { text: '签约', color: '#00e5f7' },
  30: { text: '机审', color: '#00e5f7' },
  40: { text: '人审', color: '#00e5f7' },
  50: { text: '放款', color: '#00e5f7' },
  60: { text: '还款期', color: '#0022f7' },
  70: { text: '还款日', color: '#f7cb00' },
  80: { text: '结清', color: '#00e500' },
  90: { text: '逾期', color: '#f42505' },
  100: { text: '关闭', color: '#9543a1' },
};

export const BORROW_STATUS_MAP = {
  VERIFY: 10,
  SIGN: 20,
  MACHINE: 30,
  REVIEW: 40,
  LOAN: 50,
  OUTSTANDING: 60,
  CLEARED: 80,
  OVERDUE: 90,
  CLOSED: 110,
};
export const VERIFY_STATUS_MAP = {
  NOT_YET: 10,
  WAIT: 20,
  OVERVIEW: 30,
  REFUSE: 40,
  SUCCESS: 50,
  EXPIRED: 60,
};

export const BORROW_SUB_STATUS_ENUM: StatusEnum = {
  1100: { text: '待认证', status: '' },

  1110: { text: '身份证待认证', status: '' },
  1120: { text: '身份证认证中', status: '' },
  1140: { text: '身份证认证拒绝', status: 'Error' },
  1130: { text: '身份证待人审', status: '' },
  1150: { text: '身份证认证完成', status: '' },

  1210: { text: '联系人待认证', status: '' },
  1220: { text: '联系人认证中', status: '' },
  1240: { text: '联系人认证拒绝', status: 'Error' },
  1230: { text: '联系人待人审', status: '' },
  1250: { text: '联系人认证完成', status: 'Success' },

  1310: { text: '放款银行卡待认证', status: '' },
  1320: { text: '放款银行卡认证中', status: '' },
  1340: { text: '放款银行卡认证拒绝', status: 'Error' },
  1330: { text: '放款银行卡待人审', status: '' },
  1350: { text: '放款银行卡认证完成', status: 'Success' },

  1410: { text: '还款银行卡待认证', status: '' },
  1420: { text: '还款银行卡认证中', status: '' },
  1440: { text: '还款银行卡认证拒绝', status: 'Error' },
  1430: { text: '还款银行卡待人审', status: '' },
  1450: { text: '还款银行卡认证完成', status: 'Success' },

  1510: { text: '其他信息待认证', status: '' },
  1520: { text: '其他信息认证中', status: '' },
  1530: { text: '其他信息待人审', status: '' },
  1540: { text: '其他信息认证拒绝', status: 'Error' },
  1550: { text: '其他信息认证完成', status: 'Success' },

  1610: { text: '活体待认证', status: '' },
  1620: { text: '活体认证中', status: '' },
  1640: { text: '活体认证拒绝', status: 'Error' },
  1630: { text: '活体待人审', status: '' },
  1650: { text: '活体认证完成', status: 'Success' },

  2010: { text: '待签约', status: '' },
  2020: { text: '签约中', status: '' },
  2030: { text: '放弃签约', status: 'Error' },
  2050: { text: '签约完成', status: 'Success' },

  3010: { text: '待机审', status: '' },
  3020: { text: '机审中', status: '' },
  3040: { text: '机审拒绝', status: 'Error' },
  3030: { text: '待人审', status: '' },
  3050: { text: '机审通过', status: 'Success' },

  4010: { text: '待人审', status: '' },
  4020: { text: '人审中', status: '' },
  4040: { text: '人审拒绝', status: 'Error' },
  4050: { text: '人审通过', status: 'Success' },

  1910: { text: '待放款（人工）', status: '' },
  1912: { text: '放款中（人工）', status: '' },
  1914: { text: '放款失败（人工）', status: 'Error' },
  1930: { text: '待放款（自动）', status: '' },
  1932: { text: '放款中（自动）', status: '' },
  1934: { text: '放款失败（自动）', status: 'Error' },
  2000: { text: '还款期', status: 'Warning' },
  2002: { text: '还款期（有过展期）', status: 'Warning' },
  3000: { text: '还款日', status: 'Warning' },
  3002: { text: '还款日（有过展期）', status: 'Warning' },
  4000: { text: '逾期', status: 'Error' },
  4002: { text: '逾期（有过展期）', status: 'Error' },
  5000: { text: '严重逾期', status: 'Error' },
  5002: { text: '严重逾期（有过展期）', status: 'Error' },
  6000: { text: '坏账', status: 'Error' },
  6002: { text: '坏账（有过展期）', status: 'Error' },
  7000: { text: '正常结清', status: 'Success' },
  7002: { text: '正常结清（有过展期）', status: 'Success' },
  7003: { text: '减免结清', status: 'Success' },
  7004: { text: '减免结清（有过展期）', status: 'Success' },
  7005: { text: '核销', status: 'Success' },
  7006: { text: '核销（有过展期）', status: 'Success' },
  7007: { text: '优惠券结清', status: 'Success' },
  7008: { text: '优惠券结清（有过展期）', status: 'Success' },
};
//管理员操作
export const OPERATE_ENUM: StatusColorEnum = {
  1: { text: '人审', color: 'green' },
  3: { text: '催记', color: 'green' },
  5: { text: '发送短信', color: 'yellow' },
  7: { text: '拉黑', color: 'red' },
  9: { text: '关闭订单', color: 'red' },
  11: { text: '销账', color: 'red' },
  13: { text: '减免', color: 'red' },
  15: { text: '展期', color: 'yellow' },
  17: { text: '发送优惠券', color: 'yellow' },
};
//产品结算方式
export const PRODUCT_SETTLEMENT_TYPE: StatusColorEnum = {
  1: { text: '头收', color: '#87d068' },
  2: { text: '只头收服务费', color: '#2db7f5' },
  3: { text: '后收', color: '#f50' },
};
//产品结算方式
export const PRODUCT_TYPE: StatusColorEnum = {
  1: { text: '真实产品', color: 'success' },
  2: { text: '虚拟产品', color: 'default' },
  3: { text: '贷超产品', color: 'processing' },
};
//状态：启用/禁用
export const COMMON_STATUS_QIYONG: StatusEnum2 = {
  y: { text: '启用', status: 'Success' },
  n: { text: '禁用', status: 'Error' },
};
export const COMMON_STATUS_QIYONG_ARRAY: StatusOption[] = [
  {
    label: '启用',
    value: 'y',
  },
  {
    label: '禁用',
    value: 'n',
  },
];
//状态：启用/禁用
export const COMMON_STATUS_INT: StatusEnum = {
  1: { text: '启用', status: 'Success' },
  2: { text: '禁用', status: 'Error' },
};
export const COMMON_STATUS_INT_ARRAY: StatusOption[] = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '禁用',
    value: 2,
  },
];
//状态：允许/不允许
export const COMMON_STATUS_YUNXU: StatusEnum2 = {
  y: { text: '允许', status: 'Success' },
  n: { text: '不允许', status: 'Error' },
};
export const COMMON_STATUS_YUNXU_ARRAY: StatusOption[] = [
  { label: '允许', value: 'y' },
  { label: '不允许', value: 'n' },
];
export const BLACK_TYPE: StatusEnum = {
  1: { text: '导入excel', status: '' },
  2: { text: '系统', status: '' },
  3: { text: '管理员手动', status: '' },
};
export const BLACK_USER_TYPE: StatusEnum = {
  1: { text: '注册命中黑名单库', status: '' },
  2: { text: '管理员手动拉黑', status: '' },
  3: { text: '执行逾期任务时被拉黑', status: '' },
  4: { text: '导入时命中注册用户', status: '' },
};

//放款日志方式
export const LOAN_LOG_METHOD: StatusEnum = {
  1: { text: '线上放款', status: '' },
  2: { text: '线下放款', status: '' },
};
//放款日志类型
export const LOAN_LOG_TYPE: StatusEnum = {
  1: { text: '正常放款', status: '' },
  2: { text: '强行放款', status: 'Error' },
};
//放款款日志类型 type 1:结清 2：展期 3：部分还款 4：减免 5：核销
export const REPAY_LOG_TYPE: StatusColorEnum = {
  1: { text: '结清', color: '#00e500' },
  2: { text: '展期', color: '#00e5f7' },
  3: { text: '部分还款', color: '#f7cb00' },
  4: { text: '减免', color: '#f42505' },
  5: { text: '核销', color: '#9543a1' },
};
//放款日志状态  状态 10:待放款 20： 放款中 30:未知 40：放款失败 50：放款成功
export const LOAN_LOG_STATUS: StatusEnum = {
  10: { text: '待放款', status: 'Default' },
  20: { text: '放款中', status: 'Processing' },
  30: { text: '未知', status: 'Error' },
  40: { text: '放款失败', status: 'Error' },
  50: { text: '放款成功', status: 'Success' },
};
//放款日志状态  状态 10:回调中 20： 支付中 30:未知 40：支付失败 50：支付成功
export const REPAY_LOG_STATUS: StatusEnum = {
  10: { text: '回调中', status: 'Default' },
  20: { text: '支付中', status: 'Processing' },
  30: { text: '未知', status: 'Error' },
  40: { text: '支付失败', status: 'Error' },
  50: { text: '支付成功', status: 'Success' },
};
//1还款链接 2：app
export const REPAY_WAY: StatusEnum = {
  1: { text: '还款链接', status: '' },
  2: { text: 'app', status: '' },
};
export const SYNC_CODE: StatusEnum = {
  300: { text: '请求结果未知', status: 'Processing' },
  500: { text: '请求失败', status: 'Error' },
  200: { text: '请求成功', status: 'Success' },
  500_001: { text: '风控拦截', status: 'Error' },
  500_002: { text: '系统异常', status: 'Error' },
};
export const CALLBACK_CODE: StatusEnum = {
  100: { text: '暂未收到回调', status: 'Default' },
  500: { text: '回调失败', status: 'Error' },
  200: { text: '回调成功', status: 'Success' },
};

export const REVIEW_STATUS: StatusEnum = {
  10: { text: 'WAITING', status: 'Default' },
  40: { text: 'REJECT', status: 'Error' },
  50: { text: 'ACCEPT', status: 'Success' },
};
export const SMS_TYPE: StatusColorEnum = {
  101: { text: '登录', color: '#0099FF' },
  102: { text: '拒绝', color: '#FF9900' },
  103: { text: '通过', color: '#a0c69d' },
  104: { text: '放款', color: '#99CC33' },
  105: { text: '还款', color: '#006633' },
  106: { text: '展期', color: '#CCFF99' },
  107: { text: '催收', color: '#FF0033' },
  108: { text: '召回', color: '#999999' },
  109: { text: '营销', color: '#CC99CC' },
  110: { text: '其他', color: '#666666' },
};

//产品结算方式
export const FLOW_TYPE: StatusEnum = {
  1: { text: '随机', status: 'Default' },
  2: { text: '排除', status: 'Warning' },
  3: { text: '保留', status: 'success' },
};
export const FLOW_TYPE_ARRAY: StatusOption[] = [
  {
    label: '随机',
    value: 1,
  },
  {
    label: '排除',
    value: 2,
  },
  {
    label: '保留',
    value: 3,
  },
];

//产品结算方式
export const ASSIGN_TYPE: StatusEnum = {
  1: { text: '按比补齐', status: 'Default' },
  2: { text: '按比分配', status: 'Processing' },
};
export const ASSIGN_TYPE_ARRAY: StatusOption[] = [
  {
    label: '按比补齐',
    value: 1,
  },
  {
    label: '按比分配',
    value: 2,
  },
];

export const COLLECTION_FLOW_TYPE: StatusEnum = {
  1: { text: '系统', status: 'Default' },
  2: { text: '管理员', status: 'Error' },
};
export const COLLECTION_ASSIGN_LOG_TYPE: StatusColorEnum = {
  1: { text: '机构', color: '#0099FF' },
  2: { text: '小组', color: '#a0c69d' },
  3: { text: '催员', color: '#CC99CC' },
};
export const COLLECTION_ASSIGN_LOG_CAT_TYPE: StatusEnum = {
  1: { text: '计划任务', status: 'Default' },
  2: { text: '管理员释放', status: 'Error' },
  3: { text: '管理员转移', status: 'Warning' },
};
export const RISK_TAGS_ENUM: StatusEnum = {
  100: { text: '新客', status: '' },
  101: { text: '少量复贷', status: '' },
  102: { text: '中量复贷', status: '' },
  103: { text: '大量复贷', status: '' },
  104: { text: 'A(优)', status: '' },
  105: { text: 'B(良)', status: '' },
  106: { text: 'C(差)', status: '' },
  107: { text: '无短信', status: '' },
  108: { text: '少量短信', status: '' },
  109: { text: '中量短信', status: '' },
  110: { text: '大量短信', status: '' },
  111: { text: '无通讯录', status: '' },
  112: { text: '少量通讯录', status: '' },
  113: { text: '中量通讯录', status: '' },
  114: { text: '大量通讯录', status: '' },
  115: { text: '无一类金融', status: '' },
  116: { text: '少量一类金融', status: '' },
  117: { text: '中量一类金融', status: '' },
  118: { text: '大量一类金融', status: '' },
  119: { text: '低风险地区', status: '' },
  120: { text: '中风险地区', status: '' },
  121: { text: '高风险地区', status: '' },
  122: { text: '青年', status: '' },
  123: { text: '中年', status: '' },
  124: { text: '老年', status: '' },
};
export const RISK_TAGS_ARRAY: StatusOption[] = [
  {
    label: '新客',
    value: '100',
  },
  {
    label: '少量复贷',
    value: '101',
  },
  {
    label: '中量复贷',
    value: '102',
  },
  {
    label: '大量复贷',
    value: '103',
  },
  {
    label: 'A(优)',
    value: '104',
  },
  {
    label: 'B(良)',
    value: '105',
  },
  {
    label: 'C(差)',
    value: '106',
  },
  {
    label: '无短信',
    value: '107',
  },
  {
    label: '少量短信',
    value: '108',
  },
  {
    label: '中量短信',
    value: '109',
  },
  {
    label: '大量短信',
    value: '110',
  },
  {
    label: '无通讯录',
    value: '111',
  },
  {
    label: '少量通讯录',
    value: '112',
  },
  {
    label: '中量通讯录',
    value: '113',
  },
  {
    label: '大量通讯录',
    value: '114',
  },
  {
    label: '无一类金融',
    value: '115',
  },
  {
    label: '少量一类金融',
    value: '116',
  },
  {
    label: '中量一类金融',
    value: '117',
  },
  {
    label: '大量一类金融',
    value: '118',
  },
  {
    label: '低风险地区',
    value: '119',
  },
  {
    label: '中风险地区',
    value: '120',
  },
  {
    label: '高风险地区',
    value: '121',
  },
  {
    label: '青年',
    value: '122',
  },
  {
    label: '中年',
    value: '123',
  },
  {
    label: '老年',
    value: '124',
  },
];
export const RISK_TAGS_GROUP_ARRAY: StatusOption[] = [
  {
    label: '借款次数',
    value: 'borrow',
  },
  {
    label: '渠道',
    value: 'channel',
  },
  {
    label: '短信',
    value: 'sms',
  },
  {
    label: '通讯录',
    value: 'contact',
  },
  {
    label: 'APP',
    value: 'app',
  },
  {
    label: '地区',
    value: 'region',
  },
  {
    label: '年龄',
    value: 'age',
  },
];
export const DPDS: StatusOption[] = [
  {
    label: 'DPD0',
    value: '0',
  },
  {
    label: 'DPD1',
    value: '1',
  },
  {
    label: 'DPD2',
    value: '2',
  },
  {
    label: 'DPD3',
    value: '3',
  },
  /*  {
      label: 'DPD4',
      value: '4',
    },
    {
      label: 'DPD5',
      value: '5',
    },*/
  {
    label: 'DPD7',
    value: '7',
  },
  {
    label: 'DPD15',
    value: '15',
  },
  {
    label: 'DPD30',
    value: '30',
  },
  {
    label: 'DPD60',
    value: '60',
  },
  {
    label: 'DPD60+',
    value: '60+',
  },
];
export const DIMENSIONS: StatusOption[] = [
  {
    label: '逾期率',
    value: 'rate',
  },
  {
    label: '逾期数',
    value: 'count',
  },
  {
    label: '金额逾期率',
    value: 'amount_rate',
  },
  {
    label: '逾期金额',
    value: 'amount',
  },
];
export const PERIODS: StatusOption[] = [
  {
    label: '1 P',
    value: '1',
  },
  {
    label: '2 P',
    value: '2',
  },
  {
    label: '3 P',
    value: '3',
  },
  {
    label: '4 P',
    value: '4',
  },
  {
    label: '5 P',
    value: '5',
  },
  {
    label: '6 P',
    value: '6',
  },
  {
    label: 'all',
    value: '100',
  },
];
export const BORROW_COUNT_GROUP: StatusOption[] = [
  {
    label: '1 T',
    value: '1',
  },
  {
    label: '2 T',
    value: '2',
  },
  {
    label: '3 T',
    value: '3',
  },
  {
    label: '4-7 T',
    value: '4',
  },
  {
    label: '8-~ T',
    value: '5',
  },
];
export const BORROW_AMOUNT_GROUP: StatusOption[] = [
  {
    label: '1000',
    value: '1',
  },
  {
    label: '1001-3000',
    value: '2',
  },
  {
    label: '3001-5000',
    value: '3',
  },
  {
    label: '5001-~',
    value: '4',
  },
];

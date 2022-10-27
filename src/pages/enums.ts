export const STATUS_ENUM = {
  1: { text: '待执行', status: 'Default' },
  2: { text: '执行中', status: 'Processing' },
  3: { text: '执行成功', status: 'Success' },
  4: { text: '执行失败', status: 'Error' },
  5: { text: '无效', status: 'Error' },
};

export type NoticeIconItemType = 'notification' | 'message' | 'event';
//用户动态 1：注册 3：登录 5：认证 7：机审 9：人审 11：放款 13：展期 15：还款 17：部分还款 19：提额 21：降额
export const NEWS_ENUM = {
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
export const INDEX_ACTION_ENUM = {
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
export const CREDIT_TYPE_ENUM = {
  1: { text: '提额', status: 'Error' },
  2: { text: '降额', status: 'Success' },
};
//订单状态
export const BORROE_STATUS_OVERVIEW_ENUM = {
  11: { text: '认证中', status: 'Processing' },
  13: { text: '签约', status: 'Processing' },
  15: { text: '机审', status: 'Processing' },
  17: { text: '人审', status: 'Processing' },
  19: { text: '放款', status: 'Processing' },
  20: { text: '还款期', status: 'Processing' },
  30: { text: '还款日', status: 'Warning' },
  40: { text: '逾期', status: 'Error' },
  50: { text: '严重逾期', status: 'Error' },
  60: { text: '坏账', status: 'Error' },
  70: { text: '结清', status: 'Success' },
};

export const BORROE_STATUS_ENUM = {
  1100: { text: '待认证', status: '' },
  1110: { text: '身份证待认证', status: '' },
  1112: { text: '身份证认证中', status: '' },
  1114: { text: '身份证认证拒绝', status: 'Error' },
  1118: { text: '身份证待人审', status: '' },
  1120: { text: '联系人待认证', status: '' },
  1122: { text: '联系人认证中', status: '' },
  1124: { text: '联系人认证拒绝', status: 'Error' },
  1128: { text: '联系人待人审', status: '' },
  1130: { text: '放款银行卡待认证', status: '' },
  1132: { text: '放款银行卡认证中', status: '' },
  1134: { text: '放款银行卡认证拒绝', status: 'Error' },
  1138: { text: '放款银行卡待人审', status: '' },
  1140: { text: '还款银行卡待认证', status: '' },
  1142: { text: '还款银行卡认证中', status: '' },
  1144: { text: '还款银行卡认证拒绝', status: 'Error' },
  1148: { text: '还款银行卡待人审', status: '' },
  1160: { text: '其他信息待认证', status: '' },
  1162: { text: '其他信息认证中', status: '' },
  1164: { text: '其他信息认证拒绝', status: 'Error' },
  1168: { text: '其他信息待人审', status: '' },
  1180: { text: '活体待认证', status: '' },
  1182: { text: '活体认证中', status: '' },
  1184: { text: '活体认证拒绝', status: 'Error' },
  1188: { text: '活体待人审', status: '' },
  1300: { text: '待签约', status: '' },
  1302: { text: '签约中', status: '' },
  1304: { text: '放弃签约', status: 'Error' },
  1500: { text: '待机审', status: '' },
  1502: { text: '机审中', status: '' },
  1504: { text: '机审拒绝', status: 'Error' },
  1700: { text: '待人审', status: '' },
  1702: { text: '人审中', status: '' },
  1704: { text: '人审拒绝', status: 'Error' },
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
export const OPERATE_ENUM = {
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
export const PRODUCT_SETTLEMENT_TYPE = {
  1: { text: '头收', color: '#87d068' },
  2: { text: '只头收服务费', color: '#2db7f5' },
  3: { text: '后收', color: '#f50' },
};
//产品结算方式
export const PRODUCT_TYPE = {
  1: { text: '真实产品', color: 'success' },
  2: { text: '虚拟产品', color: 'default' },
  3: { text: '贷超产品', color: 'processing' },
};
//状态：启用/禁用
export const COMMON_STATUS_QIYONG = {
  y: { text: '启用', status: 'Success' },
  n: { text: '禁用', status: 'Error' },
};
export const COMMON_STATUS_QIYONG_ARRAY = [
  {
    label: '启用',
    value: 'y',
  },
  {
    label: '禁用',
    value: 'n',
  },
];
//状态：允许/不允许
export const COMMON_STATUS_YUNXU = {
  y: { text: '允许', status: 'Success' },
  n: { text: '不允许', status: 'Error' },
};
export const COMMON_STATUS_YUNXU_ARRAY = [
  { label: '允许', value: 'y' },
  { label: '不允许', value: 'n' },
];
export const BLACK_TYPE = {
  1: { text: '导入excel', status: '' },
  2: { text: '系统', status: 'Error' },
  3: { text: '管理员手动', status: 'Error' },
};

//产品结算方式
export const CHANNEL_TYPE = {
  cpa: { text: 'CPA', color: '#108ee9' },
  cps: { text: 'CPS', color: '#2db7f5' },
  install: { text: 'INSTALL', color: '#2db7f5' },
  risk: { text: 'RISK', color: '#2db7f5' },
  loan: { text: 'LOAN', color: '#2db7f5' },
  repay: { text: 'REPAY', color: '#2db7f5' },
};
export const CHANNEL_TYPE_OPTION = [
  {
    label: 'CPA',
    value: 'cpa',
  },
  {
    label: 'CPS',
    value: 'cps',
  },
  {
    label: 'INSTALL',
    value: 'install',
  },
  {
    label: 'RISK',
    value: 'risk',
  },
  {
    label: 'LOAN',
    value: 'loan',
  },
  {
    label: 'REPAY',
    value: 'repay',
  },
];

//状态：启用/禁用
export const COMMON_STATUS_QIYONG = {
  y: { text: '启用', status: 'Success' },
  n: { text: '禁用', status: 'Error' },
};
export const COMMON_STATUS_QIYONG_OPTION = [
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
export const COMMON_STATUS_ALLOW = {
  y: { text: '允许', status: 'Success' },
  n: { text: '不允许', status: 'Error' },
};
export const COMMON_STATUS_ALLOW_OPTION = [
  {
    label: '允许',
    value: 'y',
  },
  {
    label: '不允许',
    value: 'n',
  },
];

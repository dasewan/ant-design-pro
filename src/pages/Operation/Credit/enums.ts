//产品结算方式
export const PRODUCT_SETTLEMENT_TYPE = {
  1: { text: '头收', color: '#108ee9' },
  2: { text: '只头收服务费', color: '#2db7f5' },
  3: { text: '后收', color: '#f50' },
};
export const PRODUCT_SETTLEMENT_OPTION = [
  {
    label: '头收',
    value: 1,
  },
  {
    label: '只头收服务费',
    value: 2,
  },
  {
    label: '后收',
    value: 3,
  },
];
//产品结算方式
export const PRODUCT_TYPE = {
  1: { text: '真实产品', color: 'blue' },
  2: { text: '虚拟产品', color: 'default' },
  3: { text: '贷超产品', color: 'lime' },
};
export const PRODUCT_TYPE_OPTION = [
  {
    label: '真实产品',
    value: 1,
  },
  {
    label: '贷超产品',
    value: 3,
  },
  {
    label: '虚拟产品',
    value: 2,
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
//状态：显示/隐藏
export const COMMON_STATUS_DISPLAY = {
  y: { text: '显示', status: 'Success' },
  n: { text: '隐藏', status: 'Error' },
};
export const COMMON_STATUS_DISPLAY_OPTION = [
  {
    label: '显示',
    value: 'y',
  },
  {
    label: '隐藏',
    value: 'n',
  },
];

// 产品额度类型
export const AMOUNT_TYPE = {
  1: { text: '灵活额度', color: 'geekblue' },
  2: { text: '固定额度', color: 'purple' },
};
export const AMOUNT_TYPE_OPTION = [
  {
    label: '灵活额度',
    value: 1,
  },
  {
    label: '固定额度',
    value: 2,
  },
];

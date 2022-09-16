export const EXECUTE_LOGIC = {
  allagree: { text: '所有都满足', color: 'green' },
  anyagree: { text: '满足任意一条', color: 'purple' },
  anynotagree: { text: '至少一条不满足', color: 'orange' },
  noneagree: { text: '所有均不满足', color: 'magenta' },
};
export const EXECUTE_LOGIC_OPTION = [
  {
    label: '所有都满足',
    value: 'allagree',
  },
  {
    label: '满足任意一条',
    value: 'anyagree',
  },
  {
    label: '所有均不满足',
    value: 'noneagree',
  },
  {
    label: '至少一条不满足',
    value: 'anynotagree',
  },
];

export const FINNAL_DECISION = {
  accept: { text: '通过', color: '#87d068' },
  reject: { text: '拒绝', color: '#f50' },
  review: { text: '复审', color: '#108ee9' },
};
export const FINNAL_DECISION_OPTION = [
  {
    label: '通过',
    value: 'accept',
  },
  {
    label: '拒绝',
    value: 'reject',
  },
  {
    label: '复审',
    value: 'review',
  },
];

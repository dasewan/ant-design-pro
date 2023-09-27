import { StatusColorEnum2 } from '@/pages/enums';

export const EXECUTE_LOGIC: StatusColorEnum2 = {
  allsatisfied: { text: '所有都满足', color: 'green' },
  anysatisfied: { text: '满足任意一条', color: 'purple' },
  anyunsatisfied: { text: '至少一条不满足', color: 'orange' },
  nonesatisfied: { text: '所有均不满足', color: 'magenta' },
};
export const EXECUTE_LOGIC_OPTION = [
  {
    label: '所有都满足',
    value: 'allsatisfied',
  },
  {
    label: '满足任意一条',
    value: 'anysatisfied',
  },
  {
    label: '所有均不满足',
    value: 'anyunsatisfied',
  },
  {
    label: '至少一条不满足',
    value: 'nonesatisfied',
  },
];

export const FINNAL_DECISION: StatusColorEnum2 = {
  accept: { text: '通过', color: 'green' },
  reject: { text: '拒绝', color: 'red' },
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
export const OPERATOR_OPTION = [
  {
    value: 'gt',
    label: '大于',
  },
  {
    value: 'lt',
    label: '小于',
  },
];
export const OPERATOR = {
  gt: { text: '大于', color: '#87d068' },
  lt: { text: '小于', color: '#f50' },
};

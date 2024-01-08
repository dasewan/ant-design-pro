import { StatusColorEnum2 } from '@/pages/enums';

export const US_BORROW_TIMES_TYPE: StatusColorEnum2 = {
  1: { text: 'First', color: '#108ee9' },
  2: { text: 'ReBorrow2-4', color: '#2db7f5' },
  3: { text: 'ReBorrow5+', color: '#888dd1' },
};
export const US_BORROW_TIMES_OPTION = [
  {
    label: 'First',
    value: '1',
  },
  {
    label: 'ReBorrow2-4',
    value: '2',
  },
  {
    label: 'ReBorrow5+',
    value: '3',
  },
];
export const MODE_TYPE = {
  average: { text: '按天', color: '#108ee9' },
  completion: { text: '按总量', color: '#2db7f5' },
};
export const MODE_OPTION = [
  {
    label: '按天',
    value: 'average',
  },
  {
    label: '按总量',
    value: 'completion',
  },
];

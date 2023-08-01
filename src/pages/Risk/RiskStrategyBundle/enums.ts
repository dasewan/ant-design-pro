import { StatusColorEnum2 } from '@/pages/enums';

export const FUSE: StatusColorEnum2 = {
  accept: { text: '不熔断', color: '#87d068' },
  reject: { text: '熔断', color: '#f50' },
};
export const FUSE_OPTION = [
  {
    label: '不熔断',
    value: 'n',
  },
  {
    label: '熔断',
    value: 'y',
  },
];

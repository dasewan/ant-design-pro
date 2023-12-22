//产品结算方式
import { StatusColorEnum, StatusOption } from '@/pages/enumsUs';

export const IMPORT_TYPE: StatusColorEnum = {
  1: { text: '白名单', color: 'green' },
  2: { text: '黑名单', color: 'red' },
  3: { text: '营销名单', color: 'blue' },
};
export const IMPORT_TYPE_OPTION: StatusOption[] = [
  {
    label: '白名单',
    value: 1,
  },
  {
    label: '黑名单',
    value: 3,
  },
  {
    label: '营销名单',
    value: 2,
  },
];

//产品结算方式
import { StatusColorEnum, StatusOption } from '@/pages/enumsUs';

export const US_IMPORT_TYPE: StatusColorEnum = {
  1: { text: 'White List', color: 'green' },
  2: { text: 'Black List', color: 'red' },
  3: { text: 'Marketing List', color: 'blue' },
};
export const US_IMPORT_TYPE_OPTION: StatusOption[] = [
  {
    label: 'White List',
    value: 1,
  },
  {
    label: 'Black List',
    value: 3,
  },
  {
    label: 'Marketing List',
    value: 2,
  },
];

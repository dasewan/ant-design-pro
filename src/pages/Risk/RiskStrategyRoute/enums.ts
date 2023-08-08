export interface StatusItem {
  text: string;
  status: string;
}

export interface StatusColorItem {
  text: string;
  color: string;
}

export interface StatusColorEnum {
  [key: number]: StatusColorItem;
}

type StatusOption = {
  label: string;
  value: string | number;
};
export const RISK_ITEM_TYPE: StatusColorEnum = {
  1: { text: '整型', color: '#87d068' },
  2: { text: '浮点型', color: '#2db7f5' },
  3: { text: '字符串', color: '#f50' },
  4: { text: '布尔型', color: '#108ee9' },
};
export const RISK_ITEM_TYPE_OPTION: StatusOption[] = [
  {
    label: '整型',
    value: 1,
  },
  {
    label: '浮点型',
    value: 2,
  },
  {
    label: '字符串',
    value: 3,
  },
  {
    label: '布尔型',
    value: 4,
  },
];

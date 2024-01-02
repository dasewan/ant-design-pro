// u_gender

import { StatusEnum } from '@/pages/enums';

export const GENDER_ENUM: StatusEnum = {
  1: { text: 'Male', status: 'Default' },
  2: { text: 'Female', status: 'Default' },
};
// j_contact1_relation
export const CONTACT_RELATION_ENUM: StatusEnum = {
  1: { text: 'Father', status: 'Default' },
  2: { text: 'Mother', status: 'Default' },
  3: { text: 'Spouse', status: 'Default' },
  4: { text: 'Child', status: 'Default' },
};
// m_contact2_relation
export const CONTACT2_RELATION_ENUM: StatusEnum = {
  1: { text: 'Colleague', status: 'Default' },
  2: { text: 'Friend', status: 'Default' },
  3: { text: 'Classmate', status: 'Default' },
};
// e_personal_loan_purpose
export const PERSONAL_LOAN_PURPOSE: StatusEnum = {
  1: { text: 'Educate', status: 'Default' },
  2: { text: 'Daily expenses', status: 'Default' },
  3: { text: 'Repayment', status: 'Default' },
};
// h_marital_status
export const MARITAL_STATUS: StatusEnum = {
  1: { text: 'Married', status: 'Default' },
  2: { text: 'Unmarried', status: 'Default' },
};
// j_religion Buddhism:1,Christianity:2,catholic:3
export const RELIGION: StatusEnum = {
  1: { text: 'Buddhism', status: 'Default' },
  2: { text: 'Christianity', status: 'Default' },
  3: { text: 'catholic', status: 'Default' },
};
// k_preferred_language English:1,French:2,Spanish:3,none:4
export const PREFERRED_LANGUAGE: StatusEnum = {
  1: { text: 'English', status: 'Default' },
  2: { text: 'French', status: 'Default' },
  3: { text: 'Spanish', status: 'Default' },
  4: { text: 'none', status: 'Default' },
};
// l_education lliteracy:1,Primary school:2,Junior high school:3,high school:4,University:5
export const EDUCATION: StatusEnum = {
  1: { text: 'lliteracy', status: 'Default' },
  2: { text: 'Primary school', status: 'Default' },
  3: { text: 'Junior high', status: 'Default' },
  4: { text: 'high school', status: 'Default' },
  5: { text: 'University', status: 'Default' },
};
// m_residential_type Rent:1,Own room:2
export const RESIDENTIAL_TYPE: StatusEnum = {
  1: { text: 'Rent', status: 'Default' },
  2: { text: 'Own room', status: 'Default' },
};

// v_employment_status Unemployed:1,Individual:2,On duty:3
export const EMPLOYMENT_STATUS: StatusEnum = {
  1: { text: 'Unemployed', status: 'Default' },
  2: { text: 'Individual', status: 'Default' },
  3: { text: 'On duty', status: 'Default' },
};
// w_employment_period Temporary:1,1 year:2,2year:3,3year:4,More than 3 years:5
export const EMPLOYMENT_PERIOD: StatusEnum = {
  1: { text: 'Temporary', status: 'Default' },
  2: { text: '1 year', status: 'Default' },
  3: { text: '2 year', status: 'Default' },
  4: { text: '3 year', status: 'Default' },
  5: { text: 'More than 3 years', status: 'Default' },
};
// y_payroll_period Day end:1,Week end:2,Twice a month:3,Monthly:4
export const PAYROLL_PERIOD: StatusEnum = {
  1: { text: 'Day end', status: 'Default' },
  2: { text: 'Week end', status: 'Default' },
  3: { text: 'Twice a month', status: 'Default' },
  4: { text: 'Monthly', status: 'Default' },
};
// z_pay_day Day end:1,Week end:2,Twice a month:3,Monthly:4
export const PAY_DAY: StatusEnum = {
  1: { text: 'Day end', status: 'Default' },
  2: { text: 'Week end', status: 'Default' },
  3: { text: 'Twice a month', status: 'Default' },
  4: { text: 'Monthly', status: 'Default' },
};
// d_bank_name MTN:1,Airtel:2,Warid:3
export const BANK_NAME: StatusEnum = {
  1: { text: 'MTN', status: 'Default' },
  2: { text: 'Airtel', status: 'Default' },
  3: { text: 'Warid', status: 'Default' },
};
/*private $reasons = [
  1: '命中黑名单',
  2: '命中灰名单',
  3: '验真失败',
  4: '证件号重复',
  5: '姓名与ocr不符',
  6: '证件号与ocr不符',
  7: '超过认证最大次数',
];*/
export const REVIEW_REASON_US = {
  idNumber: {
    1: 'Hit Black',
    2: 'Hit Grey',
    3: 'Verify Failed',
    4: 'ID Repeat',
    5: 'Name Ocr Not Same',
    6: 'ID Ocr Not Same',
    7: 'Exceed Max Times',
  },
  contact: {
    1: 'Contact1 Hit Black',
    2: 'Contact1 Hit Grey',
    3: 'Contact1 Borrow Refuse',
    4: 'Contact1 Borrow Overdue',
    5: 'Contact2 Hit Black',
    6: 'Contact2 Hit Grey',
    7: 'Contact2 Borrow Refuse',
    8: 'Contact2 Borrow Overdue',
    9: 'Contact1 Not In Other Contact List',
    10: 'Contact2 Not In Other Contact List',
    11: 'Contact1 Interest Self Too Few',
    12: 'Contact2 Interest Self Too Few',
  },
  loanBank: {
    1: 'Bank Card No Hit Black',
    2: 'Bank Card No Hit Grey',
    3: 'Bank Card Verify Fail',
    4: 'Exceed Max Times',
    5: 'Bank Card Not Self',
    6: 'Bank Card Has Register',
    7: 'Bank Card Was Used Repay',
  },
  job: {
    1: 'Employ Hit Black',
    2: 'Employ Hit Grey',
    3: 'Employ Relate Too Many Overdue Order',
    4: 'Employ Relate Too Many User',
    5: 'Company Relate Too Many Overdue Order',
    6: 'Company Relate Too Many User',
    7: 'Company Relate Illegal',
  },
};

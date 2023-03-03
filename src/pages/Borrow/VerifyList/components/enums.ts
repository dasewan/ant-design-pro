// u_gender
export const GENDER_ENUM = {
  1: { text: 'Male', status: 'Default' },
  2: { text: 'Female', status: 'Default' },
};
// j_contact1_relation
export const CONTACT_RELATION_ENUM = {
  1: { text: 'Father', status: 'Default' },
  2: { text: 'Mother', status: 'Default' },
  3: { text: 'Spouse', status: 'Default' },
  4: { text: 'Child', status: 'Default' },
};
// m_contact2_relation
export const CONTACT2_RELATION_ENUM = {
  1: { text: 'Colleague', status: 'Default' },
  2: { text: 'Friend', status: 'Default' },
  3: { text: 'Classmate', status: 'Default' },
};
// e_personal_loan_purpose
export const PERSONAL_LOAN_PURPOSE = {
  1: { text: 'Educate', status: 'Default' },
  2: { text: 'Daily expenses', status: 'Default' },
  3: { text: 'Repayment', status: 'Default' },
};
// h_marital_status
export const MARITAL_STATUS = {
  1: { text: 'Married', status: 'Default' },
  2: { text: 'Unmarried', status: 'Default' },
};
// j_religion Buddhism:1,Christianity:2,catholic:3
export const RELIGION = {
  1: { text: 'Buddhism', status: 'Default' },
  2: { text: 'Christianity', status: 'Default' },
  3: { text: 'catholic', status: 'Default' },
};
// k_preferred_language English:1,French:2,Spanish:3,none:4
export const PREFERRED_LANGUAGE = {
  1: { text: 'English', status: 'Default' },
  2: { text: 'French', status: 'Default' },
  3: { text: 'Spanish', status: 'Default' },
  4: { text: 'none', status: 'Default' },
};
// l_education lliteracy:1,Primary school:2,Junior high school:3,high school:4,University:5
export const EDUCATION = {
  1: { text: 'lliteracy', status: 'Default' },
  2: { text: 'Primary school', status: 'Default' },
  3: { text: 'Junior high', status: 'Default' },
  4: { text: 'high school', status: 'Default' },
  5: { text: 'University', status: 'Default' },
};
// m_residential_type Rent:1,Own room:2
export const RESIDENTIAL_TYPE = {
  1: { text: 'Rent', status: 'Default' },
  2: { text: 'Own room', status: 'Default' },
};

// v_employment_status Unemployed:1,Individual:2,On duty:3
export const EMPLOYMENT_STATUS = {
  1: { text: 'Unemployed', status: 'Default' },
  2: { text: 'Individual', status: 'Default' },
  3: { text: 'On duty', status: 'Default' },
};
// w_employment_period Temporary:1,1 year:2,2year:3,3year:4,More than 3 years:5
export const EMPLOYMENT_PERIOD = {
  1: { text: 'Temporary', status: 'Default' },
  2: { text: '1 year', status: 'Default' },
  3: { text: '2 year', status: 'Default' },
  4: { text: '3 year', status: 'Default' },
  5: { text: 'More than 3 years', status: 'Default' },
};
// y_payroll_period Day end:1,Week end:2,Twice a month:3,Monthly:4
export const PAYROLL_PERIOD = {
  1: { text: 'Day end', status: 'Default' },
  2: { text: 'Week end', status: 'Default' },
  3: { text: 'Twice a month', status: 'Default' },
  4: { text: 'Monthly', status: 'Default' },
};
// z_pay_day Day end:1,Week end:2,Twice a month:3,Monthly:4
export const PAY_DAY = {
  1: { text: 'Day end', status: 'Default' },
  2: { text: 'Week end', status: 'Default' },
  3: { text: 'Twice a month', status: 'Default' },
  4: { text: 'Monthly', status: 'Default' },
};
// d_bank_name MTN:1,Airtel:2,Warid:3
export const BANK_NAME = {
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
export const REVIEW_REASON = {
  idNumber: {
    1: '命中黑名单',
    2: '命中灰名单',
    3: '验真失败',
    4: '证件号重复',
    5: '姓名与ocr不符',
    6: '证件号与ocr不符',
    7: '超过认证最大次数',
  },
  contact: {
    1: '联系人1命中黑名单',
    2: '联系人1命中灰名单',
    3: '联系人1订单被拒',
    4: '联系人1订单逾期',
    5: '联系人2命中黑名单',
    6: '联系人2命中灰名单',
    7: '联系人2订单被拒',
    8: '联系人2订单逾期',
    9: '联系人1不在对方通讯录中',
    10: '联系人2不在对方通讯录中',
    11: '联系人1通讯录与本人通讯录交集交少',
    12: '联系人2通讯录与本人通讯录交集交少',
  },
  loanBank: {
    1: '银行卡命中黑名单',
    2: '银行卡命中灰名单',
    3: '银行卡验真失败',
    4: '银行卡认证次数超限',
    5: '持卡人非本人',
    6: '卡号已注册',
    7: '卡号之前被其他人用作还款',
  },
  job: {
    1: '雇主电话命中黑名单',
    2: '雇主电话命中灰名单',
    3: '雇主电话关联逾期订单过多',
    4: '雇主电话关联用户过多',
    5: '所属公司关联逾期订单过多',
    6: '所属公司关联用户过多',
    7: '所属公司关联公检法',
  },
};

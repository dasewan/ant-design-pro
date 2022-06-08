declare namespace API {
  type AUser = {
    /** id */
    id?: number;
    /** 手机号* */
    a_phone: string;
    /** 用户名* */
    b_name?: string;
    /** Email* */
    c_email?: string;
    /** 身份证1 */
    d_id_number?: string;
    /** 银行卡号 */
    e_bankcard_no?: string;
    /** 授信额度* */
    f_credit_amount?: number;
    /** 信用分* */
    g_credit_fraction?: number;
    /** 1：首贷 2：审核 3：被拒 4：还款 5：复贷 */
    h_index_no?: number;
    /** 客户首页动作：【11：创建订单 12：认证列表 13：活体 14：签约】【 21：待机审 22：待人审 23：待放款】【31：活体被拒 32：机审被拒 33：人审被拒】【41：逾前还款 42：还款日 43：逾期 44：严重逾期】【51：创建订单 52：认证列表 53：活体 54：签约】 */
    i_index_action?: number;
    /** facebook* */
    j_facebook?: string;
    /** whatsapp* */
    k_whatsapp?: string;
    /** 渠道id* */
    l_channel_id?: number;
    /** 扣量用户* */
    m_channel_hide?: string;
    /** 本渠道可借产品* */
    n_products?: string;
    /** 干预认证字段 */
    o_intervene?: string;
    /** 是否阻断 */
    p_block?: string;
    /** block节点 */
    q_block_type?: string;
    /** 当前订单id */
    r_current_borrow_id?: number;
    /** 当前认证项id */
    s_current_verify_id?: number;
    /** 当前订单状态* */
    t_cur_borrow_status?: string;
    /** 在途产品id */
    u_on_way_product_id?: number;
    /** 是否存在多笔在途订单  1:允许   0:不允许* */
    v_allow_many_borrow?: string;
    /** 注册类型 网页，手机，邀请，电销* */
    w_register_type?: string;
    /** 用户标签 */
    x_tags?: string;
    /** 是否卸载 */
    y_suspect_unload?: string;
    /** 电销人员* */
    z_saler_admin_id?: number;
    /** 审核人员* */
    aa_review_admin_id?: number;
    /** 在催管理员* */
    ab_collection_admin_id?: number;
    /** 提额券数量* */
    ac_coupon_count?: number;
    /** 邀请成功次数* */
    ad_invite_count?: number;
    /** 消息数 */
    ae_message?: number;
    /** 累计放款笔数* */
    af_loan_count?: number;
    /** 累计展期笔数* */
    ag_extend_count?: number;
    /** 逾期次数* */
    ah_overdue_times?: number;
    /** 最大逾期天数* */
    ai_repay_max_overdue_days?: number;
    /** 损益* */
    aj_loss?: number;
    /** 费用消耗 */
    ak_consume?: number;
    /** al_last_ettled_time */
    al_last_ettled_time?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BProduct = {
    /** id */
    id?: number;
    /** 当前快照id */
    a_product_snapshot_id?: number;
    /** 产品名称* */
    b_name: string;
    /** 产品额度* */
    c_amount: number;
    /** 产品单位* */
    d_unit?: string;
    /** 产品周期* */
    e_life?: number;
    /** 结算方式* 1:先扣除手续费和利息 2:先扣除手续费 3:到期扣除所有费用 */
    f_settlement_type?: number;
    /** 利息* */
    g_interest?: number;
    /** 服务费率* */
    h_service_fee_rate?: number;
    /** 逾期费率* */
    i_overdue_rate?: number;
    /** 违约金费率* */
    j_violate_fee_rate?: number;
    /** 展期费率* */
    k_extend_rate?: number;
    /** 最低还款金额* */
    l_min_pay?: number;
    /** 是否允许部分还款* */
    m_can_part_pay?: string;
    /** 是否可以展期 */
    n_can_extend?: string;
    /** 产品类型* 1:真实产品 2:虚拟产品 3:贷超产品 */
    o_type?: number;
    /** 产品链接 */
    p_url?: string;
    /** 解锁信用分* */
    q_unlock_credit_fraction?: number;
    /** 最小结清次数 */
    r_settled_times?: number;
    /** 最大逾期天数 */
    s_max_overdue_days?: number;
    /** 最大逾期次数 */
    t_max_overdue_times?: number;
    /** 状态* */
    u_status?: string;
    /** 展示排序 */
    v_sort?: number;
    /** 浏览次数 */
    w_views?: number;
    /** 描述* */
    x_introduction?: string;
    /** 备注* */
    y_comment?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type CurrentUser = {
    /** 管理员名称 */
    name: string;
    /** avatar */
    avatar: string;
    /** userid */
    userid: number;
    /** email */
    email: string;
    /** signature */
    signature: string;
    /** title */
    title: string;
    /** group */
    group: number;
    /** notifyCount */
    notifyCount: number;
    /** unreadCount */
    unreadCount: number;
    /** country */
    country: string;
    /** access */
    access: string;
    /** address */
    address: string;
    /** phone */
    phone: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type deleteAdminV1CurrentUsersIdParams = {
    /** id of CurrentUser */
    id: number;
  };

  type deleteNoticeIconItemsIdParams = {
    /** id of NoticeIconItem */
    id: number;
  };

  type getAdminV1CurrentUsersIdParams = {
    /** id of CurrentUser */
    id: number;
  };

  type getNoticeIconItemsIdParams = {
    /** id of NoticeIconItem */
    id: number;
  };

  type GVerify = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** 订单id */
    b_borrow_id?: number;
    /** 风控id */
    c_risk_id?: number;
    /** 风控分数 */
    d_risk_score?: number;
    /** 风控结果 */
    e_risk_result?: string;
    /** 状态 10：待认证 */
    f_status?: number;
    /** g_ */
    g_: string;
    /** 最早过期时间 */
    h_next_expired_date?: string;
    /** 身份证认证id */
    i_idnumber_verify_id?: number;
    /** 身份证认证状态 10:待认证，20已认证 30：认证拒绝 40：认证过期 50：复审 */
    j_idnumber_verify_status?: number;
    /** k_liveness_verify_id */
    k_liveness_verify_id?: number;
    /** l_liveness_verify_status */
    l_liveness_verify_status?: number;
    /** m_contact_verify_id */
    m_contact_verify_id?: number;
    /** n_contact_verify_status */
    n_contact_verify_status?: number;
    /** o_job_verify_id */
    o_job_verify_id?: number;
    /** p_job_verify_status */
    p_job_verify_status?: number;
    /** q_loan_bank_id */
    q_loan_bank_id?: number;
    /** r_loan_bank_status */
    r_loan_bank_status?: number;
    /** s_repay_bank_id */
    s_repay_bank_id?: number;
    /** t_repay_bank_status */
    t_repay_bank_status?: number;
    /** u_h5_verify_id */
    u_h5_verify_id?: number;
    /** v_h5_verify_status */
    v_h5_verify_status?: number;
    /** w_phone */
    w_phone?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HProductSnapshot = {
    /** id */
    id?: number;
    /** 当前快照id */
    a_product_id?: number;
    /** 产品名称* */
    b_name: string;
    /** 产品额度* */
    c_amount: number;
    /** 产品单位* */
    d_unit?: string;
    /** 产品周期* */
    e_life?: number;
    /** 结算方式* 1:先扣除手续费和利息 2:先扣除手续费 3:到期扣除所有费用 */
    f_settlement_type?: number;
    /** 利息* */
    g_interest?: number;
    /** 服务费率* */
    h_service_fee_rate?: number;
    /** 逾期费率* */
    i_overdue_rate?: number;
    /** 违约金费率* */
    j_violate_fee_rate?: number;
    /** 展期费率* */
    k_extend_rate?: number;
    /** 最低还款金额* */
    l_min_pay?: number;
    /** 是否允许部分还款* */
    m_can_part_pay?: string;
    /** 是否可以展期 */
    n_can_extend?: string;
    /** 产品类型* 1:真实产品 2:虚拟产品 3:贷超产品 */
    o_type?: number;
    /** 产品链接 */
    p_url?: string;
    /** 解锁信用分* */
    q_unlock_credit_fraction?: number;
    /** 最小结清次数 */
    r_settled_times?: number;
    /** 最大逾期天数 */
    s_max_overdue_days?: number;
    /** 最大逾期次数 */
    t_max_overdue_times?: number;
    /** 状态* */
    u_status?: string;
    /** 展示排序 */
    v_sort?: number;
    /** 浏览次数 */
    w_views?: number;
    /** 描述* */
    x_introduction?: string;
    /** 备注* */
    y_comment?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type IUserOverview = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** 初始短信数量 */
    b_init_msg_count?: number;
    /** 短信增量 */
    c_incr_msg_count?: number;
    /** 最后一次短信上送时间 */
    d_last_msg_time?: string;
    /** 初始通讯录数量 */
    e_init_contact_count?: number;
    /** 通讯录增量 */
    f_incr_contact_count?: number;
    /** 最后一次通讯录上送时间 */
    g_last_contact_time?: string;
    /** 初始相册数量 */
    h_init_album_count?: number;
    /** 相册增量 */
    i_incr_album_count?: number;
    /** 最后一次相册上送时间 */
    g_last_album_time?: string;
    /** 初始相册数量 */
    k_init_app_count?: number;
    /** 相册增量 */
    l_incr_app_count?: number;
    /** 最后一次相册上送时间 */
    m_last_app_time?: string;
    /** 最后一次设备信息上送时间 */
    n_last_device_time?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type LoginResult = {
    /** type */
    type?: string;
    /** status */
    status: string;
    /** currentAuthority */
    currentAuthority?: string;
  };

  type MIdnumber = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** ocr.id */
    b_ocr_id?: number;
    /** 身份证认证状态 10:待认证，20已认证 30：认证拒绝 40：认证过期 50：复审 */
    c_status?: number;
    /** 黑名单id */
    d_black_id?: number;
    /** 灰名单id */
    e_grey_id?: number;
    /** 白名单id */
    f_white_id?: number;
    /** 认证有效时间 */
    g_valid_date?: string;
    /** 证件本身过期时间 */
    h_expired_date?: string;
    /** 证件本身过期时间2 */
    i_expired_date2?: string;
    /** 证件本身过期时间3 */
    j_expired_date3?: string;
    /** 证件本身过期时间4 */
    k_expired_date4?: string;
    /** 手持身份证 */
    l_hold_idnumber?: string;
    /** 身份证1 */
    m_idnumber?: string;
    /** 证件号2（税号） */
    n_idnumber2?: string;
    /** 证件号3 */
    o_idnumber3?: string;
    /** 证件号4 */
    p_idnumber3?: string;
    /** 姓名1 */
    q_name1?: string;
    /** 姓名2 */
    r_name2?: string;
    /** 姓名3 */
    s_name3?: string;
    /** 姓名4 */
    t_name4?: string;
    /** 性别 1：男 2：女 */
    u_gender?: number;
    /** 出生年月 */
    v_birthday?: string;
    /** 有效日期 */
    w_valid_date?: string;
    /** 州 */
    x_idnumber_state_id?: number;
    /** 省 */
    y_idnumber_province_id?: number;
    /** 市 */
    z_idnumber_city_id?: number;
    /** 市 */
    aa_district_id?: number;
    /** 具体地址 */
    ab_idnumber_address?: string;
    /** 州 */
    ac_idnumber_state2_id?: number;
    /** 省 */
    ad_idnumber_province2_id?: number;
    /** 市 */
    ae_idnumber_city2_id?: number;
    /** 市 */
    af_district2_id?: number;
    /** 具体地址 */
    ag_idnumber2_address?: string;
    /** 用户手输id_number和ocr是否一致 */
    ah_id_number_same?: string;
    /** 用户手输id_number2和ocr是否一致 */
    ai_id_number2_same?: string;
    /** 用户手输id_number2和ocr是否一致 */
    aj_id_number3_same?: string;
    /** 用户手输id_number2和ocr是否一致 */
    ak_id_number4_same?: string;
    /** 用户手输姓名和ocr是否一致 */
    al_name_same?: string;
    /** 用户手输姓名2和ocr是否一致 */
    am_name2_same?: string;
    /** 用户手输姓名2和ocr是否一致 */
    an_name3_same?: string;
    /** 用户手输姓名2和ocr是否一致 */
    ao_name4_same?: string;
    /** 用户手输出生年月和ocr是否一致 */
    ap_birthday_same?: string;
    /** 信息1 */
    aq_info?: string;
    /** 信息2 */
    ar_info2?: string;
    /** 信息3 */
    as_info3?: string;
    /** 信息4 */
    at_info4?: string;
    /** 信息5 */
    au_info5?: string;
    /** 信息6 */
    av_info6?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type NoticeIconItem = {
    /** id */
    id?: number;
    /** extra */
    extra?: string;
    /** key */
    key?: string;
    /** read */
    read?: boolean;
    /** avatar */
    avatar?: string;
    /** title */
    title?: string;
    /** status */
    status?: string;
    /** datetime */
    datetime?: string;
    /** description */
    description?: string;
    /** type */
    type?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type NUserProfile = {
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
  };

  type OContact = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** 有效日期 */
    b_valid_date?: string;
    /** 认证状态认证状态 10:未认证 20：认证中 30 认证通过 40认证拒绝 50 认证过期 */
    c_status?: number;
    /** 邮箱 */
    d_email?: string;
    /** facebook */
    e_facebook?: string;
    /** whatsapp */
    f_whatsapp?: string;
    /** line */
    g_line?: string;
    /** 联系人1姓名 */
    contact1_name?: string;
    /** 联系人1电话 */
    contact1_phone?: string;
    /** 联系人1关系 */
    j_contact1_relation?: string;
    /** 联系人2姓名 */
    contact2_name?: string;
    /** 联系人2电话 */
    contact2_phone?: string;
    /** 联系人2关系 */
    m_contact2_relation?: string;
    /** 联系人3姓名 */
    contact3_name?: string;
    /** 联系人3电话 */
    contact3_phone?: string;
    /** 联系人3关系 */
    p_contact3_relation?: string;
    /** 网关 */
    q_gateway: number;
    /** 费用 */
    r_fee?: number;
    /** s_info */
    s_info?: string;
    /** t_info2 */
    t_info2?: string;
    /** u_info3 */
    u_info3?: string;
    /** v_info4 */
    v_info4?: string;
    /** w_info5 */
    w_info5?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
  };

  type putAdminV1CurrentUsersIdParams = {
    /** id of CurrentUser */
    id: number;
  };

  type putNoticeIconItemsIdParams = {
    /** id of NoticeIconItem */
    id: number;
  };

  type QVerifyItem = {
    /** id */
    id?: number;
    /** 父id* */
    a_parent_id?: number;
    /** 认证项名称* */
    b_name?: string;
    /** 标识 */
    c_code?: string;
    /** 状态* */
    d_status?: string;
    /** 排序* */
    e_sort?: number;
    /** 有效天数* */
    f_valid_days?: number;
    /** 是否可以编辑* */
    g_edit?: string;
    /** 是否必填* */
    h_opertional?: string;
    /** 描述* */
    i_description?: string;
    /** 备注 */
    j_remark?: string;
    /** 验证规则 */
    k_rules?: string;
    /** 字段类型 */
    l_type?: string;
    /** 键盘输入类型 */
    m_text_input_type?: string;
    /** 最大长度 */
    n_max_length?: number;
    /** 标签 */
    o_label_text?: string;
    /** hint */
    p_hint_text?: string;
    /** 单验证规则 */
    q_validator?: string;
    /** 复验证规则 */
    r_multi_validator?: string;
    /** 提交触发方法 */
    s_on_submitted?: string;
    /** deleted_at */
    deleted_at?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
  };
}

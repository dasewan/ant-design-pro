declare namespace API {
  type ABCreditHistory = {
    /** id */
    id?: number;
    /** 用户id* */
    a_user_id?: number;
    /** 类型 1：提额 2：降额* */
    b_type?: number;
    /** 改动前的授信额度* */
    c_before_credit_amount?: number;
    /** 改动金额* */
    d_amount?: number;
    /** 管理员id* */
    e_admin_id?: number;
    /** 关联订单id* */
    f_borrow_id?: number;
    /** 提降额风控id* */
    g_risk_id?: number;
    /** 备注 */
    h_comment?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type ACUserNew = {
    /** id */
    id?: number;
    /** 用户id* */
    a_user_id?: number;
    /** 类型  1：注册  3：登录  5：认证  7：机审  9：人审  11：放款  13：展期  15：还款  17：部分还款  19：提额  21：降额* 23:催记（订单：阶段：催员：逾期天数） 25:查阅（系统消息内容） 27:短信（[类型]短信内容） 29:拉黑（备注） */
    b_type?: number;
    /** 备注* */
    c_comment?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type AEBorrowAdminOperate = {
    /** id */
    id?: number;
    /** 用户id* */
    a_user_id?: number;
    /** 管理员id* */
    b_admin_id?: number;
    /** 1人审 3催记 5发送短信 7拉黑 9关闭订单 11销账 13减免 15展期 17发送优惠券 */
    c_type?: number;
    /** 订单id* */
    d_borrow_id?: number;
    /** 备注 */
    e_comment?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type AEBorrowAdminOperates = {
    /** id */
    id?: number;
    /** 用户id* */
    a_user_id?: number;
    /** 管理员id* */
    b_admin_id?: number;
    /** 1人审 3催记 5发送短信 7拉黑 9关闭订单 11销账 13减免 15展期 17发送优惠券 */
    c_type?: number;
    /** 订单id* */
    d_borrow_id?: number;
    /** 备注 */
    e_comment?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type AFChannel = {
    /** id */
    id?: number;
    /** 渠道名称 */
    a_title?: string;
    /** 应用ID */
    b_app_id?: string;
    /** 应用密钥 */
    c_app_secret?: string;
    /** 状态  200:正常   404:冻结 500:禁用 */
    d_status?: number;
    /** 渠道类型 */
    e_type?: string;
    /** 结算类型 */
    f_divide_into_type?: string;
    /** 结算金额 */
    g_divide_one_money?: number;
    /** 扣量起始 */
    h_reg_hide_basic?: number;
    /** 扣量率（百分比） */
    i_reg_hide_rate?: number;
    /** 每日最大注册人数 0为不限制 */
    j_max_register?: number;
    /** 媒体串 */
    k_media_source?: string;
    /** 推广链接 */
    l_media_url?: string;
    /** 本司对接人 */
    m_self_user?: string;
    /** 联系人 */
    n_contact_user?: string;
    /** 联系电话 */
    o_contact_phone?: string;
    /** 联系地址 */
    p_contact_address?: string;
    /** 联系备注 */
    q_contact_comment?: string;
    /** 本渠道可借产品 */
    r_products?: string;
    /** 本渠道可借产品包 */
    s_products_package?: string;
    /** 是否存在多笔在途订单  1:允许   0:不允许 */
    t_allow_many_borrow?: number;
    /** 每日最大放款笔数 */
    u_max_loan?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type AGBlackReason = {
    /** id */
    id?: number;
    /** a_k_reasons.id */
    a_reason_id?: number;
    /** 备注* */
    b_comment?: string;
    /** 批量id* */
    c_batch_sn?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type AHUserSup = {
    /** id */
    id?: number;
    /** 用户id* */
    a_user_id?: number;
    /** 累积提额次数 */
    b_raise_count?: number;
    /** 累积提额金额 */
    c_raise_amount?: number;
    /** 累积降额次数 */
    d_drop_count?: number;
    /** 累积降额金额 */
    e_drop_amount?: number;
    /** 催收日志数量 */
    f_urge_log?: number;
    /** 短信发送数量 */
    g_sms_count?: number;
    /** 推送数量 */
    h_push_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type AIBlackUser = {
    /** id */
    id?: number;
    /** 用户id* */
    a_user_id?: number;
    /** 手机号命中* */
    c_phone_hit_id?: number;
    /** 身份证号命中* */
    d_idnumber_hit_id?: number;
    /** 身份证号2命中* */
    e_idnumber2_hit_id?: number;
    /** 银行卡号命中* */
    f_bankcard_no_hit_id?: number;
    /** imei命中* */
    g_imei_hit_id?: number;
    /** mac命中* */
    h_mac_hit_id?: number;
    /** device命中* */
    i_device_hit_id?: number;
    /** 1:当前是黑名单  2：历史是黑名单 */
    h_status?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type AKReason = {
    /** id */
    id?: number;
    /** 类型 1：拉黑原因 2：关闭原因 3：审批通过原因 4：审批拒绝原因 5：拒绝放款原因 6：平账原因 7：催收原因 */
    a_type?: number;
    /** 状态 1：开启 0：关闭 */
    b_status?: number;
    /** 原因* */
    c_title?: string;
    /** 影响个数* */
    d_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type ALAdminFile = {
    /** id */
    id?: number;
    /** 用户id* */
    a_admin_id?: number;
    /** 上传类型 1：黑名单 2：电销 3：批量发送短信  */
    b_type?: number;
    /** 状态 1：上传成功 2：导入成功 */
    c_status?: number;
    /** facebook* */
    d_original_filename?: string;
    /** 文件大小 */
    e_filesize?: number;
    /** facebook* */
    f_mime_type?: string;
    /** facebook* */
    g_new_filename?: string;
    /** 加密密码* */
    h_password?: string;
    /** 文件* */
    file?: string;
    /** 下载次数* */
    i_download_times?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type AMBlackHitHistory = {
    /** id */
    id?: number;
    /** 黑名单id* */
    a_black_id: number;
    /** 用户id* */
    b_user_id: number;
    /** 手机号码 */
    c_user_phone?: string;
    /** 借款次数* */
    d_loan_count: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

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
    /** 累计逾期天数* */
    an_total_overdue_days?: number;
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

  type DBorrow = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** 渠道 */
    b_channel_id?: number;
    /** 认证id */
    c_verify_id?: number;
    /** 产品id */
    d_product_id?: number;
    /** 产品快照id */
    e_product_snapshots_id?: number;
    /** 优惠券快照id */
    f_coupon_snapshots_id?: number;
    /** 风控id */
    g_risk_id?: number;
    /** 订单号 */
    h_sn?: string;
    /** 三方订单号 */
    i_outer_sn?: string;
    /** 状态 */
    j_status?: number;
    /** 状态明细 */
    k_sub_status?: number;
    /** 借款次数 */
    l_borrow_count?: number;
    /** 借款金额 */
    m_borrow_amount?: number;
    /** 下次金额计算基数 */
    n_sub_borrow_amount?: number;
    /** 成功放款时间 */
    o_loan_time?: string;
    /** 放款金额 */
    p_loan_amount?: number;
    /** 应还款时间 */
    q_expect_repay_time?: string;
    /** 应还金额 */
    r_amount_due?: number;
    /** 已还金额 */
    s_amount_paid?: number;
    /** 结清时间 */
    t_settled_time?: string;
    /** 结清期数(分期) */
    u_settled_period?: string;
    /** 结清金额 */
    v_amount_due?: number;
    /** 损益（逾期或者结清后计算才展示损益，否则展示为空） */
    w_loss_amount?: number;
    /** 订单信息计算日期（计划任务计算日期，） */
    x_calculate_date?: string;
    /** 是否展示展期按钮 */
    y_show_extend_btn?: number;
    /** 最近一次展期时间 */
    z_last_extend_time?: string;
    /** 风控分数 */
    aa_risk_score?: number;
    /** 展期次数 */
    ab_extend_times?: number;
    /** 部分还款次数 */
    ac_partial_times?: number;
    /** 减免次数 */
    ad_reduce_times?: number;
    /** 优惠券次数 */
    ae_coupon_times?: number;
    /** 查看次数(电销,审核,催收人员) */
    af_operate_times?: number;
    /** 间隔天数（距离上次结清后再创建订单时的天数） */
    ag_span_days?: number;
    /** 累计逾期天数 */
    ah_total_overdue_days?: number;
    /** 逾期天数 (计划任务更新) */
    ai_overdue_days?: number;
    /** 身份证1 */
    aj_idnumber?: string;
    /** 电话 */
    ak_phone?: string;
    /** 姓名1 */
    al_name1?: string;
    /** 银行卡 */
    am_bankcard?: string;
    /** 姓名2 */
    an_name3?: string;
    /** 标签 */
    ao_tags?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type deleteACUserNewsIdParams = {
    /** id of ACUserNew */
    id: number;
  };

  type deleteAdminV1ABCreditHistoriesIdParams = {
    /** id of ABCreditHistory */
    id: number;
  };

  type deleteAdminV1AGBlackReasonsIdParams = {
    /** id of AGBlackReason */
    id: number;
  };

  type deleteAdminV1AIBlackUsersIdParams = {
    /** id of AIBlackUser */
    id: number;
  };

  type deleteAdminV1AKReasonsIdParams = {
    /** id of AKReason */
    id: number;
  };

  type deleteAdminV1ALAdminFilesIdParams = {
    /** id of ALAdminFile */
    id: number;
  };

  type deleteAdminV1AMBlackHitHistoriesIdParams = {
    /** id of AMBlackHitHistory */
    id: number;
  };

  type deleteAdminV1AUsersIdParams = {
    /** id of AUser */
    id: number;
  };

  type deleteAdminV1CurrentUsersIdParams = {
    /** id of CurrentUser */
    id: number;
  };

  type deleteAEBorrowAdminOperatesIdParams = {
    /** id of AEBorrowAdminOperate */
    id: number;
  };

  type deleteAFChannelsIdParams = {
    /** id of AFChannel */
    id: number;
  };

  type deleteAHUserSupsIdParams = {
    /** id of AHUserSup */
    id: number;
  };

  type deleteNoticeIconItemsIdParams = {
    /** id of NoticeIconItem */
    id: number;
  };

  type deleteUsersIdParams = {
    /** id of User */
    id: number;
  };

  type getACUserNewsIdParams = {
    /** id of ACUserNew */
    id: number;
  };

  type getAdminV1ABCreditHistoriesIdParams = {
    /** id of ABCreditHistory */
    id: number;
  };

  type getAdminV1ABCreditHistoriesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1ACUserNewsParams = {
    /** a_user_id */
    a_user_id: number;
  };

  type getAdminV1AGBlackReasonsIdParams = {
    /** id of AGBlackReason */
    id: number;
  };

  type getAdminV1AGBlackReasonsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1AIBlackUsersIdParams = {
    /** id of AIBlackUser */
    id: number;
  };

  type getAdminV1AIBlackUsersParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1AKReasonsIdParams = {
    /** id of AKReason */
    id: number;
  };

  type getAdminV1AKReasonsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1ALAdminFilesIdParams = {
    /** id of ALAdminFile */
    id: number;
  };

  type getAdminV1ALAdminFilesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1ALAdminFilesTempleteNameParams = {
    /** id of ALAdminFile */
    name: string;
  };

  type getAdminV1AMBlackHitHistoriesIdParams = {
    /** id of AMBlackHitHistory */
    id: number;
  };

  type getAdminV1AMBlackHitHistoriesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1AUsersIdParams = {
    /** id of AUser */
    id: number;
  };

  type getAdminV1AUsersParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1CaptchaTypeParams = {
    /** type of Captcha */
    id: number;
  };

  type getAdminV1ChannelsEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1CurrentUsersIdParams = {
    /** id of CurrentUser */
    id: number;
  };

  type getAdminV1RBlacksParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1UsersEnumParams = {
    /** foo */
    foo: number;
  };

  type getAEBorrowAdminOperatesIdParams = {
    /** id of AEBorrowAdminOperate */
    id: number;
  };

  type getAFChannelsIdParams = {
    /** id of AFChannel */
    id: number;
  };

  type getAFChannelsParams = {
    /** foo */
    foo: number;
  };

  type getAHUserSupsIdParams = {
    /** id of AHUserSup */
    id: number;
  };

  type getAHUserSupsParams = {
    /** Page */
    current: number;
    /** pageSize */
    pageSize: number;
  };

  type getNoticeIconItemsIdParams = {
    /** id of NoticeIconItem */
    id: number;
  };

  type getRBlacksIdParams = {
    /** id of RBlack */
    id: number;
  };

  type getUsersIdParams = {
    /** id of User */
    id: number;
  };

  type getUsersParams = {
    /** Page */
    current: number;
    /** pageSize */
    pageSize: number;
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

  type putACUserNewsIdParams = {
    /** id of ACUserNew */
    id: number;
  };

  type putAdminV1ABCreditHistoriesIdParams = {
    /** id of ABCreditHistory */
    id: number;
  };

  type putAdminV1AGBlackReasonsIdParams = {
    /** id of AGBlackReason */
    id: number;
  };

  type putAdminV1AIBlackUsersIdParams = {
    /** id of AIBlackUser */
    id: number;
  };

  type putAdminV1AKReasonsIdParams = {
    /** id of AKReason */
    id: number;
  };

  type putAdminV1ALAdminFilesIdParams = {
    /** id of ALAdminFile */
    id: number;
  };

  type putAdminV1AMBlackHitHistoriesIdParams = {
    /** id of AMBlackHitHistory */
    id: number;
  };

  type putAdminV1AUsersIdParams = {
    /** id of AUser */
    id: number;
  };

  type putAdminV1CurrentUsersIdParams = {
    /** id of CurrentUser */
    id: number;
  };

  type putAEBorrowAdminOperatesIdParams = {
    /** id of AEBorrowAdminOperate */
    id: number;
  };

  type putAFChannelsIdParams = {
    /** id of AFChannel */
    id: number;
  };

  type putAHUserSupsIdParams = {
    /** id of AHUserSup */
    id: number;
  };

  type putNoticeIconItemsIdParams = {
    /** id of NoticeIconItem */
    id: number;
  };

  type putRBlacksIdParams = {
    /** id of RBlack */
    id: number;
  };

  type putUsersIdParams = {
    /** id of User */
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

  type RBlack = {
    /** id */
    id?: number;
    /** 信息* */
    a_info?: string;
    /** 信息命中次数* */
    b_hit_count?: number;
    /** 1:手机号 2:身份证号 3:身份证2号 4:银行卡 5:imei 6:mac 7:设备 */
    c_type?: number;
    /** 结束时间* */
    d_overdate?: string;
    /** 管理员id* */
    e_admin_id?: number;
    /** 原因 */
    f_black_reason_id?: string;
    /** 类型 1：导入黑名单 2：系统录入 3：管理员录入* */
    g_type?: number;
    /** 备注 */
    h_remark?: string;
    /** 是否已扫描* 0：未扫描 1：已扫描 */
    i_scan?: number;
    /** 扫描结束时间* */
    j_scan_date?: string;
    /** 影响灰名单数量 */
    k_gray_hit_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type RBlackComplex = {
    /** user_id */
    user_id?: number;
    /** a_reason_id */
    a_reason_id?: number;
    /** d_overdate */
    d_overdate?: string;
    /** 信息* */
    b_comment?: string;
    /** 批量id（a_l_admin_file.id） */
    c_batch_sn?: number;
  };

  type User = {
    /** id */
    id?: number;
    /** role_id */
    role_id?: number;
    /** name */
    name: string;
    /** email */
    email: string;
    /** email_verified_at */
    email_verified_at?: string;
    /** password */
    password: string;
    /** remember_token */
    remember_token?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
  };
}

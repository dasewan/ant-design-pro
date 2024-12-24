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
    g_risk_strategy_id?: number;
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
    d_status?: string;
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
    /** 累计减免次数 */
    i_deduction_count?: number;
    /** 累计减免金额 */
    j_deduction_amount?: number;
    /** 累计核销次数 */
    k_write_off_count?: number;
    /** 累计核销金额 */
    l_write_off_amount?: number;
    /** 借款次数 */
    m_borrow_count?: number;
    /** 累计逾期次数 */
    n_overdue_count?: number;
    /** 累计逾期天数 */
    o_overdue_days?: number;
    /** 提前还款次数 */
    p_early_repay_count?: number;
    /** 正常还款次数 */
    r_normal_repay_count?: number;
    /** 放款次数 */
    s_loan_count?: number;
    /** 放款金额 */
    t_loan_amount?: number;
    /** 还款次数（所有类型的次数，包括部分还款） */
    u_repay_count?: number;
    /** 还款金额 */
    v_repay_amount?: number;
    /** 拨打电话次数 */
    w_call_count?: number;
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
    a_user?: AUser;
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
    /** 备注* */
    j_comment?: string;
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

  type ANRiskItemCat = {
    /** id */
    id?: number;
    /** CODE */
    a_code?: string;
    /** 字段名称  */
    b_name?: string;
    /** 字段名称国际化 */
    c_local_name?: string;
    /** 关联字段数 */
    d_related_count?: number;
    /** 描述 */
    e_description?: string;
    /** 描述国际化 */
    f_local_description?: string;
    /** 备注 */
    g_comment?: string;
    /** 父id */
    h_parent_id?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
    /** App\Models\ANRiskItemCat */
    a_a_a_a_g_d_risk_item?: GDRiskItem[];
    /** children */
    children?: ANRiskItemCat[];
  };

  type AOLoanBank = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** 身份证认证状态 10:待认证，20已认证 30：认证拒绝 40：认证过期 50：复审 */
    b_status?: number;
    /** 认证有效时间 */
    c_valid_date?: string;
    /** 银行名称 */
    d_bank_name?: number;
    /** 银行code */
    e_bank_code?: string;
    /** 银行卡号 */
    f_bank_card_no?: string;
    /** 照片1 */
    g_bank_card_img?: string;
    /** 照片2 */
    h_bank_card_img2?: string;
    /** 信息1 */
    i_info1?: string;
    /** 信息2 */
    j_info1?: string;
    /** 信息3 */
    k_info1?: string;
    /** 认证id */
    l_verify_id?: number;
    /** 认证次数粗豪 */
    m_index?: number;
    /** 黑名单id */
    n_black_id?: number;
    /** 灰名单id */
    o_grey_id?: number;
    /** 银行id */
    p_loan_bank_id?: number;
    /** 金融code */
    q_finance_code?: string;
    /** 重复的卡数量 */
    r_repeated_count?: number;
    /** 持有人姓 */
    s_first_name?: string;
    /** 持有人名 */
    t_middle_name?: string;
    /** 持有人名 */
    u_last_name?: string;
    /** 其他人相同卡号人数 */
    v_loan_success_times?: number;
    /** 成功放款金额 */
    w_loan_total_amount?: number;
    /** 是否已经验真 10：待验真 30：验真结果未知 40:验真失败 50：验真成功 */
    x_authenticity?: number;
    /** 审核原因 */
    y_reasons?: string;
    /** 审核管理员 */
    z_admin_id?: number;
    /** 验真原始内容 */
    a_a_authenticity_raw?: string;
    /** 审核原因详情 */
    a_b_reasons_detail?: string;
    /** 证件号 */
    a_c_idnumber?: string;
    /** 手机号 */
    a_d_phone?: string;
    /** email */
    a_e_email?: string;
    /** 出生日期 */
    a_f_birth_day?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type APReviewGroup = {
    /** id */
    id?: number;
    /** 审核小组名称 */
    a_name?: string;
    /** 借款次数 */
    b_borrow_times?: string;
    /** 权重 */
    c_weight?: number;
    /** 状态 0:禁用 1:启用 */
    d_status?: string;
    /** 审核渠道 */
    e_channels?: string;
    /** 审核管理员 */
    f_admins?: string;
    /** 分配模式 */
    g_mode?: string;
    /** 借款产品 */
    h_products?: string;
    /** created_at */
    created_at?: string;
    /** 待审核案件数 */
    i_review_wait_count?: number;
    /** 审核拒绝案件数 */
    j_review_refuse_count?: number;
    /** 审核通过案件数 */
    k_review_accept_count?: number;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type ARReviewAdmin = {
    /** id */
    id?: number;
    /** 审核小组名称 */
    a_name?: string;
    /** 管理员id */
    b_admin_id?: number;
    /** 审核小组 */
    c_review_group_id?: string;
    /** 是否可以审核证件 */
    d_can_id_number?: string;
    /** 是否可以审核联系人 */
    e_can_contact_persion?: string;
    /** 是否可以审核工作信息 */
    f_can_job?: string;
    /** 是否可以审核通讯录 */
    g_can_contact?: string;
    /** 是否可以审核短信 */
    h_can_sms?: string;
    /** 是否可以查看风控信息 */
    i_can_risk?: string;
    /** 状态 0:禁用 1:启用 */
    j_status?: string;
    /** 是否可以查看app信息 */
    k_can_app?: string;
    /** 是否可以查看历史订单信息 */
    l_can_history_borrow?: string;
    /** 借款次数 */
    m_borrow_times?: string;
    /** 待审核案件数 */
    n_review_wait_count?: number;
    /** 审核拒绝案件数 */
    o_review_refuse_count?: number;
    /** 审核通过案件数 */
    p_review_accept_count?: number;
    /** 首借待审核案件数 */
    q_review_wait_count1?: number;
    /** 复借2-4待审核案件数 */
    r_review_wait_count2?: number;
    /** 复借5+待审核案件数 */
    s_review_wait_count3?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type ASRiskValueSmsSuspicious = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 用户 */
    b_borrow_id?: number;
    /** 手机号码 */
    c_phone?: string;
    /** 风控字段 */
    d_risk_item_id?: number;
    /** 风控字段分类 */
    e_risk_item_cat_id?: number;
    /** 字段名标识 */
    f_risk_item_name_flag?: string;
    /** 3天内 */
    g_value_3?: number;
    /** 7天内 */
    h_value_7?: number;
    /** 15天内 */
    i_value_15?: number;
    /** 30天内 */
    j_value_30?: number;
    /** 60天内 */
    k_value_60?: number;
    /** 90天内 */
    l_value_90?: number;
    /** 180天内 */
    m_value_180?: number;
    /** 360天内 */
    n_value_360?: number;
    /** 所有天内 */
    o_value_0?: number;
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
    /** 1：未认证 2：认证过期 3：活体 4：待签约 */
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
    r_current_borrow_id?: string;
    /** 当前认证项id */
    s_current_verify_id?: number;
    /** 当前订单状态* */
    t_cur_borrow_status?: string;
    /** 在途产品id */
    u_on_way_product_id?: string;
    /** 最多申请产品数 */
    v_max_count?: number;
    /** 注册类型 网页，手机，邀请，电销* */
    w_register_type?: string;
    /** 用户标签 */
    x_tags?: string;
    /** 是否卸载 */
    y_suspect_unload?: string;
    /** 电销人员* */
    z_saler_admin_id?: number;
    /** 审核人员* */
    a_a_review_admin_id?: number;
    /** 在催管理员* */
    a_b_collection_admin_id?: number;
    /** 提额券数量* */
    a_c_coupon_count?: number;
    /** 邀请成功次数* */
    a_d_invite_count?: number;
    /** 消息数 */
    a_e_message?: number;
    /** 累计放款笔数* */
    a_f_loan_count?: number;
    /** 累计展期笔数* */
    a_g_extend_count?: number;
    /** 逾期次数* */
    a_h_overdue_times?: number;
    /** 最大逾期天数* */
    a_i_repay_max_overdue_days?: number;
    /** 损益* */
    a_j_loss?: number;
    /** 费用消耗 */
    a_k_consume?: number;
    /** 最后一次结清时间 */
    a_l_last_settled_time?: string;
    /** 最后一次访问时间 */
    a_m_access_time?: number;
    /** 累计逾期天数* */
    a_n_total_overdue_days?: number;
    /** 客服消息数 */
    a_o_service_count?: number;
    /** 借款次数 */
    a_p_borrow_count?: number;
    /** 结清次数 */
    a_q_settled_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BAWhite = {
    /** id */
    id?: number;
    a_a_a_a_a_a_user?: AUser;
    /** 信息* */
    a_phone: string;
    /** 用户id* */
    b_user_id?: number;
    /** 注册离新增间隔天数* */
    c_span_days?: number;
    /** 营销次数* */
    d_market_times?: number;
    /** 渠道id* */
    e_channel_id?: number;
    /** 是否已扫描* 0：未扫描 1：已扫描 */
    f_scan?: number;
    /** 扫描结束时间* */
    g_scan_date?: string;
    /** 文件id* */
    h_admin_file_id?: number;
    /** 有效时间* */
    i_valid_date?: string;
    /** 白名单状态 1：正常 2：有过逾期 3：有过严重逾期 4：在逾 5：过期 6：禁止* */
    j_status?: number;
    /** 管理员id* */
    k_admin_id?: number;
    /** 初始授信额度* */
    l_credit_amount?: number;
    /** 命中次数 */
    m_hit_count?: number;
    /** 最近命中时间 */
    n_last_hit_time?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BBProductSnapshotCopy = {
    /** id */
    id?: number;
    /** 快照id */
    a_product_snapshot_id?: number;
    /** 产品名称* */
    b_name?: number;
    /** 产品额度* */
    c_amount: number;
    /** 产品单位* */
    d_unit?: number;
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
    m_can_part_pay?: number;
    /** 是否可以展期 */
    n_can_extend?: number;
    /** 产品类型* 1:真实产品 2:虚拟产品 3:贷超产品 */
    o_type?: number;
    /** 产品链接 */
    p_url?: number;
    /** 解锁信用分* */
    q_unlock_credit_fraction?: number;
    /** 最小结清次数 */
    r_settled_times?: number;
    /** 最大逾期天数 */
    s_max_overdue_days?: number;
    /** 最大逾期次数 */
    t_max_overdue_times?: number;
    /** 状态* */
    u_status?: number;
    /** 展示排序 */
    v_sort?: number;
    /** 浏览次数 */
    w_views?: number;
    /** 描述* */
    x_introduction?: number;
    /** 备注* */
    y_comment?: number;
    /** 产品期数* */
    z_period?: number;
    /** 产品额度类型：1 灵活额度（用户授信额度）2：固定额度* */
    a_a_amount_type?: number;
    /** 每日可借数量* */
    a_b_day_valid_count: number;
    /** 每日可借数量* */
    a_c_admin_id?: number;
    /** 产品标签* */
    a_d_tags?: number;
    /** 产品特点* */
    a_e_features?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BCProductFeature = {
    /** id */
    id?: number;
    /** 标题* */
    b_title: string;
    /** 内容* */
    c_content: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BDRiskRoleBundle = {
    /** id */
    id?: number;
    /** 规则名称  */
    a_name?: string;
    /** 关联细则组数 */
    b_related_role_group_count?: number;
    /** 关联细则数 */
    c_related_role_count?: number;
    /** 分数上限 */
    d_score_upper_limit?: number;
    /** 执行逻辑 */
    e_execute_logic?: string;
    /** 最终决策 */
    f_finnal_decision?: string;
    /** 规则描述 */
    g_description?: string;
    /** 规则名称本地化  */
    h_local_name?: string;
    /** 同一bundles不同版本的标识 */
    i_code?: string;
    /** 版本号 */
    j_version?: number;
    /** 是否是最新版本 */
    k_is_current?: number;
    /** 版本序号 */
    l_verdion_index?: number;
    /** 当前版本数量 */
    m_version_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
    /** App\Models\BDRiskRoleBundle */
    a_a_a_a_g_f_risk_role?: GFRiskRole[];
  };

  type BEImportResult = {
    /** id */
    id?: number;
    /** 用户id* */
    a_admin_file_id?: number;
    /** 导入类型 1:白名单 2:黑名单 3:营销名单 4:其他* */
    b_type?: number;
    /** 所属渠道id* */
    c_channel_id?: number;
    /** 有效期* */
    d_valid_date?: string;
    /** 导入数量 */
    e_import_count?: number;
    /** 有效数量 */
    f_valid_count?: number;
    /** 已注册数量 */
    g_register_count?: number;
    /** 重复数量 */
    h_repeat_count?: number;
    /** 管理员 */
    i_admin_id?: number;
    /** 导入执行时长 */
    j_during_second?: number;
    /** 执行状态 1:待执行 2：执行中 3：执行成功 4：执行失败 */
    k_status?: number;
    /** 计划执行时间 */
    l_expect_execute_at?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BFReviewBorrow = {
    /** id */
    id?: number;
    a_a_a_a_a_d_borrow?: DBorrow;
    /** 订单id */
    a_borrow_id?: number;
    /** 管理员id */
    b_admin_id?: number;
    /** 审核结果 0:待审核 1: 通过 2:拒绝 */
    c_result?: number;
    /** 证件号 */
    d_id_number_result?: number;
    /** 联系人 */
    e_contact_persion_result?: number;
    /** 工作信息 */
    f_job_result?: number;
    /** 通讯录 */
    g_contact_result?: number;
    /** 短信 */
    h_sms_result?: number;
    /** 风控 */
    i_risk_result?: number;
    /** app */
    j_app_result?: number;
    /** 历史订单 */
    k_history_result?: number;
    /** 流转次数 */
    l_flow_count?: number;
    /** 审核组id */
    m_review_group_id?: number;
    /** 借款类型种类 */
    n_borrow_times_type?: number;
    /** 设备 */
    o_device_result?: number;
    /** 银行 */
    p_bank_result?: number;
    /** 备注 */
    q_comment?: string;
    /** 活体 */
    r_liveness_result?: number;
    /** ocr */
    s_ocr_result?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BGReviewTag = {
    /** id */
    id?: number;
    /** 标签名称 */
    a_name?: string;
    /** 备注 */
    b_comment?: string;
    /** 命中数 */
    c_hit_count?: number;
    /** d_type */
    d_type?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BHReviewBorrowFlow = {
    /** id */
    id?: number;
    a_a_a_a_a_d_borrow?: DBorrow;
    /** 订单id */
    a_borrow_id?: number;
    /** 流转之前审核组 */
    b_before_admin_id?: number;
    /** 流转之前管理员 */
    c_before_review_group_id?: number;
    /** 流转之后管理员 */
    d_after_admin_id?: number;
    /** 流转之后管理员 */
    e_after_review_group_id?: number;
    /** 操作管理员 */
    f_admin_id?: number;
    /** g_type */
    g_type?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BIPaymentChannel = {
    /** id */
    id?: number;
    /** 名称 */
    a_name?: string;
    /** 标识 */
    b_channel_code?: string;
    /** logo */
    c_logo?: string;
    /** 方法 */
    d_method?: string;
    /** 渠道类型 */
    e_type?: string;
    /** 排序 */
    f_sort?: number;
    /** 状态 */
    g_status?: string;
    /** 方法名称 */
    h_method_name?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
    /** App\Models\BIPaymentChannel */
    a_a_a_a_h_a_payment_channel_bank?: HAPaymentChannelBank[];
  };

  type BJContact = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 关系 */
    b_relation?: string;
    /** 亲近程度 */
    c_close_level?: string;
    /** 呼叫次数 */
    d_call_times?: number;
    /** 是否注册 */
    e_registered?: number;
    /** 放款次数 */
    f_loan_times?: number;
    /** 结清次数 */
    g_repay_times?: number;
    /** 关联用户 */
    h_related_user_id?: number;
    /** 最后一次呼叫时间 */
    i_last_call_time?: string;
    /** identifier */
    identifier?: string;
    /** displayName */
    displayName?: string;
    /** givenName */
    givenName?: string;
    /** middleName */
    middleName?: string;
    /** familyName */
    familyName?: string;
    /** prefix */
    prefix?: string;
    /** suffix */
    suffix?: string;
    /** company */
    company?: string;
    /** jobTitle */
    jobTitle?: string;
    /** androidAccountType */
    androidAccountType?: string;
    /** androidAccountName */
    androidAccountName?: string;
    /** phones */
    phoneValue?: string;
    /** phoneLabel */
    phoneLabel?: string;
    /** postalAddresses */
    postalAddresses?: string;
    /** birthday */
    birthday?: string;
    /** 关联短信数 */
    j_sms_count?: number;
    /** 关联短信 */
    k_sms?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BKCollectionRole = {
    /** id */
    id?: number;
    /** 催收阶段 */
    a_collection_stage_id?: number;
    /** 催收机构 */
    b_collection_agency_id?: number;
    /** 催收机构占比 */
    c_collection_agency_proportion?: number;
    /** 催收小组 */
    d_collection_group_id?: number;
    /** 催收小组占比 */
    e_collection_group_proportion?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BLCollectionOrder = {
    /** id */
    id?: number;
    /** 父id */
    a_borrow_id?: number;
    /** 阶段id */
    b_collection_stage_id?: number;
    /** 机构id */
    c_collection_agency_id?: number;
    /** 小组id */
    d_collection_group_id?: number;
    /** 催员id */
    e_collection_admin_id?: number;
    /** 入催日志id（作为q_c_collection_news.parent_id） */
    f_collection_news_id?: number;
    /** 流转次数 */
    g_collection_order_flow_history_count?: number;
    /** 催员催记数 */
    h_collection_admin_log_count?: number;
    /** 催员拨打电话数 */
    i_collection_admin_call_count?: number;
    /** 系统催收短信数 */
    j_system_sms_count?: number;
    /** 最新状态（只针对催员记录状态和承诺未还） */
    k_status?: number;
    /** 累计催回金额 */
    l_collection_amount?: number;
    /** 分期id */
    m_period_id?: number;
    /** 入催金额 */
    n_borrow_amount?: number;
    /** 分期期数 */
    o_period_index?: number;
    /** 预计还款时间 */
    p_expect_repay_time?: string;
    /** 结束锁定的阶段 */
    q_lock_end_stage_id?: number;
    /** 流入时间 */
    r_flow_in_time?: string;
    /** 流出时间（倒计时，方便催员把握催收进度） */
    s_flow_out_time?: string;
    /** 订单sn(冗余) */
    t_borrow_sn?: string;
    /** 用户手机(冗余) */
    u_phone?: string;
    /** 用户姓名(冗余) */
    v_name?: string;
    /** 查看次数 */
    w_view_times?: number;
    /** 当前催员查看次数 */
    x_current_view_times?: number;
    /** 当前催员记录日志次数 */
    y_current_log_count?: number;
    /** 当前催员电催次数 */
    z_current_call_count?: number;
    /** 累计佣金 */
    a_a_commission?: number;
    /** 当前佣金 */
    a_b_current_commission?: number;
    /** 当前催回可得佣金 */
    a_c_expect_current_commission?: number;
    /** 最近日志时间 */
    a_d_last_log_time?: string;
    /** 借款次数 */
    a_e_borrow_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type BMBorrowRiskResult = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** 订单id */
    b_borrow_id?: number;
    /** 认证id */
    c_verify_id?: number;
    /** 决策路由 */
    d_risk_strategy_route_id?: number;
    /** 决策 */
    e_risk_strategy_id?: number;
    /** 人审管理员 */
    f_admin_id?: number;
    /** 手机号码 */
    g_phone?: string;
    /** 订单号 */
    h_borrow_sn?: string;
    /** 订单金额 */
    i_amount?: number;
    /** 借款次数 */
    j_borrow_count?: number;
    /** 机审结果 */
    k_machine_result?: number;
    /** 人审结果 */
    l_review_result?: number;
    /** 信用分 */
    m_score?: number;
    /** 拒绝数 */
    n_reject_risk_role_count?: number;
    /** 通过数 */
    o_accept_risk_role_count?: number;
    /** 人审数 */
    p_review_risk_role_count?: number;
    /** 拒绝占比 */
    q_refuse_risk_role_rate?: number;
    /** 渠道 */
    r_channel?: string;
    /** 短信数 */
    s_sms?: string;
    /** 联系人数 */
    t_contact?: string;
    /** app数 */
    u_app?: string;
    /** 地区 */
    v_region?: string;
    /** 年龄 */
    w_age?: string;
    /** 类型 1：风控 2：回滚 */
    x_type?: number;
    /** 年龄画像 */
    y_age_risk_tag_id?: number;
    /** 地区画像 */
    z_region_risk_tag_id?: number;
    /** app画像 */
    a_a_app_risk_tag_id?: number;
    /** 联系人画像 */
    a_b_contact_tag_id?: number;
    /** 短信画像 */
    a_c_sms_tag_id?: number;
    /** 渠道画像 */
    a_d_channel_tag_id?: number;
    /** 借款次数画像 */
    a_e_borrow_count_tag_id?: number;
    /** 是否放款 0:未放款 1:已放款 */
    a_f_is_loan?: number;
    /** 应还款期数 */
    a_g_expected_period_count?: number;
    /** 首逾次数 */
    a_h_dpd1_count?: number;
    /** 结清次数 */
    a_i_settled_count?: number;
    /** deleted_at */
    deleted_at?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
  };

  type BorrowDetail = {
    /** id */
    id?: number;
    n_user_profile?: NUserProfile;
    a_user?: AUser;
    /** App\Models\Complex\BorrowDetail */
    extend_data?: PeriodDetail[];
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
    /** 产品期数* */
    z_period?: number;
    /** 产品额度类型：1 灵活额度（用户授信额度）2：固定额度* */
    a_a_amount_type?: number;
    /** 每日可借数量* */
    a_b_day_valid_count?: number;
    /** 快照数量* */
    a_c_snapshot_count?: number;
    /** 产品标签* */
    a_d_tags?: string;
    /** 产品标签* */
    a_e_features?: string;
    /** 图片 */
    a_f_pic?: string;
    /** App\Models\BProduct */
    a_a_a_a_b_c_product_features?: BCProductFeature[];
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type CommonTab = {
    /** key */
    key?: string;
    /** tab_count */
    tab_count?: number;
    /** today_count */
    today_count?: number;
    /** tooltip */
    tooltip?: string;
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

  type DACollectionKpi = {
    /** id */
    id?: number;
    /** 催收阶段 */
    a_collection_stage_id?: number;
    /** 催收机构 */
    b_collection_agency_id?: number;
    /** kpi类型 1：新案件 2：就案件和部分催回 */
    c_type?: number;
    /** 催回level */
    d_level?: number;
    /** 催回率 */
    e_collection_amount_begin_rate?: number;
    /** 催回率 */
    f_collection_amount_end_rate?: number;
    /** 佣金 */
    g_commission_rate?: number;
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
    /** App\Models\DBorrow */
    a_a_a_a_a_q_b_periods?: QBPeriod[];
    a_a_a_a_a_a_a_user?: AUser;
    a_a_a_a_a_o_a_repay?: OARepay;
    a_a_a_a_a_n_user_profile?: NUserProfile;
    a_a_a_a_a_g_verify?: GVerify;
    a_a_a_a_a_b_m_borrow_risk_result?: BMBorrowRiskResult;
    a_a_a_a_a_h_product_snapshot?: HProductSnapshot;
    a_a_a_a_a_g_g_risk_stratey?: GGRiskStratey;
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
    /** 风控结果 */
    f_risk_result_id?: number;
    /** 风控id */
    g_risk_strategy_id?: number;
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
    u_settled_period?: number;
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
    a_a_risk_score?: number;
    /** 展期次数 */
    a_b_extend_times?: number;
    /** 部分还款次数 */
    a_c_partial_times?: number;
    /** 减免次数 */
    a_d_reduce_times?: number;
    /** 优惠券次数 */
    a_e_coupon_times?: number;
    /** 查看次数(电销,审核,催收人员) */
    a_f_operate_times?: number;
    /** 间隔天数（距离上次结清后再创建订单时的天数） */
    a_g_span_days?: number;
    /** 累计逾期天数 */
    a_h_total_overdue_days?: number;
    /** 逾期天数 (计划任务更新) */
    a_i_overdue_days?: number;
    /** 身份证1 */
    a_j_idnumber?: string;
    /** 电话 */
    a_k_phone?: string;
    /** 姓名1 */
    a_l_name1?: string;
    /** 银行卡 */
    a_m_bankcard?: string;
    /** 借款天数 */
    a_n_days?: string;
    /** 标签 */
    a_o_tags?: string;
    /** 分期期数 */
    a_p_period_count?: number;
    /** 签约时间 */
    a_r_sign_time?: string;
    /** 当前催员 */
    a_s_urge_admin_id?: number;
    /** 最大展期天数 */
    a_t_max_extend_days?: number;
    /** 状态时间 关闭状态此字段为关闭时间，拒绝状态此字段为下次可重新申请日期，机审和人审为预计完成时间 */
    a_u_status_time?: string;
    /** 催收日志数量 */
    a_v_urge_log_count?: number;
    /** 发送短信数量 */
    a_w_sms_count?: number;
    /** 操作日志 */
    a_x_action_count?: number;
    /** 风控结果 */
    a_y_risk_result?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type DBSmsOrder = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** 商户id */
    b_merchant_id?: number;
    /** sender id */
    c_sender_id?: string;
    /** 商户名称 */
    d_merchant_name?: string;
    /** 借款状态 */
    f_status?: number;
    /** 拒绝时间 */
    g_refuse_time?: string;
    /** 放款时间 */
    h_loan_time?: string;
    /** 放款金额 */
    i_amount?: number;
    /** 借款天数 */
    a_d_loan_days?: number;
    /** 应还款时间 */
    j_expect_repay_time?: string;
    /** 应还款金额 */
    k_expect_repay_amount?: number;
    /** 已还款金额 */
    l_paid_amount?: number;
    /** 结清时间 */
    a_e_repay_time?: string;
    /** 逾期天数 */
    t_overdue_days?: number;
    /** 逾期最大金额 */
    u_max_overdue_amount?: number;
    /** 短信总数 */
    m_sms_count?: number;
    /** 关联的sms.id */
    a_h_sms_ids?: string;
    /** 拒绝短信总数 */
    n_refuse_sms_count?: number;
    /** 放款短信总数 */
    o_loan_sms_count?: number;
    /** 还款短信总数 */
    p_repay_sms_count?: number;
    /** 逾期短信总数 */
    q_overdue_sms_count?: number;
    /** 第一条短信时间 */
    r_first_sms_time?: string;
    /** 最后一条短信时间 */
    s_last_sms_time?: string;
    /** 最后逾期短信时间 */
    w_last_overdue_sms_time?: string;
    /** 最后营销时间 */
    x_last_marketing_sms_time?: string;
    /** 最后召回时间 */
    z_last_recall_sms_time?: string;
    /** 营销短信数量 */
    a_a_marketing_sms_count?: number;
    /** 召回短信数量 */
    a_b_recall_sms_count?: number;
    /** 严重逾期短信数量 */
    a_c_serious_overdue_sms_count?: number;
    /** 展期时间 */
    a_f_extend_time?: string;
    /** 展期总额 */
    a_g_extend_amount?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type DCBorrowRiskDetail = {
    /** id */
    id?: number;
    /** App\Models\DCBorrowRiskDetail */
    a_a_a_a_a_g_f_risk_role?: GFRiskRole[];
    /** 用户id */
    a_user_id?: number;
    /** 订单id */
    b_borrow_id?: number;
    /** 认证id */
    c_verify_id?: number;
    /** 决策路由 */
    d_risk_strategy_route_id?: number;
    /** 决策 */
    e_risk_strategy_id?: number;
    /** 规则id */
    f_risk_role_bundle_id?: number;
    /** 细则组id */
    g_risk_role_group_id?: number;
    /** 细则id */
    h_risk_role_id?: number;
    /** 组机审结果 */
    i_risk_role_group_result?: string;
    /** 细则机审结果 */
    j_risk_role_result?: string;
    /** 值 */
    k_value?: string;
    /** 分值 */
    l_score?: number;
    /** 右侧值 */
    m_right_value?: string;
    /** 字段 */
    n_risk_item_id?: number;
    /** 右侧字段 */
    o_right_risk_item_id?: number;
    /** 风控结果 */
    p_borrow_risk_result_id?: number;
    /** deleted_at */
    deleted_at?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
  };

  type DDRecallDetail = {
    /** id */
    id?: number;
    /** 召回 */
    a_recall_id: number;
    /** 用户id */
    b_user_id: number;
    /** 手机号 */
    c_phone: string;
    /** 姓名 */
    d_name: string;
    /** 结果 1：已找回 0 未召回 */
    e_result?: number;
    /** 回归时间 */
    f_return_time?: string;
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

  type deleteAdminV1AFChannelsIdParams = {
    /** id of AFChannel */
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

  type deleteAdminV1ANRiskItemCatsIdParams = {
    /** id of ANRiskItemCat */
    id: number;
  };

  type deleteAdminV1APReviewGroupsIdParams = {
    /** id of APReviewGroup */
    id: number;
  };

  type deleteAdminV1ARReviewAdminsIdParams = {
    /** id of ARReviewAdmin */
    id: number;
  };

  type deleteAdminV1ASRiskValueSmsSuspiciousesIdParams = {
    /** id of ASRiskValueSmsSuspicious */
    id: number;
  };

  type deleteAdminV1AUsersIdParams = {
    /** id of AUser */
    id: number;
  };

  type deleteAdminV1BAWhitesIdParams = {
    /** id of BAWhite */
    id: number;
  };

  type deleteAdminV1BBProductSnapshotCopiesIdParams = {
    /** id of BBProductSnapshotCopy */
    id: number;
  };

  type deleteAdminV1BCProductFeaturesIdParams = {
    /** id of BCProductFeature */
    id: number;
  };

  type deleteAdminV1BDRiskRoleBundlesIdParams = {
    /** id of BDRiskRoleBundle */
    id: number;
  };

  type deleteAdminV1BEImportResultsIdParams = {
    /** id of BEImportResult */
    id: number;
  };

  type deleteAdminV1BFReviewBorrowsIdParams = {
    /** id of BFReviewBorrow */
    id: number;
  };

  type deleteAdminV1BGReviewTagsIdParams = {
    /** id of BGReviewTag */
    id: number;
  };

  type deleteAdminV1BHReviewBorrowFlowsIdParams = {
    /** id of BHReviewBorrowFlow */
    id: number;
  };

  type deleteAdminV1BIPaymentChannelsIdParams = {
    /** id of BIPaymentChannel */
    id: number;
  };

  type deleteAdminV1BJContactsIdParams = {
    /** id of BJContact */
    id: number;
  };

  type deleteAdminV1BKCollectionRolesIdParams = {
    /** id of BKCollectionRole */
    id: number;
  };

  type deleteAdminV1BLCollectionOrdersIdParams = {
    /** id of BLCollectionOrder */
    id: number;
  };

  type deleteAdminV1BMBorrowRiskResultsIdParams = {
    /** id of BMBorrowRiskResult */
    id: number;
  };

  type deleteAdminV1BProductsIdParams = {
    /** id of BProduct */
    id: number;
  };

  type deleteAdminV1CurrentUsersIdParams = {
    /** id of CurrentUser */
    id: number;
  };

  type deleteAdminV1DACollectionKpisIdParams = {
    /** id of DACollectionKpi */
    id: number;
  };

  type deleteAdminV1DBorrowsIdParams = {
    /** id of DBorrow */
    id: number;
  };

  type deleteAdminV1DBSmsOrdersIdParams = {
    /** id of DBSmsOrder */
    id: number;
  };

  type deleteAdminV1DCBorrowRiskDetailsIdParams = {
    /** id of DCBorrowRiskDetail */
    id: number;
  };

  type deleteAdminV1DDRecallDetailsIdParams = {
    /** id of DDRecallDetail */
    id: number;
  };

  type deleteAdminV1GAMarketingDetailsIdParams = {
    /** id of GAMarketingDetail */
    id: number;
  };

  type deleteAdminV1GBMarketingsIdParams = {
    /** id of GBMarketing */
    id: number;
  };

  type deleteAdminV1GCMarketingHistoriesIdParams = {
    /** id of GCMarketingHistory */
    id: number;
  };

  type deleteAdminV1GDRiskItemsIdParams = {
    /** id of GDRiskItem */
    id: number;
  };

  type deleteAdminV1GERiskRoleGroupsIdParams = {
    /** id of GERiskRoleGroup */
    id: number;
  };

  type deleteAdminV1GFRiskRolesIdParams = {
    /** id of GFRiskRole */
    id: number;
  };

  type deleteAdminV1GGRiskStrateiesIdParams = {
    /** id of GGRiskStratey */
    id: number;
  };

  type deleteAdminV1GHSettingsIdParams = {
    /** id of GHSetting */
    id: number;
  };

  type deleteAdminV1GIRiskStrategyBundlesIdParams = {
    /** id of GIRiskStrategyBundle */
    id: number;
  };

  type deleteAdminV1GJRiskTagsIdParams = {
    /** id of GJRiskTag */
    id: number;
  };

  type deleteAdminV1GKBanksIdParams = {
    /** id of GKBank */
    id: number;
  };

  type deleteAdminV1GLPhotosIdParams = {
    /** id of GLPhoto */
    id: number;
  };

  type deleteAdminV1GMCollectionAdminsIdParams = {
    /** id of GMCollectionAdmin */
    id: number;
  };

  type deleteAdminV1GNCollectionStagesIdParams = {
    /** id of GNCollectionStage */
    id: number;
  };

  type deleteAdminV1GORiskValueSmsSlopesIdParams = {
    /** id of GORiskValueSmsSlope */
    id: number;
  };

  type deleteAdminV1GPEasyPaymentsIdParams = {
    /** id of GPEasyPayment */
    id: number;
  };

  type deleteAdminV1GVerifiesIdParams = {
    /** id of GVerify */
    id: number;
  };

  type deleteAdminV1HAPaymentChannelBanksIdParams = {
    /** id of HAPaymentChannelBank */
    id: number;
  };

  type deleteAdminV1HCDevicesIdParams = {
    /** id of HCDevice */
    id: number;
  };

  type deleteAdminV1HDDynamicDevicesIdParams = {
    /** id of HDDynamicDevice */
    id: number;
  };

  type deleteAdminV1HECollectionGroupsIdParams = {
    /** id of HECollectionGroup */
    id: number;
  };

  type deleteAdminV1HFCollectionAgencyRolesIdParams = {
    /** id of HFCollectionAgencyRole */
    id: number;
  };

  type deleteAdminV1HGGreysIdParams = {
    /** id of HGGrey */
    id: number;
  };

  type deleteAdminV1HHRecallsIdParams = {
    /** id of HHRecall */
    id: number;
  };

  type deleteAdminV1HIBackTipsIdParams = {
    /** id of HIBackTip */
    id: number;
  };

  type deleteAdminV1HProductSnapshotsIdParams = {
    /** id of HProductSnapshot */
    id: number;
  };

  type deleteAdminV1MBLoansIdParams = {
    /** id of MBLoan */
    id: number;
  };

  type deleteAdminV1MCExtendsIdParams = {
    /** id of MCExtend */
    id: number;
  };

  type deleteAdminV1MCLoanLogsIdParams = {
    /** id of MCLoanLog */
    id: number;
  };

  type deleteAdminV1MGBannersIdParams = {
    /** id of MGBanner */
    id: number;
  };

  type deleteAdminV1NBCollectionGroupRolesIdParams = {
    /** id of NBCollectionGroupRole */
    id: number;
  };

  type deleteAdminV1NCCollectionOrderFlowsIdParams = {
    /** id of NCCollectionOrderFlowHistory */
    id: number;
  };

  type deleteAdminV1NDRiskValueSmsIncomesIdParams = {
    /** id of NDRiskValueSmsIncome */
    id: number;
  };

  type deleteAdminV1NERiskStrategyRoutesIdParams = {
    /** id of NERiskStrategyRoute */
    id: number;
  };

  type deleteAdminV1NFSmsContactsIdParams = {
    /** id of NFSmsContact */
    id: number;
  };

  type deleteAdminV1NGNotificationsIdParams = {
    /** id of NGNotification */
    id: number;
  };

  type deleteAdminV1OARepaysIdParams = {
    /** id of OARepay */
    id: number;
  };

  type deleteAdminV1OBKycsIdParams = {
    /** id of OBKyc */
    id: number;
  };

  type deleteAdminV1QCCollectionNewsIdParams = {
    /** id of QCCollectionNews */
    id: number;
  };

  type deleteAdminV1QEPaymentGatewayLogsIdParams = {
    /** id of QEPaymentGatewayLog */
    id: number;
  };

  type deleteAdminV1QFSmsGatewayLogsIdParams = {
    /** id of QFSmsGatewayLog */
    id: number;
  };

  type deleteAdminV1QVerifyItemsIdParams = {
    /** id of QVerifyItem */
    id: number;
  };

  type deleteAdminV1RARepayLogsIdParams = {
    /** id of RARepayLog */
    id: number;
  };

  type deleteAdminV1RCSmsIdParams = {
    /** id of RCSms */
    id: number;
  };

  type deleteAdminV1RERiskValueSmsBasicsIdParams = {
    /** id of RERiskValueSmsBasic */
    id: number;
  };

  type deleteAdminV1SAAppsIdParams = {
    /** id of SAApp */
    id: number;
  };

  type deleteAdminV1SBAppsIdParams = {
    /** id of SBApp */
    id: number;
  };

  type deleteAdminV1SCRiskValueSmsIdParams = {
    /** id of SCRiskValueSms */
    id: number;
  };

  type deleteAdminV1SDLivenessesIdParams = {
    /** id of SDLiveness */
    id: number;
  };

  type deleteAdminV1SEVirtualAccountsIdParams = {
    /** id of SEVirtualAccount */
    id: number;
  };

  type deleteAdminV1TARiskValueSmsOrdersIdParams = {
    /** id of TARiskValueSmsOrder */
    id: number;
  };

  type deleteAdminV1TBSmsIdParams = {
    /** id of TBSms */
    id: number;
  };

  type deleteAdminV1TCollectionAgenciesIdParams = {
    /** id of TCollectionAgency */
    id: number;
  };

  type deleteAdminV1TCOtherGatewayLogsIdParams = {
    /** id of TCOtherGatewayLog */
    id: number;
  };

  type deleteAdminV1VCollectionAssignLogsIdParams = {
    /** id of VCollectionAssignLog */
    id: number;
  };

  type deleteAdminV1WAMarketingsIdParams = {
    /** id of WAMarketing */
    id: number;
  };

  type deleteAdminV1WBProductOverduesIdParams = {
    /** id of WBProductOverdue */
    id: number;
  };

  type deleteAdminV1WCProductLoanOverduesIdParams = {
    /** id of WCProductLoanOverdue */
    id: number;
  };

  type deleteAdminV1WDMultiDimensionOverduesIdParams = {
    /** id of WDMultiDimensionOverdue */
    id: number;
  };

  type deleteAdminV1WEProductProfitsIdParams = {
    /** id of WEProductProfit */
    id: number;
  };

  type deleteAdminV1WFDailyReportsIdParams = {
    /** id of WFDailyReport */
    id: number;
  };

  type deleteAdminV1WHOverdueRiskItemRangesIdParams = {
    /** id of WHOverdueRiskItemRange */
    id: number;
  };

  type deleteAdminV1WIRiskBundlesIdParams = {
    /** id of WIRiskBundle */
    id: number;
  };

  type deleteAdminV1WJRiskStrategiesIdParams = {
    /** id of WJRiskStrategy */
    id: number;
  };

  type deleteAdminV1WKRiskTagsIdParams = {
    /** id of WKRiskTag */
    id: number;
  };

  type deleteAdminV1WLCollectionAdminsIdParams = {
    /** id of WLCollectionAdmin */
    id: number;
  };

  type deleteAdminV1WMCollectionReportsIdParams = {
    /** id of WMCollectionReport */
    id: number;
  };

  type deleteAdminV1WNCollectionFlowsIdParams = {
    /** id of WNCollectionFlow */
    id: number;
  };

  type deleteAdminV1WOFeesIdParams = {
    /** id of WOFee */
    id: number;
  };

  type deleteAdminV1WPBackFillsIdParams = {
    /** id of WPBackFill */
    id: number;
  };

  type deleteAdminV1WQSmsReportsIdParams = {
    /** id of WQSmsReport */
    id: number;
  };

  type deleteAdminV1WRSmsTemplatesIdParams = {
    /** id of WRSmsTemplate */
    id: number;
  };

  type deleteAEBorrowAdminOperatesIdParams = {
    /** id of AEBorrowAdminOperate */
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

  type GAMarketingDetail = {
    /** id */
    id?: number;
    a_a_a_a_a_a_user?: AUser;
    /** 手机号* */
    a_phone: string;
    /** 用户名* */
    b_name?: string;
    /** Email* */
    c_email?: string;
    /** 用户id* */
    d_user_id?: number;
    /** 营销id* */
    e_marketing_id?: number;
    /** 营销历史id* */
    f_marketing_history_id?: number;
    /** 短信次数* */
    g_sms_times?: number;
    /** 邮件次数* */
    h_email_times?: number;
    /** 渠道id* */
    i_channel_id?: number;
    /** 间隔天数* */
    j_span_days?: number;
    /** 查看次数* */
    k_view_count?: number;
    /** 上次成功时间 */
    l_last_marketing_time?: string;
    /** 最近查看时间 */
    m_last_viewed_time?: string;
    /** 文件id */
    n_admin_file_id?: number;
    /** 状态 0：待营销 1：营销中 2：过期 */
    o_status?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GBMarketing = {
    /** id */
    id?: number;
    /** 当前历史id* */
    a_marketing_history_id?: number;
    /** 渠道id* */
    b_channel_id?: number;
    /** 管理员id* */
    c_admin_id?: number;
    /** 导入数量* */
    d_import_count?: number;
    /** 有效数量* */
    e_valid_count?: number;
    /** 注册数量* */
    f_register_count?: number;
    /** 营销次数* */
    g_marketing_times?: number;
    /** 发送短信总数* */
    h_sms_times?: number;
    /** 发送邮件总数* */
    i_email_times?: number;
    /** 备注* */
    j_comment?: string;
    /** 文件id* */
    k_admin_file_id?: number;
    /** 执行类型 */
    l_type?: string;
    /** 状态：1待执行 2：执行中 3：执行成功 4：执行失败* 5： 无效 */
    m_status?: number;
    /** 注册数量* */
    n_viewed_count?: number;
    /** 查看数量（用户去重，隔天统计）* */
    o_viewed_deduplication_count?: number;
    /** 上次成功时间 */
    p_last_marketing_time?: string;
    /** 营销名称* */
    q_title: string;
    /** 已注册数量 */
    r_register_count?: number;
    /** 重复数量 */
    s_repeat_count?: number;
    /** 黑名单数量 */
    t_black_count?: number;
    /** 首次营销时间 */
    u_first_marketing_time?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
    g_c_marketing_histories?: GCMarketingHistory;
  };

  type GCMarketingHistory = {
    /** id */
    id?: number;
    /** 营销id* */
    a_marketing_id?: number;
    /** 管理员id* */
    b_admin_id?: number;
    /** 短信模版* */
    c_sms_templete_id?: number;
    /** 主题* */
    d_theme_id?: number;
    /** 营销批次 */
    e_batch_sn?: string;
    /** 注册数量* */
    f_register_count?: number;
    /** 查看数量（用户去重，隔天统计)* */
    j_viewed_deduplication_count?: number;
    /** 营销数量* */
    k_marketing_count?: number;
    /** 类型 1：未注册 2：未查看* */
    l_type?: number;
    /** 状态：1待执行 2：执行中 3：执行成功 4：执行失败* */
    m_status?: number;
    /** 备注 */
    g_comment?: string;
    /** h_begin_at */
    h_begin_at?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GDRiskItem = {
    /** id */
    id?: number;
    /** 字段名称  */
    a_name?: string;
    /** 字段名称国际化 */
    b_local_name?: string;
    /** CODE */
    c_code?: string;
    /** 分类id */
    d_cat_id?: number;
    /** 字段类型 1：整型 2：浮点型 3：字符串型 */
    e_type?: number;
    /** 关联细则数 */
    f_related_count?: number;
    /** 描述 */
    g_description?: string;
    /** 描述国际化 */
    h_local_description?: string;
    /** 备注 */
    i_comment?: string;
    /** 去重数量 */
    j_related_deduplicated_count?: number;
    /** 分类父id */
    k_parent_cat_id?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GERiskRoleGroup = {
    /** id */
    id?: number;
    /** 规则id */
    a_risk_role_bundle_id?: number;
    /** 关联细则数 */
    b_related_role_count?: number;
    /** 执行逻辑 */
    c_execute_logic?: string;
    /** 分数 */
    d_score?: number;
    /** 决策 */
    e_decision?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
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
    /** foo */
    foo: number;
  };

  type getAdminV1AFChannelsIdParams = {
    /** id of AFChannel */
    id: number;
  };

  type getAdminV1AFChannelsParams = {
    /** foo */
    foo: number;
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

  type getAdminV1ANRiskItemCatEnumsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1ANRiskItemCatsIdParams = {
    /** id of ANRiskItemCat */
    id: number;
  };

  type getAdminV1ANRiskItemCatsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1APReviewGroupsConfigParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1APReviewGroupsEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1APReviewGroupsIdParams = {
    /** id of APReviewGroup */
    id: number;
  };

  type getAdminV1APReviewGroupsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1ARReviewAdminsIdParams = {
    /** id of ARReviewAdmin */
    id: number;
  };

  type getAdminV1ARReviewAdminsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1ASRiskValueSmsSuspiciousesIdParams = {
    /** id of ASRiskValueSmsSuspicious */
    id: number;
  };

  type getAdminV1ASRiskValueSmsSuspiciousesParams = {
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

  type getAdminV1BanksEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BAWhitesIdParams = {
    /** id of BAWhite */
    id: number;
  };

  type getAdminV1BAWhitesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BAWhitesUsersParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BAWhiteTabParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BBProductSnapshotCopiesIdParams = {
    /** id of BBProductSnapshotCopy */
    id: number;
  };

  type getAdminV1BBProductSnapshotCopiesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BCProductFeaturesIdParams = {
    /** id of BCProductFeature */
    id: number;
  };

  type getAdminV1BCProductFeaturesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BDRiskRoleBundlesEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BDRiskRoleBundlesIdParams = {
    /** id of BDRiskRoleBundle */
    id: number;
  };

  type getAdminV1BDRiskRoleBundlesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BEImportResultsIdParams = {
    /** id of BEImportResult */
    id: number;
  };

  type getAdminV1BEImportResultsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BFReviewBorrowsIdParams = {
    /** id of BFReviewBorrow */
    id: number;
  };

  type getAdminV1BFReviewBorrowsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BGReviewTagsIdParams = {
    /** id of BGReviewTag */
    id: number;
  };

  type getAdminV1BGReviewTagsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BHReviewBorrowFlowsIdParams = {
    /** id of BHReviewBorrowFlow */
    id: number;
  };

  type getAdminV1BHReviewBorrowFlowsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BIPaymentChannelsIdParams = {
    /** id of BIPaymentChannel */
    id: number;
  };

  type getAdminV1BIPaymentChannelsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BJContactsIdParams = {
    /** id of BJContact */
    id: number;
  };

  type getAdminV1BJContactsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BKCollectionRolesIdParams = {
    /** id of BKCollectionRole */
    id: number;
  };

  type getAdminV1BKCollectionRolesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BLCollectionOrdersIdParams = {
    /** id of BLCollectionOrder */
    id: number;
  };

  type getAdminV1BLCollectionOrdersParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BMBorrowRiskResultsIdParams = {
    /** id of BMBorrowRiskResult */
    id: number;
  };

  type getAdminV1BMBorrowRiskResultsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1BProductsIdParams = {
    /** id of BProduct */
    id: number;
  };

  type getAdminV1BProductsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1CaptchaTypeParams = {
    /** type of Captcha */
    id: number;
  };

  type getAdminV1ChannelsDownloadIdParams = {
    /** id of ALAdminFile */
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

  type getAdminV1DACollectionKpisIdParams = {
    /** id of DACollectionKpi */
    id: number;
  };

  type getAdminV1DACollectionKpisParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBorrowsClearedParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBorrowsClosedParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBorrowsIdParams = {
    /** id of DBorrow */
    id: number;
  };

  type getAdminV1DBorrowsOutstandingParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBorrowsOverdueParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBorrowsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBorrowsProfileIdParams = {
    /** id of DBorrow */
    id: number;
  };

  type getAdminV1DBorrowsQueueLoanParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBorrowsRejectedParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBorrowsWaitingLoanParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBorrowTabParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DBSmsOrdersIdParams = {
    /** id of DBSmsOrder */
    id: number;
  };

  type getAdminV1DBSmsOrdersParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DCBorrowRiskDetailsIdParams = {
    /** id of DCBorrowRiskDetail */
    id: number;
  };

  type getAdminV1DCBorrowRiskDetailsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1DDRecallDetailsIdParams = {
    /** id of DDRecallDetail */
    id: number;
  };

  type getAdminV1DDRecallDetailsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GAMarketingDetailsIdParams = {
    /** id of GAMarketingDetail */
    id: number;
  };

  type getAdminV1GAMarketingDetailsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GAMarketingDetailsTabParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GBMarketingsIdParams = {
    /** id of GBMarketing */
    id: number;
  };

  type getAdminV1GBMarketingsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GCMarketingHistoriesIdParams = {
    /** id of GCMarketingHistory */
    id: number;
  };

  type getAdminV1GCMarketingHistoriesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GDRiskItemEnum2Params = {
    /** foo */
    foo: number;
  };

  type getAdminV1GDRiskItemEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GDRiskItemsIdParams = {
    /** id of GDRiskItem */
    id: number;
  };

  type getAdminV1GDRiskItemsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GERiskRoleGroupsIdParams = {
    /** id of GERiskRoleGroup */
    id: number;
  };

  type getAdminV1GERiskRoleGroupsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GFRiskRolesIdParams = {
    /** id of GFRiskRole */
    id: number;
  };

  type getAdminV1GFRiskRolesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GGRiskStrateiesEnums2Params = {
    /** foo */
    foo: number;
  };

  type getAdminV1GGRiskStrateiesEnumsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GGRiskStrateiesIdParams = {
    /** id of GGRiskStratey */
    id: number;
  };

  type getAdminV1GGRiskStrateiesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GHSettingsIdParams = {
    /** id of GHSetting */
    id: number;
  };

  type getAdminV1GHSettingsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GIRiskStrategyBundlesIdParams = {
    /** id of GIRiskStrategyBundle */
    id: number;
  };

  type getAdminV1GIRiskStrategyBundlesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GJRiskTagsEnumsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GJRiskTagsIdParams = {
    /** id of GJRiskTag */
    id: number;
  };

  type getAdminV1GJRiskTagsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GKBanksIdParams = {
    /** id of GKBank */
    id: number;
  };

  type getAdminV1GKBanksParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GLPhotosIdParams = {
    /** id of GLPhoto */
    id: number;
  };

  type getAdminV1GLPhotosParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GMCollectionAdminsEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GMCollectionAdminsIdParams = {
    /** id of GMCollectionAdmin */
    id: number;
  };

  type getAdminV1GMCollectionAdminsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GNCollectionStagesEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GNCollectionStagesIdParams = {
    /** id of GNCollectionStage */
    id: number;
  };

  type getAdminV1GNCollectionStagesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GORiskValueSmsSlopesIdParams = {
    /** id of GORiskValueSmsSlope */
    id: number;
  };

  type getAdminV1GORiskValueSmsSlopesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GPEasyPaymentsIdParams = {
    /** id of GPEasyPayment */
    id: number;
  };

  type getAdminV1GPEasyPaymentsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1GVerifiesIdParams = {
    /** id of GVerify */
    id: number;
  };

  type getAdminV1GVerifiesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HAPaymentChannelBanksIdParams = {
    /** id of HAPaymentChannelBank */
    id: number;
  };

  type getAdminV1HAPaymentChannelBanksParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HCDevicesIdParams = {
    /** id of HCDevice */
    id: number;
  };

  type getAdminV1HCDevicesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HDDynamicDevicesIdParams = {
    /** id of HDDynamicDevice */
    id: number;
  };

  type getAdminV1HDDynamicDevicesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HECollectionGroupsEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HECollectionGroupsIdParams = {
    /** id of HECollectionGroup */
    id: number;
  };

  type getAdminV1HECollectionGroupsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HFCollectionAgencyRolesIdParams = {
    /** id of HFCollectionAgencyRole */
    id: number;
  };

  type getAdminV1HFCollectionAgencyRolesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HGGreysIdParams = {
    /** id of HGGrey */
    id: number;
  };

  type getAdminV1HGGreysParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HHRecallsIdParams = {
    /** id of HHRecall */
    id: number;
  };

  type getAdminV1HHRecallsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HIBackTipsIdParams = {
    /** id of HIBackTip */
    id: number;
  };

  type getAdminV1HIBackTipsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1HProductSnapshotsIdParams = {
    /** id of HProductSnapshot */
    id: number;
  };

  type getAdminV1HProductSnapshotsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1MBFailedLoansParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1MBInterceptLoansParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1MBLoansIdParams = {
    /** id of MBLoan */
    id: number;
  };

  type getAdminV1MBLoansParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1MBLoanTabParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1MCExtendsIdParams = {
    /** id of MCExtend */
    id: number;
  };

  type getAdminV1MCExtendsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1MCLoanLogsIdParams = {
    /** id of MCLoanLog */
    id: number;
  };

  type getAdminV1MCLoanLogsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1MGBannersIdParams = {
    /** id of MGBanner */
    id: number;
  };

  type getAdminV1MGBannersParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1NBCollectionGroupRolesIdParams = {
    /** id of NBCollectionGroupRole */
    id: number;
  };

  type getAdminV1NBCollectionGroupRolesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1NCCollectionOrderFlowsIdParams = {
    /** id of NCCollectionOrderFlowHistory */
    id: number;
  };

  type getAdminV1NCCollectionOrderFlowsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1NDRiskValueSmsIncomesIdParams = {
    /** id of NDRiskValueSmsIncome */
    id: number;
  };

  type getAdminV1NDRiskValueSmsIncomesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1NERiskStrategyRoutesEnumsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1NERiskStrategyRoutesIdParams = {
    /** id of NERiskStrategyRoute */
    id: number;
  };

  type getAdminV1NERiskStrategyRoutesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1NFSmsContactsIdParams = {
    /** id of NFSmsContact */
    id: number;
  };

  type getAdminV1NFSmsContactsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1NGNotificationsIdParams = {
    /** id of NGNotification */
    id: number;
  };

  type getAdminV1NGNotificationsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1OARepaysIdParams = {
    /** id of OARepay */
    id: number;
  };

  type getAdminV1OARepaysParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1OBKycsIdParams = {
    /** id of OBKyc */
    id: number;
  };

  type getAdminV1OBKycsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1ProductsEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1QCCollectionNewsIdParams = {
    /** id of QCCollectionNews */
    id: number;
  };

  type getAdminV1QCCollectionNewsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1QEPaymentGatewayLogsIdParams = {
    /** id of QEPaymentGatewayLog */
    id: number;
  };

  type getAdminV1QEPaymentGatewayLogsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1QFSmsGatewayLogsIdParams = {
    /** id of QFSmsGatewayLog */
    id: number;
  };

  type getAdminV1QFSmsGatewayLogsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1QVerifyItemsIdParams = {
    /** id of QVerifyItem */
    id: number;
  };

  type getAdminV1QVerifyItemsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1RARepayLogsIdParams = {
    /** id of RARepayLog */
    id: number;
  };

  type getAdminV1RARepayLogsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1RBlacksParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1RBlackTabParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1RCSmsIdParams = {
    /** id of RCSms */
    id: number;
  };

  type getAdminV1RCSmsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1RERiskValueSmsBasicsIdParams = {
    /** id of RERiskValueSmsBasic */
    id: number;
  };

  type getAdminV1RERiskValueSmsBasicsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1SAAppsIdParams = {
    /** id of SAApp */
    id: number;
  };

  type getAdminV1SAAppsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1SBAppsIdParams = {
    /** id of SBApp */
    id: number;
  };

  type getAdminV1SBAppsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1SCRiskValueSmsIdParams = {
    /** id of SCRiskValueSms */
    id: number;
  };

  type getAdminV1SCRiskValueSmsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1SDLivenessesIdParams = {
    /** id of SDLiveness */
    id: number;
  };

  type getAdminV1SDLivenessesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1SEVirtualAccountsIdParams = {
    /** id of SEVirtualAccount */
    id: number;
  };

  type getAdminV1SEVirtualAccountsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1TARiskValueSmsOrdersIdParams = {
    /** id of TARiskValueSmsOrder */
    id: number;
  };

  type getAdminV1TARiskValueSmsOrdersParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1TBSmsIdParams = {
    /** id of TBSms */
    id: number;
  };

  type getAdminV1TBSmsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1TCollectionAgenciesEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1TCollectionAgenciesIdParams = {
    /** id of TCollectionAgency */
    id: number;
  };

  type getAdminV1TCollectionAgenciesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1TCOtherGatewayLogsIdParams = {
    /** id of TCOtherGatewayLog */
    id: number;
  };

  type getAdminV1TCOtherGatewayLogsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1UsersEnumParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1VCollectionAssignLogsIdParams = {
    /** id of VCollectionAssignLog */
    id: number;
  };

  type getAdminV1VCollectionAssignLogsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WAMarketingsIdParams = {
    /** id of WAMarketing */
    id: number;
  };

  type getAdminV1WAMarketingsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WBProductOverduesIdParams = {
    /** id of WBProductOverdue */
    id: number;
  };

  type getAdminV1WBProductOverduesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WCProductLoanOverduesIdParams = {
    /** id of WCProductLoanOverdue */
    id: number;
  };

  type getAdminV1WCProductLoanOverduesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WDMultiDimensionOverduesIdParams = {
    /** id of WDMultiDimensionOverdue */
    id: number;
  };

  type getAdminV1WDMultiDimensionOverduesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WEProductProfitsIdParams = {
    /** id of WEProductProfit */
    id: number;
  };

  type getAdminV1WEProductProfitsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WFDailyReportsIdParams = {
    /** id of WFDailyReport */
    id: number;
  };

  type getAdminV1WFDailyReportsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WHOverdueRiskItemRangesIdParams = {
    /** id of WHOverdueRiskItemRange */
    id: number;
  };

  type getAdminV1WHOverdueRiskItemRangesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WIRiskBundlesIdParams = {
    /** id of WIRiskBundle */
    id: number;
  };

  type getAdminV1WIRiskBundlesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WJRiskStrategiesIdParams = {
    /** id of WJRiskStrategy */
    id: number;
  };

  type getAdminV1WJRiskStrategiesIndex2Params = {
    /** foo */
    foo: number;
  };

  type getAdminV1WJRiskStrategiesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WKRiskTagsIdParams = {
    /** id of WKRiskTag */
    id: number;
  };

  type getAdminV1WKRiskTagsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WLCollectionAdminsIdParams = {
    /** id of WLCollectionAdmin */
    id: number;
  };

  type getAdminV1WLCollectionAdminsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WMCollectionReportsIdParams = {
    /** id of WMCollectionReport */
    id: number;
  };

  type getAdminV1WMCollectionReportsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WNCollectionFlowsIdParams = {
    /** id of WNCollectionFlow */
    id: number;
  };

  type getAdminV1WNCollectionFlowsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WOFeesIdParams = {
    /** id of WOFee */
    id: number;
  };

  type getAdminV1WOFeesParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WPBackFillsIdParams = {
    /** id of WPBackFill */
    id: number;
  };

  type getAdminV1WPBackFillsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WQSmsReportsIdParams = {
    /** id of WQSmsReport */
    id: number;
  };

  type getAdminV1WQSmsReportsParams = {
    /** foo */
    foo: number;
  };

  type getAdminV1WRSmsTemplatesIdParams = {
    /** id of WRSmsTemplate */
    id: number;
  };

  type getAdminV1WRSmsTemplatesParams = {
    /** foo */
    foo: number;
  };

  type getAEBorrowAdminOperatesIdParams = {
    /** id of AEBorrowAdminOperate */
    id: number;
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

  type GFRiskRole = {
    /** id */
    id?: number;
    /** 规则id */
    a_risk_role_bundle_id?: number;
    /** 组id */
    b_risk_role_group_id?: number;
    /** 字段id */
    c_risk_item_id?: number;
    /** 取值类型 const：常数 operator：算术运算 */
    d_value_type?: string;
    /** 算术运算公式 */
    e_value_operator?: string;
    /** 关系运算符 */
    f_relational_operator?: string;
    /** 取值类型 const：常数 variable：变量 */
    g_compare_type?: string;
    /** 字段id */
    h_compare_risk_item_id?: number;
    /** 取值类型 const：常数 operator：算术运算 */
    i_compare_value_type?: string;
    /** 算术运算公式 */
    j_compare_value_operator?: string;
    /** 统计用md5(tmp_risk_item_id+value_type+value_operator...) */
    k_role_item_profile?: string;
    /** 组内细则数量 */
    l_group_count?: number;
    /** 组内细则index */
    m_group_index?: number;
    /** n_execute_logic */
    n_execute_logic?: string;
    /** 字段组id */
    o_risk_item_cat_id?: number;
    /** 风控分类id */
    p_compare_risk_item_cat_id?: number;
    /** 风控分类父id */
    q_risk_item_cat_parent_id?: number;
    /** 风控父类id */
    r_compare_risk_item_cat_parent_id?: number;
    /** 分值 */
    s_score?: number;
    /** 决策 */
    t_decision?: string;
    /** 规则index */
    u_bundle_index?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GGRiskStratey = {
    /** id */
    id?: number;
    /** 策略名称  */
    a_name?: string;
    /** 关联细则组数 */
    b_related_role_group_count?: number;
    /** 关联细则数 */
    c_related_role_count?: number;
    /** d */
    d?: number;
    /** 同一strategy不同版本的标识 */
    e_code?: string;
    /** 版本号 */
    f_version?: number;
    /** 是否是最新版本 */
    g_is_current?: number;
    /** 版本序号 */
    h_verdion_index?: number;
    /** 当前版本数量 */
    i_version_count?: number;
    /** 是否熔断，收费项前如果拒绝，则不跑收费项 */
    j_fuse?: string;
    /** 管理员id */
    k_admin_id?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
    /** App\Models\GGRiskStratey */
    a_a_a_a_g_i_risk_strategy_bundles?: GIRiskStrategyBundle[];
  };

  type GHSetting = {
    /** id */
    id?: number;
    /** title* */
    a_title: string;
    /** 描述* */
    b_description: string;
    /** code* */
    c_code: string;
    /** option* */
    d_option_key: string;
    /** value* */
    e_value: string;
    /** 父id */
    f_parent_id?: number;
    /** 状态* */
    g_disabled?: string;
    /** 字段类型* */
    h_field_type?: string;
    /** 配置分类* */
    i_cat: string;
    /** 展示排序 */
    j_sort?: number;
    /** badge */
    k_badge?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GIRiskStrategyBundle = {
    /** id */
    id?: number;
    /** 策略id */
    a_risk_strategy_id?: number;
    /** 细则组id */
    b_risk_role_bundle_id?: number;
    /** 执行顺序 */
    c_sort?: number;
    /** 关联细则组code */
    d_code?: string;
    /** 版本 */
    e_version?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GJRiskTag = {
    /** id */
    id?: number;
    /** 名称* */
    a_name?: string;
    /** 取值* */
    b_values?: string;
    /** 分组* */
    c_group?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GKBank = {
    /** id */
    id?: number;
    /** 银行全名 */
    a_name?: string;
    /** 简写 */
    b_ab_name?: string;
    /** 标识 */
    c_bank_code?: string;
    /** 金融标识 */
    d_finnace_code?: string;
    /** logo */
    e_logo?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GLPhoto = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 一年内新增相册数 */
    one_year_ago_count?: number;
    /** 一月内新增相册数 */
    one_month_ago_count?: number;
    /** 一周内新增相册数 */
    one_week_ago_count?: number;
    /** 一天内新增相册数 */
    one_day_ago_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GMCollectionAdmin = {
    /** id */
    id?: number;
    /** 名称 */
    a_name?: string;
    /** 管理员 */
    b_admin_id?: number;
    /** 所属机构 */
    c_collection_agency_id?: number;
    /** 所属组 */
    d_collection_group_id?: number;
    /** 负责的催收阶段 */
    e_collection_stages?: string;
    /** 状态 */
    f_status?: number;
    /** 备注 */
    g_comment?: string;
    /** 在催订单数 */
    h_collection_ing_order_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GNCollectionStage = {
    /** id */
    id?: number;
    /** App\Models\GNCollectionStage */
    a_a_a_a_a_h_f_collection_agency_roles?: HFCollectionAgencyRole[];
    /** 名称 */
    a_name?: string;
    /** 流转类型 1：随机 2：排除 3：保留 */
    b_flow_type?: number;
    /** 起始天数 */
    c_start_day?: number;
    /** 结束天数 */
    d_end_day?: number;
    /** 状态 */
    e_status?: number;
    /** 备注 */
    f_comment?: string;
    /** 分配模式 1：按比补齐 2：按比分配 */
    g_assign_type?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GORiskValueSmsSlope = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 用户 */
    b_borrow_id?: number;
    /** 手机号码 */
    c_phone?: string;
    /** 风控字段 */
    d_risk_item_id?: number;
    /** 风控字段分类 */
    e_risk_item_cat_id?: number;
    /** 字段名标识 */
    f_risk_item_name_flag?: string;
    /** 存在短信的周数 */
    g_week_count?: number;
    /** 收到短信的总数 */
    h_sum?: number;
    /** 收到短信的平均数 */
    i_avg?: number;
    /** 收到短信数的方差 */
    j_variance?: number;
    /** 收到短信数的标准差 */
    k_standard_deviation?: number;
    /** 短信趋势 */
    l_slope?: number;
    /** 短信相关性系数 */
    m_relevant?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GPEasyPayment = {
    /** id */
    id?: number;
    /** 排序 */
    a_user_id?: number;
    /** 网关 */
    b_gateway_code?: string;
    /** kyc */
    c_action?: string;
    /** 接口 */
    d_endpoint?: string;
    /** 状态 */
    e_status?: string;
    /** extra */
    f_extra?: string;
    /** extra */
    g_extra?: string;
    /** extra */
    h_extra?: string;
    /** extra */
    i_extra?: string;
    /** extra */
    j_extra?: string;
    /** message */
    k_message?: string;
    /** message */
    l_message?: string;
    /** 请求 */
    m_request?: string;
    /** 请求md5 */
    n_request_md5?: string;
    /** 返回 */
    o_response?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type GVerify = {
    /** id */
    id?: number;
    a_a_a_a_a_q_a_ocr?: QAOcr;
    /** App\Models\GVerify */
    a_a_a_a_a_q_a_ocrs?: QAOcr[];
    a_a_a_a_a_m_idnumber?: MIdnumber;
    /** App\Models\GVerify */
    a_a_a_a_a_m_idnumbers?: MIdnumber[];
    a_a_a_a_a_o_contact?: OContact;
    /** App\Models\GVerify */
    a_a_a_a_a_o_contacts?: OContact[];
    a_a_a_a_a_m_a_job?: MAJob;
    /** App\Models\GVerify */
    a_a_a_a_a_m_a_jobs?: MAJob[];
    a_a_a_a_a_a_o_loan_bank?: AOLoanBank;
    /** App\Models\GVerify */
    a_a_a_a_a_a_o_loan_banks?: AOLoanBank[];
    /** 用户id */
    a_user_id?: number;
    /** 订单id */
    b_borrow_id?: number;
    /** 风控id */
    c_risk_id?: number;
    /** 风控分数 */
    d_risk_score?: number;
    /** 风控结果 */
    e_risk_result?: number;
    /** 状态 10：待认证 */
    f_status?: number;
    /** g_ */
    g_?: string;
    /** 最早过期时间 */
    h_next_expired_date?: string;
    /** 身份证认证id */
    i_idnumber_verify_id?: number;
    /** 身份证认证状态 10:待认证，20:认证中 30：复审 40：认证拒绝 50：认证通过：60：认证过期 */
    j_idnumber_verify_status?: number;
    /** 活体 */
    k_liveness_verify_id?: number;
    /** 活体状态 */
    l_liveness_verify_status?: number;
    /** 联系人 */
    m_contact_verify_id?: number;
    /** 联系人认证状态 */
    n_contact_verify_status?: number;
    /** 工作信息 */
    o_job_verify_id?: number;
    /** 工作信息状态 */
    p_job_verify_status?: number;
    /** 放款银行卡 */
    q_loan_bank_id?: number;
    /** 放款银行卡认证状态 */
    r_loan_bank_verify_status?: number;
    /** 还款银行卡 */
    s_repay_bank_id?: number;
    /** 还款银行卡认证状态 */
    t_repay_bank_verify_status?: number;
    /** h5 */
    u_h5_verify_id?: number;
    /** h5认证状态 */
    v_h5_verify_status?: number;
    /** 手机号码 */
    w_phone?: string;
    /** ocr */
    x_ocr_verify_id?: number;
    /** ocr认证状态 */
    y_ocr_verify_status?: number;
    /** z_supplement_verify_id */
    z_supplement_verify_id?: number;
    /** a_a_supplement_verify_status */
    a_a_supplement_verify_status?: number;
    /** ocr认证次数 */
    a_b_ocr_verify_times?: number;
    /** 证件号认证次数 */
    a_c_idnumber_verify_times?: number;
    /** 放款银行卡认证次数 */
    a_d_loan_bank_verify_times?: number;
    /** 活体认证次数 */
    a_e_liveness_verify_times?: number;
    /** ocr次数 */
    a_f_ocr_verify_times?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HAPaymentChannelBank = {
    /** id */
    id?: number;
    /** 支付渠道id */
    a_payment_channel_id?: number;
    /** 银行id */
    b_bank_id?: number;
    /** 标识 */
    c_bank_code?: string;
    /** 金融标识 */
    d_finance_code?: string;
    /** 排序 */
    e_sort?: number;
    /** 状态 */
    f_status?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HBOfflineRepay = {
    /** id */
    id?: number;
    /** borrow_id */
    a_borrow_id?: number;
    /** 还款id */
    b_repay_id?: number;
    /** 分期id */
    c_period_id?: number;
    /** 用户 */
    d_user_id?: number;
    /** 申请管理员 */
    e_apply_admin_id?: number;
    /** 审核管理员 */
    f_review_admin_id?: number;
    /** 分期期数 */
    g_period_count?: number;
    /** 线下序号 */
    h_index?: number;
    /** 状态 10:待审核 40：审核拒绝 50：审核通过  */
    i_status?: number;
    /** 申请备注 */
    j_apply_remark?: string;
    /** 申请备注 */
    k_apply_remark?: string;
    /** 审核备注 */
    l_review_remark?: string;
    /** 审核备注 */
    m_review_remark?: string;
    /** 附件id */
    n_file_id?: number;
    /** 附件id */
    o_file_id?: number;
    /** 附件id */
    p_file_id?: number;
    /** 支付金额 */
    q_amount?: number;
    /** 支付时间 */
    x_repay_time?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HCDevice = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 订单 */
    b_borrow_id?: number;
    /** 唯一码 */
    c_device_id?: number;
    /** device android ios windows linux */
    d_device?: string;
    /** md5（进入缓存30天） */
    e_n_max_md5?: string;
    /** index 针对退出后换号登录（准） */
    f_o_index?: string;
    /** index 针对md5（可能不准） */
    g_p_index?: string;
    /** 关联的用户id 针对退出后换号登录（准） */
    h_q_user_ids?: string;
    /** 关联的用户id 针对md5（可能不准） */
    i_r_user_ids?: string;
    /** version */
    version?: string;
    /** board */
    board?: string;
    /** bootloader */
    bootloader?: string;
    /** brand */
    brand?: string;
    /** device */
    device?: string;
    /** display */
    display?: string;
    /** fingerprint */
    fingerprint?: string;
    /** hardware */
    hardware?: string;
    /** host */
    host?: string;
    /** id */
    id2?: string;
    /** manufacturer */
    manufacturer?: string;
    /** model */
    model?: string;
    /** product */
    product?: string;
    /** type */
    type?: string;
    /** isPhysicalDevice */
    isPhysicalDevice?: string;
    /** serialNumber */
    serialNumber?: string;
    /** name */
    name?: string;
    /** systemName */
    systemName?: string;
    /** systemVersion */
    systemVersion?: string;
    /** localizedModel */
    localizedModel?: string;
    /** identifierForVendor */
    identifierForVendor?: string;
    /** appCodeName */
    appCodeName?: string;
    /** appName */
    appName?: string;
    /** appVersion */
    appVersion?: string;
    /** deviceMemory */
    deviceMemory?: string;
    /** language */
    language?: string;
    /** languages */
    languages?: string;
    /** platform */
    platform?: string;
    /** productSub */
    productSub?: string;
    /** userAgent */
    userAgent?: string;
    /** vendor */
    vendor?: string;
    /** vendorSub */
    vendorSub?: string;
    /** hardwareConcurrency */
    hardwareConcurrency?: string;
    /** maxTouchPoints */
    maxTouchPoints?: string;
    /** maxTouchPoints */
    deviceID?: string;
    /** maxTouchPoints */
    isRoot?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HDDynamicDevice = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 订单 */
    b_borrow_id?: number;
    /** h_c_devices.id */
    c_device_id?: number;
    /** device android ios windows linux */
    d_device?: string;
    /** 1:登录 2：认证 3：签约  4：逾前打开 5：逾后打开 6：催收后打开 */
    e_node?: string;
    /** h_c_devices.id */
    f_urge_user_id?: number;
    /** latitude */
    latitude?: string;
    /** longitude */
    longitude?: string;
    /** altitude */
    altitude?: string;
    /** connectivityType */
    connectivityType?: string;
    /** ip */
    ip?: string;
    /** macAddress(需要缓存，用于撸贷风控) */
    macAddress?: string;
    /** connectionType */
    connectionType?: string;
    /** 所属wifi连接的设备数 */
    hostCount?: number;
    /** macAddress */
    ssid?: string;
    /** gps国家 */
    geo_location_country?: string;
    /** gps省 */
    geo_location_state?: string;
    /** gps市 */
    geo_location_city?: string;
    /** gps地址 */
    geo_location_address?: string;
    /** ip国家 */
    ip_location_country?: string;
    /** ip省 */
    ip_location_state?: string;
    /** ip市 */
    ip_location_city?: string;
    /** ip地址 */
    ip_location_address?: string;
    /** 电池电量 */
    battery?: string;
    /** 运营商名称 */
    operator_name?: string;
    /** 运营商国家代码 */
    operator_country_code?: string;
    /** 语言 */
    language_code?: string;
    /** 国家code */
    country_code?: string;
    /** ip lat */
    ip_lat?: string;
    /** ip lon */
    ip_lon?: string;
    /** ip和gps的距离(m) */
    ip_gps_distance?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HECollectionGroup = {
    /** id */
    id?: number;
    /** 名称 */
    a_name?: string;
    /** 管理员 */
    b_admin_id?: number;
    /** 所属机构 */
    c_collection_agency_id?: number;
    /** 负责的催收阶段 */
    d_collection_stages?: string;
    /** 催员数 */
    e_collection_admin_count?: number;
    /** 状态 */
    f_status?: number;
    /** 备注 */
    g_comment?: string;
    /** 在催订单数 */
    h_collection_ing_order_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HFCollectionAgencyRole = {
    /** id */
    id?: number;
    /** App\Models\HFCollectionAgencyRole */
    a_a_a_a_a_n_b_collection_group_roles?: NBCollectionGroupRole[];
    /** 催收阶段 */
    a_collection_stage_id?: number;
    /** 催收机构 */
    b_collection_agency_id?: number;
    /** 催收机构占比 */
    c_collection_agency_proportion?: number;
    /** 分配模式 1：按比补齐 2：按比分配 */
    d_assign_type?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HGGrey = {
    /** id */
    id?: number;
    /** 信息* */
    a_info?: string;
    /** 信息命中次数* */
    b_hit_count?: number;
    /** 1:手机号 2:身份证号 3:身份证2号 4:银行卡 5：设备 */
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
    /** 文件id* */
    l_admin_file_id?: number;
    /** 最近命中时间 */
    m_last_hit_time?: string;
    /** 状态 1：正常 2：已移除 */
    n_status?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HHRecall = {
    /** id */
    id?: number;
    /** 批次 */
    a_sn: string;
    /** 休眠天数 */
    b_sleep_days: string;
    /** 借款次数 */
    c_borrow_count: string;
    /** 逾期总天数 */
    d_overdue_total_days?: string;
    /** 最大逾期天数 */
    e_max_overdue_days?: number;
    /** 平均逾期天数 */
    f_avg_overdue_days?: number;
    /** 信用分 */
    g_credit_score?: string;
    /** 授信额度 */
    h_credit_amount?: string;
    /** 减免次数 */
    i_deduction_count?: string;
    /** 核销次数 */
    j_write_off_count?: string;
    /** 备注 */
    k_comment?: string;
    /** 召回短信 */
    l_sms_text?: string;
    /** 计划召回数 */
    m_recall_count: number;
    /** 管理员 */
    n_admin_id: number;
    /** 已召回次数 */
    o_recalled_times: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type HIBackTip = {
    /** id */
    id?: number;
    /** 类型 */
    a_type?: string;
    /** 内容 */
    b_content?: string;
    /** 状态 */
    d_status: number;
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
    a_a_a_a_b_b_product_snapshot_copy?: BBProductSnapshotCopy;
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
    /** 产品期数* */
    z_period?: number;
    /** 产品额度类型：1 灵活额度（用户授信额度）2：固定额度* */
    a_a_amount_type?: number;
    /** 每日可借数量* */
    a_b_day_valid_count?: number;
    /** 每日可借数量* */
    a_c_admin_id?: number;
    /** 产品标签* */
    a_d_tags: string;
    /** 产品标签* */
    a_e_features: string;
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

  type MAJob = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** ocr.id */
    b_ocr_id?: number;
    /** 身份证认证状态 10:待认证，20已认证 30：认证拒绝 40：认证过期 50：复审 */
    c_status?: number;
    /** 认证有效时间 */
    d_valid_date?: string;
    /** 贷款用途 */
    e_personal_loan_purpose?: number;
    /** 期望贷款周期 */
    f_expect_loan_days?: number;
    /** 期望贷款金额 */
    g_expect_loan_amount?: number;
    /** 婚姻状态 1：已婚 2：未婚 */
    h_marital_status?: number;
    /** 子女数量 */
    i_children_count?: number;
    /** 宗教 */
    j_religion?: number;
    /** 首选语言 */
    k_preferred_language?: number;
    /** 教育水平 */
    l_education?: number;
    /** 住宅类型 */
    m_residential_type?: number;
    /** 当前住址-州 */
    n_current_state_id?: number;
    /** 当前住址-市 */
    o_current_city_id?: number;
    /** 当前住址-区 */
    p_current_district_id?: number;
    /** 当前住址 */
    q_current_address?: string;
    /** 居住时长 */
    r_living_length?: number;
    /** whatsapp */
    s_whatsapp?: string;
    /** facebook */
    t_facebook?: string;
    /** facebook */
    u_email?: string;
    /** 工作状态 */
    v_employment_status?: number;
    /** 雇佣期 */
    w_employment_period?: number;
    /** 月薪 */
    x_monthly_salary?: number;
    /** 发薪方式 */
    y_payroll_period?: number;
    /** 发薪日 */
    z_pay_day?: number;
    /** 公司名称 */
    a_a_company_name?: string;
    /** 雇主姓名 */
    a_b_employer_name?: string;
    /** 雇主电话 */
    a_c_employer_phone?: string;
    /** 公司-州 */
    a_d_company_state_id?: number;
    /** 公司-市 */
    a_e_company_city_id?: number;
    /** 公司-区 */
    a_f_company_district_id?: number;
    /** 公司地址 */
    a_g_company_address?: string;
    /** line */
    a_h_line?: string;
    /** 认证id */
    a_i_verify_id?: number;
    /** 认证次数序号 */
    a_j_index?: number;
    /** 雇主电话关联逾期订单数 */
    a_k_employer_related_overdue_borrows?: number;
    /** 雇主电话关联用户 */
    a_l_employer_related_users?: number;
    /** 所属公司关联逾期订单 */
    a_m_company_related_overdue_borrows?: number;
    /** 所属公司关联用户 */
    a_n_company_related_users?: number;
    /** 雇主命中黑名单 */
    a_o_employer_black_id?: number;
    /** 雇主命中灰名单 */
    a_p_employer_grey_id?: number;
    /** 审核原因 */
    a_q_reasons?: string;
    /** 审核原因详情 */
    a_r_reasons_detail?: string;
    /** 审核管理员id */
    a_s_admin_id?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type MBLoan = {
    /** id */
    id?: number;
    a_a_a_a_a_d_borrow?: DBorrow;
    /** borrow_id */
    a_borrow_id?: number;
    /** loan bank id */
    b_loan_bank_id?: number;
    /** 最终支付渠道 */
    c_payment_channel?: string;
    /** 上次尝试放款时间 */
    d_loan_time?: string;
    /** 打款金额 */
    e_amount?: number;
    /** 状态 10:待放款 20： 放款中 30:未知 40：放款失败 50：放款成功 60：放款拦截 */
    f_status?: number;
    /** 持卡人姓名 */
    g_receiver_name?: string;
    /** 收款银行卡号 */
    h_receiver_bankcard_number?: string;
    /** 收款银行名称 */
    i_receiver_bankcard_name?: string;
    /** 收款银行编码 */
    j_receiver_bankcard_code?: string;
    /** 金融系统代码 */
    k_financial_system_code?: string;
    /** 放款次数 */
    l_call_times?: number;
    /** 放款回调次数 */
    m_callback_times?: number;
    /** 失败原因 */
    n_error_message?: string;
    /** 成功时间 */
    o_success_at?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type MCExtend = {
    /** id */
    id?: number;
    a_a_a_a_a_q_b_period?: QBPeriod;
    a_a_a_a_a_o_a_repay?: OARepay;
    a_a_a_a_a_d_borrow?: DBorrow;
    /** borrow_id */
    a_borrow_id?: number;
    /** 用户 */
    b_repay_id?: number;
    /** 分期期数 */
    c_period_count?: number;
    /** 展期序号 */
    d_index?: number;
    /** 状态 10:待支付 20： 支付中 30:未知 40：支付失败 50：支付成功  */
    e_status?: number;
    /** 应还款日 */
    f_expect_repay_time?: string;
    /** 结算方式* 1:先扣除手续费和利息 2:先扣除手续费 3:到期扣除所有费用 */
    g_product_settlement_type?: string;
    /** 剩余利息 */
    h_expect_repay_total_amount?: number;
    /** 展期前已支付违约金 */
    j_before_paid_violate_fee?: number;
    /** 展期前已支付罚息 */
    k_before_paid_overdue_fee?: number;
    /** 在逾天数 */
    l_overdue_days?: number;
    /** 展期天数 */
    m_days?: number;
    /** 展前应还款日 */
    n_before_expect_repay_time?: string;
    /** 展后应还款日 */
    o_after_expect_repay_time?: string;
    /** 展期总额 */
    p_extend_amount?: number;
    /** 展期费 */
    q_extend_fee?: number;
    /** 展期违约金 */
    r_extend_violate_fee?: number;
    /** 展期罚息 */
    s_extend_overdue_fee?: number;
    /** 分期订单 */
    t_period_id?: number;
    /** 用户 */
    u_user_id?: number;
    /** 管理员 */
    v_admin_id?: number;
    /** 支付流水id */
    w_repay_log_id?: number;
    /** 分期序号 */
    x_period_index?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type MCLoanLog = {
    /** id */
    id?: number;
    a_a_a_a_a_d_borrow?: DBorrow;
    /** borrow_id */
    a_borrow_id?: number;
    /** user id */
    b_user_id?: number;
    /** 管理员 id */
    c_admin_id?: number;
    /** loan bank id */
    d_loan_bank_id?: number;
    /** 最终支付渠道 */
    e_payment_channel?: string;
    /** 状态 10:待放款 20： 放款中 30:未知 40：放款失败 50：放款成功 */
    h_status?: number;
    /** 持卡人姓名 */
    i_receiver_name?: string;
    /** 收款银行卡号 */
    j_receiver_bankcard_number?: string;
    /** 收款银行名称 */
    k_receiver_bankcard_name?: string;
    /** 收款银行编码 */
    l_receiver_bankcard_code?: string;
    /** 金融系统代码 */
    m_financial_system_code?: string;
    /** 打款时间 */
    o_loan_time?: string;
    /** reference */
    p_reference?: string;
    /** outer sn */
    q_outer_sn?: string;
    /** amount */
    r_amount?: number;
    /** fee */
    s_fee?: number;
    /** 同步日志 */
    t_easy_payment_id?: number;
    /** 同步消息 */
    u_sync_message?: string;
    /** 异步code */
    w_easy_payment_id?: number;
    /** 异步消息 */
    x_callback_message?: string;
    /** 审核备注 */
    z_remark?: string;
    /** 放款凭证 */
    a_a_certificate?: string;
    /** 放款次数 */
    a_b_index?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type MGBanner = {
    /** id */
    id?: number;
    /** 名称 */
    a_title: string;
    /** 图片 */
    b_pic: string;
    /** 状态 */
    c_status: number;
    /** 备注 */
    d_comment?: string;
    /** 点击页面 */
    e_url?: string;
    /** 管理员 */
    f_admin_id?: number;
    /** 链接类型 1：web 2：action */
    g_type?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
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
    a_a_district_id?: number;
    /** 具体地址 */
    a_b_idnumber_address?: string;
    /** 州 */
    a_c_idnumber_state2_id?: number;
    /** 省 */
    a_d_idnumber_province2_id?: number;
    /** 市 */
    a_e_idnumber_city2_id?: number;
    /** 市 */
    a_f_district2_id?: number;
    /** 具体地址 */
    a_g_idnumber2_address?: string;
    /** 用户手输id_number和ocr是否一致 */
    a_h_id_number_same?: string;
    /** 用户手输id_number2和ocr是否一致 */
    a_i_id_number2_same?: string;
    /** 用户手输id_number2和ocr是否一致 */
    a_j_id_number3_same?: string;
    /** 用户手输id_number2和ocr是否一致 */
    a_k_id_number4_same?: string;
    /** 用户手输姓名和ocr是否一致 */
    a_l_name_same?: string;
    /** 用户手输姓名2和ocr是否一致 */
    a_m_name2_same?: string;
    /** 用户手输姓名2和ocr是否一致 */
    a_n_name3_same?: string;
    /** 用户手输姓名2和ocr是否一致 */
    a_o_name4_same?: string;
    /** 用户手输出生年月和ocr是否一致 */
    a_p_birthday_same?: string;
    /** 重复的证件号数量 */
    a_q_info?: string;
    /** 信息2 */
    a_r_info2?: string;
    /** 信息3 */
    a_s_info3?: string;
    /** 信息4 */
    a_t_info4?: string;
    /** 信息5 */
    a_u_info5?: string;
    /** 信息6 */
    a_v_info6?: string;
    /** verify id */
    a_w_verify_id?: number;
    /** 本次认证次数序号 */
    a_x_index?: number;
    /** 邮箱 */
    a_y_email?: string;
    /** whatApp */
    a_z_whatapp?: string;
    /** facebook */
    b_a_facebook?: string;
    /** line */
    b_b_line?: string;
    /** 审核管理员id */
    b_c_admin_id?: number;
    /** 复审原因 */
    b_d_reasons?: string;
    /** 复审原因详情 */
    b_e_reasons_detail?: string;
    /** 验真结果 */
    b_f_validate_result?: string;
    /** 验真报文 */
    b_g_validate_raw?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type MultiDimensionOverdue = {
    /** x */
    x?: number;
    /** y */
    y?: number;
    /** group */
    group?: number;
    /** series */
    series?: number;
  };

  type NBCollectionGroupRole = {
    /** id */
    id?: number;
    /** 机构催收规则id */
    a_collection_agency_role_id?: number;
    /** 催收阶段 */
    b_collection_stage_id?: number;
    /** 催收机构 */
    c_collection_agency_id?: number;
    /** 催收小组 */
    d_collection_group_id?: number;
    /** 催收小组占比 */
    e_collection_group_proportion?: number;
    /** 分配模式 1：按比补齐 2：按比分配 */
    f_assign_type?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type NCCollectionOrderFlowHistory = {
    /** id */
    id?: number;
    /** 订单id */
    a_borrow_id?: number;
    /** 催收id */
    b_collection_order_id?: number;
    /** 1:计划任务 2： 管理员转移 */
    c_type?: number;
    /** 父id */
    d_before_collection_order_id?: number;
    /** 阶段id */
    e_before_collection_stage_id?: number;
    /** 机构id */
    f_before_collection_agency_id?: number;
    /** 小组id */
    g_before_collection_group_id?: number;
    /** 催员id */
    h_before_collection_admin_id?: number;
    /** 阶段id */
    i_after_collection_stage_id?: number;
    /** 机构id */
    j_after_collection_agency_id?: number;
    /** 小组id */
    k_after_collection_group_id?: number;
    /** 催员id */
    l_after_collection_admin_id?: number;
    /** 催员催记数 */
    m_collection_admin_log_count?: number;
    /** 催员拨打电话数 */
    n_collection_admin_call_count?: number;
    /** 系统催收短信数 */
    o_system_sms_count?: number;
    /** 累计催回金额 */
    p_collection_amount?: number;
    /** 催回类型 */
    q_type?: number;
    /** 支付流水日志（多笔流水用逗号） */
    r_repay_log_ids?: string;
    /** 分期id */
    s_period_id?: number;
    /** 入催金额（实际应还金额 例如在S0入催1000，然后催回900，那么S1的入催金额就是100） */
    t_borrow_amount?: number;
    /** 查看次数 */
    u_view_times?: number;
    /** 订单sn(冗余) */
    v_borrow_sn?: string;
    /** 用户手机(冗余) */
    w_phone?: string;
    /** 用户姓名(冗余) */
    x_name?: string;
    /** 累计佣金 */
    y_commission?: number;
    /** 最近日志时间 */
    z_last_log_time?: string;
    /** 流出时间 */
    a_a_flow_out_time?: string;
    /** 借款次数 */
    a_b_borrow_count?: number;
    /** 入催日志id（作为q_c_collection_news.parent_id） */
    a_c_collection_news_id?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type NDRiskValueSmsIncome = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 用户 */
    b_borrow_id?: number;
    /** 手机号码 */
    c_phone?: string;
    /** 风控字段 */
    d_risk_item_id?: number;
    /** 风控字段分类 */
    e_risk_item_cat_id?: number;
    /** 字段名标识 */
    f_risk_item_name_flag?: string;
    /** 3天内 */
    g_value_3?: number;
    /** 7天内 */
    h_value_7?: number;
    /** 15天内 */
    i_value_15?: number;
    /** 30天内 */
    j_value_30?: number;
    /** 60天内 */
    k_value_60?: number;
    /** 90天内 */
    l_value_90?: number;
    /** 180天内 */
    m_value_180?: number;
    /** 360天内 */
    n_value_360?: number;
    /** 所有天内 */
    o_value_0?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type NERiskStrategyRoute = {
    /** id */
    id?: number;
    /** 名称 */
    a_name?: string;
    /** 排序 */
    b_sort?: number;
    /** 借款画像 */
    c_borrow?: string;
    /** 渠道画像 */
    d_channel?: string;
    /** 短信画像 */
    e_sms?: string;
    /** 通讯录画像 */
    f_contact?: string;
    /** app画像 */
    g_app?: string;
    /** 地区画像 */
    h_region?: string;
    /** 年龄画像 */
    i_age?: string;
    /** 策略1 */
    j_risk_strategy_id_1?: number;
    /** 策略1占比 */
    k_risk_strategy_1_rate?: number;
    /** 策略2 */
    l_risk_strategy_id_2?: number;
    /** 策略2占比 */
    m_risk_strategy_2_rate?: number;
    /** 策略3 */
    n_risk_strategy_id_3?: number;
    /** 策略3占比 */
    o_risk_strategy_3_rate?: number;
    /** 路由描述 */
    p_description?: string;
    /** 状态 */
    q_status?: number;
    /** 策略1code */
    r_risk_strategy_1_code?: string;
    /** 策略1版本 */
    s_risk_strategy_1_version?: string;
    /** 策略2code */
    t_risk_strategy_2_code?: string;
    /** 策略2版本 */
    u_risk_strategy_2_version?: string;
    /** 策略3code */
    v_risk_strategy_3_code?: string;
    /** 策略3版本 */
    w_risk_strategy_3_version?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type NFSmsContact = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 联系人 */
    b_contact_id?: number;
    /** 短信数量 */
    c_sms_count?: number;
    /** 手机号 */
    d_phone?: string;
    /** 短信 */
    e_sms_ids?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type NGNotification = {
    /** id */
    id?: number;
    /** icon */
    a_icon?: string;
    /** URL */
    b_color: number;
    /** 备注 */
    c_content?: string;
    /** 状态 */
    d_status: number;
    /** 链接地址 */
    e_url?: string;
    /** 链接类型 1：web 2：action */
    f_type: number;
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
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** 白名单id -1代表曾经是白名单 */
    b_white_id?: number;
    /** 黑名单id */
    c_black_phone_id?: number;
    /** 黑名单idnumber id */
    d_black_id_number_id?: number;
    /** 黑名单bankcard id */
    e_black_bank_card_id?: number;
    /** 黑名单imei id */
    f_black_imei_id?: number;
    /** 黑名单device id */
    g_black_device_id?: number;
    /** 灰名单id */
    h_grey_id?: string;
    /** 渠道id */
    i_channel_id?: number;
    /** 性别 1:男 2:女 */
    j_gender?: number;
    /** 年龄 */
    k_age?: number;
    /** app版本 */
    l_app_version?: number;
    /** 初始短信数量 */
    m_init_msg_count?: number;
    /** 最后一次短信上送时间 */
    n_last_msg_time?: string;
    /** 短信数量 */
    o_sms_count?: number;
    /** 初始相册数量 */
    p_init_album_count?: number;
    /** 最后一次相册上送时间 */
    q_last_album_time?: string;
    /** 相册数量 */
    r_album_count?: number;
    /** app初始数量 */
    s_init_app_count?: number;
    /** 最后一次app上送时间 */
    t_last_app_time?: string;
    /** app数量 */
    u_app_count?: number;
    /** 通讯录初始数量 */
    v_init_contact_count?: number;
    /** 最后一次通讯录上送时间 */
    w_last_contact_time?: string;
    /** 通讯录数量 */
    x_contact_count?: number;
    /** 最后一次设备信息上送时间 */
    y_last_device_time?: string;
    /** 最后一次mac */
    z_mac?: string;
    /** 最后一次imei */
    a_a_imei?: string;
    /** 最后一次device */
    a_b_device?: string;
    /** ocr次数 */
    a_c_ocr_count?: number;
    /** 活体总次数 */
    a_d_liveness_total_count?: number;
    /** 当前订单活体次数 */
    a_e_liveness_current_count?: number;
    /** 地理信息风险等级 */
    a_f_ip_geography_risk_level?: number;
    /** 风险地区id */
    a_g_ip_geography_risk_id?: number;
    /** 营销id */
    a_h_marketing_detail_id?: number;
    /** 可疑详情id */
    a_i_suspicious_id?: string;
    /** 营销id */
    a_j_marketing_id?: number;
    /** 机审次数 */
    a_k_risk_count?: number;
    /** 召回次数 */
    a_l_recall_times?: number;
    /** 人审次数 */
    a_m_review_count?: number;
    /** deleted_at */
    deleted_at?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
  };

  type OADeduction = {
    /** id */
    id?: number;
    /** borrow_id */
    a_borrow_id?: number;
    /** 还款id */
    b_repay_id?: number;
    /** 分期id */
    c_period_id?: number;
    /** 用户 */
    d_user_id?: number;
    /** 申请管理员 */
    e_apply_admin_id?: number;
    /** 审核管理员 */
    f_review_admin_id?: number;
    /** 分期期数 */
    g_period_count?: number;
    /** 减免序号 */
    h_index?: number;
    /** 状态 10:待审核 40：审核拒绝 50：审核通过  */
    i_status?: number;
    /** 申请备注 */
    j_apply_remark?: string;
    /** 申请备注 */
    k_apply_remark?: string;
    /** 审核备注 */
    l_review_remark?: string;
    /** 审核备注 */
    m_review_remark?: string;
    /** 附件id */
    n_file_id?: number;
    /** 附件id */
    o_file_id?: number;
    /** 附件id */
    p_file_id?: number;
    /** 减免总额 */
    q_deduction_total_amount?: number;
    /** 减免总本金 */
    r_deduction_total_borrow_amount?: number;
    /** 减免总利息 */
    s_deduction_total_interest?: number;
    /** 减免总服务费 */
    t_deduction_total_service_fee?: number;
    /** 减免总违约金 */
    u_deduction_total_violate_fee?: number;
    /** 减免总罚息 */
    v_deduction_total_overdue_fee?: number;
    /** 减免后是否还款 */
    w_paid?: string;
    /** 支付流水 */
    x_repay_log_id?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type OARepay = {
    /** id */
    id?: number;
    /** App\Models\OARepay */
    a_a_a_a_a_q_b_periods?: QBPeriod[];
    a_a_a_a_a_d_borrow?: DBorrow;
    /** borrow_id */
    a_borrow_id?: number;
    /** 用户 */
    b_user_id?: number;
    /** 分期期数 */
    c_period_count?: number;
    /** 已完结分期期数 */
    d_completed_period_count?: number;
    /** 状态 10:待支付 20： 支付中 30:未知 40：支付失败 50：支付成功  */
    e_status?: number;
    /** 应还款日 */
    f_expect_repay_time?: string;
    /** 应还本金 */
    g_expect_borrow_amount?: number;
    /** 应还利息 */
    h_expect_interest?: number;
    /** 应还服务费 */
    i_expect_service_fee?: number;
    /** 应还违约金 */
    j_expect_violate_fee?: number;
    /** 应还罚息 */
    k_expect_overdue_fee?: number;
    /** 在逾天数 */
    l_overdue_days?: number;
    /** 历史逾期天数 */
    m_history_overdue_days?: number;
    /** 已支付金额 */
    n_paid_amount?: number;
    /** 已支付本金 */
    o_paid_borrow_amount?: number;
    /** 已支付利息 */
    p_paid_interest?: number;
    /** 已支付服务费 */
    q_paid_service_fee?: number;
    /** 已支付违约金 */
    r_paid_violate_fee?: number;
    /** 已支付罚息 */
    s_paid_overdue_fee?: number;
    /** 减免次数 */
    t_deduction_times?: number;
    /** 减免总额 */
    u_deduction_total_amount?: number;
    /** 减免总本金 */
    v_deduction_total_borrow_amount?: number;
    /** 减免总利息 */
    w_deduction_total_interest?: number;
    /** 减免总服务费 */
    x_deduction_total_service_fee?: number;
    /** 减免总违约金 */
    y_deduction_total_violate_fee?: number;
    /** 减免总罚息 */
    z_deduction_total_overdue_fee?: number;
    /** 平账金额 */
    a_a_write_off_amount?: number;
    /** 展期次数 */
    a_b_extend_times?: number;
    /** 展期总额 */
    a_c_extend_total_amount?: number;
    /** 展期总天数 */
    a_d_extend_total_days?: number;
    /** 展期费 */
    a_e_extend_total_fee?: number;
    /** 展期违约金 */
    a_f_extend_total_violate_fee?: number;
    /** 展期罚息 */
    a_g_extend_total_overdue_fee?: number;
    /** 部分还款次数 */
    a_h_part_times?: number;
    /** 查看次数 */
    a_i_view_times?: number;
    /** 尝试支付次数 */
    a_j_withhold_times?: number;
    /** 成功支付次数 */
    a_k_success_withhold_times?: number;
    /** 应还款总金额 */
    a_l_expect_repay_total_amount?: number;
    /** 结算方式* 1:先扣除手续费和利息 2:先扣除手续费 3:到期扣除所有费用 */
    a_m_product_settlement_type?: number;
    /** 核算日期 */
    a_n_calculate_time?: string;
    /** 最后一次查看时间 */
    a_o_view_time?: string;
    /** 在逾期数 */
    a_p_overdue_period_count?: number;
    /** 利息 */
    a_q_interest?: number;
    /** 服务费 */
    a_r_service_fee?: number;
    /** 结清时间 */
    a_s_settled_time?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type OBKyc = {
    /** id */
    id?: number;
    /** 名称 */
    a_name?: string;
    /** 标识 */
    b_channel_code?: string;
    /** 名称 */
    c_parent_id?: string;
    /** logo */
    d_logo?: string;
    /** 方法 */
    e_method?: string;
    /** 排序 */
    f_sort?: number;
    /** 状态 */
    g_status?: string;
    /** 方法 */
    h_method_name?: string;
    /** 描述 */
    i_description?: string;
    /** App\Models\OBKyc */
    children?: OBKyc[];
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
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
    j_contact1_relation?: number;
    /** 联系人2姓名 */
    contact2_name?: string;
    /** 联系人2电话 */
    contact2_phone?: string;
    /** 联系人2关系 */
    m_contact2_relation?: number;
    /** 联系人3姓名 */
    contact3_name?: string;
    /** 联系人3电话 */
    contact3_phone?: string;
    /** 联系人3关系 */
    p_contact3_relation?: string;
    /** 网关 */
    q_gateway?: number;
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
    /** 联系人1白名单id */
    x_contact1_white_id?: number;
    /** 联系人1黑名单id */
    y_contact1_black_id?: number;
    /** 联系人1灰名单id */
    z_contact1_grey_id?: number;
    /** 联系人2白名单id */
    a_a_contact2_white_id?: number;
    /** 联系人2黑名单id */
    a_b_contact2_black_id?: number;
    /** 联系人2灰名单id */
    a_c_contact2_grey_id?: number;
    /** 联系人3白名单id */
    a_d_contact3_white_id?: number;
    /** 联系人3黑名单id */
    a_e_contact3_black_id?: number;
    /** 联系人3灰名单id */
    a_f_contact3_grey_id?: number;
    /** 认证id */
    a_g_verify_id?: number;
    /** 本次认证次数序号 */
    a_h_index?: number;
    /** 借款人1的订单id */
    a_i_contact1_borrow_id?: number;
    /** 借款人2的订单id */
    a_j_contact2_borrow_id?: number;
    /** 借款人3的订单id */
    a_k_contact3_borrow_id?: number;
    /** 审核原因 */
    a_l_reasons?: string;
    /** 审核管理员 */
    a_m_admin_id?: number;
    /** 审核原因详情 */
    a_n_reasons_detail?: string;
    /** 联系人1短信数 */
    a_o_contact1_sms_contact_id?: number;
    /** 联系人1通话数 */
    a_p_contact1_contact_record_id?: number;
    /** 联系人2短信数 */
    a_q_contact2_sms_contact_id?: number;
    /** 联系人2通话数 */
    a_r_contact2_contact_record_id?: number;
    /** deleted_at */
    deleted_at?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
  };

  type PeriodDetail = {
    /** id */
    title?: string;
    /** borrow_amount */
    borrow_amount?: number;
    /** interest */
    interest?: number;
    /** service_fee */
    service_fee?: number;
    /** violate_fee */
    violate_fee?: number;
    /** overdue_fee */
    overdue_fee?: number;
    /** total_amount */
    total_amount?: number;
  };

  type putACUserNewsIdParams = {
    /** id of ACUserNew */
    id: number;
  };

  type putAdminV1ABCreditHistoriesIdParams = {
    /** id of ABCreditHistory */
    id: number;
  };

  type putAdminV1AFChannelsIdParams = {
    /** id of AFChannel */
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

  type putAdminV1ANRiskItemCatsIdParams = {
    /** id of ANRiskItemCat */
    id: number;
  };

  type putAdminV1APReviewGroupsIdParams = {
    /** id of APReviewGroup */
    id: number;
  };

  type putAdminV1APReviewGroupsReleaseParams = {
    /** id of APReviewGroup */
    foo: number;
  };

  type putAdminV1ARReviewAdminsIdParams = {
    /** id of ARReviewAdmin */
    id: number;
  };

  type putAdminV1ARReviewAdminsReleaseParams = {
    /** id of ARReviewAdmin */
    foo: number;
  };

  type putAdminV1ASRiskValueSmsSuspiciousesIdParams = {
    /** id of ASRiskValueSmsSuspicious */
    id: number;
  };

  type putAdminV1AUsersIdParams = {
    /** id of AUser */
    id: number;
  };

  type putAdminV1BAWhitesIdParams = {
    /** id of BAWhite */
    id: number;
  };

  type putAdminV1BBProductSnapshotCopiesIdParams = {
    /** id of BBProductSnapshotCopy */
    id: number;
  };

  type putAdminV1BCProductFeaturesIdParams = {
    /** id of BCProductFeature */
    id: number;
  };

  type putAdminV1BDRiskRoleBundlesIdParams = {
    /** id of BDRiskRoleBundle */
    id: number;
  };

  type putAdminV1BEImportResultsIdParams = {
    /** id of BEImportResult */
    id: number;
  };

  type putAdminV1BFReviewBorrowsIdParams = {
    /** id of BFReviewBorrow */
    id: number;
  };

  type putAdminV1BFReviewBorrowsReleaseParams = {
    /** id of BFReviewBorrow */
    foo: number;
  };

  type putAdminV1BGReviewTagsIdParams = {
    /** id of BGReviewTag */
    id: number;
  };

  type putAdminV1BHReviewBorrowFlowsIdParams = {
    /** id of BHReviewBorrowFlow */
    id: number;
  };

  type putAdminV1BIPaymentChannelsIdParams = {
    /** id of BIPaymentChannel */
    id: number;
  };

  type putAdminV1BJContactsIdParams = {
    /** id of BJContact */
    id: number;
  };

  type putAdminV1BKCollectionRolesIdParams = {
    /** id of BKCollectionRole */
    id: number;
  };

  type putAdminV1BLCollectionOrdersIdParams = {
    /** id of BLCollectionOrder */
    id: number;
  };

  type putAdminV1BMBorrowRiskResultsIdParams = {
    /** id of BMBorrowRiskResult */
    id: number;
  };

  type putAdminV1BProductsIdParams = {
    /** id of BProduct */
    id: number;
  };

  type putAdminV1CurrentUsersIdParams = {
    /** id of CurrentUser */
    id: number;
  };

  type putAdminV1DACollectionKpisIdParams = {
    /** id of DACollectionKpi */
    id: number;
  };

  type putAdminV1DBorrowsIdParams = {
    /** id of DBorrow */
    id: number;
  };

  type putAdminV1DBSmsOrdersIdParams = {
    /** id of DBSmsOrder */
    id: number;
  };

  type putAdminV1DCBorrowRiskDetailsIdParams = {
    /** id of DCBorrowRiskDetail */
    id: number;
  };

  type putAdminV1DDRecallDetailsIdParams = {
    /** id of DDRecallDetail */
    id: number;
  };

  type putAdminV1GAMarketingDetailsIdParams = {
    /** id of GAMarketingDetail */
    id: number;
  };

  type putAdminV1GBMarketingsIdParams = {
    /** id of GBMarketing */
    id: number;
  };

  type putAdminV1GCMarketingHistoriesIdParams = {
    /** id of GCMarketingHistory */
    id: number;
  };

  type putAdminV1GDRiskItemsIdParams = {
    /** id of GDRiskItem */
    id: number;
  };

  type putAdminV1GERiskRoleGroupsIdParams = {
    /** id of GERiskRoleGroup */
    id: number;
  };

  type putAdminV1GFRiskRolesIdParams = {
    /** id of GFRiskRole */
    id: number;
  };

  type putAdminV1GGRiskStrateiesIdParams = {
    /** id of GGRiskStratey */
    id: number;
  };

  type putAdminV1GHSettingsIdParams = {
    /** id of GHSetting */
    id: number;
  };

  type putAdminV1GIRiskStrategyBundlesIdParams = {
    /** id of GIRiskStrategyBundle */
    id: number;
  };

  type putAdminV1GJRiskTagsIdParams = {
    /** id of GJRiskTag */
    id: number;
  };

  type putAdminV1GKBanksIdParams = {
    /** id of GKBank */
    id: number;
  };

  type putAdminV1GLPhotosIdParams = {
    /** id of GLPhoto */
    id: number;
  };

  type putAdminV1GMCollectionAdminsIdParams = {
    /** id of GMCollectionAdmin */
    id: number;
  };

  type putAdminV1GNCollectionStagesIdParams = {
    /** id of GNCollectionStage */
    id: number;
  };

  type putAdminV1GORiskValueSmsSlopesIdParams = {
    /** id of GORiskValueSmsSlope */
    id: number;
  };

  type putAdminV1GPEasyPaymentsIdParams = {
    /** id of GPEasyPayment */
    id: number;
  };

  type putAdminV1GVerifiesIdParams = {
    /** id of GVerify */
    id: number;
  };

  type putAdminV1HAPaymentChannelBanksIdParams = {
    /** id of HAPaymentChannelBank */
    id: number;
  };

  type putAdminV1HCDevicesIdParams = {
    /** id of HCDevice */
    id: number;
  };

  type putAdminV1HDDynamicDevicesIdParams = {
    /** id of HDDynamicDevice */
    id: number;
  };

  type putAdminV1HECollectionGroupsIdParams = {
    /** id of HECollectionGroup */
    id: number;
  };

  type putAdminV1HFCollectionAgencyRolesIdParams = {
    /** id of HFCollectionAgencyRole */
    id: number;
  };

  type putAdminV1HGGreysIdParams = {
    /** id of HGGrey */
    id: number;
  };

  type putAdminV1HHRecallsIdParams = {
    /** id of HHRecall */
    id: number;
  };

  type putAdminV1HIBackTipsIdParams = {
    /** id of HIBackTip */
    id: number;
  };

  type putAdminV1HProductSnapshotsIdParams = {
    /** id of HProductSnapshot */
    id: number;
  };

  type putAdminV1MBLoansIdParams = {
    /** id of MBLoan */
    id: number;
  };

  type putAdminV1MCExtendsIdParams = {
    /** id of MCExtend */
    id: number;
  };

  type putAdminV1MCLoanLogsIdParams = {
    /** id of MCLoanLog */
    id: number;
  };

  type putAdminV1MGBannersIdParams = {
    /** id of MGBanner */
    id: number;
  };

  type putAdminV1NBCollectionGroupRolesIdParams = {
    /** id of NBCollectionGroupRole */
    id: number;
  };

  type putAdminV1NCCollectionOrderFlowsIdParams = {
    /** id of NCCollectionOrderFlowHistory */
    id: number;
  };

  type putAdminV1NDRiskValueSmsIncomesIdParams = {
    /** id of NDRiskValueSmsIncome */
    id: number;
  };

  type putAdminV1NERiskStrategyRoutesIdParams = {
    /** id of NERiskStrategyRoute */
    id: number;
  };

  type putAdminV1NFSmsContactsIdParams = {
    /** id of NFSmsContact */
    id: number;
  };

  type putAdminV1NGNotificationsIdParams = {
    /** id of NGNotification */
    id: number;
  };

  type putAdminV1OARepaysIdParams = {
    /** id of OARepay */
    id: number;
  };

  type putAdminV1OBKycsIdParams = {
    /** id of OBKyc */
    id: number;
  };

  type putAdminV1QCCollectionNewsIdParams = {
    /** id of QCCollectionNews */
    id: number;
  };

  type putAdminV1QEPaymentGatewayLogsIdParams = {
    /** id of QEPaymentGatewayLog */
    id: number;
  };

  type putAdminV1QFSmsGatewayLogsIdParams = {
    /** id of QFSmsGatewayLog */
    id: number;
  };

  type putAdminV1QVerifyItemsIdParams = {
    /** id of QVerifyItem */
    id: number;
  };

  type putAdminV1RARepayLogsIdParams = {
    /** id of RARepayLog */
    id: number;
  };

  type putAdminV1RBlacksIdParams = {
    /** id of RBlack */
    id: number;
  };

  type putAdminV1RCSmsIdParams = {
    /** id of RCSms */
    id: number;
  };

  type putAdminV1RERiskValueSmsBasicsIdParams = {
    /** id of RERiskValueSmsBasic */
    id: number;
  };

  type putAdminV1SAAppsIdParams = {
    /** id of SAApp */
    id: number;
  };

  type putAdminV1SBAppsIdParams = {
    /** id of SBApp */
    id: number;
  };

  type putAdminV1SCRiskValueSmsIdParams = {
    /** id of SCRiskValueSms */
    id: number;
  };

  type putAdminV1SDLivenessesIdParams = {
    /** id of SDLiveness */
    id: number;
  };

  type putAdminV1SEVirtualAccountsIdParams = {
    /** id of SEVirtualAccount */
    id: number;
  };

  type putAdminV1TARiskValueSmsOrdersIdParams = {
    /** id of TARiskValueSmsOrder */
    id: number;
  };

  type putAdminV1TBSmsIdParams = {
    /** id of TBSms */
    id: number;
  };

  type putAdminV1TCollectionAgenciesIdParams = {
    /** id of TCollectionAgency */
    id: number;
  };

  type putAdminV1TCOtherGatewayLogsIdParams = {
    /** id of TCOtherGatewayLog */
    id: number;
  };

  type putAdminV1VCollectionAssignLogsIdParams = {
    /** id of VCollectionAssignLog */
    id: number;
  };

  type putAdminV1WAMarketingsIdParams = {
    /** id of WAMarketing */
    id: number;
  };

  type putAdminV1WBProductOverduesIdParams = {
    /** id of WBProductOverdue */
    id: number;
  };

  type putAdminV1WCProductLoanOverduesIdParams = {
    /** id of WCProductLoanOverdue */
    id: number;
  };

  type putAdminV1WDMultiDimensionOverduesIdParams = {
    /** id of WDMultiDimensionOverdue */
    id: number;
  };

  type putAdminV1WEProductProfitsIdParams = {
    /** id of WEProductProfit */
    id: number;
  };

  type putAdminV1WFDailyReportsIdParams = {
    /** id of WFDailyReport */
    id: number;
  };

  type putAdminV1WHOverdueRiskItemRangesIdParams = {
    /** id of WHOverdueRiskItemRange */
    id: number;
  };

  type putAdminV1WIRiskBundlesIdParams = {
    /** id of WIRiskBundle */
    id: number;
  };

  type putAdminV1WJRiskStrategiesIdParams = {
    /** id of WJRiskStrategy */
    id: number;
  };

  type putAdminV1WKRiskTagsIdParams = {
    /** id of WKRiskTag */
    id: number;
  };

  type putAdminV1WLCollectionAdminsIdParams = {
    /** id of WLCollectionAdmin */
    id: number;
  };

  type putAdminV1WMCollectionReportsIdParams = {
    /** id of WMCollectionReport */
    id: number;
  };

  type putAdminV1WNCollectionFlowsIdParams = {
    /** id of WNCollectionFlow */
    id: number;
  };

  type putAdminV1WOFeesIdParams = {
    /** id of WOFee */
    id: number;
  };

  type putAdminV1WPBackFillsIdParams = {
    /** id of WPBackFill */
    id: number;
  };

  type putAdminV1WQSmsReportsIdParams = {
    /** id of WQSmsReport */
    id: number;
  };

  type putAdminV1WRSmsTemplatesIdParams = {
    /** id of WRSmsTemplate */
    id: number;
  };

  type putAEBorrowAdminOperatesIdParams = {
    /** id of AEBorrowAdminOperate */
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

  type putUsersIdParams = {
    /** id of User */
    id: number;
  };

  type QAOcr = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** verify id */
    b_verify_id?: number;
    /** 本次认证次数序号 */
    c_index?: number;
    /** 身份证认证状态 10:待认证，20已认证 30：认证拒绝 40：认证过期 50：复审 */
    d_status?: number;
    /** 黑名单id */
    e_black_id?: number;
    /** 灰名单id */
    f_grey_id?: number;
    /** 白名单id */
    g_white_id?: number;
    /** 身份证1 */
    h_idnumber?: string;
    /** 证件号2（税号） */
    i_idnumber2?: string;
    /** 证件号3 */
    j_idnumber3?: string;
    /** 证件号4 */
    k_idnumber3?: string;
    /** 姓名1 */
    l_name1?: string;
    /** 姓名2 */
    m_name2?: string;
    /** 姓名3 */
    n_name3?: string;
    /** 姓名4 */
    o_name4?: string;
    /** 出生年月 */
    p_birthday?: string;
    /** 有效日期 */
    q_valid_date?: string;
    /** 地址 */
    r_address?: string;
    /** 地址2 */
    s_address2?: string;
    /** 性别 */
    t_sex?: string;
    /** 类型 */
    u_type?: string;
    /** 信息1 */
    v_info1?: string;
    /** 信息2 */
    w_info2?: string;
    /** 图片1 */
    x_picture_1?: string;
    /** 图片2 */
    y_picture_2?: string;
    /** 图片3 */
    z_picture_3?: string;
    /** ocr结果 */
    a_a_other_gateway_log_id?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type QBPeriod = {
    /** id */
    id?: number;
    a_a_a_a_a_o_a_repay?: OARepay;
    a_a_a_a_a_d_borrow?: DBorrow;
    /** borrow_id */
    a_borrow_id?: number;
    /** 用户 */
    b_repay_id?: number;
    /** 分期期数 */
    c_period_count?: number;
    /** 分期序号 */
    d_index?: number;
    /** 状态 10:待支付 20： 支付中 30:未知 40：支付失败 50：支付成功  */
    e_status?: number;
    /** 应还款总金额 */
    f_expect_repay_total_amount?: number;
    /** 应还本金 */
    g_expect_borrow_amount?: number;
    /** 应还利息 */
    h_expect_interest?: number;
    /** 应还服务费 */
    i_expect_service_fee?: number;
    /** 应还违约金 */
    j_expect_violate_fee?: number;
    /** 应还罚息 */
    k_expect_overdue_fee?: number;
    /** 在逾天数 */
    l_overdue_days?: number;
    /** 历史逾期天数 */
    m_history_overdue_days?: number;
    /** 已支付金额 */
    n_paid_amount?: number;
    /** 已支付本金 */
    o_paid_borrow_amount?: number;
    /** 已支付利息 */
    p_paid_interest?: number;
    /** 已支付服务费 */
    q_paid_service_fee?: number;
    /** 已支付违约金 */
    r_paid_violate_fee?: number;
    /** 已支付罚息 */
    s_paid_overdue_fee?: number;
    /** 减免次数 */
    t_deduction_times?: number;
    /** 减免总额 */
    u_deduction_total_amount?: number;
    /** 减免总本金 */
    v_deduction_total_borrow_amount?: number;
    /** 减免总利息 */
    w_deduction_total_interest?: number;
    /** 减免总服务费 */
    x_deduction_total_service_fee?: number;
    /** 减免总违约金 */
    y_deduction_total_violate_fee?: number;
    /** 减免总罚息 */
    z_deduction_total_overdue_fee?: number;
    /** 平账金额 */
    a_a_write_off_amount?: number;
    /** 展期次数 */
    a_b_extend_times?: number;
    /** 展期总额 */
    a_c_extend_total_amount?: number;
    /** 展期总天数 */
    a_d_extend_total_days?: number;
    /** 展期费 */
    a_e_extend_total_fee?: number;
    /** 展期违约金 */
    a_f_extend_total_violate_fee?: number;
    /** 展期罚息 */
    a_g_extend_total_overdue_fee?: number;
    /** 部分还款次数 */
    a_h_part_times?: number;
    /** 查看次数 */
    a_i_view_times?: number;
    /** 尝试支付次数 */
    a_j_withhold_times?: number;
    /** 成功支付次数 */
    a_k_success_withhold_times?: number;
    /** 用户id */
    a_n_user_id?: number;
    /** 结算方式* 1:先扣除手续费和利息 2:先扣除手续费 3:到期扣除所有费用 */
    a_o_product_settlement_type?: number;
    /** 应还款日 */
    a_p_expect_repay_time?: string;
    /** 核算日期 */
    a_q_calculate_time?: string;
    /** 展期通过管理员 */
    a_r_extend_admin_id?: number;
    /** 展期天数 */
    a_s_extend_days?: number;
    /** 展期总天数 */
    a_t_extend_total_days?: number;
    /** 当前减免金额 */
    a_u_current_deduction_fee?: number;
    /** created_at */
    created_at?: string;
    /** 本金 */
    a_v_borrow_amount?: number;
    /** 利息 */
    a_w_interest?: number;
    /** 服务费 */
    a_x_service_fee?: number;
    /** 结清时间 */
    a_y_settled_time?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type QCCollectionNews = {
    /** id */
    id?: number;
    /** 订单id */
    n_borrow_id?: number;
    /** 分期id */
    o_period_id?: number;
    /** 父id */
    a_parent_id?: number;
    /** 催收id */
    p_collection_order_id?: number;
    /** 阶段id */
    b_collection_stage_id?: number;
    /** 机构id */
    c_collection_agency_id?: number;
    /** 小组id */
    d_collection_group_id?: number;
    /** 催员id */
    e_collection_admin_id?: number;
    /** 1:催员日志 2：催员拨打电话 3：入催  4：系统记录日志 5：还款日志 */
    f_cat?: number;
    /** 11:承诺还款 12：支付确认 13：还款协商  14：电话未接通 15：接通非本人 16：疑似欺诈用户 41：承诺未还 42：无日志 43：催收短信 51：部分还款 52： 展期 53：结清 */
    g_type?: number;
    /** 拨打的电话 */
    h_phone?: string;
    /** 1:本人 2：紧急联系人 3：通讯录  4：其他 */
    i_target?: number;
    /** 日志内容 */
    j_content?: string;
    /** 承诺还款时间 */
    k_promise_time?: string;
    /** 所在阶段第几天（只针对f_cat=5还款的情况） */
    l_stage_day_index?: number;
    /** 逾期天数（只针对f_cat=5还款的情况） */
    m_overdue_days?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type QEPaymentGatewayLog = {
    /** id */
    id?: number;
    /** 网关 */
    a_gateway?: string;
    /** 系统方法 */
    b_action?: string;
    /** endpoint */
    c_endpoint?: string;
    /** 请求类型 */
    d_type?: string;
    /** http code */
    e_http_code?: number;
    /** code */
    f_code?: string;
    /** msg */
    g_msg?: string;
    /** message */
    h_message?: string;
    /** request 请求三方的时候为请求体，回调的时候为回调体 */
    i_request?: string;
    /** response */
    j_response?: string;
    /** md5 */
    k_md5?: string;
    /** user id */
    l_user_id?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type QFSmsGatewayLog = {
    /** id */
    id?: number;
    /** 网关 */
    a_gateway?: string;
    /** 系统方法 */
    b_action?: string;
    /** endpoint */
    c_endpoint?: string;
    /** http code */
    d_http_code?: number;
    /** code */
    e_sync_code?: string;
    /** msg */
    f_sync_msg?: string;
    /** message */
    g_sync_message?: string;
    /** code */
    h_callback_code?: string;
    /** msg */
    i_callback_msg?: string;
    /** message */
    j_callback_message?: string;
    /** request 请求三方的时候为请求体，回调的时候为回调体 */
    k_sync_response?: string;
    /** response */
    l_callback_response?: string;
    /** phone */
    m_to?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
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
    /** children */
    children?: QVerifyItem[];
  };

  type RARepayLog = {
    /** id */
    id?: number;
    a_a_a_a_a_q_b_period?: QBPeriod;
    a_a_a_a_a_o_a_repay?: OARepay;
    a_a_a_a_a_d_borrow?: DBorrow;
    /** repay_id */
    a_borrow_id?: number;
    /** repay_id */
    b_repay_id?: number;
    /** period_id */
    c_period_id?: number;
    /** admin_id */
    d_admin_id?: number;
    /** 催员 */
    e_urge_id?: number;
    /** 催收小组 */
    f_urge_group_id?: number;
    /** 催收公司 */
    g_urge_company_id?: number;
    /** 催收阶段 */
    h_urge_stage_id?: number;
    /** type 1:结清 2：展期 3：部分还款 4：减免 5：核销 */
    i_type?: number;
    /** 状态 10:回调中 20： 支付中 30:未知 40：支付失败 50：支付成功  */
    j_status?: number;
    /** 1还款链接 2：app  */
    k_way?: number;
    /** 还款序号 */
    l_index?: number;
    /** 最终支付渠道 */
    m_payment_channel?: string;
    /** 支付银行 */
    n_loan_bank_id?: number;
    /** 付款银行卡号 */
    o_bankcard_number?: string;
    /** 付款银行名称 */
    p_bankcard_name?: string;
    /** 付款银行编码 */
    q_bankcard_code?: string;
    /** 付款金融系统代码 */
    r_financial_system_code?: string;
    /** reference */
    s_reference?: string;
    /** outer sn */
    t_outer_sn?: string;
    /** amount */
    u_amount?: number;
    /** fee */
    v_fee?: number;
    /** 同步code */
    w_sync_code?: string;
    /** 同步消息 */
    x_sync_message?: string;
    /** 同步原始报文 */
    y_sync_raw?: string;
    /** 异步code */
    z_callback_code?: string;
    /** 异步消息 */
    a_a_callback_message?: string;
    /** 异步原始报文 */
    a_b_callback_raw?: string;
    /** 审核备注 */
    a_c_remark?: string;
    /** 还款凭证 */
    a_d_certificate?: string;
    /** 应还款总金额 */
    a_e_expect_repay_total_amount?: number;
    /** 本次还款利息部分 */
    a_f_expect_interest_amount?: number;
    /** 本次还款利息部分 */
    a_g_interest_amount?: number;
    /** 本次已完结利息天数 */
    a_h_interest_finished_days?: number;
    /** 本次还款利息结余 */
    a_i_interest_mod_amount?: number;
    /** 本次还款罚息部分 */
    a_j_expect_overdue_amount?: number;
    /** 本次还款罚息部分 */
    a_k_overdue_amount?: number;
    /** 本次已完结罚息天数 */
    a_l_overdue_finished_days?: number;
    /** 本次还款罚息结余 */
    a_m_overdue_mod_amount?: number;
    /** 本次还款服务费部分 */
    a_n_expect_service_amount?: number;
    /** 本次还款服务费部分 */
    a_o_service_amount?: number;
    /** 本次还款服务费结余 */
    a_p_service_mod_amount?: number;
    /** 本次还款违约金部分 */
    a_q_expect_violate_amount?: number;
    /** 本次还款违约金部分 */
    a_r_violate_amount?: number;
    /** 本次还款后违约金结余 */
    a_s_violate_mod_amount?: number;
    /** 本次还款本金部分 */
    a_t_expect_borrow_amount?: number;
    /** 本次还款本金部分 */
    a_u_borrow_amount?: number;
    /** 本次还款本金结余 */
    a_v_borrow_mod_amount?: number;
    /** 逾期天数 */
    a_w_overdue_days?: number;
    /** 支付方法 */
    a_x_payment_method?: string;
    /** 分期序号 */
    a_y_period_index?: number;
    /** 分期期数 */
    a_z_period_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type RBlack = {
    /** id */
    id?: number;
    /** 信息* */
    a_info: string;
    /** 信息命中次数* */
    b_hit_count?: number;
    /** 1:手机号 2:身份证号 3:身份证2号 4:银行卡 5：设备 */
    c_type?: number;
    /** 结束时间* */
    d_overdate?: string;
    /** 管理员id* */
    e_admin_id: number;
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
    /** 文件id* */
    l_admin_file_id?: number;
    /** 最近命中时间 */
    m_last_hit_time?: string;
    /** 状态 */
    n_status?: number;
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

  type RBSuspicious = {
    /** id */
    id?: number;
    /** 可疑用户 */
    a_user_id?: number;
    /** 关联用户 */
    b_linked_user_ids: string;
    /** 可疑订单 */
    c_borrow_id?: number;
    /** 关联订单 */
    d_linked_borrow_ids: string;
    /** 类型 1：一用户多设备 2：一设备多用户 */
    e_type?: number;
    /** device android ios windows linux */
    f_reason: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type RCSms = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 1 验证码类 2 推广类 3 通知类 4 社交类 */
    b_cat?: string;
    /** 1类金融 2类金融 3通讯录 4其他 */
    c_level?: string;
    /** 101: '登录',102: '拒绝',103: '通过',104: '放款',105: '还款',106: '展期',107: '催收',108: '召回',109: '营销',110:'其他',111: '严重催收',112逾前提醒 ，113预计还款，114提前还款，115复贷 */
    d_type?: string;
    /** 商户 */
    e_merchant?: string;
    /** 金额 */
    f_amount?: number;
    /** 商户 (备用) */
    g_merchant2?: string;
    /** 商户（备用） */
    h_merchant3?: string;
    /** 金额（备用） */
    i_amount2?: number;
    /** 金额（备用） */
    j_amount3?: number;
    /** 101: '登录',102: '拒绝',103: '通过',104: '放款',105: '还款',106: '展期',107: '催收',108: '召回',109: '营销',110:'其他',111: '严重催收',112逾前提醒 ，113预计还款，114提前还款，115复贷 */
    k_type2?: string;
    /** 链接 */
    l_url?: string;
    /** 联系手机 */
    m_phone?: string;
    /** 天数 */
    n_days?: number;
    /** 时间 */
    o_type_time?: string;
    /** 0:非收支 1:收入 2:支出 */
    p_type3?: number;
    /** 是否删除 1:已删除 2:未删除 */
    q_is_deleted?: number;
    /** 是否通讯录 1:是 2:否 */
    r_is_contact?: number;
    /** 关键字 */
    s_keyword?: string;
    /** data */
    date?: number;
    /** date_sent */
    date_sent?: number;
    /** thread_id */
    thread_id?: number;
    /** read */
    read?: number;
    /** seen */
    seen?: number;
    /** status */
    status?: number;
    /** type */
    type?: number;
    /** address */
    address?: string;
    /** body */
    body?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type RDSms = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 1 验证码类 2 推广类 3 通知类 4 社交类 */
    b_cat?: string;
    /** 1类金融 2类金融 3其他 */
    c_level?: string;
    /** 101: '登录',102: '拒绝',103: '通过',104: '放款',105: '还款',106: '展期',107: '催收',108: '召回',109: '营销',110:'其他' */
    d_type?: string;
    /** 商户 */
    e_merchant?: string;
    /** 金额 */
    f_amount?: number;
    /** 商户 (备用) */
    g_merchant2?: string;
    /** 商户（备用） */
    h_merchant3?: string;
    /** 金额（备用） */
    i_amount2?: number;
    /** 金额（备用） */
    j_amount3?: number;
    /** 第二类型(备用) */
    k_type2?: number;
    /** 链接 */
    l_url?: string;
    /** data */
    date?: number;
    /** date_sent */
    date_sent?: number;
    /** thread_id */
    thread_id?: number;
    /** read */
    read?: number;
    /** seen */
    seen?: number;
    /** status */
    status?: number;
    /** type */
    type?: number;
    /** address */
    address?: string;
    /** body */
    body?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type RERiskValueSmsBasic = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 用户 */
    b_borrow_id?: number;
    /** 手机号码 */
    c_phone?: string;
    /** 风控字段 */
    d_risk_item_id?: number;
    /** 风控字段分类 */
    e_risk_item_cat_id?: number;
    /** 字段名标识 */
    f_risk_item_name_flag?: string;
    /** 接收短信数 */
    receive_sms_count?: number;
    /** 发送短信数 */
    send_sms_count?: number;
    /** 短信总数 */
    sms_count?: number;
    /** 接收的一类金融短信数 */
    all_receive_finance1_sms_count?: number;
    /** 一类金融发送短信数 */
    send_finance1_sms_count?: number;
    /** 一类金融短信总数 */
    finance1_sms_count?: number;
    /** 二类金融机构接受短信数 */
    receive_finance2_sms_count?: number;
    /** 二类金融发送短信数 */
    send_finance2_sms_count?: number;
    /** 二类金融短信总数 */
    finance2_sms_count?: number;
    /** 最远一条短信距当前的天数 */
    oldest_sms_days?: number;
    /** 最近一条短信距当前的天数 */
    newest_sms_days?: number;
    /** 最远一条放款短信距当前的天数 */
    oldest_loan_sms_days?: number;
    /** 最近一条放款短信距当前的天数 */
    newest_loan_sms_days?: number;
    /** 有短信记录的月份数 */
    exist_sms_month_count?: number;
    /** 有短信记录的月份数占比 */
    exist_sms_month_rate?: number;
    /** 每月平均接受短信数 */
    exist_sms_month_avg_sms_count?: number;
    /** 联系人数量 */
    contact_sms_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type SAApp = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 1类金融 2类金融 3其他 */
    b_level?: string;
    /** 商户 */
    c_merchant?: string;
    /** 商户id */
    d_merchant_id?: number;
    /** 是否之前安装过（现在卸载了） */
    f_history_installed?: number;
    /** 关联短信数量 */
    g_sms_count?: number;
    /** appName */
    appName?: string;
    /** packageName */
    packageName?: string;
    /** versionName */
    versionName?: string;
    /** isSystemApp */
    isSystemApp?: number;
    /** data */
    firstInstallTime?: number;
    /** 登录短信数 */
    h_login_sms_count?: number;
    /** 拒绝短信数 */
    i_refuse_sms_count?: number;
    /** 通过短信数 */
    j_accept_sms_count?: number;
    /** 放款短信数 */
    k_loan_sms_count?: number;
    /** 还款短信数 */
    l_repay_sms_count?: number;
    /** 展期短信数 */
    m_extend_sms_count?: number;
    /** 催收短息数 */
    n_urge_sms_count?: number;
    /** 营销短信数 */
    o_marketing_sms_count?: number;
    /** 召回短信数 */
    p_recall_sms_count?: number;
    /** 其他短信数 */
    q_other_sms_count?: number;
    /** 短信总数 */
    r_total_sms_count?: number;
    /** 放款总金额 */
    s_loan_amount?: number;
    /** 还款总金额 */
    t_repay_amount?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type SBApp = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 1类金融 2类金融 3其他 */
    b_level?: string;
    /** 商户 */
    c_merchant?: string;
    /** 商户id */
    d_merchant_id?: number;
    /** 是否之前安装过（现在卸载了） */
    f_history_installed?: number;
    /** 关联短信数量 */
    g_sms_count?: number;
    /** appName */
    appName?: string;
    /** packageName */
    packageName?: string;
    /** versionName */
    versionName?: string;
    /** isSystemApp */
    isSystemApp?: number;
    /** data */
    firstInstallTime?: number;
    /** 登录短信数 */
    h_login_sms_count?: number;
    /** 拒绝短信数 */
    i_refuse_sms_count?: number;
    /** 通过短信数 */
    j_accept_sms_count?: number;
    /** 放款短信数 */
    k_loan_sms_count?: number;
    /** 还款短信数 */
    l_repay_sms_count?: number;
    /** 展期短信数 */
    m_extend_sms_count?: number;
    /** 催收短息数 */
    n_urge_sms_count?: number;
    /** 营销短信数 */
    o_marketing_sms_count?: number;
    /** 召回短信数 */
    p_recall_sms_count?: number;
    /** 其他短信数 */
    q_other_sms_count?: number;
    /** 短信总数 */
    r_total_sms_count?: number;
    /** 放款总金额 */
    s_loan_amount?: number;
    /** 还款总金额 */
    t_repay_amount?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type SCRiskValueSms = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 用户 */
    b_borrow_id?: number;
    /** 手机号码 */
    c_phone?: string;
    /** 风控字段 */
    d_risk_item_id?: number;
    /** 风控字段分类 */
    e_risk_item_cat_id?: number;
    /** 字段名标识 */
    f_risk_item_name_flag?: string;
    /** 3天内 */
    g_value_3?: number;
    /** 7天内 */
    h_value_7?: number;
    /** 15天内 */
    i_value_15?: number;
    /** 30天内 */
    j_value_30?: number;
    /** 60天内 */
    k_value_60?: number;
    /** 90天内 */
    l_value_90?: number;
    /** 180天内 */
    m_value_180?: number;
    /** 360天内 */
    n_value_360?: number;
    /** 所有天内 */
    o_value_0?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type SDLiveness = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** verify id */
    b_borrow_id?: number;
    /** 人脸 */
    c_face1?: string;
    /** 人脸 */
    d_face2?: string;
    /** 人脸 */
    e_face3?: string;
    /** 人脸 */
    f_face4?: string;
    /** 人脸 */
    g_face5?: string;
    /** 人脸 */
    h_face6?: string;
    /** ocr相似度 */
    i_compare_score?: number;
    /** ocr相似度 */
    j_compare_score2?: number;
    /** 相似1 */
    k_similar_id?: number;
    /** 相似1 */
    l_similar_score?: number;
    /** 相似2 */
    m_similar2_id?: number;
    /** 相似2 */
    n_similar2_score?: number;
    /** 相似3 */
    o_similar3_id?: number;
    /** 相似3 */
    p_similar3_score?: number;
    /** 相似4 */
    q_similar4_id?: number;
    /** 相似4 */
    r_similar4_score?: number;
    /** 相似5 */
    s_similar5_id?: number;
    /** 相似5 */
    t_similar5_score?: number;
    /** encoding */
    u_encoding1?: string;
    /** encoding */
    v_encoding2?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type SEVirtualAccount = {
    /** id */
    id?: number;
    /** 用户id */
    a_user_id?: number;
    /** 网关id */
    b_easy_payment_id?: number;
    /** 身份证认证状态 10:待认证，20已认证 30：认证拒绝 40：认证过期 50：复审 */
    c_status?: number;
    /** 银行名称 */
    d_account_name?: number;
    /** 银行code */
    e_account_number?: string;
    /** 认证有效时间 */
    f_expired?: string;
    /** email */
    g_email?: string;
    /** 银行名称 */
    h_bank_name?: number;
    /** 银行code */
    i_bank_code?: string;
    /** 持有人姓名 */
    j_full_name?: string;
    /** 网关 */
    k_gateway?: string;
    /** 支付次数 */
    l_pay_count?: number;
    /** 最近一次支付时间 */
    m_pay_last_time?: string;
    /** Call Log */
    n_payment_gateway_log_id?: number;
    /** CallBack Log */
    o_payment_gateway_log_id?: number;
    /** QR */
    p_qr?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type SWriteOff = {
    /** id */
    id?: number;
    /** borrow_id */
    a_borrow_id?: number;
    /** 还款id */
    b_repay_id?: number;
    /** 分期id */
    c_period_id?: number;
    /** 用户 */
    d_user_id?: number;
    /** 申请管理员 */
    e_apply_admin_id?: number;
    /** 审核管理员 */
    f_review_admin_id?: number;
    /** 分期期数 */
    g_period_count?: number;
    /** 核销序号 */
    h_index?: number;
    /** 状态 10:待审核 40：审核拒绝 50：审核通过  */
    i_status?: number;
    /** 申请备注 */
    j_apply_remark?: string;
    /** 申请备注 */
    k_apply_remark?: string;
    /** 审核备注 */
    l_review_remark?: string;
    /** 审核备注 */
    m_review_remark?: string;
    /** 附件id */
    n_file_id?: number;
    /** 附件id */
    o_file_id?: number;
    /** 附件id */
    p_file_id?: number;
    /** 核销总额 */
    q_write_off_total_amount?: number;
    /** 核销总本金 */
    r_write_off_total_borrow_amount?: number;
    /** 核销总利息 */
    s_write_off_total_interest?: number;
    /** 核销总服务费 */
    t_write_off_total_service_fee?: number;
    /** 核销总违约金 */
    u_write_off_total_violate_fee?: number;
    /** 核销总罚息 */
    v_write_off_total_overdue_fee?: number;
    /** 核销后是否借款 */
    w_borrow?: string;
    /** 核销时间 */
    x_repay_time?: string;
    /** 支付流水 */
    y_repay_log_id?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type TARiskValueSmsOrder = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 用户 */
    b_borrow_id?: number;
    /** 手机号码 */
    c_phone?: string;
    /** 风控字段 */
    d_risk_item_id?: number;
    /** 风控字段分类 */
    e_risk_item_cat_id?: number;
    /** 字段名标识 */
    f_risk_item_name_flag?: string;
    /** 3天内 */
    g_value_3?: number;
    /** 7天内 */
    h_value_7?: number;
    /** 15天内 */
    i_value_15?: number;
    /** 30天内 */
    j_value_30?: number;
    /** 60天内 */
    k_value_60?: number;
    /** 90天内 */
    l_value_90?: number;
    /** 180天内 */
    m_value_180?: number;
    /** 360天内 */
    n_value_360?: number;
    /** 所有天内 */
    o_value_0?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type TBSms = {
    /** id */
    id?: number;
    /** 用户 */
    a_user_id?: number;
    /** 订单 */
    b_borrow_id?: number;
    /** 管理员 */
    c_admin_id?: number;
    /** 网关 */
    d_gateway?: string;
    /** SId */
    e_sender_id?: string;
    /** 号码 */
    f_to: string;
    /** 内容 */
    g_text: string;
    /** reference */
    h_reference: string;
    /** message_id */
    i_message_id?: string;
    /** 耗时 */
    j_duration?: number;
    /** 发送状态 */
    k_send_status?: string;
    /** 返回消息 */
    l_message?: string;
    /** 价格 */
    m_price?: number;
    /** 币种 */
    n_currency?: string;
    /** 同步通知 */
    o_sms_gateway_log_id?: number;
    /** 发送时间 */
    q_sent_at?: string;
    /** 类型 1:otp 2:通知类 3:营销类 4:灰线 */
    r_type?: number;
    /** 'register'注册,'login'登录,'verify'认证完成,'sign'签约完成,‘loan‘放款’’'repay'还款完成,'recall'召回,'marketing'营销,'s0','s1','s2','s3','admin'后台管理员,'urge'催员,'contact'向通讯录发送,'other'其他 */
    s_node?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type TCollectionAgency = {
    /** id */
    id?: number;
    /** 机构名称 */
    a_name?: string;
    /** 管理员 */
    b_admin_id?: number;
    /** 起始阶段 */
    c_begin_collection_stage?: number;
    /** 小组数 */
    d_collection_group_count?: number;
    /** 催员数 */
    e_collection_admin_count?: number;
    /** 状态 */
    f_status?: number;
    /** 备注 */
    g_comment?: string;
    /** 在催订单数 */
    h_collection_ing_order_count?: number;
    /** 结束阶段 */
    i_end_collection_stage?: number;
    /** 是否锁定案件 1：锁定 2：不锁定 */
    j_lock?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type TCOtherGatewayLog = {
    /** id */
    id?: number;
    /** 网关 */
    a_gateway?: string;
    /** 系统方法 */
    b_action?: string;
    /** endpoint */
    c_endpoint?: string;
    /** http code */
    d_http_code?: number;
    /** code */
    e_sync_code?: string;
    /** msg */
    f_sync_msg?: string;
    /** message */
    g_sync_message?: string;
    /** code */
    h_callback_code?: string;
    /** msg */
    i_callback_msg?: string;
    /** message */
    j_callback_message?: string;
    /** request 请求三方的时候为请求体，回调的时候为回调体 */
    k_sync_response?: string;
    /** response */
    l_callback_response?: string;
    /** user */
    m_user_id?: number;
    /** borrow */
    n_borrow_id?: number;
    /** request */
    o_request?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
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

  type VCollectionAssignLog = {
    /** id */
    id?: number;
    /** 分配批次 */
    a_batch_sn?: string;
    /** 操作管理员 0为系统 */
    b_admin_id?: number;
    /** 目标id */
    c_target_id?: number;
    /** 目标类型 1机构 2小组 3催员 */
    d_target_type?: number;
    /** 分类 1计划任务 2管理员释放 3管理员转移 */
    e_cat?: number;
    /** 应分配数 */
    f_should_assign_count?: number;
    /** 原有案件数 */
    g_old_assign_count?: number;
    /** 分配占比 */
    h_rate?: number;
    /** 分配模式 1：按比补齐 2：按比分配 */
    i_assign_type?: number;
    /** 流转类型 1：随机 2：尽量排除 3：尽量保留 */
    j_flow_type?: number;
    /** 原有案件详情 */
    k_old_detail?: string;
    /** 新案件详情 */
    l_new_detail?: string;
    /** 差集或交集 */
    m_diff_or_intersect_detail?: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WAMarketing = {
    /** id */
    id?: number;
    /** 首次营销日期 */
    a_first_date?: string;
    /** 最后一次营销日期 */
    b_last_date?: string;
    /** 营销名称 */
    c_title: string;
    /** 渠道 */
    b_channel_id?: number;
    /** 营销 */
    d_marketing_id?: number;
    /** 营销次数 */
    e_marketing_times?: number;
    /** 发送短信总数 */
    f_sms_times?: number;
    /** 发送邮件总数 */
    g_email_times?: number;
    /** 导入数量 */
    h_import_count?: number;
    /** 有效数量 */
    i_valid_count?: number;
    /** 注册总数 */
    j_register_count?: number;
    /** 总转化率 */
    k_register_rate?: number;
    /** 未转化率 */
    l_unregister_rate?: number;
    /** 7天注册数 */
    m_0_7_day_count?: number;
    /** 7天转化率 */
    n_0_7_day_rate?: number;
    /** 第6天转化率 */
    o_6_day_rate?: number;
    /** 第7天转化率 */
    p_7_day_rate?: number;
    /** 8-30天注册数 */
    q_8_30_day_count?: number;
    /** 8-30天转化率 */
    r_8_30_day_rate?: number;
    /** 第8天转化率 */
    s_8_day_rate?: number;
    /** 第9天转化率 */
    t_9_day_rate?: number;
    /** 第29天转化率 */
    u_29_day_rate?: number;
    /** 第30天转化率 */
    v_30_day_rate?: number;
    /** 30天后注册数 */
    w_31_more_day_count?: number;
    /** 30天后转化率 */
    x_31_more_day_rate?: number;
    /** 第31天转化率 */
    y_31_day_rate?: number;
    /** 第32天转化率 */
    z_32_day_rate?: number;
    /** 首贷机审拒绝数 */
    a_a_refuse_count?: number;
    /** 首贷机审拒绝率 */
    a_b_refuse_rate?: number;
    /** 放款订单数 */
    a_c_loan_count?: number;
    /** 逾期订单数 */
    a_d_overdue_count?: number;
    /** 逾期订单率 */
    a_e_overdue_rate?: number;
    /** 黑名单数 */
    a_f_black_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WBProductOverdue = {
    /** id */
    id?: number;
    /** 应还日期 */
    a_expected_date?: string;
    /** 产品 */
    b_product_id?: number;
    /** 期数 */
    c_a_period_index?: number;
    /** 应还数量 */
    c_expected_count?: number;
    /** 应还金额 */
    d_expected_amount?: number;
    /** 结清数量 */
    e_settled_count?: number;
    /** 结清金额 */
    f_settled_amount?: number;
    /** 部分还款数量 */
    g_partial_count?: number;
    /** 部分还款金额 */
    h_partial_amount?: number;
    /** 展期数量 */
    i_extend_count?: number;
    /** 展期金额 */
    j_extend_amount?: number;
    /** DPD0 */
    k_DPD0_count?: number;
    /** DPD0 */
    l_DPD0_amount?: number;
    /** DPD0 */
    m_DPD0_count_rate?: number;
    /** DPD0 */
    n_DPD0_amount_rate?: number;
    /** DPD1 */
    o_DPD1_count?: number;
    /** DPD1 */
    p_DPD1_amount?: number;
    /** DPD1 */
    q_DPD1_count_rate?: number;
    /** DPD1 */
    r_DPD1_amount_rate?: number;
    /** DPD2 */
    s_DPD2_count?: number;
    /** DPD2 */
    t_DPD2_amount?: number;
    /** DPD2 */
    u_DPD2_count_rate?: number;
    /** DPD2 */
    v_DPD2_amount_rate?: number;
    /** DPD3 */
    w_DPD3_count?: number;
    /** DPD3 */
    x_DPD3_amount?: number;
    /** DPD3 */
    y_DPD3_count_rate?: number;
    /** DPD3 */
    z_DPD3_amount_rate?: number;
    /** DPD4 */
    a_a_DPD4_count?: number;
    /** DPD4 */
    a_b_DPD4_amount?: number;
    /** DPD4 */
    a_c_DPD4_count_rate?: number;
    /** DPD4 */
    a_d_DPD4_amount_rate?: number;
    /** DPD5 */
    a_e_DPD5_count?: number;
    /** DPD5 */
    a_f_DPD5_amount?: number;
    /** DPD5 */
    a_g_DPD5_count_rate?: number;
    /** DPD5 */
    a_h_DPD5_amount_rate?: number;
    /** DPD6 */
    a_i_DPD7_count?: number;
    /** DPD6 */
    a_j_DPD7_amount?: number;
    /** DPD6 */
    a_k_DPD7_count_rate?: number;
    /** DPD6 */
    a_l_DPD7_amount_rate?: number;
    /** DPD15 */
    a_m_DPD15_count?: number;
    /** DPD15 */
    a_n_DPD15_amount?: number;
    /** DPD15 */
    a_o_DPD15_count_rate?: number;
    /** DPD15 */
    a_p_DPD15_amount_rate?: number;
    /** DPD30 */
    a_q_DPD30_count?: number;
    /** DPD30 */
    a_r_DPD30_amount?: number;
    /** DPD30 */
    a_s_DPD30_count_rate?: number;
    /** DPD30 */
    a_t_DPD30_amount_rate?: number;
    /** DPD60 */
    a_u_DPD60_count?: number;
    /** DPD60 */
    a_v_DPD60_amount?: number;
    /** DPD60 */
    a_w_DPD60_count_rate?: number;
    /** DPD60 */
    a_x_DPD60_amount_rate?: number;
    /** DPD60+ */
    'a_y_DPD60+_count'?: number;
    /** DPD60+ */
    'a_z_DPD60+_amount'?: number;
    /** DPD60+ */
    'b_a_DPD60+_count_rate'?: number;
    /** DPD60+ */
    'b_b_DPD60+_amount_rate'?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WCProductLoanOverdue = {
    /** id */
    id?: number;
    /** 应还日期 */
    a_loan_date?: string;
    /** 产品 */
    b_product_id?: number;
    /** 期数 */
    c_a_period_index?: number;
    /** 应还数量 */
    c_expected_count?: number;
    /** 应还金额 */
    d_expected_amount?: number;
    /** 结清数量 */
    e_settled_count?: number;
    /** 结清金额 */
    f_settled_amount?: number;
    /** 部分还款数量 */
    g_partial_count?: number;
    /** 部分还款金额 */
    h_partial_amount?: number;
    /** 展期数量 */
    i_extend_count?: number;
    /** 展期金额 */
    j_extend_amount?: number;
    /** DPD0 */
    k_DPD0_count?: number;
    /** DPD0 */
    l_DPD0_amount?: number;
    /** DPD0 */
    m_DPD0_count_rate?: number;
    /** DPD0 */
    n_DPD0_amount_rate?: number;
    /** DPD1 */
    o_DPD1_count?: number;
    /** DPD1 */
    p_DPD1_amount?: number;
    /** DPD1 */
    q_DPD1_count_rate?: number;
    /** DPD1 */
    r_DPD1_amount_rate?: number;
    /** DPD2 */
    s_DPD2_count?: number;
    /** DPD2 */
    t_DPD2_amount?: number;
    /** DPD2 */
    u_DPD2_count_rate?: number;
    /** DPD2 */
    v_DPD2_amount_rate?: number;
    /** DPD3 */
    w_DPD3_count?: number;
    /** DPD3 */
    x_DPD3_amount?: number;
    /** DPD3 */
    y_DPD3_count_rate?: number;
    /** DPD3 */
    z_DPD3_amount_rate?: number;
    /** DPD4 */
    a_a_DPD4_count?: number;
    /** DPD4 */
    a_b_DPD4_amount?: number;
    /** DPD4 */
    a_c_DPD4_count_rate?: number;
    /** DPD4 */
    a_d_DPD4_amount_rate?: number;
    /** DPD5 */
    a_e_DPD5_count?: number;
    /** DPD5 */
    a_f_DPD5_amount?: number;
    /** DPD5 */
    a_g_DPD5_count_rate?: number;
    /** DPD5 */
    a_h_DPD5_amount_rate?: number;
    /** DPD6 */
    a_i_DPD7_count?: number;
    /** DPD6 */
    a_j_DPD7_amount?: number;
    /** DPD6 */
    a_k_DPD7_count_rate?: number;
    /** DPD6 */
    a_l_DPD7_amount_rate?: number;
    /** DPD15 */
    a_m_DPD15_count?: number;
    /** DPD15 */
    a_n_DPD15_amount?: number;
    /** DPD15 */
    a_o_DPD15_count_rate?: number;
    /** DPD15 */
    a_p_DPD15_amount_rate?: number;
    /** DPD30 */
    a_q_DPD30_count?: number;
    /** DPD30 */
    a_r_DPD30_amount?: number;
    /** DPD30 */
    a_s_DPD30_count_rate?: number;
    /** DPD30 */
    a_t_DPD30_amount_rate?: number;
    /** DPD60 */
    a_u_DPD60_count?: number;
    /** DPD60 */
    a_v_DPD60_amount?: number;
    /** DPD60 */
    a_w_DPD60_count_rate?: number;
    /** DPD60 */
    a_x_DPD60_amount_rate?: number;
    /** DPD60+ */
    'a_y_DPD60+_count'?: number;
    /** DPD60+ */
    'a_z_DPD60+_amount'?: number;
    /** DPD60+ */
    'b_a_DPD60+_count_rate'?: number;
    /** DPD60+ */
    'b_b_DPD60+_amount_rate'?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WDMultiDimensionOverdue = {
    /** id */
    id?: number;
    /** 应还日期 */
    a_expected_date?: string;
    /** 产品 */
    b_product_id?: number;
    /** 期数 */
    c_a_period_index?: number;
    /** 渠道 */
    c_b_channel_id?: number;
    /** 借款次数 */
    c_c_borrow_count?: number;
    /** 风控 */
    c_d_risk_strategy_id?: number;
    /** 期数 */
    c_e_borrow_amount?: number;
    /** 应还数量 */
    c_expected_count?: number;
    /** 应还金额 */
    d_expected_amount?: number;
    /** 结清数量 */
    e_settled_count?: number;
    /** 结清金额 */
    f_settled_amount?: number;
    /** 部分还款数量 */
    g_partial_count?: number;
    /** 部分还款金额 */
    h_partial_amount?: number;
    /** 展期数量 */
    i_extend_count?: number;
    /** 展期金额 */
    j_extend_amount?: number;
    /** DPD0 */
    k_DPD0_count?: number;
    /** DPD0 */
    l_DPD0_amount?: number;
    /** DPD0 */
    m_DPD0_count_rate?: number;
    /** DPD0 */
    n_DPD0_amount_rate?: number;
    /** DPD1 */
    o_DPD1_count?: number;
    /** DPD1 */
    p_DPD1_amount?: number;
    /** DPD1 */
    q_DPD1_count_rate?: number;
    /** DPD1 */
    r_DPD1_amount_rate?: number;
    /** DPD2 */
    s_DPD2_count?: number;
    /** DPD2 */
    t_DPD2_amount?: number;
    /** DPD2 */
    u_DPD2_count_rate?: number;
    /** DPD2 */
    v_DPD2_amount_rate?: number;
    /** DPD3 */
    w_DPD3_count?: number;
    /** DPD3 */
    x_DPD3_amount?: number;
    /** DPD3 */
    y_DPD3_count_rate?: number;
    /** DPD3 */
    z_DPD3_amount_rate?: number;
    /** DPD4 */
    a_a_DPD4_count?: number;
    /** DPD4 */
    a_b_DPD4_amount?: number;
    /** DPD4 */
    a_c_DPD4_count_rate?: number;
    /** DPD4 */
    a_d_DPD4_amount_rate?: number;
    /** DPD5 */
    a_e_DPD5_count?: number;
    /** DPD5 */
    a_f_DPD5_amount?: number;
    /** DPD5 */
    a_g_DPD5_count_rate?: number;
    /** DPD5 */
    a_h_DPD5_amount_rate?: number;
    /** DPD6 */
    a_i_DPD7_count?: number;
    /** DPD6 */
    a_j_DPD7_amount?: number;
    /** DPD6 */
    a_k_DPD7_count_rate?: number;
    /** DPD6 */
    a_l_DPD7_amount_rate?: number;
    /** DPD15 */
    a_m_DPD15_count?: number;
    /** DPD15 */
    a_n_DPD15_amount?: number;
    /** DPD15 */
    a_o_DPD15_count_rate?: number;
    /** DPD15 */
    a_p_DPD15_amount_rate?: number;
    /** DPD30 */
    a_q_DPD30_count?: number;
    /** DPD30 */
    a_r_DPD30_amount?: number;
    /** DPD30 */
    a_s_DPD30_count_rate?: number;
    /** DPD30 */
    a_t_DPD30_amount_rate?: number;
    /** DPD60 */
    a_u_DPD60_count?: number;
    /** DPD60 */
    a_v_DPD60_amount?: number;
    /** DPD60 */
    a_w_DPD60_count_rate?: number;
    /** DPD60 */
    a_x_DPD60_amount_rate?: number;
    /** DPD60+ */
    'a_y_DPD60+_count'?: number;
    /** DPD60+ */
    'a_z_DPD60+_amount'?: number;
    /** DPD60+ */
    'b_a_DPD60+_count_rate'?: number;
    /** DPD60+ */
    'b_b_DPD60+_amount_rate'?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WEProductProfit = {
    /** id */
    id?: number;
    /** 应还日期 */
    a_loan_date?: string;
    /** 产品 */
    b_product_id?: number;
    /** 放款单数 */
    c_loan_count?: number;
    /** 放款期数 */
    d_loan_period_count?: number;
    /** 结清数量 */
    e_settled_count?: number;
    /** 结清期数 */
    f_settled_period_count?: number;
    /** 放款金额 */
    g_loan_amount?: number;
    /** 还款金额 */
    h_repay_amount?: number;
    /** 展期数量 */
    i_extend_count?: number;
    /** 展期金额 */
    j_extend_amount?: number;
    /** 每期放款金额 */
    k_per_period_loan_amount?: number;
    /** 还款率 */
    l_repay_amount_rate?: number;
    /** 损益率 */
    m_profit_amount_rate?: number;
    /** 损益 */
    n_profit?: number;
    /** P1 损益 */
    o_period1_profit?: number;
    /** P2 损益 */
    p_period2_profit?: number;
    /** P3 损益 */
    q_period3_profit?: number;
    /** P4 损益 */
    r_period4_profit?: number;
    /** P5 损益 */
    s_period5_profit?: number;
    /** P6 损益 */
    t_period6_profit?: number;
    /** P1还款数 */
    u_period1_repay_count?: number;
    /** P2还款数 */
    v_period2_repay_count?: number;
    /** P3还款数 */
    w_period3_repay_count?: number;
    /** P4还款数 */
    x_period4_repay_count?: number;
    /** P5还款数 */
    y_period5_repay_count?: number;
    /** P6还款数 */
    z_period6_repay_count?: number;
    /** 每期应还款数 */
    a_a_per_period_expected_count?: number;
    /** 期数 */
    a_b_period?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WFDailyReport = {
    /** id */
    id?: number;
    /** 应还日期 */
    a_date?: string;
    /** 注册数 */
    b_register_count?: number;
    /** 黑名单数 */
    c_black_count?: number;
    /** 白名单数 */
    d_white_count?: number;
    /** 灰名单数 */
    e_grey_count?: number;
    /** 认证数 */
    f_certification_count?: number;
    /** 通过数 */
    g_machine_accept_count?: number;
    /** 拒绝数 */
    h_machine_refuse_count?: number;
    /** 复审数 */
    i_review_count?: number;
    /** 复审通过 */
    j_review_accept_count?: number;
    /** 复审拒绝 */
    k_review_refuse_count?: number;
    /** 放款数 */
    l_loan_count?: number;
    /** 放款期数 */
    m_loan_period_count?: number;
    /** 放款金额 */
    n_loan_amount?: number;
    /** 复贷放款 */
    o_re_loan_count?: number;
    /** 复贷放款金额 */
    p_re_loan_amount?: number;
    /** 放款失败 */
    q_loan_fail_count?: number;
    /** 放款拦截 */
    r_loan_intercept_count?: number;
    /** 结清数 */
    s_settled_count?: number;
    /** 还款期数 */
    t_settled_period_count?: number;
    /** 还款金额 */
    u_repay_amount?: number;
    /** 复贷还款数 */
    v_re_repay_count?: number;
    /** 复贷还款金额 */
    w_re_repay_amount?: number;
    /** 还款失败 */
    x_repay_fail_count?: number;
    /** 展期数 */
    y_extend_count?: number;
    /** 展期金额 */
    z_extend_amount?: number;
    /** 减免数 */
    a_a_reduce_count?: number;
    /** 减免金额 */
    a_b_reduce_amount?: number;
    /** 入催数 */
    a_c_collection_count?: number;
    /** 催记数 */
    a_d_collection_log_count?: number;
    /** 催回数 */
    a_e_collection_success_count?: number;
    /** 催回金额 */
    a_f_collection_success_amount?: number;
    /** otp数 */
    a_g_otp_sms_count?: number;
    /** 通知数 */
    a_h_notification_sms_count?: number;
    /** 营销数 */
    a_i_marketing_sms_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WHOverdueRiskItemRange = {
    /** id */
    id?: number;
    /** 风控日期 */
    a_a_a_risk_week?: number;
    /** 字段 */
    a_a_b_risk_item_id?: number;
    /** 总数 */
    a_a_c_total_count?: number;
    /** 最后应还款日 */
    a_a_d_last_expected_repay_time?: string;
    /** 区间详情 */
    a_a_e_range_detail?: number;
    /** 区间1数 */
    a_a_range1_count?: number;
    /** 区间1分期1放应还数 */
    a_b_range1_expected_period1_count?: number;
    /** 区间1分期1首逾数 */
    a_c_range1_overdue_period1_count?: number;
    /** 区间1分期1结清数 */
    a_d_range1_settled_period1_count?: number;
    /** 区间1分期2放应还数 */
    a_e_range1_expected_period2_count?: number;
    /** 区间1分期2首逾数 */
    a_f_range1_overdue_period2_count?: number;
    /** 区间1分期2结清数 */
    a_g_range1_settled_period2_count?: number;
    /** 区间1分期3放应还数 */
    a_h_range1_expected_period3_count?: number;
    /** 区间1分期3首逾数 */
    a_i_range1_overdue_period3_count?: number;
    /** 区间1分期3结清数 */
    a_j_range1_settled_period3_count?: number;
    /** 区间1分期4放应还数 */
    a_k_range1_expected_period4_count?: number;
    /** 区间1分期4首逾数 */
    a_l_range1_overdue_period4_count?: number;
    /** 区间1分期4结清数 */
    a_m_range1_settled_period4_count?: number;
    /** 区间1分期5放应还数 */
    a_n_range1_expected_period5_count?: number;
    /** 区间1分期5首逾数 */
    a_o_range1_overdue_period5_count?: number;
    /** 区间1分期5结清数 */
    a_p_range1_settled_period5_count?: number;
    /** 区间1分期6放应还数 */
    a_q_range1_expected_period6_count?: number;
    /** 区间1分期6首逾数 */
    a_r_range1_overdue_period6_count?: number;
    /** 区间1分期6结清数 */
    a_s_range1_settled_period6_count?: number;
    /** 区间2数 */
    b_a_range1_count?: number;
    /** 区间2分期1放应还数 */
    b_b_range1_expected_period1_count?: number;
    /** 区间2分期1首逾数 */
    b_c_range1_overdue_period1_count?: number;
    /** 区间2分期1结清数 */
    b_d_range1_settled_period1_count?: number;
    /** 区间2分期2放应还数 */
    b_e_range1_expected_period2_count?: number;
    /** 区间2分期2首逾数 */
    b_f_range1_overdue_period2_count?: number;
    /** 区间2分期2结清数 */
    b_g_range1_settled_period2_count?: number;
    /** 区间2分期3放应还数 */
    b_h_range1_expected_period3_count?: number;
    /** 区间2分期3首逾数 */
    b_i_range1_overdue_period3_count?: number;
    /** 区间2分期3结清数 */
    b_j_range1_settled_period3_count?: number;
    /** 区间2分期4放应还数 */
    b_k_range1_expected_period4_count?: number;
    /** 区间2分期4首逾数 */
    b_l_range1_overdue_period4_count?: number;
    /** 区间2分期4结清数 */
    b_m_range1_settled_period4_count?: number;
    /** 区间2分期5放应还数 */
    b_n_range1_expected_period5_count?: number;
    /** 区间2分期5首逾数 */
    b_o_range1_overdue_period5_count?: number;
    /** 区间2分期5结清数 */
    b_p_range1_settled_period5_count?: number;
    /** 区间2分期6放应还数 */
    b_q_range1_expected_period6_count?: number;
    /** 区间2分期6首逾数 */
    b_r_range1_overdue_period6_count?: number;
    /** 区间2分期6结清数 */
    b_s_range1_settled_period6_count?: number;
    /** 区间3数 */
    c_a_range1_count?: number;
    /** 区间3分期1放应还数 */
    c_b_range1_expected_period1_count?: number;
    /** 区间3分期1首逾数 */
    c_c_range1_overdue_period1_count?: number;
    /** 区间3分期1结清数 */
    c_d_range1_settled_period1_count?: number;
    /** 区间3分期2放应还数 */
    c_e_range1_expected_period2_count?: number;
    /** 区间3分期2首逾数 */
    c_f_range1_overdue_period2_count?: number;
    /** 区间3分期2结清数 */
    c_g_range1_settled_period2_count?: number;
    /** 区间3分期3放应还数 */
    c_h_range1_expected_period3_count?: number;
    /** 区间3分期3首逾数 */
    c_i_range1_overdue_period3_count?: number;
    /** 区间3分期3结清数 */
    c_j_range1_settled_period3_count?: number;
    /** 区间3分期4放应还数 */
    c_k_range1_expected_period4_count?: number;
    /** 区间3分期4首逾数 */
    c_l_range1_overdue_period4_count?: number;
    /** 区间3分期4结清数 */
    c_m_range1_settled_period4_count?: number;
    /** 区间3分期5放应还数 */
    c_n_range1_expected_period5_count?: number;
    /** 区间3分期5首逾数 */
    c_o_range1_overdue_period5_count?: number;
    /** 区间3分期5结清数 */
    c_p_range1_settled_period5_count?: number;
    /** 区间3分期6放应还数 */
    c_q_range1_expected_period6_count?: number;
    /** 区间3分期6首逾数 */
    c_r_range1_overdue_period6_count?: number;
    /** 区间3分期6结清数 */
    c_s_range1_settled_period6_count?: number;
    /** 区间4数 */
    d_a_range1_count?: number;
    /** 区间4分期1放应还数 */
    d_b_range1_expected_period1_count?: number;
    /** 区间4分期1首逾数 */
    d_c_range1_overdue_period1_count?: number;
    /** 区间4分期1结清数 */
    d_d_range1_settled_period1_count?: number;
    /** 区间4分期2放应还数 */
    d_e_range1_expected_period2_count?: number;
    /** 区间4分期2首逾数 */
    d_f_range1_overdue_period2_count?: number;
    /** 区间4分期2结清数 */
    d_g_range1_settled_period2_count?: number;
    /** 区间4分期3放应还数 */
    d_h_range1_expected_period3_count?: number;
    /** 区间4分期3首逾数 */
    d_i_range1_overdue_period3_count?: number;
    /** 区间4分期3结清数 */
    d_j_range1_settled_period3_count?: number;
    /** 区间4分期4放应还数 */
    d_k_range1_expected_period4_count?: number;
    /** 区间4分期4首逾数 */
    d_l_range1_overdue_period4_count?: number;
    /** 区间4分期4结清数 */
    d_m_range1_settled_period4_count?: number;
    /** 区间4分期5放应还数 */
    d_n_range1_expected_period5_count?: number;
    /** 区间4分期5首逾数 */
    d_o_range1_overdue_period5_count?: number;
    /** 区间4分期5结清数 */
    d_p_range1_settled_period5_count?: number;
    /** 区间4分期6放应还数 */
    d_q_range1_expected_period6_count?: number;
    /** 区间4分期6首逾数 */
    d_r_range1_overdue_period6_count?: number;
    /** 区间4分期6结清数 */
    d_s_range1_settled_period6_count?: number;
    /** 区间5数 */
    e_a_range1_count?: number;
    /** 区间5分期1放应还数 */
    e_b_range1_expected_period1_count?: number;
    /** 区间5分期1首逾数 */
    e_c_range1_overdue_period1_count?: number;
    /** 区间5分期1结清数 */
    e_d_range1_settled_period1_count?: number;
    /** 区间5分期2放应还数 */
    e_e_range1_expected_period2_count?: number;
    /** 区间5分期2首逾数 */
    e_f_range1_overdue_period2_count?: number;
    /** 区间5分期2结清数 */
    e_g_range1_settled_period2_count?: number;
    /** 区间5分期3放应还数 */
    e_h_range1_expected_period3_count?: number;
    /** 区间5分期3首逾数 */
    e_i_range1_overdue_period3_count?: number;
    /** 区间5分期3结清数 */
    e_j_range1_settled_period3_count?: number;
    /** 区间5分期4放应还数 */
    e_k_range1_expected_period4_count?: number;
    /** 区间5分期4首逾数 */
    e_l_range1_overdue_period4_count?: number;
    /** 区间5分期4结清数 */
    e_m_range1_settled_period4_count?: number;
    /** 区间5分期5放应还数 */
    e_n_range1_expected_period5_count?: number;
    /** 区间5分期5首逾数 */
    e_o_range1_overdue_period5_count?: number;
    /** 区间5分期5结清数 */
    e_p_range1_settled_period5_count?: number;
    /** 区间5分期6放应还数 */
    e_q_range1_expected_period6_count?: number;
    /** 区间5分期6首逾数 */
    e_r_range1_overdue_period6_count?: number;
    /** 区间5分期6结清数 */
    e_s_range1_settled_period6_count?: number;
    /** 区间6数 */
    f_a_range1_count?: number;
    /** 区间6分期1放应还数 */
    f_b_range1_expected_period1_count?: number;
    /** 区间6分期1首逾数 */
    f_c_range1_overdue_period1_count?: number;
    /** 区间6分期1结清数 */
    f_d_range1_settled_period1_count?: number;
    /** 区间6分期2放应还数 */
    f_e_range1_expected_period2_count?: number;
    /** 区间6分期2首逾数 */
    f_f_range1_overdue_period2_count?: number;
    /** 区间6分期2结清数 */
    f_g_range1_settled_period2_count?: number;
    /** 区间6分期3放应还数 */
    f_h_range1_expected_period3_count?: number;
    /** 区间6分期3首逾数 */
    f_i_range1_overdue_period3_count?: number;
    /** 区间6分期3结清数 */
    f_j_range1_settled_period3_count?: number;
    /** 区间6分期4放应还数 */
    f_k_range1_expected_period4_count?: number;
    /** 区间6分期4首逾数 */
    f_l_range1_overdue_period4_count?: number;
    /** 区间6分期4结清数 */
    f_m_range1_settled_period4_count?: number;
    /** 区间6分期5放应还数 */
    f_n_range1_expected_period5_count?: number;
    /** 区间6分期5首逾数 */
    f_o_range1_overdue_period5_count?: number;
    /** 区间6分期5结清数 */
    f_p_range1_settled_period5_count?: number;
    /** 区间6分期6放应还数 */
    f_q_range1_expected_period6_count?: number;
    /** 区间6分期6首逾数 */
    f_r_range1_overdue_period6_count?: number;
    /** 区间6分期6结清数 */
    f_s_range1_settled_period6_count?: number;
    /** 区间7数 */
    g_a_range1_count?: number;
    /** 区间7分期1放应还数 */
    g_b_range1_expected_period1_count?: number;
    /** 区间7分期1首逾数 */
    g_c_range1_overdue_period1_count?: number;
    /** 区间7分期1结清数 */
    g_d_range1_settled_period1_count?: number;
    /** 区间7分期2放应还数 */
    g_e_range1_expected_period2_count?: number;
    /** 区间7分期2首逾数 */
    g_f_range1_overdue_period2_count?: number;
    /** 区间7分期2结清数 */
    g_g_range1_settled_period2_count?: number;
    /** 区间7分期3放应还数 */
    g_h_range1_expected_period3_count?: number;
    /** 区间7分期3首逾数 */
    g_i_range1_overdue_period3_count?: number;
    /** 区间7分期3结清数 */
    g_j_range1_settled_period3_count?: number;
    /** 区间7分期4放应还数 */
    g_k_range1_expected_period4_count?: number;
    /** 区间7分期4首逾数 */
    g_l_range1_overdue_period4_count?: number;
    /** 区间7分期4结清数 */
    g_m_range1_settled_period4_count?: number;
    /** 区间7分期5放应还数 */
    g_n_range1_expected_period5_count?: number;
    /** 区间7分期5首逾数 */
    g_o_range1_overdue_period5_count?: number;
    /** 区间7分期5结清数 */
    g_p_range1_settled_period5_count?: number;
    /** 区间7分期6放应还数 */
    g_q_range1_expected_period6_count?: number;
    /** 区间7分期6首逾数 */
    g_r_range1_overdue_period6_count?: number;
    /** 区间7分期6结清数 */
    g_s_range1_settled_period6_count?: number;
    /** 区间8数 */
    h_a_range1_count?: number;
    /** 区间8分期1放应还数 */
    h_b_range1_expected_period1_count?: number;
    /** 区间8分期1首逾数 */
    h_c_range1_overdue_period1_count?: number;
    /** 区间8分期1结清数 */
    h_d_range1_settled_period1_count?: number;
    /** 区间8分期2放应还数 */
    h_e_range1_expected_period2_count?: number;
    /** 区间8分期2首逾数 */
    h_f_range1_overdue_period2_count?: number;
    /** 区间8分期2结清数 */
    h_g_range1_settled_period2_count?: number;
    /** 区间8分期3放应还数 */
    h_h_range1_expected_period3_count?: number;
    /** 区间8分期3首逾数 */
    h_i_range1_overdue_period3_count?: number;
    /** 区间8分期3结清数 */
    h_j_range1_settled_period3_count?: number;
    /** 区间8分期4放应还数 */
    h_k_range1_expected_period4_count?: number;
    /** 区间8分期4首逾数 */
    h_l_range1_overdue_period4_count?: number;
    /** 区间8分期4结清数 */
    h_m_range1_settled_period4_count?: number;
    /** 区间8分期5放应还数 */
    h_n_range1_expected_period5_count?: number;
    /** 区间8分期5首逾数 */
    h_o_range1_overdue_period5_count?: number;
    /** 区间8分期5结清数 */
    h_p_range1_settled_period5_count?: number;
    /** 区间8分期6放应还数 */
    h_q_range1_expected_period6_count?: number;
    /** 区间8分期6首逾数 */
    h_r_range1_overdue_period6_count?: number;
    /** 区间8分期6结清数 */
    h_s_range1_settled_period6_count?: number;
    /** 区间9数 */
    i_a_range1_count?: number;
    /** 区间9分期1放应还数 */
    i_b_range1_expected_period1_count?: number;
    /** 区间9分期1首逾数 */
    i_c_range1_overdue_period1_count?: number;
    /** 区间9分期1结清数 */
    i_d_range1_settled_period1_count?: number;
    /** 区间9分期2放应还数 */
    i_e_range1_expected_period2_count?: number;
    /** 区间9分期2首逾数 */
    i_f_range1_overdue_period2_count?: number;
    /** 区间9分期2结清数 */
    i_g_range1_settled_period2_count?: number;
    /** 区间9分期3放应还数 */
    i_h_range1_expected_period3_count?: number;
    /** 区间9分期3首逾数 */
    i_i_range1_overdue_period3_count?: number;
    /** 区间9分期3结清数 */
    i_j_range1_settled_period3_count?: number;
    /** 区间9分期4放应还数 */
    i_k_range1_expected_period4_count?: number;
    /** 区间9分期4首逾数 */
    i_l_range1_overdue_period4_count?: number;
    /** 区间9分期4结清数 */
    i_m_range1_settled_period4_count?: number;
    /** 区间9分期5放应还数 */
    i_n_range1_expected_period5_count?: number;
    /** 区间9分期5首逾数 */
    i_o_range1_overdue_period5_count?: number;
    /** 区间9分期5结清数 */
    i_p_range1_settled_period5_count?: number;
    /** 区间9分期6放应还数 */
    i_q_range1_expected_period6_count?: number;
    /** 区间9分期6首逾数 */
    i_r_range1_overdue_period6_count?: number;
    /** 区间9分期6结清数 */
    i_s_range1_settled_period6_count?: number;
    /** 区间10数 */
    j_a_range1_count?: number;
    /** 区间10分期1放应还数 */
    j_b_range1_expected_period1_count?: number;
    /** 区间10分期1首逾数 */
    j_c_range1_overdue_period1_count?: number;
    /** 区间10分期1结清数 */
    j_d_range1_settled_period1_count?: number;
    /** 区间10分期2放应还数 */
    j_e_range1_expected_period2_count?: number;
    /** 区间10分期2首逾数 */
    j_f_range1_overdue_period2_count?: number;
    /** 区间10分期2结清数 */
    j_g_range1_settled_period2_count?: number;
    /** 区间10分期3放应还数 */
    j_h_range1_expected_period3_count?: number;
    /** 区间10分期3首逾数 */
    j_i_range1_overdue_period3_count?: number;
    /** 区间10分期3结清数 */
    j_j_range1_settled_period3_count?: number;
    /** 区间10分期4放应还数 */
    j_k_range1_expected_period4_count?: number;
    /** 区间10分期4首逾数 */
    j_l_range1_overdue_period4_count?: number;
    /** 区间10分期4结清数 */
    j_m_range1_settled_period4_count?: number;
    /** 区间10分期5放应还数 */
    j_n_range1_expected_period5_count?: number;
    /** 区间10分期5首逾数 */
    j_o_range1_overdue_period5_count?: number;
    /** 区间10分期5结清数 */
    j_p_range1_settled_period5_count?: number;
    /** 区间10分期6放应还数 */
    j_q_range1_expected_period6_count?: number;
    /** 区间10分期6首逾数 */
    j_r_range1_overdue_period6_count?: number;
    /** 区间10分期6结清数 */
    j_s_range1_settled_period6_count?: number;
    /** 区间11数 */
    k_a_range1_count?: number;
    /** 区间11分期1放应还数 */
    k_b_range1_expected_period1_count?: number;
    /** 区间11分期1首逾数 */
    k_c_range1_overdue_period1_count?: number;
    /** 区间11分期1结清数 */
    k_d_range1_settled_period1_count?: number;
    /** 区间11分期2放应还数 */
    k_e_range1_expected_period2_count?: number;
    /** 区间11分期2首逾数 */
    k_f_range1_overdue_period2_count?: number;
    /** 区间11分期2结清数 */
    k_g_range1_settled_period2_count?: number;
    /** 区间11分期3放应还数 */
    k_h_range1_expected_period3_count?: number;
    /** 区间11分期3首逾数 */
    k_i_range1_overdue_period3_count?: number;
    /** 区间11分期3结清数 */
    k_j_range1_settled_period3_count?: number;
    /** 区间11分期4放应还数 */
    k_k_range1_expected_period4_count?: number;
    /** 区间11分期4首逾数 */
    k_l_range1_overdue_period4_count?: number;
    /** 区间11分期4结清数 */
    k_m_range1_settled_period4_count?: number;
    /** 区间11分期5放应还数 */
    k_n_range1_expected_period5_count?: number;
    /** 区间11分期5首逾数 */
    k_o_range1_overdue_period5_count?: number;
    /** 区间11分期5结清数 */
    k_p_range1_settled_period5_count?: number;
    /** 区间11分期6放应还数 */
    k_q_range1_expected_period6_count?: number;
    /** 区间11分期6首逾数 */
    k_r_range1_overdue_period6_count?: number;
    /** 区间11分期6结清数 */
    k_s_range1_settled_period6_count?: number;
    /** 区间12数 */
    l_a_range1_count?: number;
    /** 区间12分期1放应还数 */
    l_b_range1_expected_period1_count?: number;
    /** 区间12分期1首逾数 */
    l_c_range1_overdue_period1_count?: number;
    /** 区间12分期1结清数 */
    l_d_range1_settled_period1_count?: number;
    /** 区间12分期2放应还数 */
    l_e_range1_expected_period2_count?: number;
    /** 区间12分期2首逾数 */
    l_f_range1_overdue_period2_count?: number;
    /** 区间12分期2结清数 */
    l_g_range1_settled_period2_count?: number;
    /** 区间12分期3放应还数 */
    l_h_range1_expected_period3_count?: number;
    /** 区间12分期3首逾数 */
    l_i_range1_overdue_period3_count?: number;
    /** 区间12分期3结清数 */
    l_j_range1_settled_period3_count?: number;
    /** 区间12分期4放应还数 */
    l_k_range1_expected_period4_count?: number;
    /** 区间12分期4首逾数 */
    l_l_range1_overdue_period4_count?: number;
    /** 区间12分期4结清数 */
    l_m_range1_settled_period4_count?: number;
    /** 区间12分期5放应还数 */
    l_n_range1_expected_period5_count?: number;
    /** 区间12分期5首逾数 */
    l_o_range1_overdue_period5_count?: number;
    /** 区间12分期5结清数 */
    l_p_range1_settled_period5_count?: number;
    /** 区间12分期6放应还数 */
    l_q_range1_expected_period6_count?: number;
    /** 区间12分期6首逾数 */
    l_r_range1_overdue_period6_count?: number;
    /** 区间12分期6结清数 */
    l_s_range1_settled_period6_count?: number;
    /** 区间13数 */
    m_a_range1_count?: number;
    /** 区间13分期1放应还数 */
    m_b_range1_expected_period1_count?: number;
    /** 区间13分期1首逾数 */
    m_c_range1_overdue_period1_count?: number;
    /** 区间13分期1结清数 */
    m_d_range1_settled_period1_count?: number;
    /** 区间13分期2放应还数 */
    m_e_range1_expected_period2_count?: number;
    /** 区间13分期2首逾数 */
    m_f_range1_overdue_period2_count?: number;
    /** 区间13分期2结清数 */
    m_g_range1_settled_period2_count?: number;
    /** 区间13分期3放应还数 */
    m_h_range1_expected_period3_count?: number;
    /** 区间13分期3首逾数 */
    m_i_range1_overdue_period3_count?: number;
    /** 区间13分期3结清数 */
    m_j_range1_settled_period3_count?: number;
    /** 区间13分期4放应还数 */
    m_k_range1_expected_period4_count?: number;
    /** 区间13分期4首逾数 */
    m_l_range1_overdue_period4_count?: number;
    /** 区间13分期4结清数 */
    m_m_range1_settled_period4_count?: number;
    /** 区间13分期5放应还数 */
    m_n_range1_expected_period5_count?: number;
    /** 区间13分期5首逾数 */
    m_o_range1_overdue_period5_count?: number;
    /** 区间13分期5结清数 */
    m_p_range1_settled_period5_count?: number;
    /** 区间13分期6放应还数 */
    m_q_range1_expected_period6_count?: number;
    /** 区间13分期6首逾数 */
    m_r_range1_overdue_period6_count?: number;
    /** 区间13分期6结清数 */
    m_s_range1_settled_period6_count?: number;
    /** 区间14数 */
    n_a_range1_count?: number;
    /** 区间14分期1放应还数 */
    n_b_range1_expected_period1_count?: number;
    /** 区间14分期1首逾数 */
    n_c_range1_overdue_period1_count?: number;
    /** 区间14分期1结清数 */
    n_d_range1_settled_period1_count?: number;
    /** 区间14分期2放应还数 */
    n_e_range1_expected_period2_count?: number;
    /** 区间14分期2首逾数 */
    n_f_range1_overdue_period2_count?: number;
    /** 区间14分期2结清数 */
    n_g_range1_settled_period2_count?: number;
    /** 区间14分期3放应还数 */
    n_h_range1_expected_period3_count?: number;
    /** 区间14分期3首逾数 */
    n_i_range1_overdue_period3_count?: number;
    /** 区间14分期3结清数 */
    n_j_range1_settled_period3_count?: number;
    /** 区间14分期4放应还数 */
    n_k_range1_expected_period4_count?: number;
    /** 区间14分期4首逾数 */
    n_l_range1_overdue_period4_count?: number;
    /** 区间14分期4结清数 */
    n_m_range1_settled_period4_count?: number;
    /** 区间14分期5放应还数 */
    n_n_range1_expected_period5_count?: number;
    /** 区间14分期5首逾数 */
    n_o_range1_overdue_period5_count?: number;
    /** 区间14分期5结清数 */
    n_p_range1_settled_period5_count?: number;
    /** 区间14分期6放应还数 */
    n_q_range1_expected_period6_count?: number;
    /** 区间14分期6首逾数 */
    n_r_range1_overdue_period6_count?: number;
    /** 区间14分期6结清数 */
    n_s_range1_settled_period6_count?: number;
    /** 区间15数 */
    o_a_range1_count?: number;
    /** 区间15分期1放应还数 */
    o_b_range1_expected_period1_count?: number;
    /** 区间15分期1首逾数 */
    o_c_range1_overdue_period1_count?: number;
    /** 区间15分期1结清数 */
    o_d_range1_settled_period1_count?: number;
    /** 区间15分期2放应还数 */
    o_e_range1_expected_period2_count?: number;
    /** 区间15分期2首逾数 */
    o_f_range1_overdue_period2_count?: number;
    /** 区间15分期2结清数 */
    o_g_range1_settled_period2_count?: number;
    /** 区间15分期3放应还数 */
    o_h_range1_expected_period3_count?: number;
    /** 区间15分期3首逾数 */
    o_i_range1_overdue_period3_count?: number;
    /** 区间15分期3结清数 */
    o_j_range1_settled_period3_count?: number;
    /** 区间15分期4放应还数 */
    o_k_range1_expected_period4_count?: number;
    /** 区间15分期4首逾数 */
    o_l_range1_overdue_period4_count?: number;
    /** 区间15分期4结清数 */
    o_m_range1_settled_period4_count?: number;
    /** 区间15分期5放应还数 */
    o_n_range1_expected_period5_count?: number;
    /** 区间15分期5首逾数 */
    o_o_range1_overdue_period5_count?: number;
    /** 区间15分期5结清数 */
    o_p_range1_settled_period5_count?: number;
    /** 区间15分期6放应还数 */
    o_q_range1_expected_period6_count?: number;
    /** 区间15分期6首逾数 */
    o_r_range1_overdue_period6_count?: number;
    /** 区间15分期6结清数 */
    o_s_range1_settled_period6_count?: number;
    /** 区间16数 */
    p_a_range1_count?: number;
    /** 区间16分期1放应还数 */
    p_b_range1_expected_period1_count?: number;
    /** 区间16分期1首逾数 */
    p_c_range1_overdue_period1_count?: number;
    /** 区间16分期1结清数 */
    p_d_range1_settled_period1_count?: number;
    /** 区间16分期2放应还数 */
    p_e_range1_expected_period2_count?: number;
    /** 区间16分期2首逾数 */
    p_f_range1_overdue_period2_count?: number;
    /** 区间16分期2结清数 */
    p_g_range1_settled_period2_count?: number;
    /** 区间16分期3放应还数 */
    p_h_range1_expected_period3_count?: number;
    /** 区间16分期3首逾数 */
    p_i_range1_overdue_period3_count?: number;
    /** 区间16分期3结清数 */
    p_j_range1_settled_period3_count?: number;
    /** 区间16分期4放应还数 */
    p_k_range1_expected_period4_count?: number;
    /** 区间16分期4首逾数 */
    p_l_range1_overdue_period4_count?: number;
    /** 区间16分期4结清数 */
    p_m_range1_settled_period4_count?: number;
    /** 区间16分期5放应还数 */
    p_n_range1_expected_period5_count?: number;
    /** 区间16分期5首逾数 */
    p_o_range1_overdue_period5_count?: number;
    /** 区间16分期5结清数 */
    p_p_range1_settled_period5_count?: number;
    /** 区间16分期6放应还数 */
    p_q_range1_expected_period6_count?: number;
    /** 区间16分期6首逾数 */
    p_r_range1_overdue_period6_count?: number;
    /** 区间16分期6结清数 */
    p_s_range1_settled_period6_count?: number;
    /** 区间17数 */
    q_a_range1_count?: number;
    /** 区间17分期1放应还数 */
    q_b_range1_expected_period1_count?: number;
    /** 区间17分期1首逾数 */
    q_c_range1_overdue_period1_count?: number;
    /** 区间17分期1结清数 */
    q_d_range1_settled_period1_count?: number;
    /** 区间17分期2放应还数 */
    q_e_range1_expected_period2_count?: number;
    /** 区间17分期2首逾数 */
    q_f_range1_overdue_period2_count?: number;
    /** 区间17分期2结清数 */
    q_g_range1_settled_period2_count?: number;
    /** 区间17分期3放应还数 */
    q_h_range1_expected_period3_count?: number;
    /** 区间17分期3首逾数 */
    q_i_range1_overdue_period3_count?: number;
    /** 区间17分期3结清数 */
    q_j_range1_settled_period3_count?: number;
    /** 区间17分期4放应还数 */
    q_k_range1_expected_period4_count?: number;
    /** 区间17分期4首逾数 */
    q_l_range1_overdue_period4_count?: number;
    /** 区间17分期4结清数 */
    q_m_range1_settled_period4_count?: number;
    /** 区间17分期5放应还数 */
    q_n_range1_expected_period5_count?: number;
    /** 区间17分期5首逾数 */
    q_o_range1_overdue_period5_count?: number;
    /** 区间17分期5结清数 */
    q_p_range1_settled_period5_count?: number;
    /** 区间17分期6放应还数 */
    q_q_range1_expected_period6_count?: number;
    /** 区间17分期6首逾数 */
    q_r_range1_overdue_period6_count?: number;
    /** 区间17分期6结清数 */
    q_s_range1_settled_period6_count?: number;
    /** 区间18数 */
    r_a_range1_count?: number;
    /** 区间18分期1放应还数 */
    r_b_range1_expected_period1_count?: number;
    /** 区间18分期1首逾数 */
    r_c_range1_overdue_period1_count?: number;
    /** 区间18分期1结清数 */
    r_d_range1_settled_period1_count?: number;
    /** 区间18分期2放应还数 */
    r_e_range1_expected_period2_count?: number;
    /** 区间18分期2首逾数 */
    r_f_range1_overdue_period2_count?: number;
    /** 区间18分期2结清数 */
    r_g_range1_settled_period2_count?: number;
    /** 区间18分期3放应还数 */
    r_h_range1_expected_period3_count?: number;
    /** 区间18分期3首逾数 */
    r_i_range1_overdue_period3_count?: number;
    /** 区间18分期3结清数 */
    r_j_range1_settled_period3_count?: number;
    /** 区间18分期4放应还数 */
    r_k_range1_expected_period4_count?: number;
    /** 区间18分期4首逾数 */
    r_l_range1_overdue_period4_count?: number;
    /** 区间18分期4结清数 */
    r_m_range1_settled_period4_count?: number;
    /** 区间18分期5放应还数 */
    r_n_range1_expected_period5_count?: number;
    /** 区间18分期5首逾数 */
    r_o_range1_overdue_period5_count?: number;
    /** 区间18分期5结清数 */
    r_p_range1_settled_period5_count?: number;
    /** 区间18分期6放应还数 */
    r_q_range1_expected_period6_count?: number;
    /** 区间18分期6首逾数 */
    r_r_range1_overdue_period6_count?: number;
    /** 区间18分期6结清数 */
    r_s_range1_settled_period6_count?: number;
    /** 区间19数 */
    s_a_range1_count?: number;
    /** 区间19分期1放应还数 */
    s_b_range1_expected_period1_count?: number;
    /** 区间19分期1首逾数 */
    s_c_range1_overdue_period1_count?: number;
    /** 区间19分期1结清数 */
    s_d_range1_settled_period1_count?: number;
    /** 区间19分期2放应还数 */
    s_e_range1_expected_period2_count?: number;
    /** 区间19分期2首逾数 */
    s_f_range1_overdue_period2_count?: number;
    /** 区间19分期2结清数 */
    s_g_range1_settled_period2_count?: number;
    /** 区间19分期3放应还数 */
    s_h_range1_expected_period3_count?: number;
    /** 区间19分期3首逾数 */
    s_i_range1_overdue_period3_count?: number;
    /** 区间19分期3结清数 */
    s_j_range1_settled_period3_count?: number;
    /** 区间19分期4放应还数 */
    s_k_range1_expected_period4_count?: number;
    /** 区间19分期4首逾数 */
    s_l_range1_overdue_period4_count?: number;
    /** 区间19分期4结清数 */
    s_m_range1_settled_period4_count?: number;
    /** 区间19分期5放应还数 */
    s_n_range1_expected_period5_count?: number;
    /** 区间19分期5首逾数 */
    s_o_range1_overdue_period5_count?: number;
    /** 区间19分期5结清数 */
    s_p_range1_settled_period5_count?: number;
    /** 区间19分期6放应还数 */
    s_q_range1_expected_period6_count?: number;
    /** 区间19分期6首逾数 */
    s_r_range1_overdue_period6_count?: number;
    /** 区间19分期6结清数 */
    s_s_range1_settled_period6_count?: number;
    /** 区间20数 */
    t_a_range1_count?: number;
    /** 区间20分期1放应还数 */
    t_b_range1_expected_period1_count?: number;
    /** 区间20分期1首逾数 */
    t_c_range1_overdue_period1_count?: number;
    /** 区间20分期1结清数 */
    t_d_range1_settled_period1_count?: number;
    /** 区间20分期2放应还数 */
    t_e_range1_expected_period2_count?: number;
    /** 区间20分期2首逾数 */
    t_f_range1_overdue_period2_count?: number;
    /** 区间20分期2结清数 */
    t_g_range1_settled_period2_count?: number;
    /** 区间20分期3放应还数 */
    t_h_range1_expected_period3_count?: number;
    /** 区间20分期3首逾数 */
    t_i_range1_overdue_period3_count?: number;
    /** 区间20分期3结清数 */
    t_j_range1_settled_period3_count?: number;
    /** 区间20分期4放应还数 */
    t_k_range1_expected_period4_count?: number;
    /** 区间20分期4首逾数 */
    t_l_range1_overdue_period4_count?: number;
    /** 区间20分期4结清数 */
    t_m_range1_settled_period4_count?: number;
    /** 区间20分期5放应还数 */
    t_n_range1_expected_period5_count?: number;
    /** 区间20分期5首逾数 */
    t_o_range1_overdue_period5_count?: number;
    /** 区间20分期5结清数 */
    t_p_range1_settled_period5_count?: number;
    /** 区间20分期6放应还数 */
    t_q_range1_expected_period6_count?: number;
    /** 区间20分期6首逾数 */
    t_r_range1_overdue_period6_count?: number;
    /** 区间20分期6结清数 */
    t_s_range1_settled_period6_count?: number;
    /** 区间21数 */
    u_a_range1_count?: number;
    /** 区间21分期1放应还数 */
    u_b_range1_expected_period1_count?: number;
    /** 区间21分期1首逾数 */
    u_c_range1_overdue_period1_count?: number;
    /** 区间21分期1结清数 */
    u_d_range1_settled_period1_count?: number;
    /** 区间21分期2放应还数 */
    u_e_range1_expected_period2_count?: number;
    /** 区间21分期2首逾数 */
    u_f_range1_overdue_period2_count?: number;
    /** 区间21分期2结清数 */
    u_g_range1_settled_period2_count?: number;
    /** 区间21分期3放应还数 */
    u_h_range1_expected_period3_count?: number;
    /** 区间21分期3首逾数 */
    u_i_range1_overdue_period3_count?: number;
    /** 区间21分期3结清数 */
    u_j_range1_settled_period3_count?: number;
    /** 区间21分期4放应还数 */
    u_k_range1_expected_period4_count?: number;
    /** 区间21分期4首逾数 */
    u_l_range1_overdue_period4_count?: number;
    /** 区间21分期4结清数 */
    u_m_range1_settled_period4_count?: number;
    /** 区间21分期5放应还数 */
    u_n_range1_expected_period5_count?: number;
    /** 区间21分期5首逾数 */
    u_o_range1_overdue_period5_count?: number;
    /** 区间21分期5结清数 */
    u_p_range1_settled_period5_count?: number;
    /** 区间21分期6放应还数 */
    u_q_range1_expected_period6_count?: number;
    /** 区间21分期6首逾数 */
    u_r_range1_overdue_period6_count?: number;
    /** 区间21分期6结清数 */
    u_s_range1_settled_period6_count?: number;
    /** 区间22数 */
    v_a_range1_count?: number;
    /** 区间22分期1放应还数 */
    v_b_range1_expected_period1_count?: number;
    /** 区间22分期1首逾数 */
    v_c_range1_overdue_period1_count?: number;
    /** 区间22分期1结清数 */
    v_d_range1_settled_period1_count?: number;
    /** 区间22分期2放应还数 */
    v_e_range1_expected_period2_count?: number;
    /** 区间22分期2首逾数 */
    v_f_range1_overdue_period2_count?: number;
    /** 区间22分期2结清数 */
    v_g_range1_settled_period2_count?: number;
    /** 区间22分期3放应还数 */
    v_h_range1_expected_period3_count?: number;
    /** 区间22分期3首逾数 */
    v_i_range1_overdue_period3_count?: number;
    /** 区间22分期3结清数 */
    v_j_range1_settled_period3_count?: number;
    /** 区间22分期4放应还数 */
    v_k_range1_expected_period4_count?: number;
    /** 区间22分期4首逾数 */
    v_l_range1_overdue_period4_count?: number;
    /** 区间22分期4结清数 */
    v_m_range1_settled_period4_count?: number;
    /** 区间22分期5放应还数 */
    v_n_range1_expected_period5_count?: number;
    /** 区间22分期5首逾数 */
    v_o_range1_overdue_period5_count?: number;
    /** 区间22分期5结清数 */
    v_p_range1_settled_period5_count?: number;
    /** 区间22分期6放应还数 */
    v_q_range1_expected_period6_count?: number;
    /** 区间22分期6首逾数 */
    v_r_range1_overdue_period6_count?: number;
    /** 区间22分期6结清数 */
    v_s_range1_settled_period6_count?: number;
    /** 区间23数 */
    w_a_range1_count?: number;
    /** 区间23分期1放应还数 */
    w_b_range1_expected_period1_count?: number;
    /** 区间23分期1首逾数 */
    w_c_range1_overdue_period1_count?: number;
    /** 区间23分期1结清数 */
    w_d_range1_settled_period1_count?: number;
    /** 区间23分期2放应还数 */
    w_e_range1_expected_period2_count?: number;
    /** 区间23分期2首逾数 */
    w_f_range1_overdue_period2_count?: number;
    /** 区间23分期2结清数 */
    w_g_range1_settled_period2_count?: number;
    /** 区间23分期3放应还数 */
    w_h_range1_expected_period3_count?: number;
    /** 区间23分期3首逾数 */
    w_i_range1_overdue_period3_count?: number;
    /** 区间23分期3结清数 */
    w_j_range1_settled_period3_count?: number;
    /** 区间23分期4放应还数 */
    w_k_range1_expected_period4_count?: number;
    /** 区间23分期4首逾数 */
    w_l_range1_overdue_period4_count?: number;
    /** 区间23分期4结清数 */
    w_m_range1_settled_period4_count?: number;
    /** 区间23分期5放应还数 */
    w_n_range1_expected_period5_count?: number;
    /** 区间23分期5首逾数 */
    w_o_range1_overdue_period5_count?: number;
    /** 区间23分期5结清数 */
    w_p_range1_settled_period5_count?: number;
    /** 区间23分期6放应还数 */
    w_q_range1_expected_period6_count?: number;
    /** 区间23分期6首逾数 */
    w_r_range1_overdue_period6_count?: number;
    /** 区间23分期6结清数 */
    w_s_range1_settled_period6_count?: number;
    /** 区间24数 */
    x_a_range1_count?: number;
    /** 区间24分期1放应还数 */
    x_b_range1_expected_period1_count?: number;
    /** 区间24分期1首逾数 */
    x_c_range1_overdue_period1_count?: number;
    /** 区间24分期1结清数 */
    x_d_range1_settled_period1_count?: number;
    /** 区间24分期2放应还数 */
    x_e_range1_expected_period2_count?: number;
    /** 区间24分期2首逾数 */
    x_f_range1_overdue_period2_count?: number;
    /** 区间24分期2结清数 */
    x_g_range1_settled_period2_count?: number;
    /** 区间24分期3放应还数 */
    x_h_range1_expected_period3_count?: number;
    /** 区间24分期3首逾数 */
    x_i_range1_overdue_period3_count?: number;
    /** 区间24分期3结清数 */
    x_j_range1_settled_period3_count?: number;
    /** 区间24分期4放应还数 */
    x_k_range1_expected_period4_count?: number;
    /** 区间24分期4首逾数 */
    x_l_range1_overdue_period4_count?: number;
    /** 区间24分期4结清数 */
    x_m_range1_settled_period4_count?: number;
    /** 区间24分期5放应还数 */
    x_n_range1_expected_period5_count?: number;
    /** 区间24分期5首逾数 */
    x_o_range1_overdue_period5_count?: number;
    /** 区间24分期5结清数 */
    x_p_range1_settled_period5_count?: number;
    /** 区间24分期6放应还数 */
    x_q_range1_expected_period6_count?: number;
    /** 区间24分期6首逾数 */
    x_r_range1_overdue_period6_count?: number;
    /** 区间24分期6结清数 */
    x_s_range1_settled_period6_count?: number;
    /** 区间25数 */
    y_a_range1_count?: number;
    /** 区间25分期1放应还数 */
    y_b_range1_expected_period1_count?: number;
    /** 区间25分期1首逾数 */
    y_c_range1_overdue_period1_count?: number;
    /** 区间25分期1结清数 */
    y_d_range1_settled_period1_count?: number;
    /** 区间25分期2放应还数 */
    y_e_range1_expected_period2_count?: number;
    /** 区间25分期2首逾数 */
    y_f_range1_overdue_period2_count?: number;
    /** 区间25分期2结清数 */
    y_g_range1_settled_period2_count?: number;
    /** 区间25分期3放应还数 */
    y_h_range1_expected_period3_count?: number;
    /** 区间25分期3首逾数 */
    y_i_range1_overdue_period3_count?: number;
    /** 区间25分期3结清数 */
    y_j_range1_settled_period3_count?: number;
    /** 区间25分期4放应还数 */
    y_k_range1_expected_period4_count?: number;
    /** 区间25分期4首逾数 */
    y_l_range1_overdue_period4_count?: number;
    /** 区间25分期4结清数 */
    y_m_range1_settled_period4_count?: number;
    /** 区间25分期5放应还数 */
    y_n_range1_expected_period5_count?: number;
    /** 区间25分期5首逾数 */
    y_o_range1_overdue_period5_count?: number;
    /** 区间25分期5结清数 */
    y_p_range1_settled_period5_count?: number;
    /** 区间25分期6放应还数 */
    y_q_range1_expected_period6_count?: number;
    /** 区间25分期6首逾数 */
    y_r_range1_overdue_period6_count?: number;
    /** 区间25分期6结清数 */
    y_s_range1_settled_period6_count?: number;
    /** 区间26数 */
    z_a_range1_count?: number;
    /** 区间26分期1放应还数 */
    z_b_range1_expected_period1_count?: number;
    /** 区间26分期1首逾数 */
    z_c_range1_overdue_period1_count?: number;
    /** 区间26分期1结清数 */
    z_d_range1_settled_period1_count?: number;
    /** 区间26分期2放应还数 */
    z_e_range1_expected_period2_count?: number;
    /** 区间26分期2首逾数 */
    z_f_range1_overdue_period2_count?: number;
    /** 区间26分期2结清数 */
    z_g_range1_settled_period2_count?: number;
    /** 区间26分期3放应还数 */
    z_h_range1_expected_period3_count?: number;
    /** 区间26分期3首逾数 */
    z_i_range1_overdue_period3_count?: number;
    /** 区间26分期3结清数 */
    z_j_range1_settled_period3_count?: number;
    /** 区间26分期4放应还数 */
    z_k_range1_expected_period4_count?: number;
    /** 区间26分期4首逾数 */
    z_l_range1_overdue_period4_count?: number;
    /** 区间26分期4结清数 */
    z_m_range1_settled_period4_count?: number;
    /** 区间26分期5放应还数 */
    z_n_range1_expected_period5_count?: number;
    /** 区间26分期5首逾数 */
    z_o_range1_overdue_period5_count?: number;
    /** 区间26分期5结清数 */
    z_p_range1_settled_period5_count?: number;
    /** 区间26分期6放应还数 */
    z_q_range1_expected_period6_count?: number;
    /** 区间26分期6首逾数 */
    z_r_range1_overdue_period6_count?: number;
    /** 区间26分期6结清数 */
    z_s_range1_settled_period6_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WIRiskBundle = {
    /** id */
    id?: number;
    /** 风控日期 */
    a_risk_date?: string;
    /** 规则 */
    b_risk_role_bundle_id?: number;
    /** 父规则 */
    c_risk_role_bundle_parent_id?: number;
    /** 策略 */
    d_risk_strategy_id?: number;
    /** 版本 */
    e_version?: number;
    /** 总数 */
    f_count?: number;
    /** 通过数 */
    g_accept_count?: number;
    /** 拒绝数 */
    h_reject_count?: number;
    /** 人审数 */
    i_review_count?: number;
    /** 通过率 */
    j_accept_rate?: number;
    /** 拒绝率 */
    k_reject_rate?: number;
    /** 人审率 */
    l_review_rate?: number;
    /** P1应还款数 */
    m_period1_expected_repay_count?: number;
    /** P1逾期数 */
    n_period1_overdue_count?: number;
    /** P1已结清数 */
    o_period1_settled_count?: number;
    /** P2应还款数 */
    p_period2_expected_repay_count?: number;
    /** P2逾期数 */
    q_period2_overdue_count?: number;
    /** P2已结清数 */
    r_period2_settled_count?: number;
    /** P3应还款数 */
    s_period3_expected_repay_count?: number;
    /** P3逾期数 */
    t_period3_overdue_count?: number;
    /** P3已结清数 */
    u_period3_settled_count?: number;
    /** P4应还款数 */
    v_period4_expected_repay_count?: number;
    /** P4逾期数 */
    w_period4_overdue_count?: number;
    /** P4已结清数 */
    x_period4_settled_count?: number;
    /** P5应还款数 */
    y_period5_expected_repay_count?: number;
    /** P5逾期数 */
    z_period5_overdue_count?: number;
    /** P5已结清数 */
    a_a_period5_settled_count?: number;
    /** P6应还款数 */
    a_b_period6_expected_repay_count?: number;
    /** P6逾期数 */
    a_c_period6_overdue_count?: number;
    /** P6已结清数 */
    a_d_period6_settled_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WJRiskStrategy = {
    /** id */
    id?: number;
    /** 风控日期 */
    a_risk_date?: string;
    /** 规则 */
    b_risk_strategy_id?: number;
    /** 父规则 */
    c_risk_strategy_parent_id?: number;
    /** 策略 */
    d_risk_strategy_route_id?: number;
    /** 版本 */
    e_version?: number;
    /** 总数 */
    f_count?: number;
    /** 通过数 */
    g_accept_count?: number;
    /** 拒绝数 */
    h_reject_count?: number;
    /** 人审数 */
    i_review_count?: number;
    /** 通过率 */
    j_accept_rate?: number;
    /** 拒绝率 */
    k_reject_rate?: number;
    /** 人审率 */
    l_review_rate?: number;
    /** P1应还款数 */
    m_period1_expected_repay_count?: number;
    /** P1逾期数 */
    n_period1_overdue_count?: number;
    /** P1已结清数 */
    o_period1_settled_count?: number;
    /** P2应还款数 */
    p_period2_expected_repay_count?: number;
    /** P2逾期数 */
    q_period2_overdue_count?: number;
    /** P2已结清数 */
    r_period2_settled_count?: number;
    /** P3应还款数 */
    s_period3_expected_repay_count?: number;
    /** P3逾期数 */
    t_period3_overdue_count?: number;
    /** P3已结清数 */
    u_period3_settled_count?: number;
    /** P4应还款数 */
    v_period4_expected_repay_count?: number;
    /** P4逾期数 */
    w_period4_overdue_count?: number;
    /** P4已结清数 */
    x_period4_settled_count?: number;
    /** P5应还款数 */
    y_period5_expected_repay_count?: number;
    /** P5逾期数 */
    z_period5_overdue_count?: number;
    /** P5已结清数 */
    a_a_period5_settled_count?: number;
    /** P6应还款数 */
    a_b_period6_expected_repay_count?: number;
    /** P6逾期数 */
    a_c_period6_overdue_count?: number;
    /** P6已结清数 */
    a_d_period6_settled_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WKRiskTag = {
    /** id */
    id?: number;
    /** 风控日期 */
    a_risk_date?: string;
    /** foo */
    b_foo?: string;
    /** 标签 */
    c_risk_tag_id?: number;
    /** 标签组 */
    d_risk_tag_group?: string;
    /** 策略 */
    e_risk_strategy_parent_id?: number;
    /** 总数 */
    f_count?: number;
    /** 通过数 */
    g_accept_count?: number;
    /** 拒绝数 */
    h_reject_count?: number;
    /** 人审数 */
    i_review_count?: number;
    /** 通过率 */
    j_accept_rate?: number;
    /** 拒绝率 */
    k_reject_rate?: number;
    /** 人审率 */
    l_review_rate?: number;
    /** P1应还款数 */
    m_period1_expected_repay_count?: number;
    /** P1逾期数 */
    n_period1_overdue_count?: number;
    /** P1已结清数 */
    o_period1_settled_count?: number;
    /** P2应还款数 */
    p_period2_expected_repay_count?: number;
    /** P2逾期数 */
    q_period2_overdue_count?: number;
    /** P2已结清数 */
    r_period2_settled_count?: number;
    /** P3应还款数 */
    s_period3_expected_repay_count?: number;
    /** P3逾期数 */
    t_period3_overdue_count?: number;
    /** P3已结清数 */
    u_period3_settled_count?: number;
    /** P4应还款数 */
    v_period4_expected_repay_count?: number;
    /** P4逾期数 */
    w_period4_overdue_count?: number;
    /** P4已结清数 */
    x_period4_settled_count?: number;
    /** P5应还款数 */
    y_period5_expected_repay_count?: number;
    /** P5逾期数 */
    z_period5_overdue_count?: number;
    /** P5已结清数 */
    a_a_period5_settled_count?: number;
    /** P6应还款数 */
    a_b_period6_expected_repay_count?: number;
    /** P6逾期数 */
    a_c_period6_overdue_count?: number;
    /** P6已结清数 */
    a_d_period6_settled_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WLCollectionAdmin = {
    /** id */
    id?: number;
    /** 日期 */
    a_date?: string;
    /** 催员 */
    b_collection_admin_id?: number;
    /** 新入催数 */
    d_collection_new_count?: number;
    /** 管理员分配数 */
    f_collection_admin_in_count?: number;
    /** 管理员释放数 */
    g_collection_admin_out_count?: number;
    /** 机构 */
    h_collection_agency_id?: number;
    /** 小组 */
    i_collection_group_id?: number;
    /** foo */
    j_foo?: number;
    /** foo */
    k_foo?: number;
    /** 持有案件总数 */
    l_a_collection_total_count?: number;
    /** 持有案件总额 */
    l_b_collection_total_amount?: number;
    /** 未催数 */
    l_c_no_track_count?: number;
    /** 日志数 */
    l_d_log_new_count?: number;
    /** 短信数 */
    l_e_sms_new_count?: number;
    /** 呼叫数 */
    l_f_call_new_count?: number;
    /** 结清数 */
    l_g_settled_count?: number;
    /** 结清金额 */
    l_h_settled_amount?: number;
    /** 部分还款数 */
    l_i_part_count?: number;
    /** 部分还款金额 */
    l_j_part_amount?: number;
    /** 展期数 */
    l_k_extend_count?: number;
    /** 展期金额 */
    l_l_extend_amount?: number;
    /** level1佣金 */
    l_m_level1_commission?: number;
    /** level2佣金 */
    l_n_level2_commission?: number;
    /** level3佣金 */
    l_o_level3_commission?: number;
    /** 首日催回数 */
    l_r_day1_paid_count?: number;
    /** 首日催回金额 */
    l_s_day1_paid_amount?: number;
    /** 首日催回数 */
    l_t_day1_action_count?: number;
    /** 2-3催回数 */
    l_u_day2_3_paid_count?: number;
    /** 2-3催回金额 */
    l_v_day2_3_paid_amount?: number;
    /** 2-3催回数 */
    l_w_day2_3_action_count?: number;
    /** 4+催回数 */
    l_x_day4_paid_count?: number;
    /** 4+催回金额 */
    l_y_day4_paid_amount?: number;
    /** 4+操作数 */
    l_z_day4_action_count?: number;
    /** P1持有案件总数 */
    m_a_collection_total_count?: number;
    /** P1持有案件总额 */
    m_b_collection_total_amount?: number;
    /** P1未催数 */
    m_c_no_track_count?: number;
    /** P1日志数 */
    m_d_log_new_count?: number;
    /** P1短信数 */
    m_e_sms_new_count?: number;
    /** P1呼叫数 */
    m_f_call_new_count?: number;
    /** P1结清数 */
    m_g_settled_count?: number;
    /** P1结清金额 */
    m_h_settled_amount?: number;
    /** P1部分还款数 */
    m_i_part_count?: number;
    /** P1部分还款金额 */
    m_j_part_amount?: number;
    /** P1展期数 */
    m_k_extend_count?: number;
    /** P1展期金额 */
    m_l_extend_amount?: number;
    /** P1 level1佣金 */
    m_m_level1_commission?: number;
    /** P1 level2佣金 */
    m_n_level2_commission?: number;
    /** P1 level3佣金 */
    m_o_level3_commission?: number;
    /** P1首日催回数 */
    m_r_day1_paid_count?: number;
    /** P1首日催回金额 */
    m_s_day1_paid_amount?: number;
    /** P1首日催回数 */
    m_t_day1_action_count?: number;
    /** P1 2-3催回数 */
    m_u_day2_3_paid_count?: number;
    /** P1 2-3催回金额 */
    m_v_day2_3_paid_amount?: number;
    /** P1 2-3催回数 */
    m_w_day2_3_action_count?: number;
    /** P1 4+催回数 */
    m_x_day4_paid_count?: number;
    /** P1 4+催回金额 */
    m_y_day4_paid_amount?: number;
    /** P1 4+操作数 */
    m_z_day4_action_count?: number;
    /** P2持有案件总数 */
    n_a_collection_total_count?: number;
    /** P2持有案件总额 */
    n_b_collection_total_amount?: number;
    /** P2未催数 */
    n_c_no_track_count?: number;
    /** P2日志数 */
    n_d_log_new_count?: number;
    /** P2短信数 */
    n_e_sms_new_count?: number;
    /** P2呼叫数 */
    n_f_call_new_count?: number;
    /** P2结清数 */
    n_g_settled_count?: number;
    /** P2结清金额 */
    n_h_settled_amount?: number;
    /** P2部分还款数 */
    n_i_part_count?: number;
    /** P2部分还款金额 */
    n_j_part_amount?: number;
    /** P2展期数 */
    n_k_extend_count?: number;
    /** P2展期金额 */
    n_l_extend_amount?: number;
    /** P2 level1佣金 */
    n_m_level1_commission?: number;
    /** P2 level2佣金 */
    n_n_level2_commission?: number;
    /** P2 level3佣金 */
    n_o_level3_commission?: number;
    /** P2首日催回数 */
    n_r_day1_paid_count?: number;
    /** P2首日催回金额 */
    n_s_day1_paid_amount?: number;
    /** P2首日催回数 */
    n_t_day1_action_count?: number;
    /** P2 2-3催回数 */
    n_u_day2_3_paid_count?: number;
    /** P2 2-3催回金额 */
    n_v_day2_3_paid_amount?: number;
    /** P2 2-3催回数 */
    n_w_day2_3_action_count?: number;
    /** P2 4+催回数 */
    n_x_day4_paid_count?: number;
    /** P2 4+催回金额 */
    n_y_day4_paid_amount?: number;
    /** P2 4+操作数 */
    n_z_day4_action_count?: number;
    /** P3持有案件总数 */
    o_a_collection_total_count?: number;
    /** P3持有案件总额 */
    o_b_collection_total_amount?: number;
    /** P3未催数 */
    o_c_no_track_count?: number;
    /** P3日志数 */
    o_d_log_new_count?: number;
    /** P3短信数 */
    o_e_sms_new_count?: number;
    /** P3呼叫数 */
    o_f_call_new_count?: number;
    /** P3结清数 */
    o_g_settled_count?: number;
    /** P3结清金额 */
    o_h_settled_amount?: number;
    /** P3部分还款数 */
    o_i_part_count?: number;
    /** P3部分还款金额 */
    o_j_part_amount?: number;
    /** P3展期数 */
    o_k_extend_count?: number;
    /** P3展期金额 */
    o_l_extend_amount?: number;
    /** P3 level1佣金 */
    o_m_level1_commission?: number;
    /** P3 level2佣金 */
    o_n_level2_commission?: number;
    /** P3 level3佣金 */
    o_o_level3_commission?: number;
    /** P3首日催回数 */
    o_r_day1_paid_count?: number;
    /** P3首日催回金额 */
    o_s_day1_paid_amount?: number;
    /** P3首日催回数 */
    o_t_day1_action_count?: number;
    /** P3 2-3催回数 */
    o_u_day2_3_paid_count?: number;
    /** P3 2-3催回金额 */
    o_v_day2_3_paid_amount?: number;
    /** P3 2-3催回数 */
    o_w_day2_3_action_count?: number;
    /** P3 4+催回数 */
    o_x_day4_paid_count?: number;
    /** P3 4+催回金额 */
    o_y_day4_paid_amount?: number;
    /** P3 4+操作数 */
    o_z_day4_action_count?: number;
    /** P4持有案件总数 */
    p_a_collection_total_count?: number;
    /** P4持有案件总额 */
    p_b_collection_total_amount?: number;
    /** P4未催数 */
    p_c_no_track_count?: number;
    /** P4日志数 */
    p_d_log_new_count?: number;
    /** P4短信数 */
    p_e_sms_new_count?: number;
    /** P4呼叫数 */
    p_f_call_new_count?: number;
    /** P4结清数 */
    p_g_settled_count?: number;
    /** P4结清金额 */
    p_h_settled_amount?: number;
    /** P4部分还款数 */
    p_i_part_count?: number;
    /** P4部分还款金额 */
    p_j_part_amount?: number;
    /** P4展期数 */
    p_k_extend_count?: number;
    /** P4展期金额 */
    p_l_extend_amount?: number;
    /** P4 level1佣金 */
    p_m_level1_commission?: number;
    /** P4 level2佣金 */
    p_n_level2_commission?: number;
    /** P4 level3佣金 */
    p_o_level3_commission?: number;
    /** P4首日催回数 */
    p_r_day1_paid_count?: number;
    /** P4首日催回金额 */
    p_s_day1_paid_amount?: number;
    /** P4首日催回数 */
    p_t_day1_action_count?: number;
    /** P4 2-3催回数 */
    p_u_day2_3_paid_count?: number;
    /** P4 2-3催回金额 */
    p_v_day2_3_paid_amount?: number;
    /** P4 2-3催回数 */
    p_w_day2_3_action_count?: number;
    /** P4 4+催回数 */
    p_x_day4_paid_count?: number;
    /** P4 4+催回金额 */
    p_y_day4_paid_amount?: number;
    /** P4 4+操作数 */
    p_z_day4_action_count?: number;
    /** P5持有案件总数 */
    q_a_collection_total_count?: number;
    /** P5持有案件总额 */
    q_b_collection_total_amount?: number;
    /** P5未催数 */
    q_c_no_track_count?: number;
    /** P5日志数 */
    q_d_log_new_count?: number;
    /** P5短信数 */
    q_e_sms_new_count?: number;
    /** P5呼叫数 */
    q_f_call_new_count?: number;
    /** P5结清数 */
    q_g_settled_count?: number;
    /** P5结清金额 */
    q_h_settled_amount?: number;
    /** P5部分还款数 */
    q_i_part_count?: number;
    /** P5部分还款金额 */
    q_j_part_amount?: number;
    /** P5展期数 */
    q_k_extend_count?: number;
    /** P5展期金额 */
    q_l_extend_amount?: number;
    /** P5 level1佣金 */
    q_m_level1_commission?: number;
    /** P5 level2佣金 */
    q_n_level2_commission?: number;
    /** P5 level3佣金 */
    q_o_level3_commission?: number;
    /** P5首日催回数 */
    q_r_day1_paid_count?: number;
    /** P5首日催回金额 */
    q_s_day1_paid_amount?: number;
    /** P5首日催回数 */
    q_t_day1_action_count?: number;
    /** P5 2-3催回数 */
    q_u_day2_3_paid_count?: number;
    /** P5 2-3催回金额 */
    q_v_day2_3_paid_amount?: number;
    /** P5 2-3催回数 */
    q_w_day2_3_action_count?: number;
    /** P5 4+催回数 */
    q_x_day4_paid_count?: number;
    /** P5 4+催回金额 */
    q_y_day4_paid_amount?: number;
    /** P5 4+操作数 */
    q_z_day4_action_count?: number;
    /** P6持有案件总数 */
    r_a_collection_total_count?: number;
    /** P6持有案件总额 */
    r_b_collection_total_amount?: number;
    /** P6未催数 */
    r_c_no_track_count?: number;
    /** P6日志数 */
    r_d_log_new_count?: number;
    /** P6短信数 */
    r_e_sms_new_count?: number;
    /** P6呼叫数 */
    r_f_call_new_count?: number;
    /** P6结清数 */
    r_g_settled_count?: number;
    /** P6结清金额 */
    r_h_settled_amount?: number;
    /** P6部分还款数 */
    r_i_part_count?: number;
    /** P6部分还款金额 */
    r_j_part_amount?: number;
    /** P6展期数 */
    r_k_extend_count?: number;
    /** P6展期金额 */
    r_l_extend_amount?: number;
    /** P6 level1佣金 */
    r_m_level1_commission?: number;
    /** P6 level2佣金 */
    r_n_level2_commission?: number;
    /** P6 level3佣金 */
    r_o_level3_commission?: number;
    /** P6首日催回数 */
    r_r_day1_paid_count?: number;
    /** P6首日催回金额 */
    r_s_day1_paid_amount?: number;
    /** P6首日催回数 */
    r_t_day1_action_count?: number;
    /** P6 2-3催回数 */
    r_u_day2_3_paid_count?: number;
    /** P6 2-3催回金额 */
    r_v_day2_3_paid_amount?: number;
    /** P6 2-3催回数 */
    r_w_day2_3_action_count?: number;
    /** P6 4+催回数 */
    r_x_day4_paid_count?: number;
    /** P6 4+催回金额 */
    r_y_day4_paid_amount?: number;
    /** P6 4+操作数 */
    r_z_day4_action_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WMCollectionReport = {
    /** id */
    id?: number;
    /** 首次入催日期 */
    a_date?: string;
    /** 期数 */
    b_period_index?: number;
    /** c_parent_id */
    c_parent_id?: number;
    /** 入催总数 */
    d_count?: number;
    /** 入催总额 */
    e_amount?: number;
    /** 结清数 */
    settled_count?: number;
    /** 结清金额 */
    settled_amount?: number;
    /** 部分还款数 */
    part_count?: number;
    /** 部分还款金额 */
    part_amount?: number;
    /** 展期数 */
    extend_count?: number;
    /** 展期金额 */
    extend_amount?: number;
    /** 催回总额 */
    collection_success_amount?: number;
    /** 催回总数 */
    collection_success_count?: number;
    /** DPD-3结清数 */
    'dpd-3_settled_count'?: number;
    /** DPD-3结清金额 */
    'dpd-3_settled_amount'?: number;
    /** DPD-3部分还款数 */
    'dpd-3_part_count'?: number;
    /** DPD-3部分还款金额 */
    'dpd-3_part_amount'?: number;
    /** DPD-3展期数 */
    'dpd-3_extend_count'?: number;
    /** DPD-3展期金额 */
    'dpd-3_extend_amount'?: number;
    /** DPD-3催回总额 */
    'dpd-3_collection_success_amount'?: number;
    /** DPD-3催回总数 */
    'dpd-3_collection_success_count'?: number;
    /** DPD-2结清数 */
    'dpd-2_settled_count'?: number;
    /** DPD-2结清金额 */
    'dpd-2_settled_amount'?: number;
    /** DPD-2部分还款数 */
    'dpd-2_part_count'?: number;
    /** DPD-2部分还款金额 */
    'dpd-2_part_amount'?: number;
    /** DPD-2展期数 */
    'dpd-2_extend_count'?: number;
    /** DPD-2展期金额 */
    'dpd-2_extend_amount'?: number;
    /** DPD-2催回总额 */
    'dpd-2_collection_success_amount'?: number;
    /** DPD-2催回总数 */
    'dpd-2_collection_success_count'?: number;
    /** DPD-1结清数 */
    'dpd-1_settled_count'?: number;
    /** DPD-1结清金额 */
    'dpd-1_settled_amount'?: number;
    /** DPD-1部分还款数 */
    'dpd-1_part_count'?: number;
    /** DPD-1部分还款金额 */
    'dpd-1_part_amount'?: number;
    /** DPD-1展期数 */
    'dpd-1_extend_count'?: number;
    /** DPD-1展期金额 */
    'dpd-1_extend_amount'?: number;
    /** DPD-1催回总额 */
    'dpd-1_collection_success_amount'?: number;
    /** DPD-1催回总数 */
    'dpd-1_collection_success_count'?: number;
    /** DPD-0结清数 */
    dpd0_settled_count?: number;
    /** DPD-0结清金额 */
    dpd0_settled_amount?: number;
    /** DPD-0部分还款数 */
    dpd0_part_count?: number;
    /** DPD-0部分还款金额 */
    dpd0_part_amount?: number;
    /** DPD-0展期数 */
    dpd0_extend_count?: number;
    /** DPD-0展期金额 */
    dpd0_extend_amount?: number;
    /** DPD-0催回总额 */
    dpd0_collection_success_amount?: number;
    /** DPD-0催回总数 */
    dpd0_collection_success_count?: number;
    /** DPD1结清数 */
    dpd1_settled_count?: number;
    /** DPD1结清金额 */
    dpd1_settled_amount?: number;
    /** DPD1部分还款数 */
    dpd1_part_count?: number;
    /** DPD1部分还款金额 */
    dpd1_part_amount?: number;
    /** DPD1展期数 */
    dpd1_extend_count?: number;
    /** DPD1展期金额 */
    dpd1_extend_amount?: number;
    /** DPD1催回总额 */
    dpd1_collection_success_amount?: number;
    /** DPD1催回总数 */
    dpd1_collection_success_count?: number;
    /** DPD2结清数 */
    dpd2_settled_count?: number;
    /** DPD2结清金额 */
    dpd2_settled_amount?: number;
    /** DPD2部分还款数 */
    dpd2_part_count?: number;
    /** DPD2部分还款金额 */
    dpd2_part_amount?: number;
    /** DPD2展期数 */
    dpd2_extend_count?: number;
    /** DPD2展期金额 */
    dpd2_extend_amount?: number;
    /** DPD2催回总额 */
    dpd2_collection_success_amount?: number;
    /** DPD2催回总数 */
    dpd2_collection_success_count?: number;
    /** DPD3结清数 */
    dpd3_settled_count?: number;
    /** DPD3结清金额 */
    dpd3_settled_amount?: number;
    /** DPD3部分还款数 */
    dpd3_part_count?: number;
    /** DPD3部分还款金额 */
    dpd3_part_amount?: number;
    /** DPD3展期数 */
    dpd3_extend_count?: number;
    /** DPD3展期金额 */
    dpd3_extend_amount?: number;
    /** DPD3催回总额 */
    dpd3_collection_success_amount?: number;
    /** DPD3催回总数 */
    dpd3_collection_success_count?: number;
    /** DPD4结清数 */
    dpd4_settled_count?: number;
    /** DPD4结清金额 */
    dpd4_settled_amount?: number;
    /** DPD4部分还款数 */
    dpd4_part_count?: number;
    /** DPD4部分还款金额 */
    dpd4_part_amount?: number;
    /** DPD4展期数 */
    dpd4_extend_count?: number;
    /** DPD4展期金额 */
    dpd4_extend_amount?: number;
    /** DPD4催回总额 */
    dpd4_collection_success_amount?: number;
    /** DPD4催回总数 */
    dpd4_collection_success_count?: number;
    /** DPD5结清数 */
    dpd5_settled_count?: number;
    /** DPD5结清金额 */
    dpd5_settled_amount?: number;
    /** DPD5部分还款数 */
    dpd5_part_count?: number;
    /** DPD5部分还款金额 */
    dpd5_part_amount?: number;
    /** DPD5展期数 */
    dpd5_extend_count?: number;
    /** DPD5展期金额 */
    dpd5_extend_amount?: number;
    /** DPD5催回总额 */
    dpd5_collection_success_amount?: number;
    /** DPD5催回总数 */
    dpd5_collection_success_count?: number;
    /** DPD6结清数 */
    dpd6_settled_count?: number;
    /** DPD6结清金额 */
    dpd6_settled_amount?: number;
    /** DPD6部分还款数 */
    dpd6_part_count?: number;
    /** DPD6部分还款金额 */
    dpd6_part_amount?: number;
    /** DPD6展期数 */
    dpd6_extend_count?: number;
    /** DPD6展期金额 */
    dpd6_extend_amount?: number;
    /** DPD6催回总额 */
    dpd6_collection_success_amount?: number;
    /** DPD6催回总数 */
    dpd6_collection_success_count?: number;
    /** DPD7结清数 */
    dpd7_settled_count?: number;
    /** DPD7结清金额 */
    dpd7_settled_amount?: number;
    /** DPD7部分还款数 */
    dpd7_part_count?: number;
    /** DPD7部分还款金额 */
    dpd7_part_amount?: number;
    /** DPD7展期数 */
    dpd7_extend_count?: number;
    /** DPD7展期金额 */
    dpd7_extend_amount?: number;
    /** DPD7催回总额 */
    dpd7_collection_success_amount?: number;
    /** DPD7催回总数 */
    dpd7_collection_success_count?: number;
    /** DPD8-15结清数 */
    'dpd8-15_settled_count'?: number;
    /** DPD8-15结清金额 */
    'dpd8-15_settled_amount'?: number;
    /** DPD8-15部分还款数 */
    'dpd8-15_part_count'?: number;
    /** DPD8-15部分还款金额 */
    'dpd8-15_part_amount'?: number;
    /** DPD8-15展期数 */
    'dpd8-15_extend_count'?: number;
    /** DPD8-15展期金额 */
    'dpd8-15_extend_amount'?: number;
    /** DPD8-15催回总额 */
    'dpd8-15_collection_success_amount'?: number;
    /** DPD8-15催回总数 */
    'dpd8-15_collection_success_count'?: number;
    /** DPD16-30结清数 */
    'dpd16-30_settled_count'?: number;
    /** DPD16-30结清金额 */
    'dpd16-30_settled_amount'?: number;
    /** DPD16-30部分还款数 */
    'dpd16-30_part_count'?: number;
    /** DPD16-30部分还款金额 */
    'dpd16-30_part_amount'?: number;
    /** DPD16-30展期数 */
    'dpd16-30_extend_count'?: number;
    /** DPD16-30展期金额 */
    'dpd16-30_extend_amount'?: number;
    /** DPD16-30催回总额 */
    'dpd16-30_collection_success_amount'?: number;
    /** DPD16-30催回总数 */
    'dpd16-30_collection_success_count'?: number;
    /** DPD31+结清数 */
    dpd31_settled_count?: number;
    /** DPD31+结清金额 */
    dpd31_settled_amount?: number;
    /** DPD31+部分还款数 */
    dpd31_part_count?: number;
    /** DPD31+部分还款金额 */
    dpd31_part_amount?: number;
    /** DPD31+展期数 */
    dpd31_extend_count?: number;
    /** DPD31+展期金额 */
    dpd31_extend_amount?: number;
    /** DPD31+催回总额 */
    dpd31_collection_success_amount?: number;
    /** DPD31+催回总数 */
    dpd31_collection_success_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
    /** children */
    children?: WMCollectionReport[];
  };

  type WNCollectionFlow = {
    /** id */
    id?: number;
    /** 日期 */
    a_date?: string;
    /** source */
    source: string;
    /** target */
    target: string;
    /** 数量 */
    value?: number;
    /** 金额 */
    value2?: number;
    /** 类型 1:结构 2:小组 3:催员 */
    type?: number;
    /** code */
    code: string;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WOFee = {
    /** id */
    id?: number;
    /** 日期 */
    a_date?: string;
    /** 类型 1:放款 2:还款 3:短信 4:风控 5:营销 6:其他 */
    b_type?: number;
    /** 币种 */
    c_currency: string;
    /** 服务商 */
    d_name: string;
    /** 成功数量 */
    e_success_count?: number;
    /** 成功金额 */
    f_success_amount?: number;
    /** 失败数量 */
    g_fail_count?: number;
    /** 失败金额 */
    h_fail_amount?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WPBackFill = {
    /** id */
    id?: number;
    /** 日期 */
    a_date?: string;
    /** 服务商 */
    b_name: string;
    /** 发送条数 */
    c_sented_count?: number;
    /** 送达条数 */
    d_delivered_count?: number;
    /** 送达率 */
    e_delivered_rate?: number;
    /** 发送人数 */
    f_sented_person?: number;
    /** 成功人数 */
    g_success_person?: number;
    /** 成功率 */
    h_success_person_rate?: number;
    /** 总花费 */
    i_total_amount?: number;
    /** 单条费用 */
    j_unit_amount?: number;
    /** 单人费用 */
    k_unit_person_amount?: number;
    /** 回填率 */
    l_backfill_rate?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WQSmsReport = {
    /** id */
    id?: number;
    /** 日期 */
    a_date?: string;
    /** 服务商 */
    b_name: string;
    /** 发送条数 */
    c_sented_count?: number;
    /** 送达条数 */
    d_delivered_count?: number;
    /** 送达率 */
    e_delivered_rate?: number;
    /** 总花费 */
    f_total_amount?: number;
    /** 验证码通道 */
    g_otp_count?: number;
    /** 营销通道 */
    h_marketing_count?: number;
    /** 通知通道 */
    i_notify_count?: number;
    /** 验证码通道 */
    j_otp_success_rate?: number;
    /** 营销通道 */
    k_marketing_success_rate?: number;
    /** 通知通道 */
    l_notify_success_rate?: number;
    /** 系统 */
    m_system_notify_count?: number;
    /** 计划任务 */
    n_crontab_notify_count?: number;
    /** 管理员 */
    o_admin_sent_count?: number;
    /** 通讯录 */
    p_contact_count?: number;
    /** 本人 */
    q_user_count?: number;
    /** 逾前短信数 */
    r_bdpd_count?: number;
    /** 还款日短息数 */
    s_dpd0_count?: number;
    /** dpd1-3短信数 */
    t_dpd1_3_count?: number;
    /** dpd4-7短信数 */
    u_dpd4_7_count?: number;
    /** dpd8-15短信数 */
    v_dpd8_15_count?: number;
    /** dpd16+短信数 */
    w_dpd16_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };

  type WRSmsTemplate = {
    /** id */
    id?: number;
    /** 日期 */
    a_date?: string;
    /** b */
    b_template_count?: number;
    /** c */
    c_template_count?: number;
    /** d */
    d_template_count?: number;
    /** e */
    e_template_count?: number;
    /** f */
    f_template_count?: number;
    /** g */
    g_template_count?: number;
    /** h */
    h_template_count?: number;
    /** i */
    i_template_count?: number;
    /** j */
    j_template_count?: number;
    /** k */
    k_template_count?: number;
    /** l */
    l_template_count?: number;
    /** m */
    m_template_count?: number;
    /** n */
    n_template_count?: number;
    /** o */
    o_template_count?: number;
    /** p */
    p_template_count?: number;
    /** q */
    q_template_count?: number;
    /** r */
    r_template_count?: number;
    /** s */
    s_template_count?: number;
    /** t */
    t_template_count?: number;
    /** u */
    u_template_count?: number;
    /** v */
    v_template_count?: number;
    /** w */
    w_template_count?: number;
    /** x */
    x_template_count?: number;
    /** y */
    y_template_count?: number;
    /** z */
    z_template_count?: number;
    /** aa */
    a_a_template_count?: number;
    /** ab */
    a_b_template_count?: number;
    /** ac */
    a_c_template_count?: number;
    /** ad */
    a_d_template_count?: number;
    /** ae */
    a_e_template_count?: number;
    /** af */
    a_f_template_count?: number;
    /** ag */
    a_g_template_count?: number;
    /** ah */
    a_h_template_count?: number;
    /** ai */
    a_i_template_count?: number;
    /** aj */
    a_j_template_count?: number;
    /** ak */
    a_k_template_count?: number;
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
  };
}

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
    d_bank_name?: string;
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
    a_l_last_ettled_time?: string;
    /** 最后一次访问时间 */
    a_m_access_time?: number;
    /** 累计逾期天数* */
    a_n_total_overdue_days?: number;
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
    /** 白名单状态 1：正常 2：有过逾期 3：有过严重逾期 4：在逾 5：过期 6：禁止 */
    j_status?: number;
    /** 管理员id */
    k_admin_id?: number;
    /** 授信额度 */
    l_credit_amount?: number;
    /** 命中次数 */
    m_hit_count?: number;
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
    /** 产品id */
    a_product_id?: number;
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
    /** 产品特点* */
    a_e_features?: string;
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
    a_a_a_a_a_o_a_repay?: OARepay;
    a_a_a_a_a_g_verify?: GVerify;
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
    /** 姓名2 */
    a_n_name3?: string;
    /** 标签 */
    a_o_tags?: string;
    /** 分期期数 */
    a_p_period_count?: number;
    /** 签约时间 */
    a_r_sign_time?: string;
    /** 当前催员 */
    a_s_urge_admin_id?: number;
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

  type deleteAdminV1NBCollectionGroupRolesIdParams = {
    /** id of NBCollectionGroupRole */
    id: number;
  };

  type deleteAdminV1NCCollectionOrderFlowsIdParams = {
    /** id of NCCollectionOrderFlowHistory */
    id: number;
  };

  type deleteAdminV1OARepaysIdParams = {
    /** id of OARepay */
    id: number;
  };

  type deleteAdminV1QCCollectionNewsIdParams = {
    /** id of QCCollectionNews */
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

  type deleteAdminV1SAAppsIdParams = {
    /** id of SAApp */
    id: number;
  };

  type deleteAdminV1SBAppsIdParams = {
    /** id of SBApp */
    id: number;
  };

  type deleteAdminV1TCollectionAgenciesIdParams = {
    /** id of TCollectionAgency */
    id: number;
  };

  type deleteAdminV1VCollectionAssignLogsIdParams = {
    /** id of VCollectionAssignLog */
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
    /** 上次成功时间* */
    l_last_marketing_time?: string;
    /** 最近查看时间* */
    m_last_viewed_time?: string;
    /** 文件id* */
    n_admin_file_id?: number;
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
    /** 备注 */
    j_comment?: string;
    /** 文件id* */
    k_admin_file_id?: number;
    /** 执行类型 */
    l_type?: string;
    /** 状态：1待执行 2：执行中 3：执行成功 4：执行失败** */
    m_status?: number;
    /** p_last_marketing_time */
    p_last_marketing_time?: string;
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

  type getAdminV1OARepaysIdParams = {
    /** id of OARepay */
    id: number;
  };

  type getAdminV1OARepaysParams = {
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
    /** 执行逻辑 */
    n_execute_logic?: string;
    /** 字段组id */
    o_risk_item_cat_id?: number;
    /** 风控分类id */
    p_compare_risk_item_cat_id?: number;
    /** 风控分类父id */
    q_risk_item_cat_parent_id?: number;
    /** 风控父类id */
    r_compare_risk_item_cat_parent_id?: number;
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
    /** 关联细则数 */
    a_risk_strategy_id?: number;
    /** 关联细则数 */
    b_risk_role_bundle_id?: number;
    /** 执行顺序 */
    c_sort?: number;
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

  type GVerify = {
    /** id */
    id?: number;
    a_a_a_a_a_q_a_ocr?: QAOcr;
    a_a_a_a_a_m_idnumber?: MIdnumber;
    a_a_a_a_a_o_contact?: OContact;
    a_a_a_a_a_m_a_job?: MAJob;
    a_a_a_a_a_a_o_loan_bank?: AOLoanBank;
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
    /** 成功时间 */
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
    /** loan id */
    b_loan_id?: number;
    /** 管理员 id */
    c_admin_id?: number;
    /** loan bank id */
    d_loan_bank_id?: number;
    /** 最终支付渠道 */
    e_payment_channel?: string;
    /** 放款方式 1：线上放款 2： 线下放款 */
    f_method?: number;
    /** 放款类型 1：自动放款 2： 手动放款 */
    g_type?: number;
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
    /** 同步code */
    t_sync_code?: string;
    /** 同步消息 */
    u_sync_message?: string;
    /** 同步原始报文 */
    v_sync_raw?: string;
    /** 异步code */
    w_callback_code?: string;
    /** 异步消息 */
    x_callback_message?: string;
    /** 异步原始报文 */
    y_callback_raw?: string;
    /** 审核备注 */
    z_remark?: string;
    /** 放款凭证 */
    a_a_certificate?: string;
    /** a_b_index */
    a_b_index?: number;
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
    /** created_at */
    created_at?: string;
    /** updated_at */
    updated_at?: string;
    /** deleted_at */
    deleted_at?: string;
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
    /** 白名单id */
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
    h_grey_id?: number;
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
    /** 借款次数 */
    a_c_borrow_count?: number;
    /** 逾期次数 */
    a_d_overdue_count?: number;
    /** 提前还款次数 */
    a_e_early_repay_count?: number;
    /** 地理信息风险等级 */
    a_f_ip_geography_risk_level?: number;
    /** 风险地区id */
    a_g_ip_geography_risk_id?: number;
    /** 营销id */
    a_h_marketing_detail_id?: number;
    /** 可疑id */
    a_i_suspicious_id?: number;
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
    a_m_product_settlement_type?: string;
    /** 核算日期 */
    a_n_calculate_time?: string;
    /** 最后一次查看时间 */
    a_o_view_time?: string;
    /** 最后一次查看时间 */
    a_p_overdue_period_count?: number;
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

  type putAdminV1NBCollectionGroupRolesIdParams = {
    /** id of NBCollectionGroupRole */
    id: number;
  };

  type putAdminV1NCCollectionOrderFlowsIdParams = {
    /** id of NCCollectionOrderFlowHistory */
    id: number;
  };

  type putAdminV1OARepaysIdParams = {
    /** id of OARepay */
    id: number;
  };

  type putAdminV1QCCollectionNewsIdParams = {
    /** id of QCCollectionNews */
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

  type putAdminV1RCSmsIdParams = {
    /** id of RCSms */
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

  type putAdminV1TCollectionAgenciesIdParams = {
    /** id of TCollectionAgency */
    id: number;
  };

  type putAdminV1VCollectionAssignLogsIdParams = {
    /** id of VCollectionAssignLog */
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

  type putRBlacksIdParams = {
    /** id of RBlack */
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
    d_status?: boolean;
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
    /** 信息1 */
    r_info?: string;
    /** 信息2 */
    s_info2?: string;
    /** 信息3 */
    t_info3?: string;
    /** 信息4 */
    u_info4?: string;
    /** 信息5 */
    v_info5?: string;
    /** 信息6 */
    w_info6?: string;
    /** 图片1 */
    x_picture_1?: string;
    /** 图片2 */
    y_picture_2?: string;
    /** 图片3 */
    z_picture_3?: string;
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
    /** created_at */
    created_at?: string;
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
    /** 1类金融 2类金融 3其他 */
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
    /** 第二类型(备用) */
    k_type2?: number;
    /** 链接 */
    l_url?: string;
    /** 联系手机 */
    m_phone?: string;
    /** 天数 */
    n_days?: number;
    /** 预计还款时间 */
    o_expect_repay_time?: string;
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
    /** 登录 注册 通过 拒绝 放款成功 还款成功 展期成功 逾前催收 逾后催收 召回 营销 */
    d_type?: string;
    /** 商户 */
    e_merchant?: string;
    /** data */
    date?: number;
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
}

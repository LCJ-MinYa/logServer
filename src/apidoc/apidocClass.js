// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------

/**
 *  @apiDefine loginGroup 用户信息
 */

/**
 * @apiDefine passwordGroup 密码存储
 */

/**
 * @apiDefine taskGroup 任务存储
 */

/**
 * @apiDefine searchGroup 搜索
 */

/**
 * @apiDefine webhookGroup 自动部署
 */

/**
 * @apiDefine baseHasLoginParams 已登录公用请求参数
 * @apiParam {Date}   timestamp 请求时间戳
 * @apiParam {String} accessToken 请求验证token
 * @apiParam {String} uid 用户uid
 */

/**
 * @apiDefine baseUnLoginParams 未登录公用请求参数
 * @apiParam {Date}   timestamp 请求时间戳
 * @apiParam {String} accessToken 请求验证token
 * @apiParam {String} [uid] 用户uid
 */

/**
 * @apiDefine baseSuccessParams 请求成功返回信息
 * @apiSuccess {Number} errno 返回状态码
 * @apiSuccess {String} errmsg 返回信息
 * @apiSuccess {Object} data 返回对象数据
 */

/**
 * @apiDefine CODE_REFUSE_401 非法请求
 * @apiErrorExample {json} 非法请求401
 *  {
 *      "errno": 401,
 *      "errmsg": "瞎请求干啥，心疼我的服务器!"
 *  }
 */

/**
 * @apiDefine CODE_UID_203 无用户信息
 * @apiErrorExample {json} 无用户信息
 *  {
 *      "errno": 203,
 *      "errmsg": "未获取到用户信息，请重新登陆!"
 *  }
 */

/**
 * @apiDefine CODE_METHOD_GET_403 不支持GET请求
 * @apiErrorExample {json} 不支持GET请求
 *  {
 *      "errno": 403,
 *      "errmsg": "请求不支持GET方法！"
 *  }
 */

/**
 * @apiDefine CODE_METHOD_POST_403 不支持POST请求
 * @apiErrorExample {json} 不支持POST请求
 *  {
 *      "errno": 403,
 *      "errmsg": "请求不支持POST方法！"
 *  }
 */

/**
 * @apiDefine CODE_DEPLOY_500 自动部署失败
 * @apiErrorExample {json} 自动部署失败
 *  {
 *      "errno": 500,
 *      "errmsg": "服务器自动部署失败！"
 *  }
 */

/**
 * @apiDefine baseTaskItemSuccess 任务详情公用字段
 * @apiSuccess {String} data.title 标题
 * @apiSuccess {bool}   data.isComplete 任务状态（是否完成）
 * @apiSuccess {String} data.type 任务所属项目
 * @apiSuccess {String} data.importance 优先级
 * @apiSuccess {String} data.date 截止日期
 * @apiSuccess {String} data.time 截止时间
 * @apiSuccess {Array}  data.tag 任务tag
 * @apiSuccess {String} data.notes 备注
 * @apiSuccess {String} data._id 任务id
 * @apiSuccess {String} data.uid 任务所属用户
 * @apiSuccess {String} data.creatTime 任务创建时间
 * @apiSuccess {Array}  data.beginDate 任务开始时间
 * @apiSuccess {Array}  data.endDate 任务停止时间
 * @apiSuccess {Number} data.totalTime 任务耗时
 * @apiSuccess {String} data.completeDate 任务完成时间
 */
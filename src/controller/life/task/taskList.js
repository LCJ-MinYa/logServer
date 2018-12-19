const BaseRest = require('../rest.js');

/**
 * @api {get} /life/task/taskList 项目列表
 * @apiDescription 获取用户对应的项目列表
 * @apiGroup taskGroup
 * @apiVersion 1.0.0
 *
 * @apiUse baseHasLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
 *      "timestamp": 1543578242441,
 *      "accessToken": 'e2b06cd',
 *      "uid": 'user-uid'
 *  }
 *
 * @apiUse baseSuccessParams
 * @apiSuccess {String} data._id 密码存储id
 * @apiSuccess {String} data.details 项目描述
 * @apiSuccess {String} data.text 项目名称
 * @apiSuccess {String} data.timestamp 项目创建时间
 * @apiSuccess {String} data.uid 用户id
 *
 * @apiSuccessExample {json} 正确返回值:
 *  {
 *      "data": [{
 *          "_id": "_id",
 *          "details": "项目描述",
 *          "text": "项目名称",
 *          "timestamp": 1543578242441,
 *          "uid": 'user-uid'
 *      }],
 *      "errno": 0,
 *      "errmsg": "获取项目列表成功"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class TaskList extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskList', 'mongoPassword');
        let param = this.get();
        let result = await PasswordList.where({
            uid: param.uid
        }).order('timestamp').select();
        this.success(result, '获取项目列表成功');
        return false;
    }
}
const BaseRest = require('../rest.js');

/**
 * @api {post} /life/task/addTaskList 新增项目
 * @apiDescription 根据用户输入信息新增项目
 * @apiGroup taskGroup
 * @apiVersion 1.0.0
 *
 * @apiParam {String} text 项目名称
 * @apiParam {String} details 项目描述
 * @apiUse baseHasLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
 *      "text": "项目名称",
 *      "details": "项目描述",
 *      "timestamp": 1543578242441,
 *      "accessToken": 'e2b06cd',
 *      "uid": 'user-uid'
 *  }
 *
 * @apiUse baseSuccessParams
 * @apiSuccess {String} data._id 密码存储id
 *
 * @apiSuccessExample {json} 正确返回值:
 *  {
 *      "data": {
 *          "_id": "_id"
 *      },
 *      "errno": 0,
 *      "errmsg": "新增任务项目成功"
 *  }
 * @apiErrorExample {json} 错误返回值:
 *  {
 *      "errno": 401,
 *      "errmsg": "已存在相同任务项目名称!"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class AddTaskList extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskList', 'mongoPassword');
        let param = this.post();
        delete param.accessToken;
        let result = await PasswordList.where({
            uid: param.uid,
            text: param.text
        }).thenAdd(param);
        if (result.type == 'add') {
            this.success({
                _id: result._id
            }, '新增任务项目成功');
            return false;
        } else {
            this.fail(401, '已存在相同任务项目名称');
            return false;
        }
    }
}
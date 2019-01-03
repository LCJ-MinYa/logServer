import BaseRest from '../rest';

/**
 * @api {post} /life/task/deleteTask 删除任务
 * @apiDescription 根据用户传入{_id}删除任务
 * @apiGroup taskGroup
 * @apiVersion 1.0.0
 *
 * @apiParam {String} _id 任务id
 * @apiParam {bool}   isComplete 任务状态（是否完成）
 * @apiParam {String} type 任务所属项目
 * @apiUse baseHasLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
 *      "_id": "_id",
 *      "isComplete": "isComplete",
 *      "type": "type",
 *      "timestamp": 1543578242441,
 *      "accessToken": 'e2b06cd',
 *      "uid": 'user-uid'
 *  }
 *
 * @apiUse baseSuccessParams
 *
 * @apiSuccessExample {json} 正确返回值:
 *  {
 *      "data": {},
 *      "errno": 0,
 *      "errmsg": "删除任务信息成功!"
 *  }
 * @apiErrorExample {json} 参数缺失
 *  {
 *      "errno": 400,
 *      "errmsg": "任务id不存在!"
 *  }
 *  {
 *      "errno": 400,
 *      "errmsg": "任务所属项目不存在!"
 *  }
 *  {
 *      "errno": 400,
 *      "errmsg": "任务类型不存在!"
 *  }
 * @apiErrorExample {json} 任务不存在
 *  {
 *      "errno": 401,
 *      "errmsg": "任务不存在!"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class DeleteTask extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskItem', 'mongoPassword');
        let param = this.post();
        param.isComplete = JSON.parse(param.isComplete);
        const result = await PasswordList.where({
            _id: param._id,
            isComplete: param.isComplete,
            type: param.type
        }).delete();
        if (result) {
            this.success({}, '删除任务信息成功');
            return false;
        } else {
            this.fail(401, '任务不存在!');
            return false;
        }
    }
}
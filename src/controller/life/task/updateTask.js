import BaseRest from '../rest';

/**
 * @api {post} /life/task/updateTask 更新任务
 * @apiDescription 根据任务信息更新任务
 * @apiGroup taskGroup
 * @apiVersion 1.0.0
 *
 * @apiParam {String} _id 任务id
 * @apiParam {String} title 标题
 * @apiParam {bool}   isComplete 任务状态（是否完成）
 * @apiParam {String} type 任务所属项目
 * @apiParam {String} importance 优先级
 * @apiParam {String} [date] 截止日期
 * @apiParam {String} [time] 截止时间
 * @apiParam {Array}  [tag] 任务tag
 * @apiParam {String} [notes] 备注
 * @apiUse baseHasLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
 *      "_id": "_id",
 *      "title": "title",
 *      "date": "date",
 *      "time": "time",
 *      "tag": [],
 *      "isComplete": "isComplete",
 *      "type": "type",
 *      "importance": "importance",
 *      "notes": "notes",
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
 *      "errmsg": "更新任务信息成功"
 *  }
 * @apiErrorExample {json} 任务不存在
 *  {
 *      "errno": 401,
 *      "errmsg": "当前任务信息不存在!"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */

export default class UpdataTask extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskItem', 'mongoPassword');
        let param = this.post();
        param.isComplete = JSON.parse(param.isComplete);
        param.tag = JSON.parse(param.tag);
        let result = await PasswordList.where({
            _id: param._id,
            uid: param.uid
        }).select();
        if (result.length === 1) {
            let shouldUpdate = false;
            for (let i in param) {
                if (i == 'beginDate' || i == '_id' || i == 'uid' || i == 'endDate' || i == 'totalTime' || i == 'creatTime' || i == 'completeDate') {
                    continue;
                }
                if (result[0].hasOwnProperty(i) && param[i] !== result[0][i]) {
                    result[0][i] = param[i];
                    shouldUpdate = true;
                }
            }
            if (shouldUpdate) {
                let affectedRows = await PasswordList.where({
                    _id: param._id,
                    uid: param.uid
                }).update(result[0]);
                if (affectedRows) {
                    this.success({}, '更新任务信息成功！');
                    return false;
                } else {
                    this.fail(401, '更新任务信息失败！');
                    return false;
                }
            } else {
                this.fail(401, '任务信息相同,不需要修改!');
                return false;
            }
        } else {
            this.fail(401, '当前任务信息不存在');
            return false;
        }
    }
}
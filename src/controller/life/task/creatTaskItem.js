const BaseRest = require('../rest.js');

/**
 * @api {post} /life/task/creatTaskItem 创建任务
 * @apiDescription 根据用户创建信息创建任务项
 * @apiGroup taskGroup
 * @apiVersion 1.0.0
 *
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
 * @apiSuccess {String} data._id 密码存储id
 *
 * @apiSuccessExample {json} 正确返回值:
 *  {
 *      "data": {
 *          "_id": "_id"
 *      },
 *      "errno": 0,
 *      "errmsg": "项目新增任务成功"
 *  }
 * @apiErrorExample {json} 错误返回值:
 *  {
 *      "errno": 401,
 *      "errmsg": "任务项目中已存在相同任务名称!"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class CreatTaskItem extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskItem', 'mongoPassword');
        let param = this.post();
        delete param.accessToken;
        param.isComplete = JSON.parse(param.isComplete);
        param.tag = JSON.parse(param.tag);
        let result = await PasswordList.where({
            uid: param.uid,
            title: param.title,
            type: param.type
        }).thenAdd(param);
        if (result.type == 'add') {
            this.success({
                _id: result._id
            }, '项目新增任务成功');
            return false;
        } else {
            this.fail(401, '任务项目中已存在相同任务名称');
            return false;
        }
    }
}
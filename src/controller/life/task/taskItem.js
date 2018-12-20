const BaseRest = require('../rest.js');

/**
 * @api {get} /life/task/taskItem 任务列表
 * @apiDescription 获取用户项目对应的任务列表
 * @apiGroup taskGroup
 * @apiVersion 1.0.0
 *
 * @apiParam {String} itemType 任务分类名称
 * @apiParam {String} listType 任务所属项目
 * @apiUse baseHasLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
 *      "itemType": "itemType",
 *      "listType": "listType",
 *      "timestamp": 1543578242441,
 *      "accessToken": 'e2b06cd',
 *      "uid": 'user-uid'
 *  }
 *
 * @apiUse baseSuccessParams
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
 * @apiSuccess {String} data.timestamp 任务创建时间
 *
 * @apiSuccessExample {json} 正确返回值:
 *  {
 *      "data": [{
 *          "title": "title",
 *          "date": "date",
 *          "time": "time",
 *          "tag": [],
 *          "isComplete": "isComplete",
 *          "type": "type",
 *          "importance": "importance",
 *          "notes": "notes",
 *          "timestamp": 1543578242441,
 *          "_id": '_id',
 *          "uid": 'user-uid'
 *      }],
 *      "errno": 0,
 *      "errmsg": "获取任务列表成功"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class TaskItem extends BaseRest {
    async indexAction() {
        const TaskItemDB = think.mongo('TaskItem', 'mongoPassword');
        const param = this.get();
        const isComplete = param.itemType == 'complete';
        let result = await TaskItemDB.where({
            uid: param.uid,
            isComplete: isComplete,
            type: param.listType
        }).order('timestamp').select();
        this.success(result, '获取任务列表成功');
        return false;
    }
}
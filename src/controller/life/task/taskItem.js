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
 * @apiUse baseTaskItemSuccess
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
 *          "creatTime": "creatTime",
 *          "_id": '_id',
 *          "uid": 'user-uid',
 *          "beginDate": [],
 *          "endDate": [],
 *          "totalTime": 0
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
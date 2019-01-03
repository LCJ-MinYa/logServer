import BaseRest from '../rest';
import Moment from 'moment';

/**
 * @api {post} /life/task/completeTask 完成任务
 * @apiDescription 根据用户传入{_id}完成任务
 * @apiGroup taskGroup
 * @apiVersion 1.0.0
 *
 * @apiParam {Array}  completeList 完成任务数组
 * @apiParam {String} completeList._id 任务id
 * @apiParam {bool}   completeList.isComplete 任务状态（是否完成）
 * @apiParam {String} completeList.type 任务所属项目
 * @apiUse baseHasLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
 *      completeList: [{
 *          "_id": "_id",
 *          "isComplete": "isComplete",
 *          "type": "type"
 *      }],
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
 *          "totalTime": 0,
 *          "completeDate": "completeDate"
 *      }],
 *      "errno": 0,
 *      "errmsg": "任务已完成成功!"
 *  }
 * @apiErrorExample {json} 参数缺失
 *  {
 *      "errno": 400,
 *      "errmsg": "完成任务列表不存在!"
 *  }
 * @apiErrorExample {json} 任务已完成
 *  {
 *      "errno": 400,
 *      "errmsg": "已完成任务不能再次完成!"
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

export default class CompleteTask extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskItem', 'mongoPassword');
        const nowDate = Moment().format("YYYY-MM-DD HH:mm:ss");
        let param = this.post();

        let taskItemArrayData = [];
        for (let i = 0; i < param.completeList.length; i++) {
            const result = await PasswordList.where({
                _id: param.completeList[i]._id,
                isComplete: param.completeList[i].isComplete,
                type: param.completeList[i].type
            }).select();
            if (result.length === 1) {
                result[0].completeDate = nowDate;
                result[0].isComplete = true;
                if (result[0].beginDate.length - result[0].endDate.length === 1) {
                    result[0].endDate.push(nowDate);
                    result[0].totalTime = this.totalTaskTime(result[0]);
                }

                //更新当前任务详细信息
                let updateTaskItemResult = await PasswordList.where({
                    _id: param.completeList[i]._id,
                    isComplete: param.completeList[i].isComplete,
                    type: param.completeList[i].type
                }).update(result[0]);
                result[0]._id = param.completeList[i]._id;
                taskItemArrayData.push(result[0]);
            } else {
                this.fail(401, '任务不存在!');
                return false;
            }
        }

        this.success(taskItemArrayData, '任务已完成成功');
        return false;
    }
    totalTaskTime(taskItemData) {
        //计算任务时长
        let totalTime = 0;
        for (let i = 0; i < taskItemData.endDate.length; i++) {
            totalTime += Moment(taskItemData.endDate[i]).diff(Moment(taskItemData.beginDate[i]), 'minutes');
        }
        return (totalTime / 60).toFixed(2);
    }
}
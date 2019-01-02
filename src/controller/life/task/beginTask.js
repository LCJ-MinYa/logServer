import BaseRest from '../rest';
import Moment from 'moment';

/**
 * @api {post} /life/task/beginTask 开始任务
 * @apiDescription 根据用户传入{_id}开始任务
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
 * @apiUse baseTaskItemSuccess
 *
 * @apiSuccessExample {json} 正确返回值:
 *  {
 *      "data": {
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
 *      },
 *      "errno": 0,
 *      "errmsg": "开始任务成功!"
 *  }
 * @apiErrorExample {json} 参数缺失:
 *  {
 *      "errno": 400,
 *      "errmsg": "任务id不存在!"
 *  }
 * @apiErrorExample {json} 参数缺失:
 *  {
 *      "errno": 400,
 *      "errmsg": "任务所属项目不存在!"
 *  }
 * @apiErrorExample {json} 参数缺失:
 *  {
 *      "errno": 400,
 *      "errmsg": "任务类型不存在!"
 *  }
 * @apiErrorExample {json} 任务已完成:
 *  {
 *      "errno": 400,
 *      "errmsg": "已完成任务不能开始!"
 *  }
 * @apiErrorExample {json} 任务不存在:
 *  {
 *      "errno": 401,
 *      "errmsg": "任务不存在!"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class BeginTask extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskItem', 'mongoPassword');
        const nowDate = Moment().format("YYYY-MM-DD HH:mm:ss");
        let param = this.post();
        param.isComplete = JSON.parse(param.isComplete);
        const result = await PasswordList.where({
            _id: param._id,
            isComplete: param.isComplete,
            type: param.type
        }).select();
        if (result.length === 1) {
            if (result[0].beginDate.length != result[0].endDate.length) {
                this.fail(401, '任务已经处于开始中!');
                return false;
            }
            result[0].beginDate.push(nowDate);
            let updateTaskItemResult = await PasswordList.where({
                _id: param._id,
                isComplete: param.isComplete,
                type: param.type
            }).update(result[0]);
            if (updateTaskItemResult) {
                result[0]._id = param._id;
                this.success(result[0], '修改任务开始时间成功');
                return false;
            } else {
                this.fail(401, '修改任务开始时间失败');
                return false;
            }
        } else {
            this.fail(401, '任务不存在!');
            return false;
        }
    }
}
import BaseRest from '../rest';
import Moment from 'moment';

/**
 * @api {post} /life/task/endTask 停止任务
 * @apiDescription 根据用户传入{_id}停止任务
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
 *      "errmsg": "停止任务成功!"
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
 *      "errmsg": "已完成任务不能停止!"
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
export default class EndTask extends BaseRest {
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
            if (result[0].beginDate.length - result[0].endDate.length !== 1) {
                this.fail(401, '任务阶段不正确!');
                return false;
            }
            result[0].endDate.push(nowDate);
            //计算任务时长
            let totalTime = 0;
            for (let i = 0; i < result[0].endDate.length; i++) {
                totalTime += Moment(result[0].endDate[i]).diff(Moment(result[0].beginDate[i]), 'minutes');
            }
            result[0].totalTime = (totalTime / 60).toFixed(2);

            //更新当前任务详细信息
            let updateTaskItemResult = await PasswordList.where({
                _id: param._id,
                isComplete: param.isComplete,
                type: param.type
            }).update(result[0]);
            if (updateTaskItemResult) {
                result[0]._id = param._id;
                this.success(result[0], '修改任务停止时间成功');
                return false;
            } else {
                this.fail(401, '修改任务停止时间失败');
                return false;
            }
        } else {
            this.fail(401, '任务不存在!');
            return false;
        }
    }
}
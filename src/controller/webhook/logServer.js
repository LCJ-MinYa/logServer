const BaseRest = require('./rest.js');
const crypto = require('crypto');

/**
 * @api {post} /webhook/logServer logServer自动部署
 * @apiDescription 根据github（push）触发自动部署
 * @apiGroup webhookGroup
 * @apiVersion 1.0.0
 *
 * @apiParam {String} type 密码类型
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
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
 *      "errmsg": "触发成功"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class LogServerWebHook extends BaseRest {
    async indexAction() {
        console.log('==========开始==========');
        console.log(this.ip);
        console.log((this.userAgent || '').toLowerCase());
        console.log(this.ctx.headers);
        console.log(this.post());
        console.log(crypto.createHmac('sha1', '').update(JSON.stringify(this.post())).digest().toString('hex'));
        console.log('==========结束==========');
        this.success({}, '触发成功');
    }
}
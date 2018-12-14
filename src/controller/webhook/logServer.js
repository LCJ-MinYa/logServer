const BaseRest = require('./rest.js');
const exec = require('child_process').exec;
import Utils from '../../utils/utils';
import {
    model
} from '../../config/adapter';

/**
 * @api {post} /webhook/logServer logServer自动部署
 * @apiDescription 根据github（push）触发自动部署
 * @apiGroup webhookGroup
 * @apiVersion 1.0.0
 *
 * @apiUse baseSuccessParams
 *
 * @apiSuccessExample {json} 正确返回值:
 *  {
 *      ok
 *  }
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class LogServerWebHook extends BaseRest {
    async indexAction() {
        if (this.isPost) {
            const headers = this.ctx.headers;
            if (headers['user-agent'] != 'GitHub-Hookshot/3c05c9b') {
                this.fail(401, '非法的请求头!');
                return false;
            }
            if (headers['x-github-event'] != 'push') {
                this.fail(401, '非push触发!');
                return false;
            }
            const sha1Secret = 'sha1=' + Utils.sha1Secret(model.logServerWebhookSecret, this.post());
            console.log(sha1Secret);
            if (headers['x-hub-signature'] != sha1Secret) {
                this.fail(401, '非法的密钥!');
                return false;
            }

            const cmdStr = "sh -x /root/www/logServer/deploy.sh";
            exec(cmdStr, (err, result) => {
                if (err) {
                    console.log(err);
                    process.exit();
                }
                console.log('执行成功');
                process.exit();
            })
        }
    }
}
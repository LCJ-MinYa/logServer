const BaseRest = require('./rest.js');
const exec = require('child_process').exec;
import Utils from '../../utils/utils';
import {
    model
} from '../../config/adapter';

/**
 * @api {post} /webhook/blog blog自动部署
 * @apiDescription 根据github（push）触发自动部署
 * @apiGroup webhookGroup
 * @apiVersion 1.0.0
 *
 * @apiUse baseSuccessParams
 *
 * @apiSuccessExample {json} 正确返回值:
 *  {
 *      "data": {},
 *      "errno": 0,
 *      "errmsg": "更新网站成功!"
 *  }
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class BlogWebHook extends BaseRest {
    async indexAction() {
        const headers = this.ctx.headers;
        console.log('第一步');
        if (headers['user-agent'].indexOf('GitHub-Hookshot/') <= -1) {
            this.fail(401, '非法的请求头!');
            return false;
        }
        console.log('第二步');
        if (headers['x-github-event'] != 'push') {
            this.fail(401, '非push触发!');
            return false;
        }
        console.log('第三步');
        const sha1Secret = 'sha1=' + Utils.sha1Secret(model.blogWebhookSecret, this.post());
        console.log('生成的sha1key =' + sha1Secret);
        console.log('header的sha1key =' + headers['x-hub-signature']);
        if (headers['x-hub-signature'] != sha1Secret) {
            this.fail(401, '非法的密钥!');
            return false;
        }
        console.log('第四步');
        const cmdStrResult = await this.doCmdStr().catch(err => {
            console.log('失败结果=' + err);
            this.fail(500, '更新网站超时!');
            return false;
        });
        if (cmdStrResult) {
            console.log('成功结果=' + cmdStrResult);
            this.success({}, '更新网站成功!');
            return false;
        }
    }
    doCmdStr() {
        return new Promise((resolve, reject) => {
            console.log('第五步,执行shell');
            const cmdStr = "sh -x /root/www/blog/deploy.sh";
            let workerProcess = exec(cmdStr);
            workerProcess.stdout.on('data', function(data) {
                // console.log('stdout: ' + data);
                //shell执行日志
                if (data.indexOf('files generated in') > -1) {
                    resolve(data);
                }
            });

            workerProcess.stderr.on('data', function(data) {
                //shell执行命令
                console.log('stderr: ' + data);
                if (data.indexOf('hexo g') > -1) {
                    resolve(data);
                }
            });
            setTimeout(() => {
                //10秒超时就返回失败
                reject('编译超时');
            }, 10000);
        });
    }
}

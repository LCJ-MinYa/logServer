exports.__esModule = true;

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _adapter = require('../../config/adapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const BaseRest = require('./rest.js');
const exec = require('child_process').exec;


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
 *      "errmsg": "服务器自动部署成功"
 *  }
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
class LogServerWebHook extends BaseRest {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this.isPost) {
                const headers = _this.ctx.headers;
                if (headers['user-agent'] != 'GitHub-Hookshot/3c05c9b') {
                    _this.fail(401, '非法的请求头!');
                    return false;
                }
                if (headers['x-github-event'] != 'push') {
                    _this.fail(401, '非push触发!');
                    return false;
                }
                const sha1Secret = 'sha1=' + _utils2.default.sha1Secret(_adapter.model.logServerWebhookSecret, _this.post());
                console.log(sha1Secret);
                if (headers['x-hub-signature'] != sha1Secret) {
                    _this.fail(401, '非法的密钥!');
                    return false;
                }

                const cmdStr = "sh -x /root/www/logServer/deploy.sh";
                exec(cmdStr, function (err, result) {
                    if (err) {
                        console.log(err);
                        process.exit();
                    }
                    console.log('执行成功');
                    process.exit();
                });
            }
        })();
    }
}
exports.default = LogServerWebHook;
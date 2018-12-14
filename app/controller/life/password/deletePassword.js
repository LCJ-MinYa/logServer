exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const BaseRest = require('../rest.js');

/**
 * @api {post} /life/password/deletePassword 删除密码
 * @apiDescription 删除当前选中{_id}的密码信息
 * @apiGroup passwordGroup
 * @apiVersion 1.0.0
 *
 * @apiParam {String} _id 密码id
 * @apiUse baseHasLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
 *      "_id": "_id",
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
 *      "errmsg": "删除密码数据信息成功"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
class DeletePassword extends BaseRest {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this.isPost) {
                let param = _this.post();
                const PasswordList = think.mongo('PasswordList', 'mongoPassword');
                let result = yield PasswordList.where({
                    _id: param._id
                }).delete();
                if (result) {
                    _this.success({}, '删除密码数据信息成功');
                } else {
                    _this.fail(401, '删除密码数据信息失败');
                }
            }
        })();
    }
}
exports.default = DeletePassword;
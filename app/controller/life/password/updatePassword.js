exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const BaseRest = require('../rest.js');

/**
 * @api {post} /life/password/updatePassword 更新密码
 * @apiDescription 根据密码信息更新密码
 * @apiGroup passwordGroup
 * @apiVersion 1.0.0
 *
 * @apiParam {String} _id 密码id
 * @apiParam {String} type 密码类型
 * @apiParam {String} title 标题
 * @apiParam {String} url 密码所属网站
 * @apiParam {String} userName 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} importance 重要性
 * @apiParam {String} notes 备注
 * @apiUse baseHasLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
 *      "_id": "_id",
 *      "type": "social",
 *      "title": "title",
 *      "url": "url",
 *      "userName": "userName",
 *      "password": "password",
 *      "importance": "importance",
 *      "notes": "notes",
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
 *      "errmsg": "创建密码列表成功"
 *  }
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
class UpdataPassword extends BaseRest {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const PasswordList = think.mongo('PasswordList', 'mongoPassword');
            let param = _this.post();
            delete param.accessToken;
            let result = yield PasswordList.where({
                _id: param._id
            }).select();
            if (result.length !== 0) {
                let shouldUpdate = false;
                for (let i in param) {
                    if (i == 'timestamp' || i == '_id' || i == 'uid') {
                        continue;
                    }
                    if (param[i] !== result[0][i]) {
                        shouldUpdate = true;
                    }
                }
                if (shouldUpdate) {
                    let affectedRows = yield PasswordList.where({
                        _id: param._id
                    }).update(param);
                    if (affectedRows) {
                        _this.success({}, '修改密码数据信息成功');
                        return false;
                    } else {
                        _this.fail(401, '修改密码数据信息失败');
                        return false;
                    }
                } else {
                    _this.fail(401, '密码信息相同,不需要修改');
                    return false;
                }
            } else {
                _this.fail(401, '未匹配到该密码信息');
                return false;
            }
        })();
    }
}
exports.default = UpdataPassword;
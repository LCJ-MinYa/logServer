exports.__esModule = true;

var _checkPostReq = require('../class/checkPostReq');

var _checkPostReq2 = _interopRequireDefault(_checkPostReq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeletePassword extends _checkPostReq2.default {
    indexAction() {
        const param = this.post();
        if (!param.uid) {
            this.fail(400, '未获取到用户信息，请重新登陆!');
            return false;
        }
        if (!param._id) {
            this.fail(400, '未获取到密码信息，删除失败!');
            return false;
        }
    }
}
exports.default = DeletePassword;
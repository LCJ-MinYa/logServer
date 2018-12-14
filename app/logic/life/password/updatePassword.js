exports.__esModule = true;

var _checkPassword = require('../class/checkPassword');

var _checkPassword2 = _interopRequireDefault(_checkPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdataPassword extends _checkPassword2.default {
    __after() {
        if (this.isPost) {
            const param = this.post();
            if (!param._id) {
                this.fail(400, '未匹配到该密码信息!');
                return false;
            }
        }
    }
}
exports.default = UpdataPassword;
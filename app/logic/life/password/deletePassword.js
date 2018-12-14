exports.__esModule = true;

var _checkUserPermission = require('../class/checkUserPermission');

var _checkUserPermission2 = _interopRequireDefault(_checkUserPermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeletePassword extends _checkUserPermission2.default {
    indexAction() {
        if (this.isPost) {
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
}
exports.default = DeletePassword;
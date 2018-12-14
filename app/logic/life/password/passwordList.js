exports.__esModule = true;

var _checkPostReq = require('../class/checkPostReq');

var _checkPostReq2 = _interopRequireDefault(_checkPostReq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PasswordList extends _checkPostReq2.default {
    indexAction() {
        const param = this.post();
        if (!param.type) {
            this.fail(400, '请选择查看密码分类!');
            return false;
        }
    }
}
exports.default = PasswordList;
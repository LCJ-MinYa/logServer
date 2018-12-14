exports.__esModule = true;

var _checkPostReq = require('./checkPostReq');

var _checkPostReq2 = _interopRequireDefault(_checkPostReq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheckPassword extends _checkPostReq2.default {
    indexAction() {
        const param = this.post();
        if (!param.title) {
            this.fail(400, '密码名称不能为空!');
            return false;
        }
        if (param.title.length > 15) {
            this.fail(400, '密码名称不能超过15个字符!');
            return false;
        }
        if (!param.url) {
            this.fail(400, '产品网址不能为空!');
            return false;
        }
        if (!param.userName) {
            this.fail(400, '登陆账号不能为空!');
            return false;
        }
        if (!param.password) {
            this.fail(400, '登陆密码不能为空!');
            return false;
        }
        if (!param.type) {
            this.fail(400, '请选择密码分类!');
            return false;
        }
        if (param.notes.length > 100) {
            this.fail(400, '备注信息不能超过100个字符!');
            return false;
        }
    }
}
exports.default = CheckPassword;
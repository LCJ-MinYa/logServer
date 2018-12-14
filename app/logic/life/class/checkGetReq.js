exports.__esModule = true;

var _checkUserPermission = require('./checkUserPermission');

var _checkUserPermission2 = _interopRequireDefault(_checkUserPermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheckPostReq extends _checkUserPermission2.default {
    __before() {
        if (this.isPost) {
            this.fail(403, '请求不支持POST方法！');
            return false;
        }
        if (this.isGet) {
            const param = this.get();
            if (this.shouldLogin(param) === false) {
                return false;
            }
            if (this.verifyAccessToken(param) === false) {
                return false;
            }
        }
    }
}
exports.default = CheckPostReq;
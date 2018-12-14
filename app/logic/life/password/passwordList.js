exports.__esModule = true;

var _checkUserPermission = require('../class/checkUserPermission');

var _checkUserPermission2 = _interopRequireDefault(_checkUserPermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PasswordList extends _checkUserPermission2.default {
	indexAction() {
		if (this.isPost) {
			const param = this.post();
			if (!param.type) {
				this.fail(400, '请选择查看密码分类!');
				return false;
			}
		}
	}
}
exports.default = PasswordList;
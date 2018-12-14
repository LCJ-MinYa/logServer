var _checkPostReq = require('./class/checkPostReq');

var _checkPostReq2 = _interopRequireDefault(_checkPostReq);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = class extends _checkPostReq2.default {
	constructor(ctx) {
		super(ctx);
		ctx.shouldLogin = false;
	}
	indexAction() {
		const param = this.post();
		if (!param.email) {
			this.fail(400, '邮箱地址不能为空!');
			return false;
		}
		if (!_utils2.default.matchEmail(param.email)) {
			this.fail(400, '请输入正确的邮箱地址!');
			return false;
		}
		if (!param.password) {
			this.fail(400, '密码不能为空!');
			return false;
		}
		if (param.password.length < 6) {
			this.fail(400, '密码不能小于6位数!');
			return false;
		}
	}
};
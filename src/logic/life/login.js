import Utils from '../../utils/utils.js'

module.exports = class extends think.Logic {
	indexAction() {
		if (this.isPost) {
			const param = this.post();
			if (!param.email) {
				this.fail(400, '邮箱地址不能为空!');
				return false;
			}
			if (!Utils.matchEmail(param.email)) {
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
	}
};
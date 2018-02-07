import {
	matchEmail
} from '../../utils/utils'

module.exports = class extends think.Logic {
	indexAction() {
		if (this.isPost) {
			const param = this.post();
			if (!param.email) {
				this.fail(400, '邮箱地址不能为空!');
				return false;
			}
			if (!matchEmail(param.email)) {
				this.fail(400, '非法的邮箱地址!');
				return false;
			}
			if (!param.password) {
				this.fail(400, '密码不能为空!');
				return false;
			}
			if (param.password.length < 6) {
				this.fail(400, '非法的密码格式!');
				return false;
			}
		}
	}
};
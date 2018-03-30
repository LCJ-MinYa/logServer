const BaseRest = require('./rest.js');

export default class Login extends BaseRest {
	async indexAction() {
		if (this.isPost) {
			const param = this.post();
			const User = think.mongo('User');
			const result = await User.where({
				email: param.email
			}).select();
			if (result.length !== 0) {
				if (result[0].password == param.password) {
					this.success({
						uid: result[0].uid,
						userName: result[0].userName
					}, '登录成功');
				} else {
					this.fail(401, '用户名或密码错误!');
				}
			} else {
				this.fail(401, '用户名或密码错误!');
			}
		}
	}
}
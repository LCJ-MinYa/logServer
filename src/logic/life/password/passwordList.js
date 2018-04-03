export default class PasswordList extends think.Logic {
	indexAction() {
		if (this.isPost) {
			const param = this.post();

			if (!param.uid) {
				this.fail(400, '未获取到用户信息，请重新登陆!');
				return false;
			}
			if (!param.type) {
				this.fail(400, '请选择查看密码分类!');
				return false;
			}
		}
	}
}
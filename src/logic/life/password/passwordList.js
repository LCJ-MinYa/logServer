import CheckUserPermission from '../class/checkUserPermission';

export default class PasswordList extends CheckUserPermission {
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
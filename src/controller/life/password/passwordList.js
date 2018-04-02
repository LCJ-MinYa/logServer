const BaseRest = require('../rest.js');

export default class PasswordList extends BaseRest {
	async indexAction() {
		if (this.isPost) {
			const PasswordList = think.mongo('PasswordList', 'mongoPassword');
			let param = this.post();
			let result = await PasswordList.where({
				uid: param.uid,
				type: param.type,
			}).order('timestamp').select();
			this.success(result, '获取密码列表成功');
		}
	}
}
const BaseRest = require('./rest.js');

export default class CreatPassword extends BaseRest {
	async indexAction() {
		/* 连接多个数据库写法mongoPassword对应adapter.js中第二个object
		==>	mongoPassword: {
        		host: host,
        		port: port,
        		user: user,
        		password: password,
        		database: database,
        		prefix: '',
			}
			mongoPassword的名称对应think.mongo的第二个参数（这个名称为自己命名的数据库配置名称）
		*/
		if (this.isPost) {
			const PasswordList = think.mongo('PasswordList', 'mongoPassword');
			let param = this.post();
			delete param.accessToken;
			let result = await PasswordList.where({
				uid: param.uid,
				title: param.title,
				url: param.url,
				userName: param.userName,
				password: param.password,
			}).thenAdd(param);
			console.log(result);
			if (result.type == 'add') {
				this.success({}, '新增密码数据信息成功');
			} else {
				this.fail(401, '已存在相同密码数据信息');
			}
		}
	}
}
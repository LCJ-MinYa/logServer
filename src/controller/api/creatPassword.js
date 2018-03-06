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
			await PasswordList.add(param);
			this.success({}, '添加成功');
		}
	}
}
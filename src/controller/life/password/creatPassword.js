const BaseRest = require('../rest.js');

/**
 * @api {post} /password/creatPassword 创建密码
 * @apiDescription 根据密码信息创建密码
 * @apiGroup passwordGroup
 * @apiVersion 1.0.0
 *
 * @apiParam {String} type 密码类型
 * @apiParam {String} title 标题
 * @apiParam {String} url 密码所属网站
 * @apiParam {String} userName 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} importance 重要性
 * @apiParam {String} notes 备注
 * @apiUse baseHasLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *	{
 *	    "type": "social",
 *	    "timestamp": 1543578242441,
 *	    "accessToken": 'e2b06cd',
 *	    "uid": 'user-uid'
 *	}
 *
 * @apiUse baseSuccessParams
 * @apiSuccess {String} data._id 密码存储id
 *
 * @apiSuccessExample {json} 正确返回值:
 *	{
 *	    "data": [{
 *	        "_id": "_id"
 *	    }],
 *	    "errno": 0,
 *	    "errmsg": "获取密码列表成功"
 *	}
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
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
				this.success({
					_id: result._id
				}, '新增密码数据信息成功');
			} else {
				this.fail(401, '已存在相同密码数据信息');
			}
		}
	}
}
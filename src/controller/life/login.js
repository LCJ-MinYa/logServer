const BaseRest = require('./rest.js');

/**
 * @api {post} /life/login 用户登录
 * @apiDescription 根据用户信息（email, password）登录恣意游
 * @apiGroup loginGroup
 *
 * @apiParam {String} email 用户邮箱地址
 * @apiParam {String} password 用户密码
 * @apiUse baseUnLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *	{
 *	    "email": "ceshi@ziyiu.com",
 *	    "password": "123456",
 *	    "timestamp": 1543578242441,
 *	    "accessToken": 'e2b06cd',
 *	    "uid": ''
 *	}
 *
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} 正确返回值:
 *	{
 *	    "data": {
 *	        "uid": "5c097013-3d8a-482f-8131-50a833983175",
 *	        "userName": "123",
 *	    },
 *	    "errno": 0,
 *	    "errmsg": "登录成功"
 *	}
 * @apiErrorExample {json} 错误返回值:
 *	{
 *		"errno": 401,
 *		"errmsg": "用户名或密码错误!"
 *	}
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
export default class Login extends BaseRest {
	async indexAction() {
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
				return false;
			} else {
				this.fail(401, '用户名或密码错误!');
				return false;
			}
		} else {
			this.fail(401, '用户名或密码错误!');
			return false;
		}
	}
}
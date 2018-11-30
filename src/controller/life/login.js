const BaseRest = require('./rest.js');

/**
 * @api {get} /test 接口测试
 * @apiDescription 根据ID（id）获取列表信息
 * @apiGroup test APIs
 *
 * @apiParam {Number} id 任务ID
 * @apiParam {Number} [page] 页数
 * @apiParam {Number} [perpage] 每页的条数
 *
 * @apiParamExample {string} 请求参数格式:
 *    ?id=123&page=1&perpage=20
 *
 * @apiVersion 1.0.0
 * @apiErrorExample {json} 错误返回值:
 *     {
 *        "code": 10003,
 *        "msg": "ParametersError [Method]:get_tests参数错误!",
 *        "error": {
 *            "id": "",
 *            "page": "",
 *            "perpage": ""
 *        },
 *       "status": "fail"
 *     }
 * @apiSuccessExample {json} 正确返回值:
 *     {
 *   "code": 0,
 *   "msg": "OK ",
 *   "data": [
 *       {
 *           "id": "622051004185471233",
 *           "testCode": "000050",
 *       }
 *   ],
 *   "status": "ok",
 *   "count": "14"
 *   }
 */
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
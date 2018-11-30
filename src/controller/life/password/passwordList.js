const BaseRest = require('../rest.js');

/**
 * @api {post} /password/passwordList 获取密码存储列表
 * @apiDescription 根据密码类型（type）获取密码存储列表
 * @apiGroup passwordGroup
 *
 * @apiParam {String} type 密码类型
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
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} 正确返回值:
 *	{
 *	    "data": [{
 *	        "_id": "_id",
 *	        "userName": "userName", //用户名
 *	        "importance": "importance", //重要性
 *	        "notes": "notes", //备注
 *	        "password": "password", //密码
 *	        "timestamp": "timestamp", //创建时间
 *	        "title": "title", //标题
 *	        "type": "type", //密码类型
 *	        "uid": "uid", //用户uid
 *	        "url": "url", //密码所属网站
 *	    }],
 *	    "errno": 0,
 *	    "errmsg": "获取密码列表成功"
 *	}
 *  @apiUse CODE_UID_203
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */
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
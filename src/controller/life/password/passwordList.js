const BaseRest = require('../rest.js');

/**
 * @api {post} /life/password/passwordList 密码列表
 * @apiDescription 根据密码类型（type）获取密码存储列表
 * @apiGroup passwordGroup
 * @apiVersion 1.0.0
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
 * @apiUse baseSuccessParams
 * @apiSuccess {String} data._id 密码存储id
 * @apiSuccess {String} data.userName 用户名
 * @apiSuccess {String} data.importance 重要性
 * @apiSuccess {String} data.notes 备注
 * @apiSuccess {String} data.password 密码
 * @apiSuccess {String} data.timestamp 创建时间
 * @apiSuccess {String} data.title 标题
 * @apiSuccess {String} data.type 密码类型
 * @apiSuccess {String} data.uid 用户uid
 * @apiSuccess {String} data.url 密码所属网站
 *
 * @apiSuccessExample {json} 正确返回值:
 *	{
 *	    "data": [{
 *	        "_id": "_id",
 *	        "userName": "userName",
 *	        "importance": "importance",
 *	        "notes": "notes",
 *	        "password": "password",
 *	        "timestamp": "timestamp",
 *	        "title": "title",
 *	        "type": "type",
 *	        "uid": "uid",
 *	        "url": "url",
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
		const PasswordList = think.mongo('PasswordList', 'mongoPassword');
		let param = this.post();
		let result = await PasswordList.where({
			uid: param.uid,
			type: param.type,
		}).order('timestamp').select();
		this.success(result, '获取密码列表成功');
		return false;
	}
}
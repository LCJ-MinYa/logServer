import Utils from '../../../utils/utils'
const BaseRest = require('../rest.js');

/**
 * @api {get} /life/search/searchSuggestion 导航关键字搜索
 * @apiDescription 根据用户输入的关键字（wd）返回百度结果
 * @apiGroup searchGroup
 *
 * @apiParam {String} wd 用户输入的关键字
 * @apiUse baseUnLoginParams
 *
 * @apiParamExample {string} 请求参数格式:
 *  {
 *      "wd": "a",
 *      "timestamp": 1543578242441,
 *      "accessToken": 'e2b06cd',
 *      "uid": ''
 *  }
 *
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} 正确返回值:
 *  {
 *      "data": [{
 *          "value": "爱奇艺"
 *      },{
 *          "value": "adidas字体"
 *      },{
 *          "value": "阿里云"
 *      },{
 *          "value": "阿里巴巴"
 *      },{
 *          "value": "安居客"
 *      },{
 *          "value": "artifact"
 *      }...],
 *      "errno": 0,
 *      "errmsg": "获取搜索建议文本成功"
 *  }
 *  @apiUse CODE_REFUSE_401
 *  @apiUse CODE_METHOD_GET_403
 *  @apiUse CODE_METHOD_POST_403
 */

export default class extends BaseRest {
    async indexAction() {
        const HttpRequest = think.service('httpRequest');
        const param = this.get();
        if (!param.wd) {
            param.wd = '';
        } else {
            param.wd = encodeURI(param.wd);
        }
        let result = await HttpRequest.GetService('http://suggestion.baidu.com/su?ie=UTF-8&wd=' + param.wd);
        let jsonStr = Utils.getBetweenTwoStringContent(result.body, '[', ']', true);
        try {
            let resultArr = JSON.parse(jsonStr.replace(/\\/g, ''));
            for (let i = 0; i < resultArr.length; i++) {
                resultArr[i] = {
                    value: resultArr[i]
                }
            }
            this.success(resultArr, '获取搜索建议文本成功');
            return false;
        } catch (err) {
            console.log(err);
            this.fail(500, '解析搜索结果失败');
            return false;
        }
    }
}
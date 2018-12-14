exports.__esModule = true;

var _utils = require('../../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

exports.default = class extends BaseRest {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this.isGet) {
                const HttpRequest = think.service('httpRequest');
                const param = _this.get();
                if (!param.wd) {
                    param.wd = '';
                } else {
                    param.wd = encodeURI(param.wd);
                }
                let result = yield HttpRequest.GetService('http://suggestion.baidu.com/su?ie=UTF-8&wd=' + param.wd);
                let jsonStr = _utils2.default.getBetweenTwoStringContent(result.body, '[', ']', true);
                try {
                    let resultArr = JSON.parse(jsonStr.replace(/\\/g, ''));
                    for (let i = 0; i < resultArr.length; i++) {
                        resultArr[i] = {
                            value: resultArr[i]
                        };
                    }
                    _this.success(resultArr, '获取搜索建议文本成功');
                } catch (err) {
                    console.log(err);
                    _this.fail(500, '解析搜索结果失败');
                }
            }
        })();
    }
};
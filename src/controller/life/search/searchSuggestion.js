import Utils from '../../../utils/utils'
const BaseRest = require('../rest.js');

export default class extends BaseRest {
    async indexAction() {
        if (this.isGet) {
            const HttpRequest = think.service('httpRequest');
            const param = this.get();
            if (!param.wd) {
                param.wd = '';
            }
            let result = await HttpRequest.GetService('http://suggestion.baidu.com/su?ie=UTF-8&wd=' + param.wd);
            let jsonStr = Utils.getBetweenTwoStringContent(result.body, '[', ']', true);
            try {
                let resultArr = JSON.parse(jsonStr);
                for (let i = 0; i < resultArr.length; i++) {
                    resultArr[i] = {
                        value: resultArr[i]
                    }
                }
                this.success(resultArr, '获取搜索建议文本成功');
            } catch (err) {
                this.fail(500, '解析搜索结果失败');
            }
        }
    }
}
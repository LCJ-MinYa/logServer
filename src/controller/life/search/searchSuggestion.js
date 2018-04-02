const BaseRest = require('../rest.js');

export default class extends BaseRest {
    async indexAction() {
        if (this.isGet) {
            const HttpRequest = think.service('httpRequest');
            const param = this.get();
            HttpRequest.GetService('http://suggestion.baidu.com/su', {
                    wd: 'aa'
                })
                .then((result) => {
                    console.log(result);
                })
        }
    }
}
'use strict';

exports.__esModule = true;

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HttpRequest extends think.Service {
    constructor() {
        super();
    }
    /**
     * [PostService 获取POST服务]
     * @param {[type]} url  [description]
     * @param {[type]} data [description]
     */
    PostService(url, data) {
        if (think.isEmpty(url)) {
            console.log("URL不能为空!");
        } else {
            let postPromisify = think.promisify(_request2.default.post);
            return postPromisify({
                url: url,
                form: data
            });
        }
    }
    /**
     * [GetService 获取GET服务]
     * @param {[type]}    url  [description]
     * @param {...[type]} data [description]
     */
    GetService(url, ...data) {
        if (think.isEmpty(url)) {
            console.log("URL不能为空!");
        } else {
            let getPromisify = think.promisify(_request2.default.get);
            if (think.isEmpty(data)) {
                return getPromisify({
                    url: url
                });
            } else {
                return getPromisify({
                    url: url,
                    form: data
                });
            }
        }
    }
}
exports.default = HttpRequest;
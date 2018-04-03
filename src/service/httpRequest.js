'use strict';
import request from "request";

export default class HttpRequest extends think.Service {
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
            let postPromisify = think.promisify(request.post);
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
            let getPromisify = think.promisify(request.get);
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
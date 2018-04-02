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
        console.log("===========参数 开始===========");
        console.log("接口地址URL: ", url);
        console.log("接口请求类型: ", "POST");
        console.log("接口参数数据: ", data);
        console.log("===========参数 结束===========");
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
        console.log("===========参数 开始===========");
        console.log("接口地址URL: ", url);
        console.log("接口请求类型: ", "GET");
        console.log("接口参数数据: ", data);
        console.log("===========参数 结束===========");
        if (think.isEmpty(url)) {
            console.log("URL不能为空!");
        } else {
            let getPromisify = think.promisify(request.get);
            if (think.isEmpty(data)) {
                console.log("API服务请求开始时间: ", new Date().valueOf());
                return getPromisify({
                    url: url
                });
            } else {
                console.log("API服务请求开始时间: ", new Date().valueOf());
                return getPromisify({
                    url: url,
                    form: data
                });
            }
        }
    }
}
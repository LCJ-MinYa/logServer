'use strict';
const crypto = require('crypto');

export default {
    //邮箱地址正则表达式判断
    matchEmail(string) {
        var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return reg.test(string);
    },
    /**
     * [getBetweenTwoStringContent 获取两个指定字符串之间的内容，可自定义是否在首尾加上指定字符串]
     * @param  {[string]}  strContent               [需要操作的字符串]
     * @param  {[string]}  firstStr                 [首字符串]
     * @param  {[string]}  lastStr                  [尾字符串]
     * @param  {Boolean} isHaveFirstStrAndLastStr   [是否包含首尾字符串]
     * @return {[string]}                           [获取的字符串]
     */
    getBetweenTwoStringContent(strContent, firstStr, lastStr, isHaveFirstStrAndLastStr) {
        if (typeof(strContent) !== 'string') {
            return '';
        }
        let result = strContent.split(firstStr)[1].split(lastStr)[0];
        if (isHaveFirstStrAndLastStr) {
            result = firstStr + result + lastStr;
        }
        return result;
    },
    /**
     * [sha1Secret github中校验secret的加密方法]
     * @param  {[string]} secret [github中设置的密钥]
     * @param  {[object]} body   [thinkjs中的this.post()]
     * @return {[string]}        [生成的校验值]
     */
    sha1Secret(secret, body) {
        return crypto.createHmac('sha1', secret).update(JSON.stringify(body)).digest().toString('hex');
    }
}
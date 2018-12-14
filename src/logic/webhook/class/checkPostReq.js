export default class CheckPostReq extends think.Logic {
    __before() {
        if (this.isGet) {
            this.fail(403, '请求不支持GET方法！');
            return false;
        }
    }
}
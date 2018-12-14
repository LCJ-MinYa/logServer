import CheckUserPermission from './checkUserPermission';

export default class CheckPostReq extends CheckUserPermission {
    __before() {
        if (this.isGet) {
            this.fail(403, '请求不支持GET方法！');
            return false;
        }
        if (this.isPost) {
            const param = this.post();
            if (this.shouldLogin(param) === false) {
                return false;
            }
            if (this.verifyAccessToken(param) === false) {
                return false;
            }
        }
    }
}
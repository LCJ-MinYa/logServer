import CheckUserPermission from './checkUserPermission';

export default class CheckPostReq extends CheckUserPermission {
    __before() {
        if (this.isPost) {
            this.fail(403, '请求不支持POST方法！');
            return false;
        }
        if (this.isGet) {
            const param = this.get();
            if (this.shouldLogin(param) === false) {
                return false;
            }
            if (this.verifyAccessToken(param) === false) {
                return false;
            }
        }
    }
}
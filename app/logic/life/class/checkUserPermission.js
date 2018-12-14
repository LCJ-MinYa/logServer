exports.__esModule = true;
class checkUserPermission extends think.Logic {
    __before() {
        if (this.isPost) {
            const param = this.post();
            if (!param.uid || param.uid == 'undefined') {
                this.fail(203, '未获取到用户信息，请重新登陆!');
                return false;
            }
        }
    }
}
exports.default = checkUserPermission;
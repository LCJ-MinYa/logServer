import CheckPassword from './class/checkPassword'

export default class UpdataPassword extends CheckPassword {
    __before() {
        if (this.isPost) {
            const param = this.post();
            if (!param._id) {
                this.fail(400, '未匹配到该密码信息!');
                return false;
            }
        }
    }
}
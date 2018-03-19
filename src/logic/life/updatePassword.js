import CheckPassword from './class/checkPassword'

export default class UpdataPassword extends CheckPassword {
    __before() {
        if (this.isPost) {
            const param = this.post();
            if (!param._id) {
                this.fail(400, '未找到该密码信息记录!');
                return false;
            }
        }
    }
}
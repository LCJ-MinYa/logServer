import CheckUserPermission from '../class/checkUserPermission';

export default class DeletePassword extends CheckUserPermission {
    indexAction() {
        if (this.isPost) {
            const param = this.post();
            if (!param.uid) {
                this.fail(400, '未获取到用户信息，请重新登陆!');
                return false;
            }
            if (!param._id) {
                this.fail(400, '未获取到密码信息，删除失败!');
                return false;
            }
        }
    }
}
import CheckPostReq from '../class/checkPostReq';

export default class PasswordList extends CheckPostReq {
    indexAction() {
        const param = this.post();
        if (!param.type) {
            this.fail(400, '请选择查看密码分类!');
            return false;
        }
    }
}
import CheckUserPermission from '../class/checkUserPermission';

export default class AddTaskList extends CheckUserPermission {
    __before() {
        if (this.isPost) {
            const param = this.post();
            if (!param.text) {
                this.fail(400, '项目名称不能为空!');
                return false;
            }
        }
    }
}
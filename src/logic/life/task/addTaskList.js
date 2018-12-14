import CheckPostReq from '../class/checkPostReq';

export default class AddTaskList extends CheckPostReq {
    indexAction() {
        const param = this.post();
        if (!param.text) {
            this.fail(400, '项目名称不能为空!');
            return false;
        }
    }
}
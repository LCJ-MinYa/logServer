import CheckPostReq from '../class/checkPostReq';

export default class CreatTaskItem extends CheckPostReq {
    indexAction() {
        const param = this.post();
        if (!param.title) {
            this.fail(400, '任务名称不能为空!');
            return false;
        }
        if (!param.type) {
            this.fail(400, '所属项目不能为空!');
            return false;
        }
    }
}
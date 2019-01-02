import CheckPostReq from '../class/checkPostReq';

export default class BeginTask extends CheckPostReq {
    indexAction() {
        const param = this.post();
        if (!param._id) {
            this.fail(400, '任务id不存在!');
            return false;
        }
        if (!param.type) {
            this.fail(400, '任务所属项目不存在!');
            return false;
        }
        if (!param.isComplete) {
            this.fail(400, '任务类型不存在!');
            return false;
        }
        if (param.isComplete === 'true') {
            this.fail(400, '已完成任务不能开始!');
            return false;
        }
    }
}
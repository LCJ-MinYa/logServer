import CheckPostReq from '../class/checkPostReq';

export default class CompleteTask extends CheckPostReq {
    indexAction() {
        const param = this.post();
        if (!param.completeList) {
            this.fail(400, '完成任务列表不存在!');
            return false;
        }
        param.completeList = JSON.parse(param.completeList);
        if (!Array.isArray(param.completeList) || param.completeList.length === 0) {
            this.fail(400, '非法的完成任务列表!');
            return false;
        }
        for (let i = 0; i < param.completeList.length; i++) {
            if (param.completeList[i].isComplete === true) {
                this.fail(400, '任务列表包含已完成任务!');
                return false;
            }
        }
    }
}
const BaseRest = require('../rest.js');

export default class TaskList extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskList', 'mongoPassword');
        let param = this.post();
        let result = await PasswordList.where({
            uid: param.uid
        }).order('timestamp').select();
        this.success(result, '获取任务项目列表成功');
        return false;
    }
}
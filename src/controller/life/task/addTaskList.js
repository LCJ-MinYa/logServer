const BaseRest = require('../rest.js');

export default class AddTaskList extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskList', 'mongoPassword');
        let param = this.post();
        delete param.accessToken;
        let result = await PasswordList.where({
            uid: param.uid,
            text: param.text
        }).thenAdd(param);
        if (result.type == 'add') {
            this.success({
                _id: result._id
            }, '新增任务项目成功');
            return false;
        } else {
            this.fail(401, '已存在相同任务项目名称');
            return false;
        }
    }
}
const BaseRest = require('../rest.js');

export default class CreatTaskItem extends BaseRest {
    async indexAction() {
        const PasswordList = think.mongo('TaskItem', 'mongoPassword');
        let param = this.post();
        delete param.accessToken;
        let result = await PasswordList.where({
            uid: param.uid,
            title: param.title,
            type: param.type
        }).thenAdd(param);
        if (result.type == 'add') {
            this.success({
                _id: result._id
            }, '项目新增任务成功');
            return false;
        } else {
            this.fail(401, '任务项目中已存在相同任务名称');
            return false;
        }
    }
}
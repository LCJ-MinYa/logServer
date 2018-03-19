const BaseRest = require('./rest.js');

export default class DeletePassword extends BaseRest {
    async indexAction() {
        if (this.isPost) {
            let param = this.post();
            const PasswordList = think.mongo('PasswordList', 'mongoPassword');
            let result = await PasswordList.where({
                _id: param._id
            }).delete();
            if (result) {
                this.success({}, '删除密码数据信息成功');
            } else {
                this.fail(401, '删除密码数据信息失败');
            }
        }
    }
}
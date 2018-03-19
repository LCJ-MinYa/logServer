const BaseRest = require('./rest.js');

export default class UpdataPassword extends BaseRest {
    async indexAction() {
        if (this.isPost) {
            const PasswordList = think.mongo('PasswordList', 'mongoPassword');
            let param = this.post();
            delete param.accessToken;
            let result = await PasswordList.where({
                _id: param._id
            }).select();
            console.log(result);
            console.log(param);
            // if (result.type == 'add') {
            //     this.success({
            //         _id: result._id
            //     }, '新增密码数据信息成功');
            // } else {
            //     this.fail(401, '已存在相同密码数据信息');
            // }
        }
    }
}
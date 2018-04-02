const BaseRest = require('../rest.js');

export default class UpdataPassword extends BaseRest {
    async indexAction() {
        if (this.isPost) {
            const PasswordList = think.mongo('PasswordList', 'mongoPassword');
            let param = this.post();
            delete param.accessToken;
            let result = await PasswordList.where({
                _id: param._id
            }).select();
            if (result.length !== 0) {
                let shouldUpdate = false;
                for (let i in param) {
                    if (i == 'timestamp' || i == '_id' || i == 'uid') {
                        continue;
                    }
                    if (param[i] !== result[0][i]) {
                        shouldUpdate = true;
                    }
                }
                if (shouldUpdate) {
                    let affectedRows = await PasswordList.where({
                        _id: param._id
                    }).update(param);
                    if (affectedRows) {
                        this.success({}, '修改密码数据信息成功');
                    } else {
                        this.fail(401, '修改密码数据信息失败');
                    }
                } else {
                    this.fail(401, '密码信息相同,不需要修改');
                }
            } else {
                this.fail(401, '未匹配到该密码信息');
            }
        }
    }
}
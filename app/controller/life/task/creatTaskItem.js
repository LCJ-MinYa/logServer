exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const BaseRest = require('../rest.js');

class CreatTaskItem extends BaseRest {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this.isPost) {
                const PasswordList = think.mongo('TaskItem', 'mongoPassword');
                let param = _this.post();
                delete param.accessToken;
                let result = yield PasswordList.where({
                    uid: param.uid,
                    title: param.title,
                    type: param.type
                }).thenAdd(param);
                if (result.type == 'add') {
                    _this.success({
                        _id: result._id
                    }, '项目新增任务成功');
                } else {
                    _this.fail(401, '任务项目中已存在相同任务名称');
                }
            }
        })();
    }
}
exports.default = CreatTaskItem;
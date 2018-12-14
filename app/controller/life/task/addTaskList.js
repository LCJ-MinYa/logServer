exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const BaseRest = require('../rest.js');

class AddTaskList extends BaseRest {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const PasswordList = think.mongo('TaskList', 'mongoPassword');
            let param = _this.post();
            delete param.accessToken;
            let result = yield PasswordList.where({
                uid: param.uid,
                text: param.text
            }).thenAdd(param);
            if (result.type == 'add') {
                _this.success({
                    _id: result._id
                }, '新增任务项目成功');
                return false;
            } else {
                _this.fail(401, '已存在相同任务项目名称');
                return false;
            }
        })();
    }
}
exports.default = AddTaskList;
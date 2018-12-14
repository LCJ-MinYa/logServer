exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const BaseRest = require('../rest.js');

class TaskList extends BaseRest {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this.isPost) {
                const PasswordList = think.mongo('TaskList', 'mongoPassword');
                let param = _this.post();
                let result = yield PasswordList.where({
                    uid: param.uid
                }).order('timestamp').select();
                _this.success(result, '获取任务项目列表成功');
            }
        })();
    }
}
exports.default = TaskList;
exports.__esModule = true;

var _checkPostReq = require('../class/checkPostReq');

var _checkPostReq2 = _interopRequireDefault(_checkPostReq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddTaskList extends _checkPostReq2.default {
    indexAction() {
        const param = this.post();
        if (!param.text) {
            this.fail(400, '项目名称不能为空!');
            return false;
        }
    }
}
exports.default = AddTaskList;
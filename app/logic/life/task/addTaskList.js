exports.__esModule = true;

var _checkUserPermission = require('../class/checkUserPermission');

var _checkUserPermission2 = _interopRequireDefault(_checkUserPermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddTaskList extends _checkUserPermission2.default {
    indexAction() {
        if (this.isPost) {
            const param = this.post();
            if (!param.text) {
                this.fail(400, '项目名称不能为空!');
                return false;
            }
        }
    }
}
exports.default = AddTaskList;
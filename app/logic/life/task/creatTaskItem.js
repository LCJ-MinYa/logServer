exports.__esModule = true;

var _checkUserPermission = require('../class/checkUserPermission');

var _checkUserPermission2 = _interopRequireDefault(_checkUserPermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreatTaskItem extends _checkUserPermission2.default {
    indexAction() {
        if (this.isPost) {
            const param = this.post();
            if (!param.title) {
                this.fail(400, '任务名称不能为空!');
                return false;
            }
            if (!param.type) {
                this.fail(400, '所属项目不能为空!');
                return false;
            }
        }
    }
}
exports.default = CreatTaskItem;
exports.__esModule = true;

var _checkPostReq = require('../class/checkPostReq');

var _checkPostReq2 = _interopRequireDefault(_checkPostReq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreatTaskItem extends _checkPostReq2.default {
    indexAction() {
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
exports.default = CreatTaskItem;
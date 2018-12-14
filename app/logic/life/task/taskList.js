exports.__esModule = true;

var _checkUserPermission = require('../class/checkUserPermission');

var _checkUserPermission2 = _interopRequireDefault(_checkUserPermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaskList extends _checkUserPermission2.default {}
exports.default = TaskList;
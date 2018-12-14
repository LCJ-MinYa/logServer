exports.__esModule = true;

var _checkGetReq = require('../class/checkGetReq');

var _checkGetReq2 = _interopRequireDefault(_checkGetReq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _checkGetReq2.default {
    constructor(ctx) {
        super(ctx);
        ctx.shouldLogin = false;
    }
};
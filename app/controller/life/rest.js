var _sha = require('../../utils/sha1');

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Controller {
    static get _REST() {
        return true;
    }

    constructor(ctx) {
        super(ctx);
        this.resource = this.getResource();
        this.id = this.getId();
        this.modelInstance = this.mongo(this.resource);
    }
    __before() {
        const param = this.isGet ? this.get() : this.post();
        if (param.accessToken) {
            // if (param.timestamp) {
            //     let newTimestamp = new Date().getTime();
            //     let oldTimestamp;
            //     console.log('这里需要判断请求的时间是否在一分钟之内，防止过期请求,同时过滤来自api.ziyiu.com允许测试api过期请求');
            // }
            if (param.accessToken !== _sha2.default.sha1(param.uid + param.timestamp).substring(3, 10)) {
                this.fail(401, '瞎请求干啥，心疼我的服务器!');
                return false;
            }
        } else {
            this.fail(401, '瞎请求干啥，心疼我的服务器!');
            return false;
        }

        if (this.isGet) {
            this.fail(403, '请求不支持GET方法！');
        }
        if (this.isPost) {
            this.fail(403, '请求不支持POST方法！');
        }
    }
    /**
     * get resource
     * @return {String} [resource name]
     */
    getResource() {
        return this.ctx.controller;
    }
    getId() {
        const id = this.get('id');
        if (id && (think.isString(id) || think.isNumber(id))) {
            return id;
        }
        const last = this.ctx.path.split('/').slice(-1)[0];
        if (last !== this.resource) {
            return last;
        }
        return '';
    }
    getAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let data;
            if (_this.id) {
                const pk = _this.modelInstance.pk;
                data = yield _this.modelInstance.where({
                    [pk]: _this.id
                }).find();
                return _this.success(data);
            }
            data = yield _this.modelInstance.select();
            return _this.success(data);
        })();
    }
    /**
     * put resource
     * @return {Promise} []
     */
    postAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const pk = _this2.modelInstance.pk;
            const data = _this2.post();
            delete data[pk];
            if (think.isEmpty(data)) {
                return _this2.fail('data is empty');
            }
            const insertId = yield _this2.modelInstance.add(data);
            return _this2.success({
                id: insertId
            });
        })();
    }
    /**
     * delete resource
     * @return {Promise} []
     */
    deleteAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (!_this3.id) {
                return _this3.fail('params error');
            }
            const pk = _this3.modelInstance.pk;
            const rows = yield _this3.modelInstance.where({
                [pk]: _this3.id
            }).delete();
            return _this3.success({
                affectedRows: rows
            });
        })();
    }
    /**
     * update resource
     * @return {Promise} []
     */
    putAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (!_this4.id) {
                return _this4.fail('params error');
            }
            const pk = _this4.modelInstance.pk;
            const data = _this4.post();
            delete data[pk];
            if (think.isEmpty(data)) {
                return _this4.fail('data is empty');
            }
            const rows = yield _this4.modelInstance.where({
                [pk]: _this4.id
            }).update(data);
            return _this4.success({
                affectedRows: rows
            });
        })();
    }
    __call() {}
};
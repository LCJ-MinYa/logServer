import encryp from '../../../utils/sha1';

export default class checkUserPermission extends think.Logic {
    constructor(ctx) {
        super(ctx);
        ctx.shouldLogin = true;
    }
    shouldLogin(param) {
        if (this.ctx.shouldLogin) {
            if (!param.uid || param.uid == 'undefined') {
                this.fail(203, '未获取到用户信息，请重新登陆!');
                return false;
            }
        }
    }
    verifyAccessToken(param) {
        if (param.accessToken) {
            // if (param.timestamp) {
            //     let newTimestamp = new Date().getTime();
            //     let oldTimestamp;
            //     console.log('这里需要判断请求的时间是否在一分钟之内，防止过期请求,同时过滤来自api.ziyiu.com允许测试api过期请求');
            // }
            if (param.accessToken !== encryp.sha1(param.uid + param.timestamp).substring(3, 10)) {
                this.fail(401, '瞎请求干啥，心疼我的服务器!');
                return false;
            }
        } else {
            this.fail(401, '瞎请求干啥，心疼我的服务器!');
            return false;
        }
    }
}
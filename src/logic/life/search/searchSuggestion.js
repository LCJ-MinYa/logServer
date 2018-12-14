import CheckGetReq from '../class/checkGetReq';

export default class extends CheckGetReq {
    constructor(ctx) {
        super(ctx);
        ctx.shouldLogin = false;
    }
}
const mysql = require('../middleware/mysql');
const token_verify = require('../middleware/token_verify');

module.exports = async (ctx, next) => {

    const token = ctx.header.authorization;

    if (token) {
        // 解密，获取payload
        let payload = await token_verify(token);
        ctx.body = {
            payload
        }
    } else {
        ctx.body = {
            message: ctx,
            code: -1
        }
    }

};

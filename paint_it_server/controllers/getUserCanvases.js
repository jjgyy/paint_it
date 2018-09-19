const mysql = require('../middleware/mysql');
const token_verify = require('../middleware/token_verify');

module.exports = async (ctx) => {

    const token = ctx.header.authorization;

    if (token) {

        let payload = await token_verify(token);

        ctx.body = await mysql('user_canvas').select('*').where({
            user_id: payload.user_id
        });

    } else {
        ctx.body = {
            message: ctx,
            code: -1
        }
    }

};

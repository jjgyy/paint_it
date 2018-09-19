const mysql = require('../middleware/mysql');
const token_verify = require('../middleware/token_verify');

module.exports = async (ctx) => {

    const token = ctx.header.authorization;
    let payload = await token_verify(token);

    if (token) {
        // 解密，获取payload
        let canvas_id = await mysql('canvases')
            .insert({
                trail_record: ''
            })
            .returning('canvas_id');

        await mysql('user_canvas')
            .insert({
                user_id: payload.user_id,
                canvas_id: canvas_id[0]
            });

        ctx.body = {
            canvas_id: canvas_id[0]
        }

    } else {
        ctx.body = {
            message: ctx,
            code: -1
        }
    }

};

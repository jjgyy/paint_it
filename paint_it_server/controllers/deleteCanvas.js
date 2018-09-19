const mysql = require('../middleware/mysql');

module.exports = async (ctx) => {

    const canvas_id = ctx.query.canvas_id;

    try {

        await mysql('canvases')
            .where({canvas_id: canvas_id})
            .del();

        await mysql('user_canvas')
            .where({canvas_id: canvas_id})
            .del();

        ctx.body = {
            message: '删除成功',
            code: 1
        }

    } catch (e) {
        ctx.body = {
            message: e.sqlMessage,
            code: -1
        }
    }

};

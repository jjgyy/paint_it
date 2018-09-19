const mysql = require('../middleware/mysql');

module.exports = async (ctx) => {

    const canvas_id = ctx.query.canvas_id;

    ctx.body = await mysql('canvases').select('*').where({
        canvas_id: canvas_id
    });

};

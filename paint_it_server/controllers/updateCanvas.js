const mysql = require('../middleware/mysql');

module.exports = async (ctx) => {

    const canvas_id = ctx.query.canvas_id,
          trail_record = ctx.query.trail_record;

    try {
        await mysql('canvases')
            .where('canvas_id', canvas_id)
            .update({
                trail_record: trail_record,
                thisKeyIsSkipped: undefined
            });
        ctx.body = {
            message: '保存成功',
            code: 1
        }
    } catch (e) {
        ctx.body = {
            message: '参数错误',
            code: -1
        }
    }

};

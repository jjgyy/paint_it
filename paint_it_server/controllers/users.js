const mysql = require('../middleware/mysql');

module.exports = async (ctx, next) => {
    ctx.body = await mysql.schema.hasTable('s');
};

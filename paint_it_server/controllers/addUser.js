const mysql = require('../middleware/mysql');

module.exports = async (ctx, next) => {

    const username = ctx.query.username,
          password = ctx.query.password;

    try {

        ctx.body = await mysql('users')
            .insert({
                username: username,
                password: password
            })
            .returning('id');
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: e.sqlMessage  //数据库报错信息
            }
        }
    }

};

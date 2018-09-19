const mysql = require('../middleware/mysql');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (ctx, next) => {

    const username = ctx.query.username,
          password = ctx.query.password;

    await mysql('users').select('id').where({
        username: username,
        password: password
    })
        .then(res => {
            ctx.body = {
                message: res
            };
            if(res[0].id) {
                let userToken = {
                    id: res[0].id,
                    username: username
                };
                const token = jwt.sign(userToken, config.token.secret, {expiresIn: '6h'});  //token签名 有效期为6小时
                ctx.body = {
                    message: '获取token成功',
                    code: 1,
                    token
                }
            } else {
                ctx.body = {
                    message: '参数错误',
                    code: -1
                }
            }
        });

};
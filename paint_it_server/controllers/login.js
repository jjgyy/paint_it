const mysql = require('../middleware/mysql');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (ctx) => {

    const email = ctx.query.email,
          password = ctx.query.password;

    await mysql('users').select('user_id').where({
        email: email,
        password: password
    })
        .then(res => {
            if(res[0].user_id) {
                let userToken = {
                    user_id: res[0].user_id,
                    email: email
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

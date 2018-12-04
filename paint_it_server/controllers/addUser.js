const {validateTransport: validateTransport} = require('../middleware/mailer');
const mysql = require('../middleware/mysql');
const token_verify = require('../middleware/token_verify');
const config = require('../config');


module.exports = async (ctx) => {

    const email = ctx.query.email,
          password = ctx.query.password,
          identifyCode = ctx.query.identifyCode;

    const token = ctx.header.authorization;

    //检查表单
    if (!email || !password || !identifyCode) {
        ctx.body = {
            code: -1,
            data: {
                msg: '缺少表单信息'
            }
        };
        return;
    }

    //检查token
    if (token === undefined || !token) {
        ctx.body = {
            code: -2,
            msg: 'token为空，尝试重新获取验证码'
        };
        return;
    }


    // 解密，获取payload
    let payload = await token_verify(token);

    console.log(payload);

    if (payload.identifyEmail !== email) {
        ctx.body = {
            code: -3,
            msg: '邮箱不符'
        };
        return;
    }

    if (parseInt(payload.identifyCode) !== parseInt(identifyCode)) {
        ctx.body = {
            code: -4,
            msg: '验证码错误'
        };
        return;
    }

    //插入数据库
    try {

        const countHasUser = await mysql('users')
            .count('* as hasUser')
            .where({
                email: email
            });


        if (!!countHasUser[0].hasUser) {
            ctx.body = {
                code: -5,
                msg: '邮箱已注册'
            };
            return;
        }

        await mysql('users')
            .insert({
                email: email,
                password: password
            });

        //邮件配置
        let mailOptions = {
            from: config.validate_mailer.from,
            to: email,
            subject: 'paint it! 注册成功提醒',
            html: '亲爱的<b>' + email + '</b>，您已注册成功，欢迎您进入 paint it! 大家庭'
        };

        validateTransport.sendMail(mailOptions, function (err, response) {
            if (err) { console.log(err) }
        });

        ctx.body = {
            code: 1,
            msg: '注册成功'
        }

    } catch (e) {
        ctx.state = {
            code: -6,
            data: {
                msg: e.sqlMessage  //数据库报错信息
            }
        }
    }

};

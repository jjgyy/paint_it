const {validateTransport: validateTransport} = require('../middleware/mailer');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (ctx) => {

    const email = ctx.query.email;

    if (!email) {
        ctx.body = {
            code: -1,
            msg: '缺少表单信息'
        };
        return;
    }

    //生成6位随机数
    let identifyInfo = {
        identifyCode: parseInt(Math.random() * 899999 + 100000),
        identifyEmail: email
    };

    const token = jwt.sign(identifyInfo, config.token.secret, {expiresIn: '1h'});  //token签名 有效期为1小时

    ctx.body = {
        msg: '成功，等待邮箱收取',
        success: 1,
        token
    };

    //邮件配置
    let mailOptions = {
        from: config.validate_mailer.from,
        to: email,
        subject: 'paint it! 注册邮箱验证',
        html: '验证码: <b>' + identifyInfo.identifyCode + '</b>'
    };

    validateTransport.sendMail(mailOptions, function (err, response) {
        if (err) { console.log(err) }
    });

};

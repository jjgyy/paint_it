const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
var cors = require('koa2-cors');

const jwtKoa = require('koa-jwt');

const configs = require('./config');

// middlewares
app.use(cors());
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(__dirname + '/public')));

app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// app.use(views(__dirname + '/views-ejs', {
//   extension: 'ejs'
// }));


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// path数组中的路径不需要jwt验证
app.use(jwtKoa({secret: configs.token.secret}).unless({
    path: configs.token.path
}));

// 引入路由分发
const router = require('./routes');
app.use(router.routes(), router.allowedMethods());


app.on('error', function(err, ctx){
  console.log(err);
});

/*
router
    .post('/api/login', async (ctx, next) => {
        const user = ctx.request.body;
        if(user && user.name) {
            let userToken = {
                name: user.name
            };
            const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
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
    })
    .get('/api/userInfo', async (ctx) => {
        const token = ctx.header.authorization;  // 获取jwt
        let payload;
        if (token) {
            payload = await verify(token.split(' ')[1], secret);  // // 解密，获取payload
            ctx.body = {
                payload
            }
        } else {
            ctx.body = {
                message: 'token 错误',
                code: -1
            }
        }
    });
    */

module.exports = app;

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

module.exports = app;

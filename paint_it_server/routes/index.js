/**
 * ajax 服务路由集合
 */
const router = require('koa-router')();
const controllers = require('../controllers');

router.get('/users', controllers.users);

module.exports = router;

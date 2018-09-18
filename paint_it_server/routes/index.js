/**
 * ajax 服务路由集合
 */
const router = require('koa-router')();
const controllers = require('../controllers');

router.get('/users', controllers.users);
router.get('/addUser', controllers.addUser);

module.exports = router;

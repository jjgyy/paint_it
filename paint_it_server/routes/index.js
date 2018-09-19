/**
 * ajax 服务路由集合
 */
const router = require('koa-router')();
const controllers = require('../controllers');

router.get('/login', controllers.login);

router.get('/addUser', controllers.addUser);

router.get('/getUserInfo', controllers.getUserInfo);

router.get('/getUserCanvases', controllers.getUserCanvases);

router.get('/addCanvas', controllers.addCanvas);

router.get('/updateCanvas', controllers.updateCanvas);

router.get('/deleteCanvas', controllers.deleteCanvas);

router.get('/getCanvas', controllers.getCanvas);

module.exports = router;

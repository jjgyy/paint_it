const multer = require('koa-multer');

const uploader = multer({ dest: 'uploads/' });

module.exports = uploader;

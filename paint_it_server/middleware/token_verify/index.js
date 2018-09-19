const configs = require('../../config');
const util = require('util');
const jwt = require('jsonwebtoken');
const verify = util.promisify(jwt.verify); // 解密

module.exports = async (token) => {
    return verify(token.split(' ')[1], configs.token.secret);
};


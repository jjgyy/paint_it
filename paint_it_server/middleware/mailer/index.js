const nodemailer = require('nodemailer');
const {validate_mailer: validate_mailer} = require('../../config');

const validateTransport = nodemailer.createTransport({
    host: validate_mailer.host,
    secureConnection: true,
    port: validate_mailer.port,
    auth: {
        user: validate_mailer.user,
        pass: validate_mailer.pass
    }
});

module.exports = {
    validateTransport: validateTransport
};

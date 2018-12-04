const CONF = {
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'paint_it',
        pass: '123456',
        char: 'utf8mb4'
    },
    token: {
        secret: 'jwt demo',
        path: [
            /^\/login/,
            /^\/addUser/,
            /^\/getIdentifyCode/
        ]
    },
    validate_mailer: {
        host: 'smtp.126.com',
        port: 465,
        user: 'paint_it_validate@126.com',
        pass: 'paintit16',
        from: 'paint_it_validate@126.com'
    }
};

module.exports = CONF;

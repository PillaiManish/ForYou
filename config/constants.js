require('dotenv').config()

const constants = {
    port: process.env.PORT || defaultPort,
    appName: process.env.APP_NAME,
    dbConfig: {
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASSWORD,
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        dbName: process.env.DB_NAME,
        dbMaxConn: process.env.DB_MAX_CONN,
        dbMaxConnUses: process.env.DB_MAX_CONN_USES,
    },
    redisConfig: {
        redisUsername: '',
        redisPassword: '',
        redisHost: process.env.REDIS_HOST,
        redisPort: process.env.REDIS_PORT,
    },
    email: {
        emailId: process.env.EMAIL_ID,
        emailPassword: process.env.EMAIL_PASSWORD
    },
    mailTypes: {
        sendEmailOTP: 'sendEmailOTP',
    },
    redisKeys: {

    },

};

module.exports = constants;
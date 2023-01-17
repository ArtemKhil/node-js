module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test-project',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretAccessWord',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWord',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD

}
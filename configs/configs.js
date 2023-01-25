module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test-project',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretAccessWord',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWord',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'CAATS',
    FORGOT_PASSCODE_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSCODE_ACTION_TOKEN_SECRET || 'FPATS'

}
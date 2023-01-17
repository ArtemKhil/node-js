const {WELCOME, FORGOT_PASSWORD} = require("../configs/email-actions.enum");

module.exports = {
    [WELCOME]: {
        subject: 'Welcome email',
        templateName: 'welcome'
    },

    [FORGOT_PASSWORD]: {
        subject: 'Forgot password email',
        templateName: 'forgot-password'
    }
};
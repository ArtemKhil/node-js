const {smsActionTypeEnum} = require("../enums");

module.exports = {
    [smsActionTypeEnum.WELCOME]: ({name}) => {
        return `Hi ${name},welcome on our platform`;
    },

    [smsActionTypeEnum.FORGOT_PASSWORD]: ({name}) => {
        return `Hi ${name},please check your email`;
    }
};
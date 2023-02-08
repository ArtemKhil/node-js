const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MyError = require("../errors/myError");
const {
    ACCESS_SECRET,
    REFRESH_SECRET,
    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET,
    FORGOT_PASSCODE_ACTION_TOKEN_SECRET
} = require("../configs/configs");
const {tokenTypeEnum} = require("../enums");
const tokenTypes = require('../configs/token-action.enum');


module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {

        const arePasswordsMatched = await bcrypt.compare(password, hashPassword);

        if (!arePasswordsMatched) {
            throw new MyError('Wrong email or password', 400);
        }
    },

    compareOldPasswords: (hashPassword, password) => {
        return bcrypt.compare(password, hashPassword);
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken, refreshToken
        }
    },

    generateActionToken: (actionType, dataToSign = {}) => {
        let secretWord = '';

        switch (actionType) {
            case tokenTypes.CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
            case tokenTypes.FORGOT_PASSCODE:
                secretWord = FORGOT_PASSCODE_ACTION_TOKEN_SECRET;
                break;
        }
        return jwt.sign(dataToSign, secretWord, {expiresIn: '7d'});
    },

    checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
        try {
            let secret = '';

            if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_SECRET;
            else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_SECRET;

            return jwt.verify(token, secret);

        } catch (e) {
            throw new MyError('Token is not valid', 401);
        }
    },

    checkActionToken: (token, actionType) => {
        try {
            let secretWord = '';

            switch (actionType) {
                case tokenTypes.CONFIRM_ACCOUNT:
                    secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                    break;
                case tokenTypes.FORGOT_PASSCODE:
                    secretWord = FORGOT_PASSCODE_ACTION_TOKEN_SECRET;
                    break;
            }

            jwt.verify(token, secretWord);
        } catch (e) {
            throw new MyError('Token is not valid', 401);
        }
    },

};
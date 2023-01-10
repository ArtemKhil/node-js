const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MyError = require("../errors/myError");
const {ACCESS_SECRET, REFRESH_SECRET} = require("../configs/configs");
const {tokenTypeEnum} = require("../enums");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {

        const arePasswordsMatched = await bcrypt.compare(password, hashPassword);

        if (!arePasswordsMatched) {
            throw new MyError('Wrong email or password', 400);
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '15s'});
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken, refreshToken
        }
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
};
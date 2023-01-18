const {authValidator} = require("../validators");
const MyError = require("../errors/myError");
const {oauthServices} = require("../services");
const OAuth = require('../dataBase/OAuth');
const {tokenTypeEnum} = require("../enums");


module.exports = {

    isBodyValid: async (req, res, next) => {
        try {
            const validate = await authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new MyError(validate.error.message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new MyError('No Token', 401);
            }
            oauthServices.checkToken(accessToken);

            const tokenInfo = OAuth.findOne({accessToken});

            if (!tokenInfo) {
                throw new MyError('Token is not valid', 401);
            }

            req.tokenInfo = tokenInfo;
            next()
        } catch (e) {
            next(e)
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new MyError('No Token', 401);
            }
            oauthServices.checkToken(refreshToken, tokenTypeEnum.refreshToken);

            const tokenInfo = OAuth.findOne({refreshToken});

            if (!tokenInfo) {
                throw new MyError('Token is not valid', 401);
            }

            req.tokenInfo = tokenInfo;
            next()
        } catch (e) {
            next(e)
        }
    },
};
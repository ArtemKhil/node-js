const {authValidator} = require("../validators");
const MyError = require("../errors/myError");
const {oauthServices} = require("../services");
const ActionToken = require('../dataBase/ActionToken');
const OAuth = require('../dataBase/OAuth');
const OldPassword = require('../dataBase/OldPassword');
const {tokenTypeEnum} = require("../enums");
const {FORGOT_PASSCODE} = require("../configs/token-action.enum");
const {compareOldPasswords} = require("../services/oauth.services");


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

    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                throw new MyError('No Token', 401);
            }
            oauthServices.checkActionToken(actionToken, FORGOT_PASSCODE);

            const tokenInfo = await ActionToken
                .findOne({token: actionToken, tokenType: FORGOT_PASSCODE})
                .populate('_user_id');

            if (!tokenInfo) {
                throw new MyError('Token is not valid', 401);
            }

            req.user = tokenInfo._user_id;

            next()
        } catch (e) {
            next(e)
        }
    },

    checkOldPasswords: async (req, res, next) => {
        try {
            const {user, body} = req.user;
            const oldPasswords = await OldPassword.find({_user_id: user._id}).lean();

            if (!oldPasswords.length) {
                return next();
            }

            const results = await Promise.all(oldPasswords.map((record) => compareOldPasswords(record.password, body.password)));

            const condition = results.some((res) => res);

            if (condition) {
                throw new MyError('This is old Password', 409);
            }
            next()
        } catch (e) {
            next(e)
        }
    },

};
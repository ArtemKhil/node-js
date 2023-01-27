const {oauthServices, emailServices} = require("../services");
const ActionToken = require('../dataBase/ActionToken');
const OAuth = require('../dataBase/OAuth');
const User = require('../dataBase/User');
const {WELCOME, FORGOT_PASSWORD} = require("../configs/email-actions.enum");
const {FORGOT_PASSCODE} = require("../configs/token-action.enum");
const {FRONTEND_URL} = require("../configs/configs");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailServices.sendEmail('artemkhilchenko09@gmail.com', WELCOME, {userName: user.name});

            await oauthServices.comparePasswords(user.password, body.password);

            const tokenPair = oauthServices.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id});

            res.json({
                user,
                ...tokenPair
            });

        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo;
            await OAuth.deleteOne({refreshToken});

            const tokenPair = oauthServices.generateAccessTokenPair({id: _user_id});

            await OAuth.create({...tokenPair, _user_id});

            res.status(201).json({tokenPair});

        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {_id, email, name} = req.user;

            const actionToken = oauthServices.generateActionToken(FORGOT_PASSCODE, {email: email});
            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await ActionToken.create({token: actionToken, _user_id: _id, tokenType: FORGOT_PASSCODE});
            await emailServices.sendEmail('artemkhilchenko09@gmail.com', FORGOT_PASSWORD, {url: forgotPassFEUrl,userName:name});

            res.json('ok');
        } catch (e) {
            next(e)
        }
    },

    restorePasswordAfterForgot: async (req, res, next) => {
        try {
            const hashPassword = await oauthServices.hashPassword(req.body.password);

            await User.deleteOne({token: req.get('Authorization')});
            await User.updateOne({_id: req.user._id}, {password: hashPassword});

            res.json('ok');
        } catch (e) {
            next(e);

        }
    }

};
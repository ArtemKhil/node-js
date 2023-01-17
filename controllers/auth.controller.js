const {oauthServices, emailServices} = require("../services");
const OAuth = require('../dataBase/OAuth');
const {WELCOME} = require("../configs/email-actions.enum");

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
    }
};
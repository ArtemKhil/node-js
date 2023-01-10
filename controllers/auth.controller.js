const {oauthServices} = require("../services");
const OAuth = require('../dataBase/OAuth');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

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
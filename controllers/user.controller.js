const {userServices, oauthServices, emailServices} = require("../services");
const {FORGOT_PASSWORD} = require("../configs/email-actions.enum");


module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userServices.findByParams();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await oauthServices.hashPassword(req.body.password);

            const user = await userServices.create({...req.body, password: hashPassword});

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            await emailServices.sendEmail('artemkhilchenko09@gmail.com', FORGOT_PASSWORD);
            res.json(req.user)
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            const user = await userServices.updateOne(userId, newUserInfo);
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await userServices.deleteOne(req.params.userId)
            res.status(204).send('Deleted');
        } catch (e) {
            next(e);
        }
    }
};
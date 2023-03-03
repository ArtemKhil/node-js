const User = require('../dataBase/User');
const {userServices, s3Services} = require("../services");


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
            const user = await User.createUserWithHashPassword(req.body);

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
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
    },

    uploadAvatar: async (req, res, next) => {
        try {
            const uploadedData = await s3Services.uploadPublicFile(req.files.avatar, 'user', req.user._id);

            const updatedUser = await User.findByIdAndUpdate(req.user._id,{avatar:uploadedData.Location},{new: true});

            res.json(updatedUser);

        } catch (e) {
            next(e);
        }
    }
};
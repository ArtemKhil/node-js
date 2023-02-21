const User = require('../dataBase/User');

module.exports = {

    findByParams: async (filter = {}) => {
        return User.find(filter);
    },

    findOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },

    // create: async (userInfo) => {
    //     return User.create(userInfo);
    // },

    updateOne: (userId, newUserInfo) => {
        return User.findOneAndUpdate(userId, newUserInfo, {new: true});
    },

    deleteOne: (userId) => {
        return User.deleteOne({_id: userId});
    }

};
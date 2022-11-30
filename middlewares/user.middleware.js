const {fileServices} = require("../services");
const myError = require('../errors/myError');

module.exports = {

    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new myError('age is invalid', 400);
            }
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new myError('name is too short', 400);
            }
            next()

        } catch (e) {
            next(e);
        }
    },
    isBodyValidUpdate: (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new myError('age is invalid', 400);
            }
            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new myError('name is too short', 400);
            }
            next()

        } catch (e) {
            next(e);
        }
    },

    checkIsUserExist: async (req, res, next) => {

        try {
            const {userId} = req.params;

            const users = await fileServices.reader();
            const user = users.find(user => user.id === +userId);

            if (!user) {
                throw new myError('User not found', 404);
            }

            req.users = users;

            req.user = user;
            next();

        } catch (e) {
            next(e)
        }
    },

    isIdValid: (req, res, next) => {
        try {
            const {userId} = req.params;

            if (userId < 0 || Number.isNaN(+userId)) {
                throw new myError('id is invalid', 400);
            }
            next()
        } catch (e) {
            next(e);
        }
    },

};
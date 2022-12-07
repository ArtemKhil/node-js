const {userServices} = require("../services");
const myError = require('../errors/myError');
const {userNormalizer} = require("../helper");

module.exports = {

    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age, email} = req.body;

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new myError('age is invalid', 400);
            }
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new myError('name is too short', 400);
            }
            if (!email || !email.includes('@')) {
                throw new myError('Wrong email', 400);
            }

            next()
        } catch (e) {
            next(e);
        }
    },
    isBodyValidUpdate: (req, res, next) => {
        try {
            const {name, age, email} = req.body;

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new myError('age is invalid', 400);
            }
            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new myError('name is too short', 400);
            }
            if (email && !email.includes('@')) {
                throw new myError('Wrong email', 400);
            }
            next()

        } catch (e) {
            next(e);
        }
    },

    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userServices.findOneByParams({_id: userId});

            if (!user) {
                throw new myError('User not found', 404);
            }

            req.user = user;
            next();

        } catch (e) {
            next(e)
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;
            if (!email) {
                throw new myError('Email not found', 404);
            }

            const user = await userServices.findOneByParams({email});
            if (user) {
                throw new myError('User with this email already exists', 409);
            }

            next();
        } catch (e) {
            next(e)
        }
    },

    userNormalizer: (req, res, next) => {
        try {
            let {name, email} = req.body;

            if (name) req.body.name = userNormalizer.name(name);
            if (email) req.body.email = email.toLowerCase();

            next();
        } catch (e) {
            next(e)
        }
    },
};
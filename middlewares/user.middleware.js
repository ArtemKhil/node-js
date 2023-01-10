const User = require('../dataBase/User');
const {userServices} = require("../services");
const {userNormalizer} = require("../helpers");
const MyError = require("../errors/myError");
const {userValidator, commonValidator} = require("../validators");

module.exports = {

    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age, email} = req.body;

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new MyError('age is invalid', 400);
            }
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new MyError('name is too short', 400);
            }
            if (!email || !email.includes('@')) {
                throw new MyError('Wrong email', 400);
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
                throw new MyError('age is invalid', 400);
            }
            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new MyError('name is too short', 400);
            }
            if (email && !email.includes('@')) {
                throw new MyError('Wrong email', 400);
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
                throw new MyError('User not found', 404);
            }

            req.user = user;
            next();

        } catch (e) {
            next(e)
        }
    },

    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];
            const user = await User.findOne({[dbField]: fieldToSearch});

            if (!user) {
                throw new MyError('User not found', 404);
            }

            req.user = user;
            next()
        } catch (e) {
            next(e)
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;
            if (!email) {
                throw new MyError('Email not found', 404);
            }

            const user = await userServices.findOneByParams({email});
            if (user) {
                throw new MyError('User with this email already exists', 409);
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

    isNewUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.newUserValidator.validate(req.body);

            if (validate.error) {
                throw new MyError(validate.error.message, 400);
            }

            req.body = validate.value;
            next()

        } catch (e) {
            next(e);
        }
    },

    isEditUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.editUserValidator.validate(req.body);

            if (validate.error) {
                throw new MyError(validate.error.message, 400);
            }

            req.body = validate.value;
            next()

        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const validate = commonValidator.idValidator.validate(userId);

            if (validate.error) {
                throw new MyError(validate.error.message, 400);
            }

            next();

        } catch (e) {
            next(e);
        }
    },

};
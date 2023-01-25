const router = require('express').Router();

const {authController} = require("../controllers");
const middleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware');


router.post(
    '/login',
    middleware.isBodyValid,
    userMiddleware.getUserDynamically('email'),
    authController.login);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

router.post(
    '/password/forgot',
    userMiddleware.getUserDynamically('email'),
    authController.forgotPassword
);

router.put(
    '/password/forgot',
    authMiddleware.checkActionToken,
    authController.restorePasswordAfterForgot
);


module.exports = router;
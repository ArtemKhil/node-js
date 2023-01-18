const router = require('express').Router();

const {authController} = require("../controllers");
const userMiddleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware');


router.post(
    '/login',
    authMiddleware.isBodyValid,
    userMiddleware.getUserDynamically('email'),
    authController.login);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post(
    '/logoutAll',
    authMiddleware.checkAccessToken,
    authController.logoutAll);


module.exports = router;
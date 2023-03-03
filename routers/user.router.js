const router = require('express').Router();

const {userController} = require('../controllers');
const middleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const fileMiddleware = require('../middlewares/file.middleware');


router.get('/', userController.getAllUsers);

router.post('/',
    middleware.isNewUserValid,
    middleware.isBodyValidCreate,
    middleware.userNormalizer,
    // middleware.checkIsEmailUnique,
    userController.createUser);

router.get('/:userId',
    middleware.isUserIdValid,
    // authMiddleware.checkAccessToken,
    middleware.getUserDynamically('userId','params','_id'),
    userController.getUserById);

router.put('/:userId',
    middleware.isUserIdValid,
    middleware.isEditUserValid,
    authMiddleware.checkAccessToken,
    middleware.isBodyValidUpdate,
    middleware.userNormalizer,
    middleware.getUserDynamically('userId','params','_id'),
    userController.updateUserById);

router.delete('/:userId',
    middleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    userController.deleteUser);

router.patch(
    '/:userId/avatar',
    fileMiddleware.checkUploadImage,
    middleware.isUserIdValid,
    middleware.getUserDynamically('userId', 'params', '_id'),
    userController.uploadAvatar);


module.exports = router;
const router = require('express').Router();

const {userController} = require('../controllers');
const middleware = require('../middlewares/user.middleware');


router.get('/', userController.getAllUsers);

router.post('/',
    middleware.isBodyValidCreate,
    middleware.userNormalizer,
    middleware.checkIsEmailUnique,
    userController.createUser);

router.get('/:userId',
    middleware.checkIsUserExist,
    userController.getUserById);

router.put('/:userId',
    middleware.isBodyValidUpdate,
    middleware.userNormalizer,
    middleware.checkIsUserExist,
    userController.updateUserById);

router.delete('/:userId',
    middleware.checkIsUserExist,
    userController.deleteUser);


module.exports = router;
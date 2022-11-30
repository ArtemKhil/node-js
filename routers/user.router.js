const router = require('express').Router();

const controller = require('../controllers/user.controller');
const middleware = require('../middlewares/user.middleware');


router.get('/', controller.getAllUsers);

router.post('/',
    middleware.isBodyValidCreate,
    controller.createUser);

router.get('/:userId',
    middleware.isIdValid,
    middleware.checkIsUserExist,
    controller.getUserById);

router.put('/:userId',
    middleware.isIdValid,
    middleware.isBodyValidUpdate,
    middleware.checkIsUserExist,
    controller.updateUserById);

router.delete('/:userId',
    middleware.isIdValid,
    middleware.checkIsUserExist,
    controller.deleteUser);


module.exports = router;
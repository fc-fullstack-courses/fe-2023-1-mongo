const userRouter = require('express').Router();
const UserController = require('../controllers/user.controller');
const { checkAccessToken } = require('../middlewares/token.mv');
const { checkUser } = require('../middlewares/user.mv');
const messageRouter = require('./messageRouter');

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getUsers);

userRouter.get('/:userId', UserController.getUser);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);

userRouter.use('/:userId/messages',checkUser, checkAccessToken, messageRouter);

module.exports = userRouter;

const messageRouter = require('express').Router();
const MessageController = require('../controllers/message.controller');

messageRouter.post('/', MessageController.createMessage);
messageRouter.get('/', MessageController.getUserMessages);
messageRouter.get('/all', MessageController.getAllMessages);

module.exports = messageRouter;

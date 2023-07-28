const { Message } = require('../models');

class MessageController {
  static async createMessage(req, res, next) {
    const { body, user } = req;

    const message = await Message.create({
      ...body,
      author: user._id,
    });

    // заносимо в масив messages айдішник нового повідомлення
    await user.updateOne({ $push: { messages: message._id } });

    res.status(201).send({ data: message });
  }

  static async getUserMessages(req, res, next) {
    const { user } = req;

    const messages = await Message.find({ author: user._id })
      .select('-__v')
      .populate({ path: 'author', select: ['firstName', 'lastName'] });
    // .populate('author');

    res.send({ data: messages });
  }
}

module.exports = MessageController;

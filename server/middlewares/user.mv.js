const createHttpError = require('http-errors');
const { User } = require('../models');

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await User.findById(userId).select(['-__v']);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

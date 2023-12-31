const createHttpError = require('http-errors');
const { User } = require('../models');

class UserController {
  static async createUser(req, res, next) {
    try {
      const { body } = req;

      const newUser = await User.create(body);

      res.status(201).send({ data: newUser });
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    const users = await User.find().populate({
      path: 'messages',
    });

    res.send({ data: users });
  }

  static async getUser(req, res, next) {
    try {
      const {
        params: { userId },
      } = req;

      const user = await User.findById(userId).select(['-password', '-__v']);

      if (!user) {
        throw createHttpError(404, 'User not found');
      }

      res.send({ data: user });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const {
        params: { userId },
        body,
      } = req;

      const updatedUser = await User.findByIdAndUpdate(userId, body, {
        new: true,
      }).select('-password -__v');

      if (!updatedUser) {
        throw createHttpError(404, 'User not found');
      }

      res.send({ data: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const {
        params: { userId },
      } = req;

      const deletedUser = await User.findByIdAndRemove(userId).select({
        __v: 0,
        password: 0,
      });

      if (!deletedUser) {
        throw createHttpError(404, 'User not found');
      }

      res.send({ data: deletedUser });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

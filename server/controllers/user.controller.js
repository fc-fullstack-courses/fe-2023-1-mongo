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
    const users = await User.find();

    res.send({ data: users });
  }

  static async getUser(req, res, next) {
    const {
      params: { userId },
    } = req;

    const user = await User.findById(userId);

    res.send({ data: user });
  }

  static async updateUser(req, res, next) {
    const {
      params: { userId },
      body,
    } = req;

    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
    });

    res.send({ data: updatedUser });
  }

  static async deleteUser(req, res, next) {
    const {
      params: { userId },
    } = req;

    const deletedUser = await User.findByIdAndRemove(userId);

    res.send({ data: deletedUser });
  }
}

module.exports = UserController;

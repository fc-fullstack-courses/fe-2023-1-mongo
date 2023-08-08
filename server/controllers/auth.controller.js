const createHttpError = require('http-errors');
const { User } = require('../models');
const AuthService = require('../services/auth.service');

class AuthController {

  static async registration(req, res, next) {
    try {
      const { body } = req;

      const user = await User.create(body);

      const userWithToken = await AuthService.createSession(user);

      res.status(201).send({ data: userWithToken });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { body: { email, password } } = req;

      // 1. перевірити що користувач існує
      const user = await User.findOne({ email });

      if (!user) {
        return next(createHttpError(404, 'Email or password is invalid'));
      }
      // 2. перевірити збіг паролів
      if (password !== user.password) {
        return next(createHttpError(404, 'Email or password is invalid'));
      }

      const userWithToken = await AuthService.createSession(user);

      // 3. надіслати дані користувача
      res.send({ data: userWithToken });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    const { tokenData } = req;

    const userWithToken = await AuthService.refreshSession(tokenData);

    res.send({ data: userWithToken });
  }
}

module.exports = AuthController;
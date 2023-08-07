const createHttpError = require('http-errors');
const { User } = require('../models');

class AuthController {

  static async registration(req, res, next) {
    try {
      const { body } = req;

      const user = await User.create(body);

      res.status(201).send({ data: user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { body: { email, password } } = req;

      // 1. перевірити що користувач існує
      const user = await User.findOne({email});

      if(!user) {
        return next(createHttpError(404, 'Email or password is invalid'));
      }
      // 2. перевірити збіг паролів
      if(password !== user.password) {
        return next(createHttpError(404, 'Email or password is invalid'));
      }

      // 3. надіслати дані користувача
      res.send({data: user});
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) { }
}

module.exports = AuthController;
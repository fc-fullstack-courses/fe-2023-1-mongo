const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User, Token } = require('../models');

const signJWT = promisify(jwt.sign);

class AuthController {

  static async registration(req, res, next) {
    try {
      const { body } = req;

      const user = await User.create(body);

      // 1. зібрати дані користного навантаження для токену
      const tokenPayload = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id
      }

      // 2. генеруємо токен
      const accessToken = await signJWT(tokenPayload, 'ddfdsfgfgfdsftgre', { expiresIn: 600 });

      // 3. зберігаємо токен до БД
      await Token.create({ token: accessToken, userId: user._id });

      // 4. повертаємо токен разом з даними користувача
      res.status(201).send({ data: { user, accessToken } });
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

      // 3. повторити логіку генерації токену з регістрації
      const tokenPayload = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id
      }

      const accessToken = await signJWT(tokenPayload, 'ddfdsfgfgfdsftgre', { expiresIn: 600 });

      await Token.create({ token: accessToken, userId: user._id });

      // 3. надіслати дані користувача
      res.send({ data: { user, accessToken } });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) { }
}

module.exports = AuthController;
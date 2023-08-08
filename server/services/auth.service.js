const createHttpError = require('http-errors');
const { User, Token } = require('../models');
const JWTService = require('./jwt.service');

module.exports.createSession = async (user) => {

  // 1. зібрати дані користного навантаження для токену
  const tokenPayload = {
    firstName: user.firstName,
    lastName: user.lastName,
    id: user._id
  }

  // 2. генеруємо токен
  const accessToken = await JWTService.generateAccessToken(tokenPayload);

  // 3. зберігаємо токен до БД
  await Token.create({ token: accessToken, userId: user._id });

  // 4. повертаємо токен разом з даними користувача
  return { user, accessToken }
}

module.exports.refreshSession = async (tokenInstance) => {

  const user = await User.findById(tokenInstance.userId);

  if(!user) {
    throw createHttpError(404, 'User not found');
  }

  const tokenPayload = {
    firstName: user.firstName,
    lastName: user.lastName,
    id: user._id
  }

  const accessToken = await JWTService.generateAccessToken(tokenPayload);

  // оновили токен в БД
  await Token.findOneAndUpdate({token: tokenInstance.token}, {token: accessToken});

  //  повертаємо токен разом з даними користувача
  return { user, accessToken }
}
const createHttpError = require("http-errors");
const JWTService = require('../services/jwt.service');
const { Token } = require("../models");

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;

    if (!authorization) {
      return next(createHttpError(401, 'Access token required'))
    }

    const [authType, token] = authorization.split(' ');

    const tokenPayload = await JWTService.verifyAccessToken(token);
    req.tokenData = tokenPayload;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const { body: { token }} = req;

    if(!token) {
      return next(createHttpError(401, 'Refresh token required'))
    }

    // по факту перевіряємо рефреш токен (може бути іншим)
    await JWTService.verifyAccessToken(token);

    const foundToken = await Token.findOne({token});

    if(!foundToken) {
      return next(createHttpError(404, 'Token doesnt exist'));
    }

    req.tokenData = foundToken;
    next();
  } catch (error) {
    next(error)
  }
}
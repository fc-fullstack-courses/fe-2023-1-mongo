const createHttpError = require("http-errors");
const JWTService = require('../services/jwt.service');

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

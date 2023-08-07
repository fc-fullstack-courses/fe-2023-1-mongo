const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

module.exports.tokenErrorHandler = async (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    return res.status(419).send({ errors: ['Token expired'] })
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).send({ errors: ['Invalid JWT'] })
  }

  next(err);
}
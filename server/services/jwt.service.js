const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const CONSTANTS = require('../constants');

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN } = CONSTANTS;

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: ACCESS_TOKEN_SECRET,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN
  }
}

const generateToken = async (tokenPayload, { secret, expiresIn }) => signJWT(tokenPayload, secret, {
  expiresIn
});

const verifyToken = (token, { secret }) => verifyJWT(token, secret);

module.exports.generateAccessToken = (tokenPayload) => generateToken(tokenPayload, tokenConfig.access);

module.exports.verifyAccessToken = (token) => verifyToken(token, tokenConfig.access);
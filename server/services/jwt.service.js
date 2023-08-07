const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: 'ddfdsfgfgfdsftgre',
    expiresIn: 600
  }
}

const generateToken = async (tokenPayload, { secret, expiresIn }) => signJWT(tokenPayload, secret, {
  expiresIn
});

const verifyToken = (token, { secret }) => verifyJWT(token, secret);

module.exports.generateAccessToken = (tokenPayload) => generateToken(tokenPayload, tokenConfig.access);

module.exports.verifyAccessToken = (token) => verifyToken(token, tokenConfig.access);
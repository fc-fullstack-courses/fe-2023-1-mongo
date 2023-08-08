require('dotenv').config();

const CONSTANTS = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL ||
    `mongodb://localhost:27017`,
  DB_NAME: process.env.DB_NAME || 'chatDB',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
}

module.exports = CONSTANTS;
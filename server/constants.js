
const USER_LOGIN = process.env.USER_LOGIN || 'admin';
const USER_PASSWORD = process.env.USER_PASSWORD || 'admin';
const DB_HOST = process.env.DB_HOST || 'mongotest.yuttpkc.mongodb.net';

const CONSTANTS = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL ||
  `mongodb+srv://${USER_LOGIN}:${USER_PASSWORD}@${DB_HOST}`,
  DB_NAME : process.env.DB_NAME || 'chatDB',
  ACCESS_TOKEN_SECRET: 'ddfdsfgfgfdsftgre',
  ACCESS_TOKEN_EXPIRES_IN: 600,
}

module.exports = CONSTANTS;
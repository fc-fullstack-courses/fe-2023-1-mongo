const mongoose = require('mongoose');
const User = require('./User');

async function connectToDB() {
  const USER_LOGIN = process.env.USER_LOGIN || 'admin';
  const USER_PASSWORD = process.env.USER_PASSWORD || 'admin';

  const DB_URL =
    process.env.DB_URL ||
    `mongodb+srv://${USER_LOGIN}:${USER_PASSWORD}@${DB_HOST}`;

  const DB_NAME = process.env.DB_NAME || 'chatDB';

  await mongoose.connect(`${DB_URL}/${DB_NAME}`);
}

connectToDB().catch((err) => console.log(err));

module.exports.User = User;
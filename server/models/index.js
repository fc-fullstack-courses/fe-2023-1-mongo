const mongoose = require('mongoose');
const User = require('./User');
const Message = require('./Message');
const Token = require('./Token');
const { DB_URL, DB_NAME } = require('../constants');

async function connectToDB() {
  await mongoose.connect(`${DB_URL}/${DB_NAME}`);
}

connectToDB().catch((err) => console.log(err));

module.exports.User = User;
module.exports.Message = Message;
module.exports.Token = Token;
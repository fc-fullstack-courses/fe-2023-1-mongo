const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  birthday: { type: Date },
  isMale: Boolean,
});

const User = model('User', userSchema);

module.exports = User;

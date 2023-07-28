const { Schema, model } = require('mongoose');
const yup = require('yup');

const EMAIL_VALIDATION_SCHEMA = yup.string().email().required();

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      match: /^[A-Z][a-z]{0,32}$/,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      match: /^[A-Z][a-z]{0,32}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async (value) => EMAIL_VALIDATION_SCHEMA.isValid(value),
        message: 'Email is invalid',
      },
    },
    password: { type: String, required: true },
    birthday: { type: Date, default: Date.now },
    isMale: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;

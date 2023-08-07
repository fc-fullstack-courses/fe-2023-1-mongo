const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

const Token = model('Token', tokenSchema);

module.exports = Token;
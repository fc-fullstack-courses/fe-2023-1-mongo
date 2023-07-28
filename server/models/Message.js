const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);

module.exports = Message;

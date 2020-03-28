const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {},
  }
);

module.exports = model('users', UsersSchema);

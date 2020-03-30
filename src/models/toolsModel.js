const { Schema, model } = require('mongoose');

const ToolsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model('vuttrs', ToolsSchema);

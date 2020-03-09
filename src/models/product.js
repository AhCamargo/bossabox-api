import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: String,
  price: Number,
});

module.exports = model('Product', ProductSchema);
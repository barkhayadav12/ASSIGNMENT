const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  mrp: Number,
  price: Number,
  images: [String],
  stock: Number,
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  store_slug: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("product", productSchema);

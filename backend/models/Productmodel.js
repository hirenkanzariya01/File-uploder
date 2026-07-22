const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema.create({
  product_name: {
    type: String,
    required: true
  },
  product_image_path: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true })

product_modal = mongoose.model("my_product", ProductSchema)
module.exports = product_modal
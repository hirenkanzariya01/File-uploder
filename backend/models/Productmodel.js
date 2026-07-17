const express = require('express')
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
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

product_modal = mongoose.model({ "ProductSchema": ProductSchema })
module.exports = product_modal
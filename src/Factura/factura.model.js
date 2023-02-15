'use strict'

const mongoose = require('mongoose');

const facturaSchema = new Schema({
    number: {
      type: String,
      required: true,
      unique: true
    },

    date: {
      type: Date,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    method: {
      type: String,
      required: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      require: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        require: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

module.exports = mongoose.model('Factura', facturaSchema);
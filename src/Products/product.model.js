'use strict'

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },

    stock: {
        type: Number,
        require: true
    },

    category:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        default: 'Default',
        require: true
    }
});

module.exports = mongoose.model('Product', productSchema);
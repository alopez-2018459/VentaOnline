'use strict'

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    
    description: {
        type: String,
        require: true
    },

    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
    }]

});

module.exports = mongoose.model('Category', categorySchema);
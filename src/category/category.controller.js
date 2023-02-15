'use strict'

const Category = require('./category.model');


exports.test = async (req, res) => {
    return res.send({message: 'Category is running'});
};

exports.save = async (req, res) => {
    let data = req.body;

    let category = new Category(data);

    await category.save();

    return res.send({message:'Saved Successfully'})
};




'use strict'

const Category = require('./category.model');
const serverStatus = require('../Services/serverStatus');
const { findById, findOneAndDelete, find } = require('./category.model');

exports.test = async (req, res) => {
    return res.send({message: 'Category is running'});
};

exports.save = async (req, res) => {
    try {
        let data = req.body;

        let category = new Category(data);

        await category.save();

        return res.send({message:'Saved Successfully'});    
    } catch (err) {
        console.error(err);
        serverStatus.internal500(res, 'Esta categoria ya existe', err);
    }
};



exports.update = async (req, res) => {
    try {
        let categoryId = req.params.id;
        let data = req.body;
        let categoryData = await Category.findOneAndUpdate(
            {_id: categoryId},
            data,
            {new: true}
        );
        console.log(categoryData);

        if(!categoryData) return serverStatus.internal404(res, 'Category Not found');
        return serverStatus.customStatus(res, 200, categoryData);
    } catch (err) {
        console.error(err);
        return serverStatus.internal500(res, 'Category not updated', err)
    }
};

exports.deleted = async (req, res) => {
    try {
        let categoryId = req.params.id

        let categoryDeleted = await Category.findOneAndDelete(
            {_id: categoryId},
        );

        console.log(categoryDeleted);

        if(!categoryDeleted) return serverStatus.internal404(res, 'Category Not found');
         
        return serverStatus.internal200(res, 'Category Deleted, check logs'), categoryDeleted;

    } catch (err) {
        console.error(err);
        return serverStatus.internal500(res, 'Category not Deleted', err);
    }
}


exports.getCategories = async (req, res) => {
    try {
        let categories = await Category.find();
        return serverStatus.customStatus(res, 200, categories);
    } catch (err) {
        console.log(err);
        return serverStatus.internal500(res, 'Error getting categories', err);
    }
}




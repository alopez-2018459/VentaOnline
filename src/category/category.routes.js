'use strict'


const {test, save, update, deleted, getCategories} = require('./category.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth, isAdmin} = require('../Services/auth');



api.get('/', test);
api.post('/save',[ensureAuth, isAdmin], save);
api.put('/update/:id',[ensureAuth, isAdmin], update);
api.delete('/delete/:id', [ensureAuth, isAdmin], deleted);
api.get('/get', getCategories);


module.exports = api;


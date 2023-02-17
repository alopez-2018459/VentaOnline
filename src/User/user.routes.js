'use strict'



const {test, save, login, adminSave, deleted, loginUser, update} = require('./user.controller');
const express = require('express');
const {ensureAuth, isAdmin} = require('../Services/auth');
const api = express.Router();


api.get('/', test);
api.get('/testLogin', ensureAuth, loginUser);
api.post('/register', save);
api.post('/login', login);  
api.put('/update',ensureAuth, update);
api.post('/save-admin',[ensureAuth, isAdmin],adminSave);
api.delete('/delete/:id', ensureAuth, deleted);

module.exports = api;

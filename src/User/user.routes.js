'use strict'

const {test, save, login, adminSave} = require('./user.controller');
const express = require('express');
const {ensureAuth, isAdmin} = require('../Services/auth');
const api = express.Router();


api.get('/', test);
api.post('/register', save);
api.post('/login', login);
api.post('/save-admin',[ensureAuth, isAdmin],adminSave);


module.exports = api;

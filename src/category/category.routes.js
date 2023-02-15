'use strict'


const {test, save} = require('./category.controller');
const express = require('express');

const api = express.Router();

const {ensureAuth, isAdmin} = require('../Services/auth');



api.get('/', test);
api.post('/save', save);
api.put('/edit',);

module.exports = api;


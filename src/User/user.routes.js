'use strict'

const {test, save, login} = require('./user.controller');
const express = require('express');
const api = express.Router();


api.get('/', test);
api.post('/save', save);
api.post('/login', login);

module.exports = api;

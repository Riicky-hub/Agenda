const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const accountController = require('./src/controllers/accountController');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login/cadastro
route.get('/account/index', accountController.index);
route.post('/account/register', accountController.register);

module.exports = route;
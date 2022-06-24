const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const accountController = require('./src/controllers/accountController');
const contatoController = require('./src/controllers/contatoController');
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login/cadastro
route.get('/account/index', accountController.index);
route.post('/account/register', accountController.register);
route.post('/account/login', accountController.login);
route.get('/account/logout', accountController.logout);

// Rotas de crição de contatos
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.contatoEdited);

module.exports = route;
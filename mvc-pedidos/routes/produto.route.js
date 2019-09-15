const express = require('express');
const routes = express.Router();
const clienteController = require('../controller/produto.controller');

routes.get('/', clienteController.find);
routes.post('/', clienteController.create);
routes.get('/:id([0-9]+)', clienteController.findByID);
routes.put('/:id([0-9]+)', clienteController.update);
routes.delete('/:id([0-9]+)', clienteController.delete);

module.exports = routes;
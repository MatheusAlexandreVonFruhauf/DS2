const express = require('express');
const routes = express.Router();
const itemPedidoController = require('../controller/itemPedido.controller');

routes.get('/', itemPedidoController.find);
routes.post('/', itemPedidoController.create);
routes.get('/:id([0-9]+)', itemPedidoController.findByID);
routes.put('/:id([0-9]+)', itemPedidoController.update);
routes.delete('/:id([0-9]+)', itemPedidoController.delete);

module.exports = routes;
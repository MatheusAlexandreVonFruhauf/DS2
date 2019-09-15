const express = require('express');
const clienteRoute = require('./cliente.route');
const vendedorRoute = require('./vendedor.route');
const pedidoRoute = require('./pedido.route');
const produtoRoute = require('./produto.route');
const routes = new express.Router();

routes.use('/clientes', clienteRoute);
routes.use('/vendedores', vendedorRoute);
routes.use('/pedido', pedidoRoute);
routes.use('/produtos', produtoRoute);

module.exports = routes;

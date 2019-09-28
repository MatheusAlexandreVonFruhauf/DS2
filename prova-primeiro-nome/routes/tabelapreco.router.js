const express = require('express');
const routes = express.Router();
const tabelaprecocontroller = require('../controller/tabelapreco.controller');


routes.get('/', tabelaprecocontroller.find);
routes.post('/', tabelaprecocontroller.create);
routes.get('/:id([0-9]+)', tabelaprecocontroller.findByID);
routes.put('/:id([0-9]+)', tabelaprecocontroller.update);
routes.delete('/:id([0-9]+)', tabelaprecocontroller.delete);

module.exports = routes;
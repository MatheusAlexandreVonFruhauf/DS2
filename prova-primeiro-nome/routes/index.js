const express = require('express');
const tabelaprecoRoute = require('./tabelapreco.router');
const routes = new express.Router();

routes.use('/tabelapreco', tabelaprecoRoute);

module.exports = routes;
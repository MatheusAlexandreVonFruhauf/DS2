const express = require('express');
const estadoRouter = require('./estado.router');

const routes = new express.Router();

routes.use('/estado', estadoRouter);

module.exports = routes;
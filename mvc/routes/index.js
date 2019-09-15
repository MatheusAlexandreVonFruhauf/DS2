const express = require('express');
const personRoute = require('./person.router');
const personRoute = require('./state.router');
const routes = new express.Router();


routes.use('/persons',personRoute)
routes.use('/state',stateRoute)

module.exports = routes;



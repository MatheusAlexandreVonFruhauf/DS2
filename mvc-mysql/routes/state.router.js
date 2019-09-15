const express = require('express');
const stateController = require('../controller/state.cotroller');

const routes = express.Router();


routes.get('/state', stateController.find);
routes.post('/state', stateController.create);

routes.get('/state/:id([0-9]+)', stateController.findByID);
routes.put('/state/:id([0-9]+)', stateController.update);
routes.delete('/state/:id([0-9]+)', stateController.delete);

module.exports = routes;

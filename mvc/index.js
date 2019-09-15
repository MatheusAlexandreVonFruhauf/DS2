const express = require('express')
const bodyparser = require('body-parser');

const personRouter = require('./routes');

const app = express();



app.use(personRouter.json);

app.use(routes);

const appServer = app.listen(3000, () => {
    console.log('Aplicação esta rodando na porta %s', appServer.address().port);
});
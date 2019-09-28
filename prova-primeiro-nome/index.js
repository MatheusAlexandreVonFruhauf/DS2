const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./routes');
const connection = require('./mysql-connection');
const app = express();
app.use(bodyParser.json());
app.use(Router);
//  testa a conexao com o banco de dados
connection.connect((error) => {
    if (error) {
        console.error('NAO ESTA FUNCIONANDO: %s', error.message);
        return;
    }
    const appServer = app.listen(3000, () => {
        console.log('Aplicação está rodando! Na porta %s', appServer.address().port)
    });    

});
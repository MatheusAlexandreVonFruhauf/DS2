const connection = require('../mysql-connection');

module.exports = {
    find: (callBack) => {
        connection.query('SELECT * FROM PRODUTO', callBack);
    },
    findById: (params, callBack) => {
        connection.query('SELECT * FROM PRODUTO WHERE ID = ?', [params.id], callBack);
    },
    create: (params, callback) => {
        connection.query('INSERT INTO PRODUTO (CODIGO,NOME,DESCRICAO,PRECO) VALUES(?,?,?,?)', 
        [params.codigo, params.nome, params.descricao, params.preco], callback);           
    },
    update: (params, callback) => {
        connection.query('UPDATE PRODUTO SET CODIGO = ?, NOME = ?, DESCRICAO = ?,PRECO = ? WHERE ID = ?', 
        [params.codigo, params.nome, params.descricao, params.preco, params.id], callback);      
    },
        delete: (params, callBack) => {
            connection.query('DELETE FROM PRODUTO WHERE ID = ?', [params.id], callBack);
        },
}
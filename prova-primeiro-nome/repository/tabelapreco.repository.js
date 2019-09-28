const connection = require('../mysql-connection');

module.exports = {
    find: (callBack) => {
        connection.query('SELECT * FROM tabelapreco', callBack);
    },
    findById: (params, callBack) => {
        connection.query('SELECT * FROM tabelapreco WHERE ID = ?', [params.id], callBack);
    },
    create: (params, callback) => {
        connection.query('INSERT INTO tabelapreco (codigo,nome,fator) VALUES(?,?,?)', 
        [params.codigo, params.nome, params.fator], callback);           
    },
    update: (params, callback) => {
        connection.query('UPDATE PRODUTO SET codigo = ?, nome = ?,fator = ? WHERE ID = ?', 
        [params.codigo, params.nome, params.fator, params.id], callback);      
    },
        delete: (params, callBack) => {
            connection.query('DELETE FROM tabelapedido WHERE ID = ?', [params.id], callBack);
        },
}
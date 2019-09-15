const connection = require('../mysql-connection');

module.exports = {
    find: (callBack) => {
        connection.query('SELECT * FROM VENDEDOR', callBack);
    },
    findById: (params, callBack) => {
        connection.query('SELECT * FROM VENDEDOR WHERE ID = ?', [params.id], callBack);
    },
    create: (params, callback) => {
        connection.query('INSERT INTO VENDEDOR (CODIGO,NOME,EMAIL) VALUES(?,?,?)', [params.codigo, params.nome,
        params.email], callback);           
    },
    update: (params, callback) => {
        connection.query('UPDATE VENDEDOR SET CODIGO = ?, NOME = ?, EMAIL = ? WHERE ID = ?', [params.codigo, params.nome,
            params.email, params.id], callback);      
    },
        delete: (params, callBack) => {
            connection.query('DELETE FROM VENDEDOR WHERE ID = ?', [params.id], callBack);
        },
}
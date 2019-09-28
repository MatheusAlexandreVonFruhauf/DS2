const connection = require('../mysql-connection');


const sql = 'SELECT  c.id as c_id, c.nome as c_nome, c.codigo,c.email' +
    'cd.id as cd_id , cd.nome as cd_nome' +
    'e.id as e_id, e.nome as e_nome, e.sigla' +
    'FROM cliente c' +
    'INNER JOIN cidade cd ON cd.id = c.cidade_id' +
    'INNER JOIN estado e ON e.id = cd.estado_id' +
    'INNER JOIN tabelapreco tp ON '

module.exports = {
    find: (callback) => {
        connection.query('SELECT * FROM vendedor', callback);
    },
}
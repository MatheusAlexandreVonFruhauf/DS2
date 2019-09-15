const connection = require('../mysql-connection');



module.exports = {
    find: (callBack) => {
        connection.query('SELECT ITEMPEDIDO.*,'
        +'PRODUTO.ID AS PRODUTO_ID, PRODUTO.CODIGO AS PRODUTO_CODIGO, PRODUTO.NOME AS PRODUTO_NOME, PRODUTO.DESCRICAO AS PRODUTO_DESCRICAO, PRODUTO.PRECO AS PRODUTO_PRECO '+'FROM ITEMPEDIDO '
        +'LEFT JOIN PRODUTO ON PRODUTO.ID = ITEMPEDIDO.PRODUTO_ID', callBack);},
    findById: (params, callBack) => {
        connection.query('SELECT ITEMPEDIDO.*,'
        +'PRODUTO.ID AS PRODUTO_ID, PRODUTO.CODIGO AS PRODUTO_CODIGO, PRODUTO.NOME AS PRODUTO_NOME, PRODUTO.DESCRICAO AS PRODUTO_DESCRICAO, PRODUTO.PRECO AS PRODUTO_PRECO '+'FROM ITEMPEDIDO '
        +'LEFT JOIN PRODUTO ON PRODUTO.ID = ITEMPEDIDO.PRODUTO_ID '
        +'WHERE ITEMPEDIDO.PEDIDO_ID = ?', [params.id], callBack)
    },
    create: (params, callback) => {
        connection.query('INSERT INTO ITEMPEDIDO (QTDADE,VLRUNIT,PEDIDO_ID,PRODUTO_ID) VALUES(?,?,?,?)', [params.qtdade, params.vlrunit,params.pedido_id, params.produto_id], callback);           
    },
    update: (params, callback) => {
   
    },
        delete: (params, callBack) => {

    }
}
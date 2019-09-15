const connection = require('../mysql-connection');
const query = 'select PEDIDO.*,'
    +'CLIENTE.ID AS CLIENTE_ID, CLIENTE.CODIGO AS CLIENTE_CODIGO, CLIENTE.NOME AS CLIENTE_NOME, CLIENTE.EMAIL AS CLIENTE_EMAIL, ' 
   + 'VENDEDOR.ID AS VENDEDOR_ID, VENDEDOR.CODIGO AS VENDEDOR_CODIGO, VENDEDOR.NOME AS VENDEDOR_NOME, VENDEDOR.EMAIL AS VENDEDOR_EMAIL ' 
    +'FROM PEDIDO ' + 'LEFT JOIN CLIENTE ON CLIENTE.ID = PEDIDO.CLIENTE_ID ' + 'LEFT JOIN VENDEDOR ON VENDEDOR.ID = PEDIDO.VENDEDOR_ID'

const queryItens = 'SELECT ip.id as ip_id, ip.qtdade, ip.vlrunit,' + 'p.id as p_id, p.codigo, p.nome, p.descricao, p.preco ' + 'FROM itempedido ip ' + 'INNER JOIN produto p ON p.id = ip.produto_id ' + 'WHERE ip.pedido_id = '
module.exports = {
    find: (callback) => {
        connection.query(query, (error, resultPedido) => {
            if (error) {
                callback(error, false);
                return;
            }
            const idPedido = resultPedido[0].ID;
            const queryItens = 'SELECT ip.id as ip_id, ip.qtdade, ip.vlrunit, ' +'p.id as p_id, p.codigo, p.nome, p.descricao, p.preco, IP.QTDADE '
               + 'FROM itempedido ip '+'INNER JOIN produto p ON p.id = ip.produto_id '
               + 'WHERE ip.pedido_id = '+ idPedido;
            connection.query(queryItens, (error, resultItens) => {
                if (error) {
                    callback(error, false);
                    return;}
                const itens = [];
                for (item of resultItens) {
                    let itempedido = {
                        id: item.ip_id,
                        qtdade: item.qtdade,
                        vlrunit: item.vlrunit,
                        produto: {
                            id: item.p_id,
                            codigo: item.codigo,
                            nome: item.nome,
                            descricao: item.descricao,
                            preco: item.preco}
                        }
                    itens.push(itempedido);}
                resultPedido[0].itens = itens;
                callback(error, resultPedido);
            });
        });
    },
    findById: (params, callback) => {
        const idPedido = params.id;
        connection.query(query + ' WHERE PEDIDO.ID =' + idPedido, (error, resultPedido) => {
            if (error) {
                callback(error, false);
                return;}
            const queryItens = 'SELECT ip.id as ip_id, ip.vlrunit, '+'p.id as p_id, p.codigo, p.nome, p.descricao, p.preco, IP.QTDADE ' +
                'FROM itempedido ip '+'INNER JOIN produto p ON p.id = ip.produto_id '
                +'WHERE ip.pedido_id = ' + idPedido;
            connection.query(queryItens, (error, resultItens) => {
                if (error) {
                    callback(error, false);
                    return;}
                const itens = [];
                for (item of resultItens) {
                    let itempedido = {
                        id: item.ip_id,
                        qtdade: item.QTDADE,
                        vlrunit: item.vlrunit,
                        produto: {
                            id: item.p_id,
                            codigo: item.codigo,
                            nome: item.nome,
                            descricao: item.descricao,
                            preco: item.preco}
                    }
                    itens.push(itempedido);}
                resultPedido[0].itens = itens;
                callback(error, resultPedido);
            });
        });
    },
    create: (params, callback) => {
        connection.beginTransaction(error => {
            if (error) {
                callback(error, false);
                return;
            }

            //Inserindo o cab do pedido
            connection.query('INSERT ', [], (error, cabecResult) => {
                if (error) {
                    connection.rollback(() => {
                        callback(error, false);
                        return;
                    })
                }
                const pedidoID = cabecResult.insertId;
                let qrInsertItens = 'INSERT INTO ITEMPREDIDO (PEDIDO_ID, PRODUTO_ID, QTDADE, VLRUNIT) VALUES ';
                let queryAux = '';
                for (item of params.itens) {
                    queryAux += (queryAux == '' ? '' : ',') + '(' + pedidoID + ', ' + item.produto.id + ', ' + item.produto.qtdade + ',' + item.produto.vlrunit + ') '
                }
                callback(false, queryAux);
            });

        })
    },
    update: (params, callback) => {

    },
    delete: (params, callBack) => {

    },
}
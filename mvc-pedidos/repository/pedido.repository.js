const connection = require('../mysql-connection');

const query = 'SELECT p.id as p_id, p.codigo as p_codigo, p.dtpedido, ' +
    'p.observacao, c.id as c_id, c.codigo as c_codigo, ' +
    'c.nome as c_nome, c.email as c_email, v.id as v_id, ' +
    'v.codigo as v_codigo, v.nome as v_nome, v.email as v_email ' +
    'FROM pedido p ' +
    'INNER JOIN cliente c ON c.id = p.cliente_id ' +
    'INNER JOIN vendedor v ON v.id = p.vendedor_id '

const queryItens = 'SELECT ip.id as ip_id, ip.qtdade, ip.vlrunit, ' +
    'p.id as p_id, p.codigo, p.nome, p.descricao, p.preco ' +
    'FROM itempedido ip ' +
    'INNER JOIN produto p ON p.id = ip.produto_id ' +
    'WHERE ip.pedido_id = ?'

module.exports = {
    find: (callback) => {
        connection.query(query, (error, resultPedido) => {

            if (error) {
                callback(error, false);
                return;
            }

            const idPedido = resultPedido[0].p_id;

            const queryItens = 'SELECT ip.id as ip_id, ip.qtdade, ip.vlrunit, ' +
                'p.id as p_id, p.codigo, p.nome, p.descricao, p.preco ' +
                'FROM itempedido ip ' +
                'INNER JOIN produto p ON p.id = ip.produto_id ' +
                'WHERE ip.pedido_id = ' + idPedido;

            connection.query(queryItens, (error, resultItens) => {
                if (error) {
                    callback(error, false);
                    return;
                }

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
                            preco: item.preco
                        }
                    }

                    itens.push(itempedido);

                }

                resultPedido[0].itens = itens;

                callback(error, resultPedido);
            });
        });
    },
    findById: (params, callback) => {
        const idPedido = resultPedido[0].p_id;
        connection.transaction, query(query + 'WHERE PEDIDO.ID ='+ idPedido, (error, resultPedido) => {

            if (error) {
                callback(error, false);
                return;
            }



            connection.query(queryItens, (error, resultItens) => {
                if (error) {
                    callback(error, false);
                    return;
                }

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
                            preco: item.preco
                        }
                    }

                    itens.push(itempedido);

                }

                resultPedido[0].itens = itens;

                callback(error, resultPedido);
            });
        });

    },
    create: (params, callback) => {
        connection.beginTransaction(error => {
            if (error) {
                callback(error, false)
                return;
            }
            // insere o cabecalho
            connection.query('', [], (error, cabecResult) => {


                if (error) {
                    connection.rollBack(() => {
                        callback(error, false);
                        return;

                    })
                }

                const pedidoID = cabecResult.insertId;


                let qrInsertItens = 'INSERT INTO itempedido (pedido_id, produto_id,qtdade,vlrunit)VALUES ';

                let queryAux = '';
                for (item of params.itens) {

                    queryAux += queryAux == "(" + pedidoID + "," + item.produto.id + "," + item.qtdade + "," + item.vlrunit + "),"
                }

                callback(false)


            });
        })
    },
    update: (params, callback) => {

    },
    delete: (params, callback) => {

    }
}
const connection = require('../mysql-connection');
const util = require('util');

const query = 'SELECT p.id as p_id, p.codigo as p_codigo, p.dtpedido, '+
                     'p.observacao, c.id as c_id, c.codigo as c_codigo, '+
                     'c.nome as c_nome, c.email as c_email, v.id as v_id, '+
                     'v.codigo as v_codigo, v.nome as v_nome, v.email as v_email '+
              'FROM pedido p '+
              'INNER JOIN cliente c ON c.id = p.cliente_id '+
              'INNER JOIN vendedor v ON v.id = p.vendedor_id ';

const queryItens = 'SELECT ip.id as ip_id, ip.qtdade, ip.vlrunit, '+
                   'p.id as p_id, p.codigo, p.nome, p.descricao, p.preco '+
                   'FROM itempedido ip '+
                   'INNER JOIN produto p ON p.id = ip.produto_id '+
                   'WHERE ip.pedido_id = ?';

const queryAsync = util.promisify(connection.query).bind(connection);

module.exports = {
    find: (callback) => {
        (async() => {
            try {

                let pedidos = await queryAsync(query);

                for (pedido of pedidos) {
                    pedido.itens = [];
                    
                    //Busca os itens do pedido
                    let itens = await queryAsync(queryItens, [pedido.p_id]);

                    for (item of itens) {
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
    
                        pedido.itens.push( itempedido );
                    }
                }
                
                callback(false, pedidos);

            } catch(error) {
                callback(error, false);
                return;
            }
        })();
    },
    findById: (params, callback) => {
        connection.query(query +' WHERE p.id = ?',[params.id], (error, resultPedido) => {

            if (error) {
                callback(error, false);
                return;
            }

            connection.query(queryItens, [resultPedido[0].p_id], (error, resultItens) => {
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

                    itens.push( itempedido );

                }

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

            //Insere o cabeçalho do pedido
            connection.query('INSERT INTO pedido (codigo, dtpedido, observacao, cliente_id, vendedor_id) VALUES (?,?,?,?,?)', 
                            [params.codigo, params.dtpedido, params.observacao, params.cliente.id, params.vendedor.id], (error, cabecResult) => {
                //Faz roolback, se error no cabeçalho
                if (error) {
                    connection.rollback(() => {
                        callback(error, false);
                        return;
                    })
                }

                const pedidoID = cabecResult.insertId;

                //Monta query de inserção de itens
                let qrInsertItens = 'INSERT INTO itempedido (pedido_id, produto_id, qtdade, vlrunit) VALUES ';

                //Monta valores do INSERT com TODOS os itens do pedido
                let queryAux = '';
                for (item of params.itens) {

                    queryAux += queryAux == '' ? '' : ',';
                    queryAux += '('+ pedidoID +', '+ item.produto.id +', '+ item.qtdade +', '+ item.vlrunit +')'

                }

                qrInsertItens += queryAux;

                //Executa a query de inclusão de itens em massa
                connection.query( qrInsertItens, (error, itensResult) => {
                    //Faz roolback, se error nos itens
                    if (error) {
                        connection.rollback(() => {
                            callback(error, false);
                            return;
                        })
                    }  

                    //Tenta commitar a transação
                    connection.commit((error) => {
                        //Caso ocorra algum erro, dá roolback
                        connection.rollback(() => {
                            callback(error, false);
                            return;
                        });

                        params.id = pedidoID;

                        callback(false, params);
                    });
                });
            });
        });
    },
    update: (params, callback) => {
        connection.query('UPDATE pedido SET codigo = ?, dtpedido = ?, observacao = ?, cliente_id = ?, vendedor_id = ? WHERE id = ?', 
                         [params.codigo, params.dtpedido, params.observacao, params.cliente.id, params.vendedor.id, params.id], callback);
        
    },
    delete: (params, callback) => {
        connection.query('DELETE FROM pedido WHERE id = ?', [params.id], callback);
    }
}
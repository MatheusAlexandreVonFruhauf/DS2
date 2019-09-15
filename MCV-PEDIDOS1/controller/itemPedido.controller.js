const repository = require('../repository/itemPedido.repository');
const moment = require('moment');
const pedido = [];

module.exports = {

    find:(req, res) => {
        repository.find((error, result) => {
            if (error) {
                res.status(500).send(error);
            };
            const pedidosItem = [];
            for (item of result) {
                let pedidoItem = {
                    pedidoID: item.PEDIDO_ID,
                    id: item.ID,
                    qtdade: item.QTDADE,
                    vlrunit: item.VLRUNIT,
                    produto: {
                        id: item.PRODUTO_ID,
                        codigo: item.PRODUTO_CODIGO,
                        nome: item.PRODUTO_NOME,
                        descricao: item.PRODUTO_DESCRICAO }                   
                }
                pedidosItem.push(pedidoItem);
            };   
            res.send(pedidosItem);
        });
    },
    findByID: (req, res) => {
        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            };
            const pedidosItem = [];
            for (item of result) {
                let pedidoItem = {
                    pedidoID: item.PEDIDO_ID,
                    id: item.ID,
                    qtdade: item.QTDADE,
                    vlrunit: item.VLRUNIT,
                    produto: {
                        id: item.PRODUTO_ID,
                        codigo: item.PRODUTO_CODIGO,
                        nome: item.PRODUTO_NOME,
                        descricao: item.PRODUTO_DESCRICAO}                   
                }
                pedidosItem.push(pedidoItem);
            };   
            res.send(pedidosItem);
        });
    },
    create: (req, res) => {
        const pedidoItem = {
                    qtdade: req.body.qtdade,
                    vlrunit: req.body.vlrunit,
                    pedido_id: req.body.pedidoID,
                    produto_id: req.body.produto.id}
        repository.create(pedidoItem, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            res.send(result);
        });
    },
    update: (req,res) => {
        req.body.id = req.params.id;
        repository.update(req.body, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            if (result.affectedRows == 0 ) {
                res.status(404).send();                
            }
            res.send(result);
        });
    },
    delete: (req, res) => {
        repository.delete(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            res.status(204).send();
        });
    }
}
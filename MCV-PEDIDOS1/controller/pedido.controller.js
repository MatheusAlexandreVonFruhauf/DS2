const repository = require('../repository/pedido.repository');
const moment = require('moment');
const pedido = [];

module.exports = {

    find: (req, res) => {
        repository.find((error, result) => {
            if (error) {
                res.status(500).send(error);}
            const pedidoes = [];
            for (item of result) {
                let pedido = {
                    id: item.ID,
                    codigo: item.CODIGO,
                    dtpedido: moment(item.DTPEDIDO).format('YYYY-MM-DD'),
                    observacao: item.OBSERVACAO,
                    cliente: {
                        id: item.CLIENTE_ID,
                        codigo: item.CLIENTE_CODIGO,
                        nome: item.CLIENTE_NOME,
                        email: item.CLIENTE_EMAIL
                    },
                    vendedor: {
                        id: item.VENDEDOR_ID,
                        codigo: item.VENDEDOR_CODIGO,
                        nome: item.VENDEDOR_NOME,
                        email: item.VENDEDOR_EMAIL
                    },
                    itens: item.itens               
                }
                pedidoes.push(pedido);
            };
            res.send(pedidoes);
        });
    },
    findByID: (req, res) => {
        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);}
            const pedidoes = [];
            for (item of result) {
                let pedido = {
                    id: item.ID,
                    codigo: item.CODIGO,
                    dtpedido: moment(item.DTPEDIDO).format('YYYY-MM-DD'),
                    observacao: item.OBSERVACAO,
                    cliente: {
                        id: item.CLIENTE_ID,
                        codigo: item.CLIENTE_CODIGO,
                        nome: item.CLIENTE_NOME,
                        email: item.CLIENTE_EMAIL
                    },
                    vendedor: {
                        id: item.VENDEDOR_ID,
                        codigo: item.VENDEDOR_CODIGO,
                        nome: item.VENDEDOR_NOME,
                        email: item.VENDEDOR_EMAIL
                    },
                    itens: item.itens               
                }
                pedidoes.push(pedido);
            };
            res.send(pedidoes);
        });
    },
    create: (req, res) => {
        const pedido = {
            nome: req.body.nome,
            estado_id: req.body.estado.id
        }
    },
    update: (req,res) => {
    },
    delete: (req, res) => {
    }
}
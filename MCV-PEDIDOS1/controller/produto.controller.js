const repository = require('../repository/produto.repository');
const produto = [];

module.exports = {

    find: (req, res) => {

        repository.find((error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            const produtos = [];
            for (item of result) {
                let produto = {
                    codigo: item.CODIGO,
                    nome: item.NOME,
                    descricao: item.DESCRICAO,
                    preco: item.PRECO
                }
                produtos.push(produto);
            };
            res.send(produtos);
        });
    },
    findByID: (req, res) => {
        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            };
            const produtos = [];
            for (item of result) {
                let produto = {
                    codigo: item.CODIGO,
                    nome: item.NOME,
                    descricao: item.DESCRICAO,
                    preco: item.PRECO}
                produtos.push(produto);
            };
            res.send(produtos);
        });
    },
    create: (req, res) => {
        const produto = {
            codigo: req.body.codigo,
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco
        }
        repository.create(produto, (error, result) => {
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
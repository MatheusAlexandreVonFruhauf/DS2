const repository = require('../repository/vendedor.repository');
const vendedor = [];

module.exports = {

    find: (req, res) => {

        repository.find((error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            const vendedores = [];
            for (item of result) {
                let vendedor = {
                    id: item.ID,
                    codigo: item.CODIGO,
                    nome: item.NOME,
                    email: item.EMAIL
                }
                vendedores.push(vendedor);
            };
            res.send(vendedores);
        });
    },
    findByID: (req, res) => {
        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            };
            const vendedors = [];
            for (item of result) {
                let vendedor = {
                    id: item.ID,
                    codigo: item.codigo,
                    nome: item.nome,
                    email: item.email
                }
                vendedors.push(vendedor);
            };
            res.send(vendedors);
        });
    },
    create: (req, res) => {
        const vendedor = {
            codigo: req.body.codigo,
            nome: req.body.nome,
            email: req.body.email
        }
        repository.create(vendedor, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            res.send(result);
        });
    },
    update: (req, res) => {
        req.body.id = req.params.id;
        repository.update(req.body, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            if (result.affectedRows == 0) {
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
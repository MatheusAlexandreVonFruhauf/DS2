const repository = require('../repository/cliente.repository');
const cliente = [];
module.exports = {
    find: (req, res) => {
        repository.find((error, result) => {
            if (error) {
                res.status(500).send(error);}
            const clientes = [];
            for (item of result) {
                let cliente = {
                    id: item.ID,
                    codigo: item.CODIGO,
                    nome: item.NOME,
                    email: item.EMAIL }
                clientes.push(cliente);
            };
            res.send(clientes);
        });

    },
    findByID: (req, res) => {
        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            };
            const clientes = [];
            for (item of result) {
                let cliente = {
                    id: item.ID,
                    codigo: item.codigo,
                    nome: item.nome,
                    email: item.email}
                clientes.push(cliente);
            };
            res.send(clientes);
        });
    },
    create: (req, res) => {
        const cliente = {
            codigo: req.body.codigo,
            nome: req.body.nome,
            email: req.body.email}
        repository.create(cliente, (error, result) => {
            if (error) {
                res.status(500).send(error);}
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
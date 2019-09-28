const repository = require('../repository/tabelapreco.repository');
const tabelapreco = [];

module.exports = {

    find: (req, res) => {

        repository.find((error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            const tbprecos = [];
            for (preco of result) {
                let tabelapreco = {
                    codigo: preco.codigo,
                    nome: preco.nome,
                    fator: preco.fator
                }
                tbprecos.push(tabelapreco);
            };
            res.send(tbprecos);
        });
    },
    findByID: (req, res) => {
        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            };
            const tbprecos = [];
            for (preco of result) {
                let tabelapreco = {
                    codigo: preco.codigo,
                    nome: preco.nome,
                    fator: preco.fator
                }
                tbprecos.push(tabelapreco);
            };
            res.send(tbprecos);
        });
    },
    create: (req, res) => {
        const tabelapreco = {
            codigo: req.body.codigo,
            nome: req.body.nome,
            fator: req.body.fator
        }
        repository.create(tabelapreco, (error, result) => {
            if (error) {
                res.status(500,).send(error);
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
                console.log(req.body);
                if (result.affectedRows == 0){
                    res.status(404).send('not found');
                }else{
                    res.send(result);
                }
    
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
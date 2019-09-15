const repository = require('../repository/estado.repository');
const estado = [];

module.exports = {

    find: (req, res) => {

        repository.find().then(result => {
            res.send(result);
        }).catch(error => {
            res.status(500).send(error);
        });
    },

    findByID: (req, res) => {

        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            if (!result[0]) {
                res.status(404).send('not found');
            } else {
                res.send(result[0]);
            }


        });

    },

    create: (req, res) => {
        repository.create(req.body, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            console.log(req.body);
            res.send(result);

        });

    },

    update: (req, res) => {
        //Atualiza o id do objeto do req.body
        req.body.id = req.params.id;
        repository.update(req.body, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            console.log(req.body);
            if (result.affectedRows == 0) {
                res.status(404).send('not found');
            } else {
                res.send(result);
            }

        });

    },
    delete: (req, res) => {
        repository.delete().then(result => {
            res.status(204).send();
        }).catch(error => {
            res.status(500).send(error);
        });
    }
}
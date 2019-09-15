const states = [];

module.exports = {
    find: (req, res) => {
        res.send(states);
    },
    create: (req, res) => {
        const state = req.body

        states.push(states);

        res.send(state)
    },
    findByID: (req, res) => {
        const { id } = req.params;

        console.log(id);

        res.send(states[id - 1]);


    },
    update: (req, res) => {

        const { id } = req.params;
        const state = req.body;


        const index = id - 1

        const [index] = state;

        res.send(state);

    },
    delete: (req, res) => {

        const { id } = req.params;
        states.splice(id-1,1)
        res.status(204).send();
    }

}
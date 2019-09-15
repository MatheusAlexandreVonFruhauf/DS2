const persons = [];

module.exports = {
    find: (req, res) => {
        res.send(persons);
    },
    create: (req, res) => {
        const person = req.body

        persons.push(persons);

        res.send(person)
    },
    findByID: (req, res) => {
        const { id } = req.params;

        console.log(id);

        res.send(persons[id - 1]);


    },
    update: (req, res) => {

        const { id } = req.params;
        const person = req.body;


        const index = id - 1

        const [index] = person;

        res.send(person);

    },
    delete: (req, res) => {

        const { id } = req.params;
        persons.splice(id-1,1)
        res.status(204).send();
    }

}
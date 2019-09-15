module.exports = (app) => {
    app.get('/tarefa03', (req, res) => {
        var num = req.query.numero;  
        
        if (num%2 == 0){
            res.send('O numero ' +num+ ', enviado por parametro,é Par')
        }
        else {
            res.send('O numero ' +num+ ', enviado por parametro,é Ímpar')

        }
    },
    )};
   //* app.get('/tarefa03', (req, res) => {
       // var num = req.query.numero;
       //var resultado = {valor % 2 == 0 }? 'PAR' : 'IMPAR'
       //res.send(`O numero ${valor} , enviado por parametro e `)


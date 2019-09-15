module.exports = (app) => {
    app.get('/tarefa03', (req, res) => {
        var num = Number(req.query.numero);  
        
        if (num >= 0){
            res.send('O numero ' +num+ ', enviado por parametro é POSITIVO')
        }
        else {
            res.send('O numero ' +num+ ', enviado por parametro é NEGATIVO')

        }
    },
    )};
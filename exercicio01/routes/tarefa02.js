module.exports = (app) => {
    app.post('/tarefa02', (req, res) => {
        var sal = req.body.salario;
        var rea = req.body.reajuste;
       Result = salario +(((sal/100)*rea)+sal)     
    },
    res.send('Salario atual = '+sal+'\n'+'reajuste = '+rea+'\n'+'Salario Reajustado'+Result)
    )};
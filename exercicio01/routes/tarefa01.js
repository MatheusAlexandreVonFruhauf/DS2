module.exports = (app) => {
    app.post('/tarefa01', (req, res) => {
        var paramA = req.body.cf;
        var paramB = req.body.pd;
        var paramC = req.body.pi;
       Result = paramA +(paramA*(paramC*100*paramA))+(paramA*(paramB*100*paramA));     
    },
    res.send('Custo de Fabrica ='+paramA+'\n'+'% Distribuidor = '+paramB+'\n'+'% Impostos = '+paramC+'\n'+'Custo Final = '+Result)
    )};
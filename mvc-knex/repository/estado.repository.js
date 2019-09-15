const knex = require('../mysql-connection');

module.exports = {

    find: () => {
        return knex.select().from('estado');
},

    findById: (params) => {        
        return knex.select().from('estado').where({id: params.id});
},

    create: (params) => {        
        return knex('estado').insert({nome: params.nome, sigra:params.sigra})
            
    },

    update: (params, callback) => {
        connection.query('UPDATE estado SET nome = ?, sigra = ? WHERE id = ?', [params.nome,
        params.sigra, params.id], callback);           
    
},
    delete: (params) => {    
        return  knex('estado').where('ID', {id: params.id}).del();
}
};
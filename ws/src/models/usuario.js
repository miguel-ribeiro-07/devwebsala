const mongoose = require('mongoose');
const Schema = mongoose.Schema

const usuario = new Schema({
    tipoUser:{
        type:String,
        require: [true, 'O tipo de usuário é obrigatório']
    },
    cpf:String,
    cnpj:String,
    nome: {
        type:String,
        require: [true, 'O nome é obrigatório']
    },
    email:{
        type:String,
        require: [true, 'O e-mail é obrigatório']
    },
    senha:{
        type:String,
        require: [true, 'A data de nascimento é obrigatório']
    },
});


module.exports = mongoose.model('Usuario', usuario)
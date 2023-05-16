const mongoose = require('mongoose');
const Schema = mongoose.Schema

const rota = new Schema({
    nomeRota:{
        type:String,
        require: [true, 'O nome da rota é obrigatório']
    },
    ponto1: {
        type:String,
        require: [true, 'O ponto de parada 1 é obrigatório']
    },
    ponto2:String,
    tempo:{
        type:Number,
        require: [true, 'O tempo de viagem é obrigatório']
    }
});


module.exports = mongoose.model('Rota', rota)
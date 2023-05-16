const mongoose = require('mongoose');
const Schema = mongoose.Schema

const caminhao = new Schema({
    nomeCaminhao:{
        type:String,
        require: [true, 'O nome do caminhão é obrigatório']
    },
    modelo: {
        type:String,
        require: [true, 'O modelo é obrigatório']
    },
    placa:{
        type:String,
        require: [true, 'A placa é obrigatório']
    },
    fabricacao:Number
});


module.exports = mongoose.model('Caminhao', caminhao)
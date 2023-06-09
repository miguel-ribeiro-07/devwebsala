const mongoose = require('mongoose');
const Schema = mongoose.Schema

const carga = new Schema({
    nomeCarga:{
        type:String,
        require: [true, 'O nome da carga é obrigatório']
    },
    usuarioId:{
        type:mongoose.Types.ObjectId,
        ref:'Usuario',
        require: [true, 'O ID de usuário é obrigatório']
    },
    tipoCarga:String,
    peso:{
        type:Number,
        require: [true, 'A peso é obrigatório']
    },
    altura:{
        type:Number,
        require: [true, 'A altura é obrigatório']
    },
    largura:{
        type:Number,
        require: [true, 'A largura é obrigatório']
    },
    origem:{
        type:String,
        require: [true, 'A origem é obrigatório']
    },
    destino:{
        type:String,
        require: [true, 'O destino é obrigatório']
    }
});


module.exports = mongoose.model('Carga', carga)
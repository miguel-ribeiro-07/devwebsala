const mongoose = require('mongoose');
const Schema = mongoose.Schema

const carga = new Schema({
    cargaId:{
        type:mongoose.Types.ObjectId,
        ref:'Carga',
        require: [true, 'O ID de carga é obrigatório']
    },
    caminhaoId:{
        type:mongoose.Types.ObjectId,
        ref:'Caminhao',
        require: [true, 'O ID de caminhao é obrigatório']
    },
    rotaId:{
        type:mongoose.Types.ObjectId,
        ref:'Rota',
        require: [true, 'O ID de rota é obrigatório']
    },
    localAtual:{
        type:String,
        require: [true, 'O local atual é obrigatório']
    }
});


module.exports = mongoose.model('Carga', carga)
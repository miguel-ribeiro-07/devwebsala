const mongoose = require('mongoose');
const Schema = mongoose.Schema

const entrega = new Schema({
    cargaId:{
        type:mongoose.Types.ObjectId,
        ref:'Carga',
        require: [true, 'O ID de carga é obrigatório']
    },
    usuarioId:{
        type:mongoose.Types.ObjectId,
        ref:'Usuario',
        require: [true, 'O ID de usuário é obrigatório']
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
    },
    status:{
        type:String,
        enum:['Cadastrado', 'Em transporte', 'Entregue'],// Status de excluído "E" para a não remoção do db
        require:true,
        default: "Cadastrado"
    },
});


module.exports = mongoose.model('Entrega', entrega)
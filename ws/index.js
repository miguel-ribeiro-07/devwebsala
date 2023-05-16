const express = require('express');
const cors = require('cors');
const app = express ();
const morgan = require('morgan');

require('./database');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json())
app.use(cors())

//VARIABLES
app.set('port', 8080);

//ROUTES
app.use('/usuario', require('./src/routes/usuario.routes'))
app.use('/caminhao', require('./src/routes/caminhao.routes'))
app.use('/carga', require('./src/routes/carga.routes'))
app.use('/rota', require('./src/routes/rota.routes'))
app.use('/entrega', require('./src/routes/entrega.routes'))

app.listen(app.get('port'),  () => {
    console.log(`Servidor está funcionando e retornando na porta ${app.get('port')}`)
});
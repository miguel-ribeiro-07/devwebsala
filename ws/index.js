const express = require('express');
const cors = require('cors');
const app = express ()
const morgan = require('morgan');

require('./database');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json())
app.use(cors())

//VARIABLES
app.set('port', 8080);

//ROUTES
//app.use('/usuario', require('./src/routes/usuario.routes'))

app.listen(app.get('port'),  () => {
    console.log(`Servidor está funcionando e retornando na porta ${app.get('port')}`)
});
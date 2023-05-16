const mongoose = require('mongoose');
const URI = 'mongodb+srv://userweb:ni4waaf7pSIR5igT@clusterweb.dbn4kxc.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI).then(() => console.log('Banco de dados ok!')).catch(() => console.log(err));
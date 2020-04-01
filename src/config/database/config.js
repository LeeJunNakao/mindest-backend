const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://localhost/mindest', {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,});

mongoose.connection.once('open',()=>{
    console.log('mongoose conectado')
})

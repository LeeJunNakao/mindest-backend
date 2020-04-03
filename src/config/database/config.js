const mongoose = require('mongoose')

const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost/mindest';

module.exports = mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,});

mongoose.connection.once('open',()=>{
    console.log('mongoose conectado')
})

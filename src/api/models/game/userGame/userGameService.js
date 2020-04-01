const restful = require('node-restful')

let Model = require('./userGame')
Model = restful.model('userGame',Model)


Model.methods(['get','put','delete','post'])
Model.updateOptions({ new: true, runValidators: true})

module.exports = Model
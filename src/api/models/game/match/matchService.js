const restful = require('node-restful')

let Model = require('./match')
Model = restful.model('gameMatch',Model)

Model.methods(['get','put','delete','post'])
Model.updateOptions({ new: true, runValidators: true})

module.exports = Model
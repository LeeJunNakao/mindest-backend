const restful = require('node-restful')

let Model = require('./game')
Model = restful.model('game', Model)
Model.methods(['get','put','delete','post'])
Model.updateOptions({ new: true, runValidators: true})

module.exports =  Model

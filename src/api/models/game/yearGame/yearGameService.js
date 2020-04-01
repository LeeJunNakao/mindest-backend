const restful = require('node-restful')

let Model = require('./yearGame')
Model = restful.model('yearGame',Model)


Model.methods(['get','put','delete','post'])
Model.updateOptions({ new: true, runValidators: true})

module.exports = Model
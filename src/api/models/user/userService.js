const restful = require('node-restful')
let User = require('./user')

User = restful.model('user',User)

User.methods(['put','get','post','delete'])
User.updateOptions({new: true, runValidators: true})

module.exports = User
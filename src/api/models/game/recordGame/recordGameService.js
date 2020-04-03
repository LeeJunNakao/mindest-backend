const restful = require('node-restful')

let { RecordGame, RecordGameRegister } = require('./recordGame')

RecordGame = restful.model('recordGame',RecordGame);
RecordGame.methods(['get','put','delete','post']);
RecordGame.updateOptions({ new: true, runValidators: true});

RecordGameRegister = restful.model('recordGameRegister',RecordGameRegister);
RecordGameRegister.methods(['get','put','delete','post']);
RecordGameRegister.updateOptions({ new: true, runValidators: true});

module.exports = { RecordGame, RecordGameRegister }
const mongoose = require('mongoose')

const RecordGameRegister = new mongoose.Schema({
    game: {type: String, unique: true},
    points: {type: Number, default: 0}
});

const RecordGame = new mongoose.Schema({
    user:  {type: String, required: true, unique: true },
    records: [ RecordGameRegister ]
});

module.exports = { RecordGame, RecordGameRegister }
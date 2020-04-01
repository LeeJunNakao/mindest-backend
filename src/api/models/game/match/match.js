const mongoose = require('mongoose')

const Match = new mongoose.Schema({
    user:  {type: String, required: true },
    difficulty: { type: Number, required: true},
    points: { type: Number, default: 0},
    date: { type: Date, required: true}
})

module.exports = Match
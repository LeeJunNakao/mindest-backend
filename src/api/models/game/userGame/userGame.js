const mongoose = require('mongoose')
const Match = require('../match/match')

let UserGame = new mongoose.Schema({
    user: { type: String, required: true },
    game: { type: String, required: true},
    match: [ Match ]
})

module.exports = UserGame
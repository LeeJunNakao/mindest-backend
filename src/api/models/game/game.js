const mongoose = require('mongoose')

const Game = new mongoose.Schema({
    name: { type: String, unique: true }
})

module.exports = Game
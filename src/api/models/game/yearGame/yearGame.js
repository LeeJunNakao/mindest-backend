const mongoose = require('mongoose')
const UserGame = require('../userGame/userGame')


const YearGame = new mongoose.Schema({
    year: { type: Number, unique: true},
    userGame: [String]
})

module.exports = YearGame
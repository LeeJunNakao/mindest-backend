const mongoose = require('mongoose')

const HistoryData = new mongoose.Schema({
    game: {type: String, required: true},
    record: { type: Number, default: 0}
})

const History = new mongoose.Schema({
    user: {type: String, unique: true},
    data: [HistoryData]

})

module.exports = {History, HistoryData }
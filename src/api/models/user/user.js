const mongoose = require('mongoose')

let User = new mongoose.Schema({
    name: {type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    authorization: {type: String, enum: ['admin','moderator','user'], required: false}
})

module.exports = User
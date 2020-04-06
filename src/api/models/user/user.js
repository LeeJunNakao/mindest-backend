const mongoose = require('mongoose')

let User = new mongoose.Schema({
    name: {type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    authorization: {type: String, enum: ['admin','moderator','user'], required: false},
    avatar: { type: String, default: 'http://localhost:3000/api/static/images/system/avatar_default.png'}
})

module.exports = User
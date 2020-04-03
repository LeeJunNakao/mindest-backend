const mongoose = require('mongoose');

const MemorandoWordsList = new mongoose.Schema({
    word: {type: String, required: true, unique: true },
    ordinaryPosition: { type: Number, required: true, unique: true }
})

module.exports = MemorandoWordsList;
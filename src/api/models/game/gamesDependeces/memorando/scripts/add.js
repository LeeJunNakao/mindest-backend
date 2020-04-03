const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost/mindest', {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,});

const fs = require('fs');
const MemorandoWordList = require('../memorandoWordsListService')

class Add{
    
    constructor(){
        this.file = 'data.txt';
        this.encoding='utf8';
    }

    readFile(){
        this.text = fs.readFileSync('data.txt','utf8')
    }

    sendWordsToArray(){
        this.wordsArray = this.text.split(',');
    }

    formatWordsInArray(){
        this.wordsArray.forEach((word,index)=>{
            this.wordsArray[index]= word.trim();
        })
    }

    async addWordToDatabase(word, ordinaryPosition){
        try {
            const memorandoWord = new MemorandoWordList({ word, ordinaryPosition });
            await memorandoWord.save();
        } catch (error) {
            console.log(error);
        }
    }
    
    async sendArrayWordsToDatabase(){
        let i=1;
        this.wordsArray.forEach((word)=>{
            this.addWordToDatabase(word,i);
            i++;
        })
    }

}

const add = new Add();
add.readFile();
add.sendWordsToArray();
add.formatWordsInArray();
add.sendArrayWordsToDatabase();

// const word = new MemorandoWordList({ word: 'papel'});
// word.save();





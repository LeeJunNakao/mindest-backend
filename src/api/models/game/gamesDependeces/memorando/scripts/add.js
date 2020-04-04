const fs = require('fs');
const MemorandoWordList = require('../memorandoWordsListService')

class Add{
    
    constructor(){
        this.file = process.cwd()+'/src/api/models/game/gamesDependeces/memorando/scripts/data.txt';
        this.encoding='utf8';
    }

    initProcess(){
        this.readFile();
        this.sendWordsToArray();
        this.formatWordsInArray();
        this.sendArrayWordsToDatabase();
    }

    readFile(){
        this.text = fs.readFileSync(this.file,'utf8')
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

module.exports = Add;







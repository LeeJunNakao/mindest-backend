const MemorandoWordsList = require('../../../models/game/gamesDependeces/memorando/memorandoWordsListService')
const { generateArrayOfRandomNumbers } = require('../gameUtils');

const databaseLength = 1099;

class Memorando{

    static async getWordOnDatabase(ordinaryPosition){
        return await MemorandoWordsList.findOne({ ordinaryPosition });
    }

    static getWordsList(arrayOfPositons){
        const promisesList = [];

        arrayOfPositons.forEach(ordinaryPosition=>{
            const promise = new Promise((resolve,reject)=>{
                MemorandoWordsList.findOne({ ordinaryPosition })
                    .then(word=> resolve(word))
                    .catch(error=>reject(error))
            });
            promisesList.push(promise);
        })
        return promisesList;
    }

    static sendInfo(level,res){
        const arrayOfPositons = generateArrayOfRandomNumbers(databaseLength,1,level);
        const promisesList = this.getWordsList(arrayOfPositons);
        Promise.all(promisesList)
            .then(responses=>{
                const itens = []
                responses.forEach(response=>itens.push(response.word))
                return res.status(200).send({ itens })
            })
            .catch(error=>console.log(error))
    }
}

module.exports = Memorando;
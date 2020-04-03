const YearGame = require('../models/game/yearGame/yearGameService');

class YearGameController{
    static async create(params){
        try {
            return await new YearGame(params);
        } catch (error) {
            console.log('Erro ao criar ano', error);
        }
    }

    static async find(params){
        try {
            return await YearGame.findOne(params)
        } catch (error) {
            console.log('Erro ao buscar ano', error);
        }
    }
}

module.exports = YearGameController;
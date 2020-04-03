const UserGame = require('../models/game/userGame/userGameService');

class UserGameController{

    static async find(params){
        try{
            return await UserGame.findOne({ user: params.user, game: params.game});
        }catch(error){
            console.log('Erro ao buscar UserGame', error);
        }
    }

    static async create(params){
        try {
            const userGame = new UserGame({ user: params.user, game: params.game });
            await userGame.save()
            return userGame;
        } catch (error) {
            console.log('Erro ao criar UserGame', error);
        }
    }
}

module.exports = UserGameController;
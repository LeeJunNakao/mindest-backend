const Game = require('../models/game/gameService');

class GameController{
    static async findGame(req,res,next){
        try{
            const games = await Game.find(req.query);
            return res.status(200).send(games);
          }catch(e){
            console.log('erro no /game', e);
          }
    }
}


module.exports = GameController;
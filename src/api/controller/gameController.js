const Game = require('../models/game/gameService');
const UserGame = require('../models/game/userGame/userGameService');

class GameController{
    static async find(params){
        try{
            const games = await Game.find(params);
            return games;
          }catch(e){
            console.log('erro no /game', e);
          }
    }

    static async findUserGame(req,res,next){
      const user  = req.decoded._id;
      try {
        const userGame = await UserGame.find({ user });
        return res.status(200).send(userGame);
      } catch (error) {
        
      }
    }

}


module.exports = GameController;
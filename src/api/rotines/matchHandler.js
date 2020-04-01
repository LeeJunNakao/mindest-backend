const MatchController = require('../controller/matchController');

const { gameExists, pushMatchIntoUserGame, IsUsergameOnYearDatabase, pushUsergameOnYearDatabase, getUsergame } = require('./Utils')

module.exports = async (req,res,next,points)=>{
    const user_id=req.decoded.user._id || ''
    const params_game = req.body.game._id ||  ''
    const params_level = req.body.game.level || ''
    const params_date = new Date(Date.now())
    const params_year = params_date.getFullYear()
    const params_points = points

    const params = {
        user: user_id, game: params_game, difficulty: params_level, date: params_date, year: params_year, points: params_points
    }

    if(await gameExists(params_game)){
        let year;

        const match = await MatchController.create(params);
        const userGame = await getUsergame(params,res)
        await pushMatchIntoUserGame(userGame,match)
        if(!await IsUsergameOnYearDatabase(userGame)){
            await pushUsergameOnYearDatabase(params,year,userGame)
        }
        res.send('ok')
        
    }else{
        return res.send('Nao existe jogo')
    }
}

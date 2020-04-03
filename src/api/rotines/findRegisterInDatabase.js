const UserGame = require('../models/game/userGame/userGameService')
const YearGame = require('../models/game/yearGame/yearGameService')

module.exports = async (req,res,next)=>{
    const user_id=req.decoded.user._id || ''
    const params_game = req.body.game._id ||  ''
    const params_level = req.body.game.level || ''
    const params_date = req.body.date || ''
    const params_year = req.body.year || ''
    const params_points = req.body.game.points || ''

    const params = { 
        user: user_id, game: params_game, difficulty: params_level, date: params_date, year: params_year, points: params_points
    }

    
    let userGame = await UserGame.find({ user: params.user })
    let id = userGame[0].id
    let year = await YearGame.find({ userGame: id })
    if(Array.isArray(year) && year.length>0){
        console.log(year)
    }
    
    // let result = year
    // console.log(result)
    res.status(200).send('ok')
    
}
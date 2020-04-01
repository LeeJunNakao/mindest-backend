const Game = require('../models/game/gameService')
const Match = require('../models/game/match/matchService')
const YearGame = require('../models/game/yearGame/yearGameService')
const UserGame = require('../models/game/userGame/userGameService')

async function pushMatchIntoUserGame(userGame,match){
    try{
        await userGame.match.push(match)
        await userGame.save()
    }catch(err){
        console.log('erro ao inserir match em UserGame', err)
    }
    
}

async function yearRegisterExists(params){
    try{
        const year = await YearGame.find({ year: params.year })
        if(year.length<1){
            return false
        }else{
            return true
        }
    }catch(err){
        console.log('Erro verificar se ano existe', err)
    }
}

async function pushUsergameOnYearDatabase(params,year,userGame){
    try{
        if(!await yearRegisterExists(params)){
            year = await new YearGame({ year: params.year })
        }else{
            year = await YearGame.findOne({ year: params.year })
        }

        await year.userGame.push(userGame._id)
        await year.save()
    }catch(err){
        console.log('erro ao inserir usergame no ano', err)
    }
    
}



async function IsUsergameOnYearDatabase(userGame){
    const year = await findYearThatHasUsergame(userGame)
    if(year.length==0){
        return false
    }else{
        return true
    }
}

async function findYearThatHasUsergame(userGame){
    let year=[]
    try{
        year = await YearGame.find({ userGame: userGame._id})
    }catch(err){
        console.log('Erro ao procurar o ano que contem userGame',err)
    }
    return year
}

async function findDatabase(Model, parameter){
    let model = []
    try{
        model = await Model.find(parameter)
        if(model.length<1){
            console.log('menor que 1?')
        }
    }catch(e){
        console.log('ERRO', e)
    }
    if(Array.isArray(model)){
        return model[0]
    }else{
        return model
    }
}

async function getDatabase(Model,parameter){
    let model=[]
    try{
        model =  await Model.find(parameter)
        if(model.length<1){
            model = await new Model( parameter )
            await model.save()
        }
    }catch(e){
        console.log(e)
    }
    if(Array.isArray(model)){
        return model[0]
    }else{
        return model
    }
    
}

async function createMatchRegister(params){
    const match = await new Match({
        user: params.user, 
        difficulty: params.difficulty, 
        points: params.points,
        date: params.date
    })
    await match.save()

    return match
}
   



async function gameExists(_id){
    let game=false
    try{
        game = await Game.find({ _id })
        if(game.length>0) return true
    }catch(err){
        console.log(err)
    }
    
}

async function getUsergame(params){

    return await getDatabase(UserGame, { user: params.user, game: params.game })
   
    
}

module.exports = { getDatabase, gameExists, createMatchRegister, findDatabase, pushMatchIntoUserGame, IsUsergameOnYearDatabase, pushUsergameOnYearDatabase, getUsergame }
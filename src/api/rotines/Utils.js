const YearGameController = require('../controller/yearGameController')
const GameController = require('../controller/gameController');
const UserGameController = require('../controller/userGameController');
const RecordGameController = require('../controller/recordGameController');

async function pushMatchIntoUserGame(userGame,match){
    try{
        await userGame.match.push(match);
        await userGame.save();
    }catch(err){
        console.log('erro ao inserir match em UserGame', err);
    }
    
}

async function UserGameIsNotOnYearDatabase(userGame){
    const year = await findYearThatHasUsergame(userGame);
    return year.length ==0 ? true : false;
}

async function findYearThatHasUsergame(userGame){
    return await YearGameController.find({ userGame: userGame._id})
}

async function gameExists(_id){
    const game = await GameController.find({ _id })
    return game ? true : false
}

async function ifNotExistsUserGameCreateIt(params){
    const userGame = await UserGameController.find({ user: params.user, game: params.game })
    if(userGame){
        return userGame;
    }else{
        return await UserGameController.create({ user: params.user, game: params.game});
    }
}

async function recordGameExistsForUserAndGame(user, game){
    const recordGame = await RecordGameController.find({ user, 'records.game': game });

    return recordGame ? true : false;
}

async function recordGameExistsForUserOnly(user,game){
    const resultForUser = await RecordGameController.find({ user });
    const resultForUserAndGame = await RecordGameController.find({ user, 'records.game': game })

    return resultForUser && !resultForUserAndGame ? true : false;
}

async function recordGameNotExistsForUser(user){
    const result = await RecordGameController.find({ user });
    return result ? false : true;
}

async function runRotinesIfRecordExistsForUserAndGame(user,game,points){
    if(await recordGameExistsForUserAndGame(user, game)){
        RecordGameController.updateRegister(user,game,points)
    }
}
async function runRotinesIfRecordExistsForUserOnly(user,game,points){
    if(await recordGameExistsForUserOnly(user,game)){
        await RecordGameController.addRegister(user,game,points)
    }
}

async function runRotinesIfRecordNotExistsForUser(user,game,points){
    if(await recordGameNotExistsForUser(user)){
        await RecordGameController.create(user,game,points);
    }
}

async function registerRecordGame(user,game,points){
    runRotinesIfRecordExistsForUserAndGame(user,game,points);
    runRotinesIfRecordExistsForUserOnly(user,game,points);
    runRotinesIfRecordNotExistsForUser(user,game,points);
}



module.exports = {  gameExists, pushMatchIntoUserGame, UserGameIsNotOnYearDatabase, registerRecordGame, ifNotExistsUserGameCreateIt }
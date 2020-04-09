const YearGameController = require('../controller/yearGameController')
const GameController = require('../controller/gameController');
const UserGameController = require('../controller/userGameController');
const RecordGameController = require('../controller/recordGameController');
const MatchController = require('../controller/matchController');

class MatchHandler{
    constructor(req,res,points){
        this.params = {
            user: req.decoded.user._id || '',
            game: req.body.game._id ||  '',
            difficulty: req.body.game.level || '',
            date: new Date(Date.now()),
            year: new Date(Date.now()).getFullYear(),
            points
        }

        this.processMatch(res);
    }

    async processMatch(res){
        await gameExists(this.params.game) ? this.continueProcess(res) : this.terminateProcess(res);
    }

    async continueProcess(res){
        await this.createMatchRegister();
        await this.ifNotExistsUserGameCreateIt();
        await this.pushMatchIntoUserGame();
        await this.pushUserGameIntoYear();
        await registerRecordGame(this.params.user,this.params.game,this.params.points)
        return res.status(200).json({ points: this.params.points })
    }

    async terminateProcess(res){
        return res.send('Nao existe jogo')
    }

    async createMatchRegister(){
        this.match = await MatchController.create(this.params);
    }

    async ifNotExistsUserGameCreateIt(){
        const { user, game } = this.params;
        this.userGame = await UserGameController.find({ user, game })
        if(!this.userGame){
            this.userGame = await UserGameController.create({ user: user, game: game});
        }
    }

    async pushMatchIntoUserGame(){
        try{
            await this.userGame.match.push(this.match);
            await this.userGame.save();
        }catch(err){
            console.log('erro ao inserir match em UserGame', err);
        }
    }

    async registerRecordGame(){
        await runRotinesIfRecordExistsForUserAndGame(this.user,this.game,this.points);
        await runRotinesIfRecordExistsForUserOnly(this.user,this.game,this.points);
        await runRotinesIfRecordNotExistsForUser(this.user,this.game,this.points);
    }

    async pushUserGameIntoYear(){
        await this.findYear();
        await this.ifNotExistsYearCreateIt();
        if(await this.YearHasNotUserGame()){
            this.year.userGame.push(this.userGame._id);
            await this.year.save();
        }
    }

    async findYear(){
        this.year = await YearGameController.find({ year: this.params.year });
    }

    async ifNotExistsYearCreateIt(){
        if(!this.year){
            this.year = await YearGameController.create({ year: this.params.year})
            await this.year.save();
        }
    }

    async YearHasNotUserGame(){
        const userGame = await YearGameController.find({ userGame: this.userGame._id });
        return userGame ? false : true
    }

}


async function gameExists(_id){
    const game = await GameController.find({ _id })
    return game ? true : false
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
        await RecordGameController.updateRegister(user,game,points)
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



module.exports = MatchHandler;
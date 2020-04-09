const Statistic = require('./Classes/Statistic')

class StatisticsRotines extends Statistic {
    constructor(request,response){
        super(request,response);
    }

    async getLastWeekOfGames(){
        await this.findYearGame();
        this.getUserGameList();
        await this.findUserGameOfYearGame(this.userGameList);

        if(this.userGame.length>0){
            await this.getThisWeekMatches();
            this.splitUserGameMatchIntoDays();
            this.insertStatisticsInArray(this.userGame);
            // return this.response.status(200).send({ response })

            return this.response.status(200).send({ response: this.userGame });
        }else{
            this.response.status(200).send({response: 'error'})
        }
    }

    async findUserGameOfYearGame(userGameList){
        this.pushPromises(userGameList,this.findUserGameOfYearGamePromise);
        await this.processPromises();
    }

}


async function getLastWeekOfGames(req,res){
    const statisticsController = new StatisticsRotines(req,res);
    statisticsController.getLastWeekOfGames()
}

module.exports = { getLastWeekOfGames }




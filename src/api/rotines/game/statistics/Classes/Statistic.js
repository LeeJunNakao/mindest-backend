const UserGameController = require('../../../../controller/userGameController');
const YearGameController = require('../../../../controller/yearGameController');
const Utils = require('./StatisticUtils')

const CLEAR = 'CLEAR'
const PROCESSING = 'PROCESSING'

class Statistic extends Utils{
    constructor(req,res){
        super();
        this.request=req;
        this.response=res;
        this.user = req.decoded.user._id;
        this._dateNow = new Date(Date.now())
        this.year = this._dateNow.getFullYear();
        this.today = this._dateNow.getDate();
        this.month = this._dateNow.getMonth();  
        this.game= req.query.game;
        this.userGame = [];
        
        this.promises=[];
        this.state=CLEAR;

        this.findUserGameOfYearGamePromise = this.findUserGameOfYearGamePromise.bind(this);
    }

    changeState(state){
        this.state = state;
        if(state==CLEAR) this.promises = [];
    }

    changeStateToClear(){
        this.changeState(CLEAR);
    }

    changeStateToProcessing(){
        this.changeState(PROCESSING);
    }

    async processPromises(){
        this.promises.length>0 ? this.changeStateToProcessing() : this.changeStateToClear()
        if(this.state==PROCESSING){
            const promise = this.promises[0];
            await promise();
            this.promises.splice(0,1);
            await this.processPromises();
        }
    }

    pushPromises(list,callback){
        list.forEach(item=>{
            const promise = async ()=> callback(item)
            this.promises.push(promise)
        });
    }

    async findUserGameOfYearGamePromise(userGameId){
        let userGame = await UserGameController.find({ _id: userGameId })
        if(userGame){
            if(userGame.user==this.user){
                userGame = JSON.parse(JSON.stringify(userGame))
                userGame.statistics={};
                this.userGame.push(userGame);
            }
        }
    }

    async getThisWeekMatches(){
        this.userGame.forEach(userGame=>{
            const matches = userGame.match;
            const filteredMatches = matches.filter(item=>{
                const date = new Date(item.date);
                const day = date.getDate();
                const month = date.getMonth();
                return day+7 >= this.today && month == this.month
            });
            userGame.match = filteredMatches;
        });
    }

    splitUserGameMatchIntoDays(){
        this.userGame.forEach(userGame=>{
            const matches = userGame.match;
            userGame.statistics.days= this.splitMatchesIntoDays(matches);
            delete userGame.__v;
        });
    }

    async findYearGame(){
        this.yearGame = await YearGameController.find({ year: this.year });
        this.yearGame = JSON.parse(JSON.stringify(this.yearGame));
    }

    getUserGameList(){
        this.userGameList = this.yearGame.userGame;
        this.userGameList = JSON.parse(JSON.stringify(this.userGameList))
    }
}

module.exports = Statistic;
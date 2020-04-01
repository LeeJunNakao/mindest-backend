const Match = require('../models/game/match/matchService');

class MatchController{
    static async create(params){
        const match = await new Match({
            user: params.user, 
            difficulty: params.difficulty, 
            points: params.points,
            date: params.date
        });
        await match.save();

        return match;
    }
}

module.exports = MatchController;
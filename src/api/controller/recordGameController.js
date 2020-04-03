const { RecordGame, RecordGameRegister } = require('../models/game/recordGame/recordGameService');

class RecordGameController{
    static async create(user,game,points){
        try {
            const recordRegister = new RecordGameRegister({ game, points });
            const recordGame = new RecordGame({ user });
            recordGame.records.push(recordRegister);
            await recordGame.save(); 
        } catch (error) {
            console.log('Erro ao criar Record', error);
        }
        
    }

    static async find(params){
        try {
            const result = await RecordGame.findOne(params);
            return result;
            
        } catch (error) {
            console.log('Erro ao buscar Record', error);
        }
        
    }

    static async addRegister(user,game,points){
        try {
            const recordRegister = new RecordGameRegister({ game, points });
            const recordGame = await this.find({ user });
            recordGame.records.push(recordRegister);
            await recordGame.save();
        } catch (error) {
            console.log('Erro ao adicionar registro no record', error);
        }
    }

    static async updateRegister(user,game,points){
        const recordGame = await this.find({user, 'records.game': game})
        const recordRegister = recordGame.records.filter(item=> item.game == game)[0]
        if(recordRegister.points<points) recordRegister.points = points;
        recordGame.save();
    }
}

module.exports = RecordGameController;
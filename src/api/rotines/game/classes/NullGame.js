class NullGame{
    static sendInfo(res){
      return res.status(400).json({errors: ['Jogo inexistente!']})
    }
  }


module.exports = NullGame;
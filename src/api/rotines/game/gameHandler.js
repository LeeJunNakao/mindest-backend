const GameManager = require('./gameManager');
const matchHandler = require('../matchHandler');
const GameController = require('../../controller/gameController');

async function initGame(req,res,next) {

    const { level, gameName } = { ...req.query };
    const Game = GameManager(gameName);

    if(Game.name === 'NullGame'){
      return Game.sendInfo(res);
    }else{
      return Game.sendInfo(level,res);
    }
    
}

function receiveUserAnswer(req,res,next){
  const { answerItens, gameItens } = req.body;
  const points = calculatePoints(gameItens, answerItens);
  
  matchHandler(req,res,next,points);
}

function calculatePoints(gameItens, answerItens){
  let points=0
  for(let i=0; i<gameItens.length; i++){
    if(gameItens[i]==answerItens[i]) points++
  }
return points
}

async function findGame(req,res,next){
  const params = req.query
  games = await GameController.find(params);
  if(games){
    return res.status(200).send(games);
  }else{
    return res.status(404).json({ errors: ['Game not found']});
  }
};

module.exports = { initGame, receiveUserAnswer, findGame }

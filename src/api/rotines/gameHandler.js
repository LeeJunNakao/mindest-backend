const { generateArray } = require('./gameUtils')
const matchHandler = require('./matchHandler')

function initGame(req,res,next) {
    const { level } = { ...req.query };
    const response = {};

    response.itens = generateArray(level);
    res.status(200).send(response);
}

function receiveUserAnswer(req,res,next){
  const { answerItens, gameItens } = req.body;
  const points = calculatePoints(gameItens, answerItens);
  
  matchHandler(req,res,next,points);
}

function calculatePoints(gameItens, answerItens){
  let points=0
  for(let i=0; i<gameItens.length; i++){
    console.log("game item", i, gameItens[i])
    console.log("aswer item", i, answerItens[i])
    if(gameItens[i]==answerItens[i]) points++
    console.log(points)
  }
return points
}

module.exports = { initGame, receiveUserAnswer }

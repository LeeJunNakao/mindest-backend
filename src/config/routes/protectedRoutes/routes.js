const auth = require('../../middlewares/auth');
const Year = require('../../../api/models/game/yearGame/yearGameService')
const find = require('../../../api/rotines/findRegisterInDatabase')
const matchHandler = require('../../../api/rotines/matchHandler')
const GameController = require('../../../api/controller/gameController')
const { getUserHistory } = require('../../../api/rotines/home')
const { initGame, receiveUserAnswer } = require('../../../api/rotines/gameHandler')

module.exports = (app,express)=>{

  const protectedAPI = express.Router();

  protectedAPI.use(auth);

  app.use('/api',protectedAPI);
  Year.register(protectedAPI,'/year');

  protectedAPI.get('/match', matchHandler);
  protectedAPI.get('/find', find);
  protectedAPI.get('/home',getUserHistory);
  protectedAPI.get('/game',GameController.findGame);
  protectedAPI.get('/gameInfo', initGame);
  protectedAPI.post('/receiveUserAnswer', receiveUserAnswer);
}

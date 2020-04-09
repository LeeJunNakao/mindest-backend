const auth = require('../../middlewares/auth');
const matchHandler = require('../../../api/rotines/matchHandler');
const { getUserRecords } = require('../../../api/rotines/records');
const { initGame, receiveUserAnswer, findGame } = require('../../../api/rotines/game/gameHandler');
const { receiveImage, getImageURL } = require('../../../api/rotines/images')
const { getUserInfo } = require('../../../api/rotines/user');
const { getLastWeekOfGames} = require('../../../api/rotines/game/statistics')

module.exports = (app,express)=>{

  const protectedAPI = express.Router();

  protectedAPI.use(auth);
 

  app.use('/api',protectedAPI);
  
  
  protectedAPI.get('/userInfo',getUserInfo);
  protectedAPI.get('/match', matchHandler);
  protectedAPI.get('/home',getUserRecords);
  protectedAPI.get('/game',findGame);
  protectedAPI.get('/gameInfo', initGame);
  protectedAPI.post('/receiveUserAnswer', receiveUserAnswer);
  protectedAPI.post('/sendImage',receiveImage);
  protectedAPI.get('/getImage', getImageURL); 
  protectedAPI.get('/statistics/lastWeekGames',getLastWeekOfGames);
}

const auth = require('../../middlewares/auth');
const adminAuth = require('../../middlewares/adminAuth');
const Game = require('../../../api/models/game/gameService');

module.exports = (app,express)=>{
    const adminAPI = express.Router();

    adminAPI.use(auth);
    adminAPI.use(adminAuth);

    app.use('/adminapi',adminAPI);

    Game.register(adminAPI,'/game')
}
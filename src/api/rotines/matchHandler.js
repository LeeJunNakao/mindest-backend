const MatchHandler = require('./Utils');

module.exports = async (req,res,next,points)=>{
   new MatchHandler(req,res,points);
}

const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req,res,next)=>{
    const token = req.headers.token || req.body.token || req.query.token || ''
    if(req.method==='OPTIONS'){
        next();
    }else if(token==''){
        return res.status(401).send({ error: 'Token não informado, favor se autenticar para prosseguir.'})
    }else{
      jwt.verify(token,env.authSecret,(err,decoded)=>{
          if(err){
              return res.status(403).send('Falha na autenticação!')
          }else{
              req.decoded = decoded
              next();
          }
      })
    }
}

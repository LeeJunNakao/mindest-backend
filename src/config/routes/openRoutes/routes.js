const { login, register, validateToken } = require('../../auth/authService')
const Year = require('../../../api/models/game/yearGame/yearGameService')
module.exports = (app)=>{
    
    app.post('/register',register)
    app.get('/register',(req,res,next)=>{
        res.status(200).send({ response: ok })
    })
    app.post('/login',login)
    app.post('/validateToken',validateToken)
    Year.register(app,'/year')
}
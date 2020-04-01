const { login, register, validateToken } = require('../../auth/authService')
const Year = require('../../../api/models/game/yearGame/yearGameService')
module.exports = (app)=>{
    
    app.post('/register',register)
    app.post('/login',login)
    app.post('/validateToken',validateToken)
    Year.register(app,'/year')
}
const jwt = require('jsonwebtoken')
const env = require('./src/config/.env')

let data = { 
    user: 'leejun',
    password: 'a12bc3d4@'
}

const token = jwt.sign(data,env.authSecret,{
    expiresIn: '1 day'
})

console.log(token)

jwt.verify(token,env.authSecret,(err,decoded)=>{
    console.log(decoded)
})
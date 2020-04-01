const _ = require('lodash')
const jwt = require('jsonwebtoken')
const User = require('../../api/models/user/userService')
const bcryptjs = require('bcryptjs')
const env = require('../.env')

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$_*%]).{6,20})/;

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

const register = (req,res,next)=>{
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirm_password = req.body.confirm_password || ''
    if(!email.match(emailRegex)){
        return res.status(400).send({errors: ['Email não válido!']})
    }
    if(!password.match(passwordRegex)){
        return res.status(400).send({errors: ['A senha deve ter letras maiusculas, minusculas, numeros e caracteres especiais: [@*_#$%] e tamanho entre 6-20 caracteres.']})
    }
    if(password!=confirm_password){
        return res.status(400).send({
            errors: ['Senhas não conferem ou invalidas']
        })
    }

    const salt = bcryptjs.genSaltSync()
    const hashPassword = bcryptjs.hashSync(password,salt)

    User.findOne({ email },(err,user)=>{
        if(err){
            return sendErrorsFromDB(res,err)
        }else if(user){
            return res.status(400).send({
                errors: ['Usuário já cadastrado.']
            })
        }else{
            const newUser = User({ name, email, password: hashPassword, authorization:'user' })
            newUser.save(err=>{
                if(err){
                    return sendErrorsFromDB(res,err)
                } else{
                    login(req,res,next)
                }
            })
        }
    })
}

const login = (req,res,next)=>{
    const email = req.body.email || ''
    const password = req.body.password || ''

    User.findOne({ email }, (err,user)=>{
        if(err){
            return sendErrorsFromDB(res,err)
        }else if(user && bcryptjs.compareSync(password,user.password)){
            let payload = { user }
            const token = jwt.sign(payload,env.authSecret,{
                expiresIn: '2 days'
            })
            const { name, email, authorization, _id } = user
            res.json({ name, email, token, authorization, _id})
        }else{
            res.status(400).send({
                errors: ['Usuário/Senha inválidos']
            })
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || req.headers.token ||''
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

module.exports = { login, register, validateToken}

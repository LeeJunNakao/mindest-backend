const {History, HistoryData} = require('../models/user/history/userHistoryService')

async function userHistoryExists(user){
    try{
        const userHistory = await History.find({ user })
        return userHistory.length>0 ? true : false
    }catch(e){
        console.log('Erro ao solicitar historico do Usuario', e)
        return true
    }
}

async function getuserHistoryRegister(user){
    const data= await History.find({user})
    return data[0]
}

async function createUserHistoryRegister(user){
    try{
        const userHistory = new History({ user })
        await userHistory.save()
        return userHistory
    }catch(e){
        console.log('Erro ao criar o historico do usuario.',e)

    }
    
}   

module.exports = { userHistoryExists , getuserHistoryRegister, createUserHistoryRegister}
const {userHistoryExists, getuserHistoryRegister, createUserHistoryRegister} = require('./homeUtils')


async function getUserHistory(req,res,next){
    const user = req.decoded._id
    if(await userHistoryExists(user)){
        const userHistory = await getuserHistoryRegister(user)
        return res.status(200).send(userHistory)
    }else{
        await createUserHistoryRegister(user)
        return res.status(404).send({
            errors: ['Não foi foi possível criar acessar dados do usuário, tente novamente mais tarde.']
        })
    }
}

module.exports = { getUserHistory }

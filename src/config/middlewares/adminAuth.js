module.exports = (req,res,next)=>{
    if(req.decoded.user.authorization == "admin"){
        next();
    }else{
        return res.status(403).send({
            errors: ['Usuário não tem autoridade suficiente.']
        })
    }
}
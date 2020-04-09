const UserController = require('../../controller/userController');

async function getUserInfo(req,res,next){
    const id = req.query._id;
    
    const { response, user } = await UserController.getUserInfo(id);
    const info = { 
        user: {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            _id: user._id
        }  
    }
    if(response == 'success'){
        return res.status(200).send(info);
    }else{
        return res.status(404).send({ errors: ['Usuario não localizado'] })
    }

}


module.exports = { getUserInfo }
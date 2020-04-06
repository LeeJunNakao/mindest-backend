const base64Img = require('base64-img');
const env = require('../../../config/.env')
const UserController = require('../../controller/userController');

function receiveImage(req,res,next){
    const { image, name } = req.body.imageData;

    const userId = req.decoded.user._id;
    const path = `${process.cwd()}/statics/images/${userId}`;
    const filename = name.split('.')[0];
    const imageUrl = `${env.url.main}/${env.url.static}/images/${userId}/${name}`
    
    base64Img.img(image, path,filename,async (err,data)=>{
        if(err) return res.status(400).json({ errors: ['Falha ao enviar arquivo.']})

        const avatar = await UserController.setAvatarURL(userId,imageUrl);
        if(avatar.response=="success"){
            return res.send({ response: imageUrl })
        }else{
            return res.status(400).json({ errors: ['Falha ao enviar arquivo.']})
        }
        
    })
}

async function getImageURL(req,res,next){
    const userId = req.decoded.user._id;
    const url = await UserController.getAvatarURL(userId)

    if(url.response=="success"){
        return res.status(200).send({ avatar: url.avatar})
    }else{
        return res.status(404).send({ errors: ['Falha ao tentar buscar o avatar']})
    }
}

module.exports = { receiveImage, getImageURL};
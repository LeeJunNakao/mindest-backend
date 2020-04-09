const User = require('../models/user/userService');

class UserController{
    static async setAvatarURL(_id,url){
        try {
            const user = await User.findOne({ _id });
            user.avatar = url;
            await user.save()
            return { response: 'success'}
        } catch (error) {
            console.log('Erro ao alterar o avatar em User',error);
            return { response: 'error '}
        }
    }

    static async getAvatarURL(_id){
        try {
            const user = await User.findOne({ _id })
            return { response: 'success', avatar: user.avatar };
        } catch (error) {
            console.log('Erro ao buscar o avatar em User',error);
            return { response: 'error '}
        }
    }

    static async getUserInfo(_id){
        try {
            const user = await User.findOne({ _id });
            return { response: 'success', user}
        } catch (error) {
            console.log('Erro ao buscar as informações em User',error)
            return { response: 'error'}
        }
    }
}

module.exports = UserController;
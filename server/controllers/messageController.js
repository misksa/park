//Создаем для роута свой контроллер, конкретно для messageRouter
//создаем класс функций для отправки сообщений и получения сообщений
const ApiError = require('../error/apiError')

const {Message} = require('../models/models')
const userDto = require('../dtos/userDtos')
const Decode = require('jwt-decode')



class messageController {
    async send (req, res, next) {
        try {
            let {remark, itemId} = req.body
            const User = Decode(req.headers.authorization)
            const UserDto = new userDto(User)
            const sendMessage = await Message.create({remark: remark, userId: UserDto.id, itemId: itemId})
            return res.json(sendMessage)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
            console.log(e)

        }
    }
    async get (req, res) {
        let getMessage
        getMessage = await Message.findAll()
        return res.json(getMessage)
    }

}

module.exports =  new messageController()
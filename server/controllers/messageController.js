//Создаем для роута свой контроллер, конкретно для messageRouter
//создаем класс функций для отправки сообщений и получения сообщений
const ApiError = require('../error/apiError')

const {Message} = require('../models/models')
const dtoService = require("../service/dtoService");
const messageService = require('../service/messageService')



class messageController {
    //Функция отправки сообщения, заметки
    async send (req, res, next) {
        try {
            const {remark, itemId} = req.body
            if(!remark || !itemId) {
                return res.json({status: 204, message: 'Нет данных о сообщении и пользователе'})
            }
            const User = await dtoService.User(req.headers.authorization)
            const sendMessage = await messageService.Send(remark, itemId, User)
            return res.json({status: 200, message: 'Отправлено'})
        }
        catch (e) {
            return res.json(e.message)
        }
    }
    //Функция получения сообщений
    async get (req, res, next) {
        try {
            const getMessage = await Message.findAll({
                //Получаем сообщения, с последних записей
                order: [
                    ['id', 'DESC']
                ]
            })
            return res.json(getMessage)
        } catch (e) {
            return res.json(e.message)
        }
    }

}

module.exports =  new messageController()
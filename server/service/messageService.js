const ApiError = require("../error/apiError");
const {Message} = require("../models/models");

class messageService {
    //Отправка сообщений
    async Send (remark, itemId, User) {
        const sendMessage = await Message.create({remark: remark, userId: User.id, itemId: itemId})
        return sendMessage
    }
}

module.exports = new messageService()
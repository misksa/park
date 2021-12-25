const countService = require('../service/countService')
const dtoService = require("../service/dtoService");

class CountController {
    //Обрабатываем запрос на подсчет кол-ва предметов
    async count (req, res, next) {
        try {
            //Получаем объект с данными о пользователе из accessToken
            const User = await dtoService.User(req.headers.authorization)
            //Передаем запрос в сервис
            const Count = await countService.count(User)
            //Возвращаем ответ на клиент
            return res.json(Count)
        } catch (e) {
            //Если произошла ошибка возвращаем её на клиент
            return res.json(e.message)
        }
    }
}

module.exports = new CountController()
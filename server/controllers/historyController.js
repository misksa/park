//Создаем для роута свой контроллер, конкретно для furnitureRouter

//Импортируем модель мебели
const {history} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания, получения и редактирования записей бд в таблице истории
class historyController {

    async get(req, res) {
        let getHistory
        getHistory = await history.findAll()
        return res.json(getHistory)
    }
}

module.exports =  new historyController()
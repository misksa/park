//Создаем для роута свой контроллер, конкретно для furnitureRouter

const historyService = require('../service/historyService')
//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания, получения и редактирования записей бд в таблице истории
class historyController {
    async get(req, res, next) {
        try {
            let {limit, page} = req.query
            page = page || 1
            limit = limit || 15
            let offset = page * limit - limit
            const getHistory = await historyService.Get(limit, offset)
            return res.json(getHistory)
        } catch (e) {
            return res.json(e)
        }
    }

    async getOne(req, res, next) {
        let {id, limit, page} = req.query
        page = page || 1
        limit = limit || 15
        let offset = page * limit - limit
        const getHistory = await historyService.GetOne(id, limit, offset)
        return res.json(getHistory)
    }
}


module.exports =  new historyController()
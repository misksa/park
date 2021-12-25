//Создаем для роута свой контроллер, конкретно для furnitureRouter

const historyService = require('../service/historyService')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания, получения и редактирования записей бд в таблице истории
class historyController {
    //Обрабатываем запрос на получение всех записей истории
    async get(req, res, next) {
        try {
            //из запроса достаем лимит и страницу
            let {limit, page} = req.query
            //подсчитываем offset
            let offset = page * limit - limit
            //передаем запрос в сервис
            const getHistory = await historyService.Get(limit, offset)
            //Возвращаем ответ на клиент
            return res.json(getHistory)
        } catch (e) {
            return res.json(e)
        }
    }
    //Обрабатываем запрос на получение истории об одном конкретном предмете
    async getOne(req, res, next) {
        let {id, limit, page} = req.query
        let offset = page * limit - limit
        const getHistory = await historyService.GetOne(id, limit, offset)
        return res.json(getHistory)
    }
}


module.exports =  new historyController()
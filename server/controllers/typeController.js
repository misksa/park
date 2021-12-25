//Создаем для роута свой контроллер, конкретно для placeRouter

//Импортируем модель офиса
const {type} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания и получения мест в офисе
class typeController {
    //Создание типов предметов пример мебель, сетевое оборудование
    async create (req, res, next) {
        try {
            const {name} = req.body
            if(!name) {
                throw ApiError.noContent('Введите имя')
            }
            const Type = await type.create(({name}))
            return res.json({status: 200, message: 'Создано'})
        } catch (e) {
            return res.json(e)
        }
    }
    async get (req, res, next) {
        try {
            const Type = await type.findAll()
            return res.json(Type)
        } catch (e) {
            return res.json(e)
        }
    }
}


module.exports =  new typeController()
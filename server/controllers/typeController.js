//Создаем для роута свой контроллер, конкретно для placeRouter

//Импортируем модель офиса
const {type} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания и получения мест в офисе
class typeController {
    async create (req, res) {
        const {name} = req.body
        if(!name) {
            throw ApiError.noContent('Empty Data')
        }
        const Type = await type.create(({name}))
        return res.json({Type})
    }
    async get (req, res) {
        const Type = await type.findAll()
        return res.json(Type)
    }
}


module.exports =  new typeController()
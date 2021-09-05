//Создаем для роута свой контроллер, конкретно для placeRouter

//Импортируем модель офиса
const {type} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания и получения мест в офисе
class typeController {
    async create (req, res) {
        const {name} = req.body
        const Type = await type.create(({name}))
        return res.json({Type})
    }
    async get (req, res) {
        const Type = await type.findAll()
        return res.json(Type)
    }
    async edit (req, res) {

    }
}


module.exports =  new typeController()
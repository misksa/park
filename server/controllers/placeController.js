//Создаем для роута свой контроллер, конкретно для placeRouter

//Импортируем модель офиса
const {place} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания и получения мест в офисе
class placeController {
    async create (req, res) {
        const {name, officeId} = req.body
        const Place = await place.create(({name, officeId}))
        return res.json({Place})
    }
    async get (req, res) {
        const places = await place.findAll()
        return res.json(places)
    }
    // async update (req, res) {
    //     const {officeId} = req.body
    //     const Subtype = await place.create(({officeId: officeId}))
    //     return res.json(Subtype)
    // }
}


module.exports =  new placeController()
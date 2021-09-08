//Создаем для роута свой контроллер, конкретно для placeRouter

//Импортируем модель офиса
const {place} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')
const {where} = require("sequelize");

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
    async delete (req, res) {
        const {placeId} = req.body
        const Place = await place.destroy(({where: {id: placeId}}))
        return res.json(Place)
    }
    async edit (req, res) {
        const {placeId, name} = req.body
        const Place = await place.update({name: name}, {where: {id:placeId}})
        return res.json(Place)
    }
}


module.exports =  new placeController()
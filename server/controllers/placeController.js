//Создаем для роута свой контроллер, конкретно для placeRouter

//Импортируем модель офиса
const {place} = require('../models/models')
const ApiError = require("../error/apiError");

//Импортируем ApiError

//создаем класс функций для создания и получения мест в офисе
class placeController {
    async create (req, res, next) {
        try {
            const {name, officeId} = req.body
            if(officeId === 'undefined') {
                throw ApiError.noContent('Выберите офис')
            }
            if(!name) {
                throw ApiError.noContent('Выберите офис и введите имя')
            }
            const Place = await place.create(({name, officeId}))
            return res.json({status: 200, message: 'Создано'})
        } catch (e) {
            return res.json(e)
        }
    }
    async get (req, res, next) {
        try {
            const places = await place.findAll()
            return res.json(places)
        } catch (e) {
            return res.json(e)
        }
    }
    async delete (req, res, next) {
        try {
            const {placeId} = req.body
            if(!placeId) {
                throw ApiError.noContent('Выберите место')
            }
            const Place = await place.destroy(({where: {id: placeId}}))
            return res.json({status: 200, message: 'Удалено'})
        } catch (e) {
            return res.json(e)
        }

    }
    async edit (req, res, next) {
        try {
            const {placeId, name} = req.body
            if(!placeId || !name) {
                throw ApiError.noContent('Выберите место и введите новое имя')
            }
            const Place = await place.update({name: name}, {where: {id:placeId}})
            return res.json({status: 200, message: 'Изменили!'})
        } catch (e) {
            return res.json(e)
        }
    }
}


module.exports =  new placeController()
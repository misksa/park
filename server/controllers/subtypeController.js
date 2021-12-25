//Создаем для роута свой контроллер, конкретно для placeRouter
const uuid = require('uuid')
const path = require('path')
//Импортируем модель офиса
const {subtype} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания и получения мест в офисе
class subtypeController {
    //функция создания подтипов например ноутбуки, камеры, коммутаторы
    async create (req, res, next) {
        try {
            const {name, typeId} = req.body
            const {img} = req.files

            if (typeId === 'undefined') {
                throw ApiError.noContent('Выберите тип')
            }
            if (!name || !img) {
                throw ApiError.noContent('Выберите офис и введите имя')
            }
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const Subtype = await subtype.create(({name, typeId, img: fileName}))
            return res.json({status: 200, message: 'Создано!'})
        } catch (e) {
            return res.json(e)
        }
    }
    //функция получения подтипов
    async get (req, res, next) {
        try {
            const Subtype = await subtype.findAll()
            return res.json(Subtype)
        } catch (e) {
            return res.json(e)
        }
    }
}


module.exports =  new subtypeController()
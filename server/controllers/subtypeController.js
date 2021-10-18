//Создаем для роута свой контроллер, конкретно для placeRouter
const uuid = require('uuid')
const path = require('path')
//Импортируем модель офиса
const {subtype, item, office} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания и получения мест в офисе
class subtypeController {
    async create (req, res, next) {
        try {
            const {name, typeId} = req.body
            const {img} =  req.files
            if(!name && !typeId && !img) {
                throw ApiError.noContent('Empty Data')
            }
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const Subtype = await subtype.create(({name, typeId, img: fileName}))
            return res.json(Subtype)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async get (req, res) {
        const Subtype = await subtype.findAll()
        return res.json(Subtype)
    }

    //Тут реализована логика вычеслений сколько какого оборудования в каком офисе
    async count (req, res, next) {
        try {
            let Count = []
            let officeCount = await office.count()
            for (let z = 1; z <= officeCount; z++) {
                const subtypeCount = await subtype.count()
                for (let i = 1; i <= subtypeCount; i++) {
                    let itemCount = await item.count({where: {
                            subtypeId: i,
                            officeId: z
                        }})
                    let object = {
                        officeId: z,
                        subtypeId: i,
                        count: itemCount,
                    }
                    Count.push(object)
                }
            }
            return res.json(Count)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}


module.exports =  new subtypeController()
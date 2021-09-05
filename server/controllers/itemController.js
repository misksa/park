//Создаем для роута свой контроллер, конкретно для pcRouter

const path = require('path')
const uuid = require('uuid')
const Decode = require('jwt-decode')
const itemDto = require('../dtos/itemDtos')
const userDto = require('../dtos/userDtos')
//Импортируем модель офиса
const {item, place, type} = require('../models/models')
const {history} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций для создания, получения и редактирования записей бд в таблице ноутов
class itemController {
    async create (req, res, next) {
        try {
            const User = Decode(req.headers.authorization)
            const {name, serial, inventory, manage, cpu, ram, placeId, subtypeId, officeId} = req.body
            const ItemData = await item.create({name, serial, inventory, manage, cpu, ram, placeId, subtypeId, officeId})
            const ItemDto = new itemDto(ItemData)
            const UserDto = new userDto(User)

            const historyData = await history.create({action: 'create', manage: ItemDto.manage, office: ItemDto.officeId , place: ItemDto.placeId, itemId: ItemDto.id, userId: UserDto.id})
            return res.json({ItemData, historyData})
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
            console.log(e)
        }
    }
    async get (req, res) {
        try {
            const User = Decode(req.headers.authorization)
            const UserDto = new userDto(User)
            const {officeId, placeId, subtypeId} = req.query
            let Item

            if (UserDto.role === 'superuser') {

                if(!officeId && !placeId && !subtypeId) {

                    //То выводим все предметы
                    Item = await item.findAll()
                }

                //Проверяем условие если и placeId и subtypeId не существуют т.е. равно NULL, а officeId имеет какое-либо значение
                if(officeId && !placeId && !subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями officeId
                    Item = await item.findAll({where: {officeId}})

                }
                //Проверяем условие если и officeId не существуют т.е. равно NULL, а placeId имеет какое-либо значение
                if(!officeId && placeId && !subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId
                    Item = await item.findAll({where:{placeId}})

                }
                //Проверяем условие если и officeId и placeId имеет какое-либо значение
                if(!officeId && !placeId && subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{subtypeId}})

                }
                if(!officeId && placeId && subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{placeId, subtypeId}})

                }
                if(officeId && !placeId && subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{officeId, subtypeId}})

                }
                if(officeId && placeId && !subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{officeId, placeId}})

                }

                if(officeId && placeId && subtypeId) {
                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{officeId, placeId, subtypeId}})
                }
            } else {
                //Проверяем условие если officeId  и placeId не существуют т.е. равно NULL
                if(!officeId && !placeId && !subtypeId) {
                    //То выводим все ноуты
                    Item = await item.findAll({where: {officeId: UserDto.role}})
                }

                //Проверяем условие если и placeId не существуют т.е. равно NULL, а officeId имеет какое-либо значение
                if(officeId && !placeId && !subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями officeId
                    Item = await item.findAll({where: {officeId: UserDto.role}})

                }
                //Проверяем условие если и officeId не существуют т.е. равно NULL, а placeId имеет какое-либо значение
                if(!officeId && placeId && !subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId
                    Item = await item.findAll({where:{placeId:placeId, officeId: UserDto.role}})

                }

                //Проверяем условие если и officeId и placeId имеет какое-либо значение
                if(!officeId && !placeId && subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{subtypeId: subtypeId, officeId: UserDto.role}})

                }
                if(!officeId && placeId && subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{placeId: placeId, subtypeId: subtypeId, officeId: UserDto.role}})

                }
                if(officeId && !placeId && subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{officeId: UserDto.role, subtypeId: subtypeId}})

                }
                if(officeId && placeId && !subtypeId) {

                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{officeId: UserDto.role, placeId: placeId}})

                }

                if(officeId && placeId && subtypeId) {
                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAll({where:{officeId: UserDto.role, placeId, subtypeId}})
                }
            }
            return res.json(Item)
        } catch (e) {
            return res.json(e)
        }
    }
    async update (req, res) {
        try {
            const {id, placeId, manage, officeId} = req.body
            const User = Decode(req.headers.authorization)
            let Item;
            if (id && placeId && manage && officeId) {
                const UserDto = new userDto(User)
                Item = await item.update({manage: manage, placeId: placeId},{where: { id : id }})
                const Place = await place.findByPk(placeId)
                const historyData = await history.create({action: 'Перемещен', manage: manage, place: Place.dataValues.name, office:officeId, itemId: id, userId: UserDto.id})
                return res.json({Item, historyData})
            }
            if (id && !placeId && manage) {
                Item = await item.update({manage: manage},{where: { id : id }})
                const UserDto = new userDto(User)
                const historyData = await history.create({action: 'Перемещен', manage: manage, place: placeId, itemId: id, userId: UserDto.id})
                return res.json({Item, historyData})
            }
            if (id && placeId && !manage) {
                Item = await item.update({placeId: placeId,manage: manage},{where: { id : id }})
                const UserDto = new userDto(User)
                const Place = await place.findByPk(placeId)
                const historyData = await history.create({action: 'Перемещен', manage: manage, place: Place.dataValues.name, office:officeId, itemId: id, userId: UserDto.id})
                return res.json({Item, historyData})
            }
            if (id && !placeId && !manage) {
                Item = await item.update({placeId: placeId, manage: manage},{where: { id : id }})
                const UserDto = new userDto(User)
                const historyData = await history.create({action: 'Перемещен', manage: manage, place: placeId, itemId: id, userId: UserDto.id})
                return res.json({Item, historyData})
            }

        } catch (e) {
            console.log(e)
        }
    }
    async replaceOffice (req, res) {
        try {
            const {id,officeId, placeId} = req.body
            const {img} =  req.files
            const idItems = id.split(',')
            const User = Decode(req.headers.authorization)
            const UserDto = new userDto(User)
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            let Item
            let historyData
            console.log(id)
            for (let i = 0; i < idItems.length; i++) {
                Item = await item.update({officeId: officeId, placeId: placeId},{where: { id : idItems[i]}})
                historyData = await history.create({action: 'Перемещен', place: placeId, office: officeId, itemId: idItems[i], userId: UserDto.id, img: fileName})
            }
            return res.json('Запрос прошел')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports =  new itemController()
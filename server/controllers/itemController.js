//Создаем для роута свой контроллер, конкретно для pcRouter

const itemService = require('../service/itemService')
//Импортируем модель офиса
const {item} = require('../models/models')
const dtoService = require("../service/dtoService");
const ApiError = require("../error/apiError");

//создаем класс функций для создания, получения и редактирования записей бд в таблице ноутов
class itemController {

    //Функция создания предметов
    async create (req, res, next) {
        try {
            const {name, serial, inventory, manage, cpu, ram, placeId, subtypeId, officeId} = req.body
            if(placeId === 'undefined' || subtypeId === 'undefined' || officeId === 'undefined') {
                throw ApiError.noContent('Выбери офис, место и тип тиехник')
            }
            if (!name || !serial || !inventory) {
                throw ApiError.noContent('Заполни обязательные поля')
            }
            const User = await dtoService.User(req.headers.authorization)
            const createItem = await itemService.create(name, serial, inventory, manage, cpu, ram, placeId, subtypeId, officeId, User)
            return res.json({status: 200, message: 'Добавлено'})
        }
        catch (e) {
            return res.json(e)
        }
    }
    //Функция получения предметов
    async get (req, res, next) {
        try {
            let {officeId, placeId, subtypeId, limit, page, search} = req.query
            let offset = page * limit - limit
            const User = await dtoService.User(req.headers.authorization)
            const getItems = await itemService.get(officeId, placeId, subtypeId, User, limit, offset, search)
            return res.json(getItems)
        } catch (e) {
            return res.json(e)
        }
    }
    //Функция для редактирования предметов
    async update (req, res, next) {
        try {
            const {id, placeId, manage} = req.body
            if(!placeId && !manage){
                throw ApiError.noContent('Нужно внести хоть какие-то изменения')
            }
            const User = await dtoService.User(req.headers.authorization)
            const UpdateItem = await itemService.update(id, placeId, manage, User)
            return res.json({status: 200, message: 'Изменили!'})
        } catch (e) {
            return res.json(e)
        }
    }

    //Функция для перемещения предметов между офисами
    async replaceOffice (req, res, next) {
        try {
            const {id,officeId, placeId} = req.body
            if(!id) {
                throw ApiError.noContent('Выбери предметы для переноса')
            }
            if(officeId === 'undefined' || placeId === 'undefined') {
                throw ApiError.noContent('Выбери новый офис и место в офисе')
            }
            if(!req.files) {
                throw ApiError.noContent('Загрузи акт')
            }
            const {img} =  req.files
            const User = await dtoService.User(req.headers.authorization)
            const ReplaceItem = await itemService.replaceItem(id, officeId, placeId, img, User)
            return res.json({status: 200, message: 'Предметы перемещены'})
        } catch (e) {
            return res.json(e)
        }
    }
    //Функция для изменения статуса предмета "бейджик"
    async status (req, res, next) {
        try {
            const {id, placeStatus} = req.body
            if(!id || !placeStatus) {
                throw ApiError.noContent('Не получен id и placeStatus')
            }
            const Item = await item.update({placeStatus: placeStatus},{where: {id:id}})
            return res.json({status: 200, message: 'Изменили'})
        } catch (e) {
            return res.json(e)
        }
    }

    //Функция для выдачи предмета на руки
    async giveItem (req, res, next) {
        try {
            const {id,name} = req.body
            if(!id || !name || !req.files) {
                throw ApiError.noContent('Введи имя менеджера и загрузи акт')
            }
            const {img} =  req.files

            const User = await dtoService.User(req.headers.authorization)
            const GiveItem = await itemService.give(id, name, img, User)
            return res.json({status: 200, message: 'Предмет выдан на руки'})
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports =  new itemController()
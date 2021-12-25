const {history} = require("../models/models");

class historyService {
    //Функция создание истории
    async Create(User, Item, Place) {
        try {
            return await history.create({
                action: 'Создан',
                manage: Item.manage,
                officeId: Item.officeId,
                place: Place,
                itemId: Item.id,
                user: User.username,
                nameItem: Item.name,
                inventory: Item.inventory
            })
        } catch (e) {
            throw e
        }
    }
    //Функция получения всей истории
    async Get (limit, offset) {
        return await history.findAndCountAll({
            order: [
                ['id', 'DESC']
            ],
            limit, offset
        })
    }
    //Функция получения истории одного предмета
    async GetOne (id, limit, offset) {
        return await history.findAndCountAll({
            order: [
                ['id', 'DESC']
            ],
            where:{itemId:id}, limit, offset})
    }
    //Функция при обновлении предметов
    async Update (id, Place, manage, User, Item) {
        try {
            let historyData
            if(!Place) {
                 historyData =  await history.create({action: 'Перемещен', manage: manage, itemId: id, user: User.username, nameItem: Item.name, inventory: Item.inventory})
            }
            if(!manage) {
                historyData =  await history.create({action: 'Перемещен', place: Place, itemId: id, user: User.username, nameItem: Item.name, inventory: Item.inventory})
            }
            return historyData
        } catch (e) {
            throw e
        }
    }
    //Функция при перемещении предметов между офисами
    async Replace (officeId, Place, idItems, User, fileName, Item ) {
        try {
            return await history.create({
                action: 'Перемещен',
                place: Place,
                officeId: officeId,
                itemId: idItems,
                user: User.username,
                img: fileName,
                nameItem: Item.name,
                inventory: Item.inventory
            })
        } catch (e) {
            throw e
        }
    }
    //Функция при выдаче предмета на руки
    async Give (name, id, User, fileName, Item) {
        try {
            return await history.create({
                action: 'Выдан на руки',
                manage: name,
                itemId: id,
                user: User.username,
                img: fileName,
                nameItem: Item.name,
                inventory: Item.inventory
            })
        } catch (e) {
            throw e
        }
    }
}
module.exports = new historyService()

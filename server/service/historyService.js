const {history} = require("../models/models");

class historyService {
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
    async Get (limit, offset) {
        return await history.findAndCountAll({
            order: [
                ['id', 'DESC']
            ],
            limit, offset
        })
    }
    async GetOne (id, limit, offset) {
        return await history.findAndCountAll({
            order: [
                ['id', 'DESC']
            ],
            where:{itemId:id}, limit, offset})
    }
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

const {item, place} = require('../models/models')
const ApiError = require("../error/apiError");
const dtoService = require('./dtoService')
const historyService = require('./historyService')
const accessService = require('./accessService')
const { Op } = require("sequelize");
const path = require("path");
class itemService {
    async get(officeId, placeId, subtypeId, User, limit, offset, search) {
        try {
            let Item
            if(User.role === 'admin') {
                if(!officeId && !placeId && !subtypeId) {
                    const Access = await accessService.itemAccess(User.id)
                    console.log(Access)
                    Item = await item.findAndCountAll({where: {
                        officeId: {
                            [Op.or]: Access
                        },
                    [Op.or] : {
                            name: {[Op.iLike]: `%${search}%`},
                            inventory: {[Op.iLike]: `%${search}%`},
                            manage: {[Op.iLike]: `%${search}%`},
                            serial: {[Op.iLike]: `%${search}%`}
                    }
                        },
                        limit, offset
                    })
                }
                //Проверяем условие если и officeId и placeId не имеет какое-либо значение
                if(!officeId && !placeId && subtypeId) {
                    const Access = await accessService.itemAccess(User.id)
                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAndCountAll({where:{
                            officeId: {
                                [Op.or]: Access
                            },
                            subtypeId,
                            [Op.or] : {
                                name: {[Op.iLike]: `%${search}%`},
                                inventory: {[Op.iLike]: `%${search}%`},
                                manage: {[Op.iLike]: `%${search}%`},
                                serial: {[Op.iLike]: `%${search}%`}
                            }
                        },
                        limit, offset
                    })
                }
            } else {
                if(!officeId && !placeId && !subtypeId) {
                    //То выводим все предметы
                    Item = await item.findAndCountAll({where : {
                    [Op.or] : {
                        name: {[Op.iLike]: `%${search}%`},
                        manage: {[Op.iLike]: `%${search}%`},
                        inventory: {[Op.iLike]: `%${search}%`},
                        serial: {[Op.iLike]: `%${search}%`},
                    }
                        }, limit, offset})
                }
                if(!officeId && !placeId && subtypeId) {
                    //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                    Item = await item.findAndCountAll({where:{subtypeId,
                            [Op.or] : {
                                name: {[Op.iLike]: `%${search}%`},
                                manage: {[Op.iLike]: `%${search}%`},
                                inventory: {[Op.iLike]: `%${search}%`},
                                serial: {[Op.iLike]: `%${search}%`},
                            }
                            }, limit, offset})
                }
            }
            //Проверяем условие если и placeId и subtypeId не существуют т.е. равно NULL, а officeId имеет какое-либо значение
            if(officeId && !placeId && !subtypeId) {
                //То выводим записи ноуты со всеми совпадающими значениями officeId
                Item = await item.findAndCountAll({where: {officeId,
                        [Op.or] : {
                            name: {[Op.iLike]: `%${search}%`},
                            manage: {[Op.iLike]: `%${search}%`},
                            inventory: {[Op.iLike]: `%${search}%`},
                            serial: {[Op.iLike]: `%${search}%`},
                        }
                    }, limit, offset})
            }
            //Проверяем условие если и officeId не существуют т.е. равно NULL, а placeId имеет какое-либо значение
            if(!officeId && placeId && !subtypeId) {
                //То выводим записи ноуты со всеми совпадающими значениями placeId
                Item = await item.findAndCountAll({where:{placeId,
                        [Op.or] : {
                            name: {[Op.iLike]: `%${search}%`},
                            manage: {[Op.iLike]: `%${search}%`},
                            inventory: {[Op.iLike]: `%${search}%`},
                            serial: {[Op.iLike]: `%${search}%`},
                        }
                    },
                    limit, offset})
            }
            if(!officeId && placeId && subtypeId) {
                //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                Item = await item.findAndCountAll({where:{placeId, subtypeId,
                        [Op.or] : {
                            name: {[Op.iLike]: `%${search}%`},
                            manage: {[Op.iLike]: `%${search}%`},
                            inventory: {[Op.iLike]: `%${search}%`},
                            serial: {[Op.iLike]: `%${search}%`},
                        }
                    }
                    , limit, offset})
            }
            if(officeId && !placeId && subtypeId) {
                //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                Item = await item.findAndCountAll({where:{officeId, subtypeId,
                        [Op.or] : {
                            name: {[Op.iLike]: `%${search}%`},
                            manage: {[Op.iLike]: `%${search}%`},
                            inventory: {[Op.iLike]: `%${search}%`},
                            serial: {[Op.iLike]: `%${search}%`},
                        }
                    },
                    limit, offset})
            }
            if(officeId && placeId && !subtypeId) {
                //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                Item = await item.findAndCountAll({where:{officeId, placeId,
                        [Op.or] : {
                            name: {[Op.iLike]: `%${search}%`},
                            manage: {[Op.iLike]: `%${search}%`},
                            inventory: {[Op.iLike]: `%${search}%`},
                            serial: {[Op.iLike]: `%${search}%`},
                        }
                    },
                    limit, offset})
            }
            if(officeId && placeId && subtypeId) {
                //То выводим записи ноуты со всеми совпадающими значениями placeId и officeId
                Item = await item.findAndCountAll({where:{officeId, placeId, subtypeId,
                        [Op.or] : {
                            name: {[Op.iLike]: `%${search}%`},
                            manage: {[Op.iLike]: `%${search}%`},
                            inventory: {[Op.iLike]: `%${search}%`},
                            serial: {[Op.iLike]: `%${search}%`},
                        }
                    },
                    limit, offset})
            }
            return Item
        } catch (e) {
            console.log(e)
            throw e
        }

    }
    async create (name, serial, inventory, manage, cpu, ram, placeId, subtypeId, officeId, User) {
        try {
            const ItemData = await item.create({name, serial, inventory, manage, cpu, ram, placeId, subtypeId, officeId})
            const Item = await dtoService.Item(ItemData)
            const Place = await place.findByPk(placeId)
            const History = await historyService.Create(User, Item, Place.name)
            return {History, ItemData}
        } catch (e) {
            throw e
        }

    }
    async update (id, placeId, manage, User) {
        try {
            let Item;
            if (id && placeId && manage) {
                await item.update({manage: manage, placeId: placeId},{where: { id : id }})
                Item = await item.findByPk(id)
                Item = await dtoService.Item(Item)
                const Place = await place.findByPk(placeId)
                const historyData =  await historyService.Update(id, Place.name, manage, User, Item)
                return ({Item, historyData})
            }
            if (id && !placeId && manage) {
                await item.update({manage: manage},{where: { id : id }})
                Item = await item.findByPk(id)
                Item = await dtoService.Item(Item)
                const Place = await place.findByPk(placeId)
                const historyData =  await historyService.Update(id, Place, manage, User, Item)
                return ({Item, historyData})
            }
            if (id && placeId && !manage) {
                await item.update({placeId: placeId, manage: manage},{where: { id : id }})
                Item = await item.findByPk(id)
                Item = await dtoService.Item(Item)
                const Place = await place.findByPk(placeId)
                const historyData =  await historyService.Update(id, Place.name, manage, User, Item)
                return ({Item, historyData})
            }
        } catch (e) {
            console.log(e)
            throw e
        }

    }
    async replaceItem (id, officeId, placeId, img, User) {
        try{
            const idItems = id.split(',')
            const fileName="Act_" + new Date().toJSON().slice(0,19).split(":")+".jpg"
            await img.mv(path.resolve(__dirname, '..', 'act', fileName))
            let Item
            let historyData
            for (let i = 0; i < idItems.length; i++) {
                await item.update({officeId: officeId, placeId: placeId},{where: { id : idItems[i]}})
                const Place = await place.findByPk(placeId)
                Item = await item.findByPk(idItems[i])
                Item = await dtoService.Item(Item)
                historyData = await historyService.Replace(officeId, Place.name, idItems[i], User, fileName, Item)
            }
            return {Item, historyData}
        } catch (e){
            throw e
        }
    }
    async give (id, name, img, User) {
        try {
            let Item
            const fileName="Act_" + new Date().toJSON().slice(0,19).split(':')+".jpg"
            await img.mv(path.resolve(__dirname, '..', 'act', fileName))
            await item.update({manage: name, placeStatus: 2},{where: { id : id}})
            Item = await item.findByPk(id)
            Item = await dtoService.Item(Item)
            const historyData = await historyService.Give(name, id, User, fileName, Item)
            return {Item, historyData}
        } catch (e) {
            throw e
        }
    }
}
module.exports = new itemService()